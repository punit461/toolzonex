'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const ImageToBase64ConverterContent = () => {
  const [base64String, setBase64String] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setBase64String(result);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64String);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 2, 
            bgcolor: 'action.hover',
            borderStyle: 'dashed',
            borderWidth: 2
          }}
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            startIcon={<FileUploadIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Image
          </Button>
          <Typography variant="body2" color="text.secondary">
            PNG, JPEG, GIF, SVG, WebP
          </Typography>

          {imagePreview && (
            <Box 
              component="img" 
              src={imagePreview} 
              sx={{ mt: 2, maxWidth: '100%', maxHeight: 200, objectFit: 'contain', borderRadius: 1, boxShadow: 1 }} 
            />
          )}
        </Paper>

      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2" fontWeight="bold">Base64 Output</Typography>
          <Button 
            size="small" 
            startIcon={<ContentCopyIcon />} 
            onClick={handleCopy}
            disabled={!base64String}
            color={copied ? "success" : "primary"}
            variant="contained"
          >
            {copied ? 'Copied' : 'Copy Base64'}
          </Button>
        </Box>

        <TextField
          multiline
          rows={15}
          value={base64String}
          fullWidth
          placeholder="Base64 string will appear here..."
          InputProps={{ 
            readOnly: true,
            sx: { fontFamily: 'monospace', fontSize: '0.85rem' } 
          }}
        />

      </Box>

    </Box>
  );
};

const ImageToBase64Converter = () => {
  const content = (
    <>
      <Typography variant="h2">Image to Base64 Converter</Typography>
      <Typography variant="body1">
        Convert any image file (PNG, JPG, SVG, GIF) into a Base64 encoded string. Useful for embedding images directly into HTML, CSS, or JSON payloads.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Image to Base64 Converter - Encode Image Online"
      description="Encode image files to Base64 strings instantly. Fast, free online image to data URI converter."
      url="/tools/image-to-base64"
      content={content}
      category="Converters"
    >
      <ImageToBase64ConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ImageToBase64Converter;
