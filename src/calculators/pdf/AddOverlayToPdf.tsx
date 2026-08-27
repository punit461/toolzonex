'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Slider, Stack, CircularProgress, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';

const AddOverlayToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [overlayText, setOverlayText] = useState('CONFIDENTIAL');
  const [fontSize, setFontSize] = useState(36);
  const [textColor, setTextColor] = useState('#ff0000');
  const [opacity, setOpacity] = useState(0.4);
  const [position, setPosition] = useState<'top-right' | 'center' | 'bottom-left'>('center');
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
    if (!overlayText.trim()) { setError('Enter overlay text.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const { r, g, b } = hexToRgb(textColor);

      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(overlayText, fontSize);

        let x: number, y: number;
        switch (position) {
          case 'top-right':
            x = width - textWidth - 30;
            y = height - 30;
            break;
          case 'bottom-left':
            x = 30;
            y = 30;
            break;
          default:
            x = width / 2 - textWidth / 2;
            y = height / 2;
        }

        page.drawText(overlayText, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity,
        });
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-overlay.pdf');
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

      <Stack spacing={2} sx={{ mt: 3 }}>
        <TextField fullWidth label="Overlay text" value={overlayText} onChange={(e) => setOverlayText(e.target.value)} />
        <Stack direction="row" spacing={2}>
          <TextField label="Font size" type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} sx={{ width: 100 }} inputProps={{ min: 8, max: 120 }} />
          <TextField label="Text color" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} sx={{ width: 120 }} InputLabelProps={{ shrink: true }} />
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Position</InputLabel>
            <Select value={position} label="Position" onChange={(e) => setPosition(e.target.value as any)}>
              <MenuItem value="top-right">Top Right</MenuItem>
              <MenuItem value="center">Center</MenuItem>
              <MenuItem value="bottom-left">Bottom Left</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Box>
          <Typography gutterBottom>Opacity: {Math.round(opacity * 100)}%</Typography>
          <Slider value={opacity} min={0.1} max={0.9} step={0.05} onChange={(_, v) => setOpacity(v as number)} />
        </Box>
      </Stack>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleApply} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Processing...</> : 'Add Overlay'}
      </Button>
    </Box>
  );
};

const AddOverlayToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Text Overlay to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to overlay.</li>
          <li>Enter your overlay text, choose a font size, color, position, and opacity.</li>
          <li>Click <strong>Add Overlay</strong> to download the modified PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A team lead wants to stamp &quot;DRAFT v2&quot; in red at the top-right corner of a 12-page proposal before circulating it internally.
        Setting the text to 28pt at 40% opacity creates a visible but unobtrusive mark on every page without hiding the content underneath.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Labeling documents as &quot;DRAFT&quot;, &quot;INTERNAL&quot;, or &quot;REVIEW COPY&quot; before circulation.</li>
          <li>Adding page identifiers like a project name or date in a chosen corner of every page.</li>
          <li>Marking confidential documents with a semi-transparent text overlay.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this create a watermark?</strong> Yes — this tool draws semi-transparent text on top of every page, which functions as a visual overlay or watermark.</li>
          <li><strong>Can I use different text on different pages?</strong> Not yet — the same text, color, and position is applied to all pages.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — the overlay is applied entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-overlay-to-pdf-online" content={content}>
      <AddOverlayToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddOverlayToPdf;
