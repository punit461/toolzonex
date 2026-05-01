'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';

const RentVsBuyCalculator = () => {
  const [propertyValue, setPropertyValue] = useState<number>(5000000);
  const [rentAmount, setRentAmount] = useState<number>(20000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [loanRate, setLoanRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(5);
  const [rentIncrease, setRentIncrease] = useState<number>(5);

  const { breakEvenYear, chartData } = useMemo(() => {
    let downPayment = (propertyValue * downPaymentPct) / 100;
    let loanAmount = propertyValue - downPayment;
    
    const monthlyRate = loanRate / 12 / 100;
    const months = loanTenure * 12;
    const emi = loanAmount > 0 ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1) : 0;

    let totalRentPaid = 0;
    let currentMonthlyRent = rentAmount;
    
    let currentPropertyValue = propertyValue;
    
    // For simplicity, we compare purely the cash outflow vs equity gained.
    // Buy cost = Total EMIs + Downpayment - Appreciated Property Value
    // Rent cost = Total Rent Paid
    // Break-even is when Buy Cost < Rent Cost
    
    const data = [];
    let bYear = -1;

    for (let year = 1; year <= loanTenure; year++) {
      // Yearly rent
      totalRentPaid += currentMonthlyRent * 12;
      currentMonthlyRent *= (1 + rentIncrease / 100);
      
      // Property appreciation
      currentPropertyValue *= (1 + propertyAppreciation / 100);
      
      // Amount paid to bank
      let totalPaidToBank = (emi * 12 * year) + downPayment;
      
      // Net cost of buying (Money paid - Current Equity)
      // Assuming 0 selling cost for simplicity
      let currentLoanBalance = 0;
      if (year <= loanTenure && monthlyRate > 0) {
        currentLoanBalance = Math.max(0,
          loanAmount * (Math.pow(1 + monthlyRate, months) - Math.pow(1 + monthlyRate, year * 12)) /
          (Math.pow(1 + monthlyRate, months) - 1)
        );
      }
      
      let equity = currentPropertyValue - currentLoanBalance;
      let netBuyCost = totalPaidToBank - equity;

      if (bYear === -1 && netBuyCost < totalRentPaid) {
        bYear = year;
      }

      data.push({
        year: `Y${year}`,
        'Rent Cost': Math.round(totalRentPaid),
        'Net Buy Cost': Math.round(netBuyCost)
      });
    }

    return { 
      breakEvenYear: bYear,
      chartData: data,
      buyCost: data[data.length - 1]['Net Buy Cost'],
      rentCost: data[data.length - 1]['Rent Cost']
    };
  }, [propertyValue, rentAmount, downPaymentPct, loanRate, loanTenure, propertyAppreciation, rentIncrease]);

  const content = (
    <>
      <Typography variant="h2">Rent vs Buy: The Ultimate Dilemma</Typography>
      <Typography variant="body1">
        The decision to rent or buy a house is one of the biggest financial decisions you'll make. It involves comparing the unrecoverable costs of renting (rent payments) against the unrecoverable costs of buying (interest payments, maintenance, taxes, etc.).
      </Typography>
      
      <Typography variant="h2">What is the Break-Even Point?</Typography>
      <Typography variant="body1">
        The break-even point is the year when the net cost of buying a home (Total Payments - Accumulated Equity) becomes lower than the total cost of renting over the same period. If you plan to stay in the home longer than the break-even period, buying is mathematically the better financial choice.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Rent vs Buy Calculator"
      description="Compare the financial costs of renting versus buying a home over time."
      url="/finance/rent-vs-buy-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography gutterBottom>Property Value (₹)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
              onFocus={(e) => e.target.select()}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Monthly Rent (₹)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
              onFocus={(e) => e.target.select()}
                value={rentAmount}
                onChange={(e) => setRentAmount(Number(e.target.value))}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography gutterBottom>Down Payment (%)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
              onFocus={(e) => e.target.select()}
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Loan Tenure (Years)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
              onFocus={(e) => e.target.select()}
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">Yr</InputAdornment> } }}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography gutterBottom>Home Loan Rate (%)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
              onFocus={(e) => e.target.select()}
                value={loanRate}
                onChange={(e) => setLoanRate(Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
            <Box>
              <Typography gutterBottom>Property Appr. (%)</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
              onFocus={(e) => e.target.select()}
                value={propertyAppreciation}
                onChange={(e) => setPropertyAppreciation(Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Annual Rent Increase (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={rentIncrease}
              onChange={(e) => setRentIncrease(Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h6" color="text.secondary">Financial Verdict</Typography>
              
              {breakEvenYear !== -1 ? (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mt: 2 }}>
                    Buying is better
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    if you stay longer than <strong>{breakEvenYear} years</strong>.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#eab308', mt: 2 }}>
                    Renting is better
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    under these conditions for the next {loanTenure} years.
                  </Typography>
                </>
              )}
            </Box>

            <Box sx={{ height: 250, mt: 'auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="year" hide />
                  <YAxis hide />
                  <RechartsTooltip formatter={(value: any) => `₹ ${value.toLocaleString('en-IN')}`} />
                  <Legend />
                  <Bar dataKey="Rent Cost" fill="#171717" />
                  <Bar dataKey="Net Buy Cost" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>
    </CalculatorShell>
  );
};

export default RentVsBuyCalculator;
