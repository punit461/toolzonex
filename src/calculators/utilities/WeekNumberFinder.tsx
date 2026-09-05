'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function isoWeekInfo(dateStr: string): { week: number; year: number } | null {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some((p) => isNaN(p))) return null;
  const [y, m, d] = parts;

  // Work in UTC to avoid timezone/DST edge cases shifting the date.
  const date = new Date(Date.UTC(y, m - 1, d));
  if (isNaN(date.getTime())) return null;

  // ISO: Monday = 1 .. Sunday = 7
  const dayNum = date.getUTCDay() || 7;
  // Shift to the Thursday of this date's week -- the ISO week's number is
  // defined by which year that Thursday falls in.
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);

  const isoYear = date.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const weekNumber = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return { week: weekNumber, year: isoYear };
}

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const WeekNumberFinderContent = () => {
  const [date, setDate] = useState(todayIso());

  const result = useMemo(() => isoWeekInfo(date), [date]);

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

      {result ? (
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>ISO Week Number</Typography>
            <Typography variant="h3" fontWeight={700}>Week {result.week}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>of ISO year {result.year}</Typography>
          </Stack>
        </Paper>
      ) : (
        <Typography color="text.secondary">Enter a valid date to see its ISO week number.</Typography>
      )}
    </Box>
  );
};

const WeekNumberFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Week Number Finder Works</Typography>
      <Typography variant="body1">
        Pick any date and the tool calculates its ISO 8601 week number, following the official standard: weeks
        run Monday through Sunday, and week 1 of a year is defined as the week that contains that
        year&apos;s first Thursday. This rule means the very last days of December can actually fall into
        week 1 of the following year, and the first few days of January can fall into the last week of the
        previous year — the calculation here follows that rule exactly, rather than a simplified approximation.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        January 1, 2023 was a Sunday, so under the ISO rule it belongs to Week 52 of 2022, not Week 1 of 2023 —
        the Monday right after it, January 2, 2023, is the true start of ISO Week 1 of 2023. Entering either
        date shows this correctly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the correct ISO week number for timesheets, invoices, or project planning that reference week numbers.</li>
          <li>Checking whether a late-December or early-January date belongs to the previous or next ISO year&apos;s week numbering.</li>
          <li>Cross-referencing dates against systems (like European business software) that use ISO week numbers by default.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why can a date in December show a week number from "next year"?</strong> Because ISO week 1 is defined as the week containing the year&apos;s first Thursday, a Monday, Tuesday, or Wednesday in very late December can belong to the week that contains the following year&apos;s first Thursday — making it "week 1" of that next ISO year rather than a week of the current one.</li>
          <li><strong>Why do weeks start on Monday instead of Sunday?</strong> ISO 8601 specifically defines Monday as the first day of the week, unlike the Sunday-first convention used in some calendars and countries — this tool follows the ISO standard exactly.</li>
          <li><strong>Can a year have 53 weeks?</strong> Yes — most years have 52 ISO weeks, but years where the extra day(s) push the first Thursday's week to align differently (and leap years in particular) can have 53 ISO weeks instead.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/week-number-finder" content={content}>
      <WeekNumberFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WeekNumberFinder;
