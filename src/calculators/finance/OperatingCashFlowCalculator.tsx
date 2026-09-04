'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `${v < 0 ? '-' : ''}$${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const OperatingCashFlowCalculator = () => {
  const [netIncome, setNetIncome] = useState('120000');
  const [depreciation, setDepreciation] = useState('25000');
  const [wcChange, setWcChange] = useState('10000');

  const result = useMemo(() => {
    const ni = parseFloat(netIncome) || 0;
    const da = parseFloat(depreciation) || 0;
    const wc = parseFloat(wcChange) || 0;
    const ocf = ni + da - wc;
    return { ocf };
  }, [netIncome, depreciation, wcChange]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Operating Cash Flow Calculator</Typography>
      <Typography variant="body1">
        Operating cash flow (OCF) adjusts net income for non-cash items and changes in working capital to show
        the actual cash a business generated from its core operations. Depreciation and amortization are added
        back because they reduce net income without using any cash. Working capital changes are subtracted
        because tying up more cash in things like receivables or inventory reduces the cash actually available,
        even though it doesn&apos;t appear as an expense on the income statement.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        OCF = Net Income + Depreciation &amp; Amortization − Increase in Working Capital
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company reports $120,000 net income, $25,000 of depreciation and amortization, and a $10,000 increase
        in working capital during the period. OCF = 120,000 + 25,000 − 10,000 = $135,000 of cash generated from
        operations.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a company&apos;s reported profit is backed by real cash generation.</li>
          <li>Comparing operating cash flow to net income to spot aggressive accrual accounting.</li>
          <li>Building a quick cash flow statement estimate for internal financial review.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What sign should I use for the working capital change?</strong> Enter a positive number if working capital increased during the period (which reduces cash flow), and a negative number if it decreased (which increases cash flow). The field label reminds you of this convention — it&apos;s the most common source of error in this calculation.</li>
          <li><strong>Why isn&apos;t operating cash flow the same as net income?</strong> Net income includes non-cash items like depreciation and is affected by accrual accounting timing (recording revenue or expenses before cash actually changes hands). OCF strips those effects out to show real cash movement from day-to-day operations.</li>
          <li><strong>Does OCF include capital expenditures or financing activities?</strong> No — operating cash flow covers only core business operations. Capital expenditures fall under investing activities, and things like debt repayment or dividends fall under financing activities, both reported separately on a full cash flow statement.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/operating-cash-flow-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Net Income" type="number" value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Depreciation &amp; Amortization" type="number" value={depreciation}
            onChange={(e) => setDepreciation(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Change in Working Capital (increase = enter positive)" type="number" value={wcChange}
            onChange={(e) => setWcChange(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            helperText="A positive number here reduces operating cash flow; a negative number increases it"
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Operating Cash Flow</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.ocf)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OperatingCashFlowCalculator;
