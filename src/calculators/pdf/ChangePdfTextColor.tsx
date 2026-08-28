'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Slider, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { rasterizeAndTransformPdf, recolorDarkPixels } from './pdfRasterize';

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.substring(0, 2), 16), parseInt(h.substring(2, 4), 16), parseInt(h.substring(4, 6), 16)];
}

const ChangePdfTextColorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [color, setColor] = useState('#1a56db');
  const [threshold, setThreshold] = useState(110);
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
      const target = hexToRgb(color);
      const output = await rasterizeAndTransformPdf(bytes, {
        whiteBackground: true,
        transformPixels: (data) => recolorDarkPixels(data, target, threshold),
        onProgress: setProgress,
      });
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-recolored.pdf');
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
        <TextField label="New text color" type="color" value={color} onChange={(e) => setColor(e.target.value)} sx={{ width: 140 }} InputLabelProps={{ shrink: true }} />
      </Box>

      <Box sx={{ mt: 3, mb: 1 }}>
        <Typography gutterBottom>Darkness threshold: {threshold}</Typography>
        <Slider value={threshold} min={30} max={220} step={1} onChange={(_, v) => setThreshold(v as number)} />
        <Typography variant="caption" color="text.secondary">
          Pixels darker than this are recolored; lighter background pixels are left alone. Raise it if some text is
          being missed, lower it if background shading is being recolored too.
        </Typography>
      </Box>

      <Alert severity="warning" sx={{ mt: 1 }}>
        This is a pixel-based approximation, not true vector text recoloring — it works best on simple black-text-on-white
        pages. Every page is redrawn as an image, so the output text is no longer selectable, searchable, or copyable.
      </Alert>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Recoloring...'}</> : 'Change Text Color'}
      </Button>
    </Box>
  );
};

const ChangePdfTextColor = () => {
  const content = (
    <>
      <Typography variant="h2">How to Change PDF Text Color</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose text color you want to change.</li>
          <li>Pick the new color you want dark text recolored to.</li>
          <li>Adjust the darkness threshold if needed — it decides which pixels count as &quot;text&quot; versus background.</li>
          <li>Click <strong>Change Text Color</strong> and download the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Why this works by approximation, not true text editing</Typography>
      <Typography variant="body1">
        Genuinely recoloring PDF text means rewriting the color operators inside each page&apos;s content stream,
        per glyph — something that requires a full content-stream parsing and rewriting engine. This tool takes a
        different, pragmatic approach: it renders each page to an image, then shifts pixels darker than your chosen
        threshold (the typical color of body text) toward your target color, leaving lighter background pixels
        untouched. For a simple document with black text on a plain white or light background, the visual result
        looks like the text changed color. It won&apos;t work well on documents with colored text, dark backgrounds,
        or text embedded in complex graphics, since the tool can&apos;t distinguish text pixels from other dark
        content by anything other than brightness.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A one-page memo with plain black text on white becomes a memo with navy blue text after choosing that
        color and running the tool — the white background stays white, and the black lettering shifts to blue.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Giving a simple black-and-white document a branded text color for a quick visual refresh.</li>
          <li>Making body text a specific accent color for print materials or presentations.</li>
          <li>Experimenting with a document's look before deciding whether to redo it properly in its source editor.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will my text still be selectable afterward?</strong> No — every page is flattened into an image as part of this process, so the resulting PDF has no selectable, searchable, or copyable text.</li>
          <li><strong>Will this work on colored or light-colored text?</strong> Not well. The tool identifies "text" purely by brightness (anything darker than the threshold), so it only reliably targets dark text — light gray or colored text may be missed, or unrelated dark image content may get recolored instead.</li>
          <li><strong>Can I recolor only some text, not all of it?</strong> No — the color shift is applied uniformly to every sufficiently dark pixel on every page; there's no way to target specific words or sections.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/change-pdf-text-color" content={content}>
      <ChangePdfTextColorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ChangePdfTextColor;
