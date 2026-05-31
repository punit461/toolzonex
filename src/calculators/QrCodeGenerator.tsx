'use client';

import { useState, useRef } from 'react';
import { Box, TextField, Typography, Button, Paper, Slider } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { QRCodeCanvas } from 'qrcode.react';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const QrCodeGeneratorContent = () => {
  const [text, setText] = useState<string>('https://example.com');
  const [size, setSize] = useState<number>(200);
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Control Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <TextField
          label="URL or Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          placeholder="Enter website URL or text..."
        />
        
        <Box>
          <Typography variant="subtitle2" mb={1}>Size: {size}px</Typography>
          <Slider 
            value={size} 
            min={100} 
            max={400} 
            step={10} 
            onChange={(e, val) => setSize(val as number)} 
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Foreground Color"
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            fullWidth
            sx={{ '& input': { height: 50, cursor: 'pointer' } }}
          />
          <TextField
            label="Background Color"
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            fullWidth
            sx={{ '& input': { height: 50, cursor: 'pointer' } }}
          />
        </Box>

      </Box>

      {/* Preview Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
        
        <Paper 
          sx={{ 
            p: 4, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'action.hover',
            border: '1px solid',
            width: '100%',
            minHeight: 300
          }}
        >
          <Box ref={qrRef} sx={{ p: 2, bgcolor: bgColor, borderRadius: 1, boxShadow: 1 }}>
            <QRCodeCanvas 
              value={text || ' '} 
              size={size} 
              bgColor={bgColor} 
              fgColor={fgColor} 
              level="H"
              includeMargin={false}
            />
          </Box>
        </Paper>

        <Button 
          variant="contained" 
          size="large" 
          startIcon={<DownloadIcon />} 
          onClick={downloadQR}
          disabled={!text}
          fullWidth
        >
          Download PNG
        </Button>
        
      </Box>

    </Box>
  );
};

const QrCodeGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free QR Code Generator</Typography>
      <Typography variant="body1">
        Instantly generate custom QR codes for your URLs, text, Wi-Fi networks, and more. Customize the colors and size to match your brand, and download the high-quality PNG image for free. No signup required.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="QR Code Generator"
      description="Create custom QR codes online instantly. Customize colors and size, and download high-quality PNGs for free."
      url="/tools/qr-code-generator"
      content={content}
      category="Tools"
    >
      <QrCodeGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default QrCodeGenerator;
