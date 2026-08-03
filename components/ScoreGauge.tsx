'use client';

import { useI18n } from '@/components/I18nProvider';

// ScoreGauge — circular health gauge. Locked spec: viewBox "0 0 200 200", r=84,
// circumference ≈ 527.79, solid-color segment (NO gradient). Color encodes health
// band (risk indication only): <40 danger, 40–70 warn, >70 ok.

const R = 84;
const C = 2 * Math.PI * R; // ≈ 527.79

function bandColor(score: number): string {
  if (score < 40) return 'var(--color-danger)';
  if (score < 70) return 'var(--color-warn)';
  return 'var(--color-ok)';
}

export function ScoreGauge({ score }: { score: number | null }) {
  const { t } = useI18n();
  const hasScore = score !== null && !isNaN(score);
  const pct = hasScore ? Math.max(0, Math.min(100, score as number)) / 100 : 0;
  const offset = C * (1 - pct);
  const color = hasScore ? bandColor(score as number) : 'var(--color-line)';
  const label = t('gauge.label');

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-[168px] h-[168px] sm:w-[200px] sm:h-[200px]"
      role="img"
      aria-label={label}
    >
      <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-line)" strokeWidth="14" />
      {hasScore && (
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
          className="transition-calm"
        />
      )}
      <text
        x="100"
        y="96"
        textAnchor="middle"
        fontSize="46"
        fontWeight="700"
        fill="var(--color-ink)"
        className="mono"
      >
        {hasScore ? String(score) : '—'}
      </text>
      <text x="100" y="122" textAnchor="middle" fontSize="13" fill="var(--color-ink-soft)">
        {label}
      </text>
    </svg>
  );
}
