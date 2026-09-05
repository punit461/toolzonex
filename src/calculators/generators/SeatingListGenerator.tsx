'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SeatingListGeneratorContent = () => {
  const [namesText, setNamesText] = useState(
    'Alex Johnson\nPriya Patel\nSam Lee\nJordan Kim\nMaria Garcia\nChris Evans\nTaylor Brooks\nNina Roy\nOmar Ali\nEmily Chen'
  );
  const [seatsPerTable, setSeatsPerTable] = useState('4');

  const { tables, guestCount } = useMemo(() => {
    const names = namesText
      .split('\n')
      .map((n) => n.trim())
      .filter(Boolean);
    const perTable = Math.max(1, parseInt(seatsPerTable, 10) || 1);
    const result: string[][] = [];
    for (let i = 0; i < names.length; i += perTable) {
      result.push(names.slice(i, i + perTable));
    }
    return { tables: result, guestCount: names.length };
  }, [namesText, seatsPerTable]);

  const copyChart = async () => {
    const lines = tables.map((t, i) => `Table ${i + 1}:\n${t.map((n) => `  - ${n}`).join('\n')}`);
    try {
      await navigator.clipboard.writeText(lines.join('\n\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Guest Names (one per line)"
          value={namesText}
          onChange={(e) => setNamesText(e.target.value)}
          fullWidth
          multiline
          minRows={10}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Seats Per Table"
          type="number"
          value={seatsPerTable}
          onChange={(e) => setSeatsPerTable(e.target.value)}
          fullWidth
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {guestCount} guest{guestCount !== 1 ? 's' : ''} across {tables.length} table{tables.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Seating Chart</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyChart} disabled={tables.length === 0}>
            Copy
          </Button>
        </Stack>
        <Stack spacing={1.5}>
          {tables.map((table, i) => (
            <Paper key={i} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} mb={0.5}>Table {i + 1}</Typography>
              <ul style={{ margin: 0 }}>
                {table.map((name) => <li key={name}>{name}</li>)}
              </ul>
            </Paper>
          ))}
          {tables.length === 0 && <Typography variant="body2" color="text.secondary">Enter guest names to build a seating chart.</Typography>}
        </Stack>
      </Box>
    </Box>
  );
};

const SeatingListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Seating List Generator</Typography>
      <Typography variant="body1">
        Paste your guest names, one per line, into the text area, and set how many seats each table holds. The
        tool automatically assigns guests to numbered tables by filling Table 1 to capacity first, then Table
        2, and so on down the list, producing a complete seating chart grouped by table number.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 10 guest names and 4 seats per table, the tool fills Table 1 with the first 4 names, Table 2 with
        the next 4, and Table 3 with the final 2 names — three tables total for 10 guests.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly generating a first-draft seating chart for a wedding reception or banquet.</li>
          <li>Assigning conference or workshop attendees to numbered discussion tables.</li>
          <li>Splitting a large guest list into even groups for a classroom or team-building event.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Wedding Seating Calculator?</strong> The Wedding Seating Calculator only calculates how many tables you&apos;d need from a total guest count across a few standard table sizes — it doesn&apos;t know any names. This Seating List Generator goes a step further and actually assigns your specific named guests to specific numbered tables.</li>
          <li><strong>Can I control which specific guests sit together?</strong> Not directly — assignment is purely sequential based on the order you list names, so reorder your guest list (grouping people who should sit together next to each other) before generating the chart to influence table groupings.</li>
          <li><strong>What happens if the last table isn&apos;t full?</strong> That&apos;s expected — the final table simply gets whatever names are left over, which may be fewer than your seats-per-table setting.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/seating-list-generator" content={content}>
      <SeatingListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SeatingListGenerator;
