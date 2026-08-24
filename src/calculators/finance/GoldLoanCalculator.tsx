'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const KARAT_OPTIONS = [
  { value: 24, label: '24K (99.9% pure)', purity: 0.999 },
  { value: 22, label: '22K (91.6% pure)', purity: 0.916 },
  { value: 20, label: '20K (83.3% pure)', purity: 0.833 },
  { value: 18, label: '18K (75.0% pure)', purity: 0.75 },
];

const formatINR = (value: number) => `₹ ${Math.round(value).toLocaleString('en-IN')}`;

const GoldLoanCalculator = () => {
  const [weight, setWeight] = useState<number>(50);
  const [karat, setKarat] = useState<number>(22);
  const [rate24k, setRate24k] = useState<number>(7000);
  const [ltvPct, setLtvPct] = useState<number>(75);
  const [interestRate, setInterestRate] = useState<number>(10);
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  const { appraisedValue, eligibleLoan, emi, totalInterest } = useMemo(() => {
    const purity = KARAT_OPTIONS.find((k) => k.value === karat)?.purity ?? 0.916;
    const value = weight * purity * rate24k;
    const loan = value * (ltvPct / 100);

    const r = interestRate / 12 / 100;
    const n = tenureMonths;
    let emiValue = 0;
    if (loan > 0 && r > 0 && n > 0) {
      emiValue = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalPay = emiValue * n;
    const totalInt = Math.max(0, totalPay - loan);

    return {
      appraisedValue: Math.round(value),
      eligibleLoan: Math.round(loan),
      emi: Math.round(emiValue),
      totalInterest: Math.round(totalInt),
    };
  }, [weight, karat, rate24k, ltvPct, interestRate, tenureMonths]);

  const content = (
    <>
      <Typography variant="h2">How gold loan eligibility is calculated</Typography>
      <Typography variant="body1">
        A gold loan lets you borrow against gold jewellery or coins you already own, without selling it. Lenders
        first appraise your gold&apos;s value based on its <strong>purity (karat)</strong> and the current gold
        rate, then lend you a percentage of that value — the Loan-to-Value (LTV) ratio. In India, the Reserve
        Bank of India caps gold loan LTV at 75% of the gold&apos;s value for most lenders.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Appraised Value = Weight (g) × Purity × Rate per gram (24K)
        <br />
        Eligible Loan = Appraised Value × LTV%
      </Box>
      <Typography variant="body1">
        Purity converts your karat to a fraction of pure (24K) gold — 22K gold is about 91.6% pure, 18K about
        75% pure. Enter the current 24K gold rate per gram; the calculator adjusts it for your gold&apos;s
        purity automatically. If your lender offers a fixed interest rate and tenure, the calculator also
        estimates the resulting EMI.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        50 grams of 22K gold (91.6% pure) at a 24K rate of ₹7,000/gram appraises to roughly ₹3,20,600. At 75%
        LTV, the eligible loan amount is about ₹2,40,450. At 10% annual interest over 12 months, the EMI comes
        to roughly ₹21,120/month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much you could borrow against gold jewellery before visiting a lender.</li>
          <li>Comparing eligible loan amounts across different karat purities for the same weight.</li>
          <li>Checking the EMI impact of different tenures or interest rates before taking a gold loan.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is LTV in a gold loan?</Typography>
      <Typography variant="body1">
        Loan-to-Value is the percentage of your gold&apos;s appraised value that a lender will actually lend you.
        In India, RBI regulations cap gold loan LTV at 75%, meaning if your gold is worth ₹1,00,000, the maximum
        loan is ₹75,000 — lenders may offer less depending on their own risk policies.
      </Typography>
      <Typography variant="h3">Does gold purity really change how much I can borrow?</Typography>
      <Typography variant="body1">
        Yes — purity directly scales the appraised value. The same weight of 24K gold is worth more than 22K or
        18K gold of identical weight, so higher-purity gold yields a proportionally higher eligible loan amount
        at the same LTV.
      </Typography>
      <Typography variant="h3">Are gold loan EMIs always amortizing like a regular loan?</Typography>
      <Typography variant="body1">
        Not always — many gold loans let you pay interest-only each month (or even upfront) and repay the
        principal as a lump sum (bullet payment) at the end of the tenure. This calculator estimates a standard
        amortizing EMI; check your lender&apos;s specific repayment structure, since your actual monthly payment
        may differ.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/gold-loan-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Gold Weight (grams)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(weight) ? '' : weight}
              onChange={(e) => setWeight(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">g</InputAdornment> } }}
            />
            <Slider
              value={Number.isNaN(weight) ? 0 : weight}
              min={1}
              max={500}
              step={1}
              onChange={(_, value) => setWeight(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Gold Purity</Typography>
            <Select fullWidth value={karat} onChange={(e) => setKarat(Number(e.target.value))}>
              {KARAT_OPTIONS.map((k) => (
                <MenuItem key={k.value} value={k.value}>{k.label}</MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Current Gold Rate (24K, per gram)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(rate24k) ? '' : rate24k}
              onChange={(e) => setRate24k(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Loan-to-Value (LTV %)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(ltvPct) ? '' : ltvPct}
              onChange={(e) => setLtvPct(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <Slider
              value={Number.isNaN(ltvPct) ? 0 : ltvPct}
              min={40}
              max={75}
              step={1}
              onChange={(_, value) => setLtvPct(value as number)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Interest Rate (% p.a., optional)</Typography>
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
            <Typography gutterBottom>Tenure (months, optional)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(tenureMonths) ? '' : tenureMonths}
              onChange={(e) => setTenureMonths(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">months</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Eligible Loan Amount</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatINR(eligibleLoan)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Appraised Gold Value</Typography>
                <Typography variant="h6">{formatINR(appraisedValue)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Estimated EMI</Typography>
                <Typography variant="h6">{emi > 0 ? formatINR(emi) : '—'}</Typography>
              </Box>
            </Box>

            {emi > 0 && (
              <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">Total Interest Payable</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{formatINR(totalInterest)}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GoldLoanCalculator;
