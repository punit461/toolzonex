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

const PdfPageCropByPixelsContent = () => {
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
    if (t < 0 || r < 0 || b < 0 || l < 0) { setError('Crop values cannot be negative.'); return; }
    if (t === 0 && r === 0 && b === 0 && l === 0) { setError('Enter a crop value greater than zero for at least one edge.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const cropTopPt = t * MM_TO_PT;
        const cropRightPt = r * MM_TO_PT;
        const cropBottomPt = b * MM_TO_PT;
        const cropLeftPt = l * MM_TO_PT;
        const x = cropLeftPt;
        const y = cropBottomPt;
        const w = width - cropLeftPt - cropRightPt;
        const h = height - cropBottomPt - cropTopPt;
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
        <TextField fullWidth type="number" label="Crop from top (mm)" value={top} onFocus={(e) => e.target.select()} onChange={(e) => setTop(e.target.value)} />
        <TextField fullWidth type="number" label="Crop from right (mm)" value={right} onFocus={(e) => e.target.select()} onChange={(e) => setRight(e.target.value)} />
        <TextField fullWidth type="number" label="Crop from bottom (mm)" value={bottom} onFocus={(e) => e.target.select()} onChange={(e) => setBottom(e.target.value)} />
        <TextField fullWidth type="number" label="Crop from left (mm)" value={left} onFocus={(e) => e.target.select()} onChange={(e) => setLeft(e.target.value)} />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Cropping...' : 'Crop Pages'}
      </Button>
    </Box>
  );
};

const PdfPageCropByPixels = () => {
  const content = (
    <>
      <Typography variant="h2">How to Crop PDF Pages by Precise Margins</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to crop.</li>
          <li>Enter the crop distance in millimetres for each edge: top, right, bottom, and left.</li>
          <li>Click <strong>Crop Pages</strong> — the visible area of every page is reduced by the specified margins, and the modified PDF downloads automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned document with a 12 mm scanner border on all sides becomes a clean, border-free PDF after
        cropping 12 mm from each edge. The tool converts your mm values to PDF points internally (1 mm ≈ 2.83
        points), so you don&apos;t need to do any conversion yourself.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Removing scanner borders and uneven white margins from scanned documents.</li>
          <li>Cropping unwanted headers, footers, or page-edge artifacts.</li>
          <li>Tightening margins on a PDF before printing to reduce ink usage or fit content on a smaller sheet.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why mm instead of pixels?</strong> PDF pages are defined in points (1/72 inch), not pixels. Pixel dimensions depend on screen resolution, so millimetres give a consistent, resolution-independent measurement that maps cleanly to PDF points.</li>
          <li><strong>What if the crop area would be zero or negative?</strong> That page is left unchanged to avoid creating an invalid PDF.</li>
          <li><strong>Does this delete content outside the margins?</strong> It sets the crop and media boxes so the trimmed area is no longer visible or printed. The original content may still exist in the file but won&apos;t be displayed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — cropping happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-page-crop-by-pixels" content={content}>
      <PdfPageCropByPixelsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPageCropByPixels;
