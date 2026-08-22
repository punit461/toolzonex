'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, Slider, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GradientGeneratorContent = () => {
  const [color1, setColor1] = useState<string>('#4ade80');
  const [color2, setColor2] = useState<string>('#3b82f6');
  const [angle, setAngle] = useState<number>(90);

  const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientString};`);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Control Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Color 1"
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            fullWidth
            sx={{ '& input': { height: 50, cursor: 'pointer' } }}
          />
          <TextField
            label="Color 2"
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            fullWidth
            sx={{ '& input': { height: 50, cursor: 'pointer' } }}
          />
        </Box>
        
        <Box>
          <Typography variant="subtitle2" mb={1}>Angle: {angle}°</Typography>
          <Slider value={angle} min={0} max={360} onChange={(e, val) => setAngle(val as number)} />
        </Box>

      </Box>

      {/* Preview Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Paper 
          sx={{ 
            height: 250, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: 2,
            background: gradientString,
            border: '1px solid',
          }}
        />

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
            background: {gradientString};
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

const GradientGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">CSS Gradient Generator</Typography>
      <Typography variant="body1">
        Visually generate beautiful linear gradients for your web projects. Pick your colors, adjust the angle, and instantly get the CSS code to copy and paste into your stylesheets.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Pick your gradient colors and angle using the controls, preview the result live, then copy the
        generated CSS.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 90&deg; gradient from blue to purple generates <code>background: linear-gradient(90deg, #1a56db, #7c3aed);</code> — ready to paste into your CSS.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Designing button, banner, or background gradients for a website.</li>
          <li>Experimenting with color combinations and angles visually.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I add more than two colors?</Typography>
      <Typography variant="body1">
        Check the tool&apos;s color-stop controls — many gradient generators support multiple color stops for
        more complex gradients.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/developer-tools/gradient-generator"
      content={content}
    >
      <GradientGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GradientGenerator;
