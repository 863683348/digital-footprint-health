import crypto from 'node:crypto';

// AES-256-GCM encryption for stored archives and OAuth tokens.
// Key is derived from a secret in env, with a per-record random IV + auth tag.
const ALGO = 'aes-256-gcm';
const SECRET = process.env.DFH_SECRET || 'dev-only-insecure-secret-change-me';

function keyFromSecret(): Buffer {
  return crypto.createHash('sha256').update(SECRET).digest();
}

export function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, keyFromSecret(), iv);
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  // payload = iv || tag || ciphertext  (base64)
  return Buffer.concat([iv, tag, enc]).toString('base64');
}

export function decrypt(payload: string): string {
  const buf = Buffer.from(payload, 'base64');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const enc = buf.subarray(28);
  const decipher = crypto.createDecipheriv(ALGO, keyFromSecret(), iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  return dec.toString('utf8');
}
