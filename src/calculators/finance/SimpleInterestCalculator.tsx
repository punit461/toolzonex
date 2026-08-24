'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(8);
  const [years, setYears] = useState<number>(5);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const { interest, totalAmount } = useMemo(() => {
    const si = (principal * rate * years) / 100;
    return {
      interest: Math.round(si),
      totalAmount: Math.round(principal + si),
    };
  }, [principal, rate, years]);

  const content = (
    <>
      <Typography variant="h2">What is simple interest?</Typography>
      <Typography variant="body1">
        Simple interest is calculated only on the original principal amount, for the entire duration of the
        loan or investment — unlike compound interest, it never earns &quot;interest on interest&quot; along the
        way. It&apos;s commonly used for short-term loans, certain fixed deposits, and some auto loans.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Simple Interest (I) = P × R × T ÷ 100
        <br />
        Total Amount (A) = P + I = P × (1 + R×T/100)
      </Box>
      <Typography variant="body1">
        Where <strong>P</strong> is the principal, <strong>R</strong> is the annual interest rate (%), and{' '}
        <strong>T</strong> is the time period in years.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A principal of ₹1,00,000 at 8% annual simple interest for 5 years earns ₹40,000 in interest, for a total
        maturity amount of ₹1,40,000 — the interest amount stays the same every year, since it&apos;s always
        calculated on the original ₹1,00,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating interest on short-term personal loans that don&apos;t compound.</li>
          <li>Working out returns on simple-interest fixed deposits or bonds.</li>
          <li>Quickly estimating interest without needing a compounding frequency.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between simple and compound interest?</Typography>
      <Typography variant="body1">
        Simple interest is always calculated on the original principal only, so it grows linearly year over
        year. Compound interest is recalculated on the principal <em>plus</em> previously earned interest, so it
        grows faster over time. For compounding investments, use the{' '}
        <a href="/finance/compound-interest-calculator">Compound Interest Calculator</a> instead.
      </Typography>
      <Typography variant="h3">Does the interest amount change every year with simple interest?</Typography>
      <Typography variant="body1">
        No — because simple interest is always calculated on the same original principal, the interest earned
        (or owed) each year is identical, unlike compound interest where it increases annually.
      </Typography>
      <Typography variant="h3">Where is simple interest actually used?</Typography>
      <Typography variant="body1">
        It&apos;s common in short-term loans, certain government bonds, some auto and consumer loans, and a few
        types of fixed deposits — anywhere a lender wants a simpler, more predictable interest structure than
        compounding.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/simple-interest-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom>Principal Amount</Typography>
              <Select
                size="small"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                sx={{ minWidth: 110, mb: 1 }}
              >
                {CURRENCIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>
                ))}
              </Select>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(principal) ? '' : principal}
              onChange={(e) => setPrincipal(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(principal) ? 0 : principal}
              min={1000}
              max={5000000}
              step={1000}
              onChange={(_, value) => setPrincipal(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Annual Interest Rate (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(rate) ? '' : rate}
              onChange={(e) => setRate(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(rate) ? 0 : rate}
              min={1}
              max={20}
              step={0.5}
              onChange={(_, value) => setRate(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Time Period (Years)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(years) ? '' : years}
              onChange={(e) => setYears(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">Yr</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(years) ? 0 : years}
              min={1}
              max={30}
              step={1}
              onChange={(_, value) => setYears(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Total Amount</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(totalAmount, currency)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Principal</Typography>
                <Typography variant="h6">{formatMoney(principal, currency)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Interest Earned</Typography>
                <Typography variant="h6">{formatMoney(interest, currency)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SimpleInterestCalculator;
