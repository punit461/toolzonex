'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PositionSizeCalculatorContent = () => {
  const [accountBalance, setAccountBalance] = useState('10000');
  const [riskPercent, setRiskPercent] = useState('1');
  const [entryPrice, setEntryPrice] = useState('150');
  const [stopLossPrice, setStopLossPrice] = useState('145');

  const balance = parseFloat(accountBalance) || 0;
  const risk = parseFloat(riskPercent) || 0;
  const entry = parseFloat(entryPrice) || 0;
  const stop = parseFloat(stopLossPrice) || 0;

  const riskAmount = balance * (risk / 100);
  const priceDiff = entry - stop;
  const positionSize = priceDiff > 0 ? Math.floor(riskAmount / priceDiff) : 0;
  const potentialLoss = positionSize * priceDiff;

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
          label="Entry Price"
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Stop Loss Price"
          type="number"
          value={stopLossPrice}
          onChange={(e) => setStopLossPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Position Size</Typography>
            <Typography variant="h6" fontWeight="bold">{positionSize} shares</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Risk Amount</Typography>
            <Typography variant="body2" fontWeight="bold">${riskAmount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Price Difference</Typography>
            <Typography variant="body2" fontWeight="bold">${priceDiff.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Potential Loss</Typography>
            <Typography variant="body2" fontWeight="bold">${potentialLoss.toFixed(2)}</Typography>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Formula:</strong> Position Size = (Account Balance × Risk%) / (Entry − Stop Loss)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Calculation:</strong> ({balance} × {risk}% / 100) / ({entry} − {stop}) = {positionSize}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const PositionSizeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the position size calculator?</Typography>
      <Typography variant="body1">
        Enter your trading account balance, the percentage of your account you are willing to risk on a single
        trade, the entry price of the stock or asset, and the stop loss price. The calculator determines the
        maximum number of shares you can buy while keeping your risk within the specified percentage.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Position Size = (Account Balance × Risk% / 100) / (Entry Price − Stop Loss Price)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You have a $10,000 account and are willing to risk 1% per trade ($100). You plan to enter at $150 with
        a stop loss at $145 — a $5 risk per share. Dividing the $100 risk budget by $5 gives you a position
        size of 20 shares. If the stock hits your stop loss, you lose exactly $100 (1% of your account).
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if the result is 0 shares?</strong> Your stop loss is too wide for the account size and risk percentage. Either reduce the stop loss distance or increase your risk tolerance.</li>
          <li><strong>Why round down to whole shares?</strong> For stocks, you cannot buy fractional shares with most brokers. The calculator rounds down to the nearest whole share to stay within your risk limit.</li>
          <li><strong>Can I use this for options or forex?</strong> Yes — the formula applies to any trade with a defined entry and stop loss. For forex and options, use the respective contract sizing units instead of whole shares.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Equity swing or day traders sizing positions within a fixed risk budget.</li>
          <li>Account managers calculating maximum position sizes across multiple correlated trades.</li>
          <li>Beginning traders learning to enforce a consistent 1–2% risk rule.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/position-size-calculator" content={content}>
      <PositionSizeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PositionSizeCalculator;
