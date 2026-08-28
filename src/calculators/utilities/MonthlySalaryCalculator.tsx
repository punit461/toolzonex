'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const MonthlySalaryCalculator = () => {
  const [inputMode, setInputMode] = useState<'annual' | 'hourly'>('annual');
  const [annualSalary, setAnnualSalary] = useState('75000');
  const [hourlyRate, setHourlyRate] = useState('36');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [deductionPct, setDeductionPct] = useState('25');

  const result = useMemo(() => {
    let annual: number;
    if (inputMode === 'annual') {
      annual = parseFloat(annualSalary) || 0;
    } else {
      const hr = parseFloat(hourlyRate) || 0;
      const hpw = parseFloat(hoursPerWeek) || 40;
      annual = hr * hpw * 52;
    }

    const monthly = annual / 12;
    const biweekly = annual / 26;
    const weekly = annual / 52;
    const daily = annual / 260;
    const hourly = annual / 2080;

    const deduction = (parseFloat(deductionPct) || 0) / 100;
    const takeHomeMonthly = monthly * (1 - deduction);

    return { annual, monthly, biweekly, weekly, daily, hourly, takeHomeMonthly, deductionPctValue: parseFloat(deductionPct) || 0 };
  }, [inputMode, annualSalary, hourlyRate, hoursPerWeek, deductionPct]);

  const content = (
    <>
      <Typography variant="h2">How is Monthly Salary Calculated?</Typography>
      <Typography variant="body1">
        Monthly salary is simply your annual salary divided by 12. To convert from an hourly rate, multiply by hours worked per week and 52 weeks per year, then divide by 12. Other common pay periods include biweekly (÷26), weekly (÷52), and daily (÷260 working days).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Monthly = Annual / 12<br />
        Biweekly = Annual / 26<br />
        Weekly = Annual / 52<br />
        Daily = Annual / 260<br />
        Hourly = Annual / 2,080
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An annual salary of $75,000 breaks down to $6,250 per month, $2,884.62 biweekly, $1,442.31 weekly, $288.46 daily, and $36.06 per hour (based on 2,080 work hours per year).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing job offers that quote salary vs. hourly rate.</li>
          <li>Budgeting monthly expenses based on take-home pay.</li>
          <li>Understanding your pay across different pay periods.</li>
          <li>Negotiating salary by translating between annual and hourly figures.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many work hours are in a year?</Typography>
      <Typography variant="body1">
        The standard calculation uses 2,080 hours (40 hours/week × 52 weeks). This excludes vacation, holidays, and sick days. Actual worked hours may be lower depending on your benefits and time off.
      </Typography>
      <Typography variant="h3">What is the difference between gross and net salary?</Typography>
      <Typography variant="body1">
        Gross salary is your total earnings before any deductions. Net salary (take-home pay) is what you receive after federal/state taxes, Social Security, Medicare, and other deductions like health insurance or 401(k) contributions.
      </Typography>
      <Typography variant="h3">How do I convert biweekly pay to monthly?</Typography>
      <Typography variant="body1">
        Biweekly pay is every two weeks (26 pays per year). To get monthly pay, multiply biweekly pay by 26 and divide by 12. Note that this gives a slightly different result than dividing annual salary by 12 because there are two months per year with three pay periods.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/monthly-salary-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Input Mode</Typography>
            <ToggleButtonGroup value={inputMode} exclusive onChange={(_, v) => v && setInputMode(v)} fullWidth>
              <ToggleButton value="annual">Annual Salary</ToggleButton>
              <ToggleButton value="hourly">Hourly Rate</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {inputMode === 'annual' ? (
            <TextField label="Annual Salary" type="number" value={annualSalary} onChange={(e) => setAnnualSalary(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          ) : (
            <>
              <TextField label="Hourly Rate" type="number" value={hourlyRate} onChange={(e) => setHourlyRate(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
              <TextField label="Hours per Week" type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} fullWidth />
            </>
          )}

          <TextField label="Deduction / Tax Rate (optional)" type="number" value={deductionPct} onChange={(e) => setDeductionPct(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth helperText="Federal + state + FICA estimate" />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Salary Breakdown</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Annual Salary</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.annual)}</Typography>
          </Paper>

          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly</Typography>
            <Typography fontWeight={600}>{fmt(result.monthly)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Biweekly</Typography>
            <Typography fontWeight={600}>{fmt(result.biweekly)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Weekly</Typography>
            <Typography fontWeight={600}>{fmt(result.weekly)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily (260 days)</Typography>
            <Typography fontWeight={600}>{fmt(result.daily)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Hourly (2,080 hrs)</Typography>
            <Typography fontWeight={600}>{fmt(result.hourly)}</Typography>
          </Paper>

          {result.deductionPctValue > 0 && (
            <Paper sx={{ p: 3, bgcolor: 'success.light', color: 'success.contrastText', textAlign: 'center' }}>
              <Typography variant="body2">Estimated Take-Home Monthly ({result.deductionPctValue}% deductions)</Typography>
              <Typography variant="h4" fontWeight="bold">{fmt(result.takeHomeMonthly)}</Typography>
            </Paper>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default MonthlySalaryCalculator;
