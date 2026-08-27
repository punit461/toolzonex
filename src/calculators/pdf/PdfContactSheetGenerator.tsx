'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument, renderPageThumbnail } from './pdfThumbnails';

const GRID_OPTIONS = [2, 3, 4] as const;

const PdfContactSheetGeneratorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [gridSize, setGridSize] = useState<2 | 3 | 4>(3);
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

      const cols = gridSize;
      const rows = Math.ceil(count / cols);
      const thumbW = 200;
      const thumbH = 260;
      const padding = 16;
      const labelH = 28;
      const canvasW = cols * (thumbW + padding) + padding;
      const canvasH = rows * (thumbH + labelH + padding) + padding;

      const canvas = document.createElement('canvas');
      canvas.width = canvasW;
      canvas.height = canvasH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not create canvas context.');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvasW, canvasH);

      for (let i = 1; i <= count; i++) {
        setProgress(`Rendering page ${i} of ${count}...`);
        const thumb = await renderPageThumbnail(pdf, i, thumbW);
        const col = (i - 1) % cols;
        const row = Math.floor((i - 1) / cols);
        const x = padding + col * (thumbW + padding);
        const y = padding + row * (thumbH + labelH + padding);

        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(x, y + labelH, thumbW, thumbH);
        const img = new Image();
        img.src = thumb.url;
        await new Promise<void>((res) => { img.onload = () => res(); });
        ctx.drawImage(img, x, y + labelH, thumbW, thumbH);

        ctx.fillStyle = '#333333';
        ctx.font = '14px sans-serif';
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
    a.download = 'contact-sheet.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setSheetUrl(''); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Grid layout</Typography>
        <ToggleButtonGroup
          value={gridSize}
          exclusive
          onChange={(_, v) => { if (v !== null) setGridSize(v); }}
          size="small"
        >
          {GRID_OPTIONS.map((n) => (
            <ToggleButton key={n} value={n}>{n}×{n}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Generating...'}</> : 'Generate Contact Sheet'}
      </Button>

      {sheetUrl && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Contact sheet — {pageCount} page{pageCount !== 1 ? 's' : ''} in {gridSize}×{gridSize} grid
          </Typography>
          <Box
            component="img"
            src={sheetUrl}
            alt="PDF contact sheet"
            sx={{ maxWidth: '100%', height: 'auto', maxHeight: 700, borderRadius: 1, mb: 2 }}
          />
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload}>
            Download Contact Sheet
          </Button>
        </Paper>
      )}
    </Box>
  );
};

const PdfContactSheetGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Create a PDF Contact Sheet</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want a visual overview of.</li>
          <li>Choose a grid layout (2×2, 3×3, or 4×4) to control how many thumbnails appear per row.</li>
          <li>Click <strong>Generate Contact Sheet</strong> — every page is rendered as a thumbnail with its page number below it, arranged in the selected grid.</li>
          <li>Preview the result and click <strong>Download Contact Sheet</strong> to save it as a PNG image.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12-page PDF in a 3×3 grid produces a single image showing all 12 pages across 4 rows, each
        labelled with its page number. This gives you a quick visual index of the entire document —
        perfect for presentations, archives, or sharing a preview without sending the full file.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a visual overview of a multi-page PDF for a portfolio, archive, or presentation.</li>
          <li>Generating a thumbnail index to quickly scan a document without opening every page.</li>
          <li>Building a contact sheet image for document management, record-keeping, or client previews.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How many pages can it handle?</strong> The tool renders every page, so very large PDFs (hundreds of pages) may take longer and produce a very large image. For documents over ~100 pages, the sheet will still be generated but may be slow.</li>
          <li><strong>What resolution are the thumbnails?</strong> Each thumbnail is rendered at 200 px wide with the aspect ratio preserved, scaled proportionally from the original page dimensions.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rendering happens entirely in your browser; the PDF never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-contact-sheet-generator" content={content}>
      <PdfContactSheetGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfContactSheetGenerator;
