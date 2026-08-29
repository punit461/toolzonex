'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const BLOCKS_PER_DAY = 144;
const BLOCK_REWARD_BTC = 3.125;

type HashUnit = 'GH' | 'TH' | 'PH';
const UNIT_TO_HS: Record<HashUnit, number> = { GH: 1e9, TH: 1e12, PH: 1e15 };

const BitcoinMiningCalculatorContent = () => {
  const [hashRate, setHashRate] = useState('110');
  const [hashUnit, setHashUnit] = useState<HashUnit>('TH');
  const [powerWatts, setPowerWatts] = useState('3250');
  const [electricityPrice, setElectricityPrice] = useState('0.12');
  const [poolFee, setPoolFee] = useState('1');
  const [btcPrice, setBtcPrice] = useState('60000');
  const [difficultyT, setDifficultyT] = useState('95000');

  const result = useMemo(() => {
    const hr = (parseFloat(hashRate) || 0) * UNIT_TO_HS[hashUnit];
    const watts = parseFloat(powerWatts) || 0;
    const price = parseFloat(electricityPrice) || 0;
    const fee = parseFloat(poolFee) || 0;
    const btc = parseFloat(btcPrice) || 0;
    const difficulty = (parseFloat(difficultyT) || 0) * 1e12;

    const networkHashRate = difficulty > 0 ? (difficulty * Math.pow(2, 32)) / 600 : 0;
    const dailyBtc = networkHashRate > 0 ? (hr / networkHashRate) * BLOCKS_PER_DAY * BLOCK_REWARD_BTC : 0;
    const dailyRevenue = dailyBtc * btc;
    const poolFeeAmount = dailyRevenue * (fee / 100);
    const netRevenue = dailyRevenue - poolFeeAmount;
    const dailyKwh = (watts / 1000) * 24;
    const dailyElectricityCost = dailyKwh * price;
    const dailyProfit = netRevenue - dailyElectricityCost;

    return {
      dailyBtc,
      dailyRevenue,
      poolFeeAmount,
      dailyElectricityCost,
      dailyProfit,
      monthlyProfit: dailyProfit * 30,
      monthlyBtc: dailyBtc * 30,
    };
  }, [hashRate, hashUnit, powerWatts, electricityPrice, poolFee, btcPrice, difficultyT]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Hash Rate"
            type="number"
            value={hashRate}
            onChange={(e) => setHashRate(e.target.value)}
            fullWidth
          />
          <Select value={hashUnit} onChange={(e) => setHashUnit(e.target.value as HashUnit)} sx={{ minWidth: 100 }}>
            <MenuItem value="GH">GH/s</MenuItem>
            <MenuItem value="TH">TH/s</MenuItem>
            <MenuItem value="PH">PH/s</MenuItem>
          </Select>
        </Box>
        <TextField
          label="Power Consumption"
          type="number"
          value={powerWatts}
          onChange={(e) => setPowerWatts(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
        />
        <TextField
          label="Electricity Cost"
          type="number"
          value={electricityPrice}
          onChange={(e) => setElectricityPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
        />
        <TextField
          label="Pool Fee"
          type="number"
          value={poolFee}
          onChange={(e) => setPoolFee(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <TextField
          label="BTC Price"
          type="number"
          value={btcPrice}
          onChange={(e) => setBtcPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Network Difficulty"
          type="number"
          value={difficultyT}
          onChange={(e) => setDifficultyT(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">T</InputAdornment> } }}
          helperText="Enter in trillions (T). Check a live tracker for the current network difficulty."
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: result.dailyProfit >= 0 ? 'primary.main' : 'error.main', color: 'white' }}>
          <Typography variant="body2">Daily Profit After Electricity</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.dailyProfit)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Estimated BTC Mined / Day</Typography>
          <Typography fontWeight={600}>{result.dailyBtc.toFixed(8)} BTC</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Daily Revenue (Before Fees)</Typography>
          <Typography fontWeight={600}>{money(result.dailyRevenue)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Pool Fee</Typography>
          <Typography fontWeight={600} color="error.main">−{money(result.poolFeeAmount)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Electricity Cost / Day</Typography>
          <Typography fontWeight={600} color="error.main">−{money(result.dailyElectricityCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Estimated Monthly Profit</Typography>
          <Typography fontWeight={600}>{money(result.monthlyProfit)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const BitcoinMiningCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Bitcoin Mining Calculator Work?</Typography>
      <Typography variant="body1">
        Enter your mining hardware&apos;s hash rate, its power draw in watts, your electricity price,
        and your mining pool&apos;s fee. Because the Bitcoin network&apos;s current price and difficulty
        change constantly, you enter both directly rather than the calculator fetching a live value —
        check a current tracker for up-to-date numbers before relying on the result. The calculator
        estimates the network&apos;s total hash rate from the difficulty figure (network hash rate =
        difficulty × 2³² ÷ 600 seconds), works out your share of the roughly 144 blocks found per day at
        the current 3.125 BTC block reward, converts that to a BTC and USD daily revenue, subtracts the
        pool fee, and then subtracts your electricity cost (power in kW × 24 hours × your price per
        kWh) to get an estimated daily and monthly profit.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A miner running 110 TH/s at 3,250 W, paying $0.12/kWh with a 1% pool fee, BTC at $60,000, and a
        network difficulty of 95,000 T, mines a small fraction of a BTC per day. After the pool fee and
        roughly $9.36 of daily electricity (3.25 kW × 24 hours × $0.12), the calculator shows the
        estimated daily and monthly profit after those costs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether a specific ASIC miner is profitable at your local electricity rate.</li>
          <li>Comparing different mining pools by their fee percentage.</li>
          <li>Estimating how rising or falling BTC price and difficulty would change profitability.</li>
          <li>Budgeting monthly electricity costs for a home or farm mining setup.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do I have to enter the BTC price and difficulty myself?</Typography>
      <Typography variant="body1">
        Both values change continuously — difficulty adjusts roughly every two weeks and price moves by
        the minute. Rather than showing a stale or misleading number, this calculator lets you plug in
        current figures from any live tracker or exchange so the estimate reflects today&apos;s
        conditions.
      </Typography>
      <Typography variant="h3">How accurate is this estimate?</Typography>
      <Typography variant="body1">
        It&apos;s a simplified statistical average, not a guarantee. Actual mining income varies with
        luck (block finding is probabilistic), pool payout method, network hash rate growth, and BTC
        price volatility — treat the result as a rough planning figure, not a precise forecast.
      </Typography>
      <Typography variant="h3">Does this account for hardware cost or depreciation?</Typography>
      <Typography variant="body1">
        No — it only estimates ongoing operating profit from electricity and pool fees. The upfront
        cost of mining hardware, cooling, and its depreciation over time are not included and should be
        factored in separately when judging overall return on investment.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/bitcoin-mining-calculator" content={content}>
      <BitcoinMiningCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BitcoinMiningCalculator;
