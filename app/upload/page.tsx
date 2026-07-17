'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import { saveArchive } from '@/lib/store';
import { useI18n } from '@/components/I18nProvider';
import { Button, Card, Callout } from '@/components/ui';

export default function UploadPage() {
  const router = useRouter();
  const { t, te } = useI18n();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const { archiveId, archive } = await api.uploadArchive(file);
      // Hold the archive in the browser; the server keeps no database.
      saveArchive(archive);
      router.push(`/report/${archiveId}`);
    } catch (e: any) {
      const err = e instanceof ApiError ? e : new ApiError(e?.message || '', e?.code);
      setError(te(err.code, err.message) || t('upload.error'));
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
