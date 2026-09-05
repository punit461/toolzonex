'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MedicationIcon from '@mui/icons-material/Medication';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
}

let nextId = 900;

const DEFAULT_MEDS: Medication[] = [
  { id: 1, name: 'Vitamin D', dosage: '1000 IU', frequency: 'Morning, with breakfast', notes: '' },
  { id: 2, name: 'Ibuprofen', dosage: '200 mg', frequency: 'As needed', notes: 'Take with food' },
];

const MedicationReminderListContent = () => {
  const [meds, setMeds] = useState<Medication[]>(DEFAULT_MEDS);

  const addMed = () => setMeds((prev) => [...prev, { id: nextId++, name: '', dosage: '', frequency: '', notes: '' }]);
  const removeMed = (id: number) => setMeds((prev) => prev.filter((m) => m.id !== id));
  const updateMed = (id: number, patch: Partial<Medication>) =>
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const validMeds = useMemo(() => meds.filter((m) => m.name.trim()), [meds]);

  const copyList = async () => {
    const lines = validMeds.map((m) => {
      const parts = [m.name];
      if (m.dosage) parts.push(m.dosage);
      if (m.frequency) parts.push(`— ${m.frequency}`);
      let line = parts.join(' ');
      if (m.notes) line += ` (${m.notes})`;
      return `- ${line}`;
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Medications</Typography>
        <Stack spacing={2}>
          {meds.map((m) => (
            <Paper key={m.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size="small"
                  label="Medication name"
                  value={m.name}
                  onChange={(e) => updateMed(m.id, { name: e.target.value })}
                  sx={{ flex: 2, minWidth: 150 }}
                />
                <TextField
                  size="small"
                  label="Dosage"
                  value={m.dosage}
                  onChange={(e) => updateMed(m.id, { dosage: e.target.value })}
                  sx={{ flex: 1, minWidth: 100 }}
                />
                <IconButton onClick={() => removeMed(m.id)} disabled={meds.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  fullWidth
                  label="Frequency / time of day"
                  placeholder="e.g. Morning and evening"
                  value={m.frequency}
                  onChange={(e) => updateMed(m.id, { frequency: e.target.value })}
                />
                <TextField
                  size="small"
                  fullWidth
                  label="Notes (optional)"
                  value={m.notes}
                  onChange={(e) => updateMed(m.id, { notes: e.target.value })}
                />
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addMed} sx={{ mt: 2 }}>
          Add Medication
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Your Medication List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={validMeds.length === 0}>
            Copy
          </Button>
        </Stack>
        <Alert severity="warning" sx={{ mb: 2 }}>
          This is a reference list only — it does not send reminders or notifications. Set a phone alarm or
          calendar event for each medication time.
        </Alert>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
          {validMeds.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add a medication to build your list.</Typography>
          )}
          <Stack spacing={1.5}>
            {validMeds.map((m) => (
              <Box key={m.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <MedicationIcon color="primary" fontSize="small" sx={{ mt: 0.3 }} />
                <Box>
                  <Typography fontWeight={600}>{m.name}{m.dosage ? ` — ${m.dosage}` : ''}</Typography>
                  {m.frequency && <Typography variant="body2" color="text.secondary">{m.frequency}</Typography>}
                  {m.notes && <Typography variant="body2" color="text.secondary">{m.notes}</Typography>}
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

const MedicationReminderList = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Medication Reminder List</Typography>
      <Typography variant="body1">
        Add each medication with its name, dosage, and frequency or time of day, plus any optional notes
        (like &quot;take with food&quot;). Use Add Medication to add more rows, and the delete icon to remove
        one. The panel on the right builds a clean, organized reference list you can copy to keep nearby or
        share with a caregiver.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Vitamin D, 1000 IU, Morning with breakfast&quot; and &quot;Ibuprofen, 200 mg, As needed
        (Take with food)&quot; produces a two-item list showing each medication&apos;s name, dosage,
        frequency, and note together.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a clear medication reference sheet to hand to a caregiver or family member.</li>
          <li>Organizing a personal medication list before a doctor&apos;s appointment.</li>
          <li>Keeping dosage and timing details together in one place for quick reference.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this tool actually send reminders or alerts?</strong> No — this is a reference list generator only. It has no backend and cannot send notifications, texts, or alarms. Once you&apos;ve built your list, set actual phone alarms or calendar reminders based on the times and frequencies you&apos;ve entered here.</li>
          <li><strong>Is my medication information saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets when you reload the page, so copy your list before closing the tab if you want to keep it.</li>
          <li><strong>Can I use this for someone else&apos;s medications, like a parent or child?</strong> Yes — the tool doesn&apos;t require any personal identifying information beyond what you choose to type into the notes, so it works equally well for tracking a dependent&apos;s or family member&apos;s medications.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/medication-reminder-list" content={content}>
      <MedicationReminderListContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MedicationReminderList;
