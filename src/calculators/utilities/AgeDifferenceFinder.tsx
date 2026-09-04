'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function dateDiff(d1: Date, d2: Date) {
  const [early, late] = d1 <= d2 ? [d1, d2] : [d2, d1];

  let y = late.getFullYear() - early.getFullYear();
  let m = late.getMonth() - early.getMonth();
  let d = late.getDate() - early.getDate();

  if (d < 0) {
    m--;
    const prevMonth = new Date(late.getFullYear(), late.getMonth(), 0);
    d += prevMonth.getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }

  return { years: y, months: m, days: d };
}

const AgeDifferenceFinder = () => {
  const [dateA, setDateA] = useState('1990-06-15');
  const [dateB, setDateB] = useState('1993-02-20');
  const [nameA, setNameA] = useState('Person A');
  const [nameB, setNameB] = useState('Person B');

  const result = useMemo(() => {
    const d1 = new Date(dateA);
    const d2 = new Date(dateB);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const diff = dateDiff(d1, d2);
    const older = d1 <= d2 ? (nameA || 'Person A') : (nameB || 'Person B');
    const younger = d1 <= d2 ? (nameB || 'Person B') : (nameA || 'Person A');
    const sameDate = d1.getTime() === d2.getTime();

    return { ...diff, older, younger, sameDate };
  }, [dateA, dateB, nameA, nameB]);

  const content = (
    <>
      <Typography variant="h2">How the Age Difference Finder Works</Typography>
      <Typography variant="body1">
        Enter both people&apos;s birthdates (and optionally their names for a clearer result). The tool
        calculates the absolute gap between the two dates in years, months, and days using standard
        calendar-aware date math — the same approach a regular age calculator uses, but applied between two
        arbitrary birthdates instead of one birthdate and today&apos;s date. It also tells you which of the
        two is older.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Someone born 15 June 1990 and someone born 20 February 1993 are 2 years, 8 months, and 5 days apart —
        with the person born in 1990 being the older of the two.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking the age gap between partners, siblings, or friends.</li>
          <li>Working out sibling spacing when planning a family.</li>
          <li>Settling a friendly debate about exactly how much older one person is than another.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Age Calculator?</strong> The Age Calculator computes one person&apos;s current age by comparing their birthdate to today. This Age Difference Finder instead computes the gap between two people&apos;s birthdates directly — useful for relationship age-gap checks or sibling spacing, regardless of what today&apos;s date is.</li>
          <li><strong>Does the order I enter the two dates matter?</strong> No — the tool always calculates the absolute difference and tells you which date is older, so entering the dates in either order gives the same result.</li>
          <li><strong>Does it account for leap years?</strong> Yes — the calculation correctly handles leap years and varying month lengths, the same way a standard age calculator does.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/age-difference-finder" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Name (optional)" value={nameA} onChange={(e) => setNameA(e.target.value)} fullWidth />
          <TextField
            label="Person A's Birthdate"
            type="date"
            value={dateA}
            onChange={(e) => setDateA(e.target.value)}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField label="Name (optional)" value={nameB} onChange={(e) => setNameB(e.target.value)} fullWidth />
          <TextField
            label="Person B's Birthdate"
            type="date"
            value={dateB}
            onChange={(e) => setDateB(e.target.value)}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>

        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {result ? (
            result.sameDate ? (
              <Typography variant="h6" textAlign="center">Both dates are the same — no age difference.</Typography>
            ) : (
              <>
                <Typography variant="h6" color="text.secondary" gutterBottom>Age Difference</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, textAlign: 'center' }}>
                  {result.years}y {result.months}m {result.days}d
                </Typography>
                <Typography variant="body1" textAlign="center">
                  <strong>{result.older}</strong> is older than <strong>{result.younger}</strong>.
                </Typography>
              </>
            )
          ) : (
            <Typography color="text.secondary">Enter both dates to see the difference.</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AgeDifferenceFinder;
