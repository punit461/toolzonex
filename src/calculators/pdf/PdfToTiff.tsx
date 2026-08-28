'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';
import { encodeMultiPageTiff, type TiffPage } from './tiffEncoder';

const SCALE_OPTIONS = [
  { value: 1, label: '72 DPI' },
  { value: 2, label: '144 DPI' },
  { value: 3, label: '216 DPI' },
];

const PdfToTiffContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState(2);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');

  const handleConvert = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const pages: TiffPage[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Rendering page ${i} of ${pdf.numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create a canvas context.');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvas, viewport, background: '#ffffff' }).promise;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        pages.push({ width: canvas.width, height: canvas.height, rgba: imageData.data });
      }

      setProgress('Encoding TIFF...');
      const tiff = encodeMultiPageTiff(pages);
      downloadBytes(tiff, file.name.replace(/\.pdf$/i, '') + '.tiff', 'image/tiff');
    } catch {
      setError('Could not convert this file. Please ensure it is a valid PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Output DPI</InputLabel>
        <Select value={scale} label="Output DPI" onChange={(e) => setScale(Number(e.target.value))}>
          {SCALE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleConvert} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Converting...'}</> : 'Convert to TIFF'}
      </Button>
    </Box>
  );
};

const PdfToTiff = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to TIFF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert.</li>
          <li>Choose an output DPI — higher values produce larger, sharper images but a bigger file.</li>
          <li>Click <strong>Convert to TIFF</strong> — every page is rendered and combined into a single multi-page TIFF file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5-page scanned form becomes one <code>.tiff</code> file containing all 5 pages, ready to open in any
        TIFF-capable viewer or feed into a document management system that expects multi-page TIFF input.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing documents for fax, scanning, or archival systems that require TIFF input.</li>
          <li>Feeding a PDF into legacy document management or OCR software that expects multi-page TIFF files.</li>
          <li>Producing a lossless, uncompressed image archive of a PDF's pages.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this one TIFF file per PDF, or one per page?</strong> One multi-page TIFF file containing every page of the PDF, in order.</li>
          <li><strong>Is the TIFF compressed?</strong> No — this produces a baseline, uncompressed RGB TIFF, which keeps every pixel lossless at the cost of a larger file size than a compressed TIFF or PDF.</li>
          <li><strong>Will my text stay selectable?</strong> No — like any raster image format, TIFF has no text layer. Each page becomes a flat image.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion and encoding both happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-to-tiff" content={content}>
      <PdfToTiffContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfToTiff;
