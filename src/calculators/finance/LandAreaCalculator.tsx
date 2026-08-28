'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UNITS = [
  { key: 'sqft', label: 'Square Feet', toSqFt: 1 },
  { key: 'sqm', label: 'Square Metres', toSqFt: 10.7639 },
  { key: 'acre', label: 'Acres', toSqFt: 43560 },
  { key: 'hectare', label: 'Hectares', toSqFt: 107639.104 },
  { key: 'bigha', label: 'Bigha', toSqFt: 27225 },
  { key: 'guntha', label: 'Guntha', toSqFt: 1089 },
  { key: 'ground', label: 'Ground', toSqFt: 2400 },
];

const LandAreaCalculatorContent = () => {
  const [inputValue, setInputValue] = useState('1000');
  const [selectedUnit, setSelectedUnit] = useState('sqft');

  const value = parseFloat(inputValue) || 0;
  const unit = UNITS.find((u) => u.key === selectedUnit)!;
  const inSqFt = value * unit.toSqFt;

  const conversions = UNITS.map((u) => ({
    label: u.label,
    value: inSqFt / u.toSqFt,
  }));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Area Value"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />
        <Select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          fullWidth
        >
          {UNITS.map((u) => (
            <MenuItem key={u.key} value={u.key}>{u.label}</MenuItem>
          ))}
        </Select>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>All Conversions</Typography>
        {conversions.map((c) => (
          <Paper
            key={c.label}
            variant="outlined"
            sx={{
              p: 2,
              mb: 1.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: c.label === unit.label ? 'primary.main' : 'background.paper',
              color: c.label === unit.label ? 'white' : 'inherit',
            }}
          >
            <Typography variant="body2">{c.label}</Typography>
            <Typography variant="body1" fontWeight="bold">
              {c.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const LandAreaCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the land area calculator?</Typography>
      <Typography variant="body1">
        Enter a numeric value and select the unit you are converting from. The calculator instantly shows the
        equivalent value in square feet, square metres, acres, hectares, bigha, guntha, and ground — so you
        can compare across any two measurement systems in one glance.
      </Typography>

      <Typography variant="h2">Conversion factors</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        1 acre = 43,560 sq ft &nbsp;|&nbsp; 1 hectare = 107,639 sq ft<br />
        1 bigha = 27,225 sq ft &nbsp;|&nbsp; 1 guntha = 1,089 sq ft<br />
        1 ground = 2,400 sq ft &nbsp;|&nbsp; 1 sq m = 10.764 sq ft
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering 1,000 square feet converts to approximately 92.90 sq m, 0.023 acres, 0.0093 hectares,
        0.0367 bigha, or 0.9174 guntha. This helps buyers and sellers working in different regional systems
        compare land sizes instantly.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why are bigha and guntha included?</strong> These units are commonly used in Indian real estate and agricultural land transactions, particularly in Maharashtra, Rajasthan, and parts of North India.</li>
          <li><strong>How accurate is the conversion?</strong> Conversion factors are standardised. Minor regional variations may exist — for example, bigha sizes differ slightly between states — but this calculator uses the most widely accepted national average.</li>
          <li><strong>Can I use this for carpet area vs. built-up area?</strong> The calculator converts numeric values only. It does not apply carpet-to-built-up or super-area multipliers; you must enter the correct area yourself.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing land sizes when property listings use different regional units.</li>
          <li>Converting between metric (sq m, hectare) and imperial (sq ft, acre) measurements.</li>
          <li>Quick reference for agricultural land dealings in guntha, bigha, or hectares.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/land-area-calculator" content={content}>
      <LandAreaCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LandAreaCalculator;
