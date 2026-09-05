'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface PlantType {
  label: string;
  spacing: number;
}

const PLANT_TYPES: PlantType[] = [
  { label: 'Tomatoes', spacing: 24 },
  { label: 'Carrots', spacing: 3 },
  { label: 'Lettuce', spacing: 8 },
  { label: 'Corn', spacing: 12 },
  { label: 'Beans', spacing: 4 },
  { label: 'Peppers', spacing: 18 },
  { label: 'Radishes', spacing: 2 },
  { label: 'Custom', spacing: 0 },
];

const SeedSpacingCalculator = () => {
  const [rowLength, setRowLength] = useState('20');
  const [bedWidth, setBedWidth] = useState('4');
  const [typeIndex, setTypeIndex] = useState(0);
  const [customSpacing, setCustomSpacing] = useState('12');

  const plantSpacingInches = typeIndex === PLANT_TYPES.length - 1
    ? parseFloat(customSpacing) || 0
    : PLANT_TYPES[typeIndex].spacing;

  const result = useMemo(() => {
    const length = (parseFloat(rowLength) || 0) * 12; // ft to inches
    const width = (parseFloat(bedWidth) || 0) * 12; // ft to inches

    const plantsPerRow = plantSpacingInches > 0 ? Math.floor(length / plantSpacingInches) : 0;
    const numberOfRows = plantSpacingInches > 0 ? Math.floor(width / plantSpacingInches) : 0;
    const totalPlants = plantsPerRow * numberOfRows;

    return { plantsPerRow, numberOfRows, totalPlants };
  }, [rowLength, bedWidth, plantSpacingInches]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Seed Spacing Calculator</Typography>
      <Typography variant="body1">
        Enter the length and width of your garden bed or row, then select a plant type to use its standard
        recommended spacing, or choose Custom to enter your own spacing value. The calculator converts your bed
        dimensions to inches and fits as many plants as possible along the row and across the rows at that
        spacing, then multiplies the two to get the total number of plants your bed can hold.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Plants Per Row = floor(Row Length / Plant Spacing)
        <br />
        Number of Rows = floor(Bed Width / Plant Spacing)
        <br />
        Total Plants = Plants Per Row × Number of Rows
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20 ft long, 4 ft wide bed planted with carrots at 3-inch spacing converts to 240 inches long and 48
        inches wide. That fits floor(240 / 3) = 80 plants per row and floor(48 / 3) = 16 rows, for a total of
        80 × 16 = 1,280 carrot plants.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning exactly how many seeds or seedlings to buy for a given bed size.</li>
          <li>Comparing yield potential between crops with very different spacing needs, like carrots vs. tomatoes.</li>
          <li>Laying out a new vegetable bed to avoid overcrowding or wasted space.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these spacing figures exact for every variety?</strong> No — spacing needs vary somewhat by specific variety and growing conditions. These are commonly published standard spacing figures meant as a solid general guideline; check your seed packet for the exact recommendation for your variety.</li>
          <li><strong>Should row spacing and plant spacing always be the same?</strong> Not necessarily — many gardeners use wider spacing between rows than between plants within a row to leave room for walking and maintenance. This calculator uses one spacing value for simplicity, but feel free to run it twice with different values to model row spacing separately.</li>
          <li><strong>What if my plant type isn't listed?</strong> Select "Custom" and enter the specific spacing recommendation from your seed packet or a gardening reference for that plant.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/seed-spacing-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Row/Bed Length" type="number" value={rowLength}
            onChange={(e) => setRowLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Bed Width" type="number" value={bedWidth}
            onChange={(e) => setBedWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <FormControl fullWidth>
            <InputLabel>Plant Type</InputLabel>
            <Select
              value={typeIndex}
              label="Plant Type"
              onChange={(e: SelectChangeEvent<number>) => setTypeIndex(Number(e.target.value))}
            >
              {PLANT_TYPES.map((t, i) => (
                <MenuItem key={t.label} value={i}>{t.label}{t.spacing > 0 ? ` (${t.spacing}in)` : ''}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {typeIndex === PLANT_TYPES.length - 1 && (
            <TextField
              label="Custom Spacing" type="number" value={customSpacing}
              onChange={(e) => setCustomSpacing(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Plants</Typography>
            <Typography variant="h3" fontWeight="bold">{result.totalPlants}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Plants Per Row</Typography>
            <Typography fontWeight={600}>{result.plantsPerRow}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Number of Rows</Typography>
            <Typography fontWeight={600}>{result.numberOfRows}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SeedSpacingCalculator;
