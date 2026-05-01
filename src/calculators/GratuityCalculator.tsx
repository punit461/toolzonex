'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

const GratuityCalculator = () => {
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [dearnessAllowance, setDearnessAllowance] = useState<number>(0);
  const [yearsOfService, setYearsOfService] = useState<number>(5);

  const { gratuity, isTaxable } = useMemo(() => {
    const total = basicSalary + dearnessAllowance;
    let amount = 0;
    if (yearsOfService >= 5) {
      amount = (15 * total * yearsOfService) / 26;
    }
    return {
      totalSalary: total,
      gratuity: amount,
      isTaxable: amount > 2000000,
    };
  }, [basicSalary, dearnessAllowance, yearsOfService]);

  const content = (
    <>
      <Typography variant="h2">What is Gratuity?</Typography>
      <Typography variant="body1">
        Gratuity is a lump sum amount paid by an employer to an employee as a token of appreciation for their long-term service to the company. It is governed by the Payment of Gratuity Act, 1972 in India.
      </Typography>

      <Typography variant="h2">Eligibility for Gratuity</Typography>
      <Typography variant="body1">
        To be eligible to receive gratuity, an employee must have completed at least 5 continuous years of service with the same employer. It is payable on:
      </Typography>
      <ul>
        <li>Resignation or retirement</li>
        <li>Superannuation</li>
        <li>Death or disablement (the 5-year rule is relaxed in these cases)</li>
      </ul>

      <Typography variant="h2">The Formula</Typography>
      <Typography variant="body1">
        The standard formula for calculating gratuity is:
        <br/><br/>
        <strong>Gratuity = (15 × Last Drawn Salary × Years of Service) / 26</strong>
      </Typography>
      <Typography variant="body1">
        <em>Note: The Last Drawn Salary includes your Basic Salary + Dearness Allowance (DA). Also, any service over 6 months is rounded up to the next year.</em>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Online Gratuity Calculator"
      description="Calculate how much gratuity you are entitled to receive from your employer after 5 years of service."
      url="/finance/gratuity-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Basic Salary (Monthly)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={basicSalary}
              onChange={(e) => setBasicSalary(Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Dearness Allowance (DA)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={dearnessAllowance}
              onChange={(e) => setDearnessAllowance(Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
            <Typography variant="caption" color="text.secondary">Enter 0 if not applicable</Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Years of Service</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={yearsOfService}
              onChange={(e) => setYearsOfService(Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">Yrs</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {yearsOfService < 5 ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" color="error" gutterBottom sx={{ fontWeight: 700 }}>
                  Not Eligible
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  You must complete at least 5 years of continuous service to be eligible for gratuity.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>Estimated Gratuity Amount</Typography>
                
                <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', my: 3 }}>
                  ₹ {Math.round(gratuity).toLocaleString('en-IN')}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 3, borderTop: '1px solid #E5E5E5' }}>
                  <Typography color="text.secondary">Tax Status:</Typography>
                  <Typography sx={{ fontWeight: 600, color: isTaxable ? 'error.main' : 'success.main' }}>
                    {isTaxable ? 'Partially Taxable (> ₹20L limit)' : 'Tax Free'}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </CalculatorShell>
  );
};

export default GratuityCalculator;
