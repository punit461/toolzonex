'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface LineItem {
  id: string;
  label: string;
  quantity: string;
  unitCost: string;
}

let nextId = 6;

const DEFAULT_ITEMS: LineItem[] = [
  { id: '1', label: 'Venue Rental', quantity: '1', unitCost: '2000' },
  { id: '2', label: 'Catering (per head)', quantity: '100', unitCost: '45' },
  { id: '3', label: 'AV / Equipment', quantity: '1', unitCost: '800' },
  { id: '4', label: 'Staffing', quantity: '6', unitCost: '150' },
  { id: '5', label: 'Miscellaneous / Contingency', quantity: '1', unitCost: '500' },
];

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const EventCostCalculator = () => {
  const [items, setItems] = useState<LineItem[]>(DEFAULT_ITEMS);

  const addItem = () => setItems([...items, { id: String(nextId++), label: '', quantity: '1', unitCost: '' }]);
  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: string, field: keyof Omit<LineItem, 'id'>, val: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const { rows, total } = useMemo(() => {
    const rows = items.map((i) => {
      const qty = parseFloat(i.quantity) || 0;
      const cost = parseFloat(i.unitCost) || 0;
      return { ...i, lineTotal: qty * cost };
    });
    const total = rows.reduce((sum, r) => sum + r.lineTotal, 0);
    return { rows, total };
  }, [items]);

  const content = (
    <>
      <Typography variant="h2">How to Build an Itemized Event Budget</Typography>
      <Typography variant="body1">
        Add a line item for every cost your event involves — venue rental, catering priced per head, AV or
        equipment rental, staffing, and anything else — with a quantity and a unit cost for each. This
        calculator multiplies quantity by unit cost for every line and adds them all together for a total
        event cost, which is the standard way larger or more formal events are budgeted.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Line Total = Quantity × Unit Cost &nbsp;|&nbsp; Total Event Cost = Σ(Line Totals)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A venue rental at a flat $2,000, catering for 100 heads at $45 each ($4,500), AV equipment at a flat
        $800, staffing for 6 workers at $150 each ($900), and a $500 contingency line come to a total event
        cost of $8,700.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a detailed budget for a corporate event, conference, or large formal gathering.</li>
          <li>Getting an itemized cost breakdown to compare against vendor quotes.</li>
          <li>Tracking exactly where event spending is going, line by line.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Party Budget Calculator?</Typography>
      <Typography variant="body1">
        The Party Budget Calculator splits one overall budget into rough percentages across a handful of broad
        categories — a quick, casual approach for birthdays or family celebrations. This calculator instead
        builds a total from the ground up, adding specific, itemized line items with real quantities and unit
        costs, which suits larger or more formal events where you already have (or need) detailed vendor-level
        numbers.
      </Typography>
      <Typography variant="h3">How should I handle a per-head cost like catering?</Typography>
      <Typography variant="body1">
        Set the quantity to your expected headcount and the unit cost to the per-person price, so the line
        total automatically scales if your headcount changes — no need to recalculate the catering total by
        hand.
      </Typography>
      <Typography variant="h3">Should I include a contingency line?</Typography>
      <Typography variant="body1">
        Yes — it&apos;s common practice to add a contingency or miscellaneous line worth around 5-10% of the
        expected total to absorb last-minute additions, price changes, or unexpected vendor fees.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/event-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Line Items</Typography>
          <Stack spacing={2}>
            {rows.map((item, index) => (
              <Stack key={item.id} direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Item" size="small" sx={{ flex: 2, minWidth: 160 }}
                  value={item.label}
                  onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                />
                <TextField
                  label="Qty" type="number" size="small" sx={{ width: 90 }}
                  onFocus={(e) => e.target.select()}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                />
                <TextField
                  label="Unit Cost" type="number" size="small" sx={{ width: 110 }}
                  onFocus={(e) => e.target.select()}
                  value={item.unitCost}
                  onChange={(e) => updateItem(item.id, 'unitCost', e.target.value)}
                />
                <Typography variant="body2" fontWeight={600} sx={{ minWidth: 90 }}>{money(item.lineTotal)}</Typography>
                <IconButton color="error" size="small" onClick={() => removeItem(item.id)} disabled={items.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 2 }}>Add Line Item</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Total Event Cost</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{money(total)}</Typography>
          <Typography variant="caption" color="text.secondary">across {items.length} line item{items.length !== 1 ? 's' : ''}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EventCostCalculator;
