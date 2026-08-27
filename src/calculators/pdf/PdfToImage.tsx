'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument } from '@cantoo/pdf-lib';

const SCALE_OPTIONS = [
  { value: 1, label: '1x (Standard)' },
  { value: 2, label: '2x (High)' },
  { value: 3, label: '3x (Ultra)' },
];

const PdfToImageContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [scale, setScale] = useState(2);
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
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, viewport }).promise;
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (!blob) continue;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${baseName}_page_${i}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Resolution</InputLabel>
        <Select value={scale} label="Resolution" onChange={(e) => setScale(Number(e.target.value))}>
          {SCALE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? 'Converting...' : 'Convert to Images'}
      </Button>
    </Box>
  );
};

const PdfToImage = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert PDF to Images</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload your PDF file using the drop zone above.</li>
          <li>Choose the output resolution — 1x for small files, 2x or 3x for higher quality.</li>
          <li>Click <strong>Convert to Images</strong> — each page is saved as a separate PNG file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5-page presentation at 2x resolution produces five crisp PNG images, each at double the page dimensions — ideal
        for embedding in slide decks or sharing on social media.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a PDF brochure into individual images for a website gallery.</li>
          <li>Extracting slides from a PDF presentation for editing in an image editor.</li>
          <li>Preparing PDF pages for upload to platforms that only accept image files.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What resolution should I pick?</strong> Use 1x for web thumbnails, 2x for standard prints, and 3x for high-DPI displays or large prints.</li>
          <li><strong>Does this work with encrypted PDFs?</strong> Yes — you will be prompted to enter the password before conversion begins.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-image" content={content}>
      <PdfToImageContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToImage;
