'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Paper, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface AnniversaryInfo {
  nextDate: Date;
  countdown: Countdown;
  anniversaryNumber: number | null;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function calculateCountdown(month: number, day: number, startYear: number | null): AnniversaryInfo {
  const now = new Date();
  const currentYear = now.getFullYear();
  let nextDate = new Date(currentYear, month - 1, day);

  if (nextDate < now) {
    nextDate = new Date(currentYear + 1, month - 1, day);
  }

  const diffMs = Math.max(0, nextDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const anniversaryNumber = startYear ? nextDate.getFullYear() - startYear : null;

  return { nextDate, countdown: { days, hours, minutes, seconds }, anniversaryNumber };
}

const AnniversaryCountdownContent = () => {
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [startYear, setStartYear] = useState('');
  const [ready, setReady] = useState(false);
  const [info, setInfo] = useState<AnniversaryInfo | null>(null);

  useEffect(() => {
    const now = new Date();
    setMonth(now.getMonth() + 1);
    setDay(now.getDate());
    setReady(true);
  }, []);

  const recalculate = useCallback(() => {
    const year = startYear ? parseInt(startYear, 10) : null;
    setInfo(calculateCountdown(month, day, year && !isNaN(year) ? year : null));
  }, [month, day, startYear]);

  useEffect(() => {
    if (!ready) return;
    recalculate();
    const interval = setInterval(recalculate, 1000);
    return () => clearInterval(interval);
  }, [ready, recalculate]);

  if (!ready) {
    return <Typography color="text.secondary">Loading countdown...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
        <TextField
          label="Month"
          type="number"
          value={month}
          onChange={(e) => setMonth(Math.min(12, Math.max(1, parseInt(e.target.value, 10) || 1)))}
          inputProps={{ min: 1, max: 12 }}
          fullWidth
        />
        <TextField
          label="Day"
          type="number"
          value={day}
          onChange={(e) => setDay(Math.min(31, Math.max(1, parseInt(e.target.value, 10) || 1)))}
          inputProps={{ min: 1, max: 31 }}
          fullWidth
        />
        <TextField
          label="Start year (optional)"
          type="number"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          placeholder="e.g. 2018"
          fullWidth
        />
      </Box>

      {info && (
        <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Next occurs on
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>
            {MONTHS[info.nextDate.getMonth()]} {info.nextDate.getDate()}, {info.nextDate.getFullYear()}
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, my: 4 }}>
            {[
              { value: info.countdown.days, label: 'Days' },
              { value: info.countdown.hours, label: 'Hours' },
              { value: info.countdown.minutes, label: 'Minutes' },
              { value: info.countdown.seconds, label: 'Seconds' },
            ].map((item) => (
              <Paper key={item.label} variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight={700} color="primary">{item.value}</Typography>
                <Typography variant="body2" color="text.secondary">{item.label}</Typography>
              </Paper>
            ))}
          </Box>

          {info.anniversaryNumber !== null && info.anniversaryNumber > 0 && (
            <Typography variant="h6" color="text.secondary">
              This will be your <strong>{info.anniversaryNumber}</strong>
              {info.anniversaryNumber === 1 ? 'st' : info.anniversaryNumber === 2 ? 'nd' : info.anniversaryNumber === 3 ? 'rd' : 'th'} anniversary!
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

const AnniversaryCountdown = () => {
  const content = (
    <>
      <Typography variant="h2">How the Anniversary Countdown Works</Typography>
      <Typography variant="body1">
        Enter the month and day of a recurring anniversary — a wedding date, work anniversary, or any yearly
        milestone — and this tool counts down live to its next occurrence, updating every second. Add the
        year the anniversary first began to see which anniversary number is coming up.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter the month and day of the anniversary date.</li>
          <li>Optionally enter the starting year to see which anniversary number is next.</li>
          <li>The countdown starts immediately and updates live — no button needed.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering June 12 with a start year of 2019 might show a live countdown to June 12 of the current or
        next year, along with &quot;This will be your 7th anniversary!&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Counting down to a wedding anniversary and knowing exactly which one it is.</li>
          <li>Tracking the time remaining until a work anniversary or other yearly milestone.</li>
          <li>Planning a surprise ahead of a recurring special date.</li>
          <li>Keeping tabs on any yearly-recurring event, like a first date anniversary or move-in date.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Do I have to enter a starting year?</Typography>
      <Typography variant="body1">
        No — the start year is optional. Without it, you still get a live countdown to the next occurrence of
        the date; with it, the tool also tells you which anniversary number is coming up.
      </Typography>
      <Typography variant="h3">What happens if the date already passed this year?</Typography>
      <Typography variant="body1">
        The countdown automatically points to next year&apos;s occurrence of the date instead, so it always
        counts down to the next time the anniversary happens.
      </Typography>
      <Typography variant="h3">Does the countdown update automatically?</Typography>
      <Typography variant="body1">
        Yes — it updates every second in real time without needing to click any button or refresh the page.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/anniversary-countdown" content={content}>
      <AnniversaryCountdownContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AnniversaryCountdown;
