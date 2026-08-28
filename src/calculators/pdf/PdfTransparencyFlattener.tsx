'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { rasterizeAndTransformPdf } from './pdfRasterize';

const PdfTransparencyFlattenerContent = () => {
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
      const output = await rasterizeAndTransformPdf(bytes, { whiteBackground: true, onProgress: setProgress });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-flattened.pdf');
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
        This tool redraws every page onto a solid white background as an image. Text becomes part of the image
        and is no longer selectable, searchable, or copyable.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Flattening...'}</> : 'Flatten Transparency'}
      </Button>
    </Box>
  );
};

const PdfTransparencyFlattener = () => {
  const content = (
    <>
      <Typography variant="h2">How to Flatten PDF Transparency</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that contains transparent or semi-transparent elements — watermarks, overlapping shapes, translucent highlights, or soft shadows.</li>
          <li>Click <strong>Flatten Transparency</strong> — each page is rendered onto a solid white background first, so any transparent or semi-transparent content composites onto that opaque white the way it would appear on-screen, then the result is saved as a fully opaque image page.</li>
          <li>Download the flattened PDF. No layer in the output has any transparency left — everything is fully opaque.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A page with a 40%-opacity highlight box over some text renders that highlight blended onto white in the
        output image, exactly as it looks visually — but the resulting PDF page has no transparency information
        left at all, which avoids rendering inconsistencies in printers or older PDF viewers that handle
        transparency poorly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fixing PDFs that render incorrectly (missing highlights, black boxes) on older printers or RIP software that doesn't support transparency.</li>
          <li>Preparing a print-ready file for a commercial printer that requires fully flattened, opaque artwork.</li>
          <li>Locking in the current visual appearance of translucent overlays so they can't shift or disappear in other viewers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What exactly does "flatten transparency" mean here?</strong> It means every page is rendered to a fixed image against a white background, so any semi-transparent regions are baked into their final composited color. The output PDF has no transparency objects left — everything is opaque, flat pixels.</li>
          <li><strong>Will the background always be white?</strong> Yes — this tool assumes a white page background, which matches how the overwhelming majority of PDFs are meant to be viewed and printed.</li>
          <li><strong>Will my text still be selectable afterward?</strong> No — flattening requires redrawing each page as an image, so text and vector content become part of a non-selectable image.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-transparency-flattener" content={content}>
      <PdfTransparencyFlattenerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfTransparencyFlattener;
