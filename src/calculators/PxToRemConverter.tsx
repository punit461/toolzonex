'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Slider } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PxToRemContent = () => {
  const [baseSize, setBaseSize] = useState<number>(16);
  const [pixels, setPixels] = useState<number | string>(16);
  const [rems, setRems] = useState<number | string>(1);

  const handleBaseChange = (e: any) => {
    const newBase = Number(e.target.value);
    setBaseSize(newBase);
    if (pixels) {
      setRems(Number(pixels) / newBase);
    }
  };

  const handlePxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPixels(val);
    if (val === '') {
      setRems('');
    } else {
      setRems(Number(val) / baseSize);
    }
  };

  const handleRemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRems(val);
    if (val === '') {
      setPixels('');
    } else {
      setPixels(Number(val) * baseSize);
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Base Font Size (px)</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Slider
              value={baseSize}
              min={8}
              max={32}
              step={1}
              marks
              onChange={handleBaseChange}
              sx={{ flex: 1 }}
            />
            <TextField
              type="number"
              size="small"
              value={baseSize}
              onChange={handleBaseChange}
              sx={{ width: 80 }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Pixels (px)"
            type="number"
            value={pixels}
            onChange={handlePxChange}
            fullWidth
            sx={{ flex: 1 }}
          />
          <Typography variant="h5" color="text.secondary">↔</Typography>
          <TextField
            label="REM"
            type="number"
            value={rems}
            onChange={handleRemChange}
            fullWidth
            sx={{ flex: 1 }}
          />
        </Box>

      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={1}>Quick Reference Table (Base: {baseSize}px)</Typography>
        <Paper sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
          <Box sx={{ display: 'flex', bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
            <Box sx={{ flex: 1, p: 1.5, borderRight: '1px solid rgba(255,255,255,0.2)' }}>PX</Box>
            <Box sx={{ flex: 1, p: 1.5 }}>REM</Box>
          </Box>
          {[8, 12, 14, 16, 18, 20, 24, 32, 48, 64].map((px) => (
            <Box key={px} sx={{ display: 'flex', borderBottom: '1px solid #eee', '&:last-child': { border: 0 } }}>
              <Box sx={{ flex: 1, p: 1.5, borderRight: '1px solid #eee' }}>{px}px</Box>
              <Box sx={{ flex: 1, p: 1.5 }}>{px / baseSize}rem</Box>
            </Box>
          ))}
        </Paper>
      </Box>

    </Box>
  );
};

const PxToRemConverter = () => {
  const content = (
    <>
      <Typography variant="h2">Why use REM instead of PX?</Typography>
      <Typography variant="body1">
        REM (Root EM) is a scalable unit in CSS. Unlike pixels, which are absolute, REM units are relative to the root font size of the HTML document (default is 16px). Using REM units makes your websites more accessible, as they scale naturally when a user changes their browser's default font size.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="PX to REM Converter"
      description="Convert Pixels (px) to REM units instantly for responsive CSS web design. Free online calculator."
      url="/tools/px-to-rem-converter"
      content={content}
      category="Tools"
    >
      <PxToRemContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PxToRemConverter;
