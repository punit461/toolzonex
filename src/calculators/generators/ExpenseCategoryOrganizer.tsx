'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES = ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Other'] as const;
type Category = (typeof CATEGORIES)[number];

interface Expense {
  id: number;
  description: string;
  amount: string;
  category: Category;
}

let nextId = 1;

const DEFAULT_EXPENSES: Expense[] = [
  { id: nextId++, description: 'Rent', amount: '1200', category: 'Housing' },
  { id: nextId++, description: 'Groceries', amount: '150', category: 'Food' },
];

const formatCurrency = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ExpenseCategoryOrganizerContent = () => {
  const [expenses, setExpenses] = useState<Expense[]>(DEFAULT_EXPENSES);

  const addExpense = () => setExpenses((prev) => [...prev, { id: nextId++, description: '', amount: '', category: 'Housing' }]);
  const removeExpense = (id: number) => setExpenses((prev) => prev.filter((e) => e.id !== id));
  const updateExpense = (id: number, patch: Partial<Expense>) =>
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  const grouped = useMemo(() => {
    const groups: Record<string, { items: Expense[]; subtotal: number }> = {};
    CATEGORIES.forEach((cat) => {
      const items = expenses.filter((e) => e.category === cat && e.description.trim());
      if (items.length > 0) {
        const subtotal = items.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
        groups[cat] = { items, subtotal };
      }
    });
    return groups;
  }, [expenses]);

  const grandTotal = useMemo(
    () => Object.values(grouped).reduce((sum, g) => sum + g.subtotal, 0),
    [grouped]
  );

  const copySummary = async () => {
    const lines: string[] = [];
    Object.entries(grouped).forEach(([cat, g]) => {
      lines.push(`${cat} (subtotal: ${formatCurrency(g.subtotal)})`);
      g.items.forEach((e) => lines.push(`  - ${e.description.trim()}: ${formatCurrency(parseFloat(e.amount) || 0)}`));
    });
    lines.push(`Grand Total: ${formatCurrency(grandTotal)}`);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Expenses</Typography>
        <Stack spacing={2}>
          {expenses.map((e) => (
            <Paper key={e.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Description" value={e.description} onChange={(ev) => updateExpense(e.id, { description: ev.target.value })} />
                <IconButton onClick={() => removeExpense(e.id)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1}>
                <TextField size="small" fullWidth label="Amount" type="number" value={e.amount} onChange={(ev) => updateExpense(e.id, { amount: ev.target.value })} />
                <FormControl size="small" fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    value={e.category}
                    onChange={(ev: SelectChangeEvent) => updateExpense(e.id, { category: ev.target.value as Category })}
                  >
                    {CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Paper>
          ))}
          {expenses.length === 0 && (
            <Typography variant="body2" color="text.secondary">No expenses yet. Add one below.</Typography>
          )}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addExpense} sx={{ mt: 2 }}>
          Add Expense
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Organized by Category</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copySummary} disabled={Object.keys(grouped).length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {Object.keys(grouped).length === 0 && (
            <Typography variant="body2" color="text.secondary">Add expenses to see them organized by category with subtotals.</Typography>
          )}
          {Object.entries(grouped).map(([cat, g]) => (
            <Box key={cat} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>{cat} — {formatCurrency(g.subtotal)}</Typography>
              <ul style={{ marginTop: 4 }}>
                {g.items.map((e) => (
                  <li key={e.id}>{e.description} — {formatCurrency(parseFloat(e.amount) || 0)}</li>
                ))}
              </ul>
            </Box>
          ))}
          {Object.keys(grouped).length > 0 && (
            <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 2, borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
              Grand Total: {formatCurrency(grandTotal)}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const ExpenseCategoryOrganizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Expense Category Organizer</Typography>
      <Typography variant="body1">
        Add each expense with a description, amount, and category — Housing, Food, Transport, Entertainment,
        Utilities, or Other. The panel on the right automatically groups your expenses by category, calculates
        a subtotal for each category, and rolls everything up into a grand total, so you can see at a glance
        where your money is going.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Rent&quot; ($1200, Housing) and &quot;Groceries&quot; ($150, Food) produces a Housing
        section with a $1200 subtotal, a Food section with a $150 subtotal, and a grand total of $1350 across
        both categories.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Organizing a month&apos;s spending by category to see where money goes before building a budget.</li>
          <li>Sorting shared household expenses into categories before splitting costs with roommates.</li>
          <li>Reviewing business expenses grouped by category before a monthly or quarterly report.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I change an expense&apos;s category after adding it?</strong> Yes — use the Category dropdown on any expense card to move it to a different category at any time; subtotals update automatically.</li>
          <li><strong>How is the subtotal for each category calculated?</strong> It&apos;s the sum of the amount entered for every expense assigned to that category, and the grand total is the sum of all category subtotals.</li>
          <li><strong>Is my expense list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the summary before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/expense-category-organizer" content={content}>
      <ExpenseCategoryOrganizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExpenseCategoryOrganizer;
