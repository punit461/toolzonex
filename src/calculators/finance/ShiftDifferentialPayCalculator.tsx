'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

type DiffType = 'percent' | 'flat';

const ShiftDifferentialPayCalculator = () => {
  const [baseRate, setBaseRate] = useState('20');
  const [hours, setHours] = useState('8');
  const [diffType, setDiffType] = useState<DiffType>('percent');
  const [diffPercent, setDiffPercent] = useState('10');
  const [diffFlat, setDiffFlat] = useState('2');

  const result = useMemo(() => {
    const rate = parseFloat(baseRate) || 0;
    const h = parseFloat(hours) || 0;
    let effectiveRate: number;
    if (diffType === 'percent') {
      const pct = parseFloat(diffPercent) || 0;
      effectiveRate = rate * (1 + pct / 100);
    } else {
      const flat = parseFloat(diffFlat) || 0;
      effectiveRate = rate + flat;
    }
    const totalPay = effectiveRate * h;
    const differentialPay = totalPay - rate * h;
    return { effectiveRate, totalPay, differentialPay };
  }, [baseRate, hours, diffType, diffPercent, diffFlat]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Shift Differential Pay Calculator</Typography>
      <Typography variant="body1">
        Enter your base hourly rate and the hours worked on a differential shift (evening, night, weekend, or
        holiday), then choose how your differential is structured: a percentage add-on (like 10% for evenings
        or 15% for weekends) or a flat dollar amount added per hour. The calculator applies your chosen
        differential to the base rate and multiplies by hours worked to get total pay for that shift.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Pay (% differential) = Base Rate × (1 + Differential%) × Hours
        <br />
        Total Pay (flat differential) = (Base Rate + Flat Add-On) × Hours
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At a $20/hr base rate with a 10% evening differential over an 8-hour shift, the effective rate is
        $22/hr, for a total shift pay of $176 — $16 more than the $160 the same 8 hours would pay at the base
        rate alone.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating pay for evening, night, weekend, or holiday shifts with a flat premium.</li>
          <li>Comparing take-home pay between a percentage differential and a flat dollar differential.</li>
          <li>Payroll and scheduling teams estimating shift premium costs in advance.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What's a typical shift differential percentage?</strong> Common ranges are around 5-10% for evening shifts and 10-20% for night, weekend, or holiday shifts, though this varies widely by employer, industry, and union agreements. Check your employer's specific policy.</li>
          <li><strong>Should I use a percentage or a flat dollar differential?</strong> Either is valid — percentage differentials scale automatically with base pay raises, while flat dollar differentials stay fixed regardless of base rate. Use whichever structure matches your employer's actual pay policy.</li>
          <li><strong>Does this account for overtime rules on top of the differential?</strong> No — this calculates straight differential pay for the hours entered only. If differential hours also qualify as overtime, calculate the overtime premium separately using the Overtime Pay Calculator.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/shift-differential-pay-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Base Hourly Rate" type="number" value={baseRate} onChange={(e) => setBaseRate(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Hours Worked on Differential Shift" type="number" value={hours} onChange={(e) => setHours(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
          <ToggleButtonGroup value={diffType} exclusive onChange={(_, v) => v && setDiffType(v)} fullWidth>
            <ToggleButton value="percent">% Add-On</ToggleButton>
            <ToggleButton value="flat">$ Flat Add-On</ToggleButton>
          </ToggleButtonGroup>
          {diffType === 'percent' ? (
            <TextField
              label="Differential Percentage" type="number" value={diffPercent} onChange={(e) => setDiffPercent(e.target.value)} fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          ) : (
            <TextField
              label="Flat Differential Add-On (per hour)" type="number" value={diffFlat} onChange={(e) => setDiffFlat(e.target.value)} fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Shift Pay</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.totalPay)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Effective Hourly Rate</Typography>
            <Typography fontWeight={600}>{money(result.effectiveRate)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Differential Pay (Above Base)</Typography>
            <Typography fontWeight={600}>{money(result.differentialPay)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ShiftDifferentialPayCalculator;
