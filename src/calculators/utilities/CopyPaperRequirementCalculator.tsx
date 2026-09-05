'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem, FormControlLabel, Switch } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PERIODS = [
  { key: 'day', label: 'Day' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
];

const CopyPaperRequirementCalculator = () => {
  const [pages, setPages] = useState('500');
  const [period, setPeriod] = useState('week');
  const [doubleSided, setDoubleSided] = useState(false);
  const [sheetsPerReam, setSheetsPerReam] = useState('500');
  const [reamsPerCase, setReamsPerCase] = useState('10');

  const selectedPeriod = PERIODS.find((p) => p.key === period)!;
  const p = parseFloat(pages) || 0;
  const spr = parseFloat(sheetsPerReam) || 1;
  const rpc = parseFloat(reamsPerCase) || 1;

  const sheetsNeeded = doubleSided ? p / 2 : p;
  const reamsNeeded = spr > 0 ? Math.ceil(sheetsNeeded / spr) : 0;
  const casesNeeded = rpc > 0 ? Math.ceil(reamsNeeded / rpc) : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Copy Paper Requirement Calculator</Typography>
      <Typography variant="body1">
        Enter how many pages you print per day, week, or month using the period selector, and turn on the
        double-sided toggle if you print duplex — that halves the sheet count needed for the same page count.
        Then enter how many sheets come in a ream and how many reams come in a case (defaults of 500 sheets per
        ream and 10 reams per case are standard) to see how many reams and cases you need for that period.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Sheets Needed = Pages / (2 if double-sided, else 1)<br />
        Reams Needed = ⌈Sheets Needed / Sheets per Ream⌉<br />
        Cases Needed = ⌈Reams Needed / Reams per Case⌉
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Printing 500 pages a week single-sided needs 500 sheets, which rounds up to 1 ream (at 500 sheets per
        ream) — well under a full case of 10 reams. Switching to double-sided cuts that to 250 sheets, still 1
        ream, but uses half as much paper for the same page count.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many reams or cases of paper an office needs to order for a period.</li>
          <li>Seeing how much switching to double-sided printing would reduce paper consumption.</li>
          <li>Budgeting paper supply costs based on expected printing volume.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this account for printer jams or wasted sheets?</strong> No — this calculates the theoretical minimum sheets needed based on page count alone. In practice, ordering a small buffer above the calculated amount is a good idea to cover misprints, jams, and test pages.</li>
          <li><strong>Why round reams and cases up instead of down?</strong> Paper is normally only sold in whole reams and whole cases, so rounding up (using the ceiling of the division) ensures you order enough to cover your actual printing needs rather than falling slightly short.</li>
          <li><strong>Does double-sided printing always exactly halve sheet count?</strong> For an even number of pages, yes — two pages print on one sheet. For an odd number of pages, the final sheet only has one side printed, but the difference is negligible at any meaningful print volume.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/copy-paper-requirement-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Pages Printed" type="number" value={pages} onChange={(e) => setPages(e.target.value)} fullWidth />
          <TextField select label="Per" value={period} onChange={(e) => setPeriod(e.target.value)} fullWidth>
            {PERIODS.map((pr) => (
              <MenuItem key={pr.key} value={pr.key}>{pr.label}</MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={<Switch checked={doubleSided} onChange={(e) => setDoubleSided(e.target.checked)} />}
            label="Double-sided printing"
          />
          <TextField label="Sheets per Ream" type="number" value={sheetsPerReam} onChange={(e) => setSheetsPerReam(e.target.value)} fullWidth />
          <TextField label="Reams per Case" type="number" value={reamsPerCase} onChange={(e) => setReamsPerCase(e.target.value)} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result (per {selectedPeriod.label})</Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Sheets Needed</Typography>
              <Typography variant="h6" fontWeight="bold">{Math.ceil(sheetsNeeded)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Reams Needed</Typography>
              <Typography variant="h6" fontWeight="bold">{reamsNeeded}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Cases Needed</Typography>
              <Typography variant="h6" fontWeight="bold">{casesNeeded}</Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CopyPaperRequirementCalculator;
