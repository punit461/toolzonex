'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Grid, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: Record<string, string[]> = {
  '8 Weeks Before': ['Research and get quotes from moving companies', 'Declutter — sort belongings into keep, sell, donate, and toss', 'Create a moving budget', 'Start using up food in the freezer and pantry', 'Research your new neighborhood (schools, doctors, utilities)'],
  '4 Weeks Before': ['Book your moving company or truck rental', 'Change your address with the post office', 'Transfer or set up utilities at the new place', 'Order packing supplies (boxes, tape, bubble wrap)', 'Start packing non-essential rooms', 'Notify schools and arrange record transfers'],
  'Moving Week': ['Pack an essentials box (medications, chargers, toiletries, snacks)', 'Confirm moving day details with movers or truck rental', 'Defrost and clean out the refrigerator', 'Finish packing all remaining rooms', 'Set aside valuables and important documents to move yourself'],
  'Moving Day': ['Do a final walkthrough of the old home', 'Take meter readings (gas, electric, water)', 'Hand over keys / confirm handover with landlord or buyer', 'Do an inventory check as boxes are loaded', 'Keep essentials box and documents with you, not on the truck'],
  'After the Move': ['Unpack essentials first, then room by room', 'Update your address with banks, employer, and subscriptions', 'Update your address with the DMV / driver’s license', 'Register to vote at your new address', 'Locate the fuse box, water shutoff, and emergency exits'],
};

const MovingChecklistGeneratorContent = () => {
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
            <Grid item xs={12} key={cat}>
              <Paper variant="outlined" sx={{ p: 2 }}>
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
              placeholder="e.g. Cancel gym membership"
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
          <Typography variant="subtitle1" fontWeight={600}>Your Moving Checklist</Typography>
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

const MovingChecklistGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Moving Checklist Generator</Typography>
      <Typography variant="body1">
        Work through the checklist in timeline order — 8 Weeks Before, 4 Weeks Before, Moving Week, Moving Day,
        and After the Move — checking off tasks as you complete them. Each stage lists genuinely useful,
        move-specific tasks rather than generic filler, from researching movers early on to updating your
        address with the DMV afterward. Add any move-specific tasks of your own with the custom task field, then
        copy your full checklist to keep on hand throughout the move.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking &quot;Research and get quotes from moving companies&quot; under 8 Weeks Before, &quot;Book your
        moving company or truck rental&quot; under 4 Weeks Before, and &quot;Pack an essentials box&quot; under
        Moving Week produces a grouped checklist showing exactly what stage of the move each task belongs to.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a household move well in advance so nothing gets left to the last minute.</li>
          <li>Keeping moving-day logistics (meter readings, key handover) organized and stress-free.</li>
          <li>Tracking post-move admin like address updates that are easy to forget.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if my move is happening sooner than 8 weeks out?</strong> Start from whichever timeline stage matches how much time you have left — the tasks are still relevant even if you compress several stages into a shorter window.</li>
          <li><strong>Can I add tasks specific to my own move?</strong> Yes — use the &quot;Add Custom Task&quot; field for anything not already listed, such as cancelling a specific membership or arranging pet transport.</li>
          <li><strong>Is my checklist saved between visits?</strong> No — it resets on reload, so copy your checklist to a notes app or print it if you want a lasting reference throughout the move.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/moving-checklist-generator" content={content}>
      <MovingChecklistGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MovingChecklistGenerator;
