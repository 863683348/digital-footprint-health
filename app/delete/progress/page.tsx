'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadSim } from '@/lib/store';
import { useI18n } from '@/components/I18nProvider';
import { Loading } from '@/components/Loading';
import { Button, Card, ProgressBar, Badge } from '@/components/ui';
import type { DeleteSimItem, DeleteSimResult } from '@/lib/types';

function ProgressInner() {
  const search = useSearchParams();
  const { t } = useI18n();
  const archiveId = search.get('archiveId');

  const [sim, setSim] = useState<DeleteSimResult | null>(null);
  const [shown, setShown] = useState(0); // how many items revealed (animation)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!archiveId) return;
    const r = loadSim(archiveId);
    setSim(r);
    if (r) {
      let i = 0;
      const total = r.items.length;
      const step = Math.max(1, Math.ceil(total / 40));
      timer.current = setInterval(() => {
        i = Math.min(total, i + step);
        setShown(i);
        if (i >= total && timer.current) {
          clearInterval(timer.current);
          timer.current = null;
        }
      }, 60);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archiveId]);

  if (!archiveId) return <div className="t-5 text-ink-soft">{t('progress.missing')}</div>;
  if (!sim) return <div className="t-5 text-ink-soft">{t('progress.notfound')}</div>;

  const total = sim.items.length;
  const processed = Math.min(shown, total);
  const pct = total > 0 ? Math.round((processed / total) * 100) : 100;
  const revealed = sim.items.slice(0, shown);
  const succeeded = revealed.filter((i) => i.status === 'done').length;
  const failed = revealed.filter((i) => i.status === 'failed').length;
  const done = shown >= total;

  const itemBadge = (s: DeleteSimItem['status']) =>
    s === 'done' ? (
      <Badge tone="ok">{t('jobitem.done')}</Badge>
    ) : (
      <Badge tone="danger">{t('jobitem.failed')}</Badge>
    );

  return (
    <div className="max-w-[720px] mx-auto space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="t-2 font-bold">{t('progress.title')}</h1>
        <div className="flex items-center gap-2">
          <Badge tone="warn">{t('progress.dryrun.badge')}</Badge>
          <Badge tone={done ? 'ok' : 'warn'}>
            {done ? t('status.completed') : t('status.running')}
          </Badge>
        </div>
      </div>

      <Card>
        <div className="flex justify-between text-t-6 mb-2">
          <span>{t('progress.processed', { processed, total })}</span>
          <span className="mono">{t('progress.success', { succeeded, failed })}</span>
        </div>
        <ProgressBar value={pct} />
        {done && (
          <p className="mt-3 text-t-7 text-ink-soft">
            {t('progress.dryrun.note')}
          </p>
        )}
      </Card>

      <Card>
        <div className="t-4 font-semibold mb-3">{t('progress.detail.title', { n: revealed.length })}</div>
        {revealed.length === 0 ? (
          <p className="text-t-7 text-ink-soft">{t('progress.loading')}</p>
        ) : (
          <ul className="divide-y divide-line">
            {revealed.slice(0, 30).map((it) => (
              <li key={it.tweetId} className="flex items-center justify-between py-2">
                <span className="mono text-t-7 text-ink-soft">{it.tweetId}</span>
                {itemBadge(it.status)}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {done && (
        <div className="flex justify-end">
          <Link href="/upload" className="w-full sm:w-auto">
            <Button variant="ghost" className="w-full sm:w-auto">{t('report.reupload')}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function DeleteProgressPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProgressInner />
    </Suspense>
  );
}
