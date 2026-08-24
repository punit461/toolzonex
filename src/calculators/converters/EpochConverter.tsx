'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function toDateFromTimestamp(raw: string, unit: 'seconds' | 'ms'): Date | null {
  if (!raw.trim()) return null;
  const num = Number(raw.trim());
  if (!Number.isFinite(num)) return null;
  const ms = unit === 'seconds' ? num * 1000 : num;
  const date = new Date(ms);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatUTC(date: Date): string {
  return date.toUTCString();
}

function formatLocal(date: Date): string {
  return date.toString();
}

const EpochConverterContent = () => {
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const [tsInput, setTsInput] = useState('');
  const [tsUnit, setTsUnit] = useState<'seconds' | 'ms'>('seconds');
  const tsDate = useMemo(() => toDateFromTimestamp(tsInput, tsUnit), [tsInput, tsUnit]);

  const [dateInput, setDateInput] = useState('');
  const { epochSeconds, epochMs } = useMemo(() => {
    if (!dateInput) return { epochSeconds: null as number | null, epochMs: null as number | null };
    const parsed = new Date(dateInput);
    if (Number.isNaN(parsed.getTime())) return { epochSeconds: null as number | null, epochMs: null as number | null };
    return { epochSeconds: Math.floor(parsed.getTime() / 1000), epochMs: parsed.getTime() };
  }, [dateInput]);

  const copy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>Current Unix Timestamp</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'monospace' }}>
          {nowMs !== null ? Math.floor(nowMs / 1000) : '—'}
        </Typography>
        <Button
          size="small"
          sx={{ mt: 1 }}
          startIcon={<ContentCopyIcon />}
          onClick={() => copy(nowMs !== null ? String(Math.floor(nowMs / 1000)) : '')}
          disabled={nowMs === null}
        >
          Copy
        </Button>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Timestamp → Date</Typography>
          <TextField
            fullWidth
            label="Unix timestamp"
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder="e.g. 1735689600"
            sx={{ mb: 1.5 }}
          />
          <ToggleButtonGroup
            color="primary"
            value={tsUnit}
            exclusive
            onChange={(_, v) => v && setTsUnit(v)}
            size="small"
            sx={{ mb: 2 }}
          >
            <ToggleButton value="seconds">Seconds</ToggleButton>
            <ToggleButton value="ms">Milliseconds</ToggleButton>
          </ToggleButtonGroup>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">UTC</Typography>
            <Typography sx={{ fontWeight: 600, mb: 1.5, wordBreak: 'break-word' }}>{tsDate ? formatUTC(tsDate) : '—'}</Typography>
            <Typography variant="body2" color="text.secondary">Local Time</Typography>
            <Typography sx={{ fontWeight: 600, wordBreak: 'break-word' }}>{tsDate ? formatLocal(tsDate) : '—'}</Typography>
          </Paper>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Date → Timestamp</Typography>
          <TextField
            fullWidth
            type="datetime-local"
            label="Local date & time"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Seconds</Typography>
                <Typography sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{epochSeconds ?? '—'}</Typography>
              </Box>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(epochSeconds !== null ? String(epochSeconds) : '')} disabled={epochSeconds === null}>
                Copy
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Milliseconds</Typography>
                <Typography sx={{ fontWeight: 600, fontFamily: 'monospace' }}>{epochMs ?? '—'}</Typography>
              </Box>
              <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(epochMs !== null ? String(epochMs) : '')} disabled={epochMs === null}>
                Copy
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

const EpochConverter = () => {
  const content = (
    <>
      <Typography variant="h2">What Is a Unix Timestamp?</Typography>
      <Typography variant="body1">
        A Unix timestamp (also called epoch time) is the number of seconds that have elapsed since midnight UTC
        on January 1, 1970 — the &quot;Unix epoch&quot;. It&apos;s widely used in programming and databases
        because it represents a point in time as a single, timezone-independent number.
      </Typography>

      <Typography variant="h2">How to Use This Epoch Converter</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>The live current Unix timestamp updates every second at the top of the page.</li>
          <li>To convert a timestamp to a date, enter it and choose whether it&apos;s in seconds or milliseconds — the UTC and local time appear instantly.</li>
          <li>To convert a date to a timestamp, pick a date and time — the equivalent Unix timestamp in both seconds and milliseconds appears instantly.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The Unix timestamp <code>1704067200</code> (in seconds) corresponds to <code>Mon, 01 Jan 2024 00:00:00 GMT</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Debugging API responses, log files, or database records that store dates as Unix timestamps.</li>
          <li>Converting a timestamp from code (JavaScript, Python, or a database) into a human-readable date.</li>
          <li>Generating a timestamp for a specific date and time to use in a script or API request.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Seconds or milliseconds — how do I know which one I have?</Typography>
      <Typography variant="body1">
        A timestamp in seconds for a recent date has 10 digits (e.g. 1704067200), while the same moment in
        milliseconds has 13 digits (e.g. 1704067200000). If your conversion produces a date far in the past or
        future, try switching the unit toggle.
      </Typography>
      <Typography variant="h3">Why do I see two different times — UTC and local?</Typography>
      <Typography variant="body1">
        A Unix timestamp itself has no timezone; it&apos;s the same absolute moment everywhere. UTC shows that
        moment in Coordinated Universal Time, while Local Time shows it converted to your browser&apos;s
        detected timezone, so you can read it either way.
      </Typography>
      <Typography variant="h3">Does the current timestamp update automatically?</Typography>
      <Typography variant="body1">
        Yes — the current Unix timestamp shown at the top refreshes every second, so it always reflects the
        current time.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/epoch-converter" content={content}>
      <EpochConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EpochConverter;
