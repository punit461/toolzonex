'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Select, MenuItem } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const COLORS = ['#171717', '#D4AF37'];

const PersonalLoanCalculator = () => {
  const [principal, setPrincipal] = useState<number>(300000);
  const [rate, setRate] = useState<number>(14);
  const [tenureYears, setTenureYears] = useState<number>(3);
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
      <Typography variant="h2">What makes a personal loan different?</Typography>
      <Typography variant="body1">
        A personal loan is <strong>unsecured</strong> — unlike a home or car loan, you don&apos;t pledge any
        collateral against it. Because the lender takes on more risk, personal loans typically carry noticeably
        higher interest rates than secured loans, and tenures are usually much shorter (1-5 years rather than
        15-30). Lenders lean more heavily on your credit score and income when deciding both your eligibility and
        your rate.
      </Typography>

      <Typography variant="h2">How the EMI is calculated</Typography>
      <Typography variant="body1">
        Personal loan EMIs use the same reducing-balance formula as any other amortizing loan:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace' }}>
        EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
      </Box>
      <Typography variant="body1">
        Where <strong>P</strong> is the loan amount, <strong>R</strong> is the monthly interest rate (annual
        rate ÷ 12 ÷ 100), and <strong>N</strong> is the tenure in months.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A ₹3,00,000 personal loan at 14% annual interest over 3 years (36 months) works out to an EMI of about
        ₹10,255/month, with total interest of roughly ₹69,180 over the loan&apos;s life — notably more interest,
        relative to the amount borrowed, than a secured loan at a lower rate would carry.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting the monthly EMI for a debt-consolidation, medical, or wedding personal loan.</li>
          <li>Comparing offers from different lenders at different rates before signing.</li>
          <li>Checking whether a shorter tenure at a higher EMI saves meaningfully on total interest.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is my personal loan rate higher than a home loan rate?</Typography>
      <Typography variant="body1">
        Because a personal loan has no collateral backing it, the lender absorbs the full loss if you default —
        so they charge a higher rate to compensate for that added risk, unlike a home loan where the property
        itself secures the debt.
      </Typography>
      <Typography variant="h3">Does my credit score affect the rate I get?</Typography>
      <Typography variant="body1">
        Significantly. Since there&apos;s no collateral, lenders rely heavily on your credit score and income
        stability to price the loan — a higher score typically unlocks a meaningfully lower rate on an unsecured
        personal loan than a borderline applicant would be offered.
      </Typography>
      <Typography variant="h3">Is prepaying a personal loan worth it?</Typography>
      <Typography variant="body1">
        Usually yes, since personal loan rates are relatively high — prepaying reduces the principal you&apos;re
        paying interest on for the remaining tenure. Check your lender&apos;s prepayment or foreclosure charges
        first, as some apply a fee on early repayment.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/personal-loan-calculator" content={content}>
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
              min={10000}
              max={2000000}
              step={10000}
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
              min={8}
              max={30}
              step={0.5}
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
              max={7}
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

export default PersonalLoanCalculator;
