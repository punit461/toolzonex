'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, MenuItem, Stack, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const now = new Date();

function buildCalendarGrid(year: number, month: number) {
  // month is 0-indexed
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // JS getDay(): 0=Sun..6=Sat. Convert to Monday-first index: 0=Mon..6=Sun.
  const jsDay = firstOfMonth.getDay();
  const leadingBlanks = (jsDay + 6) % 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const MonthlyPlannerGeneratorContent = () => {
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [notes, setNotes] = useState<Record<number, string>>({});

  const weeks = useMemo(() => buildCalendarGrid(year, month), [year, month]);

  const plainText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`${MONTH_NAMES[month].toUpperCase()} ${year}`);
    lines.push('');
    weeks.forEach((week) => {
      week.forEach((day) => {
        if (day === null) return;
        const note = notes[day];
        lines.push(`${day}: ${note || ''}`);
      });
    });
    return lines.join('\n');
  }, [year, month, weeks, notes]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      // ignore clipboard errors
    }
  };

  const yearOptions = useMemo(() => {
    const arr: number[] = [];
    for (let y = now.getFullYear() - 5; y <= now.getFullYear() + 5; y++) arr.push(y);
    return arr;
  }, []);

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3, maxWidth: 400 }}>
        <TextField
          select
          label="Month"
          value={month}
          onChange={(e) => { setMonth(Number(e.target.value)); setNotes({}); }}
          fullWidth
        >
          {MONTH_NAMES.map((m, i) => (
            <MenuItem key={m} value={i}>{m}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Year"
          value={year}
          onChange={(e) => { setYear(Number(e.target.value)); setNotes({}); }}
          fullWidth
        >
          {yearOptions.map((y) => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </TextField>
      </Stack>

      <Paper variant="outlined" sx={{ p: 1.5, mb: 3, overflowX: 'auto' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(90px, 1fr))', gap: 1, minWidth: 630 }}>
          {WEEKDAY_LABELS.map((wd) => (
            <Typography key={wd} variant="caption" fontWeight={700} textAlign="center" color="text.secondary">
              {wd}
            </Typography>
          ))}
          {weeks.flatMap((week, wi) =>
            week.map((day, di) => (
              <Box
                key={`${wi}-${di}`}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  minHeight: 70,
                  p: 0.5,
                  bgcolor: day === null ? 'action.hover' : 'transparent',
                }}
              >
                {day !== null && (
                  <>
                    <Typography variant="caption" fontWeight={700}>{day}</Typography>
                    <TextField
                      variant="standard"
                      placeholder="Note"
                      value={notes[day] || ''}
                      onChange={(e) => setNotes((prev) => ({ ...prev, [day]: e.target.value }))}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      sx={{ '& input': { fontSize: '0.75rem' } }}
                    />
                  </>
                )}
              </Box>
            ))
          )}
        </Box>
      </Paper>

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
  );
};

const MonthlyPlannerGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Monthly Planner Generator</Typography>
      <Typography variant="body1">
        Choose a month and year, and the tool builds a correct calendar grid for it using JavaScript&apos;s
        <code> Date</code> object — it works out exactly which day of the week the 1st falls on and how many
        days are in that month (correctly handling different month lengths and leap years), so the grid always
        lines up properly with Monday through Sunday columns. Click into any day&apos;s box to add a short
        note, and use the printable preview below to copy the whole month as plain text.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting February on a leap year correctly shows 29 days aligned to the right weekdays, while a
        non-leap year shows 28 — the grid is computed fresh every time rather than assuming a fixed layout.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing a monthly calendar page with a note slot for each day.</li>
          <li>Planning appointments, deadlines, or events across a full month at a glance.</li>
          <li>Building a simple monthly overview to complement a detailed daily or weekly planner.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does the calendar handle leap years correctly?</strong> Yes — the number of days in the month is calculated directly from JavaScript&apos;s <code>Date</code> object rather than a hardcoded table, so February automatically shows 29 days in leap years and 28 otherwise.</li>
          <li><strong>Is my monthly plan saved?</strong> No — notes are kept only in your browser&apos;s memory for the current visit, and switching the month or year, or reloading the page, clears them, so copy the text version if you need to keep it.</li>
          <li><strong>Why does the week start on Monday?</strong> This follows the ISO/international convention of a Monday-first week, which is common on printable planners; the weekday header row shows Mon through Sun to make the alignment clear.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/monthly-planner-generator" content={content}>
      <MonthlyPlannerGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MonthlyPlannerGenerator;
