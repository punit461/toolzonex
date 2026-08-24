'use client';

import { useState, useMemo } from 'react';
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

const ResultRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
  </Box>
);

const OvulationCalculatorContent = () => {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState<number>(28);

  const { ovulationDate, fertileStart, nextPeriod } = useMemo(() => {
    const lmp = parseDate(lastPeriod);
    if (!lmp || !cycleLength || cycleLength <= 0) {
      return { ovulationDate: null as Date | null, fertileStart: null as Date | null, nextPeriod: null as Date | null };
    }
    const ovulation = addDays(lmp, cycleLength - 14);
    const fertile = addDays(ovulation, -5);
    const next = addDays(lmp, cycleLength);
    return { ovulationDate: ovulation, fertileStart: fertile, nextPeriod: next };
  }, [lastPeriod, cycleLength]);

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

        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>Average cycle length</Typography>
          <TextField
            fullWidth
            type="number"
            value={Number.isNaN(cycleLength) ? '' : cycleLength}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setCycleLength(e.target.value === '' ? NaN : Number(e.target.value))}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">days</InputAdornment> } }}
            helperText="Most cycles range from 21 to 35 days. Default is 28."
          />
        </Box>
      </Box>

      <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
        <ResultRow label="Estimated ovulation date" value={formatDate(ovulationDate)} />
        <ResultRow
          label="Fertile window"
          value={fertileStart && ovulationDate ? `${formatDate(fertileStart)} – ${formatDate(ovulationDate)}` : '—'}
        />
        <Box sx={{ pt: 1.5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Next expected period</Typography>
          <Typography sx={{ fontWeight: 700 }}>{formatDate(nextPeriod)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const OvulationCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Ovulation Calculator Works</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter the first day of your last menstrual period (LMP).</li>
          <li>Enter your average cycle length — the number of days from the start of one period to the start of the next (default 28 days).</li>
          <li>The calculator estimates ovulation as occurring 14 days before your next expected period, then shows a fertile window of the 5 days leading up to and including that day.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If your last period started on the 1st of the month and your average cycle is 28 days, ovulation is
        estimated around day 14 (the 15th), with a fertile window from the 10th to the 15th, and your next
        period expected around day 28 (the 29th).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Identifying the days you&apos;re most likely to conceive when trying to get pregnant.</li>
          <li>Getting a rough estimate of when your next period is due.</li>
          <li>Tracking cycle patterns alongside other fertility signs like basal body temperature or cervical mucus.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is this ovulation calculator?</Typography>
      <Typography variant="body1">
        It&apos;s an estimate based on average cycle statistics, not a measurement of your actual hormone levels.
        This calculator is not a substitute for medical advice, and it is not a reliable method of
        contraception — actual ovulation timing varies from cycle to cycle and can be affected by stress,
        illness, travel, and many other factors. If you&apos;re trying to conceive or avoid pregnancy, talk to a
        healthcare provider and consider tracking methods like ovulation predictor kits or basal body
        temperature alongside this calculator.
      </Typography>
      <Typography variant="h3">What is the fertile window?</Typography>
      <Typography variant="body1">
        The fertile window is the span of days in a cycle when pregnancy is possible — typically the 5 days
        before ovulation plus the day of ovulation itself, since sperm can survive in the body for several days
        while the egg is only viable for about 24 hours after release.
      </Typography>
      <Typography variant="h3">What if my cycles are irregular?</Typography>
      <Typography variant="body1">
        This calculator assumes a consistent cycle length, so estimates will be less reliable if your cycles
        vary significantly month to month. In that case, tracking multiple cycles and using additional fertility
        signs — or speaking with a doctor — will give a more reliable picture.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/ovulation-calculator" content={content}>
      <OvulationCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OvulationCalculator;
