'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const RiskRewardCalculator = () => {
  const [entryPrice, setEntryPrice] = useState('50');
  const [stopLoss, setStopLoss] = useState('47');
  const [takeProfit, setTakeProfit] = useState('59');

  const result = useMemo(() => {
    const entry = parseFloat(entryPrice) || 0;
    const stop = parseFloat(stopLoss) || 0;
    const target = parseFloat(takeProfit) || 0;

    const risk = Math.abs(entry - stop);
    const reward = Math.abs(target - entry);
    const ratio = risk > 0 ? reward / risk : null;
    const isLong = target >= entry;

    return { risk, reward, ratio, isLong };
  }, [entryPrice, stopLoss, takeProfit]);

  const content = (
    <>
      <Typography variant="h2">How the Risk:Reward Ratio Is Calculated</Typography>
      <Typography variant="body1">
        Risk is the distance between your entry price and your stop-loss — the amount you stand to lose
        if the trade goes against you. Reward is the distance between your entry price and your
        take-profit target — the amount you stand to gain if the trade works out. Dividing reward by
        risk gives the risk:reward ratio, a quick check on whether a trade&apos;s potential payoff
        justifies its potential loss.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Risk = |Entry Price − Stop-Loss Price|
        <br />
        Reward = |Take-Profit Price − Entry Price|
        <br />
        Risk:Reward Ratio = Reward / Risk
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Buying a stock at $50 with a stop-loss at $47 and a take-profit target at $59 puts your risk at
        $3 per share and your reward at $9 per share — a 1:3 risk:reward ratio. That means for every $1
        risked, the trade targets $3 in potential gain.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Screening trade setups before entering a position.</li>
          <li>Setting stop-loss and take-profit levels that match a target ratio.</li>
          <li>Comparing multiple trade ideas by their risk:reward profile.</li>
          <li>Sizing positions consistently as part of a trading plan.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is considered a good risk:reward ratio?</Typography>
      <Typography variant="body1">
        Many traders look for at least 1:2 or 1:3, meaning the potential reward is two to three times
        the risk. A favorable ratio means the trade can still be profitable over time even if it wins
        less than half the time.
      </Typography>
      <Typography variant="h3">Does a good ratio guarantee a profitable trade?</Typography>
      <Typography variant="body1">
        No — the ratio only measures the potential payoff structure, not the probability of the trade
        hitting the target versus the stop. A favorable ratio combined with a reasonable win rate is
        what produces long-term profitability.
      </Typography>
      <Typography variant="h3">How does this work for a short trade?</Typography>
      <Typography variant="body1">
        The calculator uses absolute distances, so it works the same way whether the take-profit is
        above the entry (a long trade) or below it (a short trade) — just make sure the stop-loss and
        take-profit are entered on the correct sides of your entry price.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/risk-reward-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Entry Price"
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Stop-Loss Price"
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Take-Profit Price"
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          {!result.isLong && (
            <Alert severity="info">
              Take-profit is below entry — treated as a short trade. Risk and reward are calculated
              using absolute price distances.
            </Alert>
          )}
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Risk:Reward Ratio</Typography>
            <Typography variant="h3" fontWeight="bold">
              {result.ratio !== null ? `1 : ${result.ratio.toFixed(2)}` : '--'}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Risk per Share</Typography>
            <Typography fontWeight={600} color="error.main">{fmt(result.risk)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Reward per Share</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(result.reward)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RiskRewardCalculator;
