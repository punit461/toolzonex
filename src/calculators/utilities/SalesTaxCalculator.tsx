'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, MenuItem, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const STATE_RATES = [
  { name: 'Alabama', rate: 4 },
  { name: 'California', rate: 7.25 },
  { name: 'Colorado', rate: 2.9 },
  { name: 'Florida', rate: 6 },
  { name: 'Illinois', rate: 6.25 },
  { name: 'New York', rate: 4 },
  { name: 'Texas', rate: 6.25 },
  { name: 'Washington', rate: 6.5 },
];

const SalesTaxCalculator = () => {
  const [mode, setMode] = useState<'exclusive' | 'included'>('exclusive');
  const [amount, setAmount] = useState('100');
  const [rate, setRate] = useState('7.25');
  const [state, setState] = useState('California');

  const moneyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  const result = useMemo(() => {
    const r = parseFloat(rate) || 0;
    const pct = r / 100;
    const amt = parseFloat(amount) || 0;

    if (mode === 'exclusive') {
      const tax = amt * pct;
      return { base: amt, tax, total: amt + tax };
    } else {
      // tax included: back out the base
      const base = amt / (1 + pct);
      return { base, tax: amt - base, total: amt };
    }
  }, [mode, amount, rate]);

  const handleStateChange = (newState: string) => {
    setState(newState);
    const found = STATE_RATES.find((s) => s.name === newState);
    if (found) setRate(String(found.rate));
  };

  const content = (
    <>
      <Typography variant="h2">How is Sales Tax Calculated?</Typography>
      <Typography variant="body1">
        Sales tax is a percentage added to the price of goods and services. In the default "tax not included" mode, enter the pre-tax amount and the tax amount is computed as Amount × Rate. In "tax included" mode, enter the total you paid and the tool backs out the pre-tax base with Base = Total ÷ (1 + Rate).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Tax (not included) = Amount × Rate<br />
        Base (tax included) = Total ÷ (1 + Rate)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $100 purchase in California at 7.25%: tax = 100 × 0.0725 = $7.25, so the total is $107.25. If instead you paid $107.25 and want the pre-tax price, base = 107.25 ÷ 1.0725 = $100 and the tax portion is $7.25.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the final cost of an item including local sales tax.</li>
          <li>Working out how much of a receipt is tax versus product price.</li>
          <li>Building accurate cost estimates for purchases and budgets.</li>
          <li>Comparing effective tax rates across different states.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is the state rate the full tax I'll pay?</Typography>
      <Typography variant="body1">
        Not necessarily. Many cities, counties, and special districts add their own local sales tax on top of the state rate, and some states exempt certain goods (like groceries) or apply reduced rates. Check your local rate for a precise figure; the presets below are illustrative state-level examples.
      </Typography>
      <Typography variant="h3">How do I remove tax from a total?</Typography>
      <Typography variant="body1">
        Switch to "Tax included" mode and enter the total. The calculator divides by (1 + rate) to find the pre-tax base and shows the tax portion separately.
      </Typography>
      <Typography variant="h3">Is tax charged on shipping?</Typography>
      <Typography variant="body1">
        This varies by state and whether the carrier charges per-delivery fees. In many states shipping is taxable when the underlying goods are taxable. It's excluded from this simple calculation unless you add it into the amount.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/sales-tax-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Tax Mode</Typography>
            <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth>
              <ToggleButton value="exclusive">Tax Not Included</ToggleButton>
              <ToggleButton value="included">Tax Included</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <TextField
            label={mode === 'exclusive' ? 'Pre-Tax Amount' : 'Total (Tax Included)'}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            fullWidth
          />

          <TextField
            label="Tax Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            fullWidth
          />

          <TextField
            select
            label="Quick-Select State (example rates)"
            value={state}
            onChange={(e) => handleStateChange(e.target.value)}
            fullWidth
          >
            {STATE_RATES.map((s) => (
              <MenuItem key={s.name} value={s.name}>{s.name} — {s.rate}%</MenuItem>
            ))}
          </TextField>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total</Typography>
            <Typography variant="h3" fontWeight="bold">{moneyFmt.format(result.total)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Base Price</Typography>
            <Typography fontWeight={600}>{moneyFmt.format(result.base)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Tax Amount</Typography>
            <Typography fontWeight={600}>{moneyFmt.format(result.tax)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default SalesTaxCalculator;
