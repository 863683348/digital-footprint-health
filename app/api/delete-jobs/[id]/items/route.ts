import { getJobItems } from '@/lib/worker';
import { ok } from '@/lib/resp';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const items = getJobItems(params.id);
  return ok({ jobId: params.id, items });
}
