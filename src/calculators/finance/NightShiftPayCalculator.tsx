'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function parseTime(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

// Duration (in minutes) of an interval from `start` to `end` (minutes-of-day),
// wrapping past midnight if end <= start.
function intervalDuration(start: number, end: number): number {
  return end > start ? end - start : 1440 - start + end;
}

// Overlap (in minutes) between an absolute interval [absStart, absStart+duration)
// and a daily-recurring window defined by windowStart/windowDuration, checked
// across the recurrences that could plausibly intersect a <=24h shift.
function overlapWithRecurringWindow(absStart: number, duration: number, windowStart: number, windowDuration: number): number {
  const absEnd = absStart + duration;
  let total = 0;
  for (let k = -1; k <= 1; k++) {
    const wStart = windowStart + k * 1440;
    const wEnd = wStart + windowDuration;
    const overlap = Math.min(absEnd, wEnd) - Math.max(absStart, wStart);
    if (overlap > 0) total += overlap;
  }
  return total;
}

const NightShiftPayCalculator = () => {
  const [rate, setRate] = useState('20');
  const [shiftStart, setShiftStart] = useState('22:00');
  const [shiftEnd, setShiftEnd] = useState('06:00');
  const [diffPercent, setDiffPercent] = useState('12');
  const [nightStart, setNightStart] = useState('22:00');
  const [nightEnd, setNightEnd] = useState('06:00');

  const result = useMemo(() => {
    const r = parseFloat(rate) || 0;
    const diff = parseFloat(diffPercent) || 0;
    const ss = parseTime(shiftStart);
    const se = parseTime(shiftEnd);
    const ns = parseTime(nightStart);
    const ne = parseTime(nightEnd);

    if (ss === null || se === null || ns === null || ne === null) {
      return null;
    }

    const shiftDurationMin = intervalDuration(ss, se);
    const nightDurationMin = intervalDuration(ns, ne);

    const nightOverlapMin = Math.min(
      overlapWithRecurringWindow(ss, shiftDurationMin, ns, nightDurationMin),
      shiftDurationMin
    );
    const regularMin = Math.max(shiftDurationMin - nightOverlapMin, 0);

    const shiftHours = shiftDurationMin / 60;
    const nightHours = nightOverlapMin / 60;
    const regularHours = regularMin / 60;

    const regularPay = regularHours * r;
    const nightPay = nightHours * r * (1 + diff / 100);
    const totalPay = regularPay + nightPay;

    return { shiftHours, nightHours, regularHours, regularPay, nightPay, totalPay };
  }, [rate, shiftStart, shiftEnd, diffPercent, nightStart, nightEnd]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Night Shift Pay Calculator</Typography>
      <Typography variant="body1">
        Enter your hourly rate, your shift&apos;s start and end time, a night-shift differential percentage,
        and the night-hours window your employer defines (commonly 10pm to 6am, but adjustable). The
        calculator handles shifts and night windows that cross midnight by treating both as time intervals
        on a continuous timeline, then computes exactly how many of your shift&apos;s hours actually fall
        inside the night window — applying the differential only to that overlapping portion, and your
        regular rate to the rest.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Night Hours = Overlap Between Shift Interval and Night Window (handles midnight wraparound)
        <br />
        Total Pay = (Regular Hours × Rate) + (Night Hours × Rate × (1 + Differential%))
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A shift from 10pm to 6am (8 hours) fully overlaps a 10pm-6am night window, so all 8 hours earn the
        night differential. But a shift from 8pm to 4am with the same 10pm-6am night window only has 6 of its
        8 hours falling in the night window (10pm to 4am) — the first 2 hours (8pm-10pm) pay the regular rate,
        and only the remaining 6 hours get the night differential.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating accurate pay for a shift that only partially overlaps a defined night-hours window.</li>
          <li>Checking a paycheck for a shift that starts in the evening and crosses into night hours.</li>
          <li>Payroll teams verifying night differential is applied only to the actual overlapping hours, not the whole shift.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Shift Differential Pay Calculator?</strong> The Shift Differential Pay Calculator applies one flat differential to ALL hours in a shift you&apos;ve already labeled as a "differential shift" — it doesn&apos;t look at actual clock times. This tool instead calculates the ACTUAL time overlap between a specific shift&apos;s start/end time and a defined night-hours window, so a shift that only partially overlaps night hours gets premium pay for just the overlapping portion, not the entire shift.</li>
          <li><strong>What if my shift and the night window are exactly the same hours?</strong> Then the entire shift falls within the night window, and every hour earns the night differential — the calculator correctly detects full overlap in this case.</li>
          <li><strong>Can the night window itself cross midnight?</strong> Yes — enter a start time later than the end time (like 22:00 to 06:00) and the calculator correctly treats it as spanning past midnight, the same way it handles a shift that crosses midnight.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/night-shift-pay-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Hourly Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Shift Start (HH:MM)" value={shiftStart} onChange={(e) => setShiftStart(e.target.value)} fullWidth placeholder="22:00" />
            <TextField label="Shift End (HH:MM)" value={shiftEnd} onChange={(e) => setShiftEnd(e.target.value)} fullWidth placeholder="06:00" />
          </Box>
          <TextField
            label="Night Differential" type="number" value={diffPercent} onChange={(e) => setDiffPercent(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Night Window Start (HH:MM)" value={nightStart} onChange={(e) => setNightStart(e.target.value)} fullWidth placeholder="22:00" />
            <TextField label="Night Window End (HH:MM)" value={nightEnd} onChange={(e) => setNightEnd(e.target.value)} fullWidth placeholder="06:00" />
          </Box>
        </Box>

        <Box>
          {result ? (
            <>
              <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="body2">Total Shift Pay</Typography>
                <Typography variant="h3" fontWeight="bold">{money(result.totalPay)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Total Shift Hours</Typography>
                <Typography fontWeight={600}>{result.shiftHours.toFixed(2)} hrs</Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Night Hours (Differential)</Typography>
                <Typography fontWeight={600}>{result.nightHours.toFixed(2)} hrs — {money(result.nightPay)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Regular Hours</Typography>
                <Typography fontWeight={600}>{result.regularHours.toFixed(2)} hrs — {money(result.regularPay)}</Typography>
              </Paper>
            </>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">Enter valid times in HH:MM 24-hour format (e.g. 22:00).</Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NightShiftPayCalculator;
