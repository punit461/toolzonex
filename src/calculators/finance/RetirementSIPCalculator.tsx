'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const RetirementSIPCalculator = () => {
  const [monthlySip, setMonthlySip] = useState('500');
  const [expectedReturn, setExpectedReturn] = useState('10');
  const [years, setYears] = useState('25');

  const { corpus, totalInvested, totalGrowth } = useMemo(() => {
    const p = parseFloat(monthlySip) || 0;
    const annualRate = (parseFloat(expectedReturn) || 0) / 100;
    const r = annualRate / 12;
    const n = (parseFloat(years) || 0) * 12;

    const fv = r > 0 && n > 0 ? p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : p * n;
    const invested = p * n;
    return { corpus: fv, totalInvested: invested, totalGrowth: fv - invested };
  }, [monthlySip, expectedReturn, years]);

  const content = (
    <>
      <Typography variant="h2">How the Retirement SIP Calculator Works</Typography>
      <Typography variant="body1">
        Enter a monthly investment (Systematic Investment Plan) amount, an expected annual rate of return,
        and the number of years remaining until retirement to project your future retirement corpus. The
        calculator uses the standard SIP future value formula for a series of monthly contributions
        compounding at a monthly rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        FV = P × [((1 + r)^n − 1) ÷ r] × (1 + r)
        <br />
        Where P = monthly investment, r = monthly rate (annual rate ÷ 12), n = number of months
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Investing $500 per month at an expected 10% annual return for 25 years grows to a projected corpus of
        roughly $663,000. Of that, $150,000 comes from your own contributions ($500 × 300 months), and the
        remaining $513,000 is investment growth — showing how much compounding contributes over a long
        horizon.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Projecting a retirement nest egg from regular monthly investments.</li>
          <li>Testing how increasing your monthly SIP changes your retirement outcome.</li>
          <li>Comparing scenarios with different expected returns or time horizons.</li>
          <li>Setting a monthly investment target to hit a specific retirement goal.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What return rate should I assume?</Typography>
      <Typography variant="body1">
        This depends on your investment mix. Diversified equity portfolios have historically returned around
        8-12% annually over long periods, though returns vary year to year and future results aren&apos;t
        guaranteed. Conservative investors may prefer a lower assumed rate.
      </Typography>
      <Typography variant="h3">Does this account for inflation?</Typography>
      <Typography variant="body1">
        No — this shows the nominal future value of your investments. To estimate purchasing power in
        today&apos;s terms, use the <a href="/finance/inflation-calculator">Inflation Calculator</a> to adjust
        the projected corpus for expected inflation over the same period.
      </Typography>
      <Typography variant="h3">What if I want to increase my SIP amount every year?</Typography>
      <Typography variant="body1">
        This calculator assumes a fixed monthly SIP amount throughout the period. A &quot;step-up SIP&quot;
        that increases contributions annually will generally produce a larger corpus than shown here.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/retirement-sip-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Monthly SIP Investment"
            type="number"
            value={monthlySip}
            onChange={(e) => setMonthlySip(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Expected Annual Return"
            type="number"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Years Until Retirement"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">Yr</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Projected Retirement Corpus</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(corpus)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Invested</Typography>
            <Typography fontWeight={600}>{fmt(totalInvested)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Investment Growth</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(totalGrowth)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RetirementSIPCalculator;
