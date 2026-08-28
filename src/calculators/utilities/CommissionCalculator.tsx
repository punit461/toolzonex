'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const CommissionCalculator = () => {
  const [saleAmount, setSaleAmount] = useState('100000');
  const [commissionRate, setCommissionRate] = useState('10');
  const [splitPct, setSplitPct] = useState('70');

  const result = useMemo(() => {
    const amount = parseFloat(saleAmount) || 0;
    const rate = (parseFloat(commissionRate) || 0) / 100;
    const split = (parseFloat(splitPct) || 70) / 100;

    const baseCommission = amount * rate;
    const salesperson = baseCommission * split;
    const company = baseCommission - salesperson;

    return { baseCommission, salesperson, company, splitPctValue: parseFloat(splitPct) || 70, companyPct: 100 - (parseFloat(splitPct) || 70) };
  }, [saleAmount, commissionRate, splitPct]);

  const content = (
    <>
      <Typography variant="h2">How is Commission Calculated?</Typography>
      <Typography variant="body1">
        Sales commission is calculated by multiplying the sale amount by the commission rate, then splitting the total commission between the salesperson and the company based on the agreed split percentage.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Commission = Sale Amount × Commission Rate<br />
        Salesperson Share = Commission × Split %
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        On a $100,000 sale with a 10% commission rate and a 70/30 split, the total commission is $10,000. The salesperson earns $7,000 and the company retains $3,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating real estate agent commissions on home sales.</li>
          <li>Splitting sales team commissions between reps and managers.</li>
          <li>Estimating take-home commission for independent sales reps.</li>
          <li>Planning revenue projections for commission-based businesses.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a typical commission split?</Typography>
      <Typography variant="body1">
        Commission splits vary widely by industry. In real estate, a common split is 50/50 to 70/30 favoring the agent. In SaaS sales, the split is often 50/50 or tiered based on quota attainment.
      </Typography>
      <Typography variant="h3">Is commission calculated on gross or net revenue?</Typography>
      <Typography variant="body1">
        It depends on the agreement. Some companies calculate commission on gross revenue (before discounts/returns), while others use net revenue. Always clarify the base before calculating.
      </Typography>
      <Typography variant="h3">Do commission rates change based on deal size?</Typography>
      <Typography variant="body1">
        Many companies use tiered commission rates where larger deals earn a higher percentage. For example, 5% on deals under $50K, 7% on deals $50K–$200K, and 10% on deals over $200K.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/commission-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Sale / Revenue Amount" type="number" value={saleAmount} onChange={(e) => setSaleAmount(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Commission Rate" type="number" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Salesperson Split: {splitPct}%</Typography>
            <Slider value={parseFloat(splitPct) || 70} onChange={(_, v) => setSplitPct(String(v))} min={0} max={100} valueLabelDisplay="auto" valueLabelFormat={(v) => `${v}%`} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">Company {100 - (parseFloat(splitPct) || 70)}%</Typography>
              <Typography variant="caption" color="text.secondary">Salesperson {splitPct}%</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Commission</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.baseCommission)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Salesperson ({result.splitPctValue}%)</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(result.salesperson)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Company ({result.companyPct}%)</Typography>
            <Typography fontWeight={600} color="info.main">{fmt(result.company)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default CommissionCalculator;
