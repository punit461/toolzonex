'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from './currencyConfig';

const COLORS = ['#171717', '#D4AF37'];

const EMICalculator = () => {
  const [principal, setPrincipal] = useState<number>(5000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenureYears * 12;
    
    if (p === 0 || r === 0 || n === 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiValue * n;
    const totalInt = totalPay - p;

    return {
      emi: Math.round(emiValue),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
    };
  }, [principal, rate, tenureYears]);

  const chartData = [
    { name: 'Principal Amount', value: principal },
    { name: 'Total Interest', value: totalInterest },
  ];

  const content = (
    <>
      <Typography variant="h2">How is EMI Calculated?</Typography>
      <Typography variant="body1">
        EMI (Equated Monthly Installment) is calculated using the formula:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace' }}>
        EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
      </Box>
      <Typography variant="body1">
        Where:<br />
        <strong>P</strong> = Principal loan amount<br />
        <strong>R</strong> = Monthly interest rate (Annual Rate / 12 / 100)<br />
        <strong>N</strong> = Loan tenure in months
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A ₹10,00,000 loan at 9% annual interest over 20 years (240 months) works out to an EMI of about
        ₹8,997/month, with total interest of roughly ₹11,59,280 over the loan&apos;s life.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing monthly payments across different loan amounts, rates, or tenures before borrowing.</li>
          <li>Planning a home, car, or personal loan budget.</li>
          <li>Understanding how much of each payment goes to interest vs. principal via the amortization schedule.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens if interest rates change?</Typography>
      <Typography variant="body1">
        If you have a floating rate loan, your bank may either increase your EMI amount or extend your loan tenure when interest rates rise.
      </Typography>
      <Typography variant="h3">Does a longer tenure always mean I pay more?</Typography>
      <Typography variant="body1">
        Yes — a longer tenure lowers your monthly EMI but increases the total interest paid over the life of
        the loan, since interest accrues for longer.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="EMI Calculator"
      description="Calculate your monthly EMI for home, car, or personal loans."
      url="/finance/emi-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom>Loan Amount</Typography>
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
              value={principal}
              onChange={(e) => {
                const val = e.target.value;
                setPrincipal(val === '' ? 0 : Number(val));
              }}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
            <Slider
              value={principal}
              min={100000}
              max={20000000}
              step={100000}
              onChange={(_, value) => setPrincipal(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Interest Rate (% p.a.)</Typography>
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
              step={0.1}
              onChange={(_, value) => setRate(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Loan Tenure (Years)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(tenureYears) ? '' : tenureYears}
              onChange={(e) => setTenureYears(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">Yr</InputAdornment>,
                }
              }}
            />
            <Slider
              value={Number.isNaN(tenureYears) ? 0 : tenureYears}
              min={1}
              max={30}
              step={1}
              onChange={(_, value) => setTenureYears(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Monthly EMI</Typography>
            {rate <= 0 ? (
              <Typography color="error" sx={{ mt: 2, fontWeight: 600 }}>Please enter a valid interest rate (&gt; 0%)</Typography>
            ) : (
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(emi, currency)}
            </Typography>
            )}

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Interest</Typography>
                <Typography variant="h6">{formatMoney(totalInterest, currency)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Payment</Typography>
                <Typography variant="h6">{formatMoney(totalPayment, currency)}</Typography>
              </Box>
            </Box>

            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value: any) => formatMoney(value, currency)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EMICalculator;
