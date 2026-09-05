'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RunwayCalculator = () => {
  const [cashBalance, setCashBalance] = useState('500000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('60000');
  const [monthlyRevenue, setMonthlyRevenue] = useState('10000');

  const result = useMemo(() => {
    const cash = parseFloat(cashBalance) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const revenue = parseFloat(monthlyRevenue) || 0;
    const netBurn = expenses - revenue;

    if (cash <= 0 || netBurn <= 0) return { valid: false, months: 0, endDate: null as Date | null, netBurn };

    const months = cash / netBurn;
    const endDate = new Date();
    endDate.setDate(1);
    endDate.setMonth(endDate.getMonth() + Math.floor(months));
    const dayFraction = months - Math.floor(months);
    endDate.setDate(Math.round(dayFraction * 30) + 1);

    return { valid: true, months, endDate, netBurn };
  }, [cashBalance, monthlyExpenses, monthlyRevenue]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Runway Calculator</Typography>
      <Typography variant="body1">
        Enter your current cash balance and your monthly expenses (gross cash outflow). If you also have
        monthly revenue coming in, enter it too — the calculator subtracts revenue from expenses to get your
        net monthly burn rate before dividing it into your cash balance. Runway tells you how many months you
        can keep operating at the current burn rate before running out of cash.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Net Monthly Burn = Monthly Expenses − Monthly Revenue
        <br />
        Runway (months) = Cash Balance / Net Monthly Burn
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A startup has $500,000 in the bank, spends $60,000 a month, and brings in $10,000 a month in revenue.
        Net burn = $60,000 − $10,000 = $50,000/month. Runway = $500,000 / $50,000 = 10 months, meaning cash
        runs out roughly 10 months from today at the current pace.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding how urgently a startup needs to raise its next funding round.</li>
          <li>Modeling how a hiring decision or cost cut would change the runway timeline.</li>
          <li>Reporting cash health to investors or the board in board meeting updates.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if my revenue exceeds my expenses?</strong> Then your net burn is zero or negative, meaning you&apos;re cash-flow positive and don&apos;t have a runway problem — the calculator will not show a runway figure in that case since you&apos;re not burning cash.</li>
          <li><strong>Should I use gross burn or net burn?</strong> Net burn (expenses minus revenue) gives a more realistic picture of how fast your cash balance is actually shrinking. Gross burn (expenses alone) is useful too, but leaving revenue out of the field will effectively calculate gross-burn runway instead.</li>
          <li><strong>Is the &quot;runway ends&quot; date exact?</strong> It&apos;s an estimate based on your current burn rate staying constant. Real burn rates fluctuate month to month with hiring, one-time expenses, and revenue changes, so treat the date as a planning guide rather than a guarantee.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/runway-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Current Cash Balance ($)" type="number" value={cashBalance} onChange={(e) => setCashBalance(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Monthly Expenses ($)" type="number" value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Monthly Revenue ($) (optional)" type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)} onFocus={(e) => e.target.select()} fullWidth helperText="Leave at 0 if you have no revenue yet" />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Runway</Typography>
            <Typography variant="h3" fontWeight="bold">{result.valid ? `${result.months.toFixed(1)} months` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Net Monthly Burn</Typography>
            <Typography fontWeight={600}>${result.netBurn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Typography>
          </Paper>
          {result.valid && result.endDate && (
            <Paper sx={{ p: 2 }}>
              <Typography>Estimated Runway Ends</Typography>
              <Typography fontWeight={600}>
                {result.endDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RunwayCalculator;
