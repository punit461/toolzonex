'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type HolidayKey = 'christmas' | 'newYear' | 'valentines' | 'halloween' | 'thanksgiving' | 'diwali';

const HOLIDAY_LABELS: Record<HolidayKey, string> = {
  christmas: 'Christmas (Dec 25)',
  newYear: "New Year's Day (Jan 1)",
  valentines: "Valentine's Day (Feb 14)",
  halloween: 'Halloween (Oct 31)',
  thanksgiving: 'Thanksgiving (US, 4th Thursday of November)',
  diwali: 'Diwali',
};

// Diwali's Gregorian date shifts yearly since it follows the Hindu lunisolar
// calendar -- there's no fixed month/day formula, so known dates are looked
// up directly. Sourced from timeanddate.com / drikpanchang.com.
const DIWALI_DATES: Record<number, [number, number]> = {
  2026: [11, 8],
  2027: [10, 29],
  2028: [10, 17],
  2029: [11, 5],
  2030: [10, 26],
};

function nextFixedDate(month: number, day: number, from: Date): Date {
  const year = from.getFullYear();
  let next = new Date(year, month - 1, day);
  if (next < from) next = new Date(year + 1, month - 1, day);
  return next;
}

function nextThanksgiving(from: Date): Date {
  const findFourthThursday = (year: number) => {
    const date = new Date(year, 10, 1);
    const dayOfWeek = date.getDay();
    const firstThursday = 1 + ((11 - dayOfWeek) % 7);
    return new Date(year, 10, firstThursday + 21);
  };
  let next = findFourthThursday(from.getFullYear());
  if (next < from) next = findFourthThursday(from.getFullYear() + 1);
  return next;
}

function nextDiwali(from: Date): Date {
  const years = Object.keys(DIWALI_DATES).map(Number).sort((a, b) => a - b);
  for (const year of years) {
    const [month, day] = DIWALI_DATES[year];
    const date = new Date(year, month - 1, day);
    if (date >= from) return date;
  }
  const lastYear = years[years.length - 1];
  const [month, day] = DIWALI_DATES[lastYear];
  return new Date(lastYear, month - 1, day);
}

function getNextOccurrence(holiday: HolidayKey, from: Date): Date {
  switch (holiday) {
    case 'christmas': return nextFixedDate(12, 25, from);
    case 'newYear': return nextFixedDate(1, 1, from);
    case 'valentines': return nextFixedDate(2, 14, from);
    case 'halloween': return nextFixedDate(10, 31, from);
    case 'thanksgiving': return nextThanksgiving(from);
    case 'diwali': return nextDiwali(from);
  }
}

const HolidayCountdownContent = () => {
  const [holiday, setHoliday] = useState<HolidayKey>('christmas');
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    setReady(true);
  }, []);

  const tick = useCallback(() => setNow(new Date()), []);

  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [ready, tick]);

  const handleChange = (e: SelectChangeEvent) => setHoliday(e.target.value as HolidayKey);

  if (!ready || !now) {
    return <Typography color="text.secondary">Loading countdown...</Typography>;
  }

  const target = getNextOccurrence(holiday, now);
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600, mx: 'auto' }}>
      <FormControl fullWidth>
        <InputLabel id="holiday-select">Holiday</InputLabel>
        <Select labelId="holiday-select" label="Holiday" value={holiday} onChange={handleChange}>
          {(Object.keys(HOLIDAY_LABELS) as HolidayKey[]).map((key) => (
            <MenuItem key={key} value={key}>{HOLIDAY_LABELS[key]}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Next occurs on
        </Typography>
        <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
          {target.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, my: 4 }}>
          {[
            { value: days, label: 'Days' },
            { value: hours, label: 'Hours' },
            { value: minutes, label: 'Minutes' },
            { value: seconds, label: 'Seconds' },
          ].map((item) => (
            <Paper key={item.label} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h4" fontWeight={700} color="primary">{item.value}</Typography>
              <Typography variant="body2" color="text.secondary">{item.label}</Typography>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

const HolidayCountdown = () => {
  const content = (
    <>
      <Typography variant="h2">How the Holiday Countdown Works</Typography>
      <Typography variant="body1">
        Choose a holiday from the dropdown and this tool counts down live to its next occurrence, updating
        every second. Fixed-date holidays like Christmas and Halloween use the same month and day every year.
        Thanksgiving is calculated as the fourth Thursday of November. Diwali&apos;s date shifts each year
        since it follows the Hindu lunisolar calendar, so its dates are looked up from a reference table rather
        than computed from a fixed formula.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;Diwali&quot; shows a live countdown to its next Gregorian-calendar date (for example,
        November 8, 2026), while selecting &quot;Christmas&quot; always counts down to the next December 25.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building excitement for an upcoming holiday with a live, shareable countdown.</li>
          <li>Planning shopping, travel, or event prep around a specific holiday date.</li>
          <li>Quickly checking how many days remain until a holiday without checking a calendar.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Anniversary Countdown?</Typography>
      <Typography variant="body1">
        The Anniversary Countdown is for a personal recurring date you enter yourself, like a wedding
        anniversary. This tool instead offers a dropdown of common major holidays with their dates already
        built in, so there&apos;s nothing to enter beyond picking one from the list.
      </Typography>
      <Typography variant="h3">Why does Diwali&apos;s date change every year?</Typography>
      <Typography variant="body1">
        Diwali is set by the Hindu lunisolar calendar, tied to the new moon of the month of Kartik, which
        doesn&apos;t align to a fixed Gregorian-calendar date the way solar-calendar holidays like Christmas
        do. That&apos;s why this tool looks up known upcoming Diwali dates rather than calculating from a
        month/day formula.
      </Typography>
      <Typography variant="h3">Does the countdown update automatically?</Typography>
      <Typography variant="body1">
        Yes — it updates every second in real time without needing to click any button or refresh the page.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/holiday-countdown" content={content}>
      <HolidayCountdownContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HolidayCountdown;
