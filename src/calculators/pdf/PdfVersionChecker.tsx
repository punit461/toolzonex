'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface VersionResult {
  version: string;
  pageSize: string;
  pageCount: number;
  fileSize: string;
  compatibility: string;
}

const VERSION_INFO: Record<string, string> = {
  '1.0': 'PDF 1.0 (1993) — The original PDF specification. Limited features.',
  '1.1': 'PDF 1.1 (1996) — Added bookmarks, annotations, and encryption support.',
  '1.2': 'PDF 1.2 (1996) — Added interactive forms, JavaScript, and multimedia.',
  '1.3': 'PDF 1.3 (2000) — Added transparency, ICC color profiles, and layers.',
  '1.4': 'PDF 1.4 (2001) — Added JBIG2 compression, PDF/A for archiving.',
  '1.5': 'PDF 1.5 (2003) — Added JPEG2000, object streams, and XMP metadata.',
  '1.6': 'PDF 1.6 (2004) — Added OpenType font support and 3D annotations.',
  '1.7': 'PDF 1.7 (2006) — Added compliance with ISO 32000-1. Used by most modern PDFs.',
  '2.0': 'PDF 2.0 (2017, ISO 32000-2) — The latest standard with enhanced accessibility and security features.',
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const PdfVersionCheckerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<VersionResult | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCheck = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const firstBytes = new Uint8Array(bytes.slice(0, 20));
      const headerStr = new TextDecoder().decode(firstBytes);
      const versionMatch = headerStr.match(/%PDF-(\d+\.\d+)/);

      if (!versionMatch) {
        setError('This file does not appear to be a valid PDF.');
        setBusy(false);
        return;
      }

      const version = versionMatch[1];
      const doc = await unlock(bytes);
      const firstPage = doc.getPages()[0];
      const { width, height } = firstPage.getSize();
      const compatibility = VERSION_INFO[version] || `PDF ${version} — Version information not available.`;

      setResult({
        version,
        pageSize: `${width} × ${height} pt`,
        pageCount: doc.getPageCount(),
        fileSize: formatFileSize(file.size),
        compatibility,
      });
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCheck} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Checking...</> : 'Check Version'}
      </Button>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="caption" color="text.secondary">PDF Version</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{result.version}</Typography>
          </Box>
          <Alert severity="info" sx={{ mb: 2 }}>{result.compatibility}</Alert>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">File Size</Typography>
              <Typography variant="h6">{result.fileSize}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Pages</Typography>
              <Typography variant="h6">{result.pageCount}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">First Page Size</Typography>
              <Typography variant="h6">{result.pageSize}</Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PdfVersionChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check the PDF Version of a File</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Check Version</strong> to read the PDF version header and file metadata.</li>
          <li>See the PDF version, compatibility information, file size, page count, and first page dimensions in the results panel.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A PDF created in Adobe Acrobat DC might report version 1.7 — a widely compatible format supported
        by virtually all modern PDF readers, browsers, and printers. A newer document created with the latest
        standard may show version 2.0, indicating ISO 32000-2 compliance.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking compatibility before submitting a PDF to a government portal or academic journal with version requirements.</li>
          <li>Diagnosing why a PDF won&apos;t open correctly in an older reader or legacy system.</li>
          <li>Verifying the PDF version for archival or compliance purposes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is the most common PDF version?</strong> PDF 1.7 is the most widely used version today, as it is the basis for ISO 32000-1 and is supported by nearly all modern software.</li>
          <li><strong>Is PDF 2.0 widely supported?</strong> PDF 2.0 was standardized in 2017, but full reader support is still rolling out. Most readers handle it gracefully but may fall back to 1.7 features.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — the check happens entirely in your browser; the PDF never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-version-checker"
      content={content}
    >
      <PdfVersionCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfVersionChecker;
