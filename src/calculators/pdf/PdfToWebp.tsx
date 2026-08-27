'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Slider, Typography as MuiTypography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const PdfToWebpContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [quality, setQuality] = useState(0.8);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleConvert = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
      const baseName = file.name.replace(/\.pdf$/i, '');

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, viewport }).promise;
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
        if (!blob) continue;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${baseName}_page_${i}.webp`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) setError('Could not convert this file. Please ensure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />
      <Box sx={{ mt: 2 }}>
        <MuiTypography gutterBottom>WebP Quality: {Math.round(quality * 100)}%</MuiTypography>
        <Slider
          value={quality}
          onChange={(_, v) => setQuality(v as number)}
          min={0.5}
          max={1}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
        />
      </Box>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? 'Converting...' : 'Convert to WebP'}
      </Button>
    </Box>
  );
};

const PdfToWebp = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert PDF to WebP</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Drop your PDF file into the upload area or click to select it.</li>
          <li>Use the quality slider to balance image sharpness against file size.</li>
          <li>Click <strong>Convert to WebP</strong> — each page is exported as a modern, lightweight WebP image.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20-page product catalog converted at 80% quality produces WebP files roughly 40% smaller than equivalent JPGs,
        making them ideal for fast-loading web pages without noticeable quality loss.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Optimizing PDF page images for web performance using the WebP format.</li>
          <li>Converting marketing brochures into WebP for insertion into HTML emails.</li>
          <li>Creating lightweight image assets from PDF documents for mobile apps.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is WebP supported everywhere?</strong> All modern browsers (Chrome, Firefox, Edge, Safari 14+) support WebP. Older browsers may fall back to displaying the original.</li>
          <li><strong>How does WebP compare to PNG?</strong> WebP typically produces smaller files than PNG with comparable visual quality, especially for photographs and complex graphics.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-webp" content={content}>
      <PdfToWebpContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToWebp;
