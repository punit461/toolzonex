'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Checkbox, FormControlLabel, Button, TextField, Stack, Grid, Chip, IconButton, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: Record<string, string[]> = {
  'Daily Care': ['Feeding schedule followed', 'Daily walk / exercise', 'Fresh water refilled', 'Litter box / cage cleaned'],
  Grooming: ['Brushing', 'Nail trim', 'Bathing', 'Teeth cleaning'],
  Health: ['Regular vet checkup', 'Flea/tick prevention applied', 'Weight check'],
};

interface VaccineEntry {
  id: number;
  vaccine: string;
  dateGiven: string;
  nextDue: string;
}

let nextId = 1;

const DEFAULT_VACCINES: VaccineEntry[] = [
  { id: nextId++, vaccine: 'Rabies', dateGiven: '', nextDue: '' },
];

const PetCareChecklistVaccinationRecordContent = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [customItem, setCustomItem] = useState('');
  const [customItems, setCustomItems] = useState<string[]>([]);
  const [vaccines, setVaccines] = useState<VaccineEntry[]>(DEFAULT_VACCINES);

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

  const addVaccine = () => setVaccines((prev) => [...prev, { id: nextId++, vaccine: '', dateGiven: '', nextDue: '' }]);
  const removeVaccine = (id: number) => setVaccines((prev) => prev.filter((v) => v.id !== id));
  const updateVaccine = (id: number, patch: Partial<VaccineEntry>) =>
    setVaccines((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const validVaccines = useMemo(() => vaccines.filter((v) => v.vaccine.trim()), [vaccines]);

  const copyAll = async () => {
    const lines: string[] = ['Pet Care Checklist:'];
    Object.entries(finalList).forEach(([cat, items]) => {
      lines.push(`${cat}:`);
      items.forEach((item) => lines.push(`  - ${item}`));
    });
    lines.push('', 'Vaccination Record:');
    validVaccines.forEach((v) => {
      lines.push(`  - ${v.vaccine.trim()} — given ${v.dateGiven || 'unknown'}, next due ${v.nextDue || 'unknown'}`);
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>
          Copy Full Record
        </Button>
      </Stack>

      <Typography variant="subtitle1" fontWeight={600} mb={2}>Pet Care Checklist</Typography>
      <Grid container spacing={2}>
        {Object.entries(CATEGORIES).map(([cat, items]) => (
          <Grid item xs={12} sm={4} key={cat}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>{cat}</Typography>
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

      <Paper variant="outlined" sx={{ p: 2, mt: 2, mb: 3 }}>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>Add Custom Care Item</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            fullWidth
            value={customItem}
            onChange={(e) => setCustomItem(e.target.value)}
            placeholder="e.g. Give heartworm medication"
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

      <Divider sx={{ mb: 3 }} />

      <Typography variant="subtitle1" fontWeight={600} mb={2}>Vaccination Record</Typography>
      <Stack spacing={2} mb={2}>
        {vaccines.map((v) => (
          <Paper key={v.id} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField size="small" label="Vaccine name" value={v.vaccine} onChange={(e) => updateVaccine(v.id, { vaccine: e.target.value })} sx={{ flex: 1, minWidth: 140 }} />
              <TextField size="small" type="date" label="Date given" InputLabelProps={{ shrink: true }} value={v.dateGiven} onChange={(e) => updateVaccine(v.id, { dateGiven: e.target.value })} sx={{ flex: 1, minWidth: 140 }} />
              <TextField size="small" type="date" label="Next due" InputLabelProps={{ shrink: true }} value={v.nextDue} onChange={(e) => updateVaccine(v.id, { nextDue: e.target.value })} sx={{ flex: 1, minWidth: 140 }} />
              <IconButton onClick={() => removeVaccine(v.id)} disabled={vaccines.length <= 1} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={addVaccine}>
        Add Vaccine Entry
      </Button>

      {(Object.keys(finalList).length > 0 || validVaccines.length > 0) && (
        <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>Summary</Typography>
          {Object.entries(finalList).map(([cat, items]) => (
            <Box key={cat} sx={{ mb: 1 }}>
              <Typography variant="body2" fontWeight={600}>{cat}</Typography>
              <ul style={{ marginTop: 4 }}>
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Box>
          ))}
          {validVaccines.length > 0 && (
            <Box>
              <Typography variant="body2" fontWeight={600}>Vaccinations</Typography>
              <ul style={{ marginTop: 4 }}>
                {validVaccines.map((v) => (
                  <li key={v.id}>{v.vaccine} — given {v.dateGiven || 'unknown'}, next due {v.nextDue || 'unknown'}</li>
                ))}
              </ul>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

const PetCareChecklistVaccinationRecord = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Pet Care Checklist & Vaccination Record</Typography>
      <Typography variant="body1">
        Check off general pet care tasks — feeding schedule, daily walk, grooming, and regular vet checkups
        — organized by category, and add your own custom care items alongside them. Below that, add each
        vaccine your pet has received with the date given and the next due date, building a running
        vaccination record. Click &quot;Copy Full Record&quot; to grab both the checklist and the
        vaccination history as plain text.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking &quot;Daily walk / exercise&quot; and &quot;Regular vet checkup&quot;, then adding a
        &quot;Rabies&quot; vaccine entry with a date given and a next-due date one year later, produces a
        summary listing your checked care tasks alongside the vaccination record showing the rabies shot
        and its next due date.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping a running vaccination history to bring to vet appointments.</li>
          <li>Tracking daily and routine pet care tasks for multiple caretakers or pet sitters.</li>
          <li>Setting reminders for upcoming vaccine due dates based on your own record.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I track vaccination records for more than one pet?</strong> This tool tracks one record at a time — for multiple pets, copy and save each pet&apos;s record separately before starting a new one.</li>
          <li><strong>Can I add care tasks that aren&apos;t in the pre-set categories?</strong> Yes — use the &quot;Add Custom Care Item&quot; field to add anything, and it will appear in the Other section of your summary.</li>
          <li><strong>Is my pet care and vaccination data saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the record before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/pet-care-checklist-vaccination-record" content={content}>
      <PetCareChecklistVaccinationRecordContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PetCareChecklistVaccinationRecord;
