'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, IconButton, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
  'eighteen', 'nineteen'];
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];

function numberToWords(n: number): string {
  if (n === 0) return 'twelve';
  if (n <= 19) return ones[n];
  return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

const TimeFormatter = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [period, setPeriod] = useState<'24h' | '12h'>('12h');

  const formats = useMemo(() => {
    const h24 = period === '12h' ? ((hours % 12) + (hours >= 12 ? 12 : 0)) || 12 : hours;
    const h12 = h24 % 12 || 12;
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    const epoch = (h24 * 3600 + minutes * 60 + seconds);
    const iso = `1970-01-01T${pad(h24)}:${pad(minutes)}:${pad(seconds)}Z`;

    const hourWord = numberToWords(h12 === 0 ? 12 : h12);
    const minWord = minutes === 0 ? "o'clock" : numberToWords(minutes);
    const words = `${hourWord} ${minWord} ${ampm.toLowerCase()}`;

    return {
      h24Full: `${pad(h24)}:${pad(minutes)}:${pad(seconds)}`,
      h12Full: `${h12}:${pad(minutes)}:${pad(seconds)} ${ampm}`,
      epoch: String(epoch),
      iso,
      words,
    };
  }, [hours, minutes, seconds, period]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const FormatRow = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{value}</Typography>
        <IconButton size="small" onClick={() => copyToClipboard(value)}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  const content = (
    <>
      <Typography variant="h2">How Does It Work?</Typography>
      <Typography variant="body1">
        Enter hours, minutes, and seconds, then choose between 12-hour (AM/PM) or 24-hour format.
        The tool instantly converts your time into five formats: 24-hour HH:MM:SS, 12-hour h:mm:ss AM/PM, epoch timestamp in seconds since midnight, ISO 8601 string, and a human-readable words format.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering 3:15 PM produces:<br />
        24h: 15:15:00 | 12h: 3:15:00 PM | Epoch: 54900 | ISO: 1970-01-01T15:15:00Z | Words: three fifteen pm
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting between 12-hour and 24-hour time formats for international coordination.</li>
          <li>Getting Unix epoch timestamps for midnight-relative time calculations.</li>
          <li>Generating ISO 8601 time strings for API payloads and log entries.</li>
          <li>Writing time in words for accessibility or natural-language UI elements.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is an epoch timestamp?</Typography>
      <Typography variant="body1">
        An epoch timestamp is the number of seconds elapsed since midnight UTC on January 1, 1970 (the Unix epoch). This tool calculates the offset from midnight for the entered time, not the full date-based timestamp.
      </Typography>
      <Typography variant="h3">Does this handle midnight (00:00 or 12:00 AM)?</Typography>
      <Typography variant="body1">
        Yes. In 24-hour format, midnight is 00:00:00. In 12-hour format, it displays as 12:00:00 AM.
      </Typography>
      <Typography variant="h3">Why use words format?</Typography>
      <Typography variant="body1">
        The words format is useful for screen readers, voice assistants, natural-language text, and any UI where a human-friendly time display is preferred over digital notation.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/time-formatter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="subtitle1" fontWeight="600">Enter Time</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Hours" type="number" size="small" value={hours} onChange={(e) => setHours(Math.max(0, Math.min(23, Number(e.target.value) || 0)))} inputProps={{ min: 0, max: 23 }} />
            <TextField label="Minutes" type="number" size="small" value={minutes} onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value) || 0)))} inputProps={{ min: 0, max: 59 }} />
            <TextField label="Seconds" type="number" size="small" value={seconds} onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value) || 0)))} inputProps={{ min: 0, max: 59 }} />
          </Box>
          <ToggleButtonGroup value={period} exclusive onChange={(_, v) => v && setPeriod(v)} size="small">
            <ToggleButton value="12h">12-hour (AM/PM)</ToggleButton>
            <ToggleButton value="24h">24-hour</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>Formatted Output</Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <FormatRow label="24-hour (HH:MM:SS)" value={formats.h24Full} />
            <FormatRow label="12-hour (h:mm:ss AM/PM)" value={formats.h12Full} />
            <FormatRow label="Epoch (seconds)" value={formats.epoch} />
            <FormatRow label="ISO 8601" value={formats.iso} />
            <FormatRow label="Words" value={formats.words} />
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TimeFormatter;
