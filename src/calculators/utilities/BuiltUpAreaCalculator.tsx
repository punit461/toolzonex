'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Slider, ToggleButton, ToggleButtonGroup, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Direction = 'toBuiltUp' | 'toCarpet';

const BuiltUpAreaCalculator = () => {
  const [direction, setDirection] = useState<Direction>('toBuiltUp');
  const [input, setInput] = useState('1000');
  const [loadingFactor, setLoadingFactor] = useState(15);

  const result = useMemo(() => {
    const val = parseFloat(input);
    if (isNaN(val) || val <= 0) return null;

    if (direction === 'toBuiltUp') {
      const builtUp = val * (1 + loadingFactor / 100);
      return { carpetArea: val, builtUpArea: builtUp };
    }
    const carpet = val / (1 + loadingFactor / 100);
    return { carpetArea: carpet, builtUpArea: val };
  }, [input, direction, loadingFactor]);

  const content = (
    <>
      <Typography variant="h2">How the Built-up Area Calculator Works</Typography>
      <Typography variant="body1">
        In Indian real estate, <strong>carpet area</strong> is the actual usable indoor floor area within a
        unit&apos;s walls — the space you could literally lay carpet on. <strong>Built-up area</strong> is
        larger: it adds the thickness of the unit&apos;s walls and any attached balconies or verandas on top
        of the carpet area. The extra percentage added is called the loading factor, typically 10–20%.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Built-up Area = Carpet Area × (1 + Loading Factor)
      </Box>
      <Typography variant="body1">
        Enter carpet area to calculate built-up area, or switch direction to enter a known built-up area and
        back-calculate the implied carpet area. Adjust the loading factor slider to match your specific
        property (15% is a common default).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A flat with 1,000 sq ft of carpet area and a 15% loading factor has a built-up area of 1,000 ×
        1.15 = 1,150 sq ft. The extra 150 sq ft accounts for wall thickness and any balcony space.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Understanding a property listing that quotes built-up area rather than carpet area.</li>
          <li>Comparing the actual usable space you&apos;ll get against the built-up figure in a brochure.</li>
          <li>Back-calculating carpet area when only the built-up figure is available.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this the same "carpet area" as the Carpet Area Calculator on this site?</strong> No — that&apos;s a naming coincidence. Our Carpet Area Calculator is about buying physical carpet flooring material for a room in a US context (length × width of floor to carpet). This Built-up Area Calculator uses "carpet area" in the Indian real estate sense — the usable floor space inside a unit&apos;s walls, unrelated to buying carpet material.</li>
          <li><strong>What's a typical loading factor?</strong> Most Indian apartments use a loading factor between 10% and 20%, depending on wall thickness, common balconies, and building design. Always check your specific builder&apos;s stated loading factor rather than assuming a default.</li>
          <li><strong>Is built-up area the figure used to price apartments?</strong> Not usually — most listings price per square foot of super built-up area, which goes one step further than built-up area by also including a share of shared spaces like lobbies and stairwells. Use our Super Built-up Area Calculator for that figure.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/built-up-area-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup exclusive value={direction} onChange={(_, v) => v && setDirection(v)} fullWidth>
            <ToggleButton value="toBuiltUp" sx={{ textTransform: 'none' }}>Carpet → Built-up</ToggleButton>
            <ToggleButton value="toCarpet" sx={{ textTransform: 'none' }}>Built-up → Carpet</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label={direction === 'toBuiltUp' ? 'Carpet Area' : 'Built-up Area'}
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />

          <Box>
            <Typography gutterBottom>Loading Factor: {loadingFactor}%</Typography>
            <Slider
              value={loadingFactor}
              onChange={(_, v) => setLoadingFactor(v as number)}
              min={10}
              max={20}
              step={0.5}
              valueLabelDisplay="auto"
            />
          </Box>
        </Box>

        <Box>
          {result ? (
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>Carpet Area</Typography>
                <Typography fontWeight={700}>{result.carpetArea.toFixed(1)} sq ft</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Built-up Area</Typography>
                <Typography variant="h6" fontWeight={700} color="primary.main">{result.builtUpArea.toFixed(1)} sq ft</Typography>
              </Box>
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

export default BuiltUpAreaCalculator;
