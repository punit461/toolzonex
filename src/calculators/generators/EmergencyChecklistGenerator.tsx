'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Grid, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: Record<string, string[]> = {
  'Water & Food': [
    '1 gallon of water per person per day (3-day minimum)',
    'Non-perishable food (3-day minimum)',
    'Manual can opener',
    'Baby formula and food (if needed)',
    'Pet food and water (if needed)',
  ],
  'First Aid': [
    'Bandages and gauze',
    'Antiseptic wipes and ointment',
    'Prescription medications (7-day supply)',
    'Over-the-counter pain relievers',
    'First aid manual',
    'Thermometer',
  ],
  'Documents & Cash': [
    'Copies of ID, insurance, and medical records',
    'Small amount of cash in small bills',
    'Emergency contact list',
    'Copy of house/car keys',
  ],
  'Communication & Power': [
    'Flashlight with extra batteries',
    'Battery-powered or hand-crank radio',
    'Portable phone charger / power bank',
    'Extra batteries (assorted sizes)',
    'Whistle to signal for help',
  ],
  'Tools & Safety': [
    'Multi-tool or basic tool kit',
    'Duct tape and plastic sheeting',
    'Dust masks',
    'Work gloves',
    'Fire extinguisher',
    'Local maps (non-digital)',
  ],
};

const EmergencyChecklistGeneratorContent = () => {
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
              placeholder="e.g. Extra propane tank"
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
          <Typography variant="subtitle1" fontWeight={600}>Your Emergency Kit List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={Object.keys(finalList).length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 300 }}>
          {Object.keys(finalList).length === 0 && (
            <Typography variant="body2" color="text.secondary">Check items on the left to build your emergency kit list.</Typography>
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

const EmergencyChecklistGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Emergency Checklist</Typography>
      <Typography variant="body1">
        Browse the pre-organized emergency preparedness categories — Water & Food, First Aid, Documents &
        Cash, Communication & Power, and Tools & Safety — and check off the supplies you have or need to
        gather. Use the &quot;Add Custom Item&quot; field for anything specific to your household that
        isn&apos;t already listed. The panel on the right builds your final checklist grouped by category,
        ready to copy as a shopping list or kit-packing guide.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking &quot;1 gallon of water per person per day&quot; and &quot;Non-perishable food&quot; under
        Water & Food, plus &quot;Flashlight with extra batteries&quot; under Communication & Power, produces
        a grouped list showing those two categories with their selected items.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a home emergency preparedness kit before hurricane, wildfire, or winter storm season.</li>
          <li>Checking an existing emergency kit against a comprehensive category-by-category list.</li>
          <li>Creating a shopping list of missing emergency supplies to pick up in one trip.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Emergency/ID Contact Card Generator?</strong> The Emergency/ID Contact Card Generator builds a personal identification and emergency-contact CARD meant to carry with you (your name, medical info, and emergency contacts). This Emergency Checklist is instead a PREPAREDNESS SUPPLIES list for building an actual emergency kit at home — a completely different purpose from a personal ID card.</li>
          <li><strong>Can I add items that aren&apos;t in the pre-set categories?</strong> Yes — use the &quot;Add Custom Item&quot; field to add anything specific to your household, and it will appear in the Other section of your final checklist.</li>
          <li><strong>Is my checklist saved for next time?</strong> No — the list resets when you reload the page, since it&apos;s generated fresh in your browser each visit rather than stored anywhere. Copy your finished list before closing the tab.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/emergency-checklist-generator" content={content}>
      <EmergencyChecklistGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmergencyChecklistGenerator;
