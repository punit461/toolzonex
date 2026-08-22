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
        REM (Root EM) is a scalable unit in CSS. Unlike pixels, which are absolute, REM units are relative to
        the root font size of the HTML document (default is 16px). This px to rem converter uses the formula{' '}
        <strong>rem = px ÷ root font size</strong> — the same calculation the tool above performs live as you
        type. Using REM units makes your websites more accessible, as they scale naturally when a user changes
        their browser&apos;s default font size.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Enter a pixel value (and optionally a custom root font size) and the equivalent rem value is calculated
        instantly — or work backwards by entering a rem value to see the equivalent pixels.
      </Typography>

      <Typography variant="h2">Example: Common px to rem Conversions</Typography>
      <Typography variant="body1">
        Assuming the standard 16px root font size, here are worked examples for frequently searched pixel
        values:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        12px ÷ 16 = 0.75rem<br />
        14px ÷ 16 = 0.875rem<br />
        16px ÷ 16 = 1rem<br />
        18px ÷ 16 = 1.125rem<br />
        20px ÷ 16 = 1.25rem<br />
        24px ÷ 16 = 1.5rem<br />
        32px ÷ 16 = 2rem<br />
        38px ÷ 16 = 2.375rem<br />
        120px ÷ 16 = 7.5rem
      </Box>
      <Typography variant="body1">
        In other words: 16px in rem is 1rem, 18px to rem is 1.125rem, 20px in rem is 1.25rem, 24px to rem is
        1.5rem, 38px to rem is 2.375rem, and 120 px to rem is 7.5rem — all at the default 16px root font size.
        If your project sets a different base font size, use the slider above to recalculate every value
        instantly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting fixed-pixel Figma or design specs into responsive CSS rem values.</li>
          <li>Auditing a stylesheet for accessibility by replacing px with rem.</li>
          <li>Looking up a specific conversion like 16px in rem or 120 px to rem without doing the division yourself.</li>
          <li>Converting a whole design system's spacing or type scale from px to rem in one pass.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is 16px in rem?</Typography>
      <Typography variant="body1">
        16px equals 1rem, assuming the default 16px root font size — since rem = px ÷ root font size, and 16 ÷
        16 = 1.
      </Typography>
      <Typography variant="h3">How do I convert px to rem?</Typography>
      <Typography variant="body1">
        Divide the pixel value by the root font size (16px by default, unless your project sets a different
        base). The formula is: rem = px ÷ root font size. For example, 24px ÷ 16px = 1.5rem.
      </Typography>
      <Typography variant="h3">What is 120px in rem?</Typography>
      <Typography variant="body1">
        120px equals 7.5rem at the standard 16px root font size (120 ÷ 16 = 7.5).
      </Typography>
      <Typography variant="h3">What is 18px to rem, and other common sizes?</Typography>
      <Typography variant="body1">
        At the default 16px root font size: 12px = 0.75rem, 14px = 0.875rem, 16px = 1rem, 18px = 1.125rem, 20px
        = 1.25rem, 24px = 1.5rem, 32px = 2rem, and 38px = 2.375rem.
      </Typography>
      <Typography variant="h3">What if the root font size isn&apos;t 16px?</Typography>
      <Typography variant="body1">
        Enter your custom root font size in the tool and every conversion — including the quick reference
        table — will adjust accordingly, using rem = px ÷ your custom base.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="PX to REM Converter"
      description="Convert Pixels (px) to REM units instantly for responsive CSS web design. Free online calculator."
      url="/converters/px-to-rem-converter"
      content={content}
      category="Converters"
    >
      <PxToRemContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PxToRemConverter;
