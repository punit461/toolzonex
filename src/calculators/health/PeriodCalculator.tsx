'use client';

import { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date | null): string {
  if (!date) return '—';
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function shortDate(date: Date | null): string {
  if (!date) return '—';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function cyclePhase(dayInCycle: number, cycleLength: number, periodLength: number): string {
  if (dayInCycle <= periodLength) return 'Menstrual phase (period)';
  const ovulationDay = cycleLength - 14;
  if (dayInCycle >= ovulationDay - 1 && dayInCycle <= ovulationDay + 1) return 'Ovulation window';
  if (dayInCycle < ovulationDay) return 'Follicular phase';
  return 'Luteal phase';
}

const ResultRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
  </Box>
);

const PeriodCalculatorContent = () => {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const { nextPeriod, next2, next3, ovulationDate, fertileStart, daysUntil, dayInCycle, phase } = useMemo(() => {
    const lmp = parseDate(lastPeriod);
    if (!lmp || !cycleLength || cycleLength <= 0) {
      return {
        nextPeriod: null as Date | null, next2: null as Date | null, next3: null as Date | null,
        ovulationDate: null as Date | null, fertileStart: null as Date | null,
        daysUntil: null as number | null, dayInCycle: 0, phase: '—',
      };
    }

    const next = addDays(lmp, cycleLength);
    const ovulation = addDays(lmp, cycleLength - 14);
    const fertile = addDays(ovulation, -5);

    let cycleDay = 0;
    let until = null as number | null;
    if (today) {
      const totalDays = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
      cycleDay = ((totalDays % cycleLength) + cycleLength) % cycleLength + 1;
      until = Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    }

    return {
      nextPeriod: next,
      next2: addDays(next, cycleLength),
      next3: addDays(next, cycleLength * 2),
      ovulationDate: ovulation,
      fertileStart: fertile,
      daysUntil: until,
      dayInCycle: cycleDay,
      phase: cyclePhase(cycleDay, cycleLength, periodLength),
    };
  }, [lastPeriod, cycleLength, periodLength, today]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>First day of your last period</Typography>
          <TextField
            fullWidth
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box>
            <Typography gutterBottom>Average cycle length</Typography>
            <TextField
              fullWidth
              type="number"
              value={Number.isNaN(cycleLength) ? '' : cycleLength}
              onChange={(e) => setCycleLength(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
            />
          </Box>
          <Box>
            <Typography gutterBottom>Period length</Typography>
            <TextField
              fullWidth
              type="number"
              value={Number.isNaN(periodLength) ? '' : periodLength}
              onChange={(e) => setPeriodLength(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
        <ResultRow label="Next period expected" value={formatDate(nextPeriod)} />
        <ResultRow label="Days until next period" value={lastPeriod && daysUntil !== null ? `${daysUntil} days` : '—'} />
        <ResultRow label="Current cycle day" value={lastPeriod && dayInCycle ? `Day ${dayInCycle}` : '—'} />
        <ResultRow label="Current phase" value={lastPeriod ? phase : '—'} />
        <ResultRow label="Estimated ovulation" value={formatDate(ovulationDate)} />
        <ResultRow label="Fertile window" value={fertileStart && ovulationDate ? `${shortDate(fertileStart)} – ${shortDate(ovulationDate)}` : '—'} />
        <Box sx={{ pt: 1.5 }}>
          <Typography color="text.secondary" gutterBottom>Following 2 cycles</Typography>
          <Typography sx={{ fontWeight: 700 }}>{shortDate(next2)} · {shortDate(next3)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const PeriodCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Period Calculator Works</Typography>
      <Typography variant="body1">
        This calculator predicts your <strong>next period date, current cycle phase, and fertile window</strong> from
        the first day of your last period and your average cycle length. It projects forward using your typical
        cycle length (day 1 of one period to day 1 of the next), and estimates ovulation around 14 days before your
        next expected period — the standard assumption used by most period trackers.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter the first day of your most recent period.</li>
          <li>Set your average cycle length (most people range 21–35 days; 28 is the textbook average).</li>
          <li>Set how many days your period usually lasts.</li>
          <li>See your next expected period, current cycle day and phase, and fertile window instantly.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If your last period started on June 1st with a 28-day cycle, your next period is expected around June 29th,
        with ovulation and the fertile window falling roughly between June 10th and June 15th.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning ahead for your next period so you&apos;re not caught off guard.</li>
          <li>Getting a quick estimate of your fertile window when trying to conceive or avoid pregnancy.</li>
          <li>Understanding which phase of your cycle (menstrual, follicular, ovulation, luteal) you&apos;re currently in.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is this period calculator?</Typography>
      <Typography variant="body1">
        It&apos;s an estimate based on your average cycle length, not a measurement of your actual hormones. Cycle
        length naturally varies month to month due to stress, illness, travel, and other factors, so treat the
        predicted dates as a helpful range rather than an exact schedule. This tool is not a substitute for medical
        advice or a reliable method of contraception.
      </Typography>
      <Typography variant="h3">What are the four phases of the menstrual cycle?</Typography>
      <Typography variant="body1">
        The <strong>menstrual phase</strong> is your period itself. The <strong>follicular phase</strong> runs from
        the end of your period until ovulation. <strong>Ovulation</strong> is the release of an egg, roughly midway
        through the cycle. The <strong>luteal phase</strong> follows ovulation until your next period begins.
      </Typography>
      <Typography variant="h3">How is this different from the Ovulation Calculator?</Typography>
      <Typography variant="body1">
        This tool is built around predicting your <strong>next period date</strong> and current cycle phase, with
        ovulation shown as a secondary estimate. If fertility planning is your main goal, the dedicated{' '}
        <strong>Ovulation Calculator</strong> leads with the fertile window and ovulation date instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/period-calculator" content={content}>
      <PeriodCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PeriodCalculator;
