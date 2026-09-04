'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type AreaUnit = 'sqft' | 'sqm';

const SQFT_PER_SQM = 10.7639;
const LB_PER_KG = 0.453592;

const FertilizerCalculatorContent = () => {
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('sqft');
  const [area, setArea] = useState<string>('5000');
  const [rate, setRate] = useState<string>('3');

  const result = useMemo(() => {
    const a = parseFloat(area);
    const r = parseFloat(rate);
    if (Number.isNaN(a) || Number.isNaN(r) || a <= 0 || r <= 0) return null;

    const areaSqft = areaUnit === 'sqft' ? a : a * SQFT_PER_SQM;
    const totalLb = (areaSqft / 1000) * r;
    const totalKg = totalLb * LB_PER_KG;
    return { totalLb, totalKg, areaSqft };
  }, [area, rate, areaUnit]);

  const handleUnitChange = (_: React.MouseEvent<HTMLElement>, val: AreaUnit | null) => {
    if (val) setAreaUnit(val);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ToggleButtonGroup value={areaUnit} exclusive onChange={handleUnitChange} fullWidth>
        <ToggleButton value="sqft">Square Feet</ToggleButton>
        <ToggleButton value="sqm">Square Meters</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label={`Lawn / Garden Area (${areaUnit === 'sqft' ? 'sq ft' : 'm²'})`}
            type="number"
            fullWidth
            value={area}
            onChange={(e) => setArea(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <TextField
            label="Application Rate (lbs per 1,000 sq ft)"
            type="number"
            fullWidth
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            onFocus={(e) => e.target.select()}
            helperText="Find this number on your fertilizer bag's label — it's the recommended amount per 1,000 sq ft of coverage."
          />
        </Box>

        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
          {result ? (
            <>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Fertilizer Needed</Typography>
                <Typography variant="h4" fontWeight={800} color="primary.main">{result.totalLb.toFixed(2)} lbs</Typography>
                <Typography variant="body2" color="text.secondary">{result.totalKg.toFixed(2)} kg</Typography>
              </Paper>
              <Typography variant="caption" color="text.secondary" textAlign="center">
                Based on {result.areaSqft.toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft of coverage area.
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center">Enter a positive area and application rate to calculate</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const FertilizerCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Calculate How Much Fertilizer You Need</Typography>
      <Typography variant="body1">
        Fertilizer bags list an application rate as pounds per 1,000 square feet of coverage — a common
        convention across lawn and garden products. This calculator scales that rate to your actual area, so
        you know exactly how much product to buy or spread.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Fertilizer Needed (lbs) = (Area in sq ft ÷ 1,000) × Application Rate (lbs per 1,000 sq ft)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5,000 sq ft lawn with a fertilizer labeled for 3 lbs per 1,000 sq ft needs (5,000 ÷ 1,000) × 3 = 15
        lbs of fertilizer total, which is about 6.8 kg. A smaller 1,200 sq ft garden bed at the same rate needs
        (1,200 ÷ 1,000) × 3 = 3.6 lbs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out how many bags of lawn fertilizer to buy before a seasonal application.</li>
          <li>Calculating fertilizer needs for a new garden bed or vegetable patch based on the product label's rate.</li>
          <li>Comparing how much product two different fertilizer brands would require for the same lawn.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where do I find the application rate for my fertilizer?</Typography>
      <Typography variant="body1">
        It's printed on the product's label or bag, usually phrased as something like "apply 3 lbs per 1,000 sq
        ft" — enter that number directly into the calculator's application rate field.
      </Typography>
      <Typography variant="h3">Does this account for nitrogen (N), phosphorus (P), or potassium (K) percentages separately?</Typography>
      <Typography variant="body1">
        No — this calculator works from the bag's overall recommended application rate (lbs of product per
        1,000 sq ft), which the manufacturer has already calculated to deliver the right amount of N-P-K for
        your area at that dose. It doesn't recompute nutrient percentages independently.
      </Typography>
      <Typography variant="h3">Should I split the total amount into multiple applications?</Typography>
      <Typography variant="body1">
        Many fertilizer programs recommend splitting the season's total fertilizer across 2-4 applications
        rather than applying it all at once — check your specific product's label or a regional lawn care guide
        for a recommended schedule.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fertilizer-calculator" content={content}>
      <FertilizerCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FertilizerCalculator;
