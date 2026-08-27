'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument, renderPageThumbnail } from './pdfThumbnails';

const PdfThumbnailSheetContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [pageCount, setPageCount] = useState(0);

  const handleAction = async () => {
    setError('');
    setSheetUrl('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const count = pdf.numPages;
      setPageCount(count);

      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const thumbW = 180;
      const thumbH = 240;
      const padding = 12;
      const headerH = 30;
      const canvasW = cols * (thumbW + padding) + padding;
      const canvasH = rows * (thumbH + headerH + padding) + padding;

      const canvas = document.createElement('canvas');
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not create canvas context.');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasW, canvasH);

      const scale = thumbW / 612;

      for (let i = 1; i <= count; i++) {
        setProgress(`Rendering page ${i} of ${count}...`);
        const thumb = await renderPageThumbnail(pdf, i, thumbW);
        const col = (i - 1) % cols;
        const row = Math.floor((i - 1) / cols);
        const x = padding + col * (thumbW + padding);
        const y = padding + row * (thumbH + headerH + padding);

        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(x, y + headerH, thumbW, thumbH);
        const img = new Image();
        img.src = thumb.url;
        await new Promise<void>((res) => { img.onload = () => res(); });
        ctx.drawImage(img, x, y + headerH, thumbW, thumbH);

        ctx.fillStyle = '#333333';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Page ${i}`, x + thumbW / 2, y + 18);
      }

      setSheetUrl(canvas.toDataURL('image/png'));
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const handleDownload = () => {
    if (!sheetUrl) return;
    const a = document.createElement('a');
    a.href = sheetUrl;
    a.download = 'thumbnail-sheet.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setSheetUrl(''); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Rendering...'}</> : 'Create Thumbnail Sheet'}
      </Button>

      {sheetUrl && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Contact sheet generated — {pageCount} page(s)
          </Typography>
          <Box
            component="img"
            src={sheetUrl}
            alt="PDF thumbnail sheet"
            sx={{ maxWidth: '100%', height: 'auto', maxHeight: 600, borderRadius: 1, mb: 2 }}
          />
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
            Download Thumbnail Sheet
          </Button>
        </Paper>
      )}
    </Box>
  );
};

const PdfThumbnailSheet = () => {
  const content = (
    <>
      <Typography variant="h2">How to Create a PDF Thumbnail Sheet</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want a visual overview of.</li>
          <li>Click <strong>Create Thumbnail Sheet</strong> — every page is rendered as a small thumbnail and arranged in a labelled grid.</li>
          <li>Preview the contact sheet, then click <strong>Download Thumbnail Sheet</strong> to save it as a single PNG image.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12-page PDF becomes a single image showing all 12 pages in a 4&times;3 grid, each labelled with its
        page number. This gives you a quick visual index of the entire document at a glance — useful for
        presentations, archives, or sharing a preview without sending the full file.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a visual overview of a multi-page PDF for a portfolio or archive.</li>
          <li>Generating a contact sheet to quickly scan a document without opening every page.</li>
          <li>Building a thumbnail index image for document management or record-keeping.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How many pages can it handle?</strong> The tool renders every page, so very large PDFs (hundreds of pages) may take a while and produce a very large image. For documents over ~100 pages, the sheet will still be generated but may be slow.</li>
          <li><strong>What resolution are the thumbnails?</strong> Each thumbnail is rendered at 180 px wide with the aspect ratio preserved, scaled proportionally from the original page dimensions.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rendering happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-thumbnail-sheet" content={content}>
      <PdfThumbnailSheetContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfThumbnailSheet;
