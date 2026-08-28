'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, TextField, Stack } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const PdfToPdfaConverterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleConvert = async () => {
    setError('');
    setNotice('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const precheck = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const wasEncrypted = precheck.isEncrypted;

      const doc = await unlock(bytes);

      if (title.trim()) doc.setTitle(title.trim());
      if (author.trim()) doc.setAuthor(author.trim());
      doc.setProducer('ToolZoneX PDF to PDF/A Converter');
      doc.setCreator('ToolZoneX');
      const now = new Date();
      doc.setCreationDate(now);
      doc.setModificationDate(now);
      if (!doc.getLanguage()) {
        try { doc.setLanguage('en-US'); } catch { /* not fatal if unsupported */ }
      }

      const output = await doc.save({ useObjectStreams: true });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-pdfa.pdf');
      setNotice(
        wasEncrypted
          ? 'Converted. The source file was password-protected — the output is unencrypted, since PDF/A disallows encryption.'
          : 'Converted with PDF/A-style metadata. This is an approximation, not a certified PDF/A file — see the FAQ below.'
      );
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setNotice(''); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Alert severity="warning" sx={{ mt: 2 }}>
        This produces an <strong>approximate</strong> PDF/A-style file — it is not guaranteed to pass a formal
        validator like veraPDF. See the FAQ before relying on this for strict archival compliance requirements.
      </Alert>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <TextField label="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TextField label="Author (optional)" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth />
      </Stack>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {notice && <Alert severity="success" sx={{ mt: 2 }}>{notice}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Converting...</> : 'Convert to PDF/A-style'}
      </Button>
    </Box>
  );
};

const PdfToPdfaConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to PDF/A-style</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert.</li>
          <li>Optionally set a title and author for the document metadata.</li>
          <li>Click <strong>Convert to PDF/A-style</strong> to download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">What this tool actually does</Typography>
      <Typography variant="body1">
        PDF/A is an ISO-standardized archival format with strict requirements: every font must be embedded (no
        external font references), the file must not be encrypted, color must be device-independent, and specific
        XMP metadata must be present — and a conforming file must pass a formal validator such as veraPDF. Fully
        achieving and certifying PDF/A-1b compliance requires a specialized conversion engine that inspects and
        rewrites font embedding and color profiles at a level this browser-based tool doesn&apos;t have. Instead,
        this tool takes the practical, best-effort steps it can: it confirms the file isn&apos;t encrypted (PDF/A
        disallows encryption), sets standard document metadata (title, author, producer, creation/modification
        dates, and a document language), and re-saves the file cleanly. Fonts and color spaces already embedded in
        your source PDF are left as-is.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A records team wants to archive scanned contracts with consistent metadata for long-term storage. Running
        each PDF through this tool standardizes the producer and creator fields and confirms none of the files are
        password-protected, which is a reasonable step for internal archival hygiene — though it isn&apos;t a
        substitute for validator-certified PDF/A conversion in regulated archival contexts.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Applying consistent archival metadata across a batch of PDFs before storage.</li>
          <li>Confirming a PDF isn&apos;t password-protected before it goes into a long-term archive.</li>
          <li>A first, low-effort pass toward PDF/A-style hygiene when a full validator-certified conversion isn&apos;t necessary.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this pass a PDF/A validator like veraPDF?</strong> Not guaranteed. This tool doesn&apos;t verify or fix font embedding, color profile conformance, or transparency usage — all of which a strict validator checks. Treat the output as PDF/A-style, not certified PDF/A.</li>
          <li><strong>What does it actually change?</strong> It confirms the file isn&apos;t encrypted, sets title/author/producer/creator metadata and creation/modification dates, sets a document language if missing, and re-saves the file with a clean structure.</li>
          <li><strong>My PDF has non-embedded fonts — does this embed them?</strong> No. Font embedding depends on the original PDF's construction and isn't something this tool inspects or modifies.</li>
          <li><strong>What happens if my file is password-protected?</strong> You'll be prompted for the password to open it. The converted output is not re-encrypted, since PDF/A disallows encryption entirely.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-pdfa-converter" content={content}>
      <PdfToPdfaConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToPdfaConverter;
