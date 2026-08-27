'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Button, Alert, Slider, Stack, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';

const QUALITY_PRESETS = { low: 0.3, medium: 0.6, high: 0.85 };

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
};

const ImageCompressorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [quality, setQuality] = useState(0.6);
  const [preset, setPreset] = useState<string>('medium');
  const [stats, setStats] = useState<{ original: number; compressed: number; ratio: string } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (files: File[]) => {
    const f = files[0] ?? null;
    setFile(f);
    setError('');
    setStats(null);
    if (f) {
      const url = URL.createObjectURL(f);
      const img = new Image();
      img.onload = () => { imgRef.current = img; };
      img.src = url;
    }
  };

  const setPresetQ = (name: string) => {
    setPreset(name);
    setQuality(QUALITY_PRESETS[name as keyof typeof QUALITY_PRESETS] ?? 0.6);
  };

  const compress = async () => {
    setError('');
    setStats(null);
    if (!file) { setError('Choose an image first.'); return; }
    if (!imgRef.current) { setError('Image not loaded yet. Re-select the file.'); return; }
    setBusy(true);
    try {
      const img = imgRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const mime = file.type.includes('png') ? 'image/png' : 'image/jpeg';

      const blob = await new Promise<Blob>((res, rej) =>
        canvas.toBlob((b) => (b ? res(b) : rej(new Error('blob'))), mime, quality)
      );

      const ratio = ((1 - blob.size / file.size) * 100).toFixed(0);
      setStats({ original: file.size, compressed: blob.size, ratio });

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = file.name.replace(/\.[^.]+$/, '') + '-compressed.' + (mime.includes('png') ? 'png' : 'jpg');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch {
      setError('Could not compress this image. Use JPG or PNG.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={handleFile} label="image" selectedNames={file ? [file.name] : []} accept="image/jpeg,image/png" />

      <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>Quality Preset</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {(['low', 'medium', 'high'] as const).map((name) => (
          <Button key={name} variant={preset === name ? 'contained' : 'outlined'} size="small" onClick={() => setPresetQ(name)}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="caption" color="text.secondary">
          Quality: {Math.round(quality * 100)}%
        </Typography>
        <Slider
          value={quality}
          onChange={(_, v) => { setQuality(v as number); setPreset(''); }}
          min={0.05}
          max={1}
          step={0.05}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
        />
      </Box>

      {stats && (
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Chip label={`Original: ${formatSize(stats.original)}`} variant="outlined" />
          <Chip label={`Compressed: ${formatSize(stats.compressed)}`} color="success" variant="outlined" />
          <Chip label={`${stats.ratio}% smaller`} color={Number(stats.ratio) > 0 ? 'success' : 'warning'} />
        </Stack>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={compress} disabled={busy || !file}>
        {busy ? 'Compressing...' : 'Compress & Download'}
      </Button>
    </Box>
  );
};

const ImageCompressor = () => {
  const content = (
    <>
      <Typography variant="h2">How to Compress an Image Online</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a JPG or PNG image.</li>
          <li>Choose a quality preset (Low, Medium, High) or drag the slider to fine-tune.</li>
          <li>Click <strong>Compress &amp; Download</strong> — you'll see the before/after file sizes and the percentage saved.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4 MB camera photo set to Medium quality (60%) compresses to roughly 400 KB — a 90% reduction — while remaining visually crisp for web use.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reducing file sizes before uploading to websites or social media.</li>
          <li>Making email attachments smaller without noticeable quality loss.</li>
          <li>Optimizing product images for faster e-commerce page loading.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What quality level should I use?</strong> Medium (60%) is a good default — it saves ~80% of file size with minimal visible change. Use High (85%) for images where every detail matters, and Low (30%) when smallest size is the priority.</li>
          <li><strong>Does this support PNG?</strong> PNG uses lossless compression, so the quality slider has less effect. For PNGs, the tool still reduces the output size by re-encoding.</li>
          <li><strong>Is my image uploaded anywhere?</strong> No — compression happens entirely in your browser using the canvas API.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/image-compressor" content={content}>
      <ImageCompressorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ImageCompressor;
