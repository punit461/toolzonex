'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Slider, CircularProgress, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, rgb } from '@cantoo/pdf-lib';

const PdfStyleEditorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(0.15);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16) / 255,
      g: parseInt(h.substring(2, 4), 16) / 255,
      b: parseInt(h.substring(4, 6), 16) / 255,
    };
  };

  const handleApply = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const { r, g, b } = hexToRgb(bgColor);

      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        page.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: rgb(r, g, b),
          opacity,
        });
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-styled.pdf');
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

      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 3 }}>
        <TextField
          label="Background color"
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          sx={{ width: 120 }}
          InputLabelProps={{ shrink: true }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography gutterBottom>Opacity: {Math.round(opacity * 100)}%</Typography>
          <Slider value={opacity} min={0.05} max={0.8} step={0.05} onChange={(_, v) => setOpacity(v as number)} />
        </Box>
      </Stack>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleApply} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Processing...</> : 'Apply Style'}
      </Button>
    </Box>
  );
};

const PdfStyleEditor = () => {
  const content = (
    <>
      <Typography variant="h2">How to Change the Appearance of a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to restyle.</li>
          <li>Pick a background color and adjust its opacity to control the tint intensity.</li>
          <li>Click <strong>Apply Style</strong> to download the restyled PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A plain white-background report is too harsh for reading on screen at night. Applying a light cream background at 15% opacity
        gives every page a warm tint that&apos;s easier on the eyes, while the existing text and images remain fully visible.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding a subtle background color to make black-and-white documents easier to read on screen.</li>
          <li>Creating themed presentation handouts with colored page backgrounds.</li>
          <li>Branding internal documents with a company-color tint before printing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this cover the text?</strong> The rectangle is drawn behind the existing content, so all text and images remain visible on top of the new background.</li>
          <li><strong>Can I set different colors for different pages?</strong> Not yet — the same color and opacity is applied to all pages in the current version.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — styling happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-style-editor" content={content}>
      <PdfStyleEditorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfStyleEditor;
