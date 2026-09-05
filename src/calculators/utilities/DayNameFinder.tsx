'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
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

const DayNameFinderContent = () => {
  const [date, setDate] = useState(todayIso());

  const dayName = useMemo(() => {
    if (!date) return null;
    const parts = date.split('-').map(Number);
    if (parts.length !== 3 || parts.some((p) => isNaN(p))) return null;
    const [y, m, d] = parts;
    const parsed = new Date(y, m - 1, d);
    if (isNaN(parsed.getTime())) return null;
    return DAY_NAMES[parsed.getDay()];
  }, [date]);

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 3 }}
      />

      {dayName ? (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>Day of the Week</Typography>
            <Typography variant="h3" fontWeight={700}>{dayName}</Typography>
          </Stack>
        </Paper>
      ) : (
        <Typography color="text.secondary">Enter a valid date to see its day of the week.</Typography>
      )}
    </Box>
  );
};

const DayNameFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Day Name Finder Works</Typography>
      <Typography variant="body1">
        Pick any date — past, present, or years into the future — and the tool tells you what day of the
        week it falls on. It uses JavaScript&apos;s native <code>Date</code> object to do the calculation, so
        it correctly accounts for leap years and every calendar quirk automatically, without any manual
        lookup tables.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering July 4, 1776 shows &quot;Thursday&quot;. Entering January 1, 2100 (a date over 70 years in
        the future) still resolves instantly and correctly, since the calculation works from the date&apos;s
        underlying day count rather than a fixed table of known dates.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking what day of the week a historical event or birthday fell on.</li>
          <li>Confirming what day of the week a future deadline or event date will land on.</li>
          <li>Quickly verifying a date before scheduling something around a specific weekday.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How far back or forward can I check?</strong> Any date supported by JavaScript's <code>Date</code> object works, which covers a range of roughly ±270,000 years from today — far beyond any practical need.</li>
          <li><strong>Does this account for the switch from the Julian to Gregorian calendar?</strong> No — this tool calculates purely using the modern Gregorian calendar system for every date, so very old historical dates (particularly before the Gregorian calendar's adoption in a given region) may not match the day of the week recorded in historical sources using the older Julian calendar.</li>
          <li><strong>Does the result depend on my time zone?</strong> No — the date you pick is treated as a calendar date rather than a specific moment in time, so the day-of-week result is the same regardless of which time zone you're in.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/day-name-finder" content={content}>
      <DayNameFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DayNameFinder;
