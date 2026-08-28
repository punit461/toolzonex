'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LotSizeCalculatorContent = () => {
  const [accountBalance, setAccountBalance] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('1');
  const [stopLossPips, setStopLossPips] = useState('50');
  const [pipValue, setPipValue] = useState('10');

  const balance = parseFloat(accountBalance) || 0;
  const risk = parseFloat(riskPercent) || 0;
  const slPips = parseFloat(stopLossPips) || 0;
  const pValue = parseFloat(pipValue) || 0;

  const riskAmount = balance * (risk / 100);
  const lotSize = slPips > 0 && pValue > 0 ? riskAmount / (slPips * pValue) : 0;
  const roundedLot = Math.floor(lotSize * 100) / 100;
  const units = roundedLot * 100000;
  const potentialLoss = roundedLot * slPips * pValue;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Account Balance"
          type="number"
          value={accountBalance}
          onChange={(e) => setAccountBalance(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Risk Per Trade"
          type="number"
          value={riskPercent}
          onChange={(e) => setRiskPercent(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <TextField
          label="Stop Loss"
          type="number"
          value={stopLossPips}
          onChange={(e) => setStopLossPips(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">pips</InputAdornment> } }}
        />
        <TextField
          label="Pip Value"
          type="number"
          value={pipValue}
          onChange={(e) => setPipValue(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/pip</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Lot Size</Typography>
            <Typography variant="h6" fontWeight="bold">{roundedLot.toFixed(2)} lots</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Units</Typography>
            <Typography variant="body2" fontWeight="bold">{units.toLocaleString()} units</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Risk Amount</Typography>
            <Typography variant="body2" fontWeight="bold">${riskAmount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Potential Loss</Typography>
            <Typography variant="body2" fontWeight="bold">${potentialLoss.toFixed(2)}</Typography>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Formula:</strong> Lot Size = Risk Amount / (Stop Loss in Pips × Pip Value)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Standard lot</strong> = 100,000 units &nbsp;|&nbsp; <strong>Mini lot</strong> = 10,000 units &nbsp;|&nbsp; <strong>Micro lot</strong> = 1,000 units
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const LotSizeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the lot size calculator?</Typography>
      <Typography variant="body1">
        Enter your account balance, the percentage you are willing to risk per trade, the stop loss distance
        in pips, and the value of one pip for your chosen currency pair. The calculator shows the maximum
        lot size you can trade while staying within your risk budget.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Lot Size = (Account Balance × Risk% / 100) / (Stop Loss Pips × Pip Value per Pip)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a $10,000 account, 1% risk ($100), a 50-pip stop loss, and a pip value of $10, the maximum lot
        size is 100 / (50 × 10) = 0.20 lots (20,000 units). A loss at the stop would cost exactly $100,
        keeping your risk within the 1% rule.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a pip?</strong> A pip (percentage in point) is the smallest standard price move in forex. For most pairs it is 0.0001; for JPY pairs it is 0.01.</li>
          <li><strong>How do I find the pip value?</strong> Pip value depends on the pair, lot size, and your account currency. Many brokers display it in the trade ticket; otherwise it can be calculated from the exchange rate.</li>
          <li><strong>Does this work for crypto CFDs?</strong> Yes — substitute the pip (tick) size and per-tick value for the specific crypto instrument.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Forex traders sizing standard, mini, or micro lots before placing a trade.</li>
          <li>Beginners learning to cap trade risk at a fixed percentage of their account.</li>
          <li>Comparing lot sizes across different currency pairs with different pip values.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/lot-size-calculator" content={content}>
      <LotSizeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LotSizeCalculator;
