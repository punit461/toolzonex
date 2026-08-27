'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const MM_TO_PT = 2.8346;

const CropPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [top, setTop] = useState('10');
  const [right, setRight] = useState('10');
  const [bottom, setBottom] = useState('10');
  const [left, setLeft] = useState('10');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const t = parseFloat(top) || 0;
    const r = parseFloat(right) || 0;
    const b = parseFloat(bottom) || 0;
    const l = parseFloat(left) || 0;
    if (t < 0 || r < 0 || b < 0 || l < 0) { setError('Margins cannot be negative.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const x = l * MM_TO_PT;
        const y = b * MM_TO_PT;
        const w = width - (l + r) * MM_TO_PT;
        const h = height - (t + b) * MM_TO_PT;
        if (w > 0 && h > 0) {
          page.setCropBox(x, y, w, h);
          page.setMediaBox(x, y, w, h);
        }
      });
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-cropped.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' }, gap: 2, mt: 3 }}>
        <TextField fullWidth type="number" label="Top margin (mm)" value={top} onFocus={(e) => e.target.select()} onChange={(e) => setTop(e.target.value)} />
        <TextField fullWidth type="number" label="Right margin (mm)" value={right} onFocus={(e) => e.target.select()} onChange={(e) => setRight(e.target.value)} />
        <TextField fullWidth type="number" label="Bottom margin (mm)" value={bottom} onFocus={(e) => e.target.select()} onChange={(e) => setBottom(e.target.value)} />
        <TextField fullWidth type="number" label="Left margin (mm)" value={left} onFocus={(e) => e.target.select()} onChange={(e) => setLeft(e.target.value)} />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Cropping...' : 'Crop PDF'}
      </Button>
    </Box>
  );
};

const CropPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Crop a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to crop.</li>
          <li>Enter how many millimetres to trim from each edge: top, right, bottom, and left.</li>
          <li>Click <strong>Crop PDF</strong> — the visible area of every page is reduced by the specified margins.</li>
          <li>Download the cropped file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned A4 document with a 15 mm scanner border on every side becomes a clean, border-free PDF
        after cropping 15 mm from each edge. The content area shrinks, removing the unwanted white space
        or scanner artifacts.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Removing scanner borders and uneven white margins from scanned documents.</li>
          <li>Cropping unwanted headers or footers from page edges.</li>
          <li>Tightening margins on a PDF before printing to reduce ink usage or fit more content per page.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if the margins are too large?</strong> If the crop area would be zero or negative on any dimension, that page is left unchanged to avoid creating an invalid PDF.</li>
          <li><strong>Does this delete the content outside the margins?</strong> It sets the crop and media boxes so the trimmed area is no longer visible or printed. The original content may still exist in the file but won&apos;t be displayed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — cropping happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/crop-pdf" content={content}>
      <CropPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CropPdf;
