'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { rasterizeAndTransformPdf, thresholdPixels } from './pdfRasterize';

const PdfBlackAndWhiteConverterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [threshold, setThreshold] = useState(128);
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
        transformPixels: (data) => thresholdPixels(data, threshold),
        onProgress: setProgress,
      });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-bw.pdf');
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

      <Box sx={{ mt: 3, mb: 1 }}>
        <Typography gutterBottom>Black/white threshold: {threshold}</Typography>
        <Slider value={threshold} min={1} max={254} step={1} onChange={(_, v) => setThreshold(v as number)} />
        <Typography variant="caption" color="text.secondary">
          Pixels brighter than this value turn white, everything else turns black. Lower the threshold if your
          output looks too dark; raise it if too much detail is lost to white.
        </Typography>
      </Box>

      <Alert severity="warning" sx={{ mt: 1 }}>
        This tool redraws every page as a pure black-and-white image. Text becomes part of the image and is no
        longer selectable, searchable, or copyable.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Converting...'}</> : 'Convert to Black & White'}
      </Button>
    </Box>
  );
};

const PdfBlackAndWhiteConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert a PDF to Black &amp; White</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to convert.</li>
          <li>Adjust the <strong>threshold</strong> slider if needed — every pixel brighter than the threshold becomes pure white, and everything else becomes pure black. The default of 128 works well for most text documents.</li>
          <li>Click <strong>Convert to Black &amp; White</strong> and download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Grayscale vs. Black &amp; White — what&apos;s the difference?</Typography>
      <Typography variant="body1">
        These are two different, commonly confused conversions. <strong>Grayscale</strong> (see the PDF Grayscale
        Converter) keeps a smooth range of gray shades based on each pixel&apos;s brightness — it looks like a
        black-and-white photograph. <strong>Black &amp; White</strong> (this tool) uses a hard threshold so every
        pixel becomes either pure black or pure white with no shades of gray in between — it looks like a fax,
        photocopy, or line drawing. This binary threshold behavior is what makes this tool distinct.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A scanned page with a slightly yellowed background and faded gray text becomes a crisp black-on-white
        page once thresholded — the background clips to pure white and the text clips to pure black, similar
        to output from an old fax machine or photocopier.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a low-contrast scan so text stands out sharply against a pure white background.</li>
          <li>Preparing line art, forms, or diagrams for a fax machine or basic monochrome printer.</li>
          <li>Producing a stark, high-contrast look for archival scans of typewritten documents.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does the threshold control?</strong> It's the brightness cutoff (0-255) that decides whether a pixel becomes white or black. A higher threshold makes more pixels turn black; a lower threshold makes more turn white.</li>
          <li><strong>Will my text still be selectable afterward?</strong> No — the conversion requires redrawing each page as an image, so text and vector content become part of a flattened, non-selectable image.</li>
          <li><strong>My photos look too harsh after conversion — why?</strong> A hard black/white threshold discards all mid-tones, so photographs lose detail. This tool is best suited to text documents, forms, and line art rather than photographs — use the Grayscale Converter instead if you need to preserve photo detail.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-black-and-white-converter" content={content}>
      <PdfBlackAndWhiteConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfBlackAndWhiteConverter;
