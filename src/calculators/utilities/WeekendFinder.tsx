'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDaysIso(y: number, m: number, d: number) {
  return `${y}-${(m + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
}

function parseIso(iso: string): Date | null {
  const parts = iso.split('-').map(Number);
  if (parts.length !== 3 || parts.some((p) => isNaN(p))) return null;
  const [y, m, d] = parts;
  const parsed = new Date(y, m - 1, d);
  if (isNaN(parsed.getTime())) return null;
  return parsed;
}

const MAX_DAYS = 3660; // ~10 years, to keep the list reasonable

const WeekendFinderContent = () => {
  const [start, setStart] = useState(todayIso());
  const [end, setEnd] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  });

  const result = useMemo(() => {
    const startDate = parseIso(start);
    const endDate = parseIso(end);
    if (!startDate || !endDate) return { error: 'Enter valid start and end dates.' as string, weekends: [] as { date: string; day: string }[] };
    if (endDate < startDate) return { error: 'End date must be on or after the start date.', weekends: [] };

    const dayCount = Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
    if (dayCount > MAX_DAYS) {
      return { error: `Range is too large (max ~${MAX_DAYS.toLocaleString()} days) — please narrow it.`, weekends: [] };
    }

    const weekends: { date: string; day: string }[] = [];
    const cursor = new Date(startDate);
    for (let i = 0; i < dayCount; i++) {
      const dow = cursor.getDay();
      if (dow === 0 || dow === 6) {
        weekends.push({
          date: addDaysIso(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()),
          day: DAY_NAMES[dow],
        });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    return { error: null, weekends };
  }, [start, end]);

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Start Date"
          type="date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="End Date"
          type="date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Stack>

      {result.error ? (
        <Typography color="error">{result.error}</Typography>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Found {result.weekends.length} weekend day{result.weekends.length === 1 ? '' : 's'}
          </Typography>
          <Stack spacing={1}>
            {result.weekends.map((w) => (
              <Paper key={w.date} variant="outlined" sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1">{w.date}</Typography>
                <Chip label={w.day} size="small" color={w.day === 'Saturday' ? 'primary' : 'secondary'} />
              </Paper>
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

const WeekendFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Weekend Finder</Typography>
      <Typography variant="body1">
        Enter a start date and an end date, and the tool lists every Saturday and Sunday that falls within
        that range, along with which day of the week each one is. It works using JavaScript&apos;s native
        date calculation, so it correctly handles leap years and month-length differences automatically.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering a range from September 1, 2026 to September 14, 2026 lists four weekend dates: September
        5 (Saturday), September 6 (Sunday), September 12 (Saturday), and September 13 (Sunday).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning which weekends fall within a vacation, project timeline, or school term.</li>
          <li>Counting available weekend days for scheduling events or bookings.</li>
          <li>Checking how many weekends remain before a deadline or trip.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>How is this different from the Day Name Finder?</strong> The Day Name Finder tells you
            the day of the week for one specific date you enter. This Weekend Finder instead works over an
            entire date range and lists every Saturday and Sunday within it — a different question with a
            different kind of answer.
          </li>
          <li>
            <strong>Is there a limit to how large a range I can search?</strong> Yes — the range is capped
            at roughly 10 years to keep the results list manageable and the calculation fast.
          </li>
          <li>
            <strong>Does this account for public holidays?</strong> No — this tool only identifies calendar
            weekends (Saturdays and Sundays). It doesn&apos;t know about holidays, which vary by country and
            region.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/weekend-finder" content={content}>
      <WeekendFinderContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default WeekendFinder;
