'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import { useI18n } from '@/components/I18nProvider';
import { Loading } from '@/components/Loading';
import { Button, Card, ProgressBar, Badge } from '@/components/ui';
import type { DeleteJobDetail, DeleteJobItem } from '@/lib/types';

const TERMINAL = new Set(['completed', 'cancelled', 'failed']);

function ProgressInner() {
  const search = useSearchParams();
  const { t } = useI18n();
  const jobId = search.get('jobId');
  const [job, setJob] = useState<DeleteJobDetail | null>(null);
  const [items, setItems] = useState<DeleteJobItem[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  async function refresh() {
    if (!jobId) return;
    const [j, it] = await Promise.all([api.getJob(jobId), api.getItems(jobId)]);
    setJob(j);
    setItems(it.items);
    if (TERMINAL.has(j.job.status) && timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }

  useEffect(() => {
    if (!jobId) return;
    refresh();
    timer.current = setInterval(refresh, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  async function act(kind: 'pause' | 'resume' | 'cancel') {
    if (!jobId) return;
    setBusy(kind);
    try {
      if (kind === 'pause') await api.pauseJob(jobId);
      if (kind === 'resume') await api.resumeJob(jobId);
      if (kind === 'cancel') await api.cancelJob(jobId);
      await refresh();
    } finally {
      setBusy(null);
    }
  }

  if (!jobId) return <div className="t-5 text-ink-soft">{t('progress.missing')}</div>;
  if (!job) return <div className="t-5 text-ink-soft">{t('progress.loading')}</div>;

  const pct = job.job.total > 0 ? Math.round((job.job.processed / job.job.total) * 100) : 0;

  const itemBadge = (s: DeleteJobItem['status']) => {
    if (s === 'done') return <Badge tone="ok">{t('jobitem.done')}</Badge>;
    if (s === 'failed') return <Badge tone="danger">{t('jobitem.failed')}</Badge>;
    if (s === 'processing') return <Badge tone="warn">{t('jobitem.processing')}</Badge>;
    return <Badge>{t('jobitem.pending')}</Badge>;
  };

  return (
    <div className="max-w-[720px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="t-2 font-bold">{t('progress.title')}</h1>
        <div className="flex items-center gap-2">
          {job.job.dryRun && <Badge tone="warn">{t('progress.dryrun.badge')}</Badge>}
          <Badge
            tone={
              job.job.status === 'completed' ? 'ok' : job.job.status === 'failed' ? 'danger' : 'warn'
            }
          >
            {t(`status.${job.job.status}`)}
          </Badge>
        </div>
      </div>

      <Card>
        <div className="flex justify-between text-t-6 mb-2">
          <span>{t('progress.processed', { processed: job.job.processed, total: job.job.total })}</span>
          <span className="mono">
            {t('progress.success', { succeeded: job.job.succeeded, failed: job.job.failed })}
          </span>
        </div>
        <ProgressBar value={pct} />
        <div className="mt-4 flex items-center gap-2">
          {job.job.status === 'running' && (
            <Button variant="ghost" onClick={() => act('pause')} disabled={busy === 'pause'}>
              {t('progress.pause')}
            </Button>
          )}
          {job.job.status === 'paused' && (
            <Button onClick={() => act('resume')} disabled={busy === 'resume'}>
              {t('progress.resume')}
            </Button>
          )}
          {!TERMINAL.has(job.job.status) && (
            <Button variant="danger" onClick={() => act('cancel')} disabled={busy === 'cancel'}>
              {t('progress.cancel')}
            </Button>
          )}
        </div>
        {job.job.dryRun && (
          <p className="mt-3 text-t-7 text-ink-soft">{t('progress.dryrun.note')}</p>
        )}
      </Card>

      <Card>
        <div className="t-4 font-semibold mb-3">{t('progress.detail.title', { n: items.length })}</div>
        <ul className="divide-y divide-line">
          {items.slice(0, 30).map((it) => (
            <li key={it.id} className="flex items-center justify-between py-2">
              <span className="mono text-t-7 text-ink-soft">{it.tweetId}</span>
              {itemBadge(it.status)}
            </li>
          ))}
        </ul>
      </Card>
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
