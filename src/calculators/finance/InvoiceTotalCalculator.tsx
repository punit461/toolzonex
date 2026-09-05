'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, InputAdornment, ToggleButtonGroup, ToggleButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface LineItem {
  id: number;
  description: string;
  qty: string;
  price: string;
}

const DEFAULT_ITEMS: LineItem[] = [
  { id: 1, description: 'Consulting hours', qty: '10', price: '100' },
  { id: 2, description: 'Software license', qty: '1', price: '250' },
];

const InvoiceTotalContent = () => {
  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS);
  const [nextId, setNextId] = useState(DEFAULT_ITEMS.length + 1);
  const [taxRate, setTaxRate] = useState('8');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountValue, setDiscountValue] = useState('0');

  const addItem = () => {
    setItems([...items, { id: nextId, description: 'Item', qty: '1', price: '0' }]);
    setNextId(nextId + 1);
  };
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: number, field: 'description' | 'qty' | 'price', v: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: v } : i)));

  const subtotal = items.reduce((sum, i) => sum + (parseFloat(i.qty) || 0) * (parseFloat(i.price) || 0), 0);
  const discountAmount = discountType === 'percent'
    ? subtotal * ((parseFloat(discountValue) || 0) / 100)
    : Math.min(subtotal, parseFloat(discountValue) || 0);
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * ((parseFloat(taxRate) || 0) / 100);
  const total = afterDiscount + taxAmount;

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {items.map((i) => (
          <Box key={i.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField label="Description" value={i.description} onChange={(e) => updateItem(i.id, 'description', e.target.value)} size="small" sx={{ flex: 2 }} />
            <TextField label="Qty" type="number" value={i.qty} onChange={(e) => updateItem(i.id, 'qty', e.target.value)} size="small" sx={{ flex: 1 }} />
            <TextField
              label="Unit Price"
              type="number"
              value={i.price}
              onChange={(e) => updateItem(i.id, 'price', e.target.value)}
              size="small"
              sx={{ flex: 1 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <IconButton onClick={() => removeItem(i.id)} size="small" aria-label="Remove line item">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addItem} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Line Item
        </Button>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
        <ToggleButtonGroup value={discountType} exclusive onChange={(_, v) => v && setDiscountType(v)} size="small">
          <ToggleButton value="percent">% Discount</ToggleButton>
          <ToggleButton value="fixed">$ Discount</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label="Discount"
          type="number"
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          size="small"
          slotProps={{ input: discountType === 'percent' ? { endAdornment: <InputAdornment position="end">%</InputAdornment> } : { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Tax Rate"
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
          size="small"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Line Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.description}</TableCell>
                <TableCell align="right">{i.qty}</TableCell>
                <TableCell align="right">{money(parseFloat(i.price) || 0)}</TableCell>
                <TableCell align="right">{money((parseFloat(i.qty) || 0) * (parseFloat(i.price) || 0))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={1} sx={{ maxWidth: 400, ml: 'auto' }}>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Subtotal</Typography>
          <Typography fontWeight={600}>{money(subtotal)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Discount</Typography>
          <Typography fontWeight={600}>−{money(discountAmount)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Tax</Typography>
          <Typography fontWeight={600}>{money(taxAmount)}</Typography>
        </Paper>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Total</Typography>
          <Typography variant="h4" fontWeight="bold">{money(total)}</Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

const InvoiceTotalCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Invoice Total Calculator</Typography>
      <Typography variant="body1">
        An invoice total is built from line items, an optional discount, and tax applied on top. List each
        line item&apos;s description, quantity, and unit price, choose whether your discount is a percentage
        or a fixed dollar amount, and set your tax rate. The calculator totals every line, applies the
        discount to the subtotal, then applies tax to the discounted amount.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Line Total = Qty × Unit Price<br />
        Subtotal = Sum of Line Totals<br />
        Tax = (Subtotal − Discount) × Tax Rate<br />
        Total = Subtotal − Discount + Tax
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An invoice with 10 hours of consulting at $100/hour ($1,000) plus a $250 software license comes to
        a $1,250 subtotal. With no discount and an 8% tax rate, tax is $100, bringing the total to $1,350.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out an invoice&apos;s subtotal, discount, tax, and grand total before sending it to a client.</li>
          <li>Double-checking the math on an invoice you received to confirm the totals are correct.</li>
          <li>Comparing how a percentage discount versus a fixed dollar discount changes the final total.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the site&apos;s PDF invoice generator?</strong> The PDF invoice generator tool produces an actual downloadable, formatted PDF document you can send to a client. This calculator is just the underlying math — subtotal, discount, tax, and total — with no document or PDF output, useful for a quick check without generating a full invoice file.</li>
          <li><strong>Is the discount applied before or after tax?</strong> Before — this calculator applies the discount to the subtotal first, then calculates tax on the discounted amount, which matches how most invoices and point-of-sale systems apply discounts and tax.</li>
          <li><strong>Can I use a fixed dollar discount larger than the subtotal?</strong> The discount is capped at the subtotal amount, so the discounted total never goes below $0 before tax is applied.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/invoice-total-calculator" content={content}>
      <InvoiceTotalContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InvoiceTotalCalculator;
