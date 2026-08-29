'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const HouseAffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState('90000');
  const [monthlyDebts, setMonthlyDebts] = useState('400');
  const [downPayment, setDownPayment] = useState('40000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [frontRatio, setFrontRatio] = useState('28');
  const [backRatio, setBackRatio] = useState('36');

  const { maxHomePrice, maxLoanAmount, maxMonthlyPayment, limitedBy } = useMemo(() => {
    const income = parseFloat(annualIncome) || 0;
    const debts = parseFloat(monthlyDebts) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTerm) || 0;
    const front = parseFloat(frontRatio) || 0;
    const back = parseFloat(backRatio) || 0;

    const monthlyIncome = income / 12;
    const frontLimit = monthlyIncome * (front / 100);
    const backLimit = monthlyIncome * (back / 100) - debts;
    const maxPayment = Math.max(0, Math.min(frontLimit, backLimit));
    const limiter = frontLimit <= backLimit ? 'front-end (housing)' : 'back-end (total debt)';

    const monthlyRate = rate / 12 / 100;
    const n = years * 12;
    let loan = 0;
    if (maxPayment > 0 && n > 0) {
      loan = monthlyRate > 0
        ? (maxPayment * (1 - Math.pow(1 + monthlyRate, -n))) / monthlyRate
        : maxPayment * n;
    }

    return {
      maxHomePrice: loan + down,
      maxLoanAmount: loan,
      maxMonthlyPayment: maxPayment,
      limitedBy: limiter,
    };
  }, [annualIncome, monthlyDebts, downPayment, interestRate, loanTerm, frontRatio, backRatio]);

  const content = (
    <>
      <Typography variant="h2">How Home Affordability Is Calculated</Typography>
      <Typography variant="body1">
        This calculator uses the classic 28/36 debt-to-income guideline: no more than 28% of gross monthly
        income should go to housing costs (the &quot;front-end&quot; ratio), and no more than 36% should go to
        total debt payments including housing (the &quot;back-end&quot; ratio). Both ratios are adjustable so
        you can match a specific lender&apos;s guidelines. The stricter of the two limits sets your maximum
        affordable monthly payment, which is then converted into a maximum loan amount and home price.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Front-End Limit = Monthly Income × Front Ratio %
        <br />
        Back-End Limit = (Monthly Income × Back Ratio %) − Other Monthly Debts
        <br />
        Max Home Price = Loan Amount (from max payment) + Down Payment
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a $90,000 annual income, $400 in other monthly debts, a $40,000 down payment, a 6.5% interest
        rate, and a 30-year loan, the 28% front-end limit allows about $2,100/month for housing, while the
        36% back-end limit (after debts) allows about $2,300/month — so the front-end ratio is the binding
        constraint. That translates into a maximum affordable home price in the mid-$300,000s.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a realistic home price range before house hunting.</li>
          <li>Understanding how existing debts reduce your home-buying budget.</li>
          <li>Testing how a bigger down payment or lower rate changes affordability.</li>
          <li>Preparing for a mortgage pre-approval conversation with a lender.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the 28/36 rule?</Typography>
      <Typography variant="body1">
        It&apos;s a widely used lending guideline: housing costs shouldn&apos;t exceed 28% of gross monthly
        income, and total debt payments (housing plus other debts like car loans and credit cards)
        shouldn&apos;t exceed 36%. Some lenders allow higher ratios depending on credit and loan type.
      </Typography>
      <Typography variant="h3">Why did adjusting my other debts change the result?</Typography>
      <Typography variant="body1">
        The back-end ratio limit accounts for all monthly debt obligations, not just housing. Higher existing
        debts (car payments, student loans, credit cards) reduce how much room is left for a mortgage payment
        under the 36% ceiling.
      </Typography>
      <Typography variant="h3">Does this include property taxes and insurance?</Typography>
      <Typography variant="body1">
        This estimate focuses on principal and interest capacity based on the debt-to-income ratios. Actual
        affordability should also factor in property taxes, homeowners insurance, and HOA fees, which lenders
        typically fold into the front-end ratio calculation.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/house-affordability-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            <Typography variant="h3" fontWeight="bold">{fmt(maxHomePrice)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Max Loan Amount</Typography>
            <Typography fontWeight={600}>{fmt(maxLoanAmount)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Max Monthly Payment</Typography>
            <Typography fontWeight={600}>{fmt(maxMonthlyPayment)}</Typography>
          </Paper>
          <Alert severity="info">Limited by your {limitedBy} ratio.</Alert>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HouseAffordabilityCalculator;
