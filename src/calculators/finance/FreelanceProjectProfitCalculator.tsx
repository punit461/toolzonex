'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const FreelanceProjectProfitCalculator = () => {
  const [projectFee, setProjectFee] = useState('5000');
  const [hours, setHours] = useState('40');
  const [expenses, setExpenses] = useState('500');

  const result = useMemo(() => {
    const fee = parseFloat(projectFee) || 0;
    const h = parseFloat(hours) || 0;
    const exp = parseFloat(expenses) || 0;
    const profit = fee - exp;
    const effectiveRate = h > 0 ? profit / h : 0;
    return { profit, effectiveRate };
  }, [projectFee, hours, expenses]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Freelance Project Profit Calculator</Typography>
      <Typography variant="body1">
        Enter the fixed fee you&apos;re being paid for the whole project, the number of hours you estimate it
        will take to complete, and any project-related expenses (software, subcontractor costs, materials, or
        other direct costs). The calculator subtracts expenses from the project fee to find your actual
        profit, then divides that profit by your estimated hours to reveal the effective hourly rate
        you&apos;re really earning on the deal.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Profit = Project Fee − Expenses
        <br />
        Effective Hourly Rate = Profit ÷ Hours
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A project quoted at {money(5000)} with an estimated 40 hours of work and {money(500)} in expenses
        (software licenses, a subcontractor) leaves {money(result.profit)} in profit — an effective hourly
        rate of {money(result.effectiveRate)}/hr once expenses are factored in.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether to accept a fixed-fee project offer before committing to the work.</li>
          <li>Comparing the real effective rate of a flat-fee project against your usual hourly rate.</li>
          <li>Spotting projects that look profitable on paper but pay poorly once expenses and time are factored in.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Freelancer Hourly Rate Calculator?</strong> The Freelancer Hourly Rate Calculator works backward from a desired annual income to figure out a TARGET rate you should charge going forward. This tool works forward from an ALREADY-QUOTED fixed-fee project to evaluate whether it's actually profitable given your time estimate and expenses — it's a reality check on a specific offer, not a rate-setting tool.</li>
          <li><strong>What should count as a project expense?</strong> Include any direct cost tied specifically to completing this project — software or tool subscriptions bought for it, subcontractor or freelancer payments, materials, or specialized services. General overhead like your regular office rent usually isn't included here.</li>
          <li><strong>What if my effective hourly rate comes out lower than expected?</strong> That's exactly the value of this check — a fixed fee that seemed attractive can turn into a low effective rate once expenses and a realistic time estimate are factored in, which is useful information before accepting or renegotiating the project.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/freelance-project-profit-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Fixed Project Fee" type="number" value={projectFee} onChange={(e) => setProjectFee(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Estimated Hours to Complete" type="number" value={hours} onChange={(e) => setHours(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
          <TextField
            label="Project-Related Expenses" type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} fullWidth
            helperText="Software, subcontractors, materials, etc."
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Effective Hourly Rate</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.effectiveRate)}/hr</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Profit</Typography>
            <Typography fontWeight={600}>{money(result.profit)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FreelanceProjectProfitCalculator;
