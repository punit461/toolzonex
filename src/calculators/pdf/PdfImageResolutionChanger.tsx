'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, MenuItem, Paper, CircularProgress } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument } from './pdfThumbnails';

const DPI_OPTIONS = [
  { label: '72 DPI (Screen)', value: 72 },
  { label: '150 DPI (Medium)', value: 150 },
  { label: '300 DPI (Print)', value: 300 },
];

const PdfImageResolutionChangerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [targetDpi, setTargetDpi] = useState(150);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult] = useState<{ originalSize: number; newSize: number } | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleAction = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const originalSize = bytes.byteLength;

      const pdfJsDoc = await loadPdfJsDocument(bytes);
      const doc = await unlock(bytes);
      const scale = targetDpi / 72;

      for (let i = 0; i < doc.getPageCount(); i++) {
        setProgress(`Rendering page ${i + 1} of ${doc.getPageCount()}...`);
        const page = await pdfJsDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create canvas context.');
        await page.render({ canvas, viewport }).promise;

        const imgDataUrl = canvas.toDataURL('image/png');
        const imgBytes = Uint8Array.from(atob(imgDataUrl.split(',')[1]), (c) => c.charCodeAt(0));
        const img = await doc.embedPng(imgBytes);

        const pdfPage = doc.getPage(i);
        const { width, height } = pdfPage.getSize();
        pdfPage.drawImage(img, { x: 0, y: 0, width, height });
      }

      const output = await doc.save();
      setResult({ originalSize, newSize: output.length });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + `-dpi${targetDpi}.pdf`);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      <TextField
        select
        fullWidth
        label="Target Resolution (DPI)"
        value={targetDpi}
        onChange={(e) => setTargetDpi(Number(e.target.value))}
        sx={{ mt: 3 }}
      >
        {DPI_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Processing...'}</> : 'Change Resolution'}
      </Button>

      {result && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Resolution changed to {targetDpi} DPI.
          </Alert>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Original</Typography>
              <Typography variant="h6">{formatSize(result.originalSize)}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">New ({targetDpi} DPI)</Typography>
              <Typography variant="h6">{formatSize(result.newSize)}</Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PdfImageResolutionChanger = () => {
  const content = (
    <>
      <Typography variant="h2">How to Change PDF Image Resolution</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to re-render.</li>
          <li>Select a target DPI — 72 for screen, 150 for medium quality, or 300 for print.</li>
          <li>Click <strong>Change Resolution</strong> — every page is re-rendered at the new DPI and embedded into a fresh PDF. The download starts automatically and shows the before/after file size.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5 MB PDF with 300 DPI images can be re-rendered at 72 DPI to produce a much smaller file suitable
        for email or web embedding. Conversely, a low-resolution document can be upscaled to 300 DPI for
        higher-quality printing, though upscaling won&apos;t add new detail.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reducing PDF file size by lowering image resolution for email or web use.</li>
          <li>Increasing DPI before printing to get sharper output on high-resolution printers.</li>
          <li>Standardizing all pages to the same resolution for consistent document handling.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will increasing DPI add new detail?</strong> No — upscaling re-renders the page at a higher pixel density but cannot recover detail that wasn&apos;t in the original. It may reduce pixelation but won&apos;t sharpen blurry content.</li>
          <li><strong>Does this preserve text quality?</strong> Text is re-rasterized as part of the page image, so it may appear slightly different. For text-only PDFs, consider tools that modify resolution without rasterizing.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-image-resolution-changer" content={content}>
      <PdfImageResolutionChangerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfImageResolutionChanger;
