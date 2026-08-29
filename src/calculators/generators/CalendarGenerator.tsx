'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, MenuItem, Paper } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildCalendarGrid(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

const CalendarGeneratorContent = () => {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  const weeks = useMemo(() => buildCalendarGrid(year, month), [year, month]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField select label="Month" size="small" value={month} onChange={(e) => setMonth(Number(e.target.value))} sx={{ width: 160 }}>
          {MONTH_NAMES.map((name, i) => <MenuItem key={name} value={i}>{name}</MenuItem>)}
        </TextField>
        <TextField
          label="Year"
          type="number"
          size="small"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          sx={{ width: 120 }}
        />
        <Button variant="outlined" startIcon={<PrintIcon />} onClick={() => window.print()}>
          Print
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          {MONTH_NAMES[month]} {year}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 0.5 }}>
          {WEEKDAYS.map((day) => (
            <Box key={day} sx={{ textAlign: 'center', py: 0.5, fontWeight: 700, color: 'text.secondary', fontSize: '0.85rem' }}>
              {day}
            </Box>
          ))}
        </Box>
        {weeks.map((week, wi) => (
          <Box key={wi} sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 0.5 }}>
            {week.map((day, di) => (
              <Box
                key={di}
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: day ? '1px solid' : 'none',
                  borderColor: 'divider',
                  borderRadius: 1,
                  fontSize: '0.95rem',
                }}
              >
                {day ?? ''}
              </Box>
            ))}
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

const CalendarGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Calendar Generator Works</Typography>
      <Typography variant="body1">
        Choose any month and year, and this tool instantly builds a clean, standard 7-column calendar grid for
        that month, laid out Sunday through Saturday. Use the Print button for a simple, printer-friendly
        version.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Select the month and year you want.</li>
          <li>The calendar grid updates instantly to show that month&apos;s layout.</li>
          <li>Click &quot;Print&quot; to print or save the calendar as a PDF using your browser&apos;s print dialog.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting March 2027 displays a full grid for that month, with March 1st placed under its correct
        weekday and every following date filled in through the end of the month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing a blank monthly calendar for planning, journaling, or wall display.</li>
          <li>Quickly checking what day of the week a specific date falls on.</li>
          <li>Creating a simple calendar layout for a classroom, office, or event planning handout.</li>
          <li>Viewing any past or future month without needing a full calendar app.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I generate a calendar for any year?</Typography>
      <Typography variant="body1">
        Yes — enter any year, past or future, and the calendar grid recalculates automatically, including
        correctly accounting for leap years in February.
      </Typography>
      <Typography variant="h3">Does this tool support adding events or reminders?</Typography>
      <Typography variant="body1">
        No — this tool focuses purely on displaying a clean, standard calendar grid for a chosen month. For
        event tracking, a dedicated calendar or planning app would be a better fit.
      </Typography>
      <Typography variant="h3">Can I print the calendar?</Typography>
      <Typography variant="body1">
        Yes — click &quot;Print&quot; to open your browser&apos;s print dialog, from which you can print
        directly or save the calendar as a PDF.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/calendar-generator" content={content}>
      <CalendarGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CalendarGenerator;
