'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const DownPaymentCalculator = () => {
  const [mode, setMode] = useState<'percent' | 'amount'>('percent');
  const [purchasePrice, setPurchasePrice] = useState('350000');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [downPaymentAmount, setDownPaymentAmount] = useState('70000');

  const { finalDownPayment, finalPercent, loanAmount } = useMemo(() => {
    const price = parseFloat(purchasePrice) || 0;
    if (mode === 'percent') {
      const pct = parseFloat(downPaymentPercent) || 0;
      const amt = (price * pct) / 100;
      return { finalDownPayment: amt, finalPercent: pct, loanAmount: price - amt };
    } else {
      const amt = parseFloat(downPaymentAmount) || 0;
      const pct = price > 0 ? (amt / price) * 100 : 0;
      return { finalDownPayment: amt, finalPercent: pct, loanAmount: price - amt };
    }
  }, [mode, purchasePrice, downPaymentPercent, downPaymentAmount]);

  const content = (
    <>
      <Typography variant="h2">How the Down Payment Calculator Works</Typography>
      <Typography variant="body1">
        Enter the purchase price of a home or big-ticket item along with either a down payment percentage or
        a fixed down payment amount. The calculator computes the missing value and shows the remaining loan
        amount you&apos;ll need to finance.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Down Payment = Purchase Price × Down Payment %
        <br />
        Remaining Loan Amount = Purchase Price − Down Payment
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        On a $350,000 home with a 20% down payment, you&apos;d put down $70,000 and finance the remaining
        $280,000. Putting down 10% instead would require $35,000 upfront, leaving $315,000 to borrow — a
        larger loan, likely with private mortgage insurance required.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning how much cash you need saved before buying a home.</li>
          <li>Comparing loan amounts across different down payment scenarios.</li>
          <li>Checking whether a down payment clears the 20% threshold that avoids PMI on conventional loans.</li>
          <li>Budgeting for a car, boat, or other large purchase requiring a deposit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is 20% often mentioned for down payments?</Typography>
      <Typography variant="body1">
        On conventional US mortgages, putting down at least 20% typically avoids private mortgage insurance
        (PMI), an added monthly cost lenders charge to protect themselves on smaller down payments.
      </Typography>
      <Typography variant="h3">Can I buy a home with less than 20% down?</Typography>
      <Typography variant="body1">
        Yes — many loan programs allow 3-10% down, and some government-backed loans (FHA, VA, USDA) allow even
        less. You&apos;ll usually pay mortgage insurance until you build enough equity.
      </Typography>
      <Typography variant="h3">Does a bigger down payment always make sense?</Typography>
      <Typography variant="body1">
        Not always. A larger down payment reduces your loan and interest costs, but tying up more cash upfront
        means less liquidity for emergencies or other investments — weigh both sides before deciding.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/down-payment-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Purchase Price"
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, val) => val && setMode(val)}
            size="small"
            fullWidth
          >
            <ToggleButton value="percent">By Percentage</ToggleButton>
            <ToggleButton value="amount">By Amount</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'percent' ? (
            <TextField
              label="Down Payment Percentage"
              type="number"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          ) : (
            <TextField
              label="Down Payment Amount"
              type="number"
              value={downPaymentAmount}
              onChange={(e) => setDownPaymentAmount(e.target.value)}
              fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Down Payment</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(finalDownPayment)}</Typography>
            <Typography variant="body2">{finalPercent.toFixed(1)}% of purchase price</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Remaining Loan Amount</Typography>
            <Typography fontWeight={600}>{fmt(loanAmount)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DownPaymentCalculator;
