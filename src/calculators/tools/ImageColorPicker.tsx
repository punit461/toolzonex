'use client';

import { useRef, useState, useCallback } from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`.toUpperCase();

const QUANT_STEP = 24;
const EXTRACTED_COLOR_COUNT = 8;

// Buckets pixels into a coarse RGB grid and returns the most common bucket
// averages as HEX — a lightweight dominant-color extraction that needs no
// external library and stays fast even on large photos via sampling.
const extractDominantColors = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  count: number
): string[] => {
  const { data } = ctx.getImageData(0, 0, width, height);
  const totalPixels = width * height;
  const targetSamples = 20000;
  const stride = Math.max(1, Math.floor(totalPixels / targetSamples));

  const buckets = new Map<number, { r: number; g: number; b: number; n: number }>();

  for (let i = 0; i < totalPixels; i += stride) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];
    if (a < 200) continue;
    const key =
      (Math.round(r / QUANT_STEP) << 16) |
      (Math.round(g / QUANT_STEP) << 8) |
      Math.round(b / QUANT_STEP);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      bucket.n += 1;
    } else {
      buckets.set(key, { r, g, b, n: 1 });
    }
  }

  return Array.from(buckets.values())
    .sort((a, b) => b.n - a.n)
    .slice(0, count)
    .map((b) => rgbToHex(Math.round(b.r / b.n), Math.round(b.g / b.n), Math.round(b.b / b.n)));
};

const ImageColorPickerContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [extracted, setExtracted] = useState<string[]>([]);
  const [picked, setPicked] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const loadImage = useCallback((file: File) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const maxWidth = 640;
      const scale = Math.min(1, maxWidth / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setExtracted(extractDominantColors(ctx, canvas.width, canvas.height, EXTRACTED_COLOR_COUNT));
      setPicked([]);
      setImageLoaded(true);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) loadImage(file);
  };

  const getColorAt = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return null;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    const data = ctx.getImageData(x, y, 1, 1).data;
    return rgbToHex(data[0], data[1], data[2]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hex = getColorAt(e);
    if (hex) setHoverColor(hex);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hex = getColorAt(e);
    if (hex) setPicked((prev) => (prev.includes(hex) ? prev : [hex, ...prev].slice(0, 24)));
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />

      <Paper
        variant="outlined"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        sx={{
          p: imageLoaded ? 1 : 6,
          textAlign: 'center',
          borderStyle: 'dashed',
          bgcolor: 'action.hover',
          cursor: imageLoaded ? 'default' : 'pointer',
        }}
        onClick={() => !imageLoaded && fileInputRef.current?.click()}
      >
        {!imageLoaded && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <UploadFileIcon fontSize="large" color="action" />
            <Typography variant="body1">Drop an image here, or click to upload</Typography>
            <Typography variant="caption" color="text.secondary">Colors are extracted automatically — hover to preview any pixel, click to add it too</Typography>
          </Box>
        )}
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          style={{ display: imageLoaded ? 'block' : 'none', maxWidth: '100%', margin: '0 auto', cursor: 'crosshair', borderRadius: 8 }}
        />
      </Paper>

      {imageLoaded && (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="small" onClick={() => fileInputRef.current?.click()}>Upload a different image</Button>
          {hoverColor && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 24, height: 24, borderRadius: 1, bgcolor: hoverColor, border: '1px solid #ddd' }} />
              <Typography variant="body2" fontFamily="monospace">{hoverColor}</Typography>
            </Box>
          )}
        </Box>
      )}

      {extracted.length > 0 && (
        <Box>
          <Typography variant="h6" mb={1.5}>Colors in This Image</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 1.5 }}>
            {extracted.map((hex) => (
              <Paper key={hex} variant="outlined" sx={{ overflow: 'hidden' }}>
                <Box sx={{ height: 56, bgcolor: hex }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, py: 0.5 }}>
                  <Typography variant="caption" fontFamily="monospace">{copied === hex ? 'Copied!' : hex}</Typography>
                  <IconButton size="small" onClick={() => handleCopy(hex)}>
                    <ContentCopyIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      {picked.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="h6">Colors You Picked</Typography>
            <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => setPicked([])}>Clear</Button>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 1.5 }}>
            {picked.map((hex) => (
              <Paper key={hex} variant="outlined" sx={{ overflow: 'hidden' }}>
                <Box sx={{ height: 56, bgcolor: hex }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1, py: 0.5 }}>
                  <Typography variant="caption" fontFamily="monospace">{copied === hex ? 'Copied!' : hex}</Typography>
                  <IconButton size="small" onClick={() => handleCopy(hex)}>
                    <ContentCopyIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const ImageColorPicker = () => {
  const content = (
    <>
      <Typography variant="h2">Image Color Picker</Typography>
      <Typography variant="body1">
        Upload any image and its dominant colors are extracted automatically. Hover to preview the
        exact HEX value under your cursor, click to add specific pixels of your own, then copy any
        swatch for use in your design tools.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Drag and drop an image onto the box (or click to browse) — a palette of the image&apos;s most
        common colors appears right away under &quot;Colors in This Image&quot;. Move your mouse over
        the image to preview any pixel&apos;s color live, and click to add that exact color to a
        second &quot;Colors You Picked&quot; palette. Click the copy icon on any swatch to grab its
        HEX code.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Upload a product photo and an 8-color palette of its dominant tones appears instantly. Want a
        specific detail — the packaging text, a highlight, a logo color — that didn&apos;t make the
        automatic palette? Just click on that exact pixel to add it too.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Extracting brand colors from a logo or photo.</li>
          <li>Matching a website&apos;s color scheme to a reference image.</li>
          <li>Building a mood board palette from inspiration photos.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is my image uploaded to a server?</Typography>
      <Typography variant="body1">
        No. The image is decoded and read entirely in your browser using the Canvas API — it never
        leaves your device.
      </Typography>
      <Typography variant="h3">Why is the color slightly different from what I expected?</Typography>
      <Typography variant="body1">
        Compressed image formats (like JPEG) can shift pixel colors slightly due to compression
        artifacts. For exact color matching, use a PNG source image where possible.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/image-color-picker"
      content={content}
    >
      <ImageColorPickerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ImageColorPicker;
