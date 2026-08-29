'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const COMPOUNDING_OPTIONS = [
  { value: 1, label: 'Annually' },
  { value: 2, label: 'Half-yearly' },
  { value: 4, label: 'Quarterly' },
  { value: 12, label: 'Monthly' },
];

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const maturityValue = (P: number, annualRate: number, n: number, years: number) => {
  const r = annualRate / 100;
  return P * Math.pow(1 + r / n, n * years);
};

const FixedDepositMaturityCalculator = () => {
  const [principal, setPrincipal] = useState('10000');
  const [interestRate, setInterestRate] = useState('5');
  const [tenureYears, setTenureYears] = useState('5');
  const [compoundingFrequency, setCompoundingFrequency] = useState(4);

  const { P, annualRate, years, n, maturityAmount, interestEarned, maturityDate, comparisonRows } = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const rate = parseFloat(interestRate) || 0;
    const yrs = parseFloat(tenureYears) || 0;
    const compound = compoundingFrequency;

    const maturity = maturityValue(p, rate, compound, yrs);
    const earned = maturity - p;

    const today = new Date();
    const maturity_date = new Date(today);
    maturity_date.setFullYear(maturity_date.getFullYear() + Math.floor(yrs));
    maturity_date.setMonth(maturity_date.getMonth() + Math.round((yrs % 1) * 12));

    const tenureOptions = [1, 3, 5, 10];
    const rows = tenureOptions.map((t) => ({
      years: t,
      maturity: maturityValue(p, rate, compound, t),
    }));

    return {
      P: p,
      annualRate: rate,
      years: yrs,
      n: compound,
      maturityAmount: maturity,
      interestEarned: earned,
      maturityDate: maturity_date,
      comparisonRows: rows,
    };
  }, [principal, interestRate, tenureYears, compoundingFrequency]);

  const content = (
    <>
      <Typography variant="h2">How the Fixed Deposit Maturity Date and Amount Are Calculated</Typography>
      <Typography variant="body1">
        This calculator focuses on the two numbers that matter most when you open a fixed deposit: the
        exact maturity amount you&apos;ll receive and roughly when it lands. Enter the principal, the
        annual interest rate, the tenure, and how often interest compounds. The calculator applies
        compound interest across the tenure and also projects the maturity date from today, plus a
        side-by-side comparison of what the same deposit would be worth at a few common tenures.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Maturity Amount = P × (1 + r/n)<sup>n × t</sup>
        <br />
        P = principal, r = annual interest rate, n = compounding frequency per year, t = tenure in years
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Depositing $10,000 for 5 years at 5% annual interest, compounded quarterly, matures to roughly
        $12,834 — earning about $2,834 in interest. Extending the same deposit to 10 years at the same
        rate nearly doubles the interest earned, since compounding has more time to work.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding out exactly when and how much a fixed deposit will pay out at maturity.</li>
          <li>Comparing how maturity value changes across different tenure lengths before committing funds.</li>
          <li>Planning a lump-sum goal, like a down payment, around a specific maturity date.</li>
          <li>Understanding how compounding frequency affects the final payout.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is the maturity date estimated?</Typography>
      <Typography variant="body1">
        The calculator adds the tenure — in whole years and remaining months — to today&apos;s date.
        Your actual bank-issued maturity date will be based on the exact date you open the deposit, not
        today, so treat this as an approximate planning reference.
      </Typography>
      <Typography variant="h3">Why does maturity value grow faster over longer tenures?</Typography>
      <Typography variant="body1">
        Compound interest earns returns on previously accumulated interest, not just the original
        principal. The longer the money stays deposited, the more compounding cycles occur, so the
        growth accelerates rather than staying linear.
      </Typography>
      <Typography variant="h3">Are the maturity figures shown before or after tax?</Typography>
      <Typography variant="body1">
        These are pre-tax figures. Banks may deduct tax at source on interest earned above an
        exemption threshold, and interest income is generally taxable per your applicable tax bracket.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/fixed-deposit-maturity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Principal Amount"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Annual Interest Rate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">% p.a.</InputAdornment> } }}
          />
          <TextField
            label="Tenure"
            type="number"
            value={tenureYears}
            onChange={(e) => setTenureYears(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }}
          />
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Compounding Frequency</Typography>
            <Select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
              fullWidth
            >
              {COMPOUNDING_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Maturity Amount</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(maturityAmount)}</Typography>
            <Typography variant="body2">
              Around {maturityDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Principal</Typography>
            <Typography fontWeight={600}>{fmt(P)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Interest Earned</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(interestEarned)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={1}>Maturity Value at Different Tenures</Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Same principal of {fmt(P)} at {annualRate}% per annum, compounded {n === 1 ? 'annually' : n === 2 ? 'half-yearly' : n === 4 ? 'quarterly' : 'monthly'}.
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tenure</TableCell>
                <TableCell align="right">Maturity Amount</TableCell>
                <TableCell align="right">Interest Earned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow key={row.years} selected={row.years === Math.round(years)}>
                  <TableCell>{row.years} {row.years === 1 ? 'year' : 'years'}</TableCell>
                  <TableCell align="right">{fmt(row.maturity)}</TableCell>
                  <TableCell align="right">{fmt(row.maturity - P)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FixedDepositMaturityCalculator;
