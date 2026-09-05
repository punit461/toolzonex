'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Grid, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: Record<string, string[]> = {
  Bedding: ['Extra-long twin sheets', 'Pillow', 'Blanket/comforter', 'Mattress topper'],
  Storage: ['Under-bed bins', 'Closet organizers', 'Hanging shoe rack', 'Drawer dividers'],
  Electronics: ['Laptop', 'Chargers', 'Power strip', 'Surge protector'],
  Bathroom: ['Shower caddy', 'Shower shoes', 'Towels', 'Toiletries bag'],
  'Kitchen/Snacks': ['Mini fridge', 'Microwave-safe dishes', 'Reusable water bottle', 'Non-perishable snacks'],
};

const CollegePackingChecklistContent = () => {
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
              placeholder="e.g. Command strips"
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
          <Typography variant="subtitle1" fontWeight={600}>Your Move-In Checklist</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={Object.keys(finalList).length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 300 }}>
          {Object.keys(finalList).length === 0 && (
            <Typography variant="body2" color="text.secondary">Check items on the left to build your checklist.</Typography>
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

const CollegePackingChecklist = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the College Packing Checklist</Typography>
      <Typography variant="body1">
        Browse the pre-organized dorm move-in categories — Bedding, Storage, Electronics, Bathroom, and
        Kitchen/Snacks — and check off what you need to bring. Use the &quot;Add Custom Item&quot; field for
        anything specific to your dorm or school, which appears in its own &quot;Other&quot; section. The
        panel on the right shows your final move-in checklist grouped by category, ready to copy for move-in
        day.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking &quot;Extra-long twin sheets&quot; and &quot;Pillow&quot; under Bedding, and &quot;Mini
        fridge&quot; under Kitchen/Snacks, then adding a custom item like &quot;Command strips&quot;,
        produces a grouped checklist showing Bedding, Kitchen/Snacks, and Other sections with only the items
        you&apos;ve checked or added.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Packing for a college dorm move-in with a checklist tailored to semester-long living.</li>
          <li>Coordinating with roommates on who&apos;s bringing shared items like a mini fridge.</li>
          <li>Building a shopping list ahead of a dorm-shopping trip.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Packing List Generator?</strong> The Packing List Generator covers short trips like Beach, Business, Camping, and Winter travel. This tool is specifically for a college dorm move-in — a semester-long living-setup context with dorm-specific categories like bedding and under-bed storage, genuinely different from packing for a short trip.</li>
          <li><strong>Can I add items specific to my dorm&apos;s rules?</strong> Yes — use the &quot;Add Custom Item&quot; field to add anything, and it will appear in the Other section of your final checklist.</li>
          <li><strong>Is my checklist saved for next time?</strong> No — the list resets when you reload the page, since it&apos;s generated fresh in your browser each visit rather than stored anywhere.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/college-packing-checklist" content={content}>
      <CollegePackingChecklistContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CollegePackingChecklist;
