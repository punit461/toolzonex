'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Slider, ToggleButton, ToggleButtonGroup, InputAdornment, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type InputMode = 'carpet' | 'builtUp';

const SuperBuiltUpAreaCalculator = () => {
  const [inputMode, setInputMode] = useState<InputMode>('carpet');
  const [input, setInput] = useState('1000');
  const [loadingFactor, setLoadingFactor] = useState(15);
  const [commonAreaFactor, setCommonAreaFactor] = useState(20);

  const result = useMemo(() => {
    const val = parseFloat(input);
    if (isNaN(val) || val <= 0) return null;

    let carpetArea: number;
    let builtUpArea: number;

    if (inputMode === 'carpet') {
      carpetArea = val;
      builtUpArea = carpetArea * (1 + loadingFactor / 100);
    } else {
      builtUpArea = val;
      carpetArea = builtUpArea / (1 + loadingFactor / 100);
    }

    const superBuiltUpArea = builtUpArea * (1 + commonAreaFactor / 100);
    return { carpetArea, builtUpArea, superBuiltUpArea };
  }, [input, inputMode, loadingFactor, commonAreaFactor]);

  const content = (
    <>
      <Typography variant="h2">How the Super Built-up Area Calculator Works</Typography>
      <Typography variant="body1">
        Super built-up area takes built-up area one step further. After getting from carpet area to built-up
        area (adding wall thickness and balconies via the loading factor), a further common-area factor is
        applied to account for the unit&apos;s proportional share of shared spaces — lobbies, stairwells,
        elevators, corridors, and amenities like a clubhouse or gym.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Built-up Area = Carpet Area × (1 + Loading Factor)<br />
        Super Built-up Area = Built-up Area × (1 + Common-Area Factor)
      </Box>
      <Typography variant="body1">
        Enter either your carpet area or built-up area (whichever you have), adjust the loading factor
        (typically 10–20%) and common-area factor (typically 15–30%), and see the full chain from carpet
        area through to super built-up area.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1,000 sq ft carpet area with a 15% loading factor gives a built-up area of 1,150 sq ft. Applying a
        20% common-area factor on top gives a super built-up area of 1,150 × 1.20 = 1,380 sq ft — the figure
        most Indian apartment listings actually use to quote the price per square foot.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Understanding what portion of an apartment&apos;s quoted area is actually usable indoor space.</li>
          <li>Working out the real per-square-foot cost of carpet area from a super built-up area price.</li>
          <li>Comparing two listings that quote area using different definitions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Built-up Area Calculator?</strong> The Built-up Area Calculator stops at built-up area (carpet area plus wall thickness and balconies). This Super Built-up Area Calculator goes one step further, adding a common-area factor for shared building spaces — the figure actually used to price most apartments in Indian real estate listings.</li>
          <li><strong>What's a typical common-area factor?</strong> Most developments use somewhere between 15% and 30%, depending on how much shared amenity space (lobbies, clubhouses, gyms) the building offers. Larger, amenity-heavy developments tend toward the higher end.</li>
          <li><strong>Why does the usable carpet area feel so much smaller than the price I'm quoted?</strong> Because pricing is based on super built-up area, which can be 25–50% larger than the actual usable carpet area once both the loading factor and common-area factor are applied. Always ask for the carpet area figure directly to know your true usable space.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/super-built-up-area-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup exclusive value={inputMode} onChange={(_, v) => v && setInputMode(v)} fullWidth>
            <ToggleButton value="carpet" sx={{ textTransform: 'none' }}>I have Carpet Area</ToggleButton>
            <ToggleButton value="builtUp" sx={{ textTransform: 'none' }}>I have Built-up Area</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label={inputMode === 'carpet' ? 'Carpet Area' : 'Built-up Area'}
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />

          <Box>
            <Typography gutterBottom>Loading Factor: {loadingFactor}%</Typography>
            <Slider value={loadingFactor} onChange={(_, v) => setLoadingFactor(v as number)} min={10} max={20} step={0.5} valueLabelDisplay="auto" />
          </Box>

          <Box>
            <Typography gutterBottom>Common-Area Factor: {commonAreaFactor}%</Typography>
            <Slider value={commonAreaFactor} onChange={(_, v) => setCommonAreaFactor(v as number)} min={15} max={30} step={0.5} valueLabelDisplay="auto" />
          </Box>
        </Box>

        <Box>
          {result ? (
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Carpet Area</Typography>
                  <Typography fontWeight={700}>{result.carpetArea.toFixed(1)} sq ft</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Built-up Area</Typography>
                  <Typography fontWeight={700}>{result.builtUpArea.toFixed(1)} sq ft</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6">Super Built-up Area</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary.main">{result.superBuiltUpArea.toFixed(1)} sq ft</Typography>
                </Box>
              </Stack>
            </Paper>
          ) : (
            <Typography color="text.secondary">Enter a valid area to see the conversion.</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SuperBuiltUpAreaCalculator;
