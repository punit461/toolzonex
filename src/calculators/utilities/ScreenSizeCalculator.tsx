'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ASPECT_RATIOS: Record<string, { w: number; h: number }> = {
  '16:9': { w: 16, h: 9 },
  '16:10': { w: 16, h: 10 },
  '4:3': { w: 4, h: 3 },
  '21:9': { w: 21, h: 9 },
  '32:9': { w: 32, h: 9 },
  '1:1': { w: 1, h: 1 },
  'custom': { w: 16, h: 9 },
};

const ScreenSizeCalculator = () => {
  const [diagonal, setDiagonal] = useState<string>('');
  const [ratio, setRatio] = useState<string>('16:9');
  const [customW, setCustomW] = useState<string>('16');
  const [customH, setCustomH] = useState<string>('9');

  const result = useMemo(() => {
    const d = Number(diagonal);
    if (!d || d <= 0) return null;

    let rw: number, rh: number;
    if (ratio === 'custom') {
      rw = Number(customW) || 16;
      rh = Number(customH) || 9;
    } else {
      rw = ASPECT_RATIOS[ratio].w;
      rh = ASPECT_RATIOS[ratio].h;
    }

    const hyp = Math.sqrt(rw * rw + rh * rh);
    const widthIn = (d * rw) / hyp;
    const heightIn = (d * rh) / hyp;
    const widthCm = widthIn * 2.54;
    const heightCm = heightIn * 2.54;
    const areaInSq = widthIn * heightIn;
    const areaCmSq = widthCm * heightCm;

    return { widthIn, heightIn, widthCm, heightCm, areaInSq, areaCmSq, rw, rh };
  }, [diagonal, ratio, customW, customH]);

  const displayRatio = ratio === 'custom' ? `${customW || '16'}:${customH || '9'}` : ratio;

  const content = (
    <>
      <Typography variant="h2">How is Screen Size Calculated?</Typography>
      <Typography variant="body1">
        Screen size is measured diagonally from one corner to the opposite corner. To find the actual width
        and height, we use the aspect ratio — the proportional relationship between width and height. Given
        the diagonal (d) and aspect ratio (w:h), the width is d × w / √(w² + h²) and the height is
        d × h / √(w² + h²).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 27-inch monitor with a 16:9 aspect ratio has a width of approximately 23.53 inches (59.77 cm) and
        a height of approximately 13.24 inches (33.62 cm). The total screen area is about 311.5 sq inches.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing monitors or TVs — knowing the physical dimensions helps determine if a screen fits your desk or wall space.</li>
          <li>Planning a multi-monitor setup — calculating combined width and height for side-by-side or stacked arrangements.</li>
          <li>Designing UI layouts — understanding the actual pixel density and physical size of your target display.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is screen size measured diagonally?</Typography>
      <Typography variant="body1">
        Diagonal measurement is an industry standard that allows a single number to represent screen size
        regardless of aspect ratio. It has been the convention since CRT televisions.
      </Typography>
      <Typography variant="h3">Does bezel size affect the calculation?</Typography>
      <Typography variant="body1">
        No — this calculator uses the viewable display area only. The bezel (frame around the screen) adds
        to the overall physical dimensions but is not part of the diagonal measurement.
      </Typography>
      <Typography variant="h3">What is the most common aspect ratio?</Typography>
      <Typography variant="body1">
        16:9 is the most common for modern monitors and TVs. 16:10 is popular for productivity monitors,
        and 21:9 (ultrawide) is increasingly common for immersive gaming and multitasking.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/screen-size-calculator" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Screen Diagonal (inches)"
              type="number"
              fullWidth
              value={diagonal}
              onChange={(e) => setDiagonal(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <FormControl fullWidth>
              <InputLabel>Aspect Ratio</InputLabel>
              <Select value={ratio} label="Aspect Ratio" onChange={(e) => setRatio(e.target.value)}>
                {Object.keys(ASPECT_RATIOS).filter(k => k !== 'custom').map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
                <MenuItem value="custom">Custom</MenuItem>
              </Select>
            </FormControl>
            {ratio === 'custom' && (
              <Stack direction="row" spacing={2}>
                <TextField label="Width" type="number" fullWidth value={customW} onChange={(e) => setCustomW(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Height" type="number" fullWidth value={customH} onChange={(e) => setCustomH(e.target.value)} onFocus={(e) => e.target.select()} />
              </Stack>
            )}
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Typography variant="h6" gutterBottom>Screen Dimensions ({displayRatio})</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 2, mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Width</Typography>
                <Typography variant="h5" fontWeight={700}>{result.widthIn.toFixed(2)}″</Typography>
                <Typography variant="body2" color="text.secondary">{result.widthCm.toFixed(2)} cm</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Height</Typography>
                <Typography variant="h5" fontWeight={700}>{result.heightIn.toFixed(2)}″</Typography>
                <Typography variant="body2" color="text.secondary">{result.heightCm.toFixed(2)} cm</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Area</Typography>
                <Typography variant="h5" fontWeight={700}>{result.areaInSq.toFixed(1)} sq in</Typography>
                <Typography variant="body2" color="text.secondary">{result.areaCmSq.toFixed(0)} sq cm</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: `${Math.min(result.widthIn * 8, 400)}px`,
                  height: `${Math.min(result.heightIn * 8, 250)}px`,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'primary.main',
                  opacity: 0.1,
                }}
              />
            </Box>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ScreenSizeCalculator;
