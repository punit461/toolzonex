'use client';

import { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const compactTick = (value: number, currency: CurrencyCode): string => {
  const symbol = currencySymbol(currency);
  if (currency === 'INR') return `₹${(value / 100000).toFixed(0)}L`;
  if (value >= 1000000) return `${symbol}${(value / 1000000).toFixed(1)}M`;
  return `${symbol}${(value / 1000).toFixed(0)}K`;
};

const SalaryIncrementCalculator = () => {
  const [currentCTC, setCurrentCTC] = useState<number>(1000000);
  const [incrementPercent, setIncrementPercent] = useState<number>(10);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { newCTC, incrementAmount, monthlyIncrease, newMonthlyCTC } = useMemo(() => {
    const incAmount = (currentCTC * incrementPercent) / 100;
    const totalNew = currentCTC + incAmount;
    
    return {
      newCTC: totalNew,
      incrementAmount: incAmount,
      monthlyIncrease: incAmount / 12,
      newMonthlyCTC: totalNew / 12,
    };
  }, [currentCTC, incrementPercent]);

  const chartData = [
    {
      name: 'Salary Breakdown',
      'Current CTC': currentCTC,
      'Increment Amount': incrementAmount,
    }
  ];

  const content = (
    <>
      <Typography variant="h2">How is Salary Increment Calculated?</Typography>
      <Typography variant="body1">
        Your new salary is calculated by adding the increment percentage to your current CTC.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace' }}>
        Increment Amount = Current CTC × (Increment % / 100)
        <br />
        New CTC = Current CTC + Increment Amount
      </Box>
      <Typography variant="body1">
        <strong>Note:</strong> This calculator provides the gross CTC impact. Your actual take-home salary will vary based on tax deductions (TDS), PF contributions, and your company's salary structure.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A current CTC of ₹8,00,000 with a 15% increment gets an increment amount of ₹1,20,000, bringing the
        new CTC to ₹9,20,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking how a percentage raise translates to your actual new CTC.</li>
          <li>Comparing offer letters or appraisal increments across different percentages.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I use this as a CTC increment calculator?</Typography>
      <Typography variant="body1">
        Enter your current CTC and the increment percentage you were offered — the calculator multiplies your
        current CTC by that percentage to get the increment amount, then adds it back to show your new CTC and
        its monthly equivalent, exactly as used above.
      </Typography>
      <Typography variant="h3">How is increment percentage on CTC calculated?</Typography>
      <Typography variant="body1">
        Increment percentage = (New CTC − Current CTC) ÷ Current CTC × 100. If you already know your old and new
        CTC and want the percentage rather than the new amount, subtract the two figures, divide by the old CTC,
        and multiply by 100.
      </Typography>
      <Typography variant="h3">Is CTC the same as my take-home salary?</Typography>
      <Typography variant="body1">
        No — CTC (Cost to Company) includes your gross salary plus employer contributions like PF and
        insurance. Your actual take-home pay is lower after tax and employee-side deductions.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/finance/salary-increment-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom>Current CTC (/ Year)</Typography>
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
              value={Number.isNaN(currentCTC) ? '' : currentCTC}
              onChange={(e) => setCurrentCTC(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(currentCTC) ? 0 : currentCTC}
              min={100000}
              max={10000000}
              step={100000}
              onChange={(_, value) => setCurrentCTC(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Expected Increment (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(incrementPercent) ? '' : incrementPercent}
              onChange={(e) => setIncrementPercent(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(incrementPercent) ? 0 : incrementPercent}
              min={0}
              max={100}
              step={1}
              onChange={(_, value) => setIncrementPercent(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">New CTC</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(newCTC, currency)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Increment Amount</Typography>
                <Typography variant="h6" color="success.main">+ {formatMoney(incrementAmount, currency)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Monthly Increase</Typography>
                <Typography variant="h6" color="success.main">+ {formatMoney(monthlyIncrease, currency)}</Typography>
              </Box>
            </Box>

            <Box sx={{ height: 300 }}>
              {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => compactTick(value, currency)} />
                    <RechartsTooltip formatter={(value: any) => formatMoney(value, currency)} />
                    <Legend />
                    <Bar dataKey="Current CTC" stackId="a" fill="#171717" />
                    <Bar dataKey="Increment Amount" stackId="a" fill="#2e7d32" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Salary Comparison</Typography>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid' }}>
          <Table>
            <TableHead sx={{ bgcolor: 'action.hover' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Component</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Current</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>New</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Difference</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Annual CTC</TableCell>
                <TableCell align="right">{formatMoney(currentCTC, currency)}</TableCell>
                <TableCell align="right">{formatMoney(newCTC, currency)}</TableCell>
                <TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>+ {formatMoney(incrementAmount, currency)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monthly Gross</TableCell>
                <TableCell align="right">{formatMoney(currentCTC / 12, currency)}</TableCell>
                <TableCell align="right">{formatMoney(newMonthlyCTC, currency)}</TableCell>
                <TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>+ {formatMoney(monthlyIncrease, currency)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SalaryIncrementCalculator;
