'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function defaultTarget(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  d.setHours(9, 0, 0, 0);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const CountdownCalculator = () => {
  const [target, setTarget] = useState<string>('');
  const [remaining, setRemaining] = useState<Remaining | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTarget(defaultTarget());
  }, []);

  useEffect(() => {
    if (!mounted || !target) return;

    const tick = () => {
      const targetMs = new Date(target).getTime();
      if (Number.isNaN(targetMs)) {
        setRemaining(null);
        return;
      }
      const diff = targetMs - Date.now();
      const isPast = diff <= 0;
      const abs = Math.abs(diff);
      const totalSeconds = Math.floor(abs / 1000);
      setRemaining({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        isPast,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [mounted, target]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Countdown Calculator</Typography>
      <Typography variant="body1">
        Pick any target date and time, and this tool counts down to it live — showing the days, hours, minutes,
        and seconds remaining, updating every second. If the target has already passed, it instead shows the
        time elapsed since that moment.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting the target to New Year&apos;s Day at midnight shows a live countdown of days, hours, minutes,
        and seconds remaining until the new year arrives, refreshing automatically without needing to reload
        the page.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Counting down to a wedding, launch date, deadline, or event.</li>
          <li>Tracking exactly how much time is left before a countdown milestone.</li>
          <li>Checking how much time has elapsed since a past date or event.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does the countdown keep updating automatically?</Typography>
      <Typography variant="body1">
        Yes — once you set a target date and time, the display refreshes every second on its own, with no need
        to click a button or reload the page.
      </Typography>
      <Typography variant="h3">What happens if I pick a date in the past?</Typography>
      <Typography variant="body1">
        The calculator switches to showing elapsed time — how long ago that date and time occurred — instead of
        a countdown.
      </Typography>
      <Typography variant="h3">Does this account for my local time zone?</Typography>
      <Typography variant="body1">
        Yes — the target date and time you enter, and the current time used for the countdown, are both based
        on your device&apos;s local time zone.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/countdown-calculator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 600, mx: 'auto' }}>
        <TextField
          label="Target Date & Time"
          type="datetime-local"
          fullWidth
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          {!mounted || !remaining ? (
            <Typography variant="body1" color="text.secondary">Loading countdown…</Typography>
          ) : (
            <>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {remaining.isPast ? 'Time Elapsed Since' : 'Time Remaining'}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                {[
                  { value: remaining.days, label: 'Days' },
                  { value: remaining.hours, label: 'Hours' },
                  { value: remaining.minutes, label: 'Minutes' },
                  { value: remaining.seconds, label: 'Seconds' },
                ].map((item) => (
                  <Paper key={item.label} variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h3" fontWeight={700} color="primary">{item.value}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                  </Paper>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CountdownCalculator;
