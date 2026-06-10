'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, Slider, Switch, FormControlLabel } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import JsBarcode from 'jsbarcode';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const BarcodeGeneratorContent = () => {
  const [text, setText] = useState<string>('123456789012');
  const [format, setFormat] = useState<string>('CODE128');
  const [width, setWidth] = useState<number>(2);
  const [height, setHeight] = useState<number>(100);
  const [displayValue, setDisplayValue] = useState<boolean>(true);
  
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      try {
        if (!text) {
          // Clear canvas if empty
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          setError(null);
          return;
        }

        JsBarcode(canvasRef.current, text, {
          format: format,
          width: width,
          height: height,
          displayValue: displayValue,
          margin: 10,
          background: '#ffffff',
          lineColor: '#000000',
        });
        setError(null);
      } catch (e: any) {
        setError(e.message || "Invalid data for this barcode format.");
        // Clear canvas on error
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          canvasRef.current.width = canvasRef.current.width; // force reset
        }
      }
    }
  }, [text, format, width, height, displayValue]);

  const downloadBarcode = () => {
    if (!canvasRef.current || error || !text) return;
    
    const pngUrl = canvasRef.current.toDataURL("image/png");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `barcode-${format}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Control Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <TextField
          label="Barcode Data"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          placeholder="Enter numeric or alphanumeric data"
          error={!!error}
          helperText={error}
        />

        <FormControl fullWidth size="small">
          <InputLabel>Barcode Format</InputLabel>
          <Select value={format} label="Barcode Format" onChange={(e) => setFormat(e.target.value as string)}>
            <MenuItem value="CODE128">CODE128 (Standard alphanumeric)</MenuItem>
            <MenuItem value="CODE39">CODE39 (Uppercase alphanumeric)</MenuItem>
            <MenuItem value="UPC">UPC (12-digit numeric)</MenuItem>
            <MenuItem value="EAN13">EAN13 (13-digit numeric)</MenuItem>
            <MenuItem value="EAN8">EAN8 (8-digit numeric)</MenuItem>
            <MenuItem value="ITF14">ITF14 (14-digit numeric)</MenuItem>
            <MenuItem value="MSI">MSI (Numeric)</MenuItem>
          </Select>
        </FormControl>
        
        <Box>
          <Typography variant="subtitle2" mb={1}>Bar Width: {width}px</Typography>
          <Slider 
            value={width} 
            min={1} 
            max={5} 
            step={1} 
            onChange={(e, val) => setWidth(val as number)} 
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" mb={1}>Height: {height}px</Typography>
          <Slider 
            value={height} 
            min={50} 
            max={200} 
            step={10} 
            onChange={(e, val) => setHeight(val as number)} 
          />
        </Box>

        <FormControlLabel 
          control={<Switch checked={displayValue} onChange={(e) => setDisplayValue(e.target.checked)} />} 
          label="Display text below barcode" 
        />

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
            minHeight: 300,
            overflow: 'auto'
          }}
        >
          <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, boxShadow: 1, display: 'flex', justifyContent: 'center' }}>
            <canvas ref={canvasRef} />
          </Box>
        </Paper>

        <Button 
          variant="contained" 
          size="large" 
          startIcon={<DownloadIcon />} 
          onClick={downloadBarcode}
          disabled={!text || !!error}
          fullWidth
        >
          Download PNG
        </Button>
        
      </Box>

    </Box>
  );
};

const BarcodeGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Barcode Generator</Typography>
      <Typography variant="body1">
        Instantly generate standard 1D barcodes for your products, inventory, or personal use. Supports CODE128, CODE39, UPC, EAN, and more. Customize the size and instantly download a high-quality PNG image for free. No signup required.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Barcode Generator"
      description="Create custom 1D barcodes online instantly. Supports CODE128, UPC, EAN and more. Download high-quality PNGs for free."
      url="/utilities/barcode-generator"
      content={content}
      category="Utilities"
    >
      <BarcodeGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BarcodeGenerator;
