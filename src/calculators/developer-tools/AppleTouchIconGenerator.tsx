'use client';

import { useRef, useState } from 'react';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ICON_SIZE = 180;

const AppleTouchIconGeneratorContent = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [iconUrl, setIconUrl] = useState<string>('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setImageUrl(url);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = ICON_SIZE;
        canvas.height = ICON_SIZE;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Could not process this image.');
          return;
        }
        // Center-crop to a square, then draw scaled to ICON_SIZE x ICON_SIZE
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const sx = (img.naturalWidth - side) / 2;
        const sy = (img.naturalHeight - side) / 2;
        ctx.drawImage(img, sx, sy, side, side, 0, 0, ICON_SIZE, ICON_SIZE);
        setIconUrl(canvas.toDataURL('image/png'));
      };
      img.onerror = () => setError('Could not load this image.');
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const downloadIcon = () => {
    if (!iconUrl) return;
    const link = document.createElement('a');
    link.href = iconUrl;
    link.download = 'apple-touch-icon.png';
    link.click();
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => fileInputRef.current?.click()}
          fullWidth
          sx={{ mb: 2 }}
        >
          Upload Image
        </Button>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {imageUrl && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">Original</Typography>
            <Box component="img" ref={imgRef} src={imageUrl} alt="Original" sx={{ display: 'block', maxWidth: '100%', maxHeight: 240, mx: 'auto', objectFit: 'contain' }} />
          </Paper>
        )}
      </Box>

      <Box>
        {iconUrl ? (
          <>
            <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                180×180 Apple Touch Icon Preview
              </Typography>
              <Box
                component="img"
                src={iconUrl}
                alt="Apple touch icon preview"
                sx={{ width: 180, height: 180, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
              />
            </Paper>
            <Button
              variant="contained"
              color="success"
              startIcon={<DownloadIcon />}
              onClick={downloadIcon}
              fullWidth
            >
              Download PNG
            </Button>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Upload an image to generate a 180×180 apple-touch-icon.png preview.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const AppleTouchIconGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Apple Touch Icon Generator</Typography>
      <Typography variant="body1">
        Upload any image using the button above. The tool center-crops your image to a square (using the
        smaller of its width or height) and resizes it to exactly 180×180 pixels — the standard size Apple
        uses for the home-screen icon when someone adds your site to their iPhone or iPad. Everything happens
        locally in your browser using an HTML canvas; your image is never uploaded to a server. Once
        generated, download the result as a ready-to-use <code>apple-touch-icon.png</code> file.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Uploading a rectangular 1200×800 logo image gets center-cropped to an 800×800 square (trimming equal
        amounts off the left and right), then scaled down to a clean 180×180 PNG ready to drop into your
        site&apos;s root directory.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating the apple-touch-icon.png referenced in a site&apos;s favicon HTML tags.</li>
          <li>Turning an existing logo or square graphic into the exact size iOS expects.</li>
          <li>Quickly previewing how a logo will look as a rounded home-screen icon.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my image uploaded anywhere?</strong> No — the crop and resize happen entirely in your browser using a canvas element; the image file never leaves your device.</li>
          <li><strong>Why 180×180 specifically?</strong> Apple's Human Interface Guidelines specify 180×180 pixels as the ideal size for the apple-touch-icon used on modern iPhones and iPads with Retina displays, though iOS will scale a correctly-named icon of this size for older devices too.</li>
          <li><strong>What if my image isn&apos;t already square?</strong> The tool automatically center-crops non-square images to a square before resizing, so the most important part of your image should ideally be centered.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/apple-touch-icon-generator" content={content}>
      <AppleTouchIconGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AppleTouchIconGenerator;
