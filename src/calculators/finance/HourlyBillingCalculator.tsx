'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface Task {
  id: number;
  description: string;
  hours: string;
  rate: string;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, description: 'Website redesign', hours: '12', rate: '85' },
  { id: 2, description: 'Client strategy call', hours: '2', rate: '100' },
];

const HourlyBillingContent = () => {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [nextId, setNextId] = useState(DEFAULT_TASKS.length + 1);

  const addTask = () => {
    setTasks([...tasks, { id: nextId, description: 'Task', hours: '1', rate: '75' }]);
    setNextId(nextId + 1);
  };
  const removeTask = (id: number) => setTasks(tasks.filter((t) => t.id !== id));
  const updateTask = (id: number, field: 'description' | 'hours' | 'rate', v: string) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, [field]: v } : t)));

  const rows = tasks.map((t) => ({
    ...t,
    total: (parseFloat(t.hours) || 0) * (parseFloat(t.rate) || 0),
  }));
  const grandTotal = rows.reduce((sum, r) => sum + r.total, 0);
  const totalHours = rows.reduce((sum, r) => sum + (parseFloat(r.hours) || 0), 0);

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {tasks.map((t) => (
          <Box key={t.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Task Description" value={t.description} onChange={(e) => updateTask(t.id, 'description', e.target.value)} size="small" sx={{ flex: 2, minWidth: 160 }} />
            <TextField
              label="Hours" type="number" value={t.hours} onChange={(e) => updateTask(t.id, 'hours', e.target.value)}
              size="small" sx={{ flex: 1, minWidth: 90 }}
            />
            <TextField
              label="Hourly Rate" type="number" value={t.rate} onChange={(e) => updateTask(t.id, 'rate', e.target.value)}
              size="small" sx={{ flex: 1, minWidth: 100 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <IconButton onClick={() => removeTask(t.id)} size="small" aria-label="Remove task" disabled={tasks.length <= 1}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addTask} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Billable Task
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="right">Hours</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.description}</TableCell>
                <TableCell align="right">{r.hours}</TableCell>
                <TableCell align="right">{money(parseFloat(r.rate) || 0)}</TableCell>
                <TableCell align="right">{money(r.total)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{totalHours.toFixed(2)}</TableCell>
              <TableCell />
              <TableCell align="right" sx={{ fontWeight: 600 }}>{money(grandTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="body2">Grand Total</Typography>
        <Typography variant="h4" fontWeight="bold">{money(grandTotal)}</Typography>
      </Paper>
    </Box>
  );
};

const HourlyBillingCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Hourly Billing Calculator</Typography>
      <Typography variant="body1">
        List each billable task with its description, hours worked, and hourly rate — rates can differ row by
        row, which is useful when different tasks or different clients bill at different rates within the
        same billing period. Add or remove rows as needed. Each row&apos;s total is hours times rate, and the
        grand total sums every row into your full amount to bill.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Row Total = Hours × Hourly Rate
        <br />
        Grand Total = Sum of All Row Totals
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        12 hours of website redesign work at $85/hr ($1,020) plus a 2-hour client strategy call at $100/hr
        ($200) comes to a grand total of $1,220 across both tasks for the billing period.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tallying multiple billable tasks that each carry a different hourly rate within one billing period.</li>
          <li>Freelancers and contractors preparing a total before sending an invoice to a client.</li>
          <li>Quickly checking whether a mix of task rates and hours adds up to the amount expected.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Hourly to Salary Calculator?</strong> The Hourly to Salary Calculator converts a single wage into projected weekly, monthly, and annual salary figures — a totally different purpose focused on income projection, not billing. This tool tallies actual billable tasks with individually varying rates for a specific billing period.</li>
          <li><strong>How is this different from the Invoice Total Calculator?</strong> The Invoice Total Calculator handles quantity × unit price line items with tax and discount machinery for a single invoice document. This tool is specifically for freelancers or contractors tallying multiple billable TASKS by hours × rate, with no tax or discount handling — it's the underlying hours-based billing math, not full invoice formatting.</li>
          <li><strong>Can different tasks use completely different rates?</strong> Yes — every row has its own independent rate field, so you can mix a lower rate for administrative tasks with a higher rate for specialized work, or bill different clients' work at their respective rates within the same list.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/hourly-billing-calculator" content={content}>
      <HourlyBillingContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HourlyBillingCalculator;
