'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument } from './pdfThumbnails';

const PdfSnapshotToolContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pageInput, setPageInput] = useState('1');
  const [result, setResult] = useState<{ url: string; page: number; totalPages: number } | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCapture = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    const pageNum = parseInt(pageInput, 10);
    if (isNaN(pageNum) || pageNum < 1) { setError('Enter a valid page number starting from 1.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);
      const pdf = await loadPdfJsDocument(new Uint8Array(bytes));
      if (pageNum > pdf.numPages) {
        setError(`This PDF has only ${pdf.numPages} page(s). Page ${pageNum} does not exist.`);
        setBusy(false);
        return;
      }
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 3 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not create canvas context.');
      await page.render({ canvas, viewport }).promise;
      setResult({ url: canvas.toDataURL('image/png'), page: pageNum, totalPages: pdf.numPages });
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file.');
      }
    } finally { setBusy(false); }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `snapshot-page-${result.page}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <TextField
        label="Page Number"
        type="number"
        value={pageInput}
        onChange={(e) => { setPageInput(e.target.value); setResult(null); }}
        inputProps={{ min: 1 }}
        fullWidth
        sx={{ mt: 3 }}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCapture} disabled={busy || !file}>
        {busy ? 'Capturing...' : 'Capture Page as Image'}
      </Button>

      {result && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Snapshot of page {result.page} captured
          </Typography>
          <Box
            component="img"
            src={result.url}
            alt={`Snapshot of page ${result.page}`}
            sx={{ maxWidth: '100%', height: 'auto', maxHeight: 500, borderRadius: 1, mb: 2 }}
          />
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
            Download Snapshot
          </Button>
        </Paper>
      )}
    </Box>
  );
};

const PdfSnapshotTool = () => {
  const content = (
    <>
      <Typography variant="h2">How to Capture a PDF Page as an Image</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF containing the page you want to capture.</li>
          <li>Enter the page number in the field provided.</li>
          <li>Click <strong>Capture Page as Image</strong> — the selected page is rendered at high resolution.</li>
          <li>Preview the result, then click <strong>Download Snapshot</strong> to save it as a PNG file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You need to extract page 5 from a 20-page report to include in a presentation slide. Instead of taking a
        screenshot and cropping, this tool renders the exact page at 3x scale — roughly 216 DPI — producing a crisp
        PNG that looks professional when embedded in slides or documents.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Extracting a specific page from a report for use in a slide deck.</li>
          <li>Capturing a diagram or chart from a PDF to share on social media.</li>
          <li>Saving a high-resolution snapshot of a signed page for record-keeping.</li>
          <li>Converting a single PDF page into an image for use in email or messaging.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What resolution is the snapshot?</strong> Pages are rendered at 3x scale (approximately 216 DPI) for crisp output.</li>
          <li><strong>Does this work with scanned PDFs?</strong> Yes, any PDF page can be captured regardless of its content type.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rendering and capture happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-snapshot-tool" content={content}>
      <PdfSnapshotToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfSnapshotTool;
