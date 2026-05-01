'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

const PercentageCalculator = () => {
  const [val1A, setVal1A] = useState<number>(0);
  const [val1B, setVal1B] = useState<number>(0);

  const [val2A, setVal2A] = useState<number>(0);
  const [val2B, setVal2B] = useState<number>(0);

  const [val3A, setVal3A] = useState<number>(0);
  const [val3B, setVal3B] = useState<number>(0);

  // 1. What is X% of Y?
  const res1Raw = (val1A / 100) * val1B;
  const res1 = parseFloat(res1Raw.toFixed(6));

  // 2. X is what % of Y?
  const res2 = val2B !== 0 ? (val2A / val2B) * 100 : 0;

  // 3. % increase/decrease from X to Y?
  const res3 = val3A !== 0 ? ((val3B - val3A) / Math.abs(val3A)) * 100 : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Percentage Calculator</Typography>
      <Typography variant="body1">
        This tool offers three common percentage calculations:
      </Typography>
      <ul>
        <li><strong>What is X% of Y?</strong> - Useful for finding out discounts or tax amounts.</li>
        <li><strong>X is what % of Y?</strong> - Excellent for calculating academic marks (like IGNOU percentages) or performance metrics.</li>
        <li><strong>Percentage Change:</strong> - Perfect for calculating profit/loss or price inflation between two values over time.</li>
      </ul>
      <Typography variant="body1">
        Percentages are a fundamental part of daily life, from figuring out a tip at a restaurant to understanding interest rates on your loans.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Percentage Calculator"
      description="Easily calculate percentages, percentage changes, and find out what percent one number is of another."
      url="/utilities/percentage-calculator"
      content={content}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        
        {/* Calculation 1 */}
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E5E5', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>1. What is X% of Y?</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            <Typography>What is</Typography>
            <TextField 
              type="number"
              onFocus={(e) => e.target.select()} 
              variant="outlined" 
              size="small" 
              value={val1A} 
              onChange={(e) => setVal1A(Number(e.target.value))} 
              sx={{ width: 100 }}
            />
            <Typography>% of</Typography>
            <TextField 
              type="number"
              onFocus={(e) => e.target.select()} 
              variant="outlined" 
              size="small" 
              value={val1B} 
              onChange={(e) => setVal1B(Number(e.target.value))} 
              sx={{ width: 150 }}
            />
            <Typography>?</Typography>
          </Box>
          <Box sx={{ mt: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
            <Typography variant="h5">Answer: <span style={{ fontWeight: 800, color: '#171717' }}>{res1}</span></Typography>
            <Typography variant="caption" color="text.secondary">{val1A}% of {val1B} = {res1}</Typography>
          </Box>
        </Paper>

        {/* Calculation 2 */}
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E5E5', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>2. X is what percent of Y? (Marks / Grades)</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            <TextField 
              type="number"
              onFocus={(e) => e.target.select()} 
              variant="outlined" 
              size="small" 
              value={val2A} 
              onChange={(e) => setVal2A(Number(e.target.value))} 
              sx={{ width: 150 }}
            />
            <Typography>is what % of</Typography>
            <TextField 
              type="number"
              onFocus={(e) => e.target.select()} 
              variant="outlined" 
              size="small" 
              value={val2B} 
              onChange={(e) => setVal2B(Number(e.target.value))} 
              sx={{ width: 150 }}
            />
            <Typography>?</Typography>
          </Box>
          <Box sx={{ mt: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
            <Typography variant="h5">Answer: <span style={{ fontWeight: 800, color: '#171717' }}>{res2.toFixed(2)}%</span></Typography>
          </Box>
        </Paper>

        {/* Calculation 3 */}
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E5E5', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>3. Percentage Increase / Decrease</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 2 }}>
            <Typography>From</Typography>
            <TextField 
              type="number"
              onFocus={(e) => e.target.select()} 
              variant="outlined" 
              size="small" 
              value={val3A} 
              onChange={(e) => setVal3A(Number(e.target.value))} 
              sx={{ width: 150 }}
            />
            <Typography>to</Typography>
            <TextField 
              type="number"
              onFocus={(e) => e.target.select()} 
              variant="outlined" 
              size="small" 
              value={val3B} 
              onChange={(e) => setVal3B(Number(e.target.value))} 
              sx={{ width: 150 }}
            />
          </Box>
          <Box sx={{ mt: 3, p: 2, bgcolor: '#f9f9f9', borderRadius: 1 }}>
            <Typography variant="h5">Answer: <span style={{ fontWeight: 800, color: res3 >= 0 ? '#22c55e' : '#ef4444' }}>{Math.abs(res3).toFixed(2)}% {res3 >= 0 ? 'Increase' : 'Decrease'}</span></Typography>
          </Box>
        </Paper>

      </Box>
    </CalculatorShell>
  );
};

export default PercentageCalculator;
