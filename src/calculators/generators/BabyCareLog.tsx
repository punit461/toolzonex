'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FEEDING_TYPES = ['Bottle', 'Nursing', 'Solid food'];

interface FeedingEntry {
  id: number;
  time: string;
  type: string;
  amount: string;
}

interface SleepEntry {
  id: number;
  start: string;
  end: string;
}

let nextFeedId = 1;
let nextSleepId = 1;

const DEFAULT_FEEDINGS: FeedingEntry[] = [
  { id: nextFeedId++, time: '08:00', type: 'Bottle', amount: '4 oz' },
];

const DEFAULT_SLEEP: SleepEntry[] = [
  { id: nextSleepId++, start: '13:00', end: '14:30' },
];

function computeDuration(start: string, end: string): string {
  if (!start || !end) return '';
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  if ([sh, sm, eh, em].some((n) => Number.isNaN(n))) return '';
  let minutes = eh * 60 + em - (sh * 60 + sm);
  if (minutes < 0) minutes += 24 * 60; // overnight rollover
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

const BabyCareLogContent = () => {
  const [feedings, setFeedings] = useState<FeedingEntry[]>(DEFAULT_FEEDINGS);
  const [sleeps, setSleeps] = useState<SleepEntry[]>(DEFAULT_SLEEP);

  const addFeeding = () => setFeedings((prev) => [...prev, { id: nextFeedId++, time: '', type: 'Bottle', amount: '' }]);
  const removeFeeding = (id: number) => setFeedings((prev) => prev.filter((f) => f.id !== id));
  const updateFeeding = (id: number, patch: Partial<FeedingEntry>) =>
    setFeedings((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));

  const addSleep = () => setSleeps((prev) => [...prev, { id: nextSleepId++, start: '', end: '' }]);
  const removeSleep = (id: number) => setSleeps((prev) => prev.filter((s) => s.id !== id));
  const updateSleep = (id: number, patch: Partial<SleepEntry>) =>
    setSleeps((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const validFeedings = useMemo(() => feedings.filter((f) => f.time.trim()), [feedings]);
  const validSleeps = useMemo(() => sleeps.filter((s) => s.start.trim() && s.end.trim()), [sleeps]);

  const copyAll = async () => {
    const lines: string[] = ['Feeding Log:'];
    validFeedings.forEach((f) => lines.push(`  - ${f.time} — ${f.type}${f.amount.trim() ? ` (${f.amount.trim()})` : ''}`));
    lines.push('', 'Sleep Log:');
    validSleeps.forEach((s) => lines.push(`  - ${s.start} to ${s.end} (${computeDuration(s.start, s.end)})`));
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>
          Copy Daily Summary
        </Button>
      </Stack>

      <Typography variant="subtitle1" fontWeight={600} mb={2}>Feeding Log</Typography>
      <Stack spacing={2} mb={2}>
        {feedings.map((f) => (
          <Paper key={f.id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <TextField size="small" type="time" label="Time" InputLabelProps={{ shrink: true }} value={f.time} onChange={(e) => updateFeeding(f.id, { time: e.target.value })} sx={{ minWidth: 130 }} />
              <FormControl size="small" sx={{ minWidth: 130 }}>
                <InputLabel>Type</InputLabel>
                <Select label="Type" value={f.type} onChange={(e: SelectChangeEvent) => updateFeeding(f.id, { type: e.target.value })}>
                  {FEEDING_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField size="small" label="Amount" value={f.amount} onChange={(e) => updateFeeding(f.id, { amount: e.target.value })} placeholder="e.g. 4 oz" sx={{ minWidth: 120 }} />
              <IconButton onClick={() => removeFeeding(f.id)} disabled={feedings.length <= 1} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={addFeeding} sx={{ mb: 4 }}>
        Add Feeding
      </Button>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="subtitle1" fontWeight={600} mb={2}>Sleep Log</Typography>
      <Stack spacing={2} mb={2}>
        {sleeps.map((s) => (
          <Paper key={s.id} variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <TextField size="small" type="time" label="Sleep start" InputLabelProps={{ shrink: true }} value={s.start} onChange={(e) => updateSleep(s.id, { start: e.target.value })} sx={{ minWidth: 130 }} />
              <TextField size="small" type="time" label="Sleep end" InputLabelProps={{ shrink: true }} value={s.end} onChange={(e) => updateSleep(s.id, { end: e.target.value })} sx={{ minWidth: 130 }} />
              <Typography variant="body2" color="text.secondary">
                {computeDuration(s.start, s.end) || '—'}
              </Typography>
              <IconButton onClick={() => removeSleep(s.id)} disabled={sleeps.length <= 1} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={addSleep}>
        Add Sleep Entry
      </Button>
    </Box>
  );
};

const BabyCareLog = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Baby Care Log</Typography>
      <Typography variant="body1">
        Use the Feeding Log to jot down each feeding&apos;s time, type (bottle, nursing, or solid food), and
        amount. Use the Sleep Log to record each sleep session&apos;s start and end time — the duration is
        calculated automatically, including overnight sessions that cross midnight. Click &quot;Copy Daily
        Summary&quot; to grab both logs as plain text to share with a partner, caregiver, or pediatrician.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Logging a bottle feeding of 4 oz at 8:00 AM, then a sleep session from 1:00 PM to 2:30 PM, shows the
        feeding entry alongside a sleep entry automatically displaying a duration of &quot;1h 30m&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Jotting down feeding and sleep times throughout the day to share with a partner or nanny.</li>
          <li>Printing a daily summary to bring to a pediatrician appointment.</li>
          <li>Spotting rough feeding or sleep patterns over the course of a single day.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this replace a dedicated baby-tracking app?</strong> No — this is a session-only reference log kept in your browser, useful for jotting things down during the day or printing a daily summary. If you need ongoing, persistent history across days, a dedicated baby-tracking app is a better fit.</li>
          <li><strong>How is sleep duration calculated for sessions that cross midnight?</strong> If the end time is earlier than the start time, the tool assumes the session crossed midnight and adds 24 hours before calculating the duration.</li>
          <li><strong>Is my baby care log saved anywhere?</strong> No — everything resets when you reload the page, since it&apos;s kept only in your browser for the current session, so copy the summary before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/baby-care-log" content={content}>
      <BabyCareLogContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BabyCareLog;
