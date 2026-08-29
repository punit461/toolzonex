'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const LeapYearCheckerContent = () => {
  const [input, setInput] = useState('2024');

  const year = Number(input);
  const valid = input.trim() !== '' && Number.isInteger(year);

  const result = useMemo(() => (valid ? isLeapYear(year) : null), [valid, year]);

  const upcoming = useMemo(() => {
    if (!valid) return [];
    const list: number[] = [];
    let y = year;
    while (list.length < 5) {
      if (isLeapYear(y)) list.push(y);
      y++;
    }
    return list;
  }, [valid, year]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Year"
        value={input}
        onChange={(e) => setInput(e.target.value.replace(/[^\d-]/g, ''))}
        fullWidth
        type="text"
      />

      {!valid && input.trim() !== '' && <Alert severity="error">Enter a whole number year.</Alert>}

      {valid && (
        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: result ? 'success.main' : 'text.primary' }}>
            {year} is {result ? '' : 'not '}a leap year
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {result ? `${year} has 366 days, with an extra day in February (29 days).` : `${year} has 365 days, with 28 days in February.`}
          </Typography>
        </Paper>
      )}

      {upcoming.length > 0 && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>Next 5 leap years from {year}:</Typography>
          <Typography variant="body1" fontFamily="monospace">{upcoming.join(', ')}</Typography>
        </Box>
      )}
    </Box>
  );
};

const LeapYearChecker = () => {
  const content = (
    <>
      <Typography variant="h2">Free Leap Year Checker</Typography>
      <Typography variant="body1">
        Enter any year to instantly find out whether it's a leap year, plus a list of the next 5 leap years
        that follow it.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type a year into the input box — the result updates instantly, along with a short list of upcoming
        leap years.
      </Typography>

      <Typography variant="h2">The Leap Year Rule</Typography>
      <Typography variant="body1">
        A year is a leap year if it's divisible by 4, except century years (divisible by 100), which are only
        leap years if they're also divisible by 400. This is why 2000 was a leap year, but 1900 and 2100 are
        not.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        2024 is a leap year (divisible by 4, not a century year). 1900 is not a leap year (divisible by 100 but
        not by 400). 2000 is a leap year (divisible by 400).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether February has 28 or 29 days in a given year.</li>
          <li>Verifying date-calculation logic while writing or testing code.</li>
          <li>Planning events or birthdays that fall on February 29.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why are century years treated differently?</Typography>
      <Typography variant="body1">
        The extra "divisible by 100, except by 400" rule corrects a small drift in the basic every-4-years rule
        so the calendar stays aligned with Earth's actual orbit over long periods — this is the Gregorian
        calendar's leap year rule.
      </Typography>
      <Typography variant="h3">Does this work for years before 1582?</Typography>
      <Typography variant="body1">
        The calculation applies the modern Gregorian rule to any year you enter, including negative or ancient
        years, though the Gregorian calendar wasn't actually in use before 1582.
      </Typography>
      <Typography variant="h3">What years are the next few leap years after 2024?</Typography>
      <Typography variant="body1">
        2028, 2032, 2036, 2040, and 2044 are all leap years — enter any starting year above to see its own next
        five.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/leap-year-checker" content={content}>
      <LeapYearCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LeapYearChecker;
