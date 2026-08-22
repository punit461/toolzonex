'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, MenuItem, Select } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from './currencyConfig';

const FREQUENCIES = [
  { label: 'Annually', value: 1 },
  { label: 'Semi-Annually', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 },
];

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [rate, setRate] = useState<number>(10);
  const [years, setYears] = useState<number>(10);
  const [frequency, setFrequency] = useState<number>(1);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const { totalValue, totalInterest, chartData } = useMemo(() => {
    const data = [];
    for (let year = 1; year <= years; year++) {
      const value = principal * Math.pow(1 + rate / 100 / frequency, frequency * year);
      data.push({
        year: `Year ${year}`,
        Principal: Math.round(principal),
        Interest: Math.round(value - principal),
      });
    }

    const finalValue = principal * Math.pow(1 + rate / 100 / frequency, frequency * years);

    return {
      totalValue: Math.round(finalValue),
      totalInterest: Math.round(finalValue - principal),
      chartData: data,
    };
  }, [principal, rate, years, frequency]);

  const content = (
    <>
      <Typography variant="h2">What is compound interest?</Typography>
      <Typography variant="body1">
        Compound interest is interest calculated on both the original principal and the interest already
        accumulated from previous periods — often summarized as &quot;earning interest on interest.&quot; The
        more frequently interest compounds (daily vs. annually, for example), the faster the balance grows for
        the same nominal rate.
      </Typography>

      <Typography variant="h2">The power of compounding</Typography>
      <Typography variant="body1">
        Because each period&apos;s interest gets added back to the principal, growth accelerates over time
        rather than staying flat — the effect becomes dramatic over long horizons like 15-30 years, which is why
        starting early matters more than the exact amount invested.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        A = P × (1 + r/n)<sup>n×t</sup>
        <br />
        P = principal, r = annual rate, n = compounds per year, t = years
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        ₹1,00,000 invested at 10% annual interest, compounded annually for 10 years, grows to roughly ₹2,59,374
        — of which ₹1,59,374 is compounded interest, more than the original principal itself.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Projecting how a fixed deposit or lump-sum investment grows over time.</li>
          <li>Comparing how compounding frequency (annual vs. monthly vs. daily) changes the final amount.</li>
          <li>Understanding why starting to invest early has an outsized long-term effect.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does compounding frequency really make a big difference?</Typography>
      <Typography variant="body1">
        At the same nominal rate, more frequent compounding (e.g. monthly vs. annually) produces a slightly
        higher return, but the difference is modest — the bigger levers are the rate itself and how long the
        money stays invested.
      </Typography>
      <Typography variant="h3">Is this the same as a SIP calculator?</Typography>
      <Typography variant="body1">
        No — this tool models a single lump-sum investment. For regular monthly contributions, use the{' '}
        <a href="/finance/sip-calculator">SIP Calculator</a> instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Compound Interest Calculator"
      description="Calculate how a lump-sum investment grows with the power of compounding, at any compounding frequency."
      url="/finance/compound-interest-calculator"
      content={content}
      category="Finance"
    >
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
              max={30}
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
              max={40}
              step={1}
              onChange={(_, value) => setYears(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Compounding Frequency</Typography>
            <Select
              fullWidth
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
            >
              {FREQUENCIES.map((f) => (
                <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Total Value</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(totalValue, currency)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Principal</Typography>
                <Typography variant="h6">{formatMoney(principal, currency)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Interest Earned</Typography>
                <Typography variant="h6">{formatMoney(totalInterest, currency)}</Typography>
              </Box>
            </Box>

            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="year" hide />
                  <YAxis hide />
                  <RechartsTooltip formatter={(value: any) => formatMoney(value, currency)} />
                  <Legend />
                  <Bar dataKey="Principal" stackId="a" fill="#171717" />
                  <Bar dataKey="Interest" stackId="a" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CompoundInterestCalculator;
