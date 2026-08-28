'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { rasterizeAndTransformPdf, grayscalePixels } from './pdfRasterize';

const PdfGrayscaleConverterContent = () => {
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
      const output = await rasterizeAndTransformPdf(bytes, { transformPixels: grayscalePixels, onProgress: setProgress });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-grayscale.pdf');
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
        This tool redraws every page as a grayscale image. Text becomes part of the image and is no longer
        selectable, searchable, or copyable.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Converting...'}</> : 'Convert to Grayscale'}
      </Button>
    </Box>
  );
};

const PdfGrayscaleConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to Grayscale</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the color PDF you want to convert.</li>
          <li>Click <strong>Convert to Grayscale</strong> — every page is rendered as an image and each pixel is replaced with its luminance value using the standard formula <code>0.299R + 0.587G + 0.114B</code>, which weights green highest since the eye is most sensitive to it.</li>
          <li>Download the grayscale PDF — every page now uses only shades of gray, with no color information.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A colorful marketing brochure with blue headers and orange highlights becomes a clean black-and-white
        document with proportional shades of gray, keeping relative brightness intact while removing all hue
        and saturation — ideal for black-and-white printing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a color document for a black-and-white printer or photocopier.</li>
          <li>Reducing toner/ink usage by removing color before printing large batches.</li>
          <li>Standardizing scanned color documents into a consistent grayscale archive.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Black &amp; White Converter?</strong> Grayscale keeps a full range of gray shades based on each pixel&apos;s brightness. The Black &amp; White Converter instead reduces every pixel to pure black or pure white using a threshold — grayscale looks like a black-and-white photo, black-and-white looks like a fax or line drawing.</li>
          <li><strong>Will my text still be selectable afterward?</strong> No — converting to grayscale requires redrawing each page as an image, so text and vector content become part of a flattened, non-selectable image.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-grayscale-converter" content={content}>
      <PdfGrayscaleConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfGrayscaleConverter;
