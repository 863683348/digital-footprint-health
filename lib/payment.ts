import type { BillingInfo, BillingPlan, DeleteEstimate } from './types';

// Fee model (from PRD §9). X write fee base ≈ ¥0.07/tweet.
export const RATE_PER_TWEET = 0.07;

export function estimateDelete(tweetCount: number): DeleteEstimate {
  let tier: DeleteEstimate['tier'] = 'small';
  let baseFee = 29;
  let perTweetFee = 0;
  if (tweetCount > 10000) {
    tier = 'large';
    baseFee = 20;
    perTweetFee = 0.15;
  } else if (tweetCount > 1000) {
    tier = 'medium';
    baseFee = 99;
    perTweetFee = 0;
  }
  const total = Math.round((baseFee + perTweetFee * tweetCount) * 100) / 100;
  return {
    tweetCount,
    tier,
    baseFee,
    perTweetFee,
    total,
    ratePerTweet: RATE_PER_TWEET,
    currency: 'CNY',
  };
}

// Plan id/price are structured; name & description are localized on the frontend
// via the i18n catalog (keys: plan.<id>.name / plan.<id>.desc).
export const BILLING_PLANS: BillingPlan[] = [
  { id: 'free', price: 0, currency: 'CNY' },
  { id: 'single_small', price: 29, currency: 'CNY' },
  { id: 'single_medium', price: 99, currency: 'CNY' },
  { id: 'single_large', price: 0, currency: 'CNY' },
  { id: 'pro_monthly', price: 39, currency: 'CNY' },
  { id: 'pro_annual', price: 299, currency: 'CNY' },
];

export function getBilling(): BillingInfo {
  return { plans: BILLING_PLANS, refundPolicyKey: 'refund.policy' };
}

// Local mock payment — no real charge. Returns a mock order id.
export function mockCharge(amount: number, plan: string): { orderId: string; paid: number } {
  return { orderId: `ord_${Date.now().toString(36)}`, paid: amount };
}
