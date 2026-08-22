'use client';

import { useRef, useState } from 'react';
import { Box, Typography, Paper, Button, IconButton, Slider, LinearProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/Download';
import GifIcon from '@mui/icons-material/Gif';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Frame {
  id: string;
  url: string;
  img: HTMLImageElement;
}

const MAX_DIMENSION = 480;

const loadImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });

const GifMakerContent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [delay, setDelay] = useState(400);
  const [quality, setQuality] = useState(10);
  const [rendering, setRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addFiles = async (files: FileList | File[]) => {
    setError(null);
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    const loaded = await Promise.all(
      imageFiles.map(async (file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
        url: URL.createObjectURL(file),
        img: await loadImage(file),
      }))
    );
    setFrames((prev) => [...prev, ...loaded]);
    setResultUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeFrame = (id: string) => setFrames((prev) => prev.filter((f) => f.id !== id));

  const moveFrame = (index: number, direction: -1 | 1) => {
    setFrames((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleGenerate = async () => {
    if (frames.length < 2) {
      setError('Add at least 2 images to create an animation.');
      return;
    }
    setError(null);
    setRendering(true);
    setProgress(0);
    setResultUrl(null);

    const { default: GIF } = await import('gif.js');

    const first = frames[0].img;
    const scale = Math.min(1, MAX_DIMENSION / Math.max(first.naturalWidth, first.naturalHeight));
    const width = Math.round(first.naturalWidth * scale);
    const height = Math.round(first.naturalHeight * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setRendering(false);
      setError('Could not create a canvas to render frames.');
      return;
    }

    const gif = new GIF({
      workers: 2,
      quality,
      width,
      height,
      workerScript: '/gif.worker.js',
    });

    for (const frame of frames) {
      const imgRatio = frame.img.naturalWidth / frame.img.naturalHeight;
      const boxRatio = width / height;
      let drawW = width;
      let drawH = height;
      if (imgRatio > boxRatio) {
        drawH = width / imgRatio;
      } else {
        drawW = height * imgRatio;
      }
      const dx = (width - drawW) / 2;
      const dy = (height - drawH) / 2;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(frame.img, dx, dy, drawW, drawH);
      gif.addFrame(ctx, { copy: true, delay });
    }

    gif.on('progress', (p) => setProgress(Math.round(p * 100)));
    gif.on('finished', (blob) => {
      setResultUrl(URL.createObjectURL(blob));
      setRendering(false);
      setProgress(100);
    });

    gif.render();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <input ref={fileInputRef} type="file" accept="image/*" multiple hidden onChange={handleFileChange} />

      <Paper
        variant="outlined"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        sx={{ p: 5, textAlign: 'center', borderStyle: 'dashed', bgcolor: 'action.hover', cursor: 'pointer' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <UploadFileIcon fontSize="large" color="action" />
          <Typography variant="body1">Drop images here, or click to upload frames</Typography>
          <Typography variant="caption" color="text.secondary">Add 2 or more images — they&apos;ll play in the order shown below</Typography>
        </Box>
      </Paper>

      {frames.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {frames.map((frame, index) => (
            <Paper key={frame.id} variant="outlined" sx={{ width: 110, overflow: 'hidden' }}>
              <Box sx={{ position: 'relative' }}>
                <Box component="img" src={frame.url} alt={`Frame ${index + 1}`} sx={{ width: '100%', height: 80, objectFit: 'cover', display: 'block' }} />
                <Typography
                  variant="caption"
                  sx={{ position: 'absolute', top: 2, left: 4, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', px: 0.5, borderRadius: 0.5 }}
                >
                  {index + 1}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 0.5 }}>
                <IconButton size="small" disabled={index === 0} onClick={() => moveFrame(index, -1)}>
                  <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                </IconButton>
                <IconButton size="small" disabled={index === frames.length - 1} onClick={() => moveFrame(index, 1)}>
                  <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => removeFrame(frame.id)}>
                  <DeleteIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Frame Delay (ms): {delay}</Typography>
          <Slider value={delay} min={50} max={2000} step={50} onChange={(_, v) => setDelay(v as number)} />
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Quality (lower = better, slower): {quality}</Typography>
          <Slider value={quality} min={1} max={30} onChange={(_, v) => setQuality(v as number)} />
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<GifIcon />}
        onClick={handleGenerate}
        disabled={rendering || frames.length < 2}
      >
        {rendering ? 'Generating…' : 'Generate GIF'}
      </Button>

      {error && <Typography color="error" variant="body2">{error}</Typography>}

      {rendering && (
        <Box>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" color="text.secondary">{progress}%</Typography>
        </Box>
      )}

      {resultUrl && (
        <Paper variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box component="img" src={resultUrl} alt="Generated GIF" sx={{ maxWidth: '100%', borderRadius: 1, boxShadow: 2 }} />
          <Button variant="outlined" startIcon={<DownloadIcon />} component="a" href={resultUrl} download="animation.gif">
            Download GIF
          </Button>
        </Paper>
      )}
    </Box>
  );
};

const GifMaker = () => {
  const content = (
    <>
      <Typography variant="h2">GIF Maker</Typography>
      <Typography variant="body1">
        Turn a sequence of images into a smooth, shareable animated GIF — right in your browser. Upload
        your frames, set the order and timing, and download the finished animation.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Drop 2 or more images onto the upload area (or click to browse). Reorder frames with the
        up/down arrows, adjust the frame delay and quality, then click Generate GIF. When it&apos;s
        done, preview it and click Download.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Upload 5 photos from a burst shot, set the delay to 300ms, and generate a quick looping GIF
        that cycles through all 5 frames — perfect for sharing a mini animation on social media or chat.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a burst-mode photo sequence into a shareable animation.</li>
          <li>Creating a simple animated logo or product showcase from static frames.</li>
          <li>Making reaction GIFs from a handful of images.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are my images uploaded to a server?</Typography>
      <Typography variant="body1">
        No — every frame is loaded and encoded entirely in your browser. Nothing is uploaded anywhere.
      </Typography>
      <Typography variant="h3">Why does a lower quality number look better?</Typography>
      <Typography variant="body1">
        The quality setting controls the GIF encoder&apos;s color sampling interval — a lower number
        samples more colors (better image quality, larger file, slower to generate).
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="GIF Maker"
      description="Turn images and frames into smooth, shareable GIFs — entirely in your browser."
      url="/generators/gif-maker"
      content={content}
      category="Generators"
    >
      <GifMakerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GifMaker;
