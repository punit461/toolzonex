'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CashbackVsDiscountCalculator = () => {
  const [price, setPrice] = useState('1000');
  const [discountPct, setDiscountPct] = useState('10');
  const [cashbackPct, setCashbackPct] = useState('12');

  const p = parseFloat(price);
  const d = parseFloat(discountPct);
  const c = parseFloat(cashbackPct);
  const valid = [p, d, c].every((v) => !isNaN(v)) && p >= 0;

  const discountCost = valid ? p * (1 - d / 100) : 0;
  const cashbackCost = valid ? p * (1 - c / 100) : 0;

  const discountWins = discountCost < cashbackCost;
  const difference = Math.abs(discountCost - cashbackCost);

  const content = (
    <>
      <Typography variant="h2">How to Use the Cashback vs Discount Calculator</Typography>
      <Typography variant="body1">
        When you&apos;re choosing between a straight discount and a cashback offer, the better deal isn&apos;t
        always obvious since the percentages aren&apos;t always equal. Enter the purchase price, the discount
        percentage being offered, and the cashback percentage being offered, and the calculator computes
        the effective final cost under each option so you can directly compare which one actually saves
        you more.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Discount Effective Cost = Price × (1 − Discount %)<br />
        Cashback Effective Cost = Price × (1 − Cashback %)
      </Box>
      <Typography variant="body1">
        This is a simplified, apples-to-apples comparison assuming both amounts are received identically —
        see the FAQ below for real-world factors that can change the actual value of cashback.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $1,000 purchase with a 10% discount option costs $900 upfront. A 12% cashback offer on the same
        purchase has an effective cost of $880 — a better deal by $20, assuming the cashback is received in
        full and without delay.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding between a retailer&apos;s instant discount and a credit card or portal&apos;s cashback offer on the same purchase.</li>
          <li>Comparing a store credit card&apos;s cashback rewards rate against a competing store&apos;s sale discount.</li>
          <li>Quickly checking which of two promotions actually saves more money before checking out.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Cashback Calculator?</strong> The Cashback Calculator only calculates the cashback earned on a purchase and the resulting effective cost, in isolation. This tool specifically compares a cashback offer AGAINST an alternative discount offer side by side, to help you decide which one actually saves more money on the same purchase.</li>
          <li><strong>Why might cashback be worth less in practice than this calculator suggests?</strong> Real-world cashback often comes with delays (paid out weeks or months later, unlike an instant discount), spending caps on bonus categories, minimum redemption thresholds, or exclusions — an instant discount has none of these restrictions. This calculator gives a simplified, ideal-case comparison; weigh these real-world factors before deciding.</li>
          <li><strong>Which option is generally safer if the percentages are close?</strong> An instant discount is generally the safer choice when the two effective costs are close, since it reduces your cost immediately and with certainty, while cashback depends on you actually receiving and being able to use the rebate later.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/cashback-vs-discount-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField
            label="Purchase Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Discount Offer"
            type="number"
            value={discountPct}
            onChange={(e) => setDiscountPct(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Cashback Offer"
            type="number"
            value={cashbackPct}
            onChange={(e) => setCashbackPct(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Better Option</Typography>
            <Typography variant="h4" fontWeight="bold">{valid ? (discountWins ? 'Discount' : 'Cashback') : '—'}</Typography>
            <Typography variant="body2">{valid ? `saves ${money(difference)} more` : ''}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Discount Effective Cost</Typography>
            <Typography fontWeight={600}>{valid ? money(discountCost) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Cashback Effective Cost</Typography>
            <Typography fontWeight={600}>{valid ? money(cashbackCost) : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CashbackVsDiscountCalculator;
