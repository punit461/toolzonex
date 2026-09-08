'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES = ['Subscription', 'Warranty', 'Document', 'Password', 'License', 'Domain'] as const;
type Category = (typeof CATEGORIES)[number];

interface TrackedItem {
  id: number;
  category: Category;
  name: string;
  expiryDate: string;
  cost: string;
  notes: string;
}

let nextId = 1;

const DEFAULT_ITEMS: TrackedItem[] = [
  { id: nextId++, category: 'Subscription', name: 'Streaming service', expiryDate: '2026-09-20', cost: '15', notes: '' },
  { id: nextId++, category: 'Domain', name: 'example.com', expiryDate: '2027-01-10', cost: '12', notes: '' },
];

const msPerDay = 1000 * 60 * 60 * 24;

function daysRemaining(dateStr: string): number | null {
  if (!dateStr) return null;
  const target = new Date(dateStr + 'T00:00:00');
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((target.getTime() - todayMidnight.getTime()) / msPerDay);
}

const RenewalExpiryTrackerContent = () => {
  const [items, setItems] = useState<TrackedItem[]>(DEFAULT_ITEMS);
  const [currentCategory, setCurrentCategory] = useState<Category>('Subscription');

  const addItem = () =>
    setItems((prev) => [...prev, { id: nextId++, category: currentCategory, name: '', expiryDate: '', cost: '', notes: '' }]);
  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id: number, patch: Partial<TrackedItem>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const handleCategoryChange = (e: SelectChangeEvent) => setCurrentCategory(e.target.value as Category);

  const currentItems = useMemo(() => items.filter((i) => i.category === currentCategory), [items, currentCategory]);

  const sortedList = useMemo(() => {
    return items
      .filter((i) => i.name.trim())
      .map((i) => ({ ...i, days: daysRemaining(i.expiryDate) }))
      .sort((a, b) => {
        if (a.days === null && b.days === null) return 0;
        if (a.days === null) return 1;
        if (b.days === null) return -1;
        return a.days - b.days;
      });
  }, [items]);

  const copyList = async () => {
    const lines = sortedList.map((i) => {
      const daysLabel = i.days === null ? 'no date' : i.days < 0 ? `expired ${Math.abs(i.days)} days ago` : `${i.days} days left`;
      let line = `[${i.category}] ${i.name.trim()} — ${daysLabel}`;
      if (i.cost.trim()) line += ` — cost ${i.cost.trim()}`;
      if (i.notes.trim()) line += ` — ${i.notes.trim()}`;
      return line;
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <FormControl size="small" sx={{ minWidth: 220, mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select label="Category" value={currentCategory} onChange={handleCategoryChange}>
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" fontWeight={600} mb={1}>{currentCategory} Items</Typography>
        <Stack spacing={2}>
          {currentItems.map((i) => (
            <Paper key={i.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Name" value={i.name} onChange={(e) => updateItem(i.id, { name: e.target.value })} />
                <IconButton onClick={() => removeItem(i.id)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <TextField size="small" fullWidth type="date" label="Expiry / renewal date" InputLabelProps={{ shrink: true }} value={i.expiryDate} onChange={(e) => updateItem(i.id, { expiryDate: e.target.value })} />
                <TextField size="small" fullWidth label="Cost (optional)" value={i.cost} onChange={(e) => updateItem(i.id, { cost: e.target.value })} />
              </Stack>
              <TextField size="small" fullWidth label="Notes (optional)" value={i.notes} onChange={(e) => updateItem(i.id, { notes: e.target.value })} />
            </Paper>
          ))}
          {currentItems.length === 0 && (
            <Typography variant="body2" color="text.secondary">No {currentCategory.toLowerCase()} items yet. Add one below.</Typography>
          )}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 2 }}>
          Add {currentCategory} Item
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Sorted by Days Remaining</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={sortedList.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {sortedList.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add items to see them sorted by days remaining, soonest first.</Typography>
          )}
          <Stack spacing={1}>
            {sortedList.map((i) => {
              const soon = i.days !== null && i.days <= 30;
              const daysLabel = i.days === null ? 'no date set' : i.days < 0 ? `expired ${Math.abs(i.days)}d ago` : `${i.days}d left`;
              return (
                <Box key={i.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{i.name} <Typography component="span" variant="caption" color="text.secondary">({i.category})</Typography></Typography>
                    {i.notes.trim() && <Typography variant="caption" color="text.secondary">{i.notes}</Typography>}
                  </Box>
                  <Chip
                    label={daysLabel}
                    size="small"
                    color={soon ? 'warning' : 'default'}
                    variant={soon ? 'filled' : 'outlined'}
                  />
                </Box>
              );
            })}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

const RenewalExpiryTracker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Renewal & Expiry Tracker</Typography>
      <Typography variant="body1">
        Pick a category — Subscription, Warranty, Document, Password, License, or Domain — then add items with
        an expiry or renewal date and, optionally, a cost and notes. The panel on the right shows every item
        across all categories sorted by days remaining, soonest first, and flags anything expiring within 30
        days with an orange warning chip so it stands out.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding a &quot;Streaming service&quot; subscription expiring in under 30 days and an &quot;example.com&quot;
        domain renewal several months away produces a sorted list with the streaming service at the top, flagged
        with a warning chip, and the domain further down without a warning.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking subscription renewal dates across streaming, software, and membership services in one place.</li>
          <li>Keeping tabs on warranty expiry dates for appliances and electronics before coverage runs out.</li>
          <li>Monitoring domain, license, and password change dates so nothing lapses unexpectedly.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this send me an actual notification or alert when something expires?</strong> No — this is a reference and planning list only. As a static site with no backend, it can&apos;t send real notifications. Once you see an upcoming date here, set a reminder in your phone&apos;s calendar or reminders app for the actual alert.</li>
          <li><strong>What counts as "expiring soon"?</strong> Any item with 30 or fewer days remaining is shown with an orange warning chip so it&apos;s easy to spot at a glance in the sorted list.</li>
          <li><strong>Is my tracked list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/renewal-expiry-tracker" content={content}>
      <RenewalExpiryTrackerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RenewalExpiryTracker;
