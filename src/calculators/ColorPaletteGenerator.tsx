'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, Tooltip } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
};

const generatePalette = () => {
  return Array.from({ length: 5 }, () => generateRandomColor());
};

const ColorPaletteGeneratorContent = () => {
  const [colors, setColors] = useState<string[]>(['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = () => {
    setColors(generatePalette());
  };

  const handleCopy = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      
      <Box sx={{ display: 'flex', width: '100%', height: { xs: 300, md: 400 }, borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
        {colors.map((color, index) => (
          <Box 
            key={index}
            sx={{ 
              flex: 1, 
              bgcolor: color, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              pb: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                flex: 1.2
              }
            }}
          >
            <Tooltip title="Copy HEX" arrow placement="top">
              <Button 
                onClick={() => handleCopy(color, index)}
                sx={{ 
                  color: 'white', 
                  bgcolor: 'rgba(0,0,0,0.3)', 
                  px: 2, 
                  py: 1, 
                  borderRadius: 2,
                  backdropFilter: 'blur(4px)',
                  textTransform: 'none',
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
                }}
                endIcon={copiedIndex === index ? undefined : <ContentCopyIcon fontSize="small" />}
              >
                {copiedIndex === index ? 'Copied!' : color}
              </Button>
            </Tooltip>
          </Box>
        ))}
      </Box>

      <Button 
        variant="contained" 
        size="large" 
        startIcon={<AutoFixHighIcon />} 
        onClick={handleGenerate}
        sx={{ px: 6, py: 1.5, fontSize: '1.1rem', borderRadius: 8 }}
      >
        Generate Random Palette
      </Button>

    </Box>
  );
};

const ColorPaletteGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Random Color Palette Generator</Typography>
      <Typography variant="body1">
        Generate beautiful random color palettes for your next design project, website, or illustration. Simply click the generate button to create a new 5-color scheme, and click any hex code to copy it instantly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Color Palette Generator - Random Hex Colors"
      description="Generate beautiful random color palettes for web design and art. One click to copy hex codes."
      url="/tools/color-palette-generator"
      content={content}
      category="Tools"
    >
      <ColorPaletteGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ColorPaletteGenerator;
