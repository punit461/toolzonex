'use client';
import { useState, useRef, useEffect } from 'react';
import { Box, Button, Typography, Paper, Alert, TextField, Switch, FormControlLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const ImageResizerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [resizedUrl, setResizedUrl] = useState<string>('');
  const [width, setWidth] = useState<number | string>('');
  const [height, setHeight] = useState<number | string>('');
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [error, setError] = useState('');
  
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImageUrl(url);
      
      const img = new Image();
      img.onload = () => {
        setWidth(img.naturalWidth);
        setHeight(img.naturalHeight);
        setResizedUrl(url);
      };
      img.src = url;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleWidthChange = (val: string) => {
    const w = parseInt(val);
    setWidth(isNaN(w) ? '' : w);
    
    if (maintainAspect && !isNaN(w) && imgRef.current) {
      const aspect = imgRef.current.naturalHeight / imgRef.current.naturalWidth;
      setHeight(Math.round(w * aspect));
    }
  };

  const handleHeightChange = (val: string) => {
    const h = parseInt(val);
    setHeight(isNaN(h) ? '' : h);
    
    if (maintainAspect && !isNaN(h) && imgRef.current) {
      const aspect = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
      setWidth(Math.round(h * aspect));
    }
  };

  const resizeImage = () => {
    if (!imgRef.current) return;
    const w = Number(width);
    const h = Number(height);
    
    if (!w || !h || w <= 0 || h <= 0) {
      setError('Please enter valid width and height.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(imgRef.current, 0, 0, w, h);
      setResizedUrl(canvas.toDataURL(file?.type || 'image/png'));
      setError('');
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = resizedUrl;
    link.download = file?.name ? `resized_${file.name}` : 'resized_image.png';
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
          Select Image
        </Button>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {imageUrl && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Box component="img" ref={imgRef} src={imageUrl} alt="Original" sx={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain', display: 'block', mx: 'auto' }} />
          </Paper>
        )}
      </Box>

      {imageUrl && (
        <Box>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Width (px)"
              type="number"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
              fullWidth
            />
            <TextField
              label="Height (px)"
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              fullWidth
            />
          </Box>
          
          <FormControlLabel
            control={<Switch checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} />}
            label="Maintain Aspect Ratio"
            sx={{ mb: 3 }}
          />

          <Button 
            variant="contained" 
            onClick={resizeImage}
            fullWidth
            sx={{ mb: 2 }}
          >
            Apply Resize
          </Button>

          <Button 
            variant="contained" 
            color="success" 
            startIcon={<DownloadIcon />}
            onClick={downloadImage}
            fullWidth
          >
            Download Resized Image
          </Button>
        </Box>
      )}
    </Box>
  );
};

const ImageResizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to resize images online?</Typography>
      <Typography variant="body1">
        Select an image from your device. Enter your desired width or height. By default, the aspect ratio is maintained to prevent stretching. Click "Apply Resize" to process the image, and then "Download" to save it.
      </Typography>

      <Typography variant="h2">Why use our image resizer?</Typography>
      <Typography variant="body1">
        • Fast, browser-based resizing (no server uploads)
        • Maintain perfect aspect ratios
        • Completely private and secure
        • Free without any watermarks
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Image Resizer Tool"
      description="Resize images online for free. Change dimensions of any image while maintaining aspect ratio."
      url="/tools/image-resizer"
      content={content}
      category="Tools"
    >
      <ImageResizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ImageResizer;
