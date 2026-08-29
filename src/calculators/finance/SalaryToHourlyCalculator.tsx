'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number, digits = 2) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: digits }).format(n);

const SalaryToHourlyCalculator = () => {
  const [annualSalary, setAnnualSalary] = useState('60000');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');

  const { hourly, weekly, monthly } = useMemo(() => {
    const salary = parseFloat(annualSalary) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const totalAnnualHours = hours * 52;
    return {
      hourly: totalAnnualHours > 0 ? salary / totalAnnualHours : 0,
      weekly: salary / 52,
      monthly: salary / 12,
    };
  }, [annualSalary, hoursPerWeek]);

  const content = (
    <>
      <Typography variant="h2">How Salary Converts to an Hourly Wage</Typography>
      <Typography variant="body1">
        Enter your annual salary and the number of hours you work per week to see the equivalent hourly wage,
        along with weekly and monthly pay figures. This assumes a consistent schedule of 52 working weeks per
        year.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Hourly Wage = Annual Salary ÷ (Hours per Week × 52)
        <br />
        Weekly = Annual Salary ÷ 52
        <br />
        Monthly = Annual Salary ÷ 12
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $60,000 annual salary based on a 40-hour work week works out to 60,000 ÷ (40 × 52) = $28.85 per
        hour. The same salary breaks down to about $1,154 per week and $5,000 per month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing a salaried job offer against hourly or freelance rates.</li>
          <li>Figuring out an appropriate hourly rate when transitioning to contract work.</li>
          <li>Understanding the true value of your time, including unpaid overtime.</li>
          <li>Setting billing rates for consulting based on a target annual income.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this account for unpaid overtime salaried employees often work?</Typography>
      <Typography variant="body1">
        No — this calculation assumes you only work the hours entered. If a salaried role regularly requires
        more hours than stated, the effective hourly wage is actually lower than shown here.
      </Typography>
      <Typography variant="h3">Should freelancers use this to set their rates?</Typography>
      <Typography variant="body1">
        It&apos;s a reasonable starting point, but freelancers typically need to charge more per hour than an
        equivalent salaried wage to cover self-employment taxes, benefits, non-billable hours, and business
        expenses that an employer would otherwise cover.
      </Typography>
      <Typography variant="h3">How do I go the other direction — hourly to salary?</Typography>
      <Typography variant="body1">
        Use the <a href="/finance/hourly-to-salary-calculator">Hourly to Salary Calculator</a> to convert an
        hourly wage into an equivalent annual, monthly, or weekly salary.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/salary-to-hourly-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Annual Salary"
            type="number"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(e.target.value)}
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
            <Typography variant="body2">Hourly Wage</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(hourly)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Weekly</Typography>
            <Typography fontWeight={600}>{fmt(weekly, 0)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly</Typography>
            <Typography fontWeight={600}>{fmt(monthly, 0)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SalaryToHourlyCalculator;
