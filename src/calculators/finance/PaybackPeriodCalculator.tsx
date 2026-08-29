'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

interface FlowRow {
  id: number;
  amount: string;
}

const PaybackPeriodCalculator = () => {
  const [mode, setMode] = useState<'constant' | 'variable'>('constant');
  const [initialInvestment, setInitialInvestment] = useState('50000');
  const [annualInflow, setAnnualInflow] = useState('12000');
  const [rows, setRows] = useState<FlowRow[]>([
    { id: 1, amount: '15000' },
    { id: 2, amount: '15000' },
    { id: 3, amount: '15000' },
    { id: 4, amount: '15000' },
  ]);
  const [nextId, setNextId] = useState(5);

  const addRow = () => {
    setRows([...rows, { id: nextId, amount: '0' }]);
    setNextId(nextId + 1);
  };
  const removeRow = (id: number) => setRows(rows.filter((r) => r.id !== id));
  const updateRow = (id: number, value: string) => setRows(rows.map((r) => (r.id === id ? { ...r, amount: value } : r)));

  const { paybackYears, paybackLabel, cumulative } = useMemo(() => {
    const investment = parseFloat(initialInvestment) || 0;

    if (mode === 'constant') {
      const inflow = parseFloat(annualInflow) || 0;
      const years = inflow > 0 ? investment / inflow : 0;
      return { paybackYears: years, paybackLabel: `${years.toFixed(2)} years`, cumulative: [] as { year: number; cum: number }[] };
    }

    const flows = rows.map((r) => parseFloat(r.amount) || 0);
    let cum = -investment;
    const cumList: { year: number; cum: number }[] = [];
    let paybackAt: number | null = null;
    for (let i = 0; i < flows.length; i++) {
      const prevCum = cum;
      cum += flows[i];
      cumList.push({ year: i + 1, cum });
      if (paybackAt === null && cum >= 0 && flows[i] > 0) {
        const fraction = -prevCum / flows[i];
        paybackAt = i + fraction;
      }
    }
    const label = paybackAt !== null ? `${paybackAt.toFixed(2)} years` : 'Not recovered within entered years';
    return { paybackYears: paybackAt ?? 0, paybackLabel: label, cumulative: cumList };
  }, [mode, initialInvestment, annualInflow, rows]);

  const content = (
    <>
      <Typography variant="h2">How Payback Period Is Calculated</Typography>
      <Typography variant="body1">
        The payback period is the time it takes for an investment&apos;s cash inflows to equal its initial
        cost — a simple, non-discounted measure of how quickly you recover what you put in. Use constant mode
        if you expect the same cash inflow every year, or variable mode to enter a different inflow for each
        year.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Payback Period (constant) = Initial Investment ÷ Annual Cash Inflow
        <br />
        Payback Period (variable) = Last full year before cumulative cash flow turns positive, plus the
        fraction of the next year needed to close the remaining gap
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $50,000 investment generating a constant $12,000 per year has a payback period of 50,000 ÷ 12,000 ≈
        4.17 years. With variable inflows of $15,000 per year for four years, cumulative cash flow turns
        positive partway through year 4, giving a payback period of about 3.33 years.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing how quickly different projects recoup their initial cost.</li>
          <li>Screening capital investments for liquidity risk before deeper analysis.</li>
          <li>Setting a maximum acceptable payback period as an investment criterion.</li>
          <li>Communicating investment recovery time to stakeholders in simple terms.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why doesn&apos;t this account for the time value of money?</Typography>
      <Typography variant="body1">
        The simple payback period intentionally ignores discounting for ease of use. For a discounted view
        that accounts for the time value of money, use a discounted payback period or the{' '}
        <a href="/finance/present-value-calculator">Present Value Calculator</a> alongside this tool.
      </Typography>
      <Typography variant="h3">What is a good payback period?</Typography>
      <Typography variant="body1">
        It depends on the industry and risk tolerance — many businesses target 2-4 years for equipment or
        smaller projects, while larger infrastructure investments may accept much longer payback windows.
      </Typography>
      <Typography variant="h3">What if cash inflows never recover the investment?</Typography>
      <Typography variant="body1">
        In variable mode, if cumulative cash flow never turns positive within the years you&apos;ve entered,
        the calculator shows that the investment isn&apos;t recovered within that timeframe — add more years
        of inflows to see when (or if) it would be.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/payback-period-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Initial Investment"
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />

          <ToggleButtonGroup value={mode} exclusive onChange={(_, val) => val && setMode(val)} size="small" fullWidth>
            <ToggleButton value="constant">Constant Annual Inflow</ToggleButton>
            <ToggleButton value="variable">Variable Yearly Inflows</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'constant' ? (
            <TextField
              label="Annual Cash Inflow"
              type="number"
              value={annualInflow}
              onChange={(e) => setAnnualInflow(e.target.value)}
              fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {rows.map((row, i) => (
                <Box key={row.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    label={`Year ${i + 1} Inflow`}
                    type="number"
                    value={row.amount}
                    onChange={(e) => updateRow(row.id, e.target.value)}
                    size="small"
                    fullWidth
                    slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                  />
                  <IconButton onClick={() => removeRow(row.id)} size="small" aria-label="Remove year">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button startIcon={<AddIcon />} onClick={addRow} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
                Add Year
              </Button>
            </Box>
          )}
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Payback Period</Typography>
            <Typography variant="h4" fontWeight="bold">{paybackLabel}</Typography>
          </Paper>

          {mode === 'variable' && cumulative.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>Cumulative Cash Flow</Typography>
              {cumulative.map((c) => (
                <Paper key={c.year} sx={{ p: 1.5, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Year {c.year}</Typography>
                  <Typography variant="body2" fontWeight={600} color={c.cum >= 0 ? 'success.main' : 'error.main'}>
                    {fmt(c.cum)}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PaybackPeriodCalculator;
