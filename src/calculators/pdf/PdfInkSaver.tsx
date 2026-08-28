'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Slider, Switch, FormControlLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { rasterizeAndTransformPdf, grayscalePixels, lightenPixels } from './pdfRasterize';

const PdfInkSaverContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [useGrayscale, setUseGrayscale] = useState(true);
  const [lighten, setLighten] = useState(30);
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
      const output = await rasterizeAndTransformPdf(bytes, {
        transformPixels: (data) => {
          if (useGrayscale) grayscalePixels(data);
          if (lighten > 0) lightenPixels(data, lighten / 100);
        },
        onProgress: setProgress,
      });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-ink-saver.pdf');
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

      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={<Switch checked={useGrayscale} onChange={(e) => setUseGrayscale(e.target.checked)} />}
          label="Convert to grayscale (avoids using color ink/toner)"
        />
      </Box>

      <Box sx={{ mt: 1, mb: 1 }}>
        <Typography gutterBottom>Lighten by: {lighten}%</Typography>
        <Slider value={lighten} min={0} max={80} step={5} onChange={(_, v) => setLighten(v as number)} />
        <Typography variant="caption" color="text.secondary">
          Blends every non-white pixel toward white by this percentage, reducing how much ink or toner a printer
          uses. Higher values save more ink but produce a lighter, lower-contrast printout.
        </Typography>
      </Box>

      <Alert severity="warning" sx={{ mt: 1 }}>
        This tool redraws every page as an image. Text becomes part of the image and is no longer selectable,
        searchable, or copyable.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Processing...'}</> : 'Save Ink'}
      </Button>
    </Box>
  );
};

const PdfInkSaver = () => {
  const content = (
    <>
      <Typography variant="h2">How to Reduce Ink Usage When Printing a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you plan to print.</li>
          <li>Leave <strong>Convert to grayscale</strong> on to avoid using any color ink/toner cartridges — most of the savings for color documents comes from this step alone.</li>
          <li>Raise the <strong>Lighten by</strong> slider to blend every non-white pixel further toward white, which reduces the amount of ink or toner a printer lays down for that page.</li>
          <li>Click <strong>Save Ink</strong> and download the result, then print it as usual.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A dense, dark-text report set to grayscale plus a 30% lighten pass prints noticeably faster and uses less
        toner than the original, while headings and body text stay perfectly readable — useful for long internal
        drafts where print quality matters less than saving ink.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing long draft documents or internal reports where saving ink matters more than print quality.</li>
          <li>Cutting color-cartridge usage when printing a colorful PDF on a home inkjet printer.</li>
          <li>Preparing lighter-weight printouts for large batch print jobs, like handouts for a class or meeting.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this actually reduce a printer's ink consumption?</strong> Yes, in the way this tool controls: lighter pixels and grayscale-only pixels require less ink or toner to reproduce than dark, colorful ones. The exact savings depend on your specific printer.</li>
          <li><strong>Will very light settings make my document hard to read?</strong> A high lighten percentage can wash out fine details or thin text. Start around 20-30% and increase gradually while checking a test page.</li>
          <li><strong>Will my text still be selectable afterward?</strong> No — this process requires redrawing each page as an image, so text and vector content become part of a non-selectable image.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-ink-saver" content={content}>
      <PdfInkSaverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfInkSaver;
