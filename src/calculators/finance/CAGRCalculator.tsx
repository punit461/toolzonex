'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const CAGRCalculator = () => {
  const [initialValue, setInitialValue] = useState<number>(100000);
  const [finalValue, setFinalValue] = useState<number>(250000);
  const [years, setYears] = useState<number>(5);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const { cagr, absoluteGrowth } = useMemo(() => {
    if (initialValue <= 0 || years <= 0) {
      return { cagr: 0, absoluteGrowth: 0 };
    }
    const rate = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    const growth = ((finalValue - initialValue) / initialValue) * 100;
    return { cagr: rate, absoluteGrowth: growth };
  }, [initialValue, finalValue, years]);

  const content = (
    <>
      <Typography variant="h2">What is CAGR?</Typography>
      <Typography variant="body1">
        CAGR (Compound Annual Growth Rate) is the smoothed, year-over-year growth rate that would take an
        investment from its initial value to its final value over a given period, <em>assuming</em> it compounded
        steadily every year. It&apos;s the standard way to compare returns across investments with different
        holding periods, since it strips out the lumpy, real-world ups and downs into a single annualized number.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CAGR = [(Final Value ÷ Initial Value)<sup>1/Years</sup> − 1] × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An investment that grows from ₹1,00,000 to ₹2,50,000 over 5 years has a CAGR of about 20.1% — meaning it
        behaved, on average, as if it grew 20.1% every single year, even though actual year-to-year returns were
        almost certainly uneven.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing the annualized return of a mutual fund, stock, or business over several years.</li>
          <li>Standardizing returns across investments held for different lengths of time.</li>
          <li>Projecting a rough future value if you assume the same growth rate continues.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is CAGR the same as the actual annual return each year?</Typography>
      <Typography variant="body1">
        No — CAGR is a smoothed average. The actual value may have risen sharply one year and fallen the next;
        CAGR only tells you the equivalent steady rate that connects the start and end points, not what happened
        in between.
      </Typography>
      <Typography variant="h3">How is CAGR different from absolute (total) return?</Typography>
      <Typography variant="body1">
        Absolute return is the total percentage gain over the entire period, regardless of how long it took.
        CAGR annualizes that gain, which makes it possible to fairly compare, say, a 50% return over 3 years
        against a 50% return over 8 years — the shorter period has the higher CAGR.
      </Typography>
      <Typography variant="h3">Can CAGR be negative?</Typography>
      <Typography variant="body1">
        Yes — if the final value is lower than the initial value, CAGR comes out negative, representing the
        annualized rate of decline over the period.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/cagr-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom>Initial Value</Typography>
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
              value={Number.isNaN(initialValue) ? '' : initialValue}
              onChange={(e) => setInitialValue(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Final Value</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(finalValue) ? '' : finalValue}
              onChange={(e) => setFinalValue(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Number of Years</Typography>
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
            <Typography variant="h6" color="text.secondary">CAGR</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {cagr.toFixed(2)}%
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Growth</Typography>
                <Typography variant="h6">{absoluteGrowth.toFixed(1)}%</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Growth in Value</Typography>
                <Typography variant="h6">{formatMoney(finalValue - initialValue, currency)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CAGRCalculator;
