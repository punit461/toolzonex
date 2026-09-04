'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const DailyWageCalculatorContent = () => {
  const [rate, setRate] = useState('20');
  const [regularHours, setRegularHours] = useState('8');
  const [overtimeHours, setOvertimeHours] = useState('2');
  const [multiplier, setMultiplier] = useState('1.5');

  const result = useMemo(() => {
    const r = parseFloat(rate) || 0;
    const rh = parseFloat(regularHours) || 0;
    const oh = parseFloat(overtimeHours) || 0;
    const m = parseFloat(multiplier) || 0;

    const regularPay = r * rh;
    const overtimePay = r * m * oh;
    const totalPay = regularPay + overtimePay;

    return { regularPay, overtimePay, totalPay };
  }, [rate, regularHours, overtimeHours, multiplier]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Hourly Rate"
          type="number"
          fullWidth
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Regular Hours Worked Today"
          type="number"
          fullWidth
          value={regularHours}
          onChange={(e) => setRegularHours(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
        />
        <TextField
          label="Overtime Hours Worked Today"
          type="number"
          fullWidth
          value={overtimeHours}
          onChange={(e) => setOvertimeHours(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Hours beyond your standard workday, if any"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
        />
        <TextField
          label="Overtime Multiplier"
          type="number"
          fullWidth
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="1.5x (time-and-a-half) is standard in the US"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">x</InputAdornment> } }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Total Pay for Today</Typography>
              <Typography variant="h2" fontWeight={800} color="primary.main">{money(result.totalPay)}</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Regular: {money(result.regularPay)} &nbsp;|&nbsp; Overtime: {money(result.overtimePay)}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter your hourly rate and hours worked</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const DailyWageCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Daily Wage Calculator Works</Typography>
      <Typography variant="body1">
        Enter your hourly rate and the number of regular hours you worked today. If you worked beyond your
        standard shift, add the extra hours as overtime along with your overtime multiplier (commonly 1.5x,
        &quot;time-and-a-half&quot;) to see your total pay for that single day&apos;s work.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Pay = (Rate × Regular Hours) + (Rate × Multiplier × Overtime Hours)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At a $20/hr rate with 8 regular hours and 2 overtime hours at 1.5x, regular pay is 20 × 8 = $160 and
        overtime pay is 20 × 1.5 × 2 = $60, for a total of $220 for the day.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking what a single shift or workday will pay before agreeing to extra hours.</li>
          <li>Estimating pay for a one-off gig, day-labor job, or shift-based work.</li>
          <li>Verifying a single day&apos;s pay on a timesheet or paycheck stub.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a full paycheck or overtime calculator?</Typography>
      <Typography variant="body1">
        This tool is scoped to a single day — just &quot;what do I earn for today&apos;s work?&quot; For a
        broader pay-period calculation covering a full week or paycheck with regular and overtime hours, use
        our Overtime Pay Calculator instead.
      </Typography>
      <Typography variant="h3">Does this calculate weekly overtime eligibility?</Typography>
      <Typography variant="body1">
        No — this tool assumes you already know how many hours today count as overtime. In many places,
        overtime eligibility is based on total hours in a week (commonly over 40), not hours in a single day,
        so check your local labor laws or employer policy to determine what counts as overtime for you.
      </Typography>
      <Typography variant="h3">Does this include taxes or deductions?</Typography>
      <Typography variant="body1">
        No — this calculates gross pay before taxes and other deductions. Your actual take-home pay for the
        day will be lower after withholdings are applied.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/daily-wage-calculator" content={content}>
      <DailyWageCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DailyWageCalculator;
