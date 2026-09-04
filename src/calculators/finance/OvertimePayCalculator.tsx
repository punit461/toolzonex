'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const OvertimePayCalculatorContent = () => {
  const [wage, setWage] = useState('20');
  const [regularHours, setRegularHours] = useState('40');
  const [overtimeHours, setOvertimeHours] = useState('5');
  const [multiplier, setMultiplier] = useState('1.5');

  const result = useMemo(() => {
    const w = parseFloat(wage) || 0;
    const rh = parseFloat(regularHours) || 0;
    const oh = parseFloat(overtimeHours) || 0;
    const m = parseFloat(multiplier) || 0;

    const regularPay = w * rh;
    const overtimeRate = w * m;
    const overtimePay = overtimeRate * oh;
    const totalPay = regularPay + overtimePay;

    return { regularPay, overtimeRate, overtimePay, totalPay };
  }, [wage, regularHours, overtimeHours, multiplier]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Regular Hourly Wage"
          type="number"
          value={wage}
          onChange={(e) => setWage(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Regular Hours Worked"
          type="number"
          value={regularHours}
          onChange={(e) => setRegularHours(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
        />
        <TextField
          label="Overtime Hours Worked"
          type="number"
          value={overtimeHours}
          onChange={(e) => setOvertimeHours(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
        />
        <TextField
          label="Overtime Multiplier"
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Standard US overtime rate is 1.5x (time-and-a-half)"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">x</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Total Pay</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.totalPay)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Regular Pay</Typography>
          <Typography fontWeight={600}>{money(result.regularPay)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Overtime Rate</Typography>
          <Typography fontWeight={600}>{money(result.overtimeRate)} / hr</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Overtime Pay</Typography>
          <Typography fontWeight={600}>{money(result.overtimePay)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const OvertimePayCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Overtime Pay Calculator Works</Typography>
      <Typography variant="body1">
        Enter your regular hourly wage, the number of regular hours worked, the number of overtime hours
        worked, and the overtime multiplier your employer pays (commonly 1.5x, known as &quot;time-and-a-half&quot;).
        Regular pay is your wage times regular hours. Overtime pay is your wage times the multiplier, times
        overtime hours. Total pay is the sum of both.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Pay = (Wage × Regular Hours) + (Wage × Multiplier × Overtime Hours)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At a $20/hr wage with 40 regular hours and 5 overtime hours at 1.5x, regular pay is 20 × 40 = $800,
        the overtime rate is 20 × 1.5 = $30/hr, and overtime pay is 30 × 5 = $150 — for a total of $950.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a paycheck to confirm overtime was calculated correctly.</li>
          <li>Estimating take-home pay before agreeing to work extra hours or a shift.</li>
          <li>Comparing pay under different overtime multipliers (1.5x vs. 2x &quot;double time&quot;).</li>
          <li>Budgeting for payroll costs when scheduling overtime for hourly staff.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the standard overtime multiplier?</Typography>
      <Typography variant="body1">
        In the US, federal law generally requires 1.5x pay (&quot;time-and-a-half&quot;) for hours worked over
        40 in a week for non-exempt employees. Some employers, states, or union contracts pay 2x
        (&quot;double time&quot;) for certain hours, like holidays — adjust the multiplier field to match your
        situation.
      </Typography>
      <Typography variant="h3">Does this calculator account for taxes?</Typography>
      <Typography variant="body1">
        No — this calculates gross pay before taxes and other deductions. Your actual take-home pay will be
        lower after income tax, payroll tax, and any other withholdings are applied.
      </Typography>
      <Typography variant="h3">What counts as overtime hours?</Typography>
      <Typography variant="body1">
        This varies by jurisdiction and employer policy, but it&apos;s typically hours worked beyond 40 in a
        week (or beyond 8 in a day in some places). Check your local labor laws or employment contract for
        the exact threshold that applies to you.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/overtime-pay-calculator" content={content}>
      <OvertimePayCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OvertimePayCalculator;
