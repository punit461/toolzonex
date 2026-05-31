'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const AspectRatioCalculatorContent = () => {
  const [w1, setW1] = useState<string>('1920');
  const [h1, setH1] = useState<string>('1080');
  const [w2, setW2] = useState<string>('1280');
  const [h2, setH2] = useState<string>('720');

  // Calculates GCD to display ratio e.g., 16:9
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const getRatioString = (w: string, h: string) => {
    const width = parseInt(w);
    const height = parseInt(h);
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
      const divisor = gcd(width, height);
      return `${width / divisor}:${height / divisor}`;
    }
    return '';
  };

  const handleW1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setW1(val);
    const width = parseFloat(val);
    const h = parseFloat(h1);
    if (!isNaN(width) && !isNaN(h) && width > 0 && h > 0) {
      const ratio = width / h;
      const width2 = parseFloat(w2);
      if (!isNaN(width2)) {
        setH2((width2 / ratio).toFixed(2).replace(/\.00$/, ''));
      }
    }
  };

  const handleH1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setH1(val);
    const w = parseFloat(w1);
    const height = parseFloat(val);
    if (!isNaN(w) && !isNaN(height) && w > 0 && height > 0) {
      const ratio = w / height;
      const width2 = parseFloat(w2);
      if (!isNaN(width2)) {
        setH2((width2 / ratio).toFixed(2).replace(/\.00$/, ''));
      }
    }
  };

  const handleW2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setW2(val);
    const width2 = parseFloat(val);
    const w = parseFloat(w1);
    const h = parseFloat(h1);
    if (!isNaN(w) && !isNaN(h) && !isNaN(width2) && w > 0 && h > 0) {
      const ratio = w / h;
      setH2((width2 / ratio).toFixed(2).replace(/\.00$/, ''));
    }
  };

  const handleH2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setH2(val);
    const height2 = parseFloat(val);
    const w = parseFloat(w1);
    const h = parseFloat(h1);
    if (!isNaN(w) && !isNaN(h) && !isNaN(height2) && w > 0 && h > 0) {
      const ratio = w / h;
      setW2((height2 * ratio).toFixed(2).replace(/\.00$/, ''));
    }
  };

  const ratio1 = getRatioString(w1, h1);
  const ratio2 = getRatioString(w2, h2);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Original Image / Video Size</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField label="Width (W1)" type="number" value={w1} onChange={handleW1Change} fullWidth />
            <Typography variant="h6">:</Typography>
            <TextField label="Height (H1)" type="number" value={h1} onChange={handleH1Change} fullWidth />
          </Box>
        </Box>
        
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>New Target Size (Keeps Aspect Ratio)</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField label="Width (W2)" type="number" value={w2} onChange={handleW2Change} fullWidth />
            <Typography variant="h6">:</Typography>
            <TextField label="Height (H2)" type="number" value={h2} onChange={handleH2Change} fullWidth />
          </Box>
        </Box>

      </Box>

      {/* Output Panel */}
      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Aspect Ratios</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">Original Aspect Ratio</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{ratio1 || 'N/A'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">New Aspect Ratio</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{ratio2 || 'N/A'}</Typography>
          </Paper>
          
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              If the values match, your image will scale perfectly without stretching or cropping!
            </Typography>
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

const AspectRatioCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">What is an Aspect Ratio?</Typography>
      <Typography variant="body1">
        An aspect ratio describes the proportional relationship between the width and height of an image or video screen. For example, modern TVs typically use a `16:9` aspect ratio, meaning for every 16 units of width, there are 9 units of height. This calculator helps you resize images while maintaining perfect proportions to prevent distortion.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Aspect Ratio Calculator"
      description="Calculate proportional dimensions and aspect ratios for images and videos instantly. Free online aspect ratio tool."
      url="/utilities/aspect-ratio-calculator"
      content={content}
      category="Utilities"
    >
      <AspectRatioCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AspectRatioCalculator;
