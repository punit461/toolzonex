'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const HourlyToSalaryCalculator = () => {
  const [hourlyWage, setHourlyWage] = useState('25');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');

  const { weekly, monthly, annual } = useMemo(() => {
    const wage = parseFloat(hourlyWage) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const wk = wage * hours;
    const yr = wk * 52;
    return { weekly: wk, monthly: yr / 12, annual: yr };
  }, [hourlyWage, hoursPerWeek]);

  const content = (
    <>
      <Typography variant="h2">How Hourly Pay Converts to Salary</Typography>
      <Typography variant="body1">
        Enter your hourly wage and the number of hours you work per week to see the equivalent weekly,
        monthly, and annual salary. This assumes a consistent schedule of 52 working weeks per year.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Weekly = Hourly Wage × Hours per Week
        <br />
        Annual = Weekly × 52
        <br />
        Monthly = Annual ÷ 12
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At $25/hour working 40 hours per week, weekly pay is $1,000, monthly pay is roughly $4,333, and
        annual pay comes to $52,000 — a useful reference when comparing an hourly job offer to a salaried
        role.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing an hourly job offer against a salaried position.</li>
          <li>Estimating annual income for budgeting or loan applications.</li>
          <li>Understanding the full-year impact of a raise expressed per hour.</li>
          <li>Freelancers and contractors converting an hourly rate into expected monthly income.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this account for overtime or unpaid time off?</Typography>
      <Typography variant="body1">
        No — this is a straight-line projection assuming the same hours every week, all 52 weeks of the
        year, with no overtime premium. For overtime pay, use the{' '}
        <a href="/finance/payroll-calculator">Payroll Calculator</a>. Unpaid vacation or leave will reduce
        actual annual earnings below this estimate.
      </Typography>
      <Typography variant="h3">Why 52 weeks instead of accounting for holidays?</Typography>
      <Typography variant="body1">
        52 weeks is the standard baseline for converting hourly pay to an annual figure. If you take unpaid
        holidays or leave, your actual annual earnings will be somewhat lower than this projection.
      </Typography>
      <Typography variant="h3">How do I go the other direction — salary to hourly?</Typography>
      <Typography variant="body1">
        Use the <a href="/finance/salary-to-hourly-calculator">Salary to Hourly Calculator</a> to convert an
        annual salary back into an equivalent hourly wage.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/hourly-to-salary-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Hourly Wage"
            type="number"
            value={hourlyWage}
            onChange={(e) => setHourlyWage(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Hours per Week"
            type="number"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Annual Salary</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(annual)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly</Typography>
            <Typography fontWeight={600}>{fmt(monthly)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Weekly</Typography>
            <Typography fontWeight={600}>{fmt(weekly)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HourlyToSalaryCalculator;
