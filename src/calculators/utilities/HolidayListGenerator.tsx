'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** month is 1-12. weekday: 0=Sunday..6=Saturday. n: 1st, 2nd, 3rd, 4th occurrence. */
function nthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): Date {
  const first = new Date(year, month - 1, 1);
  const firstWeekday = first.getDay();
  let dayOfMonth = 1 + ((weekday - firstWeekday + 7) % 7) + (n - 1) * 7;
  return new Date(year, month - 1, dayOfMonth);
}

/** Last occurrence of a given weekday in a month. */
function lastWeekdayOfMonth(year: number, month: number, weekday: number): Date {
  const lastDay = new Date(year, month, 0); // day 0 of next month = last day of this month
  const lastDow = lastDay.getDay();
  const diff = (lastDow - weekday + 7) % 7;
  return new Date(year, month - 1, lastDay.getDate() - diff);
}

function formatDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

interface Holiday {
  name: string;
  date: Date;
}

function computeHolidays(year: number): Holiday[] {
  const holidays: Holiday[] = [
    { name: "New Year's Day", date: new Date(year, 0, 1) },
    { name: 'Martin Luther King Jr. Day', date: nthWeekdayOfMonth(year, 1, 1, 3) },
    { name: "Presidents' Day (Washington's Birthday)", date: nthWeekdayOfMonth(year, 2, 1, 3) },
    { name: 'Memorial Day', date: lastWeekdayOfMonth(year, 5, 1) },
    { name: 'Juneteenth', date: new Date(year, 5, 19) },
    { name: 'Independence Day', date: new Date(year, 6, 4) },
    { name: 'Labor Day', date: nthWeekdayOfMonth(year, 9, 1, 1) },
    { name: 'Columbus Day', date: nthWeekdayOfMonth(year, 10, 1, 2) },
    { name: 'Veterans Day', date: new Date(year, 10, 11) },
    { name: 'Thanksgiving Day', date: nthWeekdayOfMonth(year, 11, 4, 4) },
    { name: 'Christmas Day', date: new Date(year, 11, 25) },
  ];
  return holidays.sort((a, b) => a.date.getTime() - b.date.getTime());
}

const HolidayListGeneratorContent = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const yearNum = parseInt(year, 10);
  const valid = !isNaN(yearNum) && yearNum >= 1900 && yearNum <= 2200;

  const holidays = useMemo(() => (valid ? computeHolidays(yearNum) : []), [valid, yearNum]);

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <TextField
        label="Year"
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {valid ? (
        <Stack spacing={1.5}>
          {holidays.map((h) => (
            <Paper key={h.name} variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="body1" fontWeight={600}>{h.name}</Typography>
              <Typography variant="body2" color="text.secondary">{formatDate(h.date)}</Typography>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Typography color="error">Enter a valid year between 1900 and 2200.</Typography>
      )}
    </Box>
  );
};

const HolidayListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Holiday List Generator</Typography>
      <Typography variant="body1">
        Enter any year and the tool computes the dates of the major US federal holidays for that year.
        Fixed-date holidays (like New Year&apos;s Day or Christmas) simply use the same month and day every
        year. &quot;Nth weekday&quot; holidays — like Memorial Day (the last Monday of May) or Thanksgiving
        (the 4th Thursday of November) — are calculated properly for each rule, so the dates shift correctly
        from year to year instead of being hardcoded.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 2026, Labor Day (the 1st Monday of September) falls on September 7, and Thanksgiving (the 4th
        Thursday of November) falls on November 26 — both calculated directly from the rule rather than
        looked up from a fixed table.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a work calendar or PTO schedule around upcoming federal holidays.</li>
          <li>Checking which date a &quot;floating&quot; holiday like Presidents&apos; Day falls on in a future year.</li>
          <li>Building a calendar, app, or spreadsheet that needs accurate US holiday dates for any year.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Why do some holidays fall on a different date every year?</strong> Holidays defined as
            &quot;the Nth weekday of a month&quot; (like the 3rd Monday of January for MLK Day) depend on
            which day of the week the month starts on, so the specific date shifts from year to year even
            though the underlying rule stays the same.
          </li>
          <li>
            <strong>Does this include state or religious holidays?</strong> No — this tool covers only the
            major US federal holidays. State-specific observances and religious or cultural holidays aren&apos;t
            included.
          </li>
          <li>
            <strong>What happens if a fixed-date holiday falls on a weekend?</strong> This tool always shows
            the holiday&apos;s actual calendar date. Many employers observe a substitute day off (the nearest
            Friday or Monday) when a fixed holiday lands on a weekend, but that observed date is a separate
            employer policy, not shown here.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/holiday-list-generator" content={content}>
      <HolidayListGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default HolidayListGenerator;
