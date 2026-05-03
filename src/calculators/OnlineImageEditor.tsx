'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Paper, Alert, Slider, Grid, IconButton, Divider } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const OnlineImageEditorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [editedUrl, setEditedUrl] = useState<string>('');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageUrl && imgRef.current) {
      applyFilters();
    }
  }, [brightness, contrast, saturation, rotation, flipped, imageUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipped(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImageUrl(url);
      setEditedUrl(url);
    };
    reader.readAsDataURL(selectedFile);
  };

  const applyFilters = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    if (flipped) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.restore();

    setEditedUrl(canvas.toDataURL('image/png'));
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = editedUrl;
    link.download = file?.name ? `edited_${file.name}` : 'edited_image.png';
    link.click();
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipped(false);
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
          Select Image
        </Button>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {imageUrl && (
          <>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Box component="img" src={editedUrl} alt="Edited" sx={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain', display: 'block', mx: 'auto' }} />
            </Paper>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <img ref={imgRef} src={imageUrl} style={{ display: 'none' }} />
          </>
        )}
      </Box>

      {imageUrl && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Brightness: {brightness}%
              </Typography>
              <Slider
                value={brightness}
                onChange={(_, v) => setBrightness(v as number)}
                min={0}
                max={200}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Contrast: {contrast}%
              </Typography>
              <Slider
                value={contrast}
                onChange={(_, v) => setContrast(v as number)}
                min={0}
                max={200}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Saturation: {saturation}%
              </Typography>
              <Slider
                value={saturation}
                onChange={(_, v) => setSaturation(v as number)}
                min={0}
                max={200}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Rotation: {rotation}°
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <IconButton onClick={() => setRotation(r => r - 90)}>
                  <RotateLeftIcon />
                </IconButton>
                <IconButton onClick={() => setRotation(r => r + 90)}>
                  <RotateRightIcon />
                </IconButton>
                <IconButton onClick={() => setFlipped(f => !f)} color={flipped ? 'primary' : 'default'}>
                  <FlipIcon />
                </IconButton>
                <IconButton onClick={resetFilters}>
                  <RefreshIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Button 
            variant="contained" 
            color="success" 
            startIcon={<DownloadIcon />}
            onClick={downloadImage}
            fullWidth
          >
            Download Edited Image
          </Button>
        </Box>
      )}
    </Box>
  );
};

const OnlineImageEditor = () => {
  const content = (
    <>
      <Typography variant="h2">How to edit images online?</Typography>
      <Typography variant="body1">
        Select an image from your device using the "Select Image" button. Adjust brightness, contrast, 
        and saturation using the sliders. You can also rotate the image and flip it horizontally. 
        Click "Download Edited Image" to save your changes.
      </Typography>

      <Typography variant="h2">Available editing tools</Typography>
      <Typography variant="body1">
        • Brightness - Lighten or darken your image (0-200%)
        • Contrast - Adjust image contrast for more vivid colors (0-200%)
        • Saturation - Control color intensity from grayscale to oversaturated (0-200%)
        • Rotate - Turn image left or right in 90-degree increments
        • Flip - Mirror the image horizontally
        • Reset - Return all settings to original values
      </Typography>

      <Typography variant="h2">Why use online image editor?</Typography>
      <Typography variant="body1">
        Quick image editing without expensive software. All processing happens in your browser - 
        no uploads, no accounts, completely private. Perfect for quick adjustments to photos before sharing.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Online Image Editor"
      description="Free online image editor. Adjust brightness, contrast, saturation, rotate and flip images instantly."
      url="/tools/online-image-editor"
      content={content}
      category="Tools"
    >
      <OnlineImageEditorContent />

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OnlineImageEditor;