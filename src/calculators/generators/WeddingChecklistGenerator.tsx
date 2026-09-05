'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Grid, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: Record<string, string[]> = {
  '12 Months Before': ['Set a budget', 'Book the venue', 'Hire a photographer', 'Draft the guest list', 'Choose a wedding party'],
  '6 Months Before': ['Order invitations', 'Book caterer & schedule cake tasting', 'Book florist', 'Book entertainment / DJ or band', 'Shop for wedding attire'],
  '3 Months Before': ['Finalize the menu', 'Send invitations', 'Arrange transportation', 'Buy wedding rings', 'Schedule hair & makeup trial'],
  '1 Month Before': ['Final dress / suit fitting', 'Confirm details with all vendors', 'Write vows and/or speeches', 'Apply for marriage license', 'Create the seating chart'],
  'Week Of': ['Attend the rehearsal & rehearsal dinner', 'Confirm final headcount with caterer', 'Pack for the honeymoon', 'Delegate day-of tasks to a point person', 'Give final payments/tips to vendors'],
};

const WeddingChecklistGeneratorContent = () => {
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
              placeholder="e.g. Book hotel blocks for guests"
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
          <Typography variant="subtitle1" fontWeight={600}>Your Wedding Checklist</Typography>
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

const WeddingChecklistGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Wedding Checklist Generator</Typography>
      <Typography variant="body1">
        Work through the checklist in timeline order — 12 Months Before, 6 Months Before, 3 Months Before, 1
        Month Before, and Week Of — checking off tasks as you complete them. Each stage lists genuinely useful
        wedding-planning tasks appropriate to that point in the countdown, from booking your venue a year out
        to confirming the final headcount the week of the event. Add any tasks specific to your own wedding with
        the custom task field, then copy your full checklist to share with your partner or wedding party.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking &quot;Book the venue&quot; and &quot;Hire a photographer&quot; under 12 Months Before, then
        &quot;Order invitations&quot; under 6 Months Before, produces a grouped checklist showing exactly which
        planning stage each task belongs to, so nothing gets tackled too early or too late.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a wedding from engagement through the big day without missing key deadlines.</li>
          <li>Coordinating tasks between partners or with a wedding planner by timeline stage.</li>
          <li>Keeping last-minute Week Of tasks like rehearsal and headcount confirmation from slipping through the cracks.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if my engagement is shorter than 12 months?</strong> Start from whichever timeline stage matches your remaining time — the tasks are still relevant even if you compress several stages into a shorter window.</li>
          <li><strong>Can I add tasks specific to my own wedding?</strong> Yes — use the &quot;Add Custom Task&quot; field for anything not already listed, such as booking hotel blocks for out-of-town guests.</li>
          <li><strong>Is my checklist saved between visits?</strong> No — it resets on reload, so copy your checklist to a notes app or planning document if you want a lasting reference throughout your engagement.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/wedding-checklist-generator" content={content}>
      <WeddingChecklistGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WeddingChecklistGenerator;
