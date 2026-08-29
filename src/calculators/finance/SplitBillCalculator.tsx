'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, IconButton, Button, ToggleButtonGroup, ToggleButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface ItemRow {
  id: number;
  item: string;
  price: string;
  person: string;
}

const DEFAULT_ITEMS: ItemRow[] = [
  { id: 1, item: 'Pizza', price: '24', person: 'Alex' },
  { id: 2, item: 'Salad', price: '12', person: 'Sam' },
  { id: 3, item: 'Drinks', price: '18', person: 'Alex' },
];

const SplitBillCalculatorContent = () => {
  const [mode, setMode] = useState<'even' | 'itemized'>('even');

  const [totalBill, setTotalBill] = useState('120');
  const [people, setPeople] = useState('4');
  const [tip, setTip] = useState('15');

  const [items, setItems] = useState<ItemRow[]>(DEFAULT_ITEMS);
  const [nextId, setNextId] = useState(DEFAULT_ITEMS.length + 1);
  const [itemizedTip, setItemizedTip] = useState('15');

  const addItem = () => {
    setItems([...items, { id: nextId, item: 'Item', price: '0', person: 'Person' }]);
    setNextId(nextId + 1);
  };
  const removeItem = (id: number) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: number, field: 'item' | 'price' | 'person', v: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: v } : i)));

  const evenResult = useMemo(() => {
    const total = parseFloat(totalBill) || 0;
    const n = parseFloat(people) || 0;
    const tipPct = parseFloat(tip) || 0;
    const withTip = total * (1 + tipPct / 100);
    const perPerson = n > 0 ? withTip / n : 0;
    return { withTip, perPerson, tipAmount: withTip - total };
  }, [totalBill, people, tip]);

  const itemizedResult = useMemo(() => {
    const tipPct = parseFloat(itemizedTip) || 0;
    const subtotal = items.reduce((sum, i) => sum + (parseFloat(i.price) || 0), 0);
    const tipAmount = subtotal * (tipPct / 100);

    const byPerson = new Map<string, number>();
    for (const i of items) {
      const price = parseFloat(i.price) || 0;
      byPerson.set(i.person, (byPerson.get(i.person) || 0) + price);
    }

    const perPerson = Array.from(byPerson.entries()).map(([person, personSubtotal]) => {
      const share = subtotal > 0 ? (personSubtotal / subtotal) * tipAmount : 0;
      return { person, subtotal: personSubtotal, tipShare: share, total: personSubtotal + share };
    });

    return { subtotal, tipAmount, grandTotal: subtotal + tipAmount, perPerson };
  }, [items, itemizedTip]);

  return (
    <Box>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => v && setMode(v)}
        size="small"
        sx={{ mb: 3 }}
      >
        <ToggleButton value="even">Even Split</ToggleButton>
        <ToggleButton value="itemized">Itemized</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'even' ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Total Bill"
              type="number"
              value={totalBill}
              onChange={(e) => setTotalBill(e.target.value)}
              fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="Number of People"
              type="number"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              fullWidth
            />
            <TextField
              label="Tip"
              type="number"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
            <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Each Person Pays</Typography>
              <Typography variant="h3" fontWeight="bold">{money(evenResult.perPerson)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Tip Amount</Typography>
              <Typography fontWeight={600}>{money(evenResult.tipAmount)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Total With Tip</Typography>
              <Typography fontWeight={600}>{money(evenResult.withTip)}</Typography>
            </Paper>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            {items.map((i) => (
              <Box key={i.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField label="Item" value={i.item} onChange={(e) => updateItem(i.id, 'item', e.target.value)} size="small" sx={{ flex: 2 }} />
                <TextField
                  label="Price"
                  type="number"
                  value={i.price}
                  onChange={(e) => updateItem(i.id, 'price', e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                  slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                />
                <TextField label="Person" value={i.person} onChange={(e) => updateItem(i.id, 'person', e.target.value)} size="small" sx={{ flex: 1 }} />
                <IconButton onClick={() => removeItem(i.id)} size="small" aria-label="Remove item">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button startIcon={<AddIcon />} onClick={addItem} variant="outlined" size="small">
                Add Item
              </Button>
              <TextField
                label="Tip"
                type="number"
                value={itemizedTip}
                onChange={(e) => setItemizedTip(e.target.value)}
                size="small"
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
              />
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Person</TableCell>
                  <TableCell align="right">Items Subtotal</TableCell>
                  <TableCell align="right">Tip Share</TableCell>
                  <TableCell align="right">Owes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemizedResult.perPerson.map((p) => (
                  <TableRow key={p.person}>
                    <TableCell>{p.person}</TableCell>
                    <TableCell align="right">{money(p.subtotal)}</TableCell>
                    <TableCell align="right">{money(p.tipShare)}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>{money(p.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Total</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{money(itemizedResult.subtotal)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{money(itemizedResult.tipAmount)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{money(itemizedResult.grandTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

const SplitBillCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Split Bill Calculator Work?</Typography>
      <Typography variant="body1">
        This calculator supports two ways to split a bill. In Even Split mode, enter the total bill,
        the number of people, and a tip percentage — the calculator adds the tip to the bill and divides
        it equally among everyone. In Itemized mode, list each item, its price, and who ordered it. The
        calculator totals each person&apos;s own items, then splits the tip proportionally — someone who
        ordered more expensive items pays a proportionally larger share of the tip too, rather than an
        equal flat amount.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Even split: a $120 bill for 4 people with a 15% tip comes to $138 total, or $34.50 each. Itemized:
        Alex orders a $24 pizza and $18 in drinks ($42 total) while Sam orders a $12 salad, out of a $54
        subtotal. At a 15% tip ($8.10), Alex&apos;s proportional tip share is about $6.30 (42/54 of the
        tip) for a total of $48.30, while Sam owes about $13.80.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Splitting a restaurant bill evenly among a group of friends.</li>
          <li>Fairly dividing a bill when people ordered very different amounts.</li>
          <li>Settling shared grocery or takeout orders among roommates.</li>
          <li>Splitting a group tab where one person pays a shared appetizer and everyone owes their fair share.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does the itemized mode split the tip proportionally instead of evenly?</Typography>
      <Typography variant="body1">
        Splitting the tip proportionally to what each person ordered is generally considered fairer than
        an equal split — someone who ordered a $40 steak benefits more from the service than someone who
        ordered a $8 side salad, so their tip contribution scales accordingly.
      </Typography>
      <Typography variant="h3">Can multiple items be assigned to the same person?</Typography>
      <Typography variant="body1">
        Yes — add as many item rows as needed and assign the same person&apos;s name to each item they
        ordered. The calculator sums every item assigned to that name into their subtotal automatically.
      </Typography>
      <Typography variant="h3">How do I split a shared item, like an appetizer everyone eats?</Typography>
      <Typography variant="body1">
        Add it as its own row and assign it to one placeholder name (like &quot;Shared&quot;), or divide
        its price evenly and add a fractional line item for each person who shared it, so it&apos;s
        reflected in each person&apos;s subtotal.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/split-bill-calculator" content={content}>
      <SplitBillCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SplitBillCalculator;
