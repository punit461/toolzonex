'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, IconButton, Button, LinearProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

interface CardRow {
  id: number;
  name: string;
  balance: string;
  limit: string;
}

const DEFAULT_ROWS: CardRow[] = [
  { id: 1, name: 'Card 1', balance: '1200', limit: '5000' },
  { id: 2, name: 'Card 2', balance: '400', limit: '2000' },
];

const CreditUtilizationCalculator = () => {
  const [rows, setRows] = useState<CardRow[]>(DEFAULT_ROWS);
  const [nextId, setNextId] = useState(DEFAULT_ROWS.length + 1);

  const addRow = () => {
    setRows([...rows, { id: nextId, name: `Card ${nextId}`, balance: '0', limit: '1000' }]);
    setNextId(nextId + 1);
  };
  const removeRow = (id: number) => setRows(rows.filter((r) => r.id !== id));
  const updateRow = (id: number, field: 'name' | 'balance' | 'limit', value: string) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const { totalBalance, totalLimit, utilization } = useMemo(() => {
    const balance = rows.reduce((sum, r) => sum + (parseFloat(r.balance) || 0), 0);
    const limit = rows.reduce((sum, r) => sum + (parseFloat(r.limit) || 0), 0);
    return { totalBalance: balance, totalLimit: limit, utilization: limit > 0 ? (balance / limit) * 100 : 0 };
  }, [rows]);

  const guidance = utilization <= 10
    ? { severity: 'success' as const, text: 'Excellent — utilization this low is ideal for credit scores.' }
    : utilization <= 30
    ? { severity: 'success' as const, text: 'Good — this is within the generally recommended 30% guideline.' }
    : utilization <= 50
    ? { severity: 'warning' as const, text: 'Elevated — consider paying down balances below 30% of total limits.' }
    : { severity: 'error' as const, text: 'High — utilization this high can meaningfully hurt credit scores.' };

  const content = (
    <>
      <Typography variant="h2">How Credit Utilization Is Calculated</Typography>
      <Typography variant="body1">
        Credit utilization is the percentage of your available credit that&apos;s currently in use.
        List each card&apos;s balance and credit limit, and the calculator sums them across all cards
        to find your overall utilization ratio — one of the most heavily weighted factors in most
        credit scoring models.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Utilization % = (Total Balances / Total Credit Limits) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a $1,200 balance on a $5,000 limit card and a $400 balance on a $2,000 limit card, total
        balances are $1,600 against $7,000 in total limits — an overall utilization of about 22.9%,
        comfortably under the commonly recommended 30% threshold.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking your overall utilization across multiple credit cards before a loan application.</li>
          <li>Deciding which card balance to pay down first to lower overall utilization.</li>
          <li>Monitoring utilization trends ahead of a mortgage or major credit decision.</li>
          <li>Understanding how a new credit limit increase affects your utilization ratio.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What utilization ratio is considered good?</Typography>
      <Typography variant="body1">
        Keeping overall utilization below 30% is a commonly cited guideline, with under 10% generally
        considered excellent for credit scoring purposes. Lower utilization signals to lenders that
        you&apos;re not overly reliant on revolving credit.
      </Typography>
      <Typography variant="h3">Does utilization matter per card or overall?</Typography>
      <Typography variant="body1">
        Both. Credit scoring models typically look at overall utilization across all cards as well as
        utilization on each individual card, so a single maxed-out card can hurt your score even if
        your overall ratio looks fine.
      </Typography>
      <Typography variant="h3">Does paying off a balance immediately lower utilization?</Typography>
      <Typography variant="body1">
        Utilization is based on the balance reported to credit bureaus, usually your statement balance
        on the closing date — not necessarily your balance right now. Paying down a balance before the
        statement closes is the most reliable way to lower reported utilization.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/credit-utilization-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={600}>Credit Cards</Typography>
          {rows.map((row) => (
            <Box key={row.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label="Card"
                value={row.name}
                onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                size="small"
                sx={{ flex: 1.2 }}
              />
              <TextField
                label="Balance"
                type="number"
                value={row.balance}
                onChange={(e) => updateRow(row.id, 'balance', e.target.value)}
                size="small"
                sx={{ flex: 1 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
              <TextField
                label="Limit"
                type="number"
                value={row.limit}
                onChange={(e) => updateRow(row.id, 'limit', e.target.value)}
                size="small"
                sx={{ flex: 1 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
              <IconButton onClick={() => removeRow(row.id)} size="small" aria-label="Remove card">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addRow} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
            Add Card
          </Button>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Overall Credit Utilization</Typography>
            <Typography variant="h3" fontWeight="bold">{utilization.toFixed(1)}%</Typography>
          </Paper>
          <LinearProgress
            variant="determinate"
            value={Math.min(utilization, 100)}
            sx={{ height: 10, borderRadius: 5, mb: 2 }}
            color={utilization <= 30 ? 'success' : utilization <= 50 ? 'warning' : 'error'}
          />
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Balances</Typography>
            <Typography fontWeight={600}>{fmt(totalBalance)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Credit Limits</Typography>
            <Typography fontWeight={600}>{fmt(totalLimit)}</Typography>
          </Paper>
          <Alert severity={guidance.severity}>{guidance.text}</Alert>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CreditUtilizationCalculator;
