'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function parseTimeToMinutes(value: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

const TimeDurationCalculator = () => {
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:30');
  const [nextDay, setNextDay] = useState<'same' | 'next'>('same');

  const { hours, minutes, totalMinutes } = useMemo(() => {
    const startMin = parseTimeToMinutes(startTime);
    const endMin = parseTimeToMinutes(endTime);
    if (startMin === null || endMin === null) {
      return { hours: 0, minutes: 0, totalMinutes: 0 };
    }
    let diff = endMin - startMin;
    if (nextDay === 'next') diff += 24 * 60;
    if (diff < 0) diff += 24 * 60;
    return { hours: Math.floor(diff / 60), minutes: diff % 60, totalMinutes: diff };
  }, [startTime, endTime, nextDay]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Time Between Two Clock Times</Typography>
      <Typography variant="body1">
        This tool answers a very specific question: given a start clock time and an end clock time, how much
        time passed between them? Enter both times below and the calculator instantly shows the duration in
        hours and minutes.
      </Typography>
      <Typography variant="body1">
        If the end time is earlier than the start time (for example, a shift from 10 PM to 6 AM), toggle
        &quot;Ends Next Day&quot; so the calculator correctly adds a full 24 hours instead of returning a
        negative duration.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Starting at 9:00 AM and ending at 5:30 PM gives a duration of 8 hours 30 minutes. A shift starting at
        10:00 PM and ending at 6:00 AM the next morning is 8 hours, once &quot;Ends Next Day&quot; is selected.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out how many hours you worked between a clock-in and clock-out time.</li>
          <li>Calculating the length of an overnight shift that crosses midnight.</li>
          <li>Finding the duration of a meeting, flight, or appointment from its start and end time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the site&apos;s Time Calculator?</Typography>
      <Typography variant="body1">
        The Time Calculator adds or subtracts a duration (like 2 hours 30 minutes) from a starting duration. This
        tool instead takes two clock times — a start and an end — and tells you how much time elapsed between
        them, which is a different and more common everyday question.
      </Typography>
      <Typography variant="h3">What happens if I enter the same start and end time?</Typography>
      <Typography variant="body1">
        With &quot;Ends Next Day&quot; off, identical start and end times return a duration of 0 hours 0 minutes.
        With it turned on, the calculator assumes a full 24 hours passed.
      </Typography>
      <Typography variant="h3">Does this handle 12-hour (AM/PM) times?</Typography>
      <Typography variant="body1">
        Yes — the time fields use your browser&apos;s native time picker, which displays in either 12-hour
        (AM/PM) or 24-hour format depending on your device and locale settings, while the calculation itself
        always works correctly under the hood.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/time-duration-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Start Time</Typography>
            <TextField
              fullWidth
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>End Time</Typography>
            <TextField
              fullWidth
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <ToggleButtonGroup
            color="primary"
            value={nextDay}
            exclusive
            fullWidth
            onChange={(_, value) => { if (value) setNextDay(value); }}
          >
            <ToggleButton value="same" sx={{ fontWeight: 600 }}>Ends Same Day</ToggleButton>
            <ToggleButton value="next" sx={{ fontWeight: 600 }}>Ends Next Day</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Duration</Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
              {hours}h {minutes}m
            </Typography>
            <Typography variant="body1" color="text.secondary">
              ({totalMinutes.toLocaleString()} total minutes)
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TimeDurationCalculator;
