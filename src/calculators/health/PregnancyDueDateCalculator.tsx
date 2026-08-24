'use client';

import { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
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

function trimesterOf(week: number): string {
  if (week < 1) return '—';
  if (week <= 13) return '1st Trimester';
  if (week <= 27) return '2nd Trimester';
  return '3rd Trimester';
}

const ResultRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
  </Box>
);

const PregnancyDueDateContent = () => {
  const [lmp, setLmp] = useState('');
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const { dueDate, weeksPregnant, daysPregnant, trimester } = useMemo(() => {
    const lmpDate = parseDate(lmp);
    if (!lmpDate) {
      return { dueDate: null as Date | null, weeksPregnant: 0, daysPregnant: 0, trimester: '—' };
    }

    // Naegele's Rule: due date = LMP + 280 days (40 weeks).
    const due = addDays(lmpDate, 280);

    if (!today) {
      return { dueDate: due, weeksPregnant: 0, daysPregnant: 0, trimester: '—' };
    }

    const diffMs = today.getTime() - lmpDate.getTime();
    const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    return { dueDate: due, weeksPregnant: weeks, daysPregnant: days, trimester: trimesterOf(weeks) };
  }, [lmp, today]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <Typography gutterBottom>First day of your last menstrual period (LMP)</Typography>
        <TextField
          fullWidth
          type="date"
          value={lmp}
          onChange={(e) => setLmp(e.target.value)}
        />
      </Box>

      <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
        <ResultRow label="Estimated due date" value={formatDate(dueDate)} />
        <ResultRow
          label="Current gestational age"
          value={dueDate && lmp ? `${weeksPregnant} weeks, ${daysPregnant} days` : '—'}
        />
        <Box sx={{ pt: 1.5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography color="text.secondary">Trimester</Typography>
          <Typography sx={{ fontWeight: 700 }}>{lmp ? trimester : '—'}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const PregnancyDueDateCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Pregnancy Due Date Calculator Works</Typography>
      <Typography variant="body1">
        This calculator estimates your due date using <strong>Naegele&apos;s Rule</strong>, the standard formula
        used by clinicians: <strong>due date = first day of your last menstrual period (LMP) + 280 days</strong>{' '}
        (40 weeks). It assumes a regular 28-day cycle with ovulation around day 14.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter the first day of your last menstrual period.</li>
          <li>Your estimated due date, current gestational week, and trimester appear instantly.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If your last period started on January 1st, adding 280 days gives an estimated due date of October 8th —
        about 40 weeks later.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a quick due date estimate before or during an early prenatal visit.</li>
          <li>Tracking which week and trimester of pregnancy you&apos;re currently in.</li>
          <li>Planning for milestones like the second-trimester anatomy scan or maternity leave.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is Naegele&apos;s Rule?</Typography>
      <Typography variant="body1">
        Naegele&apos;s Rule is a widely used estimate, but only about 5% of babies are born exactly on their due
        date — most arrive within a couple of weeks before or after. It also assumes a regular 28-day cycle with
        ovulation on day 14, so it&apos;s less accurate for people with longer, shorter, or irregular cycles. This
        calculator provides an estimate only, is not a substitute for professional medical advice, and should
        not replace dating confirmed by a doctor or an early ultrasound.
      </Typography>
      <Typography variant="h3">What are the three trimesters?</Typography>
      <Typography variant="body1">
        The 1st trimester spans weeks 1–13, the 2nd trimester spans weeks 14–27, and the 3rd trimester spans
        week 28 until birth (around week 40).
      </Typography>
      <Typography variant="h3">Why does the calculator use my last period instead of the conception date?</Typography>
      <Typography variant="body1">
        Conception date is rarely known precisely, but the start of the last period is easier to remember and
        correlates predictably with typical ovulation timing, which is why Naegele&apos;s Rule and most pregnancy
        wheels are built around LMP rather than the estimated conception date.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/pregnancy-due-date-calculator" content={content}>
      <PregnancyDueDateContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PregnancyDueDateCalculator;
