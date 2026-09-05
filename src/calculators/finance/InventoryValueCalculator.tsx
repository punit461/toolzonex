'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface InventoryItem {
  id: number;
  name: string;
  quantity: string;
  unitCost: string;
}

const DEFAULT_ITEMS: InventoryItem[] = [
  { id: 1, name: 'Widget A', quantity: '120', unitCost: '4.50' },
  { id: 2, name: 'Widget B', quantity: '75', unitCost: '9.00' },
  { id: 3, name: 'Widget C', quantity: '300', unitCost: '1.25' },
];

const InventoryValueContent = () => {
  const [items, setItems] = useState<InventoryItem[]>(DEFAULT_ITEMS);
  const [nextId, setNextId] = useState(DEFAULT_ITEMS.length + 1);

  const addItem = () => {
    setItems([...items, { id: nextId, name: 'Item', quantity: '0', unitCost: '0' }]);
    setNextId(nextId + 1);
  };
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: number, field: 'name' | 'quantity' | 'unitCost', v: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: v } : i)));

  const rows = items.map((i) => ({
    ...i,
    value: (parseFloat(i.quantity) || 0) * (parseFloat(i.unitCost) || 0),
  }));
  const total = rows.reduce((sum, r) => sum + r.value, 0);

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {items.map((i) => (
          <Box key={i.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Item Name" value={i.name} onChange={(e) => updateItem(i.id, 'name', e.target.value)} size="small" sx={{ flex: 2, minWidth: 140 }} />
            <TextField label="Quantity" type="number" value={i.quantity} onChange={(e) => updateItem(i.id, 'quantity', e.target.value)} size="small" sx={{ flex: 1, minWidth: 100 }} />
            <TextField
              label="Unit Cost"
              type="number"
              value={i.unitCost}
              onChange={(e) => updateItem(i.id, 'unitCost', e.target.value)}
              size="small"
              sx={{ flex: 1, minWidth: 120 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <IconButton onClick={() => removeItem(i.id)} size="small" aria-label="Remove item" disabled={items.length <= 1}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addItem} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Item
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Cost</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell align="right">{r.quantity || 0}</TableCell>
                <TableCell align="right">{money(parseFloat(r.unitCost) || 0)}</TableCell>
                <TableCell align="right">{money(r.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="body2">Total Inventory Value</Typography>
        <Typography variant="h4" fontWeight="bold">{money(total)}</Typography>
      </Paper>
    </Box>
  );
};

const InventoryValueCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Inventory Value Calculator</Typography>
      <Typography variant="body1">
        List each inventory item with its current quantity on hand and its unit cost. The calculator multiplies
        quantity by unit cost for every item to get that item&apos;s value, then sums every item&apos;s value into a
        total inventory value. Add or remove rows as needed to match your actual stock list.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Item Value = Quantity × Unit Cost<br />
        Total Inventory Value = Sum of All Item Values
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        120 units of Widget A at $4.50 each ($540), 75 units of Widget B at $9.00 each ($675), and 300 units of
        Widget C at $1.25 each ($375) add up to a total inventory value of $1,590.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a quick snapshot of total inventory value for a small business or warehouse.</li>
          <li>Checking the value of stock on hand before a physical count or insurance review.</li>
          <li>Estimating tied-up capital across a product line before reordering.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this FIFO, LIFO, or another costing method?</strong> No — this is a simple total-value calculation (current quantity × current unit cost, summed across items). FIFO and LIFO are costing-layer methods that require the full history of purchase transactions at different cost points over time, not just a current quantity and cost snapshot, so they aren&apos;t something this simple tool can replicate.</li>
          <li><strong>What unit cost should I use?</strong> Use whatever cost basis matches your purpose — the most recent purchase price for a rough current-value estimate, or your average cost per unit if you track that. For formal accounting purposes, follow your business&apos;s chosen inventory costing method.</li>
          <li><strong>Can I use this for a large number of items?</strong> Yes — add as many rows as you need. For very large inventories, a spreadsheet or inventory management system may be more practical, but this works well for a quick check on a smaller list.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/inventory-value-calculator" content={content}>
      <InventoryValueContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InventoryValueCalculator;
