'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Chip, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const LOAN_PRESETS = [
  { label: 'Conventional (28/36)', front: 28, back: 36 },
  { label: 'FHA (31/43)', front: 31, back: 43 },
  { label: 'VA (—/41)', front: 100, back: 41 },
];

const MortgageAffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState('95000');
  const [monthlyDebts, setMonthlyDebts] = useState('350');
  const [downPayment, setDownPayment] = useState('30000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTaxMonthly, setPropertyTaxMonthly] = useState('300');
  const [insuranceMonthly, setInsuranceMonthly] = useState('100');
  const [hoaMonthly, setHoaMonthly] = useState('0');
  const [frontRatio, setFrontRatio] = useState('28');
  const [backRatio, setBackRatio] = useState('36');

  const result = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const debts = parseFloat(monthlyDebts) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTerm) || 0;
    const tax = parseFloat(propertyTaxMonthly) || 0;
    const insurance = parseFloat(insuranceMonthly) || 0;
    const hoa = parseFloat(hoaMonthly) || 0;
    const front = parseFloat(frontRatio) || 0;
    const back = parseFloat(backRatio) || 0;

    const monthlyIncome = income / 12;
    const frontLimit = front < 100 ? monthlyIncome * (front / 100) : Infinity;
    const backLimit = monthlyIncome * (back / 100) - debts;
    const maxPITI = Math.max(0, Math.min(frontLimit, backLimit));
    const limiter = frontLimit <= backLimit ? 'front-end (housing)' : 'back-end (total debt)';

    const nonPI = tax + insurance + hoa;
    const maxPI = Math.max(0, maxPITI - nonPI);

    const monthlyRate = rate / 12 / 100;
    const n = years * 12;
    let loan = 0;
    if (maxPI > 0 && n > 0) {
      loan = monthlyRate > 0
        ? (maxPI * (1 - Math.pow(1 + monthlyRate, -n))) / monthlyRate
        : maxPI * n;
    }

    return {
      maxHomePrice: loan + down,
      maxLoanAmount: loan,
      maxPITI,
      maxPI,
      nonPI,
      limitedBy: limiter,
    };
  }, [annualIncome, monthlyDebts, downPayment, interestRate, loanTerm, propertyTaxMonthly, insuranceMonthly, hoaMonthly, frontRatio, backRatio]);

  const content = (
    <>
      <Typography variant="h2">How Mortgage Affordability Is Calculated Here</Typography>
      <Typography variant="body1">
        This calculator estimates mortgage approval using separate front-end and back-end
        debt-to-income (DTI) ratios, the same framing lenders use, but goes a step further by rolling
        property tax, homeowners insurance, and HOA fees into the housing payment (PITI) before solving
        for the loan itself. Quick presets fill in the DTI limits typically used for Conventional, FHA,
        and VA loans, since each program allows a different maximum ratio. The stricter of the front-end
        and back-end limits sets your maximum total housing payment, and subtracting taxes, insurance,
        and HOA from that leaves the principal-and-interest budget used to size the loan.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Max PITI = min(Monthly Income × Front Ratio %, Monthly Income × Back Ratio % − Other Debts)
        <br />
        Max Principal & Interest = Max PITI − (Property Tax + Insurance + HOA)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a $95,000 income, $350 in other debts, a Conventional 28/36 DTI, and $400/month in
        combined property tax, insurance, and HOA, the back-end limit allows about $2,499/month in
        total housing costs. Subtracting the $400 in taxes and insurance leaves about $2,099 for
        principal and interest, supporting a maximum home price in the high-$300,000s at a 6.5% rate
        over 30 years.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing what you could qualify for under Conventional, FHA, and VA DTI rules.</li>
          <li>Getting a more realistic home price estimate that accounts for taxes, insurance, and HOA.</li>
          <li>Preparing for a mortgage pre-approval conversation with lender-style ratios.</li>
          <li>Seeing how a high HOA fee or property tax rate eats into your loan-eligible budget.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why include property tax, insurance, and HOA at all?</Typography>
      <Typography variant="body1">
        Lenders qualify borrowers based on the full housing payment (PITI: principal, interest, taxes,
        insurance), not principal and interest alone. Leaving those costs out overstates how large a
        loan you can actually qualify for, since they eat directly into your allowed housing budget.
      </Typography>
      <Typography variant="h3">Why does the VA preset have no front-end limit?</Typography>
      <Typography variant="body1">
        VA loans generally don&apos;t enforce a strict front-end (housing-only) ratio the way
        Conventional and FHA loans do — they primarily rely on a back-end (total debt) ratio, commonly
        around 41%, alongside residual income requirements not modeled here.
      </Typography>
      <Typography variant="h3">How is this different from a general house affordability calculator?</Typography>
      <Typography variant="body1">
        This tool is built specifically around the mortgage-approval process: adjustable front-end and
        back-end ratios with loan-program presets, plus taxes, insurance, and HOA rolled into the
        payment — closer to how an underwriter actually sizes a loan than a simple price-to-income
        estimate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/mortgage-affordability-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {LOAN_PRESETS.map((p) => (
              <Chip
                key={p.label}
                label={p.label}
                color="primary"
                variant="outlined"
                size="small"
                onClick={() => {
                  setFrontRatio(String(p.front));
                  setBackRatio(String(p.back));
                }}
              />
            ))}
          </Box>
          <TextField
            label="Annual Household Income"
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Other Monthly Debts"
            type="number"
            value={monthlyDebts}
            onChange={(e) => setMonthlyDebts(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Down Payment Available"
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Interest Rate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <TextField
              label="Loan Term"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">Yr</InputAdornment> } }}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <TextField
              label="Property Tax"
              type="number"
              value={propertyTaxMonthly}
              onChange={(e) => setPropertyTaxMonthly(e.target.value)}
              fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              helperText="Per month"
            />
            <TextField
              label="Insurance"
              type="number"
              value={insuranceMonthly}
              onChange={(e) => setInsuranceMonthly(e.target.value)}
              fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              helperText="Per month"
            />
            <TextField
              label="HOA"
              type="number"
              value={hoaMonthly}
              onChange={(e) => setHoaMonthly(e.target.value)}
              fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              helperText="Per month"
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Front-End Ratio"
              type="number"
              value={frontRatio}
              onChange={(e) => setFrontRatio(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <TextField
              label="Back-End Ratio"
              type="number"
              value={backRatio}
              onChange={(e) => setBackRatio(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Max Affordable Home Price</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.maxHomePrice)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Max Loan Amount</Typography>
            <Typography fontWeight={600}>{fmt(result.maxLoanAmount)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Max Total Housing Payment (PITI)</Typography>
            <Typography fontWeight={600}>{fmt(result.maxPITI)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Max Principal &amp; Interest</Typography>
            <Typography fontWeight={600}>{fmt(result.maxPI)}</Typography>
          </Paper>
          <Alert severity="info">Limited by your {result.limitedBy} ratio.</Alert>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MortgageAffordabilityCalculator;
