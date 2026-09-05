'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, MenuItem, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MONTHS = [
  { num: 1, name: 'January', abbr: 'Jan' },
  { num: 2, name: 'February', abbr: 'Feb' },
  { num: 3, name: 'March', abbr: 'Mar' },
  { num: 4, name: 'April', abbr: 'Apr' },
  { num: 5, name: 'May', abbr: 'May' },
  { num: 6, name: 'June', abbr: 'Jun' },
  { num: 7, name: 'July', abbr: 'Jul' },
  { num: 8, name: 'August', abbr: 'Aug' },
  { num: 9, name: 'September', abbr: 'Sep' },
  { num: 10, name: 'October', abbr: 'Oct' },
  { num: 11, name: 'November', abbr: 'Nov' },
  { num: 12, name: 'December', abbr: 'Dec' },
];

const MonthNameConverterContent = () => {
  const [monthNumber, setMonthNumber] = useState('9');
  const [monthName, setMonthName] = useState('September');

  const byNumber = useMemo(() => {
    const n = parseInt(monthNumber, 10);
    return MONTHS.find((m) => m.num === n) ?? null;
  }, [monthNumber]);

  const byName = useMemo(() => {
    return MONTHS.find((m) => m.name === monthName) ?? null;
  }, [monthName]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={2}>Number → Month Name</Typography>
        <TextField
          label="Month Number (1-12)"
          type="number"
          value={monthNumber}
          onChange={(e) => setMonthNumber(e.target.value)}
          fullWidth
          inputProps={{ min: 1, max: 12 }}
          sx={{ mb: 2 }}
        />
        {byNumber ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={700}>{byNumber.name}</Typography>
            <Typography variant="body2" color="text.secondary">Abbreviation: {byNumber.abbr}</Typography>
          </Paper>
        ) : (
          <Typography color="text.secondary">Enter a number from 1 to 12.</Typography>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={2}>Month Name → Number</Typography>
        <TextField
          select
          label="Month Name"
          value={monthName}
          onChange={(e) => setMonthName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          {MONTHS.map((m) => (
            <MenuItem key={m.num} value={m.name}>{m.name}</MenuItem>
          ))}
        </TextField>
        {byName && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Stack direction="row" justifyContent="center" spacing={4}>
              <Box>
                <Typography variant="body2" color="text.secondary">Number</Typography>
                <Typography variant="h5" fontWeight={700}>{byName.num}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Abbreviation</Typography>
                <Typography variant="h5" fontWeight={700}>{byName.abbr}</Typography>
              </Box>
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const MonthNameConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Month Name Converter</Typography>
      <Typography variant="body1">
        This is a bidirectional converter — use whichever direction you need. Type a month number from 1 to
        12 in the left box to get its full name and 3-letter abbreviation, or select a month name from the
        dropdown on the right to get its corresponding number and abbreviation. Both directions work
        independently and update instantly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;9&quot; on the left shows &quot;September&quot; with abbreviation &quot;Sep&quot;.
        Selecting &quot;March&quot; on the right shows number &quot;3&quot; with abbreviation
        &quot;Mar&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a numeric month field from a spreadsheet or database into a readable name.</li>
          <li>Looking up the standard 3-letter abbreviation for a month for date formatting.</li>
          <li>Converting a written month name back into its numeric form for form inputs or code.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are the two converters (number-to-name and name-to-number) linked?</strong> No — they work as two independent converters side by side, so you can look up a number-to-name conversion and a name-to-number conversion at the same time without one affecting the other.</li>
          <li><strong>What if I enter a number outside 1-12?</strong> The number-to-name side shows a prompt to enter a valid number, since only 1 through 12 correspond to actual months.</li>
          <li><strong>Are the abbreviations always exactly 3 letters?</strong> Yes — this tool uses the standard, widely recognized 3-letter month abbreviations (Jan, Feb, Mar, and so on) used in most date formats and calendars.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/month-name-converter" content={content}>
      <MonthNameConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MonthNameConverter;
