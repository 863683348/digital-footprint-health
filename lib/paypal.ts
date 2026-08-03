// PayPal server-side integration — Orders API v2 + Webhook verification.
// Env:
//   PAYPAL_CLIENT_ID     — PayPal app client id
//   PAYPAL_CLIENT_SECRET — PayPal app secret
//   PAYPAL_WEBHOOK_ID    — Webhook id (from PayPal dashboard)
//   PAYPAL_ENV           — 'sandbox' (default) | 'live'
//
// All HTTP calls go through fetch; no PayPal SDK dependency on the server.
// The official @paypal/react-paypal-js is used only on the client for the
// PayPalButtons component.

const ENV = process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox';
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET ?? '';
const WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID ?? '';

const BASE_URL =
  ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

// ---- Access-token cache (in-process, ~9 min TTL) ----
interface TokenCache {
  token: string;
  expiresAt: number; // epoch ms
}
let tokenCache: TokenCache | null = null;

export function isConfigured(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET);
}

export function paypalEnv(): 'sandbox' | 'live' {
  return ENV;
}

async function getAccessToken(): Promise<string> {
  // Refresh 60s before expiry to be safe.
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error('PayPal credentials not configured (PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET).');
  }

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PayPal token request failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number; // seconds
  };

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return tokenCache.token;
}

// ---- Orders API v2 ----

export interface PayPalAmount {
  /** Currency code, ISO 4217. e.g. 'USD'. */
  currency: string;
  /** Decimal string, e.g. '4.03'. Must be positive. */
  value: string;
}

export interface CreateOrderInput {
  amount: PayPalAmount;
  /** Internal reference — stored in custom_id so webhook can map back. */
  internalOrderId: string;
  /** Human-readable description shown on PayPal checkout. */
  description: string;
  /** Return URL after buyer approval. */
  returnUrl: string;
  /** Cancel URL if buyer aborts. */
  cancelUrl: string;
}

export interface PayPalOrderResponse {
  id: string;
  status: 'CREATED' | 'APPROVED' | 'COMPLETED' | 'SAVED' | 'VOIDED';
  links: {
    href: string;
    rel: 'self' | 'approve' | 'capture' | 'refund' | 'up';
    method: 'GET' | 'POST' | 'PATCH';
  }[];
}

export async function createOrder(input: CreateOrderInput): Promise<PayPalOrderResponse> {
  const token = await getAccessToken();
  const body = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: input.amount.currency,
          value: input.amount.value,
        },
        description: input.description,
        custom_id: input.internalOrderId,
      },
    ],
    application_context: {
      brand_name: 'TweetDelete',
      user_action: 'PAY_NOW',
      shipping_preference: 'NO_SHIPPING',
      return_url: input.returnUrl,
      cancel_url: input.cancelUrl,
    },
  };

  const res = await fetch(`${BASE_URL}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': input.internalOrderId, // idempotency key
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal createOrder failed (${res.status}): ${text}`);
  }

  return (await res.json()) as PayPalOrderResponse;
}

export async function getOrder(orderId: string): Promise<PayPalOrderResponse> {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal getOrder failed (${res.status}): ${text}`);
  }
  return (await res.json()) as PayPalOrderResponse;
}

export interface CaptureResult {
  id: string; // capture id
  status: 'COMPLETED' | 'DECLINED' | 'PARTIALLY_REFUNDED' | 'PENDING' | 'REFUNDED';
  amount: PayPalAmount;
  customId?: string;
  raw: unknown;
}

export async function captureOrder(orderId: string): Promise<CaptureResult> {
  const token = await getAccessToken();
  const res = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    // Empty JSON body is required by the API.
    body: '{}',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal captureOrder failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as {
    id: string;
    status: string;
    purchase_units: {
      payments: {
        captures: {
          id: string;
          status: CaptureResult['status'];
          amount: { currency_code: string; value: string };
          custom_id?: string;
        }[];
      };
    }[];
  };

  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
  if (!capture) {
    throw new Error('PayPal capture response missing capture object.');
  }

  return {
    id: capture.id,
    status: capture.status,
    amount: {
      currency: capture.amount.currency_code,
      value: capture.amount.value,
    },
    customId: capture.custom_id,
    raw: data,
  };
}

export interface RefundResult {
  id: string; // refund id
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  amount: PayPalAmount;
  raw: unknown;
}

export async function refundCapture(
  captureId: string,
  amount?: PayPalAmount,
): Promise<RefundResult> {
  const token = await getAccessToken();
  const body = amount
    ? { amount: { currency_code: amount.currency, value: amount.value } }
    : {};

  const res = await fetch(`${BASE_URL}/v2/payments/captures/${captureId}/refund`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal refund failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as {
    id: string;
    status: RefundResult['status'];
    amount: { currency_code: string; value: string };
  };

  return {
    id: data.id,
    status: data.status,
    amount: { currency: data.amount.currency_code, value: data.amount.value },
    raw: data,
  };
}

// ---- Webhook signature verification (postback) ----
// PayPal recommends calling /v1/notifications/verify-webhook-signature
// rather than verifying the RSA-SHA256 signature locally.

export interface WebhookHeaders {
  transmissionId: string; // paypal-transmission-id
  transmissionTime: string; // paypal-transmission-time
  certUrl: string; // paypal-cert-url
  authAlgo: string; // paypal-auth-algo
  transmissionSig: string; // paypal-transmission-sig
}

export interface VerifyWebhookInput {
  headers: WebhookHeaders;
  body: unknown; // parsed webhook event payload
}

export interface WebhookEvent {
  id: string;
  event_type: string;
  resource_type: string;
  resource: {
    id: string; // capture id or order id depending on event
    status?: string;
    amount?: { currency_code: string; value: string };
    custom_id?: string;
    supplementary_data?: { related_ids?: { order_id?: string } };
  };
  summary?: string;
  create_time?: string;
}

export async function verifyWebhookSignature(
  input: VerifyWebhookInput,
): Promise<{ verificationStatus: 'SUCCESS' | 'FAILURE' }> {
  if (!WEBHOOK_ID) {
    throw new Error('PAYPAL_WEBHOOK_ID not configured.');
  }

  const token = await getAccessToken();
  const body = {
    auth_algo: input.headers.authAlgo,
    cert_url: input.headers.certUrl,
    transmission_id: input.headers.transmissionId,
    transmission_sig: input.headers.transmissionSig,
    transmission_time: input.headers.transmissionTime,
    webhook_id: WEBHOOK_ID,
    webhook_event: input.body,
  };

  const res = await fetch(`${BASE_URL}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal verify-webhook-signature failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { verification_status: 'SUCCESS' | 'FAILURE' };
  return { verificationStatus: data.verification_status };
}
