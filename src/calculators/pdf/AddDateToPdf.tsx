'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { StandardFonts, rgb } from '@cantoo/pdf-lib';

type StampPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

const AddDateToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<StampPosition>('bottom-right');
  const [fontSize, setFontSize] = useState('12');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAdd = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    const size = parseInt(fontSize, 10);
    if (!size || size < 6 || size > 72) { setError('Font size must be between 6 and 72.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const dateStr = new Date().toLocaleDateString();
      const textWidth = font.widthOfTextAtSize(dateStr, size);
      const margin = 36;

      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        let x = margin;
        let y = height - margin - size;

        if (position.includes('center')) x = (width - textWidth) / 2;
        else if (position.includes('right')) x = width - textWidth - margin;
        if (position.includes('bottom')) y = margin;

        page.drawText(dateStr, { x, y, size, font, color: rgb(0, 0, 0) });
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-dated.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Font size"
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          inputProps={{ min: 6, max: 72 }}
          sx={{ mb: 2 }}
        />
        <Typography gutterBottom>Position</Typography>
        <ToggleButtonGroup value={position} exclusive onChange={(_, v) => v && setPosition(v)} fullWidth>
          <ToggleButton value="top-left">Top Left</ToggleButton>
          <ToggleButton value="top-center">Top Center</ToggleButton>
          <ToggleButton value="top-right">Top Right</ToggleButton>
          <ToggleButton value="bottom-left">Bottom Left</ToggleButton>
          <ToggleButton value="bottom-center">Bottom Center</ToggleButton>
          <ToggleButton value="bottom-right">Bottom Right</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAdd} disabled={busy || !file}>
        {busy ? 'Stamping...' : 'Add Date to All Pages'}
      </Button>
    </Box>
  );
};

const AddDateToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Date Stamp to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to stamp.</li>
          <li>Choose a position and font size for the date.</li>
          <li>Click <strong>Add Date to All Pages</strong> to download the stamped PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Stamping today&apos;s date in the bottom-right corner of every page at 12pt is a quick way to show
        when a document was printed, reviewed, or finalized.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Marking the print or review date on official documents.</li>
          <li>Timestamping forms before submission.</li>
          <li>Showing when a contract or agreement was last updated.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What date format is used?</strong> Your browser&apos;s default locale format (e.g. 8/27/2026 in US English).</li>
          <li><strong>Can I change the font?</strong> Currently only Helvetica is supported.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-date-to-pdf" content={content}>
      <AddDateToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddDateToPdf;
