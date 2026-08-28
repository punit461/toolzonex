'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, CircularProgress, Stack } from '@mui/material';
import { StandardFonts, rgb } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

async function sha256Hex(bytes: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

const DigitalSignPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [signerName, setSignerName] = useState('');
  const [reason, setReason] = useState('');
  const [pageChoice, setPageChoice] = useState<'first' | 'last'>('last');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleSign = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!signerName.trim()) { setError('Enter a signer name.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const hash = await sha256Hex(bytes);
      const doc = await unlock(bytes);
      const pages = doc.getPages();
      const page = pageChoice === 'first' ? pages[0] : pages[pages.length - 1];
      const { width } = page.getSize();

      const font = await doc.embedFont(StandardFonts.Helvetica);
      const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
      const dateStr = new Date().toISOString().slice(0, 19).replace('T', ' ') + ' UTC';

      const boxWidth = 260;
      const boxHeight = 92;
      const margin = 24;
      const x = width - boxWidth - margin;
      const y = margin;

      page.drawRectangle({
        x, y, width: boxWidth, height: boxHeight,
        borderColor: rgb(0.2, 0.4, 0.7),
        borderWidth: 1,
        color: rgb(0.96, 0.97, 1),
        opacity: 0.95,
      });

      let cursorY = y + boxHeight - 16;
      const lineGap = 13;
      const pad = 10;

      page.drawText('DIGITALLY SIGNED', { x: x + pad, y: cursorY, size: 9, font: boldFont, color: rgb(0.15, 0.3, 0.6) });
      cursorY -= lineGap;
      page.drawText(`Signer: ${signerName.trim()}`, { x: x + pad, y: cursorY, size: 8, font, color: rgb(0.1, 0.1, 0.1) });
      cursorY -= lineGap;
      if (reason.trim()) {
        page.drawText(`Reason: ${reason.trim().slice(0, 40)}`, { x: x + pad, y: cursorY, size: 8, font, color: rgb(0.1, 0.1, 0.1) });
        cursorY -= lineGap;
      }
      page.drawText(`Date: ${dateStr}`, { x: x + pad, y: cursorY, size: 8, font, color: rgb(0.1, 0.1, 0.1) });
      cursorY -= lineGap;
      page.drawText('SHA-256 (original file):', { x: x + pad, y: cursorY, size: 7, font, color: rgb(0.3, 0.3, 0.3) });
      cursorY -= 10;
      page.drawText(hash.slice(0, 32), { x: x + pad, y: cursorY, size: 6.5, font, color: rgb(0.3, 0.3, 0.3) });
      cursorY -= 9;
      page.drawText(hash.slice(32), { x: x + pad, y: cursorY, size: 6.5, font, color: rgb(0.3, 0.3, 0.3) });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-signed.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not sign this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Alert severity="warning" sx={{ mt: 2 }}>
        This creates a <strong>visual signature block</strong> with a SHA-256 integrity fingerprint of the original
        file — it is not a legally-binding cryptographic signature (no PAdES/eIDAS-style certificate is involved).
        See the FAQ below before using this for anything legally significant.
      </Alert>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <TextField label="Signer name" value={signerName} onChange={(e) => setSignerName(e.target.value)} fullWidth required />
        <TextField label="Reason for signing (optional)" value={reason} onChange={(e) => setReason(e.target.value)} fullWidth />
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>Place signature block on</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant={pageChoice === 'last' ? 'contained' : 'outlined'} size="small" onClick={() => setPageChoice('last')}>Last Page</Button>
          <Button variant={pageChoice === 'first' ? 'contained' : 'outlined'} size="small" onClick={() => setPageChoice('first')}>First Page</Button>
        </Stack>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleSign} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Signing...</> : 'Add Signature Block'}
      </Button>
    </Box>
  );
};

const DigitalSignPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Digitally Sign a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to sign.</li>
          <li>Enter your name and, optionally, a reason for signing.</li>
          <li>Choose whether to place the signature block on the first or last page.</li>
          <li>Click <strong>Add Signature Block</strong> to download the signed PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">What this tool actually does</Typography>
      <Typography variant="body1">
        A real, standards-based digital signature (PAdES, eIDAS-qualified, or similar) requires an X.509 certificate
        issued by a trusted certificate authority and a chain of trust that a browser-only, backend-free tool cannot
        provide. Instead, this tool stamps a visible signature block onto your PDF containing the signer&apos;s name,
        reason, the signing date, and a SHA-256 hash computed from the original file&apos;s bytes. That hash is a
        genuine cryptographic fingerprint — if even one byte of the original file changes, the hash changes
        completely — so it can serve as an integrity reference, but it does not prove who added it or provide legal
        non-repudiation the way a PKI-based signature does.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A freelancer sends a signed-off scope-of-work PDF to a client. Adding a signature block with their name,
        the reason &quot;Approved scope of work&quot;, and a hash reference gives the client a visible confirmation
        and a way to verify the file hasn&apos;t been altered since — useful for informal approval trails, though not
        a substitute for a legally binding e-signature service on contracts that require one.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding a visible sign-off marker to internal documents, drafts, or approvals.</li>
          <li>Attaching an integrity fingerprint so recipients can confirm a file wasn&apos;t modified after signing.</li>
          <li>Quick, informal &quot;signed by&quot; stamps where a full e-signature platform is overkill.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this a legally-binding electronic signature?</strong> No. It does not meet PAdES, eIDAS, or similar legal digital-signature standards, which require a certificate from a trusted authority. For contracts, legal filings, or anything requiring a legally recognized signature, use a dedicated e-signature service (such as DocuSign or Adobe Sign) instead.</li>
          <li><strong>What is the SHA-256 hash for?</strong> It's a fingerprint of the original file's exact bytes, computed in your browser before signing. Anyone can independently hash the original file and compare it to confirm it matches — but this only proves the file's integrity, not the signer's identity or intent.</li>
          <li><strong>Can this be forged?</strong> Yes — because there's no certificate authority validating identity, anyone could type any name into the signer field. Treat this as a visible annotation and integrity marker, not proof of authenticity.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — hashing and signing both happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/digital-sign-pdf" content={content}>
      <DigitalSignPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DigitalSignPdf;
