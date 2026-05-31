'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Paper, Grid } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

// Helper to convert hex to RGB
const hexToRgb = (hex: string) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return { r, g, b };
};

// Calculate relative luminance for WCAG contrast
const getLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (lum1: number, lum2: number) => {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
};

const ContrastCheckerContent = () => {
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [bgColor, setBgColor] = useState<string>('#2563eb');
  const [contrast, setContrast] = useState<number>(0);

  useEffect(() => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(textColor) && /^#([0-9A-F]{3}){1,2}$/i.test(bgColor)) {
      const c1 = hexToRgb(textColor);
      const c2 = hexToRgb(bgColor);
      const l1 = getLuminance(c1.r, c1.g, c1.b);
      const l2 = getLuminance(c2.r, c2.g, c2.b);
      setContrast(getContrastRatio(l1, l2));
    } else {
      setContrast(0);
    }
  }, [textColor, bgColor]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">Colors</Typography>
          
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Text Color (HEX)</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box 
                sx={{ width: 56, height: 56, borderRadius: 1, bgcolor: /^#([0-9A-F]{3}){1,2}$/i.test(textColor) ? textColor : 'transparent', border: '1px solid #ddd' }} 
              />
              <TextField
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                fullWidth
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Background Color (HEX)</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box 
                sx={{ width: 56, height: 56, borderRadius: 1, bgcolor: /^#([0-9A-F]{3}){1,2}$/i.test(bgColor) ? bgColor : 'transparent', border: '1px solid #ddd' }} 
              />
              <TextField
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                fullWidth
              />
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Paper 
          sx={{ 
            p: 4, 
            minHeight: 200, 
            bgcolor: /^#([0-9A-F]{3}){1,2}$/i.test(bgColor) ? bgColor : '#fff', 
            border: '1px solid #ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ color: /^#([0-9A-F]{3}){1,2}$/i.test(textColor) ? textColor : '#000', fontWeight: 'bold' }}
          >
            The quick brown fox
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: /^#([0-9A-F]{3}){1,2}$/i.test(textColor) ? textColor : '#000' }}
          >
            This is how your text will look on the selected background.
          </Typography>
        </Paper>

        {contrast > 0 && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f8fafc' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Contrast Ratio</Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">{contrast.toFixed(2)} : 1</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', borderTop: `4px solid ${contrast >= 4.5 ? '#10b981' : '#ef4444'}` }}>
                  <Typography variant="subtitle2" color="text.secondary">Normal Text (WCAG AA)</Typography>
                  <Typography variant="h6" color={contrast >= 4.5 ? 'success.main' : 'error.main'}>
                    {contrast >= 4.5 ? 'Pass' : 'Fail'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">Requires 4.5:1</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper sx={{ p: 2, textAlign: 'center', borderTop: `4px solid ${contrast >= 3 ? '#10b981' : '#ef4444'}` }}>
                  <Typography variant="subtitle2" color="text.secondary">Large Text (WCAG AA)</Typography>
                  <Typography variant="h6" color={contrast >= 3 ? 'success.main' : 'error.main'}>
                    {contrast >= 3 ? 'Pass' : 'Fail'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">Requires 3.0:1</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        )}

      </Box>

    </Box>
  );
};

const ContrastChecker = () => {
  const content = (
    <>
      <Typography variant="h2">WCAG Color Contrast Checker</Typography>
      <Typography variant="body1">
        Check if your text and background colors have enough contrast to be readable by everyone. This tool calculates the contrast ratio according to the Web Content Accessibility Guidelines (WCAG) to ensure your designs are accessible.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Contrast Checker - WCAG Color Accessibility"
      description="Check color contrast ratios for WCAG accessibility compliance instantly. Free online contrast checker."
      url="/tools/contrast-checker"
      content={content}
      category="Tools"
    >
      <ContrastCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ContrastChecker;
