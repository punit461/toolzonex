'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const LabelPrintingCostCalculator = () => {
  const [labelsPerRoll, setLabelsPerRoll] = useState('500');
  const [pricePerRoll, setPricePerRoll] = useState('18');
  const [totalLabelsNeeded, setTotalLabelsNeeded] = useState('3200');

  const lpr = parseFloat(labelsPerRoll) || 1;
  const ppr = parseFloat(pricePerRoll) || 0;
  const total = parseFloat(totalLabelsNeeded) || 0;

  const rollsNeeded = lpr > 0 ? Math.ceil(total / lpr) : 0;
  const totalCost = rollsNeeded * ppr;
  const costPerLabel = total > 0 ? totalCost / total : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Label Printing Cost Calculator</Typography>
      <Typography variant="body1">
        Enter how many labels come on a roll (500 or 1,000 are common roll sizes, adjustable), the price of a
        roll, and the total number of labels you need. The calculator works out how many full rolls that
        requires, multiplies by the price per roll for a total cost, and divides back down to an effective cost
        per individual label.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Rolls Needed = ⌈Total Labels Needed / Labels per Roll⌉<br />
        Total Cost = Rolls Needed × Price per Roll<br />
        Cost per Label = Total Cost / Total Labels Needed
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Needing 3,200 labels at 500 labels per roll requires 7 rolls (rounding up from 6.4). At $18 per roll,
        that&apos;s a total cost of $126, or about $0.039 per label.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Ordering the right number of shipping label rolls for a fulfillment operation.</li>
          <li>Budgeting product labeling costs for a production run.</li>
          <li>Comparing effective cost-per-label across different roll sizes or supplier prices.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Sticker Printing Cost Calculator?</strong> The Sticker Printing Cost Calculator is for individual custom die-cut stickers, priced per unit with quantity-based discount tiers — a typical small-batch custom order model. This tool instead models bulk roll-based product or shipping labels, priced per roll rather than per individual sticker, which is how labels are typically purchased for higher-volume operational use like shipping or product packaging.</li>
          <li><strong>Why round rolls up instead of buying a partial roll?</strong> Rolls are sold as a fixed physical unit — you can't buy a fraction of a roll — so rounding up to the next whole roll ensures you have enough labels, with the small leftover surplus available for your next batch.</li>
          <li><strong>Does a larger roll size always lower cost per label?</strong> Not necessarily by itself — it depends on the price of that larger roll. Compare the total cost and resulting cost-per-label across different roll sizes and their respective prices to find the most economical option for your volume.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/label-printing-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Labels per Roll" type="number" value={labelsPerRoll} onChange={(e) => setLabelsPerRoll(e.target.value)} fullWidth />
          <TextField
            label="Price per Roll"
            type="number"
            value={pricePerRoll}
            onChange={(e) => setPricePerRoll(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField label="Total Labels Needed" type="number" value={totalLabelsNeeded} onChange={(e) => setTotalLabelsNeeded(e.target.value)} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Rolls Needed</Typography>
              <Typography variant="h6" fontWeight="bold">{rollsNeeded}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total Cost</Typography>
              <Typography variant="h6" fontWeight="bold">{money(totalCost)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Cost per Label</Typography>
              <Typography variant="h6" fontWeight="bold">{money(costPerLabel)}</Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LabelPrintingCostCalculator;
