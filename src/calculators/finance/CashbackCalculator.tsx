'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const CashbackCalculator = () => {
  const [purchaseAmount, setPurchaseAmount] = useState('500');
  const [cashbackPercent, setCashbackPercent] = useState('2');

  const { cashbackEarned, effectiveCost } = useMemo(() => {
    const amount = parseFloat(purchaseAmount) || 0;
    const pct = parseFloat(cashbackPercent) || 0;
    const earned = (amount * pct) / 100;
    return { cashbackEarned: earned, effectiveCost: amount - earned };
  }, [purchaseAmount, cashbackPercent]);

  const content = (
    <>
      <Typography variant="h2">How Cashback Is Calculated</Typography>
      <Typography variant="body1">
        Enter the purchase amount and the cashback percentage offered by your card or rewards program to see
        how much you&apos;ll earn back, and what the purchase effectively costs you after the cashback is
        applied.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Cashback Earned = Purchase Amount × Cashback %
        <br />
        Effective Cost = Purchase Amount − Cashback Earned
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $500 purchase with 2% cashback earns you $10 back, bringing the effective cost of the purchase down
        to $490. On a card offering 5% cashback in a bonus category, the same purchase would earn $25 back,
        for an effective cost of $475.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing how much different cashback cards or promotions actually save you.</li>
          <li>Deciding between a cashback offer and a points or miles rewards program.</li>
          <li>Estimating total cashback earned across a month or year of spending.</li>
          <li>Checking whether a cashback rate justifies an annual card fee.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is cashback the same as a discount?</Typography>
      <Typography variant="body1">
        Functionally similar, but cashback is usually paid back after the purchase (as a statement credit,
        deposit, or points balance), while a discount reduces the price at checkout. The net savings can be
        the same, but the timing differs.
      </Typography>
      <Typography variant="h3">Is cashback taxable?</Typography>
      <Typography variant="body1">
        In most cases, cashback from personal credit card spending is treated as a rebate or discount rather
        than taxable income. Cashback earned through referral bonuses or business rewards can sometimes be
        treated differently — check with a tax professional for your specific situation.
      </Typography>
      <Typography variant="h3">Do cashback rates ever have limits?</Typography>
      <Typography variant="body1">
        Yes — many cards cap bonus-category cashback (e.g., 5% up to $1,500 in spending per quarter) or apply
        the higher rate only to specific categories, reverting to a lower base rate on everything else. Check
        your card&apos;s terms for spending caps.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/cashback-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Purchase Amount"
            type="number"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Cashback Percentage"
            type="number"
            value={cashbackPercent}
            onChange={(e) => setCashbackPercent(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Cashback Earned</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(cashbackEarned)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Effective Cost After Cashback</Typography>
            <Typography fontWeight={600}>{fmt(effectiveCost)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CashbackCalculator;
