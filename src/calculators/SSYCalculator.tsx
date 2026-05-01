'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';

const SSYCalculator = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(100000);
  const [girlAge, setGirlAge] = useState<number>(1);
  
  // SSY rate is currently 8.2%
  const rate = 8.2;

  const { investedAmount, totalInterest, maturityValue, chartData, maturityYear, girlAgeAtMaturity } = useMemo(() => {
    let currentInvested = 0;
    let currentValue = 0;
    const annualRate = rate / 100;
    const data = [];
    
    const investmentYears = 15; // You can only invest for 15 years
    const maturityYears = 21; // The account matures after 21 years
    
    const currentYear = new Date().getFullYear();

    for (let i = 1; i <= maturityYears; i++) {
      if (i <= investmentYears) {
        currentInvested += yearlyInvestment;
        currentValue = (currentValue + yearlyInvestment) * (1 + annualRate);
      } else {
        // No new investment, only interest accrues
        currentValue = currentValue * (1 + annualRate);
      }
      
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
      maturityYear: currentYear + maturityYears,
      girlAgeAtMaturity: girlAge + maturityYears,
    };
  }, [yearlyInvestment, girlAge]);

  const content = (
    <>
      <Typography variant="h2">What is Sukanya Samriddhi Yojana (SSY)?</Typography>
      <Typography variant="body1">
        The Sukanya Samriddhi Yojana is a government-backed savings scheme launched as part of the "Beti Bachao, Beti Padhao" campaign. It encourages parents to build a fund for the future education and marriage expenses of their female child.
      </Typography>

      <Typography variant="h2">Key Rules of SSY</Typography>
      <ul>
        <li><strong>Eligibility:</strong> Account can be opened by parents/guardians for a girl child below the age of 10.</li>
        <li><strong>Deposit Limits:</strong> Minimum deposit is ₹250 and maximum is ₹1.5 Lakh per financial year.</li>
        <li><strong>Tenure:</strong> You need to deposit money for 15 years. The account matures after 21 years from the date of opening.</li>
        <li><strong>Tax Benefits:</strong> Like PPF, SSY falls under the EEE category. Deposits (up to ₹1.5L) get 80C deductions, and the interest and maturity amount are entirely tax-free.</li>
        <li><strong>High Interest Rate:</strong> SSY typically offers higher interest rates compared to PPF and FDs. Currently, it is 8.2% p.a.</li>
      </ul>
    </>
  );

  return (
    <CalculatorShell
      title="SSY Calculator"
      description="Calculate the maturity value of your Sukanya Samriddhi Yojana (SSY) investment for your daughter's future."
      url="/finance/ssy-calculator"
      content={content}
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
              onChange={(e) => setYearlyInvestment(Math.min(150000, Number(e.target.value)))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { max: 150000, min: 250 } } }}
            />
            <Slider
              value={yearlyInvestment}
              min={250}
              max={150000}
              step={250}
              onChange={(_, value) => setYearlyInvestment(value as number)}
              sx={{ mt: 2 }}
            />
            <Typography variant="caption" color="text.secondary">Max allowed is ₹1.5 Lakh/year</Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Girl's Age (Years)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={girlAge}
              onChange={(e) => setGirlAge(Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">Yr</InputAdornment> } }}
            />
            <Slider
              value={girlAge}
              min={1}
              max={10}
              step={1}
              onChange={(_, value) => setGirlAge(value as number)}
              sx={{ mt: 2 }}
            />
            <Typography variant="caption" color="text.secondary">Must be below 10 years to open</Typography>
          </Box>
          
          <Box sx={{ mb: 4 }}>
             <Typography gutterBottom>Current SSY Interest Rate: <strong>8.2% p.a.</strong></Typography>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Maturity Value (Year {maturityYear})</Typography>
            <Typography variant="caption" color="text.secondary">Your daughter will be <strong>{girlAgeAtMaturity} years old</strong> at maturity</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              ₹ {maturityValue.toLocaleString('en-IN')}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Invested (15 Yrs)</Typography>
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

export default SSYCalculator;
