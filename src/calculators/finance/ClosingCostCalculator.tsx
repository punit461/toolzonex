'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ClosingCostCalculator = () => {
  const [price, setPrice] = useState('350000');
  const [closingPct, setClosingPct] = useState('3');
  const [downPct, setDownPct] = useState('20');

  const result = useMemo(() => {
    const p = parseFloat(price) || 0;
    const cPct = parseFloat(closingPct) || 0;
    const dPct = parseFloat(downPct) || 0;

    const closingCost = p * (cPct / 100);
    const downPayment = p * (dPct / 100);
    const totalCash = closingCost + downPayment;

    return { closingCost, downPayment, totalCash };
  }, [price, closingPct, downPct]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Closing Cost Calculator</Typography>
      <Typography variant="body1">
        Enter the home&apos;s purchase price and an estimated closing cost percentage — typically 2-5% of the
        purchase price in the US, covering things like lender fees, title insurance, appraisal fees, and
        recording fees. Add a down payment percentage as well to see the total cash you&apos;d need to bring to
        closing, combining both the down payment and the closing costs.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Estimated Closing Costs = Purchase Price × Closing Cost %
        <br />
        Total Cash Needed = Down Payment + Estimated Closing Costs
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        On a $350,000 home with an estimated 3% closing cost rate and a 20% down payment: closing costs =
        $350,000 × 0.03 = $10,500, and down payment = $350,000 × 0.20 = $70,000. Total cash needed at closing =
        $70,000 + $10,500 = $80,500.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting how much cash you&apos;ll need on hand before making an offer on a home.</li>
          <li>Comparing total upfront cash needed across homes at different price points.</li>
          <li>Getting a rough closing cost estimate before receiving an official loan estimate from a lender.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How accurate is the closing cost percentage?</strong> This is a rough estimate only — actual closing costs vary by state, lender, loan type, and even the specific title company or attorney involved. Your lender is required to provide an official Loan Estimate with itemized costs once you apply for a mortgage.</li>
          <li><strong>What&apos;s typically included in closing costs?</strong> Common items include loan origination fees, appraisal and inspection fees, title search and title insurance, recording fees, and prepaid items like property taxes and homeowners insurance held in escrow.</li>
          <li><strong>Do closing costs differ for buyers and sellers?</strong> Yes — this calculator estimates buyer-side closing costs. Sellers typically pay their own separate costs, most notably real estate agent commissions, which are not included here.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/closing-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Home Purchase Price" type="number" value={price}
            onChange={(e) => setPrice(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Estimated Closing Cost %" type="number" value={closingPct}
            onChange={(e) => setClosingPct(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            helperText="Typical US range is 2-5%"
          />
          <TextField
            label="Down Payment % (optional)" type="number" value={downPct}
            onChange={(e) => setDownPct(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Cash Needed at Closing</Typography>
            <Typography variant="h4" fontWeight="bold">{money(result.totalCash)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Down Payment</Typography>
            <Typography fontWeight={600}>{money(result.downPayment)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated Closing Costs</Typography>
            <Typography fontWeight={600}>{money(result.closingCost)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ClosingCostCalculator;
