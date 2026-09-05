'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const StudyHoursPlannerCalculator = () => {
  const [subjects, setSubjects] = useState('4');
  const [daysRemaining, setDaysRemaining] = useState('14');
  const [hoursPerDay, setHoursPerDay] = useState('3');

  const result = useMemo(() => {
    const s = parseFloat(subjects) || 0;
    const d = parseFloat(daysRemaining) || 0;
    const h = parseFloat(hoursPerDay) || 0;

    const totalHours = d * h;
    const hoursPerSubject = s > 0 ? totalHours / s : 0;

    return { totalHours, hoursPerSubject };
  }, [subjects, daysRemaining, hoursPerDay]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Study Hours Planner Calculator</Typography>
      <Typography variant="body1">
        Enter how many subjects or courses you need to study for, how many days remain until your exam or
        deadline, and how many hours per day you can realistically dedicate to studying. The calculator
        multiplies days by hours per day to find your total available study time, then splits that evenly
        across your subjects as a starting-point study plan.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Available Hours = Days Remaining × Hours Per Day
        <br />
        Hours Per Subject = Total Available Hours / Number of Subjects
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 14 days remaining and 3 hours available per day, total study time is 14 × 3 = 42 hours. Split
        evenly across 4 subjects, that&apos;s 42 / 4 = 10.5 hours per subject to allocate over the two weeks.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a balanced study schedule ahead of final exams with multiple subjects.</li>
          <li>Checking whether your available time realistically covers everything you need to study.</li>
          <li>Deciding how to reallocate hours toward weaker subjects that need more attention.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Should I really split time evenly across all subjects?</strong> An even split is a reasonable starting point, but it&apos;s worth adjusting based on which subjects are harder for you, carry more weight in your final grade, or need more practice — treat the even split as a baseline plan to fine-tune, not a strict rule.</li>
          <li><strong>What if I don't know exactly how many days remain?</strong> Just count the days between today and your exam or deadline, excluding or including the exam day itself as you prefer, then enter that as your days remaining.</li>
          <li><strong>How many study hours per day is realistic?</strong> This varies a lot by person, but sustained focused studying for more than 4-6 hours a day becomes hard for most people without diminishing returns. Build in breaks, and be honest about how much focused time you can actually manage.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/study-hours-planner-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Number of Subjects" type="number" value={subjects}
            onChange={(e) => setSubjects(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
          />
          <TextField
            label="Days Remaining Until Exam" type="number" value={daysRemaining}
            onChange={(e) => setDaysRemaining(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
          />
          <TextField
            label="Available Study Hours Per Day" type="number" value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Hours Per Subject</Typography>
            <Typography variant="h3" fontWeight="bold">{result.hoursPerSubject.toFixed(1)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Available Study Hours</Typography>
            <Typography fontWeight={600}>{result.totalHours.toFixed(1)} hrs</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StudyHoursPlannerCalculator;
