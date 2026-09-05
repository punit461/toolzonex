'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, MenuItem, Select, Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Priority = 'High' | 'Medium' | 'Low';

interface WishItem {
  id: number;
  name: string;
  price: string;
  priority: Priority;
  notes: string;
}

let nextId = 200;

const PRIORITY_ORDER: Priority[] = ['High', 'Medium', 'Low'];
const PRIORITY_COLOR: Record<Priority, 'error' | 'warning' | 'success'> = {
  High: 'error',
  Medium: 'warning',
  Low: 'success',
};

const DEFAULT_ITEMS: WishItem[] = [
  { id: 1, name: 'Noise-cancelling headphones', price: '250', priority: 'High', notes: '' },
  { id: 2, name: 'Coffee maker', price: '80', priority: 'Medium', notes: 'Drip style' },
];

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const WishListGeneratorContent = () => {
  const [items, setItems] = useState<WishItem[]>(DEFAULT_ITEMS);

  const addItem = () => setItems((prev) => [...prev, { id: nextId++, name: '', price: '', priority: 'Medium', notes: '' }]);
  const removeItem = (id: number) => setItems((prev) => prev.filter((r) => r.id !== id));
  const updateItem = (id: number, patch: Partial<WishItem>) =>
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const { sorted, total } = useMemo(() => {
    const valid = items.filter((i) => i.name.trim());
    const priorityRank: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };
    const sorted = [...valid].sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
    const total = valid.reduce((sum, i) => sum + (parseFloat(i.price) || 0), 0);
    return { sorted, total };
  }, [items]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Wanted Items</Typography>
        <Stack spacing={2}>
          {items.map((item) => (
            <Paper key={item.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <TextField
                  size="small"
                  label="Item name"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  sx={{ flex: 2, minWidth: 160 }}
                />
                <TextField
                  size="small"
                  label="Est. price"
                  type="number"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, { price: e.target.value })}
                  sx={{ flex: 1, minWidth: 100 }}
                />
                <Select
                  size="small"
                  value={item.priority}
                  onChange={(e) => updateItem(item.id, { priority: e.target.value as Priority })}
                  sx={{ minWidth: 110 }}
                >
                  {PRIORITY_ORDER.map((p) => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </Select>
                <IconButton onClick={() => removeItem(item.id)} disabled={items.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                size="small"
                fullWidth
                placeholder="Notes or link (optional)"
                value={item.notes}
                onChange={(e) => updateItem(item.id, { notes: e.target.value })}
              />
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 2 }}>
          Add Item
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Your Wish List</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Estimated Total</Typography>
          <Typography variant="h4" fontWeight="bold">{money(total)}</Typography>
        </Paper>
        <Stack spacing={1.5}>
          {sorted.length === 0 && <Typography variant="body2" color="text.secondary">Add an item to build your list.</Typography>}
          {sorted.map((item) => (
            <Paper key={item.id} variant="outlined" sx={{ p: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography fontWeight={600}>{item.name}</Typography>
                <Chip label={item.priority} color={PRIORITY_COLOR[item.priority]} size="small" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="body2" color="text.secondary">{item.notes}</Typography>
                <Typography variant="body2" fontWeight={600}>{money(parseFloat(item.price) || 0)}</Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

const WishListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Wish List Generator</Typography>
      <Typography variant="body1">
        Add each item you want, along with its estimated price, a priority level (High, Medium, or Low), and
        optional notes or a link. The tool automatically sorts your full list by priority — highest first — and
        keeps a running total of the estimated cost of everything on it, so you always know both what matters
        most and what it would cost to get it all.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Noise-cancelling headphones&quot; at $250 (High priority) and &quot;Coffee maker&quot; at
        $80 (Medium priority) produces a sorted list with the headphones listed first and an estimated total of
        $330.00 across both items.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping a running holiday or birthday wish list to share with family and friends.</li>
          <li>Prioritizing purchases when saving up for several things at once on a limited budget.</li>
          <li>Tracking products you&apos;re considering buying, along with links, before committing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Bucket List Generator?</strong> The Bucket List Generator randomly generates bucket-list experience ideas for inspiration (like &quot;go skydiving&quot;). This Wish List Generator instead organizes a personal list of specific items you already want to buy, complete with price and priority tracking — it doesn&apos;t generate any ideas for you.</li>
          <li><strong>Does the estimated total include items I haven&apos;t priced yet?</strong> No — any item left with a blank price field is treated as $0 in the total, so fill in an estimate for every item you want reflected in the running total.</li>
          <li><strong>Can I save my wish list for later?</strong> Not automatically — the list resets on reload since nothing is stored on a server, so copy down your list or take a screenshot if you want to keep a lasting record.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/wish-list-generator" content={content}>
      <WishListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WishListGenerator;
