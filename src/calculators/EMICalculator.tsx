'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const COLORS = ['#171717', '#D4AF37'];

const EMICalculator = () => {
  const [principal, setPrincipal] = useState<number>(5000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

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
      <Box sx={{ my: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, fontFamily: 'monospace' }}>
        EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
      </Box>
      <Typography variant="body1">
        Where:<br />
        <strong>P</strong> = Principal loan amount<br />
        <strong>R</strong> = Monthly interest rate (Annual Rate / 12 / 100)<br />
        <strong>N</strong> = Loan tenure in months
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens if interest rates change?</Typography>
      <Typography variant="body1">
        If you have a floating rate loan, your bank may either increase your EMI amount or extend your loan tenure when interest rates rise.
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
            <Typography gutterBottom>Loan Amount (₹)</Typography>
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
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
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
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }
              }}
            />
            <Slider
              value={rate}
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
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">Yr</InputAdornment>,
                }
              }}
            />
            <Slider
              value={tenureYears}
              min={1}
              max={30}
              step={1}
              onChange={(_, value) => setTenureYears(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Monthly EMI</Typography>
            {rate <= 0 ? (
              <Typography color="error" sx={{ mt: 2, fontWeight: 600 }}>Please enter a valid interest rate (&gt; 0%)</Typography>
            ) : (
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              ₹ {emi.toLocaleString('en-IN')}
            </Typography>
            )}

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Interest</Typography>
                <Typography variant="h6">₹ {totalInterest.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Payment</Typography>
                <Typography variant="h6">₹ {totalPayment.toLocaleString('en-IN')}</Typography>
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
                  <RechartsTooltip formatter={(value: any) => `₹ ${value.toLocaleString('en-IN')}`} />
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
