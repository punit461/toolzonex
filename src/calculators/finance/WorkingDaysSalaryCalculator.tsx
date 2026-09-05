'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const WorkingDaysSalaryCalculator = () => {
  const [monthlySalary, setMonthlySalary] = useState('5000');
  const [totalWorkingDays, setTotalWorkingDays] = useState('22');
  const [daysWorked, setDaysWorked] = useState('15');

  const result = useMemo(() => {
    const salary = parseFloat(monthlySalary) || 0;
    const total = parseFloat(totalWorkingDays) || 0;
    const worked = parseFloat(daysWorked) || 0;
    const perDay = total > 0 ? salary / total : 0;
    const proRated = perDay * worked;
    return { perDay, proRated };
  }, [monthlySalary, totalWorkingDays, daysWorked]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Working Days Salary Calculator</Typography>
      <Typography variant="body1">
        Enter the full monthly salary, the total number of working days in that month, and the actual number
        of days worked. This is useful for pro-rating a partial month&apos;s pay — for example, a new hire
        starting mid-month, an employee leaving before month-end, or unpaid leave taken during the period.
        The calculator finds the per-day rate by dividing the monthly salary by total working days, then
        multiplies that rate by the days actually worked.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Pro-Rated Salary = (Monthly Salary ÷ Total Working Days) × Days Worked
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An employee with a {money(5000)} monthly salary in a month with 22 total working days who only worked
        15 days earns a per-day rate of {money(result.perDay)}, for a pro-rated salary of {money(result.proRated)} for
        that month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating a new hire&apos;s first partial-month paycheck.</li>
          <li>Pro-rating pay for an employee who resigns or is terminated mid-month.</li>
          <li>Deducting pay for unpaid leave taken during a pay period.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What counts as "total working days" in a month?</strong> This is the number of scheduled working days in the month, typically excluding weekends and company holidays — commonly somewhere between 20 and 23 days depending on the month and your company&apos;s calendar.</li>
          <li><strong>Should weekends be included in "days worked"?</strong> No — count only the actual scheduled working days the employee was present or eligible for pay, matching the same day-counting convention used for "total working days" in the denominator.</li>
          <li><strong>Does this calculator account for taxes or deductions?</strong> No — this calculates gross pro-rated pay only. Taxes, benefits deductions, and other withholdings are applied separately on top of this pro-rated gross figure.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/working-days-salary-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Monthly Salary" type="number" value={monthlySalary} onChange={(e) => setMonthlySalary(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Total Working Days in Month" type="number" value={totalWorkingDays} onChange={(e) => setTotalWorkingDays(e.target.value)} fullWidth
          />
          <TextField
            label="Actual Days Worked" type="number" value={daysWorked} onChange={(e) => setDaysWorked(e.target.value)} fullWidth
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Pro-Rated Salary</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.proRated)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Per-Day Rate</Typography>
            <Typography fontWeight={600}>{money(result.perDay)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WorkingDaysSalaryCalculator;
