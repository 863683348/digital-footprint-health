import { PricingView } from '@/components/PricingView';

// Pricing content is static (BILLING_PLANS) and has no per-request data, so
// let it be statically rendered and served from the CDN cache instead of
// re-rendering from the origin on every visit (reduces Fast Origin Transfer).
export const dynamic = 'force-static';

export default function Page() {
  return <PricingView />;
}
