'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Bill {
  id: number;
  name: string;
  amount: string;
  dueDate: string;
  paid: boolean;
}

let nextId = 1;

const DEFAULT_BILLS: Bill[] = [
  { id: nextId++, name: 'Electricity', amount: '85', dueDate: '2026-09-15', paid: false },
  { id: nextId++, name: 'Internet', amount: '60', dueDate: '2026-09-05', paid: true },
];

const formatCurrency = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const BillPaymentChecklistContent = () => {
  const [bills, setBills] = useState<Bill[]>(DEFAULT_BILLS);

  const addBill = () => setBills((prev) => [...prev, { id: nextId++, name: '', amount: '', dueDate: '', paid: false }]);
  const removeBill = (id: number) => setBills((prev) => prev.filter((b) => b.id !== id));
  const updateBill = (id: number, patch: Partial<Bill>) =>
    setBills((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const sortedBills = useMemo(() => {
    return bills
      .filter((b) => b.name.trim())
      .slice()
      .sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
  }, [bills]);

  const summary = useMemo(() => {
    const paidCount = sortedBills.filter((b) => b.paid).length;
    const unpaidCount = sortedBills.length - paidCount;
    const unpaidTotal = sortedBills.filter((b) => !b.paid).reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
    return { paidCount, unpaidCount, unpaidTotal };
  }, [sortedBills]);

  const copyList = async () => {
    const lines = sortedBills.map(
      (b) => `${b.paid ? '[x]' : '[ ]'} ${b.name.trim()} — ${formatCurrency(parseFloat(b.amount) || 0)} — due ${b.dueDate || 'no date'}`
    );
    lines.push(`\nPaid: ${summary.paidCount}, Unpaid: ${summary.unpaidCount}, Total still owed: ${formatCurrency(summary.unpaidTotal)}`);
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Bills</Typography>
        <Stack spacing={2}>
          {bills.map((b) => (
            <Paper key={b.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Bill name" value={b.name} onChange={(e) => updateBill(b.id, { name: e.target.value })} />
                <IconButton onClick={() => removeBill(b.id)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField size="small" fullWidth label="Amount" type="number" value={b.amount} onChange={(e) => updateBill(b.id, { amount: e.target.value })} />
                <TextField size="small" fullWidth type="date" label="Due date" InputLabelProps={{ shrink: true }} value={b.dueDate} onChange={(e) => updateBill(b.id, { dueDate: e.target.value })} />
                <FormControlLabel
                  control={<Checkbox checked={b.paid} onChange={(e) => updateBill(b.id, { paid: e.target.checked })} />}
                  label="Paid"
                  sx={{ whiteSpace: 'nowrap' }}
                />
              </Stack>
            </Paper>
          ))}
          {bills.length === 0 && (
            <Typography variant="body2" color="text.secondary">No bills yet. Add one below.</Typography>
          )}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addBill} sx={{ mt: 2 }}>
          Add Bill
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Sorted by Due Date</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={sortedBills.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {sortedBills.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add bills to see them sorted by due date, soonest first.</Typography>
          )}
          <ul style={{ marginTop: 0 }}>
            {sortedBills.map((b) => (
              <li key={b.id} style={{ textDecoration: b.paid ? 'line-through' : 'none', opacity: b.paid ? 0.6 : 1 }}>
                {b.name} — {formatCurrency(parseFloat(b.amount) || 0)} — due {b.dueDate || 'no date'} {b.paid ? '(Paid)' : '(Unpaid)'}
              </li>
            ))}
          </ul>
          {sortedBills.length > 0 && (
            <Box sx={{ mt: 2, borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
              <Typography variant="body2">Paid: {summary.paidCount} &nbsp;|&nbsp; Unpaid: {summary.unpaidCount}</Typography>
              <Typography variant="subtitle1" fontWeight={700}>Total still owed: {formatCurrency(summary.unpaidTotal)}</Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const BillPaymentChecklist = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Bill Payment Checklist</Typography>
      <Typography variant="body1">
        Add each bill with its name, amount, and due date, then toggle &quot;Paid&quot; once it&apos;s settled.
        The panel on the right automatically sorts every bill by due date — soonest first — so you always see
        what needs attention next, along with a running count of paid versus unpaid bills and the total amount
        still owed.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Electricity&quot; ($85, due Sep 15, unpaid) and &quot;Internet&quot; ($60, due Sep 5,
        paid) produces a sorted list showing Internet first (earlier due date, marked Paid), then Electricity
        (marked Unpaid), with a summary of 1 paid, 1 unpaid, and $85 still owed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping track of monthly household bills and which ones still need to be paid.</li>
          <li>Prioritizing which bill to pay next when due dates are close together.</li>
          <li>Reviewing total outstanding balances across all bills before payday.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does the list re-sort automatically as I add or edit bills?</strong> Yes — the sorted list on the right updates instantly by due date, soonest first, whenever you add, edit, or remove a bill.</li>
          <li><strong>What happens to bills without a due date?</strong> Bills with no due date are sorted to the end of the list, after every bill that has a due date.</li>
          <li><strong>Is my bill list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/bill-payment-checklist" content={content}>
      <BillPaymentChecklistContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BillPaymentChecklist;
