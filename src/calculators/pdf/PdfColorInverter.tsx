'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { rasterizeAndTransformPdf, invertPixels } from './pdfRasterize';

const PdfColorInverterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    setProgress('Preparing...');
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const output = await rasterizeAndTransformPdf(bytes, { transformPixels: invertPixels, onProgress: setProgress });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-inverted.pdf');
    } catch {
      setError('Could not process this file. Make sure it is a valid, unencrypted PDF.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Alert severity="warning" sx={{ mt: 2 }}>
        This tool redraws every page as an image with inverted colors. Text becomes part of the image and is no
        longer selectable, searchable, or copyable.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Inverting...'}</> : 'Invert PDF Colors'}
      </Button>
    </Box>
  );
};

const PdfColorInverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Invert PDF Colors</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to invert.</li>
          <li>Click <strong>Invert PDF Colors</strong> — every page is rendered as an image and each pixel&apos;s red, green, and blue values are flipped (each becomes 255 minus its original value).</li>
          <li>Download the inverted PDF, which now looks like a photographic negative — light backgrounds become dark and vice versa.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A standard black-text-on-white-page document becomes white text on a black page after inversion —
        useful for a dark-mode-style reading view or for spotting faint details in scanned documents that
        show up better against an inverted background.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a dark-background version of a document for comfortable night-time reading.</li>
          <li>Highlighting faint pencil marks or watermarks that become more visible when colors are flipped.</li>
          <li>Producing a stylized negative-image version of a scanned photo or diagram embedded in a PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will my text still be selectable afterward?</strong> No. Inverting colors requires redrawing each page as an image, so all text and vector content becomes part of a flattened, non-selectable image.</li>
          <li><strong>Does this just invert colors, or change brightness/contrast too?</strong> Only colors are inverted (each RGB channel is flipped). Brightness and contrast are not otherwise adjusted.</li>
          <li><strong>Will large PDFs take a while?</strong> Every page is rendered and reprocessed individually, so very long documents take longer. Processing happens entirely in your browser.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens locally in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-color-inverter" content={content}>
      <PdfColorInverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfColorInverter;
