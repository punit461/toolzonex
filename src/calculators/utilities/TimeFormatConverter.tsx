'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, MenuItem, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function to24Hour(hour12: number, minute: number, period: 'AM' | 'PM'): string {
  let h = hour12 % 12;
  if (period === 'PM') h += 12;
  return `${h.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function to12Hour(hour24: number, minute: number): string {
  const period = hour24 >= 12 ? 'PM' : 'AM';
  let h = hour24 % 12;
  if (h === 0) h = 12;
  return `${h}:${minute.toString().padStart(2, '0')} ${period}`;
}

const TimeFormatConverterContent = () => {
  const [hour12, setHour12] = useState('9');
  const [minute12, setMinute12] = useState('30');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  const [time24, setTime24] = useState('14:30');

  const h12 = parseInt(hour12, 10);
  const m12 = parseInt(minute12, 10);
  const valid12 = !isNaN(h12) && h12 >= 1 && h12 <= 12 && !isNaN(m12) && m12 >= 0 && m12 <= 59;
  const converted24 = valid12 ? to24Hour(h12, m12, period) : null;

  const parsed24 = useMemo(() => {
    const match = time24.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const h = parseInt(match[1], 10);
    const m = parseInt(match[2], 10);
    if (h < 0 || h > 23 || m < 0 || m > 59) return null;
    return { h, m };
  }, [time24]);
  const converted12 = parsed24 ? to12Hour(parsed24.h, parsed24.m) : null;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          12-Hour → 24-Hour
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            label="Hour"
            type="number"
            value={hour12}
            onChange={(e) => setHour12(e.target.value)}
            inputProps={{ min: 1, max: 12 }}
            fullWidth
          />
          <TextField
            label="Minute"
            type="number"
            value={minute12}
            onChange={(e) => setMinute12(e.target.value)}
            inputProps={{ min: 0, max: 59 }}
            fullWidth
          />
          <TextField select label="AM/PM" value={period} onChange={(e) => setPeriod(e.target.value as 'AM' | 'PM')} fullWidth>
            <MenuItem value="AM">AM</MenuItem>
            <MenuItem value="PM">PM</MenuItem>
          </TextField>
        </Stack>
        <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>24-Hour Format</Typography>
          <Typography variant="h4" fontWeight={700}>{converted24 ?? '—'}</Typography>
        </Paper>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          24-Hour → 12-Hour
        </Typography>
        <TextField
          label="Time (HH:MM, 24-hour)"
          placeholder="e.g. 14:30"
          value={time24}
          onChange={(e) => setTime24(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>12-Hour Format</Typography>
          <Typography variant="h4" fontWeight={700}>{converted12 ?? '—'}</Typography>
        </Paper>
      </Paper>
    </Box>
  );
};

const TimeFormatConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Time Format Converter</Typography>
      <Typography variant="body1">
        Use either converter depending on which direction you need. On the left, enter an hour, minute, and
        AM/PM to instantly see the equivalent 24-hour time. On the right, enter a 24-hour time (like
        &quot;14:30&quot;) to instantly see the equivalent 12-hour time with AM or PM.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering 9:30 AM converts to 09:30 in 24-hour format. Entering 14:30 in the 24-hour field converts
        to 2:30 PM in 12-hour format.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting meeting times between a 24-hour system and a 12-hour AM/PM system.</li>
          <li>Reading a 24-hour timestamp from a log file, boarding pass, or international schedule.</li>
          <li>Double-checking a time before entering it into a form that expects a specific format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>What does 12:00 AM and 12:00 PM mean in 24-hour time?</strong> 12:00 AM (midnight) is
            00:00 in 24-hour format, and 12:00 PM (noon) is 12:00 — a common point of confusion this
            converter handles automatically.
          </li>
          <li>
            <strong>Does this handle seconds?</strong> No — this converter works with hours and minutes
            only, which covers the vast majority of everyday time conversion needs.
          </li>
          <li>
            <strong>Why is 24-hour format also called &quot;military time&quot;?</strong> It&apos;s the
            standard time format used by militaries and many countries worldwide specifically because it
            removes any AM/PM ambiguity — each hour of the day has one unique number from 00 to 23.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/time-format-converter" content={content}>
      <TimeFormatConverterContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default TimeFormatConverter;
