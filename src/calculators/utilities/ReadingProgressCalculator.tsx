'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ReadingProgressCalculator = () => {
  const [totalPages, setTotalPages] = useState('350');
  const [currentPage, setCurrentPage] = useState('120');
  const [pace, setPace] = useState('25');

  const result = useMemo(() => {
    const total = parseFloat(totalPages) || 0;
    const current = parseFloat(currentPage) || 0;
    const p = parseFloat(pace) || 0;

    const remaining = Math.max(total - current, 0);
    const daysToFinish = p > 0 ? Math.ceil(remaining / p) : 0;
    const percentComplete = total > 0 ? (current / total) * 100 : 0;

    const finishDate = new Date();
    finishDate.setDate(finishDate.getDate() + daysToFinish);

    return { remaining, daysToFinish, percentComplete, finishDate };
  }, [totalPages, currentPage, pace]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Reading Progress Calculator</Typography>
      <Typography variant="body1">
        Enter the total number of pages in your book, the page you&apos;re currently on, and your average
        pages-read-per-day pace. The calculator finds how many pages remain, divides that by your pace to
        estimate the days left, and projects a finish date starting from today.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Pages Remaining = Total Pages − Current Page
        <br />
        Days to Finish = Pages Remaining / Pages Per Day
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 350-page book with you currently on page 120, reading at 25 pages per day, leaves 230 pages
        remaining. At that pace it will take 230 / 25 ≈ 10 more days to finish — roughly a day and a half more
        than a week from today.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking how close you are to finishing a book you&apos;re currently reading.</li>
          <li>Estimating a realistic finish date to share with a book club or reading challenge.</li>
          <li>Checking whether your current reading pace needs to pick up to finish before a trip or event.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Pages Per Day Calculator?</strong> This tool tracks your current progress and projects a finish date forward from your existing reading pace. The Pages Per Day Calculator works the opposite way — it starts from a deadline and works backward to tell you what pace you need to hit it.</li>
          <li><strong>How do I know my average pages-per-day pace?</strong> Divide the pages you&apos;ve read so far by the number of days you&apos;ve been reading the book, or just estimate based on a recent typical reading session.</li>
          <li><strong>Does the finish date account for days I might not read?</strong> No — it assumes you keep reading at your stated pace every day. If you expect to skip some days, either lower your average pace input or add a buffer of a few extra days to the projected finish date.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/reading-progress-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Pages in Book" type="number" value={totalPages}
            onChange={(e) => setTotalPages(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
          />
          <TextField
            label="Current Page" type="number" value={currentPage}
            onChange={(e) => setCurrentPage(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
          />
          <TextField
            label="Average Pages Per Day" type="number" value={pace}
            onChange={(e) => setPace(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">pages/day</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Finish Date</Typography>
            <Typography variant="h4" fontWeight="bold">
              {result.finishDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Pages Remaining</Typography>
            <Typography fontWeight={600}>{result.remaining}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Days to Finish</Typography>
            <Typography fontWeight={600}>{result.daysToFinish}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Percent Complete</Typography>
            <Typography fontWeight={600}>{result.percentComplete.toFixed(1)}%</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReadingProgressCalculator;
