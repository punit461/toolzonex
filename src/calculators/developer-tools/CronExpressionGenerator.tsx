'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Select, MenuItem, Button, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const range = (a: number, b: number): number[] => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const MINUTE_VALUES = ['*', ...range(0, 59).map(String)];
const HOUR_VALUES = ['*', ...range(0, 23).map(String)];
const DOM_VALUES = ['*', ...range(1, 31).map(String)];
const MONTH_VALUES = ['*', ...range(1, 12).map(String)];
const DOW_VALUES = ['*', ...range(0, 6).map(String)];

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DOW_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function describe(minute: string, hour: string, dom: string, month: string, dow: string): string {
  if (minute === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') {
    return 'Runs every minute.';
  }
  const parts: string[] = [];
  if (month !== '*') parts.push(`in ${MONTH_NAMES[Number(month) - 1]}`);
  if (dow !== '*') parts.push(`on ${DOW_NAMES[Number(dow)]}s`);
  if (dom !== '*') parts.push(`on day ${dom} of the month`);
  if (hour !== '*') {
    parts.push(`at ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
  } else if (minute !== '*') {
    parts.push(`at minute ${minute} of every hour`);
  }

  const phrase = parts.length > 0 ? parts.join(' ') : 'every minute';
  return 'Runs ' + phrase + '.';
}

interface CronBuilderProps {
  minute: string;
  hour: string;
  dom: string;
  month: string;
  dow: string;
  setMinute: (v: string) => void;
  setHour: (v: string) => void;
  setDom: (v: string) => void;
  setMonth: (v: string) => void;
  setDow: (v: string) => void;
}

function Field({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <Box sx={{ minWidth: 110, flex: 1 }}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Select value={value} onChange={(e) => onChange(e.target.value)} size="small" fullWidth sx={{ fontFamily: 'monospace' }}>
        {options.map((o) => (
          <MenuItem key={o} value={o}>{o}</MenuItem>
        ))}
      </Select>
    </Box>
  );
}

const Presets = [
  { label: 'Every minute', expr: ['*', '*', '*', '*', '*'] },
  { label: 'Every hour', expr: ['0', '*', '*', '*', '*'] },
  { label: 'Every day at 9am', expr: ['0', '9', '*', '*', '*'] },
  { label: 'Every Monday', expr: ['0', '0', '*', '*', '1'] },
  { label: 'First of month', expr: ['0', '0', '1', '*', '*'] },
] as const;

const CronExpressionGeneratorContent = (props: CronBuilderProps) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(5, 1fr)' }, gap: 1.5 }}>
    <Field label="Minute" options={MINUTE_VALUES} value={props.minute} onChange={props.setMinute} />
    <Field label="Hour" options={HOUR_VALUES} value={props.hour} onChange={props.setHour} />
    <Field label="Day of Month" options={DOM_VALUES} value={props.dom} onChange={props.setDom} />
    <Field label="Month" options={MONTH_VALUES} value={props.month} onChange={props.setMonth} />
    <Field label="Day of Week" options={DOW_VALUES} value={props.dow} onChange={props.setDow} />
  </Box>
);

const CronExpressionGenerator = () => {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dom, setDom] = useState('*');
  const [month, setMonth] = useState('*');
  const [dow, setDow] = useState('*');
  const [copied, setCopied] = useState(false);

  const expr = `${minute} ${hour} ${dom} ${month} ${dow}`;
  const description = describe(minute, hour, dom, month, dow);

  const applyPreset = (values: readonly string[]) => {
    setMinute(values[0]);
    setHour(values[1]);
    setDom(values[2]);
    setMonth(values[3]);
    setDow(values[4]);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(expr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const content = (
    <>
      <Typography variant="h2">How does it work?</Typography>
      <Typography variant="body1">
        Build a standard 5-field cron expression without memorizing the syntax. Pick values for minute, hour, day
        of month, month, and day of week from the dropdowns (or leave one as <code>*</code> for "every"). The
        expression updates live along with a plain-English description.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting hour to 9 and minute to 0 (with everything else <code>*</code>) produces <code>0 9 * * *</code> — a
        job that runs once a day at 9:00 AM.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Writing scheduled jobs in CI/CD pipelines, Linux cron, and server maintenance scripts.</li>
          <li>Generating backup, report, or cleanup schedules without looking up the syntax.</li>
          <li>Learning how cron's five fields map to real schedules.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does the * mean?</Typography>
      <Typography variant="body1">
        An asterisk in a field means "every" — so <code>* * * * *</code> runs every minute of every day.
      </Typography>
      <Typography variant="h3">Does day of week start at 0 or 1?</Typography>
      <Typography variant="body1">
        Standard cron convention is 0 = Sunday through 6 = Saturday, which is what this generator uses.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/cron-expression-generator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 820, mx: 'auto' }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Presets.map((p) => (
            <Button key={p.label} size="small" variant="outlined" onClick={() => applyPreset(p.expr)}>
              {p.label}
            </Button>
          ))}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Configure Your Schedule</Typography>
          <CronExpressionGeneratorContent
            minute={minute} hour={hour} dom={dom} month={month} dow={dow}
            setMinute={setMinute} setHour={setHour} setDom={setDom} setMonth={setMonth} setDow={setDow}
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="caption" color="text.secondary">Cron Expression</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              value={expr}
              inputProps={{ readOnly: true, style: { fontFamily: 'monospace', fontSize: '1.25rem', letterSpacing: '2px' } }}
              size="medium"
              fullWidth
              sx={{ maxWidth: 380 }}
            />
            <Button startIcon={<ContentCopyIcon />} onClick={copy} variant="contained">
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
          <Typography variant="body1" mt={2}>{description}</Typography>
        </Paper>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CronExpressionGenerator;
