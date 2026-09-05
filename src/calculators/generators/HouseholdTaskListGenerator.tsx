'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Grid, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: Record<string, string[]> = {
  Kitchen: ['Wash dishes', 'Wipe counters', 'Sweep floor', 'Take out trash', 'Clean stovetop', 'Empty dishwasher', 'Wipe down fridge exterior'],
  Bathroom: ['Clean toilet', 'Scrub tub/shower', 'Wipe mirror', 'Restock toilet paper', 'Clean sink', 'Empty trash bin'],
  Bedroom: ['Make bed', 'Put away laundry', 'Tidy nightstand', 'Vacuum floor', 'Change sheets'],
  'Living Room': ['Vacuum carpet/rugs', 'Dust surfaces', 'Fluff and arrange cushions', 'Tidy remote controls & clutter', 'Wipe down TV screen'],
  Outdoor: ['Mow the lawn', 'Water plants', 'Sweep porch/patio', 'Take bins out for collection', 'Check mailbox'],
  General: ['Pay bills', 'Check smoke detector batteries', 'Water indoor plants', 'Sort mail', 'Wipe light switches & door handles'],
};

const HouseholdTaskListGeneratorContent = () => {
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
              placeholder="e.g. Clean out the garage"
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
          <Typography variant="subtitle1" fontWeight={600}>Your Task List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={Object.keys(finalList).length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 300 }}>
          {Object.keys(finalList).length === 0 && (
            <Typography variant="body2" color="text.secondary">Check items on the left to build your task list.</Typography>
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

const HouseholdTaskListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Household Task List Generator</Typography>
      <Typography variant="body1">
        Browse the pre-organized categories — Kitchen, Bathroom, Bedroom, Living Room, Outdoor, and General —
        and check off any common household tasks you need to get done. Use the &quot;Add Custom Task&quot;
        field to add anything not already listed, which appears in its own &quot;Other&quot; section. The panel
        on the right shows your final task list grouped by category, including only the tasks you&apos;ve
        checked, ready to copy for a chore board, sticky note, or shared family list.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking &quot;Wash dishes&quot; and &quot;Wipe counters&quot; under Kitchen, &quot;Make bed&quot; under
        Bedroom, then adding a custom task like &quot;Clean out the garage&quot;, produces a grouped list
        showing Kitchen: Wash dishes, Wipe counters; Bedroom: Make bed; and Other: Clean out the garage.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a weekend household to-do list quickly from common recurring tasks.</li>
          <li>Splitting up chores by room when assigning tasks to family members or roommates.</li>
          <li>Adding one-off custom tasks alongside a recurring base checklist.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I add tasks that aren&apos;t in the pre-set categories?</strong> Yes — use the &quot;Add Custom Task&quot; field to add anything, and it will appear in the Other section of your final list.</li>
          <li><strong>Is my checklist saved for next time?</strong> No — the list resets when you reload the page, since it&apos;s generated fresh in your browser each visit rather than stored anywhere.</li>
          <li><strong>Can I copy the list to share with my household?</strong> Yes — click the Copy button to copy your full grouped list as plain text, ready to paste into a group chat, note, or shared document.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/household-task-list-generator" content={content}>
      <HouseholdTaskListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HouseholdTaskListGenerator;
