'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Insulation = 'poor' | 'average' | 'good';
type Climate = 'mild' | 'moderate' | 'cold';

const INSULATION_MULTIPLIER: Record<Insulation, number> = {
  poor: 1.2,
  average: 1.0,
  good: 0.85,
};

const CLIMATE_MULTIPLIER: Record<Climate, number> = {
  mild: 0.8,
  moderate: 1.0,
  cold: 1.3,
};

const HeaterSizeCalculator = () => {
  const [length, setLength] = useState<string>('15');
  const [width, setWidth] = useState<string>('20');
  const [ceilingHeight, setCeilingHeight] = useState<string>('8');
  const [insulation, setInsulation] = useState<Insulation>('average');
  const [climate, setClimate] = useState<Climate>('moderate');

  const l = parseFloat(length);
  const w = parseFloat(width);
  const h = parseFloat(ceilingHeight);

  const valid = !isNaN(l) && !isNaN(w) && !isNaN(h) && l > 0 && w > 0 && h > 0;
  const area = valid ? l * w : 0;
  const baseBtu = valid ? area * 25 : 0;
  const heightAdjusted = valid && h > 8 ? baseBtu * (1 + 0.05 * (h - 8)) : baseBtu;
  const totalBtu = valid ? heightAdjusted * INSULATION_MULTIPLIER[insulation] * CLIMATE_MULTIPLIER[climate] : 0;

  const content = (
    <>
      <Typography variant="h2">How to Size a Heater in BTUs</Typography>
      <Typography variant="body1">
        This calculator is the heating companion to our Air Conditioner BTU Calculator. It starts from a
        standard heating rule of thumb of about 25 BTU per square foot of room area (assuming an 8 ft ceiling),
        then adjusts for ceiling height, how well-insulated the space is, and how cold your climate typically
        gets — the two factors that matter most for heating but don&apos;t apply the same way to cooling.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        BTU = Area × 25 × Ceiling Adjustment × Insulation Multiplier × Climate Multiplier
      </Box>
      <Typography variant="body1">
        Poor insulation increases the estimate by 20% and good insulation reduces it by 15%, relative to an
        average, reasonably insulated room. A mild climate reduces the estimate by 20% and a cold climate
        increases it by 30%. Ceilings taller than 8 ft add 5% capacity per extra foot, just as with the AC
        calculator.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 300 sq ft room (15 ft × 20 ft) with a standard 8 ft ceiling, average insulation, and a moderate
        climate needs about 300 × 25 = 7,500 BTU of heating capacity — a useful starting point for sizing a
        space heater or a zone of a larger heating system.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing the right BTU rating for a portable or wall-mounted space heater.</li>
          <li>Sizing a single room or zone of a ductless heat pump system.</li>
          <li>Comparing how much insulation upgrades or a colder climate change your heating needs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the AC BTU Calculator?</Typography>
      <Typography variant="body1">
        The AC BTU Calculator sizes cooling capacity using sun exposure and occupant count, since heat gain from
        sunlight and body heat matters most for cooling. This calculator instead sizes heating capacity using
        insulation quality and climate severity, since heat loss through walls, windows, and outside temperature
        matters most for heating. They use different inputs because heating and cooling loads are driven by
        different factors.
      </Typography>
      <Typography variant="h3">Why does insulation matter so much for heating?</Typography>
      <Typography variant="body1">
        Poorly insulated rooms lose heat quickly through walls, windows, and gaps, so a heater has to work
        harder and longer to maintain temperature. Well-insulated rooms retain heat better, letting a smaller
        heater keep up.
      </Typography>
      <Typography variant="h3">Should I round the result up or down?</Typography>
      <Typography variant="body1">
        Round up to the nearest common heater size (1,500, 5,000, 10,000, 15,000 BTU, and so on) rather than
        down — an undersized heater will run constantly without keeping the room comfortable, especially during
        the coldest stretches of your climate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/heater-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Room Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Room Width (ft)" type="number" fullWidth value={width} onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Ceiling Height (ft)" type="number" fullWidth value={ceilingHeight} onChange={(e) => setCeilingHeight(e.target.value)} onFocus={(e) => e.target.select()} />
          <FormControl fullWidth size="small">
            <InputLabel>Insulation Quality</InputLabel>
            <Select label="Insulation Quality" value={insulation} onChange={(e) => setInsulation(e.target.value as Insulation)}>
              <MenuItem value="poor">Poor</MenuItem>
              <MenuItem value="average">Average</MenuItem>
              <MenuItem value="good">Good</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>Climate Severity</InputLabel>
            <Select label="Climate Severity" value={climate} onChange={(e) => setClimate(e.target.value as Climate)}>
              <MenuItem value="mild">Mild</MenuItem>
              <MenuItem value="moderate">Moderate</MenuItem>
              <MenuItem value="cold">Cold</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Recommended Capacity</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? `${Math.round(totalBtu).toLocaleString()} BTU` : '—'}
          </Typography>
          <Typography variant="caption" color="text.secondary">{valid ? `${area.toFixed(0)} sq ft room` : ''}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HeaterSizeCalculator;
