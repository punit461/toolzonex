'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Grid, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: Record<string, string[]> = {
  Spring: ['Clean out gutters', 'Inspect roof for winter damage', 'Service the air conditioning unit', 'Check exterior for cracks or damage'],
  Summer: ['Check and reseal exterior caulking', 'Inspect deck or patio for wear', 'Test irrigation/sprinkler system', 'Check window screens'],
  Fall: ['Clean gutters again before leaves fall', 'Have the furnace/heating system serviced', 'Seal drafts around windows and doors', 'Disconnect and drain outdoor hoses'],
  Winter: ['Test smoke and carbon monoxide detector batteries', 'Insulate exposed pipes', 'Check attic insulation and ventilation', 'Inspect weatherstripping on doors'],
};

const HomeMaintenanceChecklistContent = () => {
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
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>Add Custom Task</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              fullWidth
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              placeholder="e.g. Pressure wash the driveway"
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
          <Typography variant="subtitle1" fontWeight={600}>Your Maintenance Checklist</Typography>
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

const HomeMaintenanceChecklist = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Home Maintenance Checklist</Typography>
      <Typography variant="body1">
        Browse the pre-organized seasonal categories — Spring, Summer, Fall, and Winter — and check off the
        structural and mechanical upkeep tasks your home needs. Use the &quot;Add Custom Task&quot; field
        for anything specific to your house, which appears in its own &quot;Other&quot; section. The panel
        on the right shows your final checklist grouped by season, ready to copy for a home binder or
        shared family calendar.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking &quot;Clean out gutters&quot; and &quot;Service the air conditioning unit&quot; under
        Spring, then &quot;Have the furnace/heating system serviced&quot; under Fall, produces a grouped
        list showing a Spring section and a Fall section, each listing only the tasks you&apos;ve checked.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning seasonal upkeep like gutter cleaning, HVAC servicing, and weatherproofing ahead of time.</li>
          <li>Building a yearly home maintenance calendar organized by season.</li>
          <li>Checking off structural and safety tasks like smoke detector batteries and pipe insulation before winter.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Cleaning Checklist Generator?</strong> The Cleaning Checklist Generator covers routine cleaning and tidying tasks organized by Daily, Weekly, and Monthly frequency. This tool covers seasonal structural and mechanical upkeep — gutters, HVAC, weatherproofing, and safety checks — a different category of home care.</li>
          <li><strong>Can I add maintenance tasks specific to my home?</strong> Yes — use the &quot;Add Custom Task&quot; field to add anything, and it will appear in the Other section of your final checklist.</li>
          <li><strong>Is my checklist saved for next time?</strong> No — the list resets when you reload the page, since it&apos;s generated fresh in your browser each visit rather than stored anywhere.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/home-maintenance-checklist" content={content}>
      <HomeMaintenanceChecklistContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HomeMaintenanceChecklist;
