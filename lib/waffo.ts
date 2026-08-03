// Waffo Pancake payment integration — official SDK wrapper.
//
// Uses @waffo/pancake-ts (v0.16.x). Waffo is a Merchant-of-Record platform;
// checkouts are PRODUCT-based (a productId created in the Waffo Dashboard),
// not arbitrary-amount charges. Real authentication is RSA-SHA256, which the
// SDK handles automatically — we only hand it the merchant id + private key.
//
// Required env:
//   WAFFO_MERCHANT_ID            — MER_xxx
//   WAFFO_PRIVATE_KEY            — RSA private key PEM (signs server→Waffo calls)
//   WAFFO_WEBHOOK_PUBLIC_KEY     — RSA public key PEM (verifies Waffo→server webhooks)
//   WAFFO_ENV                    — "sandbox" (default) | "production" | "prod" | "live"
//   WAFFO_PRODUCT_SINGLE_SMALL   — productId for the single_small plan
//   WAFFO_PRODUCT_SINGLE_MEDIUM  — productId for the single_medium plan
//   WAFFO_PRODUCT_SINGLE_LARGE   — productId for the single_large plan (price overridden)
//   WAFFO_PRODUCT_PRO_MONTHLY    — productId for the pro_monthly plan
//   WAFFO_PRODUCT_PRO_ANNUAL     — productId for the pro_annual plan
//   WAFFO_STORE_ID               — store the products belong to (needed for refunds)

import {
  WaffoPancake,
  verifyWebhook as sdkVerifyWebhook,
  TaxCategory,
  type WebhookEvent,
  type AuthenticatedCheckoutParams,
} from '@waffo/pancake-ts';

export type { WebhookEvent as WaffoWebhookEvent };

// ---- Config ----

export function isConfigured(): boolean {
  return Boolean(process.env.WAFFO_MERCHANT_ID && process.env.WAFFO_PRIVATE_KEY);
}

function waffoBaseUrl(): string {
  // Verified against the sandbox: Waffo's environment is bound to the MERCHANT
  // ACCOUNT, not the domain — test merchants authenticate on the same host.
  // The sandbox.api.waffo.ai hostname does not exist (connection refused).
  if (process.env.WAFFO_BASE_URL) return process.env.WAFFO_BASE_URL;
  return 'https://api.waffo.ai';
}

let _client: WaffoPancake | null = null;

export function getClient(): WaffoPancake {
  if (!isConfigured()) {
    throw new Error(
      'Waffo not configured: WAFFO_MERCHANT_ID and WAFFO_PRIVATE_KEY are required.',
    );
  }
  if (_client) return _client;
  _client = new WaffoPancake({
    merchantId: process.env.WAFFO_MERCHANT_ID!,
    privateKey: process.env.WAFFO_PRIVATE_KEY!,
    baseUrl: waffoBaseUrl(),
    webhookPublicKey: process.env.WAFFO_WEBHOOK_PUBLIC_KEY,
  });
  return _client;
}

// ---- Plan → product mapping ----

const PLAN_PRODUCT_ENV: Record<string, string> = {
  single_small: 'WAFFO_PRODUCT_SINGLE_SMALL',
  single_medium: 'WAFFO_PRODUCT_SINGLE_MEDIUM',
  single_large: 'WAFFO_PRODUCT_SINGLE_LARGE',
  pro_monthly: 'WAFFO_PRODUCT_PRO_MONTHLY',
  pro_annual: 'WAFFO_PRO_ANNUAL',
};

export function productIdForPlan(plan: string): string | undefined {
  const envKey = PLAN_PRODUCT_ENV[plan];
  return envKey ? process.env[envKey] : undefined;
}

// ---- Types ----

export interface WaffoMoney {
  currency: 'USD' | 'CNY';
  value: string;
}

