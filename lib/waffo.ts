// Waffo Pancake payment integration — REST, no SDK.
// Base: https://api.waffo.ai/v1 (live) | https://sandbox.api.waffo.ai/v1 (sandbox)
//
// Auth model: every server → Waffo request carries three headers:
//   X-Merchant-Id   — WAFFO_MERCHANT_ID
//   X-Timestamp     — Unix seconds (string)
//   X-Signature     — HMAC-SHA256( WAFFO_PRIVATE_KEY, `${ts}.${rawBody}` )
// Waffo → server webhooks are verified with WAFFO_WEBHOOK_SECRET over the same
// `${ts}.${rawBody}` signing scheme.

import crypto from 'crypto';

const LIVE_BASE = 'https://api.waffo.ai/v1';
const SANDBOX_BASE = 'https://sandbox.api.waffo.ai/v1';

export function baseUrl(): string {
  if (process.env.WAFFO_BASE_URL) return process.env.WAFFO_BASE_URL;
  return process.env.WAFFO_SANDBOX === 'false' ? LIVE_BASE : SANDBOX_BASE;
}

export function isConfigured(): boolean {
  return Boolean(process.env.WAFFO_MERCHANT_ID && process.env.WAFFO_PRIVATE_KEY);
}

export interface WaffoMoney {
  currency: 'USD' | 'CNY';
  value: string;
}

export interface WaffoCheckoutInput {
  amount: WaffoMoney; // USD
  internalOrderId: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
}

export interface WaffoCheckoutResult {
  checkoutId: string;
  checkoutUrl: string;
}

export interface WaffoRefundResult {
  refundId: string;
  status: string;
}

export interface WaffoWebhookEvent {
  id: string;
  type: string;
  createdAt?: string;
  data: {
    checkoutId?: string;
    orderId?: string;
    [k: string]: unknown;
  };
}

function signWithKey(key: string, timestamp: string, rawBody: string): string {
  return crypto.createHmac('sha256', key).update(`${timestamp}.${rawBody}`).digest('hex');
}

async function signedPost<T>(path: string, body: unknown): Promise<T> {
  const rawBody = JSON.stringify(body);
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const merchantId = process.env.WAFFO_MERCHANT_ID ?? '';
  const signature = signWithKey(process.env.WAFFO_PRIVATE_KEY ?? '', timestamp, rawBody);

  const res = await fetch(`${baseUrl()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Merchant-Id': merchantId,
      'X-Timestamp': timestamp,
      'X-Signature': signature,
    },
    body: rawBody,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Waffo ${path} failed (${res.status}): ${text}`);
  }
  return JSON.parse(text) as T;
}

export async function createCheckout(input: WaffoCheckoutInput): Promise<WaffoCheckoutResult> {
  const payload = {
    merchantOrderId: input.internalOrderId,
    amount: input.amount,
    description: input.description,
    redirectUrl: input.successUrl,
    cancelUrl: input.cancelUrl,
  };
  const data = await signedPost<{
    id: string;
    checkoutId?: string;
    url?: string;
    checkoutUrl?: string;
  }>('/checkouts', payload);

  const checkoutId = data.checkoutId ?? data.id;
  const checkoutUrl = data.checkoutUrl ?? data.url ?? '';
  if (!checkoutId || !checkoutUrl) {
    throw new Error('Waffo createCheckout: missing checkoutId/checkoutUrl in response');
  }
  return { checkoutId, checkoutUrl };
}

export async function refundCheckout(
  checkoutId: string,
  amount: WaffoMoney,
): Promise<WaffoRefundResult> {
  const payload = { amount, reason: 'customer_request' };
  const data = await signedPost<{ id: string; refundId?: string; status?: string }>(
    `/checkouts/${encodeURIComponent(checkoutId)}/refund`,
    payload,
  );
  return {
    refundId: data.refundId ?? data.id,
    status: data.status ?? 'pending',
  };
}

export function verifyWebhook(
  rawBody: string,
  signature: string | null,
  timestamp: string | null,
): boolean {
  const secret = process.env.WAFFO_WEBHOOK_SECRET;
  if (!secret || !signature || !timestamp) return false;
  const expected = signWithKey(secret, timestamp, rawBody);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
