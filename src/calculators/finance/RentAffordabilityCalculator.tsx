'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const RentAffordabilityCalculatorContent = () => {
  const [income, setIncome] = useState('6000');
  const [pct, setPct] = useState('30');

  const result = useMemo(() => {
    const i = parseFloat(income) || 0;
    const p = parseFloat(pct) || 0;
    const maxRent = i * (p / 100);
    const strictMaxRent = i * 0.25;
    return { maxRent, strictMaxRent };
  }, [income, pct]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Monthly Gross Income"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Rent-to-Income Guideline"
          type="number"
          value={pct}
          onChange={(e) => setPct(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="The standard guideline is 30% of gross income"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Recommended Max Rent</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.maxRent)}</Typography>
          <Typography variant="caption">per month, at {pct || 0}% of income</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Stricter Guideline (25%)</Typography>
          <Typography fontWeight={600}>{money(result.strictMaxRent)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const RentAffordabilityCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Rent Affordability Calculator Works</Typography>
      <Typography variant="body1">
        Enter your monthly gross (pre-tax) income, and this calculator applies the widely used &quot;30% rule&quot;
        — recommending that rent not exceed 30% of gross income — to suggest a maximum comfortable rent. The
        percentage is adjustable, so you can see how a stricter or more relaxed guideline changes the
        recommended figure.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Max Rent = Monthly Gross Income × Guideline %
      </Box>
      <Typography variant="body1">
        A stricter alternative some financial planners recommend is capping rent at 25% of gross income,
        leaving more room in the budget for savings, debt payments, and other fixed costs — shown alongside
        the standard 30% figure above.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a monthly gross income of $6,000, the standard 30% guideline suggests a maximum rent of $1,800 per
        month, while the stricter 25% guideline suggests $1,500 per month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a budget ceiling before starting an apartment search.</li>
          <li>Checking whether a listed rental fits comfortably within your income.</li>
          <li>Comparing how a raise or income change shifts what you can afford.</li>
          <li>Explaining to a landlord or co-signer why a unit is or isn&apos;t affordable for you.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why 30% of income specifically?</Typography>
      <Typography variant="body1">
        The 30% guideline traces back to US federal housing policy from the 1980s, which defined
        &quot;cost-burdened&quot; households as those spending more than 30% of income on housing. It has since
        become a common budgeting rule of thumb, though it&apos;s a general guideline rather than a strict
        limit tailored to your full financial picture.
      </Typography>
      <Typography variant="h3">Should I use gross income or take-home pay?</Typography>
      <Typography variant="body1">
        This calculator uses gross (pre-tax) income, matching how the 30% guideline and most landlords
        calculate rent-to-income ratios. Since your actual spendable income is lower after taxes, some renters
        prefer to budget more conservatively than the guideline suggests.
      </Typography>
      <Typography variant="h3">Does this account for other debts or expenses?</Typography>
      <Typography variant="body1">
        No — this is a simple rent-to-income guideline based on income alone. If you carry significant debt
        payments or other large fixed costs, you may want to budget for a lower rent than either figure shown
        here to keep your overall finances comfortable.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/rent-affordability-calculator" content={content}>
      <RentAffordabilityCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RentAffordabilityCalculator;
