'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function pad(n: number) { return n < 10 ? '0' + n : String(n); }

function formatDate(d: Date, fmt: string): string {
  const dd = d.getDate();
  const mm = d.getMonth();
  const yyyy = d.getFullYear();
  const hh24 = d.getHours();
  const hh12 = hh24 % 12 || 12;
  const mm_ = d.getMinutes();
  const ss = d.getSeconds();
  const ampm = hh24 < 12 ? 'AM' : 'PM';

  return fmt
    .replace(/YYYY/g, String(yyyy))
    .replace(/YY/g, String(yyyy).slice(-2))
    .replace(/MMMM/g, MONTHS[mm])
    .replace(/MMM/g, MONTHS_SHORT[mm])
    .replace(/MM/g, pad(mm + 1))
    .replace(/DD/g, pad(dd))
    .replace(/D\b/g, String(dd))
    .replace(/HH/g, pad(hh24))
    .replace(/hh/g, pad(hh12))
    .replace(/mm/g, pad(mm_))
    .replace(/ss/g, pad(ss))
    .replace(/A/g, ampm);
}

const FORMATS = [
  { label: 'YYYY-MM-DD', fmt: 'YYYY-MM-DD' },
  { label: 'MM/DD/YYYY', fmt: 'MM/DD/YYYY' },
  { label: 'DD/MM/YYYY', fmt: 'DD/MM/YYYY' },
  { label: 'Month Day, Year', fmt: 'MMMM D, YYYY' },
  { label: 'DD Month YYYY', fmt: 'DD MMMM YYYY' },
  { label: 'YYYY-MM-DD HH:mm:ss', fmt: 'YYYY-MM-DD HH:mm:ss' },
  { label: 'Day, Month DD, YYYY', fmt: 'MMM DD, YYYY' },
  { label: 'DD/MM/YY', fmt: 'DD/MM/YY' },
];

const DateFormatterContent = () => {
  const today = new Date();
  const defaultStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  const [dateStr, setDateStr] = useState(defaultStr);
  const [showTime, setShowTime] = useState<'date' | 'datetime'>('date');

  const dateObj = useMemo(() => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }, [dateStr]);

  const outputs = useMemo(() => {
    if (!dateObj) return [];
    return FORMATS.map((f) => {
      let formatted = formatDate(dateObj, f.fmt);
      if (showTime === 'datetime') {
        formatted += ` ${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${pad(dateObj.getSeconds())}`;
      }
      return { label: f.label, value: formatted };
    });
  }, [dateObj, showTime]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          label="Select a date"
          type="date"
          value={dateStr}
          onChange={(e) => setDateStr(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 220 }}
        />
        <ToggleButtonGroup
          value={showTime}
          exclusive
          onChange={(_, v) => v && setShowTime(v)}
          size="small"
        >
          <ToggleButton value="date">Date Only</ToggleButton>
          <ToggleButton value="datetime">With Time</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {dateObj && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {outputs.map((o) => (
            <Paper key={o.label} variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" color="text.secondary">{o.label}</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>{o.value}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {!dateObj && dateStr && (
        <Typography color="error">Please enter a valid date.</Typography>
      )}
    </Box>
  );
};

const DateFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Date Formatter</Typography>
      <Typography variant="body1">
        Convert any date into multiple popular formats instantly. Select a date and see how it looks in ISO, US, European, and other styles — all rendered at once so you can copy the one you need.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Pick a date using the date picker. The tool immediately displays that date in eight common formats including ISO 8601, US style (MM/DD/YYYY), European style (DD/MM/YYYY), and written-out styles. Toggle the &quot;With Time&quot; option to include hours, minutes, and seconds.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting July 4, 2025 shows <code>2025-07-04</code>, <code>07/04/2025</code>, <code>04/07/2025</code>, and <code>July 4, 2025</code> — all generated from the same input.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Formatting dates for API payloads that expect ISO 8601.</li>
          <li>Converting US-style dates to European format (or vice versa) for international documents.</li>
          <li>Generating human-readable date strings for reports and emails.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this tool handle time zones?</Typography>
      <Typography variant="body1">
        The tool uses your browser&apos;s local date and time. The date you pick is interpreted in your system&apos;s time zone, and all formats reflect that same local time.
      </Typography>
      <Typography variant="h3">Can I include the time as well?</Typography>
      <Typography variant="body1">
        Yes — toggle the &quot;With Time&quot; button to append hours, minutes, and seconds (in 24-hour format) to every output format.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/date-formatter" content={content}>
      <DateFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DateFormatter;
