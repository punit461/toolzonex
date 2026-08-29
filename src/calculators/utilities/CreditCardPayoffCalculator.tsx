'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'payment' | 'timeframe';

const MAX_MONTHS = 600;

function simulatePayoff(balance: number, monthlyRate: number, payment: number) {
  let bal = balance;
  let months = 0;
  let totalInterest = 0;

  while (bal > 0 && months < MAX_MONTHS) {
    const interest = bal * monthlyRate;
    const principal = payment - interest;
    if (principal <= 0) return { months: null, totalInterest: null };
    bal = bal + interest - payment;
    totalInterest += interest;
    months += 1;
    if (bal < 0) bal = 0;
  }

  if (bal > 0) return { months: null, totalInterest: null };
  return { months, totalInterest };
}

const CreditCardPayoffCalculator = () => {
  const [mode, setMode] = useState<Mode>('payment');
  const [balance, setBalance] = useState<string>('5000');
  const [apr, setApr] = useState<string>('22');
  const [payment, setPayment] = useState<string>('200');
  const [targetMonths, setTargetMonths] = useState<string>('24');

  const paymentResult = useMemo(() => {
    const bal = parseFloat(balance);
    const rate = parseFloat(apr) / 100 / 12;
    const pay = parseFloat(payment);
    if (isNaN(bal) || isNaN(rate) || isNaN(pay) || bal <= 0 || pay <= 0) return null;
    return simulatePayoff(bal, rate, pay);
  }, [balance, apr, payment]);

  const requiredPayment = useMemo(() => {
    const bal = parseFloat(balance);
    const rate = parseFloat(apr) / 100 / 12;
    const n = parseFloat(targetMonths);
    if (isNaN(bal) || isNaN(rate) || isNaN(n) || bal <= 0 || n <= 0) return null;
    if (rate === 0) return bal / n;
    const pay = (bal * rate) / (1 - Math.pow(1 + rate, -n));
    const totalPaid = pay * n;
    return { payment: pay, totalInterest: totalPaid - bal };
  }, [balance, apr, targetMonths]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Credit Card Payoff</Typography>
      <Typography variant="body1">
        Credit card interest compounds monthly on your remaining balance, so a fixed monthly payment gradually
        reduces the balance, with a shrinking portion going to interest and a growing portion going to principal
        each month. This calculator works both ways: enter a fixed payment to see how long payoff takes and how
        much interest you&apos;ll pay in total, or enter a target payoff timeframe to see the monthly payment
        required to hit it.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Monthly Interest = Balance × (APR ÷ 12) &nbsp;|&nbsp; Payment = Balance × r ÷ (1 − (1 + r)⁻ⁿ)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $5,000 balance at 22% APR paid off with $200 monthly payments takes about 32 months and costs roughly
        $1,300 in total interest. To clear that same balance in exactly 24 months instead, you&apos;d need a
        monthly payment of about $259.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Seeing how long it will take to pay off a credit card at your current monthly payment.</li>
          <li>Working out the payment needed to be debt-free by a specific date.</li>
          <li>Comparing total interest paid under different payment amounts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does it say my balance will never be paid off?</Typography>
      <Typography variant="body1">
        This happens when your monthly payment is less than or equal to the interest charged that month — the
        balance never shrinks, and can even grow over time. Increase your monthly payment above the current
        interest charge (balance × APR ÷ 12) to make progress on the principal.
      </Typography>
      <Typography variant="h3">Does this account for new purchases added to the card?</Typography>
      <Typography variant="body1">
        No — this assumes no new charges are added and only the starting balance is being paid down, which
        gives the cleanest picture of how a fixed payment plan performs. Adding new purchases each month will
        extend the payoff time and increase total interest beyond this estimate.
      </Typography>
      <Typography variant="h3">Why is credit card APR usually so much higher than other loans?</Typography>
      <Typography variant="body1">
        Credit cards are unsecured debt with no collateral backing them, which makes them riskier for lenders,
        so issuers typically charge much higher interest rates than secured loans like mortgages or auto loans
        to compensate for that risk.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/credit-card-payoff-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
            <ToggleButton value="payment">From Monthly Payment</ToggleButton>
            <ToggleButton value="timeframe">From Target Timeframe</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Stack spacing={2}>
            <TextField label="Credit Card Balance ($)" type="number" fullWidth value={balance} onChange={(e) => setBalance(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="APR (%)" type="number" fullWidth value={apr} onChange={(e) => setApr(e.target.value)} onFocus={(e) => e.target.select()} />
            {mode === 'payment' ? (
              <TextField label="Fixed Monthly Payment ($)" type="number" fullWidth value={payment} onChange={(e) => setPayment(e.target.value)} onFocus={(e) => e.target.select()} />
            ) : (
              <TextField label="Target Payoff Timeframe (months)" type="number" fullWidth value={targetMonths} onChange={(e) => setTargetMonths(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
          </Stack>

          <Stack spacing={2}>
            {mode === 'payment' ? (
              paymentResult && paymentResult.months !== null ? (
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="body2">Months to Pay Off</Typography>
                  <Typography variant="h3" fontWeight="bold">{paymentResult.months}</Typography>
                  <Typography variant="body2" mt={1}>
                    Total Interest: ${paymentResult.totalInterest?.toFixed(2)}
                  </Typography>
                </Paper>
              ) : (
                <Alert severity="warning">
                  This payment doesn&apos;t exceed the monthly interest charge, so this balance will never be
                  paid off. Increase your monthly payment.
                </Alert>
              )
            ) : requiredPayment !== null ? (
              typeof requiredPayment === 'number' ? (
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="body2">Required Monthly Payment</Typography>
                  <Typography variant="h3" fontWeight="bold">${requiredPayment.toFixed(2)}</Typography>
                </Paper>
              ) : (
                <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                  <Typography variant="body2">Required Monthly Payment</Typography>
                  <Typography variant="h3" fontWeight="bold">${requiredPayment.payment.toFixed(2)}</Typography>
                  <Typography variant="body2" mt={1}>
                    Total Interest: ${requiredPayment.totalInterest.toFixed(2)}
                  </Typography>
                </Paper>
              )
            ) : (
              <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">Enter valid values above</Typography>
              </Paper>
            )}
          </Stack>
        </Box>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CreditCardPayoffCalculator;
