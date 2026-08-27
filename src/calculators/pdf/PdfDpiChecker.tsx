'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface DpiResult {
  dpi: number;
  pageWidthPt: number;
  pageHeightPt: number;
  pageWidthPx: number;
  pageHeightPx: number;
  totalPages: number;
}

const PdfDpiCheckerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<DpiResult | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCheck = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const firstPage = doc.getPages()[0];
      const { width: pageWidthPt, height: pageHeightPt } = firstPage.getSize();

      const pdf = await loadPdfJsDocument(bytes);
      const page = await pdf.getPage(1);
      const baseViewport = page.getViewport({ scale: 1 });

      const canvas = document.createElement('canvas');
      canvas.width = baseViewport.width;
      canvas.height = baseViewport.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not create canvas context.');
      await page.render({ canvas, viewport: baseViewport }).promise;

      const pageWidthPx = canvas.width;
      const pageHeightPx = canvas.height;
      const dpi = Math.round((pageWidthPx / (pageWidthPt / 72)) * 10) / 10;

      setResult({
        dpi,
        pageWidthPt,
        pageHeightPt,
        pageWidthPx,
        pageHeightPx,
        totalPages: doc.getPageCount(),
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
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Checking...</> : 'Check DPI'}
      </Button>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="caption" color="text.secondary">Effective DPI</Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{result.dpi}</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Page Size (points)</Typography>
              <Typography variant="h6">{result.pageWidthPt} × {result.pageHeightPt} pt</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Render Size (pixels)</Typography>
              <Typography variant="h6">{result.pageWidthPx} × {result.pageHeightPx} px</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Total Pages</Typography>
              <Typography variant="h6">{result.totalPages}</Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PdfDpiChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check PDF DPI</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to check.</li>
          <li>Click <strong>Check DPI</strong> to render the first page at its native resolution and measure the effective DPI.</li>
          <li>See the DPI value, page dimensions in points and pixels, and total page count in the results panel.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A page sized at 612 × 792 points (US Letter) that renders at 2448 × 3168 pixels has an effective DPI of
        288 — well above the 300 DPI threshold usually recommended for high-quality printing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying whether a PDF has sufficient resolution for print production (typically 300 DPI).</li>
          <li>Checking if scanned documents are at a usable resolution for OCR or archival.</li>
          <li>Diagnosing blurry or pixelated output in a PDF before sending to a printer.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why only the first page?</strong> Most PDFs have consistent resolution across all pages. Checking the first page gives a reliable indicator of the entire document.</li>
          <li><strong>What DPI is good for printing?</strong> 300 DPI is the standard for high-quality printing. Below 150 DPI may appear blurry at normal viewing distance.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — the check happens entirely in your browser; the PDF never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-dpi-checker"
      content={content}
    >
      <PdfDpiCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfDpiChecker;
