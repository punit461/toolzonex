'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const num = (v: number) => v.toLocaleString('en-US', { maximumFractionDigits: 1 });

const SalesTargetCalculator = () => {
  const [revenueGoal, setRevenueGoal] = useState('100000');
  const [dealSize, setDealSize] = useState('2000');
  const [conversionRate, setConversionRate] = useState('20');

  const result = useMemo(() => {
    const goal = parseFloat(revenueGoal) || 0;
    const deal = parseFloat(dealSize) || 0;
    const conv = parseFloat(conversionRate) || 0;

    if (deal <= 0 || conv <= 0) return { valid: false, deals: 0, leads: 0 };

    const deals = goal / deal;
    const leads = deals / (conv / 100);
    return { valid: true, deals, leads };
  }, [revenueGoal, dealSize, conversionRate]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Sales Target Calculator</Typography>
      <Typography variant="body1">
        Enter your revenue goal, your average deal size, and the conversion rate at which leads typically turn
        into closed deals. This works backward from the revenue you want to hit, first finding how many deals
        that requires, then how many leads you need to generate to get that many deals at your current
        conversion rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Deals Needed = Revenue Goal / Average Deal Size
        <br />
        Leads Needed = Deals Needed / (Conversion Rate / 100)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        To hit a $100,000 revenue goal with an average deal size of $2,000, you need 100,000 / 2,000 = 50 deals.
        At a 20% lead-to-close conversion rate, you need 50 / 0.20 = 250 leads to generate those 50 deals.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a monthly or quarterly lead generation target for a sales or marketing team.</li>
          <li>Reverse-engineering pipeline requirements from a company-wide revenue goal.</li>
          <li>Testing how improving your conversion rate reduces the number of leads you need.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if my deal size varies a lot between customers?</strong> Use your average deal size across recent closed deals — the more consistent your historical pipeline, the more reliable this estimate will be. For very lumpy deal sizes, consider segmenting into separate calculations for different deal tiers.</li>
          <li><strong>What conversion rate should I use?</strong> Use your actual historical lead-to-close rate over a recent, representative period. If you don&apos;t have that data yet, start with an industry benchmark and refine it once you have real numbers.</li>
          <li><strong>Does this account for sales cycle length?</strong> No — this calculates the volume of leads and deals needed to hit a revenue number, not the timing. You&apos;ll need to factor your typical sales cycle length separately when planning when to start generating those leads.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/sales-target-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Revenue Goal" type="number" value={revenueGoal}
            onChange={(e) => setRevenueGoal(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Average Deal Size" type="number" value={dealSize}
            onChange={(e) => setDealSize(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Lead-to-Close Conversion Rate" type="number" value={conversionRate}
            onChange={(e) => setConversionRate(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Deals Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.valid ? num(result.deals) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Leads Needed</Typography>
            <Typography fontWeight={600}>{result.valid ? num(result.leads) : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SalesTargetCalculator;