export interface WaffoCheckoutInput {
  /** Plan id — used to resolve the Waffo product + whether to override price. */
  plan: string;
  /** Internal order id, echoed back on webhooks as orderMerchantExternalId. */
  internalOrderId: string;
  /** Stable customer id (we use the session sub). */
  buyerIdentity: string;
  /** Pre-fills the checkout email field. */
  buyerEmail?: string;
  /** Absolute URL Waffo redirects to after a successful payment. */
  successUrl: string;
  /**
   * Override price (USD, 2-decimal string) for plans whose amount is dynamic
   * (single_large). Omit for fixed-price plans — Waffo uses the dashboard price.
   */
  priceSnapshotUsd?: string;
}

export interface WaffoCheckoutResult {
  /** Checkout session id (Waffo sessionId). Stored for traceability. */
  checkoutId: string;
  /** Hosted checkout URL to redirect the customer to. */
  checkoutUrl: string;
}

export interface WaffoRefundResult {
  refundId: string;
  status: string;
}

// ---- Checkout ----

export async function createCheckout(
  input: WaffoCheckoutInput,
): Promise<WaffoCheckoutResult> {
  const productId = productIdForPlan(input.plan);
  if (!productId) {
    throw new Error(
      `Waffo product not configured for plan "${input.plan}". ` +
        `Set the matching WAFFO_PRODUCT_* env var.`,
    );
  }

  const client = getClient();
  const params: AuthenticatedCheckoutParams = {
    productId,
    currency: 'USD',
    buyerIdentity: input.buyerIdentity,
    buyerEmail: input.buyerEmail,
    successUrl: input.successUrl,
    orderMerchantExternalId: input.internalOrderId,
  };

  // Dynamic pricing only — fixed plans use the dashboard price.
  if (input.priceSnapshotUsd) {
    params.priceSnapshot = {
      amount: input.priceSnapshotUsd,
      taxCategory: TaxCategory.SaaS,
    };
  }

  const res = await client.checkout.authenticated.create(params);
  return { checkoutId: res.sessionId, checkoutUrl: res.checkoutUrl };
}

// ---- Refund (customer-side ticket) ----
//
// Waffo is a Merchant-of-Record: the SDK only exposes refunds as customer
// refund tickets. We issue a fresh customer session token (tied to the same
// buyerIdentity used at checkout) and file the ticket against the payment id
// captured from the order.completed webhook.

export interface WaffoRefundInput {
  /** Store the product belongs to (WAFFO_STORE_ID). */
  storeId: string;
  /** Same buyerIdentity used at checkout (session sub). */
  buyerIdentity: string;
  /** Idempotency/business id for the refund ticket. */
  merchantRefundId: string;
}

export async function refundCheckout(
  _orderId: string,
  paymentId: string,
  amount: WaffoMoney,
  opts: WaffoRefundInput,
): Promise<WaffoRefundResult> {
  const client = getClient();
  const { token } = await client.auth.issueSessionToken({
    storeId: opts.storeId,
    buyerIdentity: opts.buyerIdentity,
  });
  const customer = client.customer(token);
  const { ticket } = await customer.createRefundTicket({
    paymentId,
    reason: 'customer_request',
    requestedAmount: { amount: amount.value, currency: amount.currency },
    refundTicketMerchantExternalId: opts.merchantRefundId,
  });
  return {
    refundId: ticket.refundTicketMerchantExternalId ?? ticket.id,
    status: ticket.status,
  };
}

// ---- Webhook verification ----
//
// Delegates to the SDK's standalone verifyWebhook, which parses the
// X-Waffo-Signature header (t=<ts>,v1=<sig>), verifies RSA-SHA256 over
// `${ts}.${rawBody}`, and returns the parsed event (or throws). The SDK reads
// WAFFO_WEBHOOK_PUBLIC_KEY from the environment automatically.
// Returns null on any verification failure so callers can 401 without throwing.

export function verifyWebhook(
  rawBody: string,
  signatureHeader: string | null,
): WebhookEvent | null {
  if (!signatureHeader) return null;
  try {
    return sdkVerifyWebhook(rawBody, signatureHeader);
  } catch {
    return null;
  }
}
