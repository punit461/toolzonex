'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const InterestCoverageRatioCalculatorContent = () => {
  const [ebit, setEbit] = useState('200000');
  const [interestExpense, setInterestExpense] = useState('60000');

  const result = useMemo(() => {
    const e = parseFloat(ebit) || 0;
    const i = parseFloat(interestExpense) || 0;
    const ratio = i > 0 ? e / i : 0;
    return { ratio };
  }, [ebit, interestExpense]);

  const status = result.ratio >= 3 ? 'Healthy' : result.ratio >= 1.5 ? 'Moderate' : 'Weak';
  const statusColor = result.ratio >= 3 ? 'success.main' : result.ratio >= 1.5 ? 'warning.main' : 'error.main';

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="EBIT (Earnings Before Interest & Tax)"
          type="number"
          value={ebit}
          onChange={(e) => setEbit(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Interest Expense"
          type="number"
          value={interestExpense}
          onChange={(e) => setInterestExpense(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Interest only — not principal repayment"
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Interest Coverage Ratio</Typography>
          <Typography variant="h3" fontWeight="bold">{result.ratio.toFixed(2)}x</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Status</Typography>
          <Typography fontWeight={600} sx={{ color: statusColor }}>{status}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const InterestCoverageRatioCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Interest Coverage Ratio Is Calculated</Typography>
      <Typography variant="body1">
        The interest coverage ratio measures how easily a business can pay the interest on its outstanding
        debt from its operating earnings. Enter EBIT (earnings before interest and tax) and total interest
        expense for the period, and this calculator divides one by the other.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Interest Coverage Ratio = EBIT ÷ Interest Expense
      </Box>
      <Typography variant="body1">
        A ratio of 2-3x or higher is often cited as a common threshold for healthy interest coverage, meaning
        operating earnings comfortably exceed interest obligations. A ratio below 1.5x is generally seen as a
        warning sign, and below 1.0x means earnings don&apos;t even cover interest payments.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This is the simpler, more commonly cited coverage metric because it only looks at interest expense. The
        Debt Service Coverage Ratio (DSCR) is a related but stricter metric that divides income by total annual
        debt service — principal repayment plus interest combined — so DSCR is typically a lower, more
        conservative number than the interest coverage ratio for the same business.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with $200,000 in EBIT and $60,000 in annual interest expense has an interest coverage ratio
        of 200,000 ÷ 60,000 ≈ 3.33x — comfortably above the commonly cited 2-3x healthy threshold.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing a company&apos;s ability to service its debt from operating earnings.</li>
          <li>Screening potential investments or loan applicants for financial risk.</li>
          <li>Tracking a company&apos;s coverage trend over time as debt or earnings change.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s a healthy interest coverage ratio?</Typography>
      <Typography variant="body1">
        A ratio of 2x to 3x or higher is commonly cited as healthy, though acceptable levels vary by industry
        and how cyclical or stable a company&apos;s earnings are. Capital-intensive industries with steady cash
        flows can sometimes operate safely at lower ratios than volatile-earnings businesses.
      </Typography>
      <Typography variant="h3">How is this different from the Debt Service Coverage Ratio (DSCR)?</Typography>
      <Typography variant="body1">
        This ratio divides EBIT by interest expense only. DSCR divides net operating income by total annual
        debt service, which includes both principal and interest. Because DSCR&apos;s denominator is larger, it
        typically produces a lower, more conservative ratio than interest coverage for the same business.
      </Typography>
      <Typography variant="h3">What does a ratio below 1.0x mean?</Typography>
      <Typography variant="body1">
        It means operating earnings aren&apos;t even sufficient to cover interest payments, which is a serious
        red flag that typically requires drawing on cash reserves, additional financing, or asset sales to stay
        current on debt.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/interest-coverage-ratio-calculator" content={content}>
      <InterestCoverageRatioCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InterestCoverageRatioCalculator;
