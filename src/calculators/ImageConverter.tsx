'use client';

import { useState, useRef } from 'react';
import { Box, Button, Typography, Paper, Alert, Grid, Select, MenuItem, FormControl, InputLabel, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const ImageConverterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [outputFormat, setOutputFormat] = useState('png');
  const [outputUrl, setOutputUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setError('');
    setFile(selectedFile);
    setOutputUrl('');

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const convertImage = async () => {
    if (!file || !preview) return;

    setLoading(true);
    setError('');

    try {
      const img = new Image();
      img.src = preview;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      
      ctx.drawImage(img, 0, 0);
      
      const mimeType = outputFormat === 'jpg' ? 'image/jpeg' : `image/${outputFormat}`;
      const quality = outputFormat === 'jpg' ? 0.92 : undefined;
      
      const dataUrl = canvas.toDataURL(mimeType, quality);
      setOutputUrl(dataUrl);
    } catch (err) {
      setError('Failed to convert image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!outputUrl) return;
    
    const link = document.createElement('a');
    link.href = outputUrl;
    link.download = `converted.${outputFormat === 'jpg' ? 'jpg' : outputFormat}`;
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

        {file && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </Typography>
        )}

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        {preview && (
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>Original Image</Typography>
            <Box component="img" src={preview} alt="Preview" sx={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain' }} />
          </Paper>
        )}
      </Box>

      <Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Output Format</InputLabel>
          <Select
            value={outputFormat}
            label="Output Format"
            onChange={(e) => setOutputFormat(e.target.value)}
          >
            <MenuItem value="png">PNG</MenuItem>
            <MenuItem value="jpg">JPEG</MenuItem>
            <MenuItem value="webp">WebP</MenuItem>
          </Select>
        </FormControl>

        <Button 
          variant="contained" 
          onClick={convertImage} 
          disabled={!file || loading}
          fullWidth
          sx={{ mb: 2 }}
        >
          Convert Image
        </Button>

        {outputUrl && (
          <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.dark' }}>
            <Typography variant="subtitle2" gutterBottom>Converted Image</Typography>
            <Box component="img" src={outputUrl} alt="Converted" sx={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain', mb: 2 }} />
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<DownloadIcon />}
              onClick={downloadImage}
              fullWidth
            >
              Download {outputFormat.toUpperCase()}
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const ImageConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to convert image formats?</Typography>
      <Typography variant="body1">
        Select an image from your device, choose your desired output format (PNG, JPEG, or WebP), 
        and click "Convert Image". The tool will instantly convert your image and provide a download button.
      </Typography>

      <Typography variant="h2">Supported formats</Typography>
      <Typography variant="body1">
        • PNG (Portable Network Graphics) - Best for graphics with transparency
        • JPEG (Joint Photographic Experts Group) - Best for photographs, smaller file sizes
        • WebP - Modern format with excellent compression and quality
      </Typography>

      <Typography variant="h2">Why convert images?</Typography>
      <Typography variant="body1">
        Converting images between formats helps reduce file size, improve web performance, 
        ensure compatibility with specific applications, and optimize images for different platforms. 
        This free tool converts images instantly in your browser without uploading to servers.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Image Converter"
      description="Convert images between PNG, JPEG, and WebP formats. Free online image converter tool."
      url="/tools/image-converter"
      content={content}
      category="Tools"
    >
      <ImageConverterContent />

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ImageConverter;