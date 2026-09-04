'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const StartupEquityCalculatorContent = () => {
  const [grantedShares, setGrantedShares] = useState('10000');
  const [totalShares, setTotalShares] = useState('10000000');
  const [valuation, setValuation] = useState('20000000');

  const result = useMemo(() => {
    const granted = parseFloat(grantedShares) || 0;
    const total = parseFloat(totalShares) || 0;
    const val = parseFloat(valuation) || 0;

    const ownershipPct = total > 0 ? (granted / total) * 100 : 0;
    const sharePrice = total > 0 ? val / total : 0;
    const grantValue = granted * sharePrice;

    return { ownershipPct, sharePrice, grantValue };
  }, [grantedShares, totalShares, valuation]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Shares / Options Offered"
          type="number"
          value={grantedShares}
          onChange={(e) => setGrantedShares(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
        />
        <TextField
          label="Total Company Shares Outstanding"
          type="number"
          value={totalShares}
          onChange={(e) => setTotalShares(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
        />
        <TextField
          label="Current Company Valuation"
          type="number"
          value={valuation}
          onChange={(e) => setValuation(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Grant Value</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.grantValue)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Ownership Percentage</Typography>
          <Typography fontWeight={600}>{result.ownershipPct.toFixed(4)}%</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Implied Share Price</Typography>
          <Typography fontWeight={600}>{money(result.sharePrice)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const StartupEquityCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Startup Equity Calculator Works</Typography>
      <Typography variant="body1">
        Enter the number of shares or stock options offered in your grant, the company&apos;s total shares
        outstanding, and the company&apos;s current valuation (or use a valuation equal to a known share price
        times total shares). The calculator divides your grant by total shares to get your ownership
        percentage, then multiplies that percentage by the valuation to estimate the grant&apos;s current
        dollar value.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Ownership % = Shares Granted ÷ Total Shares Outstanding
      </Box>
      <Typography variant="body1">
        Most startup equity grants also vest over time rather than being handed over all at once — a common
        structure is a 4-year vesting schedule with a 1-year cliff, meaning you receive nothing until you&apos;ve
        stayed one full year, then typically 25% vests at once, with the rest vesting monthly or quarterly over
        the remaining three years.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A grant of 10,000 shares out of 10,000,000 total shares outstanding is 0.1% ownership. At a $20 million
        valuation, that implies a share price of $2.00, making the grant worth 10,000 × $2.00 = $20,000 once
        fully vested.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Evaluating a job offer that includes stock options or restricted stock.</li>
          <li>Understanding what percentage of a company an equity grant actually represents.</li>
          <li>Comparing equity offers between different startup opportunities.</li>
          <li>Estimating potential upside if the company&apos;s valuation grows before an exit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this dollar value guaranteed?</Typography>
      <Typography variant="body1">
        No — this is an estimate based on the company&apos;s current valuation, which can rise, fall, or go to
        zero. Private company valuations are also inherently uncertain until a liquidity event like an
        acquisition or IPO actually occurs.
      </Typography>
      <Typography variant="h3">What is a vesting cliff?</Typography>
      <Typography variant="body1">
        A cliff is a minimum period (commonly one year) you must stay before any of your equity vests at all.
        If you leave before the cliff, you typically forfeit the entire grant, even if it&apos;s been several
        months.
      </Typography>
      <Typography variant="h3">Does dilution affect my ownership percentage over time?</Typography>
      <Typography variant="body1">
        Yes — when a company issues new shares (for example, in a future funding round), total shares
        outstanding increases, which dilutes existing shareholders&apos; percentage ownership unless they
        receive additional shares to offset it. Re-run this calculator with an updated total-shares figure to
        see your diluted ownership after a new round.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/startup-equity-calculator" content={content}>
      <StartupEquityCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StartupEquityCalculator;
