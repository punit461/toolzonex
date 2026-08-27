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
const AADHAR_W_MM = 85.6;
const AADHAR_H_MM = 53.98;

const CropAadharCardContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [pages, setPages] = useState('all');
  const [offsetX, setOffsetX] = useState('');
  const [offsetY, setOffsetY] = useState('');
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF or image file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const wPt = AADHAR_W_MM * MM_TO_PT;
      const hPt = AADHAR_H_MM * MM_TO_PT;
      const isImage = /\.(png|jpe?g|webp|bmp)$/i.test(file.name) || file.type.startsWith('image/');

      if (isImage) {
        const doc = await PDFDocument.create();
        const page = doc.addPage([wPt, hPt]);
        const img = file.type === 'image/png' || /\.png$/i.test(file.name)
          ? await doc.embedPng(bytes)
          : await doc.embedJpg(bytes);
        const iw = img.width;
        const ih = img.height;
        const imgRatio = iw / ih;
        const pageRatio = wPt / hPt;
        let dw = wPt;
        let dh = hPt;
        let dx = 0;
        let dy = 0;
        if (imgRatio > pageRatio) {
          dh = hPt;
          dw = hPt * imgRatio;
          dx = (wPt - dw) / 2;
        } else {
          dw = wPt;
          dh = wPt / imgRatio;
          dy = (hPt - dh) / 2;
        }
        page.drawImage(img, { x: dx, y: dy, width: dw, height: dh });
        const output = await doc.save();
        downloadBytes(output, 'aadhar-cropped.pdf');
        return;
      }

      const doc = await unlock(bytes);
      const allPages = doc.getPages();
      const indices = pages === 'all' ? allPages.map((_, i) => i) : parseRange(pages, allPages.length);
      if (indices.length === 0) { setError('No matching pages found for that range.'); setBusy(false); return; }
      const firstSize = allPages[indices[0]].getSize();
      const x0 = offsetX.trim() ? (parseFloat(offsetX) || 0) * MM_TO_PT : (firstSize.width - wPt) / 2;
      const y0 = offsetY.trim() ? (parseFloat(offsetY) || 0) * MM_TO_PT : (firstSize.height - hPt) / 2;
      for (const i of indices) {
        const p = allPages[i];
        p.setMediaBox(x0, y0, wPt, hPt);
        p.setCropBox(x0, y0, wPt, hPt);
      }
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-aadhar.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF or image.');
      }
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="Aadhar PDF or image" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Pages (e.g. 1, 2 or 'all')"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          sx={{ mb: 2 }}
          helperText="Which pages contain the card (PDF only)."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <TextField label="Offset X (mm, from left)" value={offsetX} onChange={(e) => setOffsetX(e.target.value)} helperText="blank = center" />
          <TextField label="Offset Y (mm, from bottom)" value={offsetY} onChange={(e) => setOffsetY(e.target.value)} helperText="blank = center" />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Card size is fixed to {AADHAR_W_MM} &times; {AADHAR_H_MM} mm (credit-card size).
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Cropping...' : 'Crop to Aadhar Size'}
      </Button>
    </Box>
  );
};

function parseRange(spec: string, pageCount: number): number[] {
  const out: number[] = [];
  for (const part of spec.split(',').map((s) => s.trim()).filter(Boolean)) {
    const m = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      const start = Math.max(1, parseInt(m[1], 10));
      const end = Math.min(pageCount, parseInt(m[2], 10));
      for (let i = start; i <= end; i++) out.push(i - 1);
    } else if (/^\d+$/.test(part)) {
      const n = parseInt(part, 10);
      if (n >= 1 && n <= pageCount) out.push(n - 1);
    }
  }
  return out;
}

const CropAadharCard = () => {
  const content = (
    <>
      <Typography variant="h2">How to Crop an Aadhar Card</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload your Aadhar card as a PDF or an image (JPG/PNG).</li>
          <li>Pick the page(s) that contain the card, and optionally set the offset if it is not centered.</li>
          <li>Click <strong>Crop to Aadhar Size</strong> &mdash; the page is trimmed to the standard 85.6 &times; 53.98 mm card size.</li>
          <li>Download the cropped file, ready to print or attach.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned Aadhar is saved on an A4 page with the card in the upper half. The tool crops a credit-card-sized
        rectangle (85.6 &times; 53.98 mm) out of the page, leaving just the card &mdash; perfect for uploading to a form
        that requires an exact-size image.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Trimming a full-page scan down to just the card for online form uploads.</li>
          <li>Standardizing an Aadhar image to the official card dimensions.</li>
          <li>Extracting a single card from a sheet that holds both front and back.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does it change the card itself?</strong> No &mdash; it trims the surrounding white space to the card&apos;s dimensions. The card content stays intact.</li>
          <li><strong>What if my card is rotated?</strong> This tool assumes the card is upright. Rotate the PDF first if needed.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No &mdash; cropping happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/crop-aadhar-card" content={content}>
      <CropAadharCardContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CropAadharCard;
