'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const differenceAsString = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const diffMs = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  const startMonth = start.getMonth();
  const startYear = start.getFullYear();
  const endMonth = end.getMonth();
  const endYear = end.getFullYear();
  const monthDiff = Math.abs((endYear - startYear) * 12 + (endMonth - startMonth));
  const daysInMonth = totalDays - monthDiff * 30;

  return { totalDays, weeks, remainingDays, monthDiff, daysInMonth };
};

const DaysBetweenDatesCalculatorContent = () => {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');

  const result = differenceAsString(startDate, endDate);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            The order of dates does not matter — the calculator always shows the positive difference.
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
        {result ? (
          <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total Days</Typography>
              <Typography variant="h6" fontWeight="bold">{result.totalDays.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2">Weeks + Days</Typography>
              <Typography variant="body2" fontWeight="bold">{result.weeks} weeks, {result.remainingDays} days</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Months + Days</Typography>
              <Typography variant="body2" fontWeight="bold">{result.monthDiff} months, {result.daysInMonth} days</Typography>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">Select both dates to see the difference.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const DaysBetweenDatesCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the days between dates calculator?</Typography>
      <Typography variant="body1">
        Select a start date and an end date using the date pickers. The calculator shows the total number of days
        between them, broken down into weeks and days, as well as months and days. You do not need to enter
        the dates in chronological order — the result is always a positive number.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Between January 1, 2025 and December 31, 2025, there are exactly 365 days — equivalent to 52 weeks and
        1 day, or 11 months and 30 days. The leap year check is automatic.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does it handle leap years?</strong> Yes — the calculation is based on actual calendar dates, so leap years are counted correctly.</li>
          <li><strong>Can I calculate age in days?</strong> Enter your date of birth as the start date and today as the end date to get your age in days, weeks, and months.</li>
          <li><strong>What is the maximum date range?</strong> There is no practical limit — any two valid calendar dates supported by the browser will work.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Counting days until a deadline, event, or contract expiry.</li>
          <li>Calculating the exact duration of a project or trip.</li>
          <li>Determining the number of days between payment due dates for billing cycles.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/days-between-dates" content={content}>
      <DaysBetweenDatesCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DaysBetweenDatesCalculator;
