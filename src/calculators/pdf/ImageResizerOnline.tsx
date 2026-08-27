'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Button, Alert, TextField, FormControlLabel, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';

const PRESETS: Record<string, { label: string; w: number; h: number }> = {
  passport: { label: 'Passport (600 × 600)', w: 600, h: 600 },
  thumbnail: { label: 'Thumbnail (150 × 150)', w: 150, h: 150 },
  facebook: { label: 'Facebook Post (1200 × 630)', w: 1200, h: 630 },
  instagram: { label: 'Instagram (1080 × 1080)', w: 1080, h: 1080 },
  twitter: { label: 'Twitter Header (1500 × 500)', w: 1500, h: 500 },
  youtube: { label: 'YouTube Thumbnail (1280 × 720)', w: 1280, h: 720 },
};

const ImageResizerOnlineContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [preset, setPreset] = useState<string | null>(null);
  const origRatio = useRef(1);

  const handleFile = (files: File[]) => {
    const f = files[0] ?? null;
    setFile(f);
    setError('');
    if (f) {
      const img = new Image();
      img.onload = () => {
        origRatio.current = img.width / img.height;
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = URL.createObjectURL(f);
    }
  };

  const applyPreset = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    setPreset(value);
    if (value && PRESETS[value]) {
      setWidth(PRESETS[value].w);
      setHeight(PRESETS[value].h);
      setLockAspect(false);
    }
  };

  const handleWidth = (v: string) => {
    const w = parseInt(v, 10) || 0;
    setWidth(w);
    if (lockAspect && origRatio.current) setHeight(Math.round(w / origRatio.current));
  };

  const handleHeight = (v: string) => {
    const h = parseInt(v, 10) || 0;
    setHeight(h);
    if (lockAspect && origRatio.current) setWidth(Math.round(h * origRatio.current));
  };

  const resize = async () => {
    setError('');
    if (!file) { setError('Choose an image first.'); return; }
    if (width < 1 || height < 1) { setError('Enter valid dimensions.'); return; }
    setBusy(true);
    try {
      const url = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const el = new Image();
        el.onload = () => res(el);
        el.onerror = () => rej(new Error('load'));
        el.src = url;
      });
      URL.revokeObjectURL(url);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);

      const ext = file.type.includes('png') ? 'png' : file.type.includes('webp') ? 'webp' : 'jpg';
      const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';

      canvas.toBlob((blob) => {
        if (!blob) { setError('Resize failed.'); setBusy(false); return; }
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = file.name.replace(/\.[^.]+$/, '') + '-resized.' + ext;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        setBusy(false);
      }, mime);
    } catch {
      setError('Could not load this image. Use JPG, PNG, or WEBP.');
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={handleFile} label="image" selectedNames={file ? [file.name] : []} accept="image/jpeg,image/png,image/webp" />

      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>Resize Preset</Typography>
      <ToggleButtonGroup value={preset} exclusive onChange={applyPreset} fullWidth size="small">
        {Object.entries(PRESETS).map(([k, p]) => (
          <ToggleButton key={k} value={k}>{p.label}</ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', gap: 2, mt: 3, alignItems: 'center' }}>
        <TextField label="Width (px)" type="number" value={width} onChange={(e) => handleWidth(e.target.value)} size="small" sx={{ flex: 1 }} inputProps={{ min: 1 }} />
        <TextField label="Height (px)" type="number" value={height} onChange={(e) => handleHeight(e.target.value)} size="small" sx={{ flex: 1 }} inputProps={{ min: 1 }} />
        <FormControlLabel
          control={<Switch checked={lockAspect} onChange={(e) => setLockAspect(e.target.checked)} />}
          label="Lock"
        />
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={resize} disabled={busy || !file}>
        {busy ? 'Resizing...' : 'Resize & Download'}
      </Button>
    </Box>
  );
};

const ImageResizerOnline = () => {
  const content = (
    <>
      <Typography variant="h2">How to Resize an Image Online</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a JPG, PNG, or WEBP image.</li>
          <li>Choose a preset or enter custom width and height in pixels.</li>
          <li>Toggle <strong>Lock</strong> to keep the original aspect ratio while resizing.</li>
          <li>Click <strong>Resize &amp; Download</strong> to save the resized image.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4000 × 3000 phone photo can be resized to 800 × 600 pixels for a website banner, or to 150 × 150 for a thumbnail — all without uploading anything to a server.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing images for social media posts (Facebook, Instagram, Twitter).</li>
          <li>Scaling down large photos for faster website loading.</li>
          <li>Creating passport-size or ID-card-size images.</li>
          <li>Reducing resolution before emailing large attachments.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does resizing reduce quality?</strong> Scaling down is generally imperceptible. Scaling up may introduce slight softness, as the tool cannot invent detail that wasn't in the original.</li>
          <li><strong>What formats are supported?</strong> JPG, PNG, and WEBP — both as input and output.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all resizing happens in your browser using the canvas API.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/image-resizer-online" content={content}>
      <ImageResizerOnlineContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ImageResizerOnline;
