'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

interface Row {
  id: number;
  label: string;
  amount: string;
}

const DEFAULT_INFLOWS: Row[] = [
  { id: 1, label: 'Salary', amount: '5000' },
  { id: 2, label: 'Side Income', amount: '500' },
];

const DEFAULT_OUTFLOWS: Row[] = [
  { id: 1, label: 'Rent', amount: '1800' },
  { id: 2, label: 'Groceries', amount: '600' },
  { id: 3, label: 'Utilities', amount: '250' },
];

const RowList = ({
  title,
  rows,
  onAdd,
  onRemove,
  onUpdate,
}: {
  title: string;
  rows: Row[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onUpdate: (id: number, field: 'label' | 'amount', value: string) => void;
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
    <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
    {rows.map((row) => (
      <Box key={row.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          label="Description"
          value={row.label}
          onChange={(e) => onUpdate(row.id, 'label', e.target.value)}
          size="small"
          sx={{ flex: 2 }}
        />
        <TextField
          label="Amount"
          type="number"
          value={row.amount}
          onChange={(e) => onUpdate(row.id, 'amount', e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <IconButton onClick={() => onRemove(row.id)} size="small" aria-label={`Remove ${title.toLowerCase()} row`}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    ))}
    <Button startIcon={<AddIcon />} onClick={onAdd} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
      Add Row
    </Button>
  </Box>
);

const CashFlowCalculator = () => {
  const [inflows, setInflows] = useState<Row[]>(DEFAULT_INFLOWS);
  const [outflows, setOutflows] = useState<Row[]>(DEFAULT_OUTFLOWS);
  const [nextInflowId, setNextInflowId] = useState(DEFAULT_INFLOWS.length + 1);
  const [nextOutflowId, setNextOutflowId] = useState(DEFAULT_OUTFLOWS.length + 1);

  const addInflow = () => {
    setInflows([...inflows, { id: nextInflowId, label: 'New Inflow', amount: '0' }]);
    setNextInflowId(nextInflowId + 1);
  };
  const addOutflow = () => {
    setOutflows([...outflows, { id: nextOutflowId, label: 'New Outflow', amount: '0' }]);
    setNextOutflowId(nextOutflowId + 1);
  };

  const removeInflow = (id: number) => setInflows(inflows.filter((r) => r.id !== id));
  const removeOutflow = (id: number) => setOutflows(outflows.filter((r) => r.id !== id));

  const updateInflow = (id: number, field: 'label' | 'amount', value: string) =>
    setInflows(inflows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  const updateOutflow = (id: number, field: 'label' | 'amount', value: string) =>
    setOutflows(outflows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const { totalInflow, totalOutflow, netCashFlow } = useMemo(() => {
    const inflowTotal = inflows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
    const outflowTotal = outflows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
    return { totalInflow: inflowTotal, totalOutflow: outflowTotal, netCashFlow: inflowTotal - outflowTotal };
  }, [inflows, outflows]);

  const content = (
    <>
      <Typography variant="h2">How Net Cash Flow Is Calculated</Typography>
      <Typography variant="body1">
        List every source of cash coming in — income, side earnings, investment payouts — as inflow
        rows, and every cash going out — rent, bills, loan payments — as outflow rows. The calculator
        totals each side and subtracts total outflows from total inflows to give your net cash flow: a
        positive number means more cash is coming in than going out, a negative number means the
        opposite.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Net Cash Flow = Total Inflows − Total Outflows
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With $5,000 in salary and $500 in side income ($5,500 total inflow), against $1,800 rent, $600
        groceries, and $250 utilities ($2,650 total outflow), net cash flow comes to $2,850 — a healthy
        surplus available for saving, investing, or debt paydown.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking whether personal or business cash flow is positive or negative for a period.</li>
          <li>Identifying which inflow or outflow items have the biggest impact on your cash position.</li>
          <li>Planning ahead for months with unusual expenses or irregular income.</li>
          <li>Building a simple cash flow statement without a full accounting system.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is net cash flow the same as profit?</Typography>
      <Typography variant="body1">
        Not exactly. Profit is based on accounting revenue and expenses, which can include non-cash
        items like depreciation, while cash flow only tracks actual money moving in and out. A business
        can be profitable on paper but still have poor cash flow, and vice versa.
      </Typography>
      <Typography variant="h3">What should I do if my cash flow is negative?</Typography>
      <Typography variant="body1">
        Review the outflow list for expenses that can be reduced or delayed, and check whether any
        inflows are one-time versus recurring. Persistent negative cash flow means you&apos;re drawing
        down savings or debt to cover the shortfall.
      </Typography>
      <Typography variant="h3">Should I include one-time items?</Typography>
      <Typography variant="body1">
        You can, but it&apos;s often more useful to calculate recurring cash flow separately from
        one-time inflows or outflows (like a bonus or a large purchase) so you can see your ongoing,
        sustainable cash position clearly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/cash-flow-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <RowList title="Cash Inflows" rows={inflows} onAdd={addInflow} onRemove={removeInflow} onUpdate={updateInflow} />
          <RowList title="Cash Outflows" rows={outflows} onAdd={addOutflow} onRemove={removeOutflow} onUpdate={updateOutflow} />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: netCashFlow >= 0 ? 'primary.main' : 'error.main', color: 'white' }}>
            <Typography variant="body2">Net Cash Flow</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(netCashFlow)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Inflows</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(totalInflow)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Outflows</Typography>
            <Typography fontWeight={600} color="error.main">{fmt(totalOutflow)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CashFlowCalculator;
