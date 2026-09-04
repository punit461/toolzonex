'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DebtServiceCoverageRatioCalculatorContent = () => {
  const [noi, setNoi] = useState('150000');
  const [debtService, setDebtService] = useState('110000');

  const result = useMemo(() => {
    const n = parseFloat(noi) || 0;
    const d = parseFloat(debtService) || 0;
    const dscr = d > 0 ? n / d : 0;
    return { dscr };
  }, [noi, debtService]);

  const status = result.dscr >= 1.25 ? 'Healthy' : result.dscr >= 1 ? 'Marginal' : 'Below 1.0';
  const statusColor = result.dscr >= 1.25 ? 'success.main' : result.dscr >= 1 ? 'warning.main' : 'error.main';

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Net Operating Income (NOI)"
          type="number"
          value={noi}
          onChange={(e) => setNoi(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Total Annual Debt Service"
          type="number"
          value={debtService}
          onChange={(e) => setDebtService(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Total annual loan payments (principal + interest)"
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">DSCR</Typography>
          <Typography variant="h3" fontWeight="bold">{result.dscr.toFixed(2)}x</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Status</Typography>
          <Typography fontWeight={600} sx={{ color: statusColor }}>{status}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const DebtServiceCoverageRatioCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the DSCR Calculator Works</Typography>
      <Typography variant="body1">
        The Debt Service Coverage Ratio (DSCR) measures whether a business or property generates enough
        income to cover its debt payments. Enter the net operating income (NOI) and the total annual debt
        service (all principal and interest payments due over the year), and this calculator divides one by
        the other.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        DSCR = Net Operating Income ÷ Total Annual Debt Service
      </Box>
      <Typography variant="body1">
        Lenders commonly look for a minimum DSCR around 1.25x, meaning income covers debt payments with a 25%
        cushion — though the exact minimum varies by lender, loan type, and industry. A DSCR below 1.0 means
        income isn&apos;t enough to cover debt payments at all.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a net operating income of $150,000 and total annual debt service of $110,000, DSCR = 150,000 ÷
        110,000 ≈ 1.36x — comfortably above the common 1.25x lender minimum.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a rental property or business qualifies for a commercial loan.</li>
          <li>Preparing financial documentation ahead of a lender&apos;s underwriting review.</li>
          <li>Monitoring an existing loan&apos;s DSCR covenant to avoid a technical default.</li>
          <li>Comparing the debt coverage strength of different investment properties or deals.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What DSCR do lenders typically require?</Typography>
      <Typography variant="body1">
        Many commercial and DSCR-loan lenders look for a minimum around 1.25x, though requirements range from
        roughly 1.0x to 1.5x or higher depending on the lender, property type, loan program, and perceived
        risk of the deal.
      </Typography>
      <Typography variant="h3">What does a DSCR below 1.0 mean?</Typography>
      <Typography variant="body1">
        A DSCR below 1.0 means net operating income isn&apos;t sufficient to cover the debt payments on its
        own, which would require drawing on cash reserves or other income sources to stay current — a red
        flag for most lenders.
      </Typography>
      <Typography variant="h3">How do I calculate net operating income?</Typography>
      <Typography variant="body1">
        NOI is typically total revenue minus operating expenses, excluding debt payments, income taxes,
        depreciation, and capital expenditures. For a rental property, that&apos;s rental income minus expenses
        like maintenance, insurance, property management, and property taxes.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/debt-service-coverage-ratio-calculator" content={content}>
      <DebtServiceCoverageRatioCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DebtServiceCoverageRatioCalculator;
