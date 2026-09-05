'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Grid, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: Record<string, string[]> = {
  Produce: ['Apples', 'Bananas', 'Lettuce', 'Tomatoes', 'Onions', 'Potatoes', 'Carrots', 'Spinach', 'Garlic', 'Bell Peppers'],
  'Dairy & Eggs': ['Milk', 'Eggs', 'Butter', 'Cheese', 'Yogurt', 'Cream Cheese', 'Sour Cream', 'Heavy Cream'],
  'Meat & Seafood': ['Chicken Breast', 'Ground Beef', 'Bacon', 'Salmon', 'Shrimp', 'Sausage', 'Pork Chops', 'Turkey'],
  'Pantry & Dry Goods': ['Rice', 'Pasta', 'Flour', 'Sugar', 'Olive Oil', 'Canned Beans', 'Cereal', 'Peanut Butter', 'Coffee', 'Salt'],
  Frozen: ['Frozen Vegetables', 'Ice Cream', 'Frozen Pizza', 'Frozen Berries', 'Frozen Waffles', 'Frozen Fries'],
  Bakery: ['Bread', 'Bagels', 'Tortillas', 'Muffins', 'Dinner Rolls'],
  Beverages: ['Orange Juice', 'Soda', 'Sparkling Water', 'Beer', 'Wine', 'Tea Bags'],
  'Household & Other': ['Paper Towels', 'Dish Soap', 'Laundry Detergent', 'Trash Bags', 'Toilet Paper', 'Light Bulbs'],
};

const GroceryListGeneratorContent = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [customItem, setCustomItem] = useState('');
  const [customItems, setCustomItems] = useState<string[]>([]);

  const key = (cat: string, item: string) => `${cat}::${item}`;

  const toggle = (cat: string, item: string) => {
    const k = key(cat, item);
    setChecked((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const addCustomItem = () => {
    const trimmed = customItem.trim();
    if (!trimmed) return;
    setCustomItems((prev) => [...prev, trimmed]);
    setChecked((prev) => ({ ...prev, [key('Other', trimmed)]: true }));
    setCustomItem('');
  };

  const finalList = useMemo(() => {
    const result: Record<string, string[]> = {};
    Object.entries(CATEGORIES).forEach(([cat, items]) => {
      const picked = items.filter((item) => checked[key(cat, item)]);
      if (picked.length > 0) result[cat] = picked;
    });
    const otherPicked = customItems.filter((item) => checked[key('Other', item)]);
    if (otherPicked.length > 0) result['Other'] = otherPicked;
    return result;
  }, [checked, customItems]);

  const copyList = async () => {
    const lines: string[] = [];
    Object.entries(finalList).forEach(([cat, items]) => {
      lines.push(`${cat}:`);
      items.forEach((item) => lines.push(`  - ${item}`));
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
      <Box>
        <Grid container spacing={2}>
          {Object.entries(CATEGORIES).map(([cat, items]) => (
            <Grid item xs={12} sm={6} key={cat}>
              <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>{cat}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  {items.map((item) => (
                    <FormControlLabel
                      key={item}
                      control={<Checkbox size="small" checked={!!checked[key(cat, item)]} onChange={() => toggle(cat, item)} />}
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>Add Custom Item</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              fullWidth
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              placeholder="e.g. Birthday candles"
              onKeyDown={(e) => { if (e.key === 'Enter') addCustomItem(); }}
            />
            <Button variant="contained" startIcon={<AddIcon />} onClick={addCustomItem}>Add</Button>
          </Stack>
          {customItems.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              {customItems.map((item) => (
                <Chip key={item} label={item} size="small" sx={{ mb: 1 }} onClick={() => toggle('Other', item)} color={checked[key('Other', item)] ? 'primary' : 'default'} />
              ))}
            </Stack>
          )}
        </Paper>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Your List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={Object.keys(finalList).length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 300 }}>
          {Object.keys(finalList).length === 0 && (
            <Typography variant="body2" color="text.secondary">Check items on the left to build your list.</Typography>
          )}
          {Object.entries(finalList).map(([cat, items]) => (
            <Box key={cat} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>{cat}</Typography>
              <ul style={{ marginTop: 4 }}>
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

const GroceryListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Grocery List Generator</Typography>
      <Typography variant="body1">
        Browse the pre-organized categories — Produce, Dairy & Eggs, Meat & Seafood, Pantry & Dry Goods,
        Frozen, Bakery, Beverages, and Household & Other — and check off any common items you need. Use the
        &quot;Add Custom Item&quot; field to add anything not already listed, which appears in its own
        &quot;Other&quot; section. The panel on the right shows your final shopping list grouped by category,
        including only the items you&apos;ve checked, ready to copy before you head to the store.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking &quot;Apples&quot;, &quot;Milk&quot;, and &quot;Bread&quot; from three different categories,
        then adding a custom item like &quot;Birthday candles&quot;, produces a grouped list showing Produce:
        Apples, Dairy & Eggs: Milk, Bakery: Bread, and Other: Birthday candles.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a weekly grocery list quickly from common household staples.</li>
          <li>Organizing a shopping trip by store section to save time in the aisles.</li>
          <li>Adding one-off custom items alongside a recurring base list.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I add items that aren&apos;t in the pre-set categories?</strong> Yes — use the &quot;Add Custom Item&quot; field to add anything, and it will appear in the Other section of your final list.</li>
          <li><strong>Is my list saved for next time?</strong> No — the list resets when you reload the page, since it&apos;s generated fresh in your browser each visit rather than stored anywhere.</li>
          <li><strong>Can I copy the list to share with someone else?</strong> Yes — click the Copy button to copy your full grouped list as plain text, ready to paste into a text message, note, or email.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/grocery-list-generator" content={content}>
      <GroceryListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GroceryListGenerator;
