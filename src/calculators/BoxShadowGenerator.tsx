'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, Slider, FormGroup, FormControlLabel, Switch } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const BoxShadowGeneratorContent = () => {
  const [hOffset, setHOffset] = useState<number>(10);
  const [vOffset, setVOffset] = useState<number>(10);
  const [blur, setBlur] = useState<number>(15);
  const [spread, setSpread] = useState<number>(0);
  const [color, setColor] = useState<string>('rgba(0, 0, 0, 0.3)');
  const [inset, setInset] = useState<boolean>(false);

  const boxShadowString = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${color}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadowString};`);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Control Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Box>
          <Typography variant="subtitle2" mb={1}>Horizontal Offset: {hOffset}px</Typography>
          <Slider value={hOffset} min={-50} max={50} onChange={(e, val) => setHOffset(val as number)} />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" mb={1}>Vertical Offset: {vOffset}px</Typography>
          <Slider value={vOffset} min={-50} max={50} onChange={(e, val) => setVOffset(val as number)} />
        </Box>

        <Box>
          <Typography variant="subtitle2" mb={1}>Blur Radius: {blur}px</Typography>
          <Slider value={blur} min={0} max={100} onChange={(e, val) => setBlur(val as number)} />
        </Box>

        <Box>
          <Typography variant="subtitle2" mb={1}>Spread Radius: {spread}px</Typography>
          <Slider value={spread} min={-50} max={50} onChange={(e, val) => setSpread(val as number)} />
        </Box>

        <FormGroup>
          <FormControlLabel 
            control={<Switch checked={inset} onChange={(e) => setInset(e.target.checked)} />} 
            label="Inset (Inner Shadow)" 
          />
        </FormGroup>

      </Box>

      {/* Preview Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Paper 
          sx={{ 
            height: 250, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: '#f8fafc',
            border: '1px solid #e2e8f0',
            overflow: 'hidden'
          }}
        >
          <Box 
            sx={{ 
              width: 150, 
              height: 150, 
              bgcolor: 'primary.main',
              borderRadius: 2,
              boxShadow: boxShadowString,
              transition: 'box-shadow 0.2s ease'
            }} 
          />
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
            box-shadow: {boxShadowString};
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

const BoxShadowGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">CSS Box Shadow Generator</Typography>
      <Typography variant="body1">
        Visually generate beautiful CSS box shadows for your web projects. Adjust the horizontal and vertical offsets, blur radius, and spread radius to create the perfect drop shadow or inner shadow. Copy the generated CSS code with one click.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Box Shadow Generator"
      description="Generate beautiful CSS box shadows visually. Customize offset, blur, and spread, and copy the CSS code instantly."
      url="/tools/box-shadow-generator"
      content={content}
      category="Tools"
    >
      <BoxShadowGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BoxShadowGenerator;
