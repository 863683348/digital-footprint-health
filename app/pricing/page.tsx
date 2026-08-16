import { PricingView } from '@/components/PricingView';

// The root layout reads headers() to resolve the language (x-locale), which
// makes the whole tree render dynamically per request, so force-static is no
// longer applicable here — PricingView is a client component and resolves the
// language from the route on the client regardless.
export default function Page() {
  return <PricingView />;
}
