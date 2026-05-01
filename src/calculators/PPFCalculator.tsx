'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';

const PPFCalculator = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [timePeriod, setTimePeriod] = useState<number>(15);
  // PPF rate is currently 7.1%
  const rate = 7.1;

  const { investedAmount, totalInterest, maturityValue, chartData } = useMemo(() => {
    let currentInvested = 0;
    let currentValue = 0;
    const annualRate = rate / 100;
    const data = [];

    for (let i = 1; i <= timePeriod; i++) {
      currentInvested += yearlyInvestment;
      currentValue = (currentValue + yearlyInvestment) * (1 + annualRate);
      
      data.push({
        year: `Year ${i}`,
        Invested: Math.round(currentInvested),
        Interest: Math.round(currentValue - currentInvested),
      });
    }

    return {
      investedAmount: currentInvested,
      totalInterest: Math.round(currentValue - currentInvested),
      maturityValue: Math.round(currentValue),
      chartData: data,
    };
  }, [yearlyInvestment, timePeriod, rate]);

  const content = (
    <>
      <Typography variant="h2">What is PPF?</Typography>
      <Typography variant="body1">
        Public Provident Fund (PPF) is a popular long-term investment option in India backed by the Government of India. It offers safety with attractive interest rates and returns that are fully exempted from Tax. 
      </Typography>

      <Typography variant="h2">PPF Rules</Typography>
      <Typography variant="body1">
        - <strong>Minimum & Maximum Investment:</strong> You must invest a minimum of ₹500 and a maximum of ₹1.5 Lakhs in a financial year.<br />
        - <strong>Maturity Period:</strong> The standard maturity period is 15 years, which can be extended in blocks of 5 years.<br />
        - <strong>Interest Rate:</strong> The interest rate is reviewed by the government every quarter. Currently, it is 7.1% p.a.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="PPF Calculator"
      description="Estimate the maturity amount of your Public Provident Fund (PPF) investments."
      url="/finance/ppf-calculator"
      content={content}
      category="Finance"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Yearly Investment (₹)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={yearlyInvestment}
              onChange={(e) => setYearlyInvestment(Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }
              }}
            />
            <Slider
              value={yearlyInvestment}
              min={500}
              max={150000}
              step={500}
              onChange={(_, value) => setYearlyInvestment(value as number)}
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
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
             slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">Yr</InputAdornment>,
                  inputProps: { min: 15 },
                }
              }}
            />
            <Slider
              value={timePeriod}
              min={15}
              max={50}
              step={5}
              onChange={(_, value) => setTimePeriod(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
          
          <Box sx={{ mb: 4 }}>
             <Typography gutterBottom>Current PPF Interest Rate: <strong>7.1% p.a.</strong></Typography>
             <Typography variant="caption" color="text.secondary">Rate as of Q1 FY 2025-26 (April 2025). Reviewed quarterly by GoI.</Typography>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Maturity Value</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              ₹ {maturityValue.toLocaleString('en-IN')}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Invested</Typography>
                <Typography variant="h6">₹ {investedAmount.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Interest</Typography>
                <Typography variant="h6">₹ {totalInterest.toLocaleString('en-IN')}</Typography>
              </Box>
            </Box>

            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="year" hide />
                  <YAxis hide />
                  <RechartsTooltip formatter={(value: any) => `₹ ${value.toLocaleString('en-IN')}`} />
                  <Legend />
                  <Bar dataKey="Invested" stackId="a" fill="#171717" />
                  <Bar dataKey="Interest" stackId="a" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </CalculatorShell>
  );
};

export default PPFCalculator;
