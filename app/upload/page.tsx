'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseArchiveString } from '@/lib/parse';
import { scoreArchive } from '@/lib/scoring';
import { saveArchive } from '@/lib/store';
import { useI18n } from '@/components/I18nProvider';
import { localePath } from '@/lib/locale';
import { Button, Card, Callout } from '@/components/ui';
import type { ArchiveData } from '@/lib/types';

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB hard limit (mirrors former server guard)

export default function UploadPage() {
  const router = useRouter();
  const { t, lang } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!file) return;
    setBusy(true);
    setError(null);

    if (file.size > MAX_BYTES) {
      setError(t('upload.tooLarge'));
      setBusy(false);
      return;
    }
    if (!/\.(csv|js|json)$/i.test(file.name)) {
      setError(t('upload.badType'));
      setBusy(false);
      return;
    }

    try {
      // Parse + score entirely in the browser. The archive file never hits the
      // server, so there is no origin ingress/egress for this flow (FOT ~ 0) and
      // the user's data stays on their own device.
      const text = await file.text();
      const parsed = parseArchiveString(text, file.name);
      if (parsed.length === 0) {
        setError(t('upload.parseFailed'));
        setBusy(false);
        return;
      }
      const { score, details } = scoreArchive(parsed);
      const archiveId = crypto.randomUUID();
      const archive: ArchiveData = {
        id: archiveId,
        fileName: file.name,
        rowCount: parsed.length,
        tweets: parsed,
        score,
        details,
        createdAt: new Date().toISOString(),
        insufficientSample: details.insufficientSample,
      };
      // Hold the archive in the browser; the server keeps no database.
      saveArchive(archive);
      // Keep the locale prefix so an EN user lands on the EN report page.
      router.push(localePath(`/report/${archiveId}`, lang));
    } catch {
      setError(t('upload.error'));
      setBusy(false);
    }
  }

  return (
    <div className="max-w-[640px] mx-auto space-y-5">
      <h1 className="t-2 font-bold">{t('upload.title')}</h1>
      <p className="t-5 text-ink-soft">
        {t('upload.desc')}
      </p>

      <Card>
        <label
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-line rounded-xl2 py-10 cursor-pointer hover:border-primary transition-calm"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) setFile(f);
          }}
        >
          <span className="t-4 font-semibold">{file ? file.name : t('upload.drop')}</span>
          <span className="text-t-7 text-ink-soft">
            {file ? `${(file.size / 1024).toFixed(1)} KB` : t('upload.hint')}
          </span>
          <input
            type="file"
            accept=".csv,.js,.json"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>

        {error && <Callout tone="danger">{error}</Callout>}

        <div className="mt-4 flex justify-end">
          <Button onClick={handleSubmit} disabled={!file || busy}>
            {busy ? t('upload.parsing') : t('upload.gen')}
          </Button>
        </div>
      </Card>

      <Callout>{t('upload.privacy')}</Callout>
    </div>
  );
}
