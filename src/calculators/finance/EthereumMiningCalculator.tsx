'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const EthereumMiningCalculatorContent = () => {
  const [stakeAmount, setStakeAmount] = useState('32');
  const [ethPrice, setEthPrice] = useState('3000');
  const [apy, setApy] = useState('3.5');
  const [serviceFee, setServiceFee] = useState('10');

  const result = useMemo(() => {
    const stake = parseFloat(stakeAmount) || 0;
    const price = parseFloat(ethPrice) || 0;
    const rate = (parseFloat(apy) || 0) / 100;
    const fee = (parseFloat(serviceFee) || 0) / 100;

    const grossAnnualEth = stake * rate;
    const netAnnualEth = grossAnnualEth * (1 - fee);
    const netMonthlyEth = netAnnualEth / 12;
    const netDailyEth = netAnnualEth / 365;

    return {
      grossAnnualEth,
      netAnnualEth,
      netMonthlyEth,
      netDailyEth,
      netAnnualUsd: netAnnualEth * price,
      netMonthlyUsd: netMonthlyEth * price,
      stakeValueUsd: stake * price,
    };
  }, [stakeAmount, ethPrice, apy, serviceFee]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Stake Amount"
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">ETH</InputAdornment> } }}
        />
        <TextField
          label="ETH Price"
          type="number"
          value={ethPrice}
          onChange={(e) => setEthPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Annual Staking APY"
          type="number"
          value={apy}
          onChange={(e) => setApy(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <TextField
          label="Staking Service Fee"
          type="number"
          value={serviceFee}
          onChange={(e) => setServiceFee(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          helperText="Fee charged by a staking pool or exchange, if used. Set to 0 for solo/self-run validators."
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Estimated Annual Reward (Net of Fees)</Typography>
          <Typography variant="h3" fontWeight="bold">{result.netAnnualEth.toFixed(4)} ETH</Typography>
          <Typography variant="body2">{money(result.netAnnualUsd)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Estimated Monthly Reward</Typography>
          <Typography fontWeight={600}>{result.netMonthlyEth.toFixed(4)} ETH ({money(result.netMonthlyUsd)})</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Estimated Daily Reward</Typography>
          <Typography fontWeight={600}>{result.netDailyEth.toFixed(6)} ETH</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Gross Annual Reward (Before Fee)</Typography>
          <Typography fontWeight={600} color="text.secondary">{result.grossAnnualEth.toFixed(4)} ETH</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Current Stake Value</Typography>
          <Typography fontWeight={600}>{money(result.stakeValueUsd)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const EthereumMiningCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Why Is This a Staking Calculator, Not a Mining Calculator?</Typography>
      <Typography variant="body1">
        Ethereum moved from Proof-of-Work mining to Proof-of-Stake in September 2022 (an upgrade known
        as &quot;The Merge&quot;). Traditional GPU mining no longer works on Ethereum mainnet — there
        are no blocks left to mine with graphics cards. Earning ETH rewards today means staking:
        locking up ETH to help validate the network, either by running your own validator (which
        requires 32 ETH) or by joining a staking pool or exchange staking product that pools smaller
        amounts together, typically for a service fee. This calculator estimates staking rewards
        instead of describing a mining process that no longer applies.
      </Typography>

      <Typography variant="h2">How the Estimate Is Calculated</Typography>
      <Typography variant="body1">
        Enter the amount of ETH you plan to stake, the current ETH price, the annual percentage yield
        (APY) your validator or staking provider is offering, and any service fee the provider charges.
        The calculator multiplies your stake by the APY to get a gross annual reward, subtracts the
        service fee, and breaks the net result down into annual, monthly, and daily ETH and USD
        figures.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Staking 32 ETH at a 3.5% APY through a pool with a 10% service fee earns a gross 1.12 ETH per
        year. After the fee, the net reward is about 1.008 ETH annually — roughly 0.084 ETH per month —
        worth around $3,024 at a $3,000 ETH price.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing staking APY offers across different exchanges or staking pools.</li>
          <li>Estimating the passive income potential of running a solo Ethereum validator.</li>
          <li>Deciding whether a pool&apos;s service fee is worth the convenience of lower minimums.</li>
          <li>Projecting monthly staking income for tax or budgeting purposes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I still mine Ethereum with a GPU?</Typography>
      <Typography variant="body1">
        Not on Ethereum mainnet — mining ended with the Merge in September 2022. Some GPU miners moved
        to mining other proof-of-work coins instead, but Ethereum itself is validated entirely through
        staking now.
      </Typography>
      <Typography variant="h3">How accurate is this staking reward estimate?</Typography>
      <Typography variant="body1">
        It&apos;s a simplified projection, not a guarantee. Actual staking APY fluctuates with total
        network stake and protocol parameters, ETH&apos;s price is highly volatile, and validators can
        face penalties (slashing) for downtime or misbehavior that reduce real returns below the
        estimate.
      </Typography>
      <Typography variant="h3">What is the minimum to start staking?</Typography>
      <Typography variant="body1">
        Running your own validator requires exactly 32 ETH. Staking pools and most exchanges let you
        stake much smaller amounts by pooling funds with other users, usually in exchange for a service
        fee that reduces your net yield.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/ethereum-mining-calculator" content={content}>
      <EthereumMiningCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EthereumMiningCalculator;
