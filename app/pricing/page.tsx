import { PricingView } from '@/components/PricingView';

// Fully static page — the client PricingView resolves the language from the
// route (/en/pricing is served by the /en catch-all). No server-side APIs.
export default function Page() {
  return <PricingView />;
}
