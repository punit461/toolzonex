'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface SoldItem {
  id: number;
  name: string;
  cost: string;
  price: string;
  quantitySold: string;
}

const DEFAULT_ITEMS: SoldItem[] = [
  { id: 1, name: 'Widget A', cost: '4.50', price: '9.99', quantitySold: '80' },
  { id: 2, name: 'Widget B', cost: '9.00', price: '15.00', quantitySold: '40' },
  { id: 3, name: 'Widget C', cost: '1.25', price: '3.50', quantitySold: '250' },
];

const InventoryProfitContent = () => {
  const [items, setItems] = useState<SoldItem[]>(DEFAULT_ITEMS);
  const [nextId, setNextId] = useState(DEFAULT_ITEMS.length + 1);

  const addItem = () => {
    setItems([...items, { id: nextId, name: 'Item', cost: '0', price: '0', quantitySold: '0' }]);
    setNextId(nextId + 1);
  };
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: number, field: 'name' | 'cost' | 'price' | 'quantitySold', v: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: v } : i)));

  const rows = items.map((i) => {
    const cost = parseFloat(i.cost) || 0;
    const price = parseFloat(i.price) || 0;
    const qty = parseFloat(i.quantitySold) || 0;
    const profit = (price - cost) * qty;
    const marginPct = price > 0 ? ((price - cost) / price) * 100 : 0;
    return { ...i, cost, price, qty, profit, marginPct };
  });
  const totalProfit = rows.reduce((sum, r) => sum + r.profit, 0);

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {items.map((i) => (
          <Box key={i.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField label="Item Name" value={i.name} onChange={(e) => updateItem(i.id, 'name', e.target.value)} size="small" sx={{ flex: 2, minWidth: 140 }} />
            <TextField
              label="Cost per Unit"
              type="number"
              value={i.cost}
              onChange={(e) => updateItem(i.id, 'cost', e.target.value)}
              size="small"
              sx={{ flex: 1, minWidth: 120 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="Selling Price per Unit"
              type="number"
              value={i.price}
              onChange={(e) => updateItem(i.id, 'price', e.target.value)}
              size="small"
              sx={{ flex: 1, minWidth: 140 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField label="Quantity Sold" type="number" value={i.quantitySold} onChange={(e) => updateItem(i.id, 'quantitySold', e.target.value)} size="small" sx={{ flex: 1, minWidth: 120 }} />
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
              <TableCell align="right">Qty Sold</TableCell>
              <TableCell align="right">Margin %</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell align="right">{r.qty}</TableCell>
                <TableCell align="right">{r.marginPct.toFixed(1)}%</TableCell>
                <TableCell align="right">{money(r.profit)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="body2">Total Profit</Typography>
        <Typography variant="h4" fontWeight="bold">{money(totalProfit)}</Typography>
      </Paper>
    </Box>
  );
};

const InventoryProfitCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Inventory Profit Calculator</Typography>
      <Typography variant="body1">
        List each item that has been sold, with its cost per unit, its selling price per unit, and the
        quantity sold. The calculator computes each item&apos;s profit and profit margin percentage, then sums
        every item into a total profit figure. Add or remove rows to match your actual sales.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Profit = (Selling Price − Cost) × Quantity Sold<br />
        Margin % = (Selling Price − Cost) ÷ Selling Price × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selling 80 units of Widget A at $9.99 with a $4.50 cost produces a profit of $439.20 and a margin of
        about 45.0%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking actual profit earned from a batch of sold products.</li>
          <li>Comparing profit margins across different products in a product line.</li>
          <li>Deciding which items are worth restocking based on their real profitability.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Inventory Value Calculator?</strong> The Inventory Value Calculator computes the total VALUE of inventory currently sitting on hand (quantity on hand × unit cost) — it doesn&apos;t involve any sales at all. This Inventory Profit Calculator instead computes actual PROFIT from items that have already been SOLD, using selling price minus cost, multiplied by quantity sold — a completely different calculation about revenue and margin rather than stock value.</li>
          <li><strong>Does this account for other business expenses?</strong> No — this calculates gross profit from the difference between selling price and unit cost only. It doesn&apos;t subtract overhead, shipping, marketing, or other operating expenses, which would need to be factored in separately for net profit.</li>
          <li><strong>Can margin percentage be negative?</strong> Yes — if an item&apos;s cost is higher than its selling price, both the profit and margin percentage will show as negative, indicating that item is being sold at a loss.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/inventory-profit-calculator" content={content}>
      <InventoryProfitContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InventoryProfitCalculator;
