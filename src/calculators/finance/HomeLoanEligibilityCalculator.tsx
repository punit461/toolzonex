'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const HomeLoanEligibilityCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [existingEMIs, setExistingEMIs] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [emiRatioPct, setEmiRatioPct] = useState<number>(50);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  const { maxAllowableEmi, eligibleLoanAmount } = useMemo(() => {
    const capacity = (monthlyIncome * emiRatioPct) / 100;
    const maxEmi = Math.max(0, capacity - existingEMIs);

    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    let loan = 0;
    if (maxEmi > 0 && r > 0 && n > 0) {
      loan = (maxEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    }

    return {
      maxAllowableEmi: Math.round(maxEmi),
      eligibleLoanAmount: Math.round(loan),
    };
  }, [monthlyIncome, existingEMIs, interestRate, tenureYears, emiRatioPct]);

  const content = (
    <>
      <Typography variant="h2">How home loan eligibility is calculated</Typography>
      <Typography variant="body1">
        Lenders decide how large a home loan to offer you primarily by capping your total EMIs (existing plus the
        new home loan) at a fixed percentage of your monthly income — commonly 40-50%, called the
        Fixed-Obligation-to-Income Ratio (FOIR). This calculator works backwards from that cap: it finds the
        maximum new EMI you could take on, then converts that EMI into a loan amount at your expected interest
        rate and tenure.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Max New EMI = (Monthly Income × Max EMI Ratio%) − Existing EMIs
        <br />
        Eligible Loan = Max EMI × [(1+R)^N − 1] ÷ [R × (1+R)^N]
      </Box>
      <Typography variant="body1">
        Where <strong>R</strong> is the monthly interest rate (annual rate ÷ 12 ÷ 100) and <strong>N</strong> is
        the tenure in months — this is the EMI formula solved for loan amount instead of EMI.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a monthly income of ₹1,00,000, existing EMIs of ₹10,000, a 50% max EMI-to-income ratio, 8.5%
        interest, and a 20-year tenure: the max new EMI works out to ₹40,000/month, giving an eligible home loan
        of roughly ₹46.6 lakh.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough idea of your home loan budget before house-hunting.</li>
          <li>Seeing how paying off an existing loan or credit card would raise your eligibility.</li>
          <li>Comparing eligible loan amounts across different tenures or interest rates.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What EMI-to-income ratio do banks actually use?</Typography>
      <Typography variant="body1">
        It varies by lender and your income level, but 40-50% of gross monthly income (across all EMIs combined,
        including the new home loan) is a common range. Lower-income borrowers are often held to a stricter cap
        than higher-income borrowers.
      </Typography>
      <Typography variant="h3">Does a longer tenure increase my eligibility?</Typography>
      <Typography variant="body1">
        Yes — spreading the same loan over more months lowers the EMI, which lets you qualify for a larger loan
        amount within the same EMI cap. The tradeoff is more total interest paid over the life of the loan.
      </Typography>
      <Typography variant="h3">Is this the same figure a bank will approve?</Typography>
      <Typography variant="body1">
        No — this is an estimate based on income and EMI ratio alone. Actual bank approval also weighs your
        credit score, employment type and stability, the property&apos;s value, existing relationship with the
        bank, and its own internal lending policies, so your actual sanctioned amount may differ.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/home-loan-eligibility-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom>Monthly Income (net)</Typography>
              <Select
                size="small"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                sx={{ minWidth: 110, mb: 1 }}
              >
                {CURRENCIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>
                ))}
              </Select>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(monthlyIncome) ? '' : monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Existing Monthly EMIs</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(existingEMIs) ? '' : existingEMIs}
              onChange={(e) => setExistingEMIs(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Max EMI-to-Income Ratio (%)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(emiRatioPct) ? '' : emiRatioPct}
              onChange={(e) => setEmiRatioPct(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <Slider
              value={Number.isNaN(emiRatioPct) ? 0 : emiRatioPct}
              min={30}
              max={60}
              step={1}
              onChange={(_, value) => setEmiRatioPct(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Interest Rate (% p.a.)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(interestRate) ? '' : interestRate}
              onChange={(e) => setInterestRate(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Loan Tenure (Years)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(tenureYears) ? '' : tenureYears}
              onChange={(e) => setTenureYears(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">Yr</InputAdornment> } }}
            />
            <Slider
              value={Number.isNaN(tenureYears) ? 0 : tenureYears}
              min={1}
              max={30}
              step={1}
              onChange={(_, value) => setTenureYears(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Eligible Home Loan Amount</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(eligibleLoanAmount, currency)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Max New EMI</Typography>
                <Typography variant="h6">{formatMoney(maxAllowableEmi, currency)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Tenure</Typography>
                <Typography variant="h6">{tenureYears} Yr</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HomeLoanEligibilityCalculator;
