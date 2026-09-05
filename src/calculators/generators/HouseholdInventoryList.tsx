'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LOCATIONS = ['Pantry', 'Refrigerator', 'Freezer', 'Medicine Cabinet', 'General Household'] as const;
type Location = (typeof LOCATIONS)[number];

interface InventoryItem {
  id: number;
  location: Location;
  name: string;
  quantity: string;
  expiry: string;
}

let nextId = 1;

const DEFAULT_ITEMS: InventoryItem[] = [
  { id: nextId++, location: 'Pantry', name: 'Canned beans', quantity: '4', expiry: '' },
  { id: nextId++, location: 'Refrigerator', name: 'Milk', quantity: '1', expiry: '' },
];

const HouseholdInventoryListContent = () => {
  const [items, setItems] = useState<InventoryItem[]>(DEFAULT_ITEMS);
  const [currentLocation, setCurrentLocation] = useState<Location>('Pantry');

  const addItem = () => setItems((prev) => [...prev, { id: nextId++, location: currentLocation, name: '', quantity: '1', expiry: '' }]);
  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id: number, patch: Partial<InventoryItem>) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const handleLocationChange = (e: SelectChangeEvent) => setCurrentLocation(e.target.value as Location);

  const showsExpiry = (loc: Location) => loc !== 'General Household';

  const currentItems = useMemo(() => items.filter((i) => i.location === currentLocation), [items, currentLocation]);

  const grouped = useMemo(() => {
    const groups: Record<string, InventoryItem[]> = {};
    LOCATIONS.forEach((loc) => {
      const picked = items.filter((i) => i.location === loc && i.name.trim());
      if (picked.length > 0) groups[loc] = picked;
    });
    return groups;
  }, [items]);

  const copyList = async () => {
    const lines: string[] = [];
    Object.entries(grouped).forEach(([loc, its]) => {
      lines.push(`${loc}:`);
      its.forEach((i) => {
        let line = `  - ${i.name.trim()} (qty: ${i.quantity || '1'})`;
        if (showsExpiry(loc as Location) && i.expiry.trim()) line += ` — expires ${i.expiry.trim()}`;
        lines.push(line);
      });
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <FormControl size="small" sx={{ minWidth: 220, mb: 2 }}>
          <InputLabel>Location</InputLabel>
          <Select label="Location" value={currentLocation} onChange={handleLocationChange}>
            {LOCATIONS.map((loc) => (
              <MenuItem key={loc} value={loc}>{loc}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="subtitle1" fontWeight={600} mb={1}>Items in {currentLocation}</Typography>
        <Stack spacing={2}>
          {currentItems.map((i) => (
            <Paper key={i.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Item name" value={i.name} onChange={(e) => updateItem(i.id, { name: e.target.value })} />
                <IconButton onClick={() => removeItem(i.id)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1}>
                <TextField size="small" fullWidth label="Quantity" value={i.quantity} onChange={(e) => updateItem(i.id, { quantity: e.target.value })} />
                {showsExpiry(currentLocation) && (
                  <TextField size="small" fullWidth type="date" label="Expiry date" InputLabelProps={{ shrink: true }} value={i.expiry} onChange={(e) => updateItem(i.id, { expiry: e.target.value })} />
                )}
              </Stack>
            </Paper>
          ))}
          {currentItems.length === 0 && (
            <Typography variant="body2" color="text.secondary">No items yet in {currentLocation}. Add one below.</Typography>
          )}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 2 }}>
          Add Item to {currentLocation}
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Full Inventory</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={Object.keys(grouped).length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {Object.keys(grouped).length === 0 && (
            <Typography variant="body2" color="text.secondary">Add items to see your inventory grouped by location.</Typography>
          )}
          {Object.entries(grouped).map(([loc, its]) => (
            <Box key={loc} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>{loc}</Typography>
              <ul style={{ marginTop: 4 }}>
                {its.map((i) => (
                  <li key={i.id}>
                    {i.name} (qty: {i.quantity || '1'})
                    {showsExpiry(loc as Location) && i.expiry.trim() ? ` — expires ${i.expiry.trim()}` : ''}
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

const HouseholdInventoryList = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Household Inventory List</Typography>
      <Typography variant="body1">
        Pick a location — Pantry, Refrigerator, Freezer, Medicine Cabinet, or General Household — then add
        items with their quantity and, where relevant, an expiry date. Switch the location dropdown to add
        items to a different area; the panel on the right shows your full inventory grouped by location, so
        you always have one organized view across your whole home.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Canned beans&quot; (qty 4) to the Pantry, then switching to Refrigerator and adding
        &quot;Milk&quot; (qty 1) with an expiry date, produces a grouped inventory showing a Pantry section
        and a separate Refrigerator section, each listing only its own items.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking pantry, fridge, and freezer stock to avoid over-buying or letting food expire.</li>
          <li>Keeping a medicine cabinet inventory with expiry dates for safety checks.</li>
          <li>Building a general household inventory for insurance or moving purposes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I track multiple locations at once?</strong> Yes — items you add stay assigned to whichever location was selected when you added them, and the full inventory panel groups everything by location automatically.</li>
          <li><strong>Does every location show an expiry date field?</strong> No — Pantry, Refrigerator, Freezer, and Medicine Cabinet show an expiry date field since those items are most likely to expire; General Household does not.</li>
          <li><strong>Is my inventory saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/household-inventory-list" content={content}>
      <HouseholdInventoryListContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HouseholdInventoryList;
