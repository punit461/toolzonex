'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const FREQ: Record<string, number> = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

const FutureValueCalculator = () => {
  const [pv, setPv] = useState<string>('10000');
  const [rate, setRate] = useState<string>('8');
  const [years, setYears] = useState<string>('10');
  const [freq, setFreq] = useState<string>('12');
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const { fv, interest } = useMemo(() => {
    const p = parseFloat(pv) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = FREQ[freq] ?? 1;
    const value = p * Math.pow(1 + r / n, n * t);
    return { fv: value, interest: value - p };
  }, [pv, rate, years, freq]);

  const content = (
    <>
      <Typography variant="h2">What is a future value calculator?</Typography>
      <Typography variant="body1">
        A future value calculator projects how much a lump-sum investment grows over time with compound
        interest. It uses the standard compounding formula so you can compare different rates and
        compounding frequencies.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        FV = PV × (1 + r/n)^(n × t)
        <br />
        Interest = FV − PV
      </Box>
      <Typography variant="body1">
        Where <strong>PV</strong> is present value, <strong>r</strong> is the annual rate, <strong>n</strong>{' '}
        is compounding per year, and <strong>t</strong> is years.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Investing ₹10,000 at 8% compounded monthly for 10 years grows to about ₹22,196, earning roughly
        ₹12,196 in interest.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Projecting growth of a fixed lump-sum investment.</li>
          <li>Comparing monthly vs. annual compounding returns.</li>
          <li>Setting long-term savings goals.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does more frequent compounding really help?</Typography>
      <Typography variant="body1">
        At the same nominal rate, more frequent compounding yields a slightly higher future value, though
        the difference shrinks as frequency increases.
      </Typography>
      <Typography variant="h3">Is this the same as a SIP calculator?</Typography>
      <Typography variant="body1">
        No — this models a single lump sum. For recurring monthly contributions, use a SIP calculator.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/future-value-calculator" content={content}>
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
            label="Present Value"
            type="number"
            value={pv}
            onChange={(e) => setPv(e.target.value)}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment> } }}
            fullWidth
          />
          <TextField
            label="Annual Interest Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            fullWidth
          />
          <TextField
            label="Years"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">Yr</InputAdornment> } }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="fv-freq">Compounding Frequency</InputLabel>
            <Select labelId="fv-freq" label="Compounding Frequency" value={freq} onChange={(e) => setFreq(e.target.value)}>
              <MenuItem value="annually">Annually</MenuItem>
              <MenuItem value="semiannually">Semi-annually</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Result
          </Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Future Value</Typography>
            <Typography variant="h3" fontWeight="bold">{formatMoney(Math.round(fv), currency)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total Interest</Typography>
            <Typography variant="h6" fontWeight="bold">{formatMoney(Math.round(interest), currency)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default FutureValueCalculator;
