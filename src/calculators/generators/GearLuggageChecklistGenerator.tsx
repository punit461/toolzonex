'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES = ['Luggage Inventory', 'Hiking Gear', 'Photography Gear'] as const;
type Category = (typeof CATEGORIES)[number];

const CHECKBOX_ITEMS: Record<'Hiking Gear' | 'Photography Gear', string[]> = {
  'Hiking Gear': ['Boots', 'Trekking poles', 'Layered clothing', 'Navigation / map', 'Water bottles / hydration', 'First aid', 'Headlamp'],
  'Photography Gear': ['Camera body', 'Lenses', 'Extra batteries', 'Memory cards', 'Tripod', 'Lens cleaning kit', 'Camera bag'],
};

interface LuggageItem {
  id: number;
  bagName: string;
  item: string;
  quantity: string;
}

let nextId = 1;

const DEFAULT_LUGGAGE: LuggageItem[] = [
  { id: nextId++, bagName: 'Carry-on', item: 'Passport', quantity: '1' },
  { id: nextId++, bagName: 'Checked bag', item: 'T-shirts', quantity: '5' },
];

const GearLuggageChecklistGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('Luggage Inventory');
  const [luggageItems, setLuggageItems] = useState<LuggageItem[]>(DEFAULT_LUGGAGE);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleCategoryChange = (e: SelectChangeEvent) => setCategory(e.target.value as Category);

  const addLuggageItem = () => setLuggageItems((prev) => [...prev, { id: nextId++, bagName: '', item: '', quantity: '1' }]);
  const removeLuggageItem = (id: number) => setLuggageItems((prev) => prev.filter((i) => i.id !== id));
  const updateLuggageItem = (id: number, patch: Partial<LuggageItem>) =>
    setLuggageItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const key = (cat: string, item: string) => `${cat}::${item}`;
  const toggleCheckbox = (cat: string, item: string) => {
    const k = key(cat, item);
    setChecked((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const groupedLuggage = useMemo(() => {
    const groups: Record<string, LuggageItem[]> = {};
    luggageItems.forEach((i) => {
      if (!i.item.trim()) return;
      const bag = i.bagName.trim() || 'Unassigned';
      if (!groups[bag]) groups[bag] = [];
      groups[bag].push(i);
    });
    return groups;
  }, [luggageItems]);

  const checkedItems = useMemo(() => {
    if (category === 'Luggage Inventory') return [];
    return CHECKBOX_ITEMS[category].filter((item) => checked[key(category, item)]);
  }, [category, checked]);

  const copyList = async () => {
    let lines: string[] = [];
    if (category === 'Luggage Inventory') {
      Object.entries(groupedLuggage).forEach(([bag, items]) => {
        lines.push(`${bag}:`);
        items.forEach((i) => lines.push(`  - ${i.item.trim()} (qty: ${i.quantity || '1'})`));
      });
    } else {
      lines = [`${category} Checklist:`, ...checkedItems.map((item) => `  - ${item}`)];
    }
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  const hasOutput = category === 'Luggage Inventory' ? Object.keys(groupedLuggage).length > 0 : checkedItems.length > 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <FormControl size="small" sx={{ minWidth: 220, mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select label="Category" value={category} onChange={handleCategoryChange}>
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {category === 'Luggage Inventory' ? (
          <>
            <Stack spacing={2}>
              {luggageItems.map((i) => (
                <Paper key={i.id} variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <TextField size="small" fullWidth label="Bag name" value={i.bagName} onChange={(e) => updateLuggageItem(i.id, { bagName: e.target.value })} />
                    <IconButton onClick={() => removeLuggageItem(i.id)} size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <TextField size="small" fullWidth label="Item" value={i.item} onChange={(e) => updateLuggageItem(i.id, { item: e.target.value })} />
                    <TextField size="small" fullWidth label="Quantity" value={i.quantity} onChange={(e) => updateLuggageItem(i.id, { quantity: e.target.value })} />
                  </Stack>
                </Paper>
              ))}
              {luggageItems.length === 0 && (
                <Typography variant="body2" color="text.secondary">No items yet. Add one below.</Typography>
              )}
            </Stack>
            <Button startIcon={<AddIcon />} onClick={addLuggageItem} sx={{ mt: 2 }}>
              Add Item
            </Button>
          </>
        ) : (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>{category}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {CHECKBOX_ITEMS[category].map((item) => (
                <FormControlLabel
                  key={item}
                  control={<Checkbox size="small" checked={!!checked[key(category, item)]} onChange={() => toggleCheckbox(category, item)} />}
                  label={<Typography variant="body2">{item}</Typography>}
                />
              ))}
            </Box>
          </Paper>
        )}
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>{category} List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={!hasOutput}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {!hasOutput && (
            <Typography variant="body2" color="text.secondary">
              {category === 'Luggage Inventory' ? 'Add items to see them grouped by bag.' : `Check items on the left to build your ${category.toLowerCase()} checklist.`}
            </Typography>
          )}
          {category === 'Luggage Inventory'
            ? Object.entries(groupedLuggage).map(([bag, items]) => (
                <Box key={bag} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={700}>{bag}</Typography>
                  <ul style={{ marginTop: 4 }}>
                    {items.map((i) => <li key={i.id}>{i.item} (qty: {i.quantity || '1'})</li>)}
                  </ul>
                </Box>
              ))
            : checkedItems.length > 0 && (
                <ul style={{ marginTop: 0 }}>
                  {checkedItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
        </Paper>
      </Box>
    </Box>
  );
};

const GearLuggageChecklistGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Gear & Luggage Checklist Generator</Typography>
      <Typography variant="body1">
        Pick a category — Luggage Inventory, Hiking Gear, or Photography Gear. Luggage Inventory lets you add
        items with a bag name and quantity, grouped by bag so you know what&apos;s packed where. Hiking Gear
        and Photography Gear show a ready-made checklist of essentials to check off. The panel on the right
        shows your finished list, ready to copy.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Under Luggage Inventory, adding &quot;Passport&quot; (qty 1) to a &quot;Carry-on&quot; bag and
        &quot;T-shirts&quot; (qty 5) to a &quot;Checked bag&quot; produces two grouped sections, one per bag.
        Switching to Hiking Gear and checking &quot;Boots&quot; and &quot;Headlamp&quot; instead produces a
        two-item hiking checklist.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking exactly what&apos;s packed in each suitcase or bag before a trip.</li>
          <li>Making sure essential hiking gear like navigation, water, and first aid isn&apos;t forgotten.</li>
          <li>Checking off photography equipment — camera, lenses, batteries, cards — before a shoot.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do the three categories share the same list?</strong> No — Luggage Inventory, Hiking Gear, and Photography Gear each keep their own separate items and checked state, so switching categories doesn&apos;t affect the others.</li>
          <li><strong>Can I have multiple bags in the Luggage Inventory?</strong> Yes — just type a different bag name on each item, and the list on the right automatically groups items under their bag name.</li>
          <li><strong>Is my list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/gear-luggage-checklist-generator" content={content}>
      <GearLuggageChecklistGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GearLuggageChecklistGenerator;
