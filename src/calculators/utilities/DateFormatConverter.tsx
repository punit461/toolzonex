'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function todayIso() {
  const d = new Date();
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const DateFormatConverterContent = () => {
  const [date, setDate] = useState(todayIso());

  const parsed = useMemo(() => {
    const parts = date.split('-').map(Number);
    if (parts.length !== 3 || parts.some((p) => isNaN(p))) return null;
    const [y, m, d] = parts;
    const parsedDate = new Date(y, m - 1, d);
    if (isNaN(parsedDate.getTime())) return null;
    return { y, m, d };
  }, [date]);

  const formats = useMemo(() => {
    if (!parsed) return null;
    const { y, m, d } = parsed;
    const mm = m.toString().padStart(2, '0');
    const dd = d.toString().padStart(2, '0');
    const monthName = MONTH_NAMES[m - 1];
    return [
      { label: 'MM/DD/YYYY (US)', value: `${mm}/${dd}/${y}` },
      { label: 'DD/MM/YYYY (International)', value: `${dd}/${mm}/${y}` },
      { label: 'YYYY-MM-DD (ISO 8601)', value: `${y}-${mm}-${dd}` },
      { label: 'Month DD, YYYY', value: `${monthName} ${d}, ${y}` },
      { label: 'DD Month YYYY', value: `${d} ${monthName} ${y}` },
    ];
  }, [parsed]);

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 3 }}
      />

      {formats ? (
        <Stack spacing={1.5}>
          {formats.map((f) => (
            <Paper key={f.label} variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">{f.label}</Typography>
              <Typography variant="h6" fontWeight={700}>{f.value}</Typography>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">Enter a valid date to see it in multiple formats.</Typography>
      )}
    </Box>
  );
};

const DateFormatConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Date Format Converter</Typography>
      <Typography variant="body1">
        Pick a date and it&apos;s instantly shown in five common formats side by side: US-style
        MM/DD/YYYY, international-style DD/MM/YYYY, ISO 8601&apos;s YYYY-MM-DD, a written &quot;Month DD,
        YYYY&quot; style, and a &quot;DD Month YYYY&quot; style common outside the US.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Picking September 5, 2026 shows: 09/05/2026, 05/09/2026, 2026-09-05, &quot;September 5, 2026&quot;,
        and &quot;5 September 2026&quot; — all representing the exact same date.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Avoiding MM/DD vs DD/MM confusion when communicating a date internationally.</li>
          <li>Converting a date into ISO 8601 format for a spreadsheet, database, or API.</li>
          <li>Writing a date out in full for a formal letter, invitation, or document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Why do MM/DD/YYYY and DD/MM/YYYY matter so much?</strong> The same numeric date can mean
            two different days depending on the convention — 03/04/2026 is March 4th in the US format but
            April 3rd in the international format — which is exactly why seeing them side by side helps
            avoid mistakes.
          </li>
          <li>
            <strong>What is ISO 8601 format used for?</strong> YYYY-MM-DD is an international standard
            designed to sort correctly as plain text and avoid regional ambiguity, which is why it&apos;s
            the standard format for databases, APIs, log files, and filenames.
          </li>
          <li>
            <strong>Does this account for time zones?</strong> No — the date you pick is treated as a
            calendar date only, with no time-of-day or time zone component, so the formatted output is the
            same regardless of your location.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/date-format-converter" content={content}>
      <DateFormatConverterContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default DateFormatConverter;
