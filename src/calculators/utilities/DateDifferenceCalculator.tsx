'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DateDifferenceCalculator = () => {
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-08-24');

  const { totalDays, years, months, days, weeks } = useMemo(() => {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return { totalDays: 0, years: 0, months: 0, days: 0, weeks: 0 };
    }

    const early = d1 < d2 ? d1 : d2;
    const late = d1 < d2 ? d2 : d1;

    const totalDays = Math.round((late.getTime() - early.getTime()) / (1000 * 60 * 60 * 24));

    let y = late.getFullYear() - early.getFullYear();
    let m = late.getMonth() - early.getMonth();
    let d = late.getDate() - early.getDate();

    if (d < 0) {
      m--;
      const prevMonth = new Date(late.getFullYear(), late.getMonth(), 0);
      d += prevMonth.getDate();
    }
    if (m < 0) {
      y--;
      m += 12;
    }

    return { totalDays, years: y, months: m, days: d, weeks: Math.floor(totalDays / 7) };
  }, [startDate, endDate]);

  const content = (
    <>
      <Typography variant="h2">How to Find the Difference Between Two Dates</Typography>
      <Typography variant="body1">
        Enter a start date and an end date to instantly see exactly how much time separates them — broken down
        into total days, weeks, and a years/months/days breakdown. The calculator works regardless of which date
        you enter first.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The difference between 1 January 2026 and 24 August 2026 is 235 days, or 33 weeks and 4 days, which
        breaks down to exactly 7 months and 23 days.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the exact number of days between an event and today.</li>
          <li>Working out how many weeks pregnant someone is, or how many days until a due date.</li>
          <li>Calculating a rental, subscription, or loan period between a start and end date.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the site&apos;s Date Calculator?</Typography>
      <Typography variant="body1">
        The Date Calculator also supports adding or subtracting years/months/days from a date to find a new
        date. This tool is a lighter, single-purpose version focused purely on finding the difference between
        two dates you already have.
      </Typography>
      <Typography variant="h3">Does the order I enter the dates matter?</Typography>
      <Typography variant="body1">
        No — the calculator automatically treats the earlier date as the start and the later date as the end, so
        entering them in either order gives the same result.
      </Typography>
      <Typography variant="h3">Does this account for leap years?</Typography>
      <Typography variant="body1">
        Yes, leap years and varying month lengths are handled automatically in both the total day count and the
        years/months/days breakdown.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/date-difference-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Start Date</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <Box>
            <Typography gutterBottom>End Date</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Total Difference</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
              {totalDays.toLocaleString()} Days
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ({weeks.toLocaleString()} weeks)
            </Typography>
            <Box sx={{ pt: 2, borderTop: '1px solid #E5E5E5', width: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {years}y {months}m {days}d
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DateDifferenceCalculator;
