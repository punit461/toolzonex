'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface LineItem {
  id: number;
  name: string;
  amount: string;
}

const DEFAULT_ITEMS: LineItem[] = [
  { id: 1, name: 'Labor', amount: '15000' },
  { id: 2, name: 'Materials', amount: '8000' },
  { id: 3, name: 'Equipment', amount: '3000' },
  { id: 4, name: 'Overhead', amount: '2000' },
];

const ProjectCostContent = () => {
  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS);
  const [nextId, setNextId] = useState(DEFAULT_ITEMS.length + 1);
  const [contingency, setContingency] = useState('10');

  const addItem = () => {
    setItems([...items, { id: nextId, name: 'Line Item', amount: '0' }]);
    setNextId(nextId + 1);
  };
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: number, field: 'name' | 'amount', v: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: v } : i)));

  const subtotal = items.reduce((sum, i) => sum + (parseFloat(i.amount) || 0), 0);
  const contingencyPct = parseFloat(contingency) || 0;
  const contingencyAmount = subtotal * (contingencyPct / 100);
  const total = subtotal + contingencyAmount;

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {items.map((i) => (
          <Box key={i.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField label="Cost Item" value={i.name} onChange={(e) => updateItem(i.id, 'name', e.target.value)} size="small" sx={{ flex: 2 }} />
            <TextField
              label="Amount"
              type="number"
              value={i.amount}
              onChange={(e) => updateItem(i.id, 'amount', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <IconButton onClick={() => removeItem(i.id)} size="small" aria-label="Remove line item">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button startIcon={<AddIcon />} onClick={addItem} variant="outlined" size="small">
            Add Line Item
          </Button>
          <TextField
            label="Contingency"
            type="number"
            value={contingency}
            onChange={(e) => setContingency(e.target.value)}
            size="small"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>
      </Stack>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.name}</TableCell>
                <TableCell align="right">{money(parseFloat(i.amount) || 0)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Subtotal</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>{money(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contingency ({contingencyPct}%)</TableCell>
              <TableCell align="right">{money(contingencyAmount)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="body2">Total Project Cost</Typography>
        <Typography variant="h4" fontWeight="bold">{money(total)}</Typography>
      </Paper>
    </Box>
  );
};

const ProjectCostCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Project Cost Calculator</Typography>
      <Typography variant="body1">
        Estimating a project&apos;s total budget means adding up every cost category — labor, materials,
        equipment, overhead, or anything else — and building in a contingency buffer for unexpected costs.
        List each cost line item with its amount, add or remove rows as needed, and set a contingency
        percentage to see your full project budget.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Subtotal = Sum of All Line Items<br />
        Contingency = Subtotal × Contingency %<br />
        Total = Subtotal + Contingency
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A project with $15,000 in labor, $8,000 in materials, $3,000 in equipment, and $2,000 in overhead
        has a $28,000 subtotal. Adding a 10% contingency ($2,800) for unexpected costs brings the total
        budget to $30,800.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a budget estimate for a construction, renovation, or event project before it starts.</li>
          <li>Presenting a client or stakeholder with a transparent, itemized cost breakdown.</li>
          <li>Adding a contingency buffer to a budget to account for scope changes or unexpected expenses.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What contingency percentage should I use?</strong> It varies by project type and risk level — well-defined projects with few unknowns often use 5–10%, while projects with significant uncertainty (new construction, unfamiliar scope) commonly use 15–25% or more. Check industry norms for your specific type of project.</li>
          <li><strong>Should contingency be spent unless something goes wrong?</strong> Generally no — contingency is meant as a reserve for unforeseen costs, not a budget to spend by default. Many project managers track contingency separately and only draw from it when an actual overrun or change occurs.</li>
          <li><strong>Can I use this for any type of project?</strong> Yes — the line items are fully editable, so you can label and total costs for construction, software, events, marketing campaigns, or any other project with a mix of cost categories.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/project-cost-calculator" content={content}>
      <ProjectCostContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ProjectCostCalculator;
