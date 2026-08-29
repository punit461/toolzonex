'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'allotment' | 'accrual';

const LeaveBalanceCalculator = () => {
  const [mode, setMode] = useState<Mode>('allotment');
  const [allotment, setAllotment] = useState<string>('20');
  const [used, setUsed] = useState<string>('6');
  const [accrualRate, setAccrualRate] = useState<string>('1.66');
  const [monthsElapsed, setMonthsElapsed] = useState<string>('8');

  const { available, remaining, valid } = useMemo(() => {
    const usedDays = parseFloat(used);
    if (isNaN(usedDays) || usedDays < 0) return { available: 0, remaining: 0, valid: false };

    let avail: number;
    if (mode === 'allotment') {
      const a = parseFloat(allotment);
      if (isNaN(a) || a < 0) return { available: 0, remaining: 0, valid: false };
      avail = a;
    } else {
      const rate = parseFloat(accrualRate);
      const months = parseFloat(monthsElapsed);
      if (isNaN(rate) || isNaN(months) || rate < 0 || months < 0) return { available: 0, remaining: 0, valid: false };
      avail = rate * months;
    }

    return { available: avail, remaining: avail - usedDays, valid: true };
  }, [mode, allotment, used, accrualRate, monthsElapsed]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Your Leave Balance</Typography>
      <Typography variant="body1">
        Your remaining leave balance is your total available leave minus the days you&apos;ve already used.
        If your employer grants a fixed annual allotment, subtract days used directly. If leave accrues
        gradually instead, multiply your monthly accrual rate by the number of months elapsed to find how much
        leave you&apos;ve earned so far, then subtract days used.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Remaining = Annual Allotment − Days Used &nbsp;|&nbsp; Remaining = (Accrual Rate × Months Elapsed) − Days Used
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a fixed annual allotment of 20 days and 6 days already used, your remaining balance is
        20 − 6 = 14 days. Under an accrual system earning 1.66 days per month, after 8 months you&apos;ve earned
        1.66 × 8 = 13.28 days — minus 6 used leaves 7.28 days remaining.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking how many vacation or PTO days you have left before requesting time off.</li>
          <li>Tracking accrued leave under a monthly accrual policy rather than a lump-sum annual grant.</li>
          <li>Planning leave usage across the rest of the year against your remaining balance.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between the two modes?</Typography>
      <Typography variant="body1">
        The fixed allotment mode assumes your full annual leave is available from day one, which fits policies
        that grant all leave upfront each year. The accrual mode instead builds up leave gradually based on a
        per-month rate, which fits policies where you earn leave as you work rather than receiving it all at
        once.
      </Typography>
      <Typography variant="h3">Can my remaining balance be negative?</Typography>
      <Typography variant="body1">
        Yes, if you&apos;ve used more leave than you&apos;ve accrued or been allotted so far — this typically
        happens under accrual policies if leave is taken in advance of it being earned, which some employers
        allow and others don&apos;t.
      </Typography>
      <Typography variant="h3">Does this account for carryover from a previous year?</Typography>
      <Typography variant="body1">
        No — enter your allotment (or accrual total) as the full amount available for the period you&apos;re
        tracking, including any carried-over days, and this calculator will simply subtract what you&apos;ve
        used from that total.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/leave-balance-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
            <ToggleButton value="allotment">Fixed Annual Allotment</ToggleButton>
            <ToggleButton value="accrual">Monthly Accrual</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
          <Stack spacing={2}>
            {mode === 'allotment' ? (
              <TextField label="Annual Leave Allotment (days)" type="number" fullWidth value={allotment} onChange={(e) => setAllotment(e.target.value)} onFocus={(e) => e.target.select()} />
            ) : (
              <>
                <TextField label="Accrual Rate (days/month)" type="number" fullWidth value={accrualRate} onChange={(e) => setAccrualRate(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Months Elapsed" type="number" fullWidth value={monthsElapsed} onChange={(e) => setMonthsElapsed(e.target.value)} onFocus={(e) => e.target.select()} />
              </>
            )}
            <TextField label="Leave Days Used So Far" type="number" fullWidth value={used} onChange={(e) => setUsed(e.target.value)} onFocus={(e) => e.target.select()} />
          </Stack>

          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Remaining Leave Balance</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {valid ? `${remaining.toFixed(2)} days` : '—'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {valid ? `${available.toFixed(2)} days available` : ''}
            </Typography>
          </Paper>
        </Box>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LeaveBalanceCalculator;
