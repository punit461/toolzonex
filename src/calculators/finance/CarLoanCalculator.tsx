'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const CarLoanCalculator = () => {
  const [price, setPrice] = useState('32000');
  const [downPayment, setDownPayment] = useState('4000');
  const [tradeIn, setTradeIn] = useState('2000');
  const [taxRate, setTaxRate] = useState('7');
  const [term, setTerm] = useState('60');
  const [rate, setRate] = useState('6.5');

  const result = useMemo(() => {
    const p = parseFloat(price) || 0;
    const dp = parseFloat(downPayment) || 0;
    const ti = parseFloat(tradeIn) || 0;
    const tax = parseFloat(taxRate) || 0;
    const n = parseInt(term, 10) || 0;
    const annualRate = parseFloat(rate) || 0;

    if (p <= 0 || n <= 0) return null;

    const taxableAmount = Math.max(0, p - ti);
    const salesTax = taxableAmount * (tax / 100);
    const loanAmount = Math.max(0, p - dp - ti + salesTax);

    const r = annualRate / 12 / 100;
    let monthlyPayment: number;
    if (r === 0) {
      monthlyPayment = loanAmount / n;
    } else {
      monthlyPayment = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - loanAmount;

    return { salesTax, loanAmount, monthlyPayment, totalInterest, totalPaid };
  }, [price, downPayment, tradeIn, taxRate, term, rate]);

  const content = (
    <>
      <Typography variant="h2">How the Car Loan Calculator Works</Typography>
      <Typography variant="body1">
        Enter the vehicle&apos;s price, your down payment, any trade-in value, your local sales tax rate, the
        loan term in months, and the annual interest rate. The calculator first works out the actual loan
        amount you&apos;ll finance, then applies the standard amortization formula to find your monthly
        payment.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Taxable Amount = Price − Trade-In<br />
        Sales Tax = Taxable Amount × Tax Rate<br />
        Loan Amount = Price − Down Payment − Trade-In + Sales Tax<br />
        Payment = [P × r(1+r)^n] / [(1+r)^n − 1]
      </Box>
      <Typography variant="body1">
        Where <strong>P</strong> is the loan amount, <strong>r</strong> is the monthly interest rate (annual
        rate ÷ 12 ÷ 100), and <strong>n</strong> is the loan term in months. Trade-in value reduces both the
        amount financed and, in most states, the taxable amount.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $32,000 car with a $4,000 down payment and a $2,000 trade-in, at 7% sales tax, financed over 60
        months at 6.5% APR: the taxable amount is $30,000, sales tax is $2,100, and the loan amount is
        $32,000 − $4,000 − $2,000 + $2,100 = $28,100. That works out to a monthly payment of roughly
        $549/month, with about $4,840 in total interest over the loan.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting a monthly car payment before visiting a dealership.</li>
          <li>Comparing how a larger down payment or trade-in reduces total interest paid.</li>
          <li>Estimating the true out-the-door loan amount once sales tax is factored in.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the generic EMI Calculator?</strong> The EMI Calculator only takes a principal, rate, and tenure. This Car Loan Calculator is auto-specific — it also accounts for down payment, trade-in value, and sales tax, all of which change the actual amount you finance versus the vehicle&apos;s sticker price.</li>
          <li><strong>Does trade-in value always reduce sales tax?</strong> In most US states, yes — sales tax is charged on the price minus the trade-in value. A few states tax the full purchase price regardless of trade-in, so check your local rules for an exact figure.</li>
          <li><strong>Why is my loan amount higher than the price minus down payment?</strong> Because sales tax is added into the amount financed unless you pay it separately in cash. If you plan to pay tax and fees out of pocket, set the down payment high enough to cover them.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/car-loan-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Vehicle Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} />
          <TextField label="Down Payment" type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} />
          <TextField label="Trade-In Value" type="number" value={tradeIn} onChange={(e) => setTradeIn(e.target.value)} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} />
          <TextField label="Sales Tax Rate" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} />
          <TextField label="Loan Term" type="number" value={term} onChange={(e) => setTerm(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">months</InputAdornment> } }} />
          <TextField label="Annual Interest Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} />
        </Stack>

        <Box>
          {result ? (
            <Stack spacing={2}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="body2">Monthly Payment</Typography>
                <Typography variant="h3" fontWeight="bold">{currency.format(result.monthlyPayment)}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Sales Tax</Typography>
                <Typography fontWeight={600}>{currency.format(result.salesTax)}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Loan Amount</Typography>
                <Typography fontWeight={600}>{currency.format(result.loanAmount)}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Total Interest</Typography>
                <Typography fontWeight={600}>{currency.format(result.totalInterest)}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Total Cost of Loan</Typography>
                <Typography fontWeight={600}>{currency.format(result.totalPaid)}</Typography>
              </Paper>
            </Stack>
          ) : (
            <Typography color="text.secondary">Enter valid loan details to see your payment.</Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CarLoanCalculator;
