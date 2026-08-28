'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const TAX_RATE = 0.1;

const BonusCalculator = () => {
  const [ctc, setCtc] = useState<string>('1000000');
  const [bonusPct, setBonusPct] = useState<string>('10');
  const [multiplier, setMultiplier] = useState<string>('1');
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const { gross, tax, net } = useMemo(() => {
    const c = parseFloat(ctc) || 0;
    const pct = parseFloat(bonusPct) || 0;
    const mult = parseFloat(multiplier) || 0;
    const g = c * (pct / 100) * mult;
    const t = g * TAX_RATE;
    return { gross: g, tax: t, net: g - t };
  }, [ctc, bonusPct, multiplier]);

  const content = (
    <>
      <Typography variant="h2">What is a bonus calculator?</Typography>
      <Typography variant="body1">
        A bonus calculator works out your performance bonus from your annual CTC, the bonus percentage
        offered by your employer, and a performance-rating multiplier. It then applies a flat 10% tax (as
        per Indian norms used here) to show your net take-home bonus.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Bonus = CTC × (bonus% ÷ 100) × multiplier
        <br />
        Tax = Bonus × 10%
        <br />
        Net Bonus = Bonus − Tax
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a ₹10,00,000 CTC, a 10% bonus, and a 1.0 multiplier, the gross bonus is ₹1,00,000. A 10% tax of
        ₹10,000 leaves a net bonus of ₹90,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating annual performance bonuses at review time.</li>
          <li>Comparing offer letters with different bonus structures.</li>
          <li>Planning savings around expected net bonus payouts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is tax shown as flat 10%?</Typography>
      <Typography variant="body1">
        This tool applies a flat 10% to keep the estimate simple. Actual bonus taxation depends on your
        total income slab and applicable cess, so consult a tax professional for exact figures.
      </Typography>
      <Typography variant="h3">What does the performance multiplier do?</Typography>
      <Typography variant="body1">
        Employers often scale a base bonus by a rating (e.g. 1.2 for &quot;exceeds expectations&quot;). A
        multiplier of 1.0 means the full stated bonus percentage applies.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/bonus-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom>Currency</Typography>
            <Select
              size="small"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              sx={{ minWidth: 110 }}
            >
              {CURRENCIES.map((c) => (
                <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>
              ))}
            </Select>
          </Box>
          <TextField
            label="Annual CTC"
            type="number"
            value={ctc}
            onChange={(e) => setCtc(e.target.value)}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment> } }}
            fullWidth
          />
          <TextField
            label="Bonus Percentage"
            type="number"
            value={bonusPct}
            onChange={(e) => setBonusPct(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            fullWidth
          />
          <TextField
            label="Performance Multiplier"
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">×</InputAdornment> } }}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Result
          </Typography>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Gross Bonus</Typography>
            <Typography variant="h6" fontWeight="bold">{formatMoney(Math.round(gross), currency)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Tax (10%)</Typography>
            <Typography variant="h6" fontWeight="bold">{formatMoney(Math.round(tax), currency)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Net Bonus</Typography>
            <Typography variant="h6" fontWeight="bold">{formatMoney(Math.round(net), currency)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default BonusCalculator;
