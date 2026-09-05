'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface MilestoneDef {
  key: string;
  defaultLabel: string;
  optionLabel: string;
  monthsBefore?: number;
  weeksBefore?: number;
  daysBefore?: number;
}

const MILESTONE_DEFS: MilestoneDef[] = [
  { key: '6m', defaultLabel: 'Start planning key details', optionLabel: '6 months before', monthsBefore: 6 },
  { key: '3m', defaultLabel: 'Finalize major decisions', optionLabel: '3 months before', monthsBefore: 3 },
  { key: '1m', defaultLabel: 'Confirm details with everyone involved', optionLabel: '1 month before', monthsBefore: 1 },
  { key: '2w', defaultLabel: 'Send final reminders', optionLabel: '2 weeks before', weeksBefore: 2 },
  { key: '1w', defaultLabel: 'Wrap up remaining tasks', optionLabel: '1 week before', weeksBefore: 1 },
  { key: '1d', defaultLabel: 'Final preparations', optionLabel: '1 day before', daysBefore: 1 },
];

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function subtractFromDate(target: Date, def: MilestoneDef): Date {
  const d = new Date(target);
  if (def.monthsBefore) d.setMonth(d.getMonth() - def.monthsBefore);
  if (def.weeksBefore) d.setDate(d.getDate() - def.weeksBefore * 7);
  if (def.daysBefore) d.setDate(d.getDate() - def.daysBefore);
  return d;
}

const CountdownListGeneratorContent = () => {
  const [eventName, setEventName] = useState('My Big Event');
  const [targetDateStr, setTargetDateStr] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 4);
    return d.toISOString().slice(0, 10);
  });
  const [labels, setLabels] = useState<Record<string, string>>(
    Object.fromEntries(MILESTONE_DEFS.map((m) => [m.key, m.defaultLabel]))
  );

  const updateLabel = (key: string, value: string) => setLabels((prev) => ({ ...prev, [key]: value }));

  const { daysRemaining, weeksRemaining, monthsRemaining, isPastEvent, milestones } = useMemo(() => {
    const today = startOfDay(new Date());
    const target = startOfDay(new Date(`${targetDateStr}T00:00:00`));
    const diffMs = target.getTime() - today.getTime();
    const daysRemaining = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const weeksRemaining = Math.round((daysRemaining / 7) * 10) / 10;
    const monthsRemaining = Math.round((daysRemaining / 30.44) * 10) / 10;
    const isPastEvent = daysRemaining < 0;

    const milestones = MILESTONE_DEFS.map((def) => {
      const date = subtractFromDate(target, def);
      return {
        key: def.key,
        label: labels[def.key] || def.defaultLabel,
        date,
        isPast: startOfDay(date).getTime() < today.getTime(),
      };
    }).sort((a, b) => a.date.getTime() - b.date.getTime());

    return { daysRemaining, weeksRemaining, monthsRemaining, isPastEvent, milestones };
  }, [targetDateStr, labels]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} fullWidth />
        <TextField
          label="Target Date"
          type="date"
          value={targetDateStr}
          onChange={(e) => setTargetDateStr(e.target.value)}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
          {isPastEvent ? (
            <Typography variant="h6" fontWeight={700} color="text.secondary">
              {eventName || 'This event'} was {Math.abs(daysRemaining)} day{Math.abs(daysRemaining) !== 1 ? 's' : ''} ago
            </Typography>
          ) : (
            <>
              <Typography variant="h3" fontWeight={800} color="primary.main">{daysRemaining}</Typography>
              <Typography variant="body2" color="text.secondary">days until {eventName || 'your event'}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>({weeksRemaining} weeks / {monthsRemaining} months)</Typography>
            </>
          )}
        </Paper>

        <Typography variant="subtitle2" color="text.secondary">Customize milestone task labels:</Typography>
        {MILESTONE_DEFS.map((def) => (
          <TextField
            key={def.key}
            size="small"
            label={def.optionLabel}
            value={labels[def.key]}
            onChange={(e) => updateLabel(def.key, e.target.value)}
            fullWidth
          />
        ))}
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Milestone Checklist</Typography>
        <Stack spacing={1.5}>
          {milestones.map((m) => (
            <Paper
              key={m.key}
              variant="outlined"
              sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: m.isPast ? 0.55 : 1 }}
            >
              <Box>
                <Typography fontWeight={600}>{m.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {m.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </Typography>
              </Box>
              <Chip label={m.isPast ? 'Past' : 'Upcoming'} color={m.isPast ? 'default' : 'primary'} size="small" />
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

const CountdownListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Countdown List Generator</Typography>
      <Typography variant="body1">
        Enter your event name and target date. The tool calculates the days, weeks, and months remaining, and
        automatically builds a milestone checklist counting backward from your date at common planning
        intervals — 6 months, 3 months, 1 month, 2 weeks, 1 week, and 1 day before. Each milestone comes with an
        editable default task label (like &quot;Send final reminders&quot;) you can customize to fit your own
        plan, and every milestone is flagged as either already Past or still Upcoming based on today&apos;s date.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting a target date 4 months away automatically marks the 6-month milestone as already Past (since
        it falls before today), while the 3-month, 1-month, 2-week, 1-week, and 1-day milestones all show as
        Upcoming with their exact calendar dates listed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a wedding, conference, or product-launch planning timeline with built-in reminders.</li>
          <li>Tracking how much time is left before a deadline, exam, or move-out date.</li>
          <li>Sharing a milestone checklist with a team or family so everyone knows what needs to happen and when.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I change the milestone task labels?</strong> Yes — every milestone has an editable text field with a generic default label like &quot;Final preparations&quot; that you can rename to anything specific to your event.</li>
          <li><strong>How does the tool know which milestones are already past?</strong> It compares each milestone&apos;s calculated date against today&apos;s date on your device, marking anything before today as Past and everything else as Upcoming.</li>
          <li><strong>Does it work for dates that have already happened?</strong> Yes — if you enter a target date in the past, the tool shows how many days ago it occurred instead of a countdown, and all milestones display as Past.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/countdown-list-generator" content={content}>
      <CountdownListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CountdownListGenerator;
