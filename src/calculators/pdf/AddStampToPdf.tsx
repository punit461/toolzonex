'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Slider, Stack, CircularProgress, MenuItem, Select, InputLabel, FormControl, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, StandardFonts, rgb, degrees } from '@cantoo/pdf-lib';

const STAMPS = ['CONFIDENTIAL', 'DRAFT', 'APPROVED', 'REJECTED', 'COPY', 'FINAL', 'NOT FOR DISTRIBUTION'];

const AddStampToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [stampText, setStampText] = useState('CONFIDENTIAL');
  const [customText, setCustomText] = useState('');
  const [stampColor, setStampColor] = useState('#ff0000');
  const [opacity, setOpacity] = useState(0.25);
  const [fontSize, setFontSize] = useState(72);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.substring(0, 2), 16) / 255,
      g: parseInt(h.substring(2, 4), 16) / 255,
      b: parseInt(h.substring(4, 6), 16) / 255,
    };
  };

  const activeText = customText.trim() || stampText;

  const handleApply = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!activeText.trim()) { setError('Enter stamp text.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const { r, g, b } = hexToRgb(stampColor);

      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(activeText, fontSize);

        page.drawText(activeText, {
          x: width / 2 - textWidth / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity,
          rotate: degrees(45),
        });
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-stamped.pdf');
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
        <Typography variant="subtitle2" gutterBottom>Choose a preset stamp or enter custom text:</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          {STAMPS.map((s) => (
            <Chip key={s} label={s} color={stampText === s && !customText ? 'primary' : 'default'} onClick={() => { setStampText(s); setCustomText(''); }} variant={stampText === s && !customText ? 'filled' : 'outlined'} />
          ))}
        </Stack>
        <TextField fullWidth label="Custom stamp text (overrides preset)" value={customText} onChange={(e) => setCustomText(e.target.value)} sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2}>
          <TextField label="Font size" type="number" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} sx={{ width: 100 }} inputProps={{ min: 24, max: 200 }} />
          <TextField label="Stamp color" type="color" value={stampColor} onChange={(e) => setStampColor(e.target.value)} sx={{ width: 120 }} InputLabelProps={{ shrink: true }} />
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>Opacity: {Math.round(opacity * 100)}%</Typography>
          <Slider value={opacity} min={0.05} max={0.6} step={0.05} onChange={(_, v) => setOpacity(v as number)} />
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleApply} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Processing...</> : 'Stamp All Pages'}
      </Button>
    </Box>
  );
};

const AddStampToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a Stamp to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to stamp.</li>
          <li>Choose a preset stamp like CONFIDENTIAL or DRAFT, or enter your own text.</li>
          <li>Pick a color, size, and opacity, then click <strong>Stamp All Pages</strong> to download.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An architect marks a 30-page building plan as &quot;APPROVED&quot; in large green diagonal text at 20% opacity.
        Every page gets the stamp, making the approval status immediately clear when the document is printed or viewed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Marking documents as DRAFT, CONFIDENTIAL, or APPROVED before circulation.</li>
          <li>Adding a large diagonal stamp to internal reports to indicate their status.</li>
          <li>Branding shared PDFs with a company name or review status across all pages.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from a watermark?</strong> A stamp is typically larger, more opaque, and placed diagonally across the page center — it&apos;s designed to be highly visible rather than subtle.</li>
          <li><strong>Can I use a different stamp on different pages?</strong> Not yet — the same stamp text is applied to every page in the current version.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — stamping happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-stamp-to-pdf-page" content={content}>
      <AddStampToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddStampToPdf;
