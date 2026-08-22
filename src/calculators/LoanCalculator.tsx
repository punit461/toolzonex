'use client';

import { useState, useMemo } from 'react';
import { Box, Typography, TextField, Paper, InputAdornment, Grid, Divider, Select, MenuItem } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from './currencyConfig';

const LoanCalculatorContent = () => {
  const [amount, setAmount] = useState<string>('50000');
  const [rate, setRate] = useState<string>('5.5');
  const [years, setYears] = useState<string>('5');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const result = useMemo(() => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const termYears = parseFloat(years);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(termYears) || principal <= 0 || annualRate <= 0 || termYears <= 0) {
      return null;
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = termYears * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = emi * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    };
  }, [amount, rate, years]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Select
            size="small"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            sx={{ minWidth: 110 }}
          >
            {CURRENCIES.map((c) => (
              <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>
            ))}
          </Select>
        </Box>
        <TextField
          label="Loan Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
          }}
        />
        <TextField
          label="Interest Rate (Annual)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
        <TextField
          label="Loan Term"
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">Years</InputAdornment>,
          }}
        />
      </Box>

      {/* Output Panel */}
      <Box>
        <Paper variant="outlined" sx={{ p: 4, height: '100%', bgcolor: 'primary.main', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 4 }}>
          
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>Monthly EMI</Typography>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              {result ? formatMoney(Number(result.emi), currency) : formatMoney(0, currency)}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AccountBalanceIcon sx={{ opacity: 0.8, mb: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Interest</Typography>
                <Typography variant="h6" fontWeight="bold">{result ? formatMoney(Number(result.totalInterest), currency) : formatMoney(0, currency)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AttachMoneyIcon sx={{ opacity: 0.8, mb: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Payment</Typography>
                <Typography variant="h6" fontWeight="bold">{result ? formatMoney(Number(result.totalPayment), currency) : formatMoney(0, currency)}</Typography>
              </Box>
            </Grid>
          </Grid>

        </Paper>
      </Box>

    </Box>
  );
};

const LoanCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Loan & EMI Calculator</Typography>
      <Typography variant="body1">
        Calculate your monthly EMI (Equated Monthly Installment), total interest, and total payment amount for personal loans, car loans, or mortgages.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter the loan amount, annual interest rate, and tenure.</li>
          <li>View your monthly EMI, total interest payable, and total repayment amount.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A ₹5,00,000 personal loan at 11% annual interest over 5 years (60 months) works out to an EMI of about
        ₹10,871/month, with total interest of roughly ₹1,52,260.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing loan offers with different rates or tenures before borrowing.</li>
          <li>Checking whether a monthly EMI fits your budget before applying.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does prepaying a loan reduce my EMI or tenure?</Typography>
      <Typography variant="body1">
        Depends on your lender&apos;s policy — some reduce the tenure while keeping EMI the same, others reduce
        the EMI while keeping tenure the same. Either way, prepayment reduces total interest paid.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Loan Calculator - EMI & Mortgage Calculator"
      description="Calculate your monthly EMI, total interest, and total payment amount for personal loans and mortgages."
      url="/finance/loan-calculator"
      content={content}
      category="Finance"
    >
      <LoanCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoanCalculator;
