'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RoomVolumeCalculator = () => {
  const [length, setLength] = useState<string>('12');
  const [width, setWidth] = useState<string>('10');
  const [height, setHeight] = useState<string>('9');

  const { cubicFeet, cubicMeters, valid } = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      return { cubicFeet: 0, cubicMeters: 0, valid: false };
    }
    const cf = l * w * h;
    return { cubicFeet: cf, cubicMeters: cf * 0.0283168, valid: true };
  }, [length, width, height]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Room Volume</Typography>
      <Typography variant="body1">
        Room volume is simply length times width times height, giving the total amount of air space enclosed by
        the room. This figure is more useful than floor area alone for sizing HVAC equipment, ventilation, and
        air purifiers, since taller rooms have more air to heat, cool, or filter than the floor area suggests.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Volume = Length × Width × Height
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A room measuring 12&nbsp;ft × 10&nbsp;ft with a 9&nbsp;ft ceiling has a volume of
        12 × 10 × 9 = 1,080 cubic feet, which is about 30.6 cubic meters.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing an air conditioner, heater, humidifier, or air purifier to a room&apos;s actual air volume.</li>
          <li>Estimating how many air changes per hour a ventilation system provides for a room.</li>
          <li>Comparing rooms with different ceiling heights that have the same floor area.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does volume matter more than floor area for HVAC sizing?</Typography>
      <Typography variant="body1">
        Heating, cooling, and air purification all work on the volume of air in a space, not just its floor
        footprint. A room with a 12-foot ceiling has 33% more air to condition than an identical-footprint room
        with a 9-foot ceiling, which directly affects the equipment capacity you need.
      </Typography>
      <Typography variant="h3">How do I handle a room with a sloped or vaulted ceiling?</Typography>
      <Typography variant="body1">
        For a sloped ceiling, use the average height across the room as an approximation, or split the room into
        simpler rectangular and triangular sections, calculate each volume separately, and add them together for
        a more accurate total.
      </Typography>
      <Typography variant="h3">What units does this calculator use?</Typography>
      <Typography variant="body1">
        Enter length, width, and height in feet, and the result shows both cubic feet and the metric equivalent
        in cubic meters, so you can use whichever unit your HVAC equipment or specifications reference.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/room-volume-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Width (ft)" type="number" fullWidth value={width} onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Height (ft)" type="number" fullWidth value={height} onChange={(e) => setHeight(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Room Volume</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? `${cubicFeet.toFixed(1)} cu ft` : '—'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {valid ? `${cubicMeters.toFixed(2)} cu m` : ''}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RoomVolumeCalculator;
