'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, ApiError } from '@/lib/api-client';
import { useI18n } from '@/components/I18nProvider';
import { ScoreGauge } from '@/components/ScoreGauge';
import { Card, RiskFlag, Callout, Button } from '@/components/ui';
import type { ReportDetail, ScoreBreakdown, ScoreDimension } from '@/lib/types';

export default function ReportPage({ params }: { params: { id: string } }) {
  const { t, te } = useI18n();
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [breakdown, setBreakdown] = useState<ScoreBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.getReport(params.id), api.getBreakdown(params.id)])
      .then(([r, b]) => {
        setReport(r);
        setBreakdown(b);
      })
      .catch((e: any) => {
        const err = e instanceof ApiError ? e : new ApiError(e?.message || '', e?.code);
        setError(te(err.code, err.message) || t('report.loaderror'));
      });
  }, [params.id, t, te]);

  if (error) return <Callout tone="danger">{error}</Callout>;
  if (!report || !breakdown) return <div className="t-5 text-ink-soft">{t('report.loading')}</div>;

  const { details } = breakdown;

  if (details.insufficientSample) {
    return (
      <div className="max-w-[640px] mx-auto space-y-4">
        <h1 className="t-2 font-bold">{t('report.insufficient.title')}</h1>
        <Callout tone="warn">{t('report.insufficient.desc', { count: details.sampleSize })}</Callout>
        <Link href="/upload" className="inline-block">
          <Button variant="ghost">{t('report.reupload')}</Button>
        </Link>
      </div>
    );
  }

  const dims = Object.entries(details.dimensions) as [string, ScoreDimension][];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="t-2 font-bold">{t('report.title')}</h1>
          <p className="t-6 text-ink-soft">
            {t('report.subtitle', { fileName: report.archive.fileName, count: report.archive.rowCount })}
          </p>
        </div>
        <Link href={`/delete/confirm?archiveId=${report.archive.id}`}>
          <Button>{t('report.goDelete')}</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-[200px_1fr] gap-6 items-start">
        <Card className="flex flex-col items-center">
          <ScoreGauge score={breakdown.score} />
          <p className="t-7 text-ink-soft mt-2">{t('report.gauge.hint')}</p>
        </Card>

        <Card>
          <div className="t-4 font-semibold mb-4">{t('report.dims.title')}</div>
          <div className="space-y-3">
            {dims.map(([key, d]) => (
              <div key={key}>
                <div className="flex justify-between text-t-6">
                  <span>{t(`dim.${key}`)}</span>
                  <span className="mono text-ink-soft">
                    {Math.round(d.score * 100)}% · {t('report.dims.weight')} {Math.round(d.weight * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-line overflow-hidden mt-1">
                  <div
                    className="h-full transition-calm"
                    style={{
                      width: `${Math.round(d.score * 100)}%`,
                      background:
                        d.score > 0.5
                          ? 'var(--color-danger)'
                          : d.score > 0.25
                            ? 'var(--color-warn)'
                            : 'var(--color-ok)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="t-4 font-semibold mb-3">{t('report.risk.title', { n: details.riskFlags.length })}</div>
        {details.riskFlags.length === 0 ? (
          <p className="t-6 text-ink-soft">{t('report.risk.empty')}</p>
        ) : (
          <ul className="space-y-2">
            {details.riskFlags.map((f, i) => (
              <RiskFlag
                key={i}
                severity={f.severity}
                label={t(`flag.${f.kind}`, f.kind === 'account' ? { count: details.sampleSize } : {})}
              />
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
