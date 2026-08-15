'use client';

import { useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton, Alert } from '@mui/material';
import { PDFDocument, degrees } from 'pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

const RotatePdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleRotate = async () => {
    setError('');
    if (!file) {
      setError('Choose a PDF file first.');
      return;
    }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await PDFDocument.load(bytes);
      doc.getPages().forEach((page) => {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle) % 360));
      });
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-rotated.pdf');
    } catch (e) {
      setError('Could not rotate this file. Make sure it is a valid, non-password-protected PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Rotate all pages by</Typography>
        <ToggleButtonGroup value={angle} exclusive onChange={(_, v) => v !== null && setAngle(v)} fullWidth>
          <ToggleButton value={90}>90&deg; Clockwise</ToggleButton>
          <ToggleButton value={180}>180&deg;</ToggleButton>
          <ToggleButton value={270}>90&deg; Counter-clockwise</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRotate} disabled={busy || !file}>
        {busy ? 'Rotating...' : 'Rotate PDF'}
      </Button>
    </Box>
  );
};

const RotatePdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Rotate a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to rotate.</li>
          <li>Choose a rotation angle: 90&deg; clockwise, 180&deg;, or 90&deg; counter-clockwise.</li>
          <li>Click <strong>Rotate PDF</strong> to download the rotated file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned document that came out sideways can be fixed by rotating it 90&deg; clockwise (or
        counter-clockwise, depending on which way it&apos;s turned) so every page reads right-side up.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fixing sideways or upside-down scanned pages.</li>
          <li>Correcting orientation before printing or sharing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this rotate every page the same way?</strong> Yes, the chosen angle is applied to all pages in the file.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — rotation happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title="Rotate PDF"
      description="Rotate all pages in a PDF by 90, 180, or 270 degrees. Free, private, runs entirely in your browser."
      url="/tools/rotate-pdf"
      content={content}
      category="Tools"
    >
      <RotatePdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RotatePdf;
