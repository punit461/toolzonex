'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Button,
  LinearProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

interface ExpenseRow {
  id: number;
  category: string;
  amount: string;
}

const DEFAULT_ROWS: ExpenseRow[] = [
  { id: 1, category: 'Housing', amount: '1500' },
  { id: 2, category: 'Food', amount: '500' },
  { id: 3, category: 'Transport', amount: '300' },
  { id: 4, category: 'Utilities', amount: '200' },
  { id: 5, category: 'Entertainment', amount: '150' },
];

const COLORS = ['#1a56db', '#0d9488', '#e11d48', '#eab308', '#7e3af2', '#dc2626', '#0284c7', '#c27803'];

const BudgetPlanner = () => {
  const [income, setIncome] = useState<string>('4000');
  const [rows, setRows] = useState<ExpenseRow[]>(DEFAULT_ROWS);
  const [nextId, setNextId] = useState(DEFAULT_ROWS.length + 1);

  const addRow = () => {
    setRows([...rows, { id: nextId, category: 'New Category', amount: '0' }]);
    setNextId(nextId + 1);
  };

  const removeRow = (id: number) => setRows(rows.filter((r) => r.id !== id));

  const updateRow = (id: number, field: 'category' | 'amount', value: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const { monthlyIncome, totalExpenses, remaining, breakdown } = useMemo(() => {
    const incomeNum = parseFloat(income) || 0;
    const total = rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);
    const rem = incomeNum - total;
    const bd = rows.map((r) => {
      const amt = parseFloat(r.amount) || 0;
      return { category: r.category, amount: amt, pct: total > 0 ? (amt / total) * 100 : 0 };
    });
    return { monthlyIncome: incomeNum, totalExpenses: total, remaining: rem, breakdown: bd };
  }, [income, rows]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Budget Planner</Typography>
      <Typography variant="body1">
        Enter your monthly income, then list your expense categories with their amounts — housing, food,
        transport, utilities, and anything else you spend on. The calculator totals your expenses, shows how
        much is left over (or how far you&apos;re over budget), and breaks down what percentage of your
        spending goes to each category. Add or remove rows to match your own budget.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a monthly income of $4,000 and expenses of $1,500 (housing), $500 (food), $300 (transport), $200
        (utilities), and $150 (entertainment), total expenses come to $2,650, leaving a surplus of $1,350.
        Housing makes up about 57% of total spending, the largest single category.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a monthly budget to control discretionary spending.</li>
          <li>Spotting which expense category is eating the largest share of income.</li>
          <li>Checking whether income comfortably covers fixed and variable costs before committing to a new expense.</li>
          <li>Planning how much can realistically be saved or invested each month.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if my expenses exceed my income?</Typography>
      <Typography variant="body1">
        The remaining amount will show as negative, meaning you&apos;re spending more than you earn. Review the
        percentage breakdown to identify which categories to trim first.
      </Typography>
      <Typography variant="h3">Should I include savings as an expense category?</Typography>
      <Typography variant="body1">
        Yes — many budgeting methods (like &quot;pay yourself first&quot;) treat savings and investments as a
        fixed line item, not just whatever is left over. Add a &quot;Savings&quot; row with your target amount.
      </Typography>
      <Typography variant="h3">How many expense categories should I track?</Typography>
      <Typography variant="body1">
        There&apos;s no fixed number — start broad (housing, food, transport, utilities, discretionary) and
        split categories further only if you need more visibility into where money is going.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/budget-planner" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Monthly Income"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />

          <Typography variant="subtitle1" fontWeight={600}>Expense Categories</Typography>
          {rows.map((row) => (
            <Box key={row.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label="Category"
                value={row.category}
                onChange={(e) => updateRow(row.id, 'category', e.target.value)}
                size="small"
                sx={{ flex: 2 }}
              />
              <TextField
                label="Amount"
                type="number"
                value={row.amount}
                onChange={(e) => updateRow(row.id, 'amount', e.target.value)}
                size="small"
                sx={{ flex: 1 }}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
              <IconButton onClick={() => removeRow(row.id)} size="small" aria-label="Remove category">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addRow} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
            Add Category
          </Button>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: remaining >= 0 ? 'primary.main' : 'error.main', color: 'white' }}>
            <Typography variant="body2">{remaining >= 0 ? 'Remaining (Surplus)' : 'Over Budget'}</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(Math.abs(remaining))}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Income</Typography>
            <Typography fontWeight={600}>{fmt(monthlyIncome)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Expenses</Typography>
            <Typography fontWeight={600}>{fmt(totalExpenses)}</Typography>
          </Paper>

          <Typography variant="subtitle2" color="text.secondary" mb={1}>Spending Breakdown</Typography>
          {breakdown.map((b, i) => (
            <Box key={b.category} sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">{b.category}</Typography>
                <Typography variant="body2" fontWeight={600}>{fmt(b.amount)} ({b.pct.toFixed(1)}%)</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(b.pct, 100)}
                sx={{ height: 8, borderRadius: 4, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: COLORS[i % COLORS.length] } }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BudgetPlanner;
