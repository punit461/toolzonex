'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import CalculatorShell from '../components/CalculatorShell';

const SalaryIncrementCalculator = () => {
  const [currentCTC, setCurrentCTC] = useState<number>(1000000);
  const [incrementPercent, setIncrementPercent] = useState<number>(10);

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
      <Box sx={{ my: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, fontFamily: 'monospace' }}>
        Increment Amount = Current CTC × (Increment % / 100)
        <br />
        New CTC = Current CTC + Increment Amount
      </Box>
      <Typography variant="body1">
        <strong>Note:</strong> This calculator provides the gross CTC impact. Your actual take-home salary will vary based on tax deductions (TDS), PF contributions, and your company's salary structure.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Salary Increment Calculator"
      description="Calculate your new CTC and monthly gross salary after an appraisal or job switch."
      url="/finance/salary-increment-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Current CTC (₹ / Year)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={currentCTC}
              onChange={(e) => setCurrentCTC(Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }
              }}
            />
            <Slider
              value={currentCTC}
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
              value={incrementPercent}
              onChange={(e) => setIncrementPercent(Number(e.target.value))}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }
              }}
            />
            <Slider
              value={incrementPercent}
              min={0}
              max={100}
              step={1}
              onChange={(_, value) => setIncrementPercent(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">New CTC</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              ₹ {newCTC.toLocaleString('en-IN')}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Increment Amount</Typography>
                <Typography variant="h6" color="success.main">+ ₹ {incrementAmount.toLocaleString('en-IN')}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Monthly Increase</Typography>
                <Typography variant="h6" color="success.main">+ ₹ {Math.round(monthlyIncrease).toLocaleString('en-IN')}</Typography>
              </Box>
            </Box>

            <Box sx={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                  <RechartsTooltip formatter={(value: any) => `₹ ${value.toLocaleString('en-IN')}`} />
                  <Legend />
                  <Bar dataKey="Current CTC" stackId="a" fill="#171717" />
                  <Bar dataKey="Increment Amount" stackId="a" fill="#2e7d32" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Salary Comparison</Typography>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E5E5E5' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
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
                <TableCell align="right">₹ {currentCTC.toLocaleString('en-IN')}</TableCell>
                <TableCell align="right">₹ {newCTC.toLocaleString('en-IN')}</TableCell>
                <TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>+ ₹ {incrementAmount.toLocaleString('en-IN')}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monthly Gross</TableCell>
                <TableCell align="right">₹ {Math.round(currentCTC / 12).toLocaleString('en-IN')}</TableCell>
                <TableCell align="right">₹ {Math.round(newMonthlyCTC).toLocaleString('en-IN')}</TableCell>
                <TableCell align="right" sx={{ color: 'success.main', fontWeight: 500 }}>+ ₹ {Math.round(monthlyIncrease).toLocaleString('en-IN')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </CalculatorShell>
  );
};

export default SalaryIncrementCalculator;
