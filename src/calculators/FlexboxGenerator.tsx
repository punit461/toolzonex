'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const FlexboxGeneratorContent = () => {
  const [flexDirection, setFlexDirection] = useState<string>('row');
  const [justifyContent, setJustifyContent] = useState<string>('flex-start');
  const [alignItems, setAlignItems] = useState<string>('stretch');
  const [flexWrap, setFlexWrap] = useState<string>('nowrap');
  const [gap, setGap] = useState<string>('16px');

  const cssString = `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${gap};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssString);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 4 }}>
      
      {/* Control Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <FormControl fullWidth size="small">
          <InputLabel>flex-direction</InputLabel>
          <Select value={flexDirection} label="flex-direction" onChange={(e) => setFlexDirection(e.target.value as string)}>
            <MenuItem value="row">row</MenuItem>
            <MenuItem value="row-reverse">row-reverse</MenuItem>
            <MenuItem value="column">column</MenuItem>
            <MenuItem value="column-reverse">column-reverse</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth size="small">
          <InputLabel>justify-content</InputLabel>
          <Select value={justifyContent} label="justify-content" onChange={(e) => setJustifyContent(e.target.value as string)}>
            <MenuItem value="flex-start">flex-start</MenuItem>
            <MenuItem value="flex-end">flex-end</MenuItem>
            <MenuItem value="center">center</MenuItem>
            <MenuItem value="space-between">space-between</MenuItem>
            <MenuItem value="space-around">space-around</MenuItem>
            <MenuItem value="space-evenly">space-evenly</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>align-items</InputLabel>
          <Select value={alignItems} label="align-items" onChange={(e) => setAlignItems(e.target.value as string)}>
            <MenuItem value="stretch">stretch</MenuItem>
            <MenuItem value="flex-start">flex-start</MenuItem>
            <MenuItem value="flex-end">flex-end</MenuItem>
            <MenuItem value="center">center</MenuItem>
            <MenuItem value="baseline">baseline</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>flex-wrap</InputLabel>
          <Select value={flexWrap} label="flex-wrap" onChange={(e) => setFlexWrap(e.target.value as string)}>
            <MenuItem value="nowrap">nowrap</MenuItem>
            <MenuItem value="wrap">wrap</MenuItem>
            <MenuItem value="wrap-reverse">wrap-reverse</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>gap</InputLabel>
          <Select value={gap} label="gap" onChange={(e) => setGap(e.target.value as string)}>
            <MenuItem value="0px">0px</MenuItem>
            <MenuItem value="8px">8px</MenuItem>
            <MenuItem value="16px">16px</MenuItem>
            <MenuItem value="24px">24px</MenuItem>
            <MenuItem value="32px">32px</MenuItem>
          </Select>
        </FormControl>

      </Box>

      {/* Preview Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Paper 
          sx={{ 
            height: 300, 
            bgcolor: '#f8fafc',
            border: '2px dashed #cbd5e1',
            display: 'flex',
            flexDirection,
            justifyContent,
            alignItems,
            flexWrap,
            gap,
            p: 2,
            overflow: 'auto'
          } as React.CSSProperties}
        >
          {[1, 2, 3, 4].map(num => (
            <Box 
              key={num} 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white', 
                p: 2, 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 60,
                minHeight: 60,
                fontWeight: 'bold'
              }}
            >
              Item {num}
            </Box>
          ))}
        </Paper>

        <Box sx={{ position: 'relative' }}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.900', 
              color: '#10b981',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}
          >
            {cssString}
          </Paper>
          <Button 
            variant="contained"
            size="small"
            startIcon={<ContentCopyIcon />} 
            onClick={copyToClipboard}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Copy
          </Button>
        </Box>
        
      </Box>

    </Box>
  );
};

const FlexboxGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">CSS Flexbox Generator</Typography>
      <Typography variant="body1">
        Master CSS Flexible Box Layout (Flexbox) visually. Use the controls to adjust flex direction, alignment, spacing, and wrapping. The preview window updates in real-time, allowing you to instantly see the effects and copy the generated CSS.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Flexbox Generator"
      description="Visually generate CSS Flexbox layouts. Test alignment, wrapping, and direction, then copy the CSS code instantly."
      url="/tools/flexbox-generator"
      content={content}
      category="Tools"
    >
      <FlexboxGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlexboxGenerator;
