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

const ResizePdfPagesContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [widthMm, setWidthMm] = useState('210');
  const [heightMm, setHeightMm] = useState('297');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const w = parseFloat(widthMm);
    const h = parseFloat(heightMm);
    if (!w || w <= 0 || !h || h <= 0) { setError('Enter valid width and height in millimetres.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const ptWidth = w * MM_TO_PT;
      const ptHeight = h * MM_TO_PT;
      doc.getPages().forEach((page) => {
        page.setSize(ptWidth, ptHeight);
      });
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-resized.pdf');
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

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 3 }}>
        <TextField
          fullWidth
          type="number"
          label="Width (mm)"
          value={widthMm}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setWidthMm(e.target.value)}
        />
        <TextField
          fullWidth
          type="number"
          label="Height (mm)"
          value={heightMm}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setHeightMm(e.target.value)}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Resizing...' : 'Resize All Pages'}
      </Button>
    </Box>
  );
};

const ResizePdfPages = () => {
  const content = (
    <>
      <Typography variant="h2">How to Resize PDF Pages</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose page size you want to change.</li>
          <li>Enter the target width and height in millimetres (e.g. 210 &times; 297 for A4, or 216 &times; 356 for US Legal).</li>
          <li>Click <strong>Resize All Pages</strong> to apply the new dimensions and download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering 148 &times; 210 mm converts every page to A5, a common size for booklets. The dimensions are
        converted internally to PDF points (1 mm = 2.8346 pt), so the math stays precise regardless of
        rounding.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Shrinking a Letter-sized PDF to A4 for international distribution.</li>
          <li>Preparing a custom-size document for a specific bindery or printer.</li>
          <li>Standardizing a collection of PDFs that have inconsistent page sizes into one uniform dimension.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What are common page sizes in millimetres?</strong> A4 is 210 &times; 297 mm, US Letter is 215.9 &times; 279.4 mm, US Legal is 215.9 &times; 355.6 mm.</li>
          <li><strong>Will my text reflow?</strong> No — the page canvas is resized, but content is not reflowed. Very large size changes may cause content to appear near or off the page edges.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — resizing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/resize-pdf-pages" content={content}>
      <ResizePdfPagesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ResizePdfPages;
