'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BusinessDaysCalculator = () => {
  const [mode, setMode] = useState<'days-to-date' | 'date-to-days'>('days-to-date');
  const [start, setStart] = useState<string>('2026-01-01');
  const [days, setDays] = useState<string>('10');
  const [end, setEnd] = useState<string>('2026-01-15');

  const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

  const result = useMemo(() => {
    if (mode === 'days-to-date') {
      const startDate = new Date(start);
      const n = parseInt(days, 10) || 0;
      if (isNaN(startDate.getTime()) || n <= 0) return '—';
      let count = 0;
      const cur = new Date(startDate);
      while (count < n) {
        cur.setDate(cur.getDate() + 1);
        if (!isWeekend(cur)) count++;
      }
      return cur.toISOString().split('T')[0];
    } else {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '—';
      let count = 0;
      const cur = new Date(startDate);
      while (cur <= endDate) {
        if (!isWeekend(cur)) count++;
        cur.setDate(cur.getDate() + 1);
      }
      return count.toString();
    }
  }, [mode, start, days, end]);

  const content = (
    <>
      <Typography variant="h2">How to use?</Typography>
      <Typography variant="body1">
        Pick a mode: add a number of business days to a start date to get the end
        date (weekends skipped), or count the business days between a start and end
        date.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Starting 2026-01-01 (Thursday), 10 business days lands on 2026-01-15. Between
        2026-01-01 and 2026-01-15 there are 11 business days.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are holidays included?</strong> This tool skips Saturdays and Sundays only; public holidays are not accounted for.</li>
          <li><strong>Does it count the start date?</strong> In date-to-days mode the start date is included if it is a weekday.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating delivery or SLA deadlines.</li>
          <li>Project scheduling across working days.</li>
          <li>Estimating notice or processing periods.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/business-days-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Mode</InputLabel>
            <Select label="Mode" value={mode} onChange={(e) => setMode(e.target.value as any)}>
              <MenuItem value="days-to-date">Business Days → Date</MenuItem>
              <MenuItem value="date-to-days">Date Range → Business Days</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Start Date" type="date" value={start} onChange={(e) => setStart(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
          {mode === 'days-to-date' ? (
            <TextField label="Number of Business Days" type="number" value={days} onChange={(e) => setDays(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">days</InputAdornment> }} />
          ) : (
            <TextField label="End Date" type="date" value={end} onChange={(e) => setEnd(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
          )}
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">{mode === 'days-to-date' ? 'End Date' : 'Business Days'}</Typography>
            <Typography variant="h6" fontWeight="bold">{result}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BusinessDaysCalculator;
