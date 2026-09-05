'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

function formatHour(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  const period = h < 12 ? 'AM' : 'PM';
  let display = h % 12;
  if (display === 0) display = 12;
  return `${display}:00 ${period}`;
}

const DailyPlannerGeneratorContent = () => {
  const [date, setDate] = useState('');
  const [priorities, setPriorities] = useState<string[]>(['', '', '']);
  const [startHour, setStartHour] = useState('6');
  const [endHour, setEndHour] = useState('22');
  const [notes, setNotes] = useState('');
  const [schedule, setSchedule] = useState<Record<number, string>>({});

  const start = Math.max(0, Math.min(23, parseInt(startHour, 10) || 0));
  const end = Math.max(start + 1, Math.min(24, parseInt(endHour, 10) || 24));

  const hours = useMemo(() => {
    const arr: number[] = [];
    for (let h = start; h < end; h++) arr.push(h);
    return arr;
  }, [start, end]);

  const updatePriority = (idx: number, value: string) => {
    setPriorities((prev) => prev.map((p, i) => (i === idx ? value : p)));
  };

  const plainText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`DAILY PLANNER${date ? ` — ${date}` : ''}`);
    lines.push('');
    lines.push('TOP 3 PRIORITIES');
    priorities.forEach((p, i) => lines.push(`${i + 1}. ${p || '________________'}`));
    lines.push('');
    lines.push('SCHEDULE');
    hours.forEach((h) => {
      lines.push(`${formatHour(h)} — ${schedule[h] || ''}`);
    });
    lines.push('');
    lines.push('NOTES');
    lines.push(notes || '________________');
    return lines.join('\n');
  }, [date, priorities, hours, schedule, notes]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>Top 3 Priorities</Typography>
          <Stack spacing={1}>
            {priorities.map((p, i) => (
              <TextField
                key={i}
                label={`Priority ${i + 1}`}
                value={p}
                onChange={(e) => updatePriority(i, e.target.value)}
                fullWidth
              />
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={2}>
          <TextField
            label="Start Hour (0-23)"
            type="number"
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
            fullWidth
            inputProps={{ min: 0, max: 23 }}
          />
          <TextField
            label="End Hour (1-24)"
            type="number"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            fullWidth
            inputProps={{ min: 1, max: 24 }}
          />
        </Stack>

        <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>Hour-by-Hour Schedule</Typography>
          <Paper variant="outlined" sx={{ p: 1.5, maxHeight: 360, overflowY: 'auto' }}>
            <Stack spacing={1}>
              {hours.map((h) => (
                <Stack key={h} direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ width: 90, flexShrink: 0, color: 'text.secondary' }}>
                    {formatHour(h)}
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    value={schedule[h] || ''}
                    onChange={(e) => setSchedule((prev) => ({ ...prev, [h]: e.target.value }))}
                  />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Box>

        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
      </Stack>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Printable Preview</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText}>
            Copy as Text
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
            {plainText}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const DailyPlannerGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Daily Planner Generator</Typography>
      <Typography variant="body1">
        Pick a date, fill in your top 3 priorities for the day, then set the hour range you want to plan
        (the default runs from 6 AM to 10 PM, but you can widen or narrow it). Type directly into any hour
        slot to fill your schedule, and use the notes box for anything that doesn&apos;t fit a specific time.
        Everything you type updates the printable preview on the right instantly, which you can copy as plain
        text to paste into a note app or print.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting priorities to &quot;Finish quarterly report&quot;, &quot;Call the dentist&quot;, and
        &quot;Grocery shopping&quot;, then filling the 9:00 AM slot with &quot;Team standup&quot; produces a
        clean plain-text planner with your date, numbered priorities, and hour-by-hour schedule ready to copy
        or print.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning your workday with a clear top-3 focus before diving into hourly scheduling.</li>
          <li>Printing a physical daily planner sheet for a paper planner or binder.</li>
          <li>Time-blocking your day hour by hour to stay on track with meetings and tasks.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my planner saved anywhere?</strong> No — everything is kept only in your browser&apos;s memory for the current visit. Copy the text version out or print it if you want to keep it, since reloading the page clears it.</li>
          <li><strong>Can I change the hour range?</strong> Yes — set any start and end hour (0-23 for start, 1-24 for end) to plan a shorter block like a workday, or a longer one covering early morning to late night.</li>
          <li><strong>Can I print this directly?</strong> Yes — use the "Copy as Text" button to copy the plain-text version, then paste it into a document or note app and print from there for a clean, ready-to-fill layout.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/daily-planner-generator" content={content}>
      <DailyPlannerGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DailyPlannerGenerator;
