'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

type Frequency = 'hourly' | 'weekly' | 'biweekly' | 'monthly';

const AnnualSalaryCalculator = () => {
  const [frequency, setFrequency] = useState<Frequency>('hourly');
  const [payAmount, setPayAmount] = useState('25');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');

  const result = useMemo(() => {
    const pay = parseFloat(payAmount) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;

    let annual = 0;
    switch (frequency) {
      case 'hourly':
        annual = pay * hours * 52;
        break;
      case 'weekly':
        annual = pay * 52;
        break;
      case 'biweekly':
        annual = pay * 26;
        break;
      case 'monthly':
        annual = pay * 12;
        break;
    }

    return {
      annual,
      monthly: annual / 12,
      biweekly: annual / 26,
      weekly: annual / 52,
    };
  }, [frequency, payAmount, hoursPerWeek]);

  const content = (
    <>
      <Typography variant="h2">How Any Pay Period Converts to Annual Salary</Typography>
      <Typography variant="body1">
        Pick the pay period you&apos;re paid on — hourly, weekly, biweekly, or monthly — and enter the
        amount for that period. The calculator multiplies it out to an annual figure using standard
        year-round assumptions (52 weeks, 26 biweekly periods, or 12 months), then breaks the annual
        total back down into the other common pay periods so you can compare offers quoted in different
        formats side by side.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Hourly → Annual = Hourly Rate × Hours per Week × 52
        <br />
        Weekly → Annual = Weekly Pay × 52
        <br />
        Biweekly → Annual = Biweekly Pay × 26
        <br />
        Monthly → Annual = Monthly Pay × 12
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $25/hour rate at 40 hours a week comes to $52,000 a year. The same $52,000 could also be
        quoted as $1,000 a week, $2,000 every two weeks, or about $4,333 a month — all equivalent once
        converted to the same annual basis.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing job offers quoted in different pay periods on an equal footing.</li>
          <li>Converting a biweekly or monthly paycheck into an annual figure for loan applications.</li>
          <li>Checking what an hourly rate really works out to over a full year.</li>
          <li>Budgeting annual income from irregular pay period statements.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why are there 26 biweekly periods but only 12 monthly ones?</Typography>
      <Typography variant="body1">
        Biweekly pay happens every two weeks, and a year has 52 weeks, so that&apos;s 26 pay periods —
        not the same as 24 (twice a month). Semi-monthly pay, which is exactly twice a month, would use
        24 periods instead; biweekly and semi-monthly are easy to confuse but aren&apos;t identical.
      </Typography>
      <Typography variant="h3">Does this account for unpaid time off or overtime?</Typography>
      <Typography variant="body1">
        No — this is a straight-line projection assuming the entered pay period repeats consistently
        all year with no unpaid leave and no overtime premium. Actual annual earnings may be lower or
        higher depending on time off taken and any overtime worked.
      </Typography>
      <Typography variant="h3">How is this different from an hourly-to-salary conversion?</Typography>
      <Typography variant="body1">
        This tool accepts any starting pay period — hourly, weekly, biweekly, or monthly — and converts
        it to an annual figure, making it useful when comparing offers that aren&apos;t all quoted
        hourly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/annual-salary-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup
            value={frequency}
            exclusive
            onChange={(_, val) => val && setFrequency(val)}
            size="small"
            fullWidth
          >
            <ToggleButton value="hourly">Hourly</ToggleButton>
            <ToggleButton value="weekly">Weekly</ToggleButton>
            <ToggleButton value="biweekly">Biweekly</ToggleButton>
            <ToggleButton value="monthly">Monthly</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label={frequency === 'hourly' ? 'Hourly Rate' : `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Pay`}
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />

          {frequency === 'hourly' && (
            <TextField
              label="Hours per Week"
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
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
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Weekly</Typography>
            <Typography fontWeight={600}>{fmt(result.weekly)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AnnualSalaryCalculator;
