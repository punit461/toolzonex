'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const Base64ToImageConverterContent = () => {
  const [base64String, setBase64String] = useState('');
  const [error, setError] = useState('');

  const handleClear = () => {
    setBase64String('');
    setError('');
  };

  const getValidSrc = () => {
    if (!base64String.trim()) return '';
    if (base64String.startsWith('data:image/')) return base64String;
    return `data:image/png;base64,${base64String}`;
  };

  const handleDownload = () => {
    const src = getValidSrc();
    if (!src) return;
    
    try {
      const a = document.createElement('a');
      a.href = src;
      a.download = `image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      setError('Invalid Base64 string. Cannot download image.');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          multiline
          rows={15}
          value={base64String}
          onChange={(e) => { setBase64String(e.target.value); setError(''); }}
          fullWidth
          placeholder="Paste Base64 string here... (e.g. data:image/png;base64,iVBORw0KGgo...)"
          InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<DeleteOutlineIcon />} 
            onClick={handleClear}
            disabled={!base64String}
          >
            Clear
          </Button>
        </Box>
      </Box>

      {/* Output Panel */}
      <Box>
        <Paper variant="outlined" sx={{ p: 4, height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, bgcolor: 'action.hover' }}>
          
          {!base64String && !error && (
            <Typography color="text.secondary" textAlign="center">
              Image preview will appear here
            </Typography>
          )}

          {error && (
            <Typography color="error.main" textAlign="center">
              {error}
            </Typography>
          )}

          {base64String && !error && (
            <>
              <Box 
                component="img" 
                src={getValidSrc()} 
                onError={() => setError('Invalid image data. Please check your Base64 string.')}
                sx={{ 
                  maxWidth: '100%', 
                  maxHeight: 300, 
                  objectFit: 'contain',
                  borderRadius: 1,
                  boxShadow: 2,
                  bgcolor: 'white'
                }} 
              />
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<FileDownloadIcon />} 
                onClick={handleDownload}
              >
                Download Image
              </Button>
            </>
          )}

        </Paper>
      </Box>

    </Box>
  );
};

const Base64ToImageConverter = () => {
  const content = (
    <>
      <Typography variant="h2">Base64 to Image Converter</Typography>
      <Typography variant="body1">
        Decode a Base64 string back into a viewable and downloadable image file. Works with PNG, JPEG, GIF, WebP, and SVG encoded strings.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Base64 to Image Converter - Decode Image Online"
      description="Decode Base64 strings to image files instantly online. Preview and download PNG/JPEG from Base64 data."
      url="/tools/base64-to-image"
      content={content}
      category="Converters"
    >
      <Base64ToImageConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Base64ToImageConverter;
