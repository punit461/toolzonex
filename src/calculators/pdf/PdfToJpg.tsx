'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Slider, Typography as MuiTypography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const PdfToJpgContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [quality, setQuality] = useState(0.85);
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
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
        if (!blob) continue;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${baseName}_page_${i}.jpg`;
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
        <MuiTypography gutterBottom>JPEG Quality: {Math.round(quality * 100)}%</MuiTypography>
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
        {busy ? 'Converting...' : 'Convert to JPG'}
      </Button>
    </Box>
  );
};

const PdfToJpg = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert PDF to JPG</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload your PDF using the file drop zone.</li>
          <li>Adjust the JPEG quality slider — lower values produce smaller files with some compression artifacts.</li>
          <li>Click <strong>Convert to JPG</strong> — each page is downloaded as a separate JPG image.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned 10-page document at 85% quality produces ten JPG files averaging around 200 KB each — small enough to
        email as attachments while maintaining readable text quality.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting scanned PDF contracts into JPG images for sharing via messaging apps.</li>
          <li>Reducing PDF page sizes for faster upload to image-hosting platforms.</li>
          <li>Preparing PDF content for insertion into presentations that require JPG format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What quality level should I use?</strong> 80–90% works well for most purposes. Use 100% for archival quality or 50–60% when file size is the priority.</li>
          <li><strong>Does this support color and grayscale PDFs?</strong> Yes — both color and grayscale pages are exported faithfully as JPG images.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-jpg" content={content}>
      <PdfToJpgContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToJpg;
