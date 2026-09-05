'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PagesPerDayCalculator = () => {
  const [pagesRemaining, setPagesRemaining] = useState('300');
  const [daysRemaining, setDaysRemaining] = useState('10');

  const result = useMemo(() => {
    const pages = parseFloat(pagesRemaining) || 0;
    const days = parseFloat(daysRemaining) || 0;

    const pagesPerDay = days > 0 ? pages / days : 0;

    return { pagesPerDay };
  }, [pagesRemaining, daysRemaining]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Pages Per Day Calculator</Typography>
      <Typography variant="body1">
        Enter how many pages you have left to read and how many days remain until your target finish date (a
        deadline, book club meeting, or reading challenge date). The calculator divides pages remaining by days
        remaining to tell you the exact daily pace you need to hit that deadline.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Pages Per Day Needed = Pages Remaining / Days Remaining
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You have 300 pages left to read and 10 days until your book club meets. You need to read 300 / 10 = 30
        pages per day to finish exactly on time.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out the daily reading pace needed to finish before a book club or deadline.</li>
          <li>Planning how to catch up on a reading challenge with a fixed number of days left.</li>
          <li>Checking whether a book is realistically finishable before a trip or event.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Reading Progress Calculator?</strong> The Reading Progress Calculator projects a finish date forward from your current, already-established reading pace. This tool works the opposite direction — it starts from a deadline and works backward to tell you the pace you need to hit it.</li>
          <li><strong>What if the required pace seems unrealistic?</strong> If the pages-per-day figure is much higher than you can comfortably manage, consider whether the deadline is flexible, or plan to read in longer sessions on days when you have more free time to average out to the required pace.</li>
          <li><strong>Should I count the last day as a full reading day?</strong> That&apos;s up to you — if your deadline is the morning of a certain date, you may want to subtract a day from your remaining days to be safe, rather than assuming you get a full extra day right up to the deadline.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pages-per-day-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Pages Remaining" type="number" value={pagesRemaining}
            onChange={(e) => setPagesRemaining(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
          />
          <TextField
            label="Days Remaining Until Deadline" type="number" value={daysRemaining}
            onChange={(e) => setDaysRemaining(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Pages Per Day Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.pagesPerDay.toFixed(1)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PagesPerDayCalculator;
