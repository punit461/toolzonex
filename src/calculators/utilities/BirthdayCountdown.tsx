'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Paper, TextField, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

interface BirthdayInfo {
  nextBirthday: Date;
  daysUntil: number;
  countdown: Countdown;
  ageOnNextBirthday: number;
  dayOfWeek: string;
  birthYear: number;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function calculateCountdown(month: number, day: number, birthYear: number): BirthdayInfo {
  const now = new Date();
  const currentYear = now.getFullYear();
  let nextBirthday = new Date(currentYear, month - 1, day);

  if (nextBirthday < now) {
    nextBirthday = new Date(currentYear + 1, month - 1, day);
  }

  const diffMs = nextBirthday.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const ageOnNextBirthday = nextBirthday.getFullYear() - birthYear;

  return {
    nextBirthday,
    daysUntil: days,
    countdown: { days, hours, minutes, seconds, totalSeconds },
    ageOnNextBirthday,
    dayOfWeek: DAYS_OF_WEEK[nextBirthday.getDay()],
    birthYear,
  };
}

const BirthdayCountdownContent = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [birthYear, setBirthYear] = useState<string>('');
  const [info, setInfo] = useState<BirthdayInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(() => {
    const year = parseInt(birthYear, 10);
    if (!birthYear || isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      setError('Please enter a valid birth year (1900-' + new Date().getFullYear() + ')');
      setInfo(null);
      return;
    }
    if (day < 1 || day > 31 || month < 1 || month > 12) {
      setError('Please enter a valid month (1-12) and day (1-31)');
      setInfo(null);
      return;
    }
    setError(null);
    setInfo(calculateCountdown(month, day, year));
  }, [month, day, birthYear]);

  useEffect(() => {
    if (!info) return;
    const interval = setInterval(() => {
      setInfo(calculateCountdown(info.nextBirthday.getMonth() + 1, info.nextBirthday.getDate(), info.birthYear));
    }, 1000);
    return () => clearInterval(interval);
  }, [info]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
        <TextField
          label="Month"
          type="number"
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value) || 1)}
          inputProps={{ min: 1, max: 12 }}
          fullWidth
        />
        <TextField
          label="Day"
          type="number"
          value={day}
          onChange={(e) => setDay(parseInt(e.target.value) || 1)}
          inputProps={{ min: 1, max: 31 }}
          fullWidth
        />
        <TextField
          label="Birth Year"
          type="number"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="e.g. 1995"
          inputProps={{ min: 1900, max: new Date().getFullYear() }}
          fullWidth
        />
      </Box>

      <Button variant="contained" size="large" onClick={calculate} fullWidth>
        Start Countdown
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {info && (
        <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom fontWeight="600">
            Your next birthday is on
          </Typography>
          <Typography variant="h4" color="primary" fontWeight="700" gutterBottom>
            {MONTHS[info.nextBirthday.getMonth()]} {info.nextBirthday.getDate()}, {info.nextBirthday.getFullYear()} ({info.dayOfWeek})
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, my: 4 }}>
            {[
              { value: info.countdown.days, label: 'Days' },
              { value: info.countdown.hours, label: 'Hours' },
              { value: info.countdown.minutes, label: 'Minutes' },
              { value: info.countdown.seconds, label: 'Seconds' },
            ].map((item) => (
              <Paper key={item.label} variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h3" fontWeight="700" color="primary">
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">{item.label}</Typography>
              </Paper>
            ))}
          </Box>

          <Typography variant="h6" color="text.secondary">
            You will turn <strong>{info.ageOnNextBirthday}</strong> on your next birthday!
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const BirthdayCountdown = () => {
  const content = (
    <>
      <Typography variant="h2">Free Birthday Countdown — Days Until My Birthday</Typography>
      <Typography variant="body1">
        Enter your birthday and see a live countdown to your next birthday. The timer updates every
        second showing days, hours, minutes, and seconds remaining. Also displays the day of the week
        and how old you&apos;ll turn.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Enter your birth month, day, and year, then click &quot;Start Countdown.&quot; The timer starts
        immediately and updates in real time. If your birthday has already passed this year, it counts
        down to next year&apos;s birthday.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If your birthday is July 15, 1995 and today is January 10, the countdown shows the exact
        time remaining until July 15, 2026 — along with &quot;You will turn 31 on your next birthday!&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Counting down to your own birthday or a friend&apos;s birthday.</li>
          <li>Planning a birthday surprise and knowing the exact time remaining.</li>
          <li>Fun daily check to see how many days until your next birthday.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it work for February 29 birthdays?</Typography>
      <Typography variant="body1">
        If your birthday is Feb 29 and the current year isn&apos;t a leap year, the countdown will show
        March 1 as the next birthday date.
      </Typography>
      <Typography variant="h3">Does the countdown update automatically?</Typography>
      <Typography variant="body1">
        Yes — once you click &quot;Start Countdown,&quot; the timer ticks every second in real time.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/birthday-countdown" content={content}>
      <BirthdayCountdownContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BirthdayCountdown;
