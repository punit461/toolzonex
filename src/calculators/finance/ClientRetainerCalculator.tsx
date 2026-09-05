'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ClientRetainerCalculator = () => {
  const [retainerFee, setRetainerFee] = useState('3000');
  const [includedHours, setIncludedHours] = useState('20');
  const [overageRate, setOverageRate] = useState('150');
  const [actualHours, setActualHours] = useState('26');

  const result = useMemo(() => {
    const fee = parseFloat(retainerFee) || 0;
    const included = parseFloat(includedHours) || 0;
    const overage = parseFloat(overageRate) || 0;
    const actual = parseFloat(actualHours) || 0;

    const overageHours = Math.max(actual - included, 0);
    const overageCharge = overageHours * overage;
    const totalBilled = fee + overageCharge;
    const effectiveRate = actual > 0 ? totalBilled / actual : 0;

    return { overageHours, overageCharge, totalBilled, effectiveRate };
  }, [retainerFee, includedHours, overageRate, actualHours]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Client Retainer Calculator</Typography>
      <Typography variant="body1">
        Enter your monthly retainer fee, the number of hours included in that retainer, your overage hourly
        rate (charged for any hours beyond the included amount), and the actual hours used this month. If
        actual hours are at or below the included amount, you bill just the flat retainer fee. If actual
        hours exceed the included amount, the calculator adds overage charges for the extra hours on top of
        the retainer fee, and shows the effective hourly rate you actually earned for the month.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        If Actual Hours ≤ Included Hours: Total Billed = Retainer Fee
        <br />
        If Actual Hours &gt; Included Hours: Total Billed = Retainer Fee + (Actual − Included) × Overage Rate
        <br />
        Effective Hourly Rate = Total Billed ÷ Actual Hours
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A {money(3000)}/month retainer covering 20 hours, with a $150/hr overage rate, where the client used 26
        hours this month: the 6 overage hours cost {money(result.overageCharge)}, bringing the total billed to{' '}
        {money(result.totalBilled)} — an effective rate of {money(result.effectiveRate)}/hr across all 26
        hours actually worked.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Billing a retainer client correctly when their usage exceeds the included hours in a given month.</li>
          <li>Tracking whether a retainer arrangement is still profitable as actual usage creeps up over time.</li>
          <li>Deciding whether to renegotiate a retainer's included hours or overage rate based on typical usage.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if actual hours are less than the included hours?</strong> You still bill the full flat retainer fee — retainer arrangements typically don't refund or discount unused hours, since the fee is meant to secure ongoing availability and priority, not just pay for hours used.</li>
          <li><strong>Why does the effective hourly rate matter?</strong> It shows what you're really earning per hour once actual usage is factored in. A retainer that looks generous on paper can have a low effective rate if actual hours used are consistently much higher than the included amount without matching overage charges.</li>
          <li><strong>Should overage hours be billed at a higher rate than the retainer's implied hourly rate?</strong> Many freelancers and agencies do set overage rates higher than the retainer's baseline rate, since overage work is less predictable and harder to plan around than the committed retainer hours.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/client-retainer-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Monthly Retainer Fee" type="number" value={retainerFee} onChange={(e) => setRetainerFee(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Hours Included in Retainer" type="number" value={includedHours} onChange={(e) => setIncludedHours(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
          <TextField
            label="Overage Hourly Rate" type="number" value={overageRate} onChange={(e) => setOverageRate(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Actual Hours Used This Month" type="number" value={actualHours} onChange={(e) => setActualHours(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Billed This Month</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.totalBilled)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Overage Hours</Typography>
            <Typography fontWeight={600}>{result.overageHours.toFixed(1)} hrs — {money(result.overageCharge)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Effective Hourly Rate</Typography>
            <Typography fontWeight={600}>{money(result.effectiveRate)}/hr</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ClientRetainerCalculator;
