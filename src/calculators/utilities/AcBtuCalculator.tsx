'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SunExposure = 'shaded' | 'average' | 'sunny';

const SUN_MULTIPLIER: Record<SunExposure, number> = {
  shaded: 0.9,
  average: 1.0,
  sunny: 1.1,
};

const AcBtuCalculator = () => {
  const [length, setLength] = useState<string>('15');
  const [width, setWidth] = useState<string>('20');
  const [ceilingHeight, setCeilingHeight] = useState<string>('8');
  const [sun, setSun] = useState<SunExposure>('average');
  const [occupants, setOccupants] = useState<string>('2');

  const l = parseFloat(length);
  const w = parseFloat(width);
  const h = parseFloat(ceilingHeight);
  const occ = parseFloat(occupants);

  const valid = !isNaN(l) && !isNaN(w) && !isNaN(h) && !isNaN(occ) && l > 0 && w > 0 && h > 0 && occ >= 0;
  const area = valid ? l * w : 0;
  const baseBtu = valid ? area * 20 : 0;
  const heightAdjusted = valid && h > 8 ? baseBtu * (1 + 0.05 * (h - 8)) : baseBtu;
  const sunAdjusted = valid ? heightAdjusted * SUN_MULTIPLIER[sun] : 0;
  const occupantExtra = valid ? Math.max(0, occ - 2) * 600 : 0;
  const totalBtu = valid ? sunAdjusted + occupantExtra : 0;

  const content = (
    <>
      <Typography variant="h2">How to Size an Air Conditioner in BTUs</Typography>
      <Typography variant="body1">
        This calculator starts from the common HVAC rule of thumb of about 20 BTU of cooling capacity per
        square foot of room area (assuming an 8 ft ceiling), then adjusts for a taller ceiling, how much direct
        sun the room gets, and how many people typically occupy the space.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        BTU = Area × 20 × Sun Multiplier × Ceiling Adjustment + Occupant Extra
      </Box>
      <Typography variant="body1">
        Sunny rooms use a 1.1× multiplier and shaded rooms use 0.9× relative to an average room. Ceilings taller
        than 8 ft add 5% capacity per extra foot. Each occupant beyond the first two adds roughly 600 BTU, since
        each additional person in a room adds body heat the system has to remove.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 300 sq ft room (15 ft × 20 ft) with a standard 8 ft ceiling, average sun exposure, and 2 typical
        occupants needs about 300 × 20 = 6,000 BTU of cooling capacity — close to a common 6,000-8,000 BTU
        window unit size.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing the right BTU rating for a window or portable air conditioner.</li>
          <li>Sizing a ductless mini-split system for a specific room.</li>
          <li>Comparing whether an existing AC unit is under- or over-sized for a space.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the 20 BTU per square foot rule based on?</Typography>
      <Typography variant="body1">
        It&apos;s a widely used general guideline for a typical living space with a standard 8 ft ceiling and
        normal insulation. It&apos;s a solid starting point for most rooms, but rooms with poor insulation, lots
        of windows, or unusual layouts may need a more detailed load calculation from an HVAC professional.
      </Typography>
      <Typography variant="h3">Why does sun exposure change the recommendation?</Typography>
      <Typography variant="body1">
        A room with large west- or south-facing windows and lots of direct sunlight absorbs significantly more
        heat during the day than a shaded room, so it needs extra cooling capacity to keep up. Shaded rooms need
        somewhat less.
      </Typography>
      <Typography variant="h3">Should I round the result up or down?</Typography>
      <Typography variant="body1">
        Round up to the nearest common AC unit size (5,000, 6,000, 8,000, 10,000, 12,000, 14,000 BTU, and so on)
        rather than down — an undersized unit will run constantly without effectively cooling the room, while
        a modestly oversized one just cycles off sooner.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ac-btu-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Room Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Room Width (ft)" type="number" fullWidth value={width} onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Ceiling Height (ft)" type="number" fullWidth value={ceilingHeight} onChange={(e) => setCeilingHeight(e.target.value)} onFocus={(e) => e.target.select()} />
          <FormControl fullWidth size="small">
            <InputLabel>Sun Exposure</InputLabel>
            <Select label="Sun Exposure" value={sun} onChange={(e) => setSun(e.target.value as SunExposure)}>
              <MenuItem value="shaded">Shaded</MenuItem>
              <MenuItem value="average">Average</MenuItem>
              <MenuItem value="sunny">Sunny</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Number of Occupants" type="number" fullWidth value={occupants} onChange={(e) => setOccupants(e.target.value)} onFocus={(e) => e.target.select()} />
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

export default AcBtuCalculator;
