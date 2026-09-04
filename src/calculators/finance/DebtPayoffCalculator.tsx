'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, InputAdornment, Alert, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

interface Debt {
  id: number;
  name: string;
  balance: string;
  rate: string;
  minPayment: string;
}

let nextId = 1;

interface SimDebt {
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface SimResult {
  months: number;
  totalInterest: number;
  hitCap: boolean;
}

function simulate(debts: SimDebt[], extra: number, strategy: 'snowball' | 'avalanche'): SimResult {
  const working = debts.map((d) => ({ ...d }));
  let months = 0;
  let totalInterest = 0;
  const CAP = 600;

  while (working.some((d) => d.balance > 0.01) && months < CAP) {
    months++;

    // Accrue interest for the month on every remaining balance.
    working.forEach((d) => {
      if (d.balance > 0) {
        const interest = (d.balance * (d.rate / 100)) / 12;
        d.balance += interest;
        totalInterest += interest;
      }
    });

    // Pay minimums first.
    working.forEach((d) => {
      if (d.balance > 0) {
        const pay = Math.min(d.minPayment, d.balance);
        d.balance -= pay;
      }
    });

    // Apply extra payment to the target debt (smallest balance = snowball,
    // highest rate = avalanche), rolling to the next target once one is paid off.
    let remainingExtra = extra;
    while (remainingExtra > 0.001) {
      const targets = working.filter((d) => d.balance > 0.01);
      if (targets.length === 0) break;
      targets.sort((a, b) => (strategy === 'snowball' ? a.balance - b.balance : b.rate - a.rate));
      const target = targets[0];
      const pay = Math.min(remainingExtra, target.balance);
      target.balance -= pay;
      remainingExtra -= pay;
    }
  }

  const hitCap = working.some((d) => d.balance > 0.01);
  return { months, totalInterest, hitCap };
}

const DebtPayoffCalculatorContent = () => {
  const [debts, setDebts] = useState<Debt[]>([
    { id: 0, name: 'Credit Card', balance: '4000', rate: '22', minPayment: '100' },
    { id: 1, name: 'Car Loan', balance: '12000', rate: '7', minPayment: '250' },
    { id: 2, name: 'Student Loan', balance: '8000', rate: '5', minPayment: '150' },
  ]);
  const [extraPayment, setExtraPayment] = useState('200');

  const updateDebt = (id: number, field: keyof Debt, value: string) => {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const addDebt = () => setDebts((prev) => [...prev, { id: nextId++, name: `Debt ${prev.length + 1}`, balance: '', rate: '', minPayment: '' }]);
  const removeDebt = (id: number) => setDebts((prev) => prev.filter((d) => d.id !== id));

  const { snowball, avalanche } = useMemo(() => {
    const simDebts: SimDebt[] = debts
      .map((d) => ({
        name: d.name || 'Debt',
        balance: parseFloat(d.balance) || 0,
        rate: parseFloat(d.rate) || 0,
        minPayment: parseFloat(d.minPayment) || 0,
      }))
      .filter((d) => d.balance > 0);

    const extra = parseFloat(extraPayment) || 0;

    if (simDebts.length === 0) {
      return { snowball: null, avalanche: null };
    }

    return {
      snowball: simulate(simDebts, extra, 'snowball'),
      avalanche: simulate(simDebts, extra, 'avalanche'),
    };
  }, [debts, extraPayment]);

  return (
    <Stack spacing={4}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          {debts.map((debt, idx) => (
            <Grid container spacing={2} key={debt.id} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField label={`Debt ${idx + 1} Name`} size="small" fullWidth value={debt.name} onChange={(e) => updateDebt(debt.id, 'name', e.target.value)} />
              </Grid>
              <Grid item xs={4} sm={3}>
                <TextField label="Balance" type="number" size="small" fullWidth value={debt.balance} onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} />
              </Grid>
              <Grid item xs={4} sm={2.5}>
                <TextField label="APR" type="number" size="small" fullWidth value={debt.rate} onChange={(e) => updateDebt(debt.id, 'rate', e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} />
              </Grid>
              <Grid item xs={4} sm={2.5}>
                <TextField label="Min Payment" type="number" size="small" fullWidth value={debt.minPayment} onChange={(e) => updateDebt(debt.id, 'minPayment', e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} />
              </Grid>
              <Grid item xs={12} sm={1}>
                {debts.length > 1 && (
                  <Button color="error" size="small" onClick={() => removeDebt(debt.id)}><DeleteIcon fontSize="small" /></Button>
                )}
              </Grid>
            </Grid>
          ))}
          <Button startIcon={<AddIcon />} onClick={addDebt} variant="outlined" sx={{ alignSelf: 'flex-start' }}>Add Debt</Button>
          <TextField
            label="Extra Monthly Payment (beyond minimums)"
            type="number"
            value={extraPayment}
            onChange={(e) => setExtraPayment(e.target.value)}
            sx={{ maxWidth: 320 }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Stack>
      </Paper>

      {(snowball || avalanche) && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Snowball Strategy</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>Extra payment goes to the smallest balance first.</Typography>
              {snowball && !snowball.hitCap ? (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Typography>Debt-free in <strong>{snowball.months} months</strong></Typography>
                  <Typography>Total interest paid: <strong>{currency.format(snowball.totalInterest)}</strong></Typography>
                </Stack>
              ) : (
                <Alert severity="warning" sx={{ mt: 2 }}>This debt load isn&apos;t payable with the current inputs within 600 months.</Alert>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Avalanche Strategy</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>Extra payment goes to the highest interest rate first.</Typography>
              {avalanche && !avalanche.hitCap ? (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <Typography>Debt-free in <strong>{avalanche.months} months</strong></Typography>
                  <Typography>Total interest paid: <strong>{currency.format(avalanche.totalInterest)}</strong></Typography>
                </Stack>
              ) : (
                <Alert severity="warning" sx={{ mt: 2 }}>This debt load isn&apos;t payable with the current inputs within 600 months.</Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

const DebtPayoffCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Debt Payoff Calculator Works</Typography>
      <Typography variant="body1">
        List each debt with its balance, annual interest rate, and minimum monthly payment, then set an
        extra amount you can put toward payoff each month. The calculator simulates two popular strategies
        month by month: the <strong>Snowball</strong> method (extra payment goes to the smallest balance
        first, then rolls to the next smallest once it&apos;s paid off) and the <strong>Avalanche</strong>{' '}
        method (extra payment goes to the highest interest rate first). Both simulations run until every
        debt reaches zero, capped at 600 months to avoid an endless loop on unrealistic inputs.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a $4,000 credit card at 22% APR, a $12,000 car loan at 7%, and an $8,000 student loan at 5%, plus
        $200 extra per month: the Avalanche method typically pays off the debts slightly faster and with less
        total interest, since it targets the 22% card first — but Snowball can still be worth it for the
        psychological win of clearing a full balance sooner.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding between Snowball and Avalanche before starting a debt payoff plan.</li>
          <li>Seeing exactly how many months of extra payments it takes to become debt-free.</li>
          <li>Estimating how much interest an extra monthly payment could save over time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Which strategy saves more money?</strong> Avalanche almost always results in less total interest paid, since it eliminates high-rate debt first. Snowball can take slightly longer and cost a bit more in interest, but many people find its quick wins easier to stick with.</li>
          <li><strong>What does "this debt load isn't payable" mean?</strong> It means that even after 600 months (50 years) of minimum plus extra payments, at least one balance never reaches zero — usually because the minimum payments don&apos;t cover the interest accruing each month. Increase the extra payment or renegotiate rates to fix this.</li>
          <li><strong>Does the simulation account for changing interest rates?</strong> No — each debt&apos;s rate is assumed to stay fixed for the entire simulation. If your actual rate is variable, treat the result as an estimate based on today&apos;s rate.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/debt-payoff-calculator" content={content}>
      <DebtPayoffCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DebtPayoffCalculator;
