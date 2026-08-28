'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LITERS_PER_CUBIC_FOOT = 28.3168;
const LITERS_PER_CUBIC_METER = 1000;
const GALLONS_PER_LITER = 0.264172;

const PipeVolumeCalculatorContent = () => {
  const [diameter, setDiameter] = useState<string>('4');
  const [diaUnit, setDiaUnit] = useState<'in' | 'mm'>('in');
  const [length, setLength] = useState<string>('10');
  const [lenUnit, setLenUnit] = useState<'ft' | 'm'>('ft');

  const dia = parseFloat(diameter) || 0;
  const len = parseFloat(length) || 0;

  const diaMeters = diaUnit === 'mm' ? dia / 1000 : dia * 0.0254;
  const lenMeters = lenUnit === 'm' ? len : len * 0.3048;
  const radiusMeters = diaMeters / 2;

  const volumeM3 = Math.PI * radiusMeters * radiusMeters * lenMeters;
  const liters = volumeM3 * LITERS_PER_CUBIC_METER;
  const gallons = liters * GALLONS_PER_LITER;
  const cubicFeet = volumeM3 * 35.3147;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Inner Diameter"
          type="number"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Diameter Unit</InputLabel>
          <Select value={diaUnit} label="Diameter Unit" onChange={(e) => setDiaUnit(e.target.value as 'in' | 'mm')}>
            <MenuItem value="in">Inches (in)</MenuItem>
            <MenuItem value="mm">Millimeters (mm)</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Pipe Length"
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Length Unit</InputLabel>
          <Select value={lenUnit} label="Length Unit" onChange={(e) => setLenUnit(e.target.value as 'ft' | 'm')}>
            <MenuItem value="ft">Feet (ft)</MenuItem>
            <MenuItem value="m">Meters (m)</MenuItem>
          </Select>
        </FormControl>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Volume = π × r² × L
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            π × ({radiusMeters.toFixed(4)} m)² × {lenMeters.toFixed(3)} m = {volumeM3.toFixed(5)} m³
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {liters.toFixed(2)} L
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Pipe Volume
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Cubic Meters</Typography>
              <Typography variant="body2" fontWeight="bold">{volumeM3.toFixed(4)} m³</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Gallons</Typography>
              <Typography variant="body2" fontWeight="bold">{gallons.toFixed(2)} gal</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Cubic Feet</Typography>
              <Typography variant="body2" fontWeight="bold">{cubicFeet.toFixed(4)} ft³</Typography>
            </Box>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Inner Diameter</Typography>
            <Typography variant="body2" fontWeight="bold">{dia} {diaUnit === 'in' ? 'in' : 'mm'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Pipe Length</Typography>
            <Typography variant="body2" fontWeight="bold">{len} {lenUnit === 'ft' ? 'ft' : 'm'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Radius</Typography>
            <Typography variant="body2" fontWeight="bold">{radiusMeters.toFixed(4)} m</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const PipeVolumeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Pipe Volume Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the inner diameter and length of the pipe. The calculator converts the units to meters, finds
        the radius, and applies the cylinder volume formula Volume = π × r² × L. The result is shown in
        liters, cubic meters, gallons US, and cubic feet. Use the inner diameter rather than the outer
        diameter to measure liquid capacity correctly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a pipe with a 4-inch inner diameter (0.1016 m) and 10 ft length (3.048 m): the radius is 0.0508 m.
        Volume = π × 0.0508² × 3.048 = 0.0247 m³, which equals 24.72 liters, 6.53 US gallons, or 0.873 ft³.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating water volume in plumbing and piping systems.</li>
          <li>Sizing storage tanks and pressure vessels.</li>
          <li>Calculating coolant volume for heating and cooling loops.</li>
          <li>Planning pre-fill or flushing quantities for pipeline installations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Should I use the inner or outer diameter?</Typography>
      <Typography variant="body1">
        Always use the inner diameter (the bore) for volume calculations, because liquid only occupies the
        hollow interior. The outer diameter includes the pipe wall thickness.
      </Typography>
      <Typography variant="h3">Do the gallon results use US or imperial gallons?</Typography>
      <Typography variant="body1">
        The calculator uses US gallons (1 US gallon ≈ 3.785 liters). Imperial gallons are about 20% larger.
      </Typography>
      <Typography variant="h3">What if my pipe is given in metric units?</Typography>
      <Typography variant="body1">
        Enter the diameter in millimeters and the length in meters using the unit selectors — the calculator
        handles the conversion automatically.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pipe-volume-calculator" content={content}>
      <PipeVolumeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PipeVolumeCalculator;