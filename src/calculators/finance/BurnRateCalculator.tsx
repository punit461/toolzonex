'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, IconButton, Stack, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface MonthExpense {
  id: string;
  label: string;
  amount: number;
}

let nextId = 4;

const BurnRateCalculatorContent = () => {
  const [cashBalance, setCashBalance] = useState('500000');
  const [months, setMonths] = useState<MonthExpense[]>([
    { id: '1', label: 'Month 1', amount: 45000 },
    { id: '2', label: 'Month 2', amount: 48000 },
    { id: '3', label: 'Month 3', amount: 51000 },
  ]);

  const addMonth = () => setMonths([...months, { id: String(nextId++), label: `Month ${months.length + 1}`, amount: 0 }]);
  const removeMonth = (id: string) => setMonths(months.filter((m) => m.id !== id));
  const updateMonth = (id: string, field: 'label' | 'amount', val: string | number) => {
    setMonths(months.map((m) => (m.id === id ? { ...m, [field]: val } : m)));
  };

  const result = useMemo(() => {
    const cash = parseFloat(cashBalance) || 0;
    const validAmounts = months.map((m) => (Number.isNaN(m.amount) ? 0 : m.amount));
    const avgBurn = validAmounts.length > 0 ? validAmounts.reduce((a, b) => a + b, 0) / validAmounts.length : 0;
    const runwayMonths = avgBurn > 0 ? cash / avgBurn : Infinity;
    return { avgBurn, runwayMonths };
  }, [cashBalance, months]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Starting Cash Balance"
          type="number"
          value={cashBalance}
          onChange={(e) => setCashBalance(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          sx={{ mb: 3 }}
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />

        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>Recent Monthly Expenses</Typography>
        <Stack spacing={1.5}>
          {months.map((m, index) => (
            <Stack key={m.id} direction="row" spacing={1.5} alignItems="center">
              <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
              <TextField
                label="Month" size="small" fullWidth
                value={m.label}
                onChange={(e) => updateMonth(m.id, 'label', e.target.value)}
              />
              <TextField
                label="Expenses ($)" type="number" size="small" fullWidth
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(m.amount) ? '' : m.amount}
                onChange={(e) => updateMonth(m.id, 'amount', e.target.value === '' ? NaN : Number(e.target.value))}
              />
              <IconButton color="error" size="small" onClick={() => removeMonth(m.id)} disabled={months.length <= 1}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addMonth} sx={{ mt: 2 }}>Add Month</Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Runway</Typography>
          <Typography variant="h3" fontWeight="bold">
            {Number.isFinite(result.runwayMonths) ? `${result.runwayMonths.toFixed(1)} mo` : '∞'}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Average Monthly Burn Rate</Typography>
          <Typography fontWeight={600}>{money(result.avgBurn)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const BurnRateCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Burn Rate Calculator Works</Typography>
      <Typography variant="body1">
        Enter your starting cash balance and your recent monthly expenses (add a row per month for a more
        accurate average, or just one row for a quick estimate). The calculator averages those expenses into
        a monthly burn rate, then divides your cash balance by that burn rate to estimate your runway — how
        many months until the cash runs out at the current spending pace.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Runway (months) = Cash Balance ÷ Average Monthly Burn Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a $500,000 cash balance and monthly expenses of $45,000, $48,000, and $51,000 over the last three
        months, the average burn rate is $48,000/month. Runway is 500,000 ÷ 48,000 ≈ 10.4 months.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how long a startup&apos;s cash reserves will last at the current spending rate.</li>
          <li>Deciding when to start the next fundraising round based on remaining runway.</li>
          <li>Tracking whether recent cost-cutting has actually lowered the monthly burn rate.</li>
          <li>Comparing runway scenarios under different projected spending levels.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between gross and net burn rate?</Typography>
      <Typography variant="body1">
        Gross burn rate is total monthly operating expenses. Net burn rate subtracts any monthly revenue from
        that figure. This calculator computes gross burn from the expense figures you enter — if you want net
        burn, subtract your monthly revenue from each month&apos;s expenses before entering them.
      </Typography>
      <Typography variant="h3">Why average several months instead of using just one?</Typography>
      <Typography variant="body1">
        Monthly expenses often fluctuate due to one-off costs or timing of payments. Averaging several recent
        months smooths out those bumps and gives a more realistic ongoing burn rate than any single month
        might show.
      </Typography>
      <Typography variant="h3">How much runway should a startup aim to keep?</Typography>
      <Typography variant="body1">
        Many investors and operators suggest keeping at least 12-18 months of runway, giving enough time to
        hit milestones and raise a next round comfortably rather than fundraising under time pressure. Your
        ideal target depends on your stage, growth trajectory, and how quickly you could raise more capital.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/burn-rate-calculator" content={content}>
      <BurnRateCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BurnRateCalculator;
