'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const StudyTimeCalculatorContent = () => {
  const [pages, setPages] = useState('300');
  const [pace, setPace] = useState('15');
  const [days, setDays] = useState('10');

  const result = useMemo(() => {
    const p = parseFloat(pages) || 0;
    const pc = parseFloat(pace) || 0;
    const d = parseFloat(days) || 0;

    const totalHours = pc > 0 ? p / pc : 0;
    const hoursPerDay = d > 0 ? totalHours / d : 0;

    return { totalHours, hoursPerDay };
  }, [pages, pace, days]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Total Pages to Study"
          type="number"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">pages</InputAdornment> } }}
        />
        <TextField
          label="Reading Pace"
          type="number"
          value={pace}
          onChange={(e) => setPace(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">pages/hr</InputAdornment> } }}
        />
        <TextField
          label="Days Until Exam"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Recommended Study Time</Typography>
          <Typography variant="h3" fontWeight="bold">{result.hoursPerDay.toFixed(1)} hrs/day</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Hours Needed</Typography>
          <Typography fontWeight={600}>{result.totalHours.toFixed(1)} hrs</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const StudyTimeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Study Time Calculator Works</Typography>
      <Typography variant="body1">
        Enter the total number of pages you need to study, your typical reading pace in pages per hour, and
        the number of days remaining until your exam or deadline. The calculator divides total pages by pace to
        find total study hours needed, then spreads that evenly across your remaining days to recommend how
        many hours to study per day.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Hours Per Day = (Total Pages ÷ Reading Pace) ÷ Days Remaining
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 300 pages to study at a pace of 15 pages per hour and 10 days until the exam, total study time
        needed is 300 ÷ 15 = 20 hours, spread across 10 days is 20 ÷ 10 = 2 hours of studying per day.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a daily study schedule ahead of an exam or certification test.</li>
          <li>Checking whether your remaining time is realistic for the material left to cover.</li>
          <li>Comparing how a slower or faster reading pace changes daily study needs.</li>
          <li>Planning study sessions around a syllabus with a known page or chapter count.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if the recommended daily hours feels unrealistic?</Typography>
      <Typography variant="body1">
        If the calculator suggests more hours per day than you can realistically manage, consider starting
        earlier if possible, cutting the material down to the most essential topics, or accepting a lighter
        pass over lower-priority sections rather than trying to cram everything in equally.
      </Typography>
      <Typography variant="h3">How do I find my own reading pace?</Typography>
      <Typography variant="body1">
        Time yourself reading a sample chapter or a set number of pages at a normal, focused pace (not
        skimming), then divide the pages read by the time taken in hours. Technical or dense material is
        usually read more slowly than light material, so measure your pace on material similar to what you&apos;ll
        actually be studying.
      </Typography>
      <Typography variant="h3">Should I study every day until the exam?</Typography>
      <Typography variant="body1">
        This calculator assumes an even daily pace, but many students prefer front-loading harder material
        earlier and leaving lighter review or practice tests for the final days. Use the total hours figure as
        your overall budget and distribute it across days however fits your study style best.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/study-time-calculator" content={content}>
      <StudyTimeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StudyTimeCalculator;
