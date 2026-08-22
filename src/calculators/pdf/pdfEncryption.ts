import { PDFDocument } from '@cantoo/pdf-lib';

/** Loads a PDF that might be password-protected. Detects encryption without needing a password first. */
export async function loadPossiblyEncrypted(bytes: ArrayBuffer | Uint8Array): Promise<{ doc: PDFDocument } | { needsPassword: true }> {
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  if (doc.isEncrypted) {
    return { needsPassword: true };
  }
  return { doc };
}

/** Attempts to decrypt a password-protected PDF. Throws if the password is wrong. */
export async function loadWithPassword(bytes: ArrayBuffer | Uint8Array, password: string): Promise<PDFDocument> {
  return PDFDocument.load(bytes, { password });
}
