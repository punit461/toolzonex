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

const AddPdfMarginsContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [top, setTop] = useState('15');
  const [right, setRight] = useState('15');
  const [bottom, setBottom] = useState('15');
  const [left, setLeft] = useState('15');
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
    if (t <= 0 && r <= 0 && b <= 0 && l <= 0) { setError('Enter at least one margin greater than zero.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const leftPt = l * MM_TO_PT;
        const bottomPt = b * MM_TO_PT;
        const topPt = t * MM_TO_PT;
        const rightPt = r * MM_TO_PT;
        const newWidth = width + leftPt + rightPt;
        const newHeight = height + topPt + bottomPt;
        page.setMediaBox(0, 0, newWidth, newHeight);
        page.translateContent(leftPt, bottomPt);
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-margins.pdf');
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
        {busy ? 'Adding Margins...' : 'Add Margins'}
      </Button>
    </Box>
  );
};

const AddPdfMargins = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add Margins to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to add margins to.</li>
          <li>Enter the margin size in millimetres for each edge: top, right, bottom, and left.</li>
          <li>Click <strong>Add Margins</strong> — the page size increases by the specified amount and the content is shifted to maintain its relative position.</li>
          <li>Download the modified PDF with the new white-space margins.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A contract PDF with content that touches the edges of the page becomes more readable after adding
        15 mm of margin on every side. The page grows from A4 (210 × 297 mm) to 240 × 327 mm, giving the
        content comfortable breathing room without altering the text itself.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding white space around a PDF before printing to prevent content from being cut off.</li>
          <li>Creating room for handwritten notes in the margins of a reference document.</li>
          <li>Making a dense PDF more readable by increasing the breathing room around the content.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from cropping?</strong> Cropping reduces the page size and hides content near the edges. Adding margins does the opposite — it increases the page size, giving the existing content more surrounding space.</li>
          <li><strong>Does the content stay centered?</strong> The content keeps its original position relative to the bottom-left corner of the page, then the page grows outward. To visually center it, use equal margins on opposing sides.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — processing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-pdf-margins" content={content}>
      <AddPdfMarginsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddPdfMargins;
