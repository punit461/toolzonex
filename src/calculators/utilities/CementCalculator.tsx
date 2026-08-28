'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MIX_RATIOS = [
  { label: '1:2:4 (General RCC)', cement: 1, sand: 2, aggregate: 4 },
  { label: '1:1.5:3 (Pure Cement / High Strength)', cement: 1, sand: 1.5, aggregate: 3 },
  { label: '1:3:6 (Plain Concrete / Foundation)', cement: 1, sand: 3, aggregate: 6 },
];

const CementCalculatorContent = () => {
  const [volume, setVolume] = useState<string>('100');
  const [unit, setUnit] = useState<'ft3' | 'm3'>('ft3');
  const [ratioIdx, setRatioIdx] = useState<number>(0);

  const vol = parseFloat(volume) || 0;
  const ratio = MIX_RATIOS[ratioIdx];

  const volumeM3 = unit === 'm3' ? vol : vol * 0.0283168;
  const dryVolume = volumeM3 * 1.54;
  const totalParts = ratio.cement + ratio.sand + ratio.aggregate;
  const cementVol = (ratio.cement / totalParts) * dryVolume;
  const sandVol = (ratio.sand / totalParts) * dryVolume;
  const aggregateVol = (ratio.aggregate / totalParts) * dryVolume;
  const cementBags = cementVol / 0.035;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Volume of Concrete"
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Unit</InputLabel>
          <Select value={unit} label="Unit" onChange={(e) => setUnit(e.target.value as 'ft3' | 'm3')}>
            <MenuItem value="ft3">Cubic Feet (ft³)</MenuItem>
            <MenuItem value="m3">Cubic Meters (m³)</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Mix Ratio</InputLabel>
          <Select value={ratioIdx} label="Mix Ratio" onChange={(e) => setRatioIdx(Number(e.target.value))}>
            {MIX_RATIOS.map((r, i) => (
              <MenuItem key={i} value={i}>{r.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Dry Volume = Wet Volume × 1.54
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            {volumeM3.toFixed(3)} m³ × 1.54 = {dryVolume.toFixed(3)} m³
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
            {cementBags.toFixed(1)} bags
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Cement (50 kg bags)
          </Typography>
          <Box sx={{ mt: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Sand Volume</Typography>
              <Typography variant="body2" fontWeight="bold">{sandVol.toFixed(3)} m³</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Aggregate Volume</Typography>
              <Typography variant="body2" fontWeight="bold">{aggregateVol.toFixed(3)} m³</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Dry Volume</Typography>
              <Typography variant="body2" fontWeight="bold">{dryVolume.toFixed(3)} m³</Typography>
            </Box>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Cement Volume</Typography>
            <Typography variant="body2" fontWeight="bold">{cementVol.toFixed(3)} m³</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Sand Volume</Typography>
            <Typography variant="body2" fontWeight="bold">{sandVol.toFixed(3)} m³</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Aggregate Volume</Typography>
            <Typography variant="body2" fontWeight="bold">{aggregateVol.toFixed(3)} m³</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const CementCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Cement Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the volume of concrete you need and select a mix ratio. The calculator converts wet volume to
        dry volume using a factor of 1.54 (accounting for shrinkage and voids), then divides the dry volume
        into cement, sand, and aggregate portions based on the chosen ratio. One bag of cement is taken as
        50 kg, which occupies approximately 0.035 m³.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 100 cubic feet of concrete at a 1:2:4 mix: Wet volume is 2.832 m³, dry volume becomes 2.832 × 1.54
        = 4.361 m³. Cement portion: (1/7) × 4.361 = 0.623 m³, which equals 0.623 / 0.035 = 17.8 bags. Sand:
        (2/7) × 4.361 = 1.246 m³. Aggregate: (4/7) × 4.361 = 2.492 m³.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating material quantities for house construction in India.</li>
          <li>Planning concrete pours for foundations, slabs, and columns.</li>
          <li>Budgeting material costs before ordering from suppliers.</li>
          <li>Quick on-site verification for small to medium construction jobs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is the dry volume factor 1.54?</Typography>
      <Typography variant="body1">
        When cement, sand, and aggregate are mixed dry, there are voids between particles. The dry volume is
        typically 52–54% more than the wet volume. A factor of 1.54 is the standard assumption used in Indian
        construction practice.
      </Typography>
      <Typography variant="h3">What does the mix ratio 1:2:4 mean?</Typography>
      <Typography variant="body1">
        The ratio represents the proportion of cement : sand : aggregate by volume. A 1:2:4 mix (often called
        M15 grade) is suitable for general reinforced cement concrete work such as floors and footings.
      </Typography>
      <Typography variant="h3">How many kilograms does one bag of cement weigh?</Typography>
      <Typography variant="body1">
        In India, one bag of cement is standardised at 50 kg. The volume of one bag is approximately 0.035 m³
        (35 litres) when loosely packed.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cement-calculator" content={content}>
      <CementCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CementCalculator;
