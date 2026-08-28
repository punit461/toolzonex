'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Button, ButtonGroup, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const presets = [
  { label: 'Low (10%)', rate: 10 },
  { label: 'Normal (15%)', rate: 15 },
  { label: 'High (20%)', rate: 20 },
];

const CarDepreciationCalculator = () => {
  const [price, setPrice] = useState('30000');
  const [years, setYears] = useState('5');
  const [annualRate, setAnnualRate] = useState('15');
  const [sellingYear, setSellingYear] = useState('3');

  const result = useMemo(() => {
    const p = parseFloat(price) || 0;
    const y = Math.max(1, Math.min(30, parseInt(years) || 5));
    const r = (parseFloat(annualRate) || 15) / 100;
    const sy = Math.max(1, Math.min(y, parseInt(sellingYear) || 3));

    const yearValues: { year: number; value: number; lost: number }[] = [];
    let remaining = p;
    for (let i = 1; i <= y; i++) {
      const lost = remaining * r;
      remaining -= lost;
      if (remaining < 0) remaining = 0;
      yearValues.push({ year: i, value: remaining, lost });
    }

    const sellingValue = yearValues[sy - 1]?.value ?? 0;
    const totalDepreciation = p - sellingValue;
    const pctDepreciated = p > 0 ? (totalDepreciation / p) * 100 : 0;

    return { yearValues, sellingValue, totalDepreciation, pctDepreciated, yearsCount: y, sellingYearNum: sy };
  }, [price, years, annualRate, sellingYear]);

  const content = (
    <>
      <Typography variant="h2">How is Car Depreciation Calculated?</Typography>
      <Typography variant="body1">
        Car depreciation is calculated using the declining balance method: each year, the car loses a fixed percentage of its current value. The formula is: Value = Purchase Price × (1 - Rate)^Years.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Value = Price × (1 - Rate)^Years
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $30,000 car depreciating at 15% per year is worth about $25,500 after year 1, $21,675 after year 2, and $18,424 after year 3. After 5 years it's worth roughly $13,294 — a total loss of about $16,706.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating your car's current market value for selling or trading in.</li>
          <li>Understanding how quickly a new vehicle loses value.</li>
          <li>Planning the optimal time to sell or trade in a vehicle.</li>
          <li>Comparing depreciation rates across different vehicle types.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the average depreciation rate for a car?</Typography>
      <Typography variant="body1">
        Most cars lose about 15–20% of their value per year, with the steepest drop in the first year. Luxury and high-mileage vehicles may depreciate faster, while some trucks and SUVs hold value better.
      </Typography>
      <Typography variant="h3">Does mileage affect depreciation?</Typography>
      <Typography variant="body1">
        Yes — higher mileage accelerates depreciation. A car driven 20,000 miles per year will lose value faster than one driven 10,000 miles, even if both are the same age.
      </Typography>
      <Typography variant="h3">Can a car appreciate in value?</Typography>
      <Typography variant="body1">
        Most cars depreciate, but certain classic, limited-edition, or rare models can appreciate over time. Supply chain disruptions and market conditions can also temporarily boost used car values.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/car-depreciation-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Purchase Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Years Owned" type="number" value={years} onChange={(e) => setYears(e.target.value)} fullWidth />
          <TextField label="Annual Depreciation Rate" type="number" value={annualRate} onChange={(e) => setAnnualRate(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Rate Presets</Typography>
            <ButtonGroup fullWidth>
              {presets.map((p) => (
                <Button key={p.rate} variant={parseFloat(annualRate) === p.rate ? 'contained' : 'outlined'} onClick={() => setAnnualRate(String(p.rate))}>
                  {p.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          <TextField label="Selling Year" type="number" value={sellingYear} onChange={(e) => setSellingYear(e.target.value)} helperText={`Enter 1 to ${result.yearsCount}`} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Value at Year {result.sellingYearNum}</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.sellingValue)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Depreciation</Typography>
            <Typography fontWeight={600}>{fmt(result.totalDepreciation)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Depreciation %</Typography>
            <Typography fontWeight={600}>{result.pctDepreciated.toFixed(1)}%</Typography>
          </Paper>

          <Typography variant="subtitle2" fontWeight={600} mb={1}>Year-by-Year Values</Typography>
          <Paper sx={{ p: 2 }}>
            {result.yearValues.map((row) => (
              <Box key={row.year} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: row.year < result.yearsCount ? '1px solid' : 'none', borderColor: 'divider' }}>
                <Typography variant="body2">Year {row.year}</Typography>
                <Typography variant="body2" fontWeight={600}>{fmt(row.value)}</Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default CarDepreciationCalculator;
