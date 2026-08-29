'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const PERIODS = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Biweekly', value: 'biweekly' },
  { label: 'Monthly', value: 'monthly' },
];

const PayrollCalculator = () => {
  const [hourlyRate, setHourlyRate] = useState('25');
  const [regularHours, setRegularHours] = useState('40');
  const [overtimeHours, setOvertimeHours] = useState('5');
  const [period, setPeriod] = useState('weekly');

  const { regularPay, overtimePay, grossPay, periodLabel } = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const regHrs = parseFloat(regularHours) || 0;
    const otHrs = parseFloat(overtimeHours) || 0;
    const reg = rate * regHrs;
    const ot = rate * 1.5 * otHrs;
    const label = PERIODS.find((p) => p.value === period)?.label ?? 'Period';
    return { regularPay: reg, overtimePay: ot, grossPay: reg + ot, periodLabel: label };
  }, [hourlyRate, regularHours, overtimeHours, period]);

  const content = (
    <>
      <Typography variant="h2">How Gross Pay Is Calculated</Typography>
      <Typography variant="body1">
        Enter your hourly rate, the regular hours worked, and any overtime hours for the pay period, then
        pick whether you&apos;re calculating a weekly, biweekly, or monthly period. Overtime hours are paid at
        1.5 times the regular hourly rate, which is the standard overtime multiplier in most jurisdictions.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Regular Pay = Hourly Rate × Regular Hours
        <br />
        Overtime Pay = Hourly Rate × 1.5 × Overtime Hours
        <br />
        Gross Pay = Regular Pay + Overtime Pay
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At $25/hour with 40 regular hours and 5 overtime hours in a week, regular pay is $1,000 and overtime
        pay is 25 × 1.5 × 5 = $187.50, for a total gross pay of $1,187.50 for that week.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating a paycheck before taxes and deductions.</li>
          <li>Checking how much extra a shift of overtime hours adds to pay.</li>
          <li>Small business owners calculating payroll for hourly staff.</li>
          <li>Comparing gross pay across weekly, biweekly, and monthly pay schedules.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this gross pay or take-home pay?</Typography>
      <Typography variant="body1">
        This is gross pay — before taxes, insurance, retirement contributions, and other deductions. Actual
        take-home pay will be lower after those withholdings.
      </Typography>
      <Typography variant="h3">Is overtime always 1.5x?</Typography>
      <Typography variant="body1">
        In the US, federal law (FLSA) generally requires at least 1.5 times the regular rate for hours worked
        beyond 40 in a week for non-exempt employees. Some states, employers, or countries may use different
        rules or higher multipliers (like double-time), so check your local regulations.
      </Typography>
      <Typography variant="h3">How do I calculate pay from an annual salary instead?</Typography>
      <Typography variant="body1">
        Use the <a href="/finance/salary-to-hourly-calculator">Salary to Hourly Calculator</a> to convert an
        annual salary into an equivalent hourly rate first, then use that rate here if you need to add
        overtime.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/payroll-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Hourly Rate"
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Regular Hours Worked"
            type="number"
            value={regularHours}
            onChange={(e) => setRegularHours(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
          <TextField
            label="Overtime Hours (1.5x rate)"
            type="number"
            value={overtimeHours}
            onChange={(e) => setOvertimeHours(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
          <Box>
            <Typography gutterBottom>Pay Period</Typography>
            <Select fullWidth value={period} onChange={(e) => setPeriod(e.target.value)}>
              {PERIODS.map((p) => (
                <MenuItem key={p.value} value={p.value}>{p.label}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">{periodLabel} Gross Pay</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(grossPay)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Regular Pay</Typography>
            <Typography fontWeight={600}>{fmt(regularPay)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Overtime Pay</Typography>
            <Typography fontWeight={600}>{fmt(overtimePay)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PayrollCalculator;
