'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'H' | 'kH' | 'MH' | 'GH' | 'TH' | 'PH';
const UNIT_TO_HS: Record<Unit, number> = { H: 1, kH: 1e3, MH: 1e6, GH: 1e9, TH: 1e12, PH: 1e15 };
const UNIT_ORDER: Unit[] = ['H', 'kH', 'MH', 'GH', 'TH', 'PH'];

const formatHs = (hs: number) => {
  if (hs === 0) return '0';
  if (hs < 1000) return hs.toFixed(4);
  return hs.toLocaleString('en-US', { maximumFractionDigits: 4 });
};

const HashRateCalculatorContent = () => {
  const [value, setValue] = useState('110');
  const [unit, setUnit] = useState<Unit>('TH');
  const [difficultyT, setDifficultyT] = useState('95000');

  const hashRateHs = useMemo(() => (parseFloat(value) || 0) * UNIT_TO_HS[unit], [value, unit]);

  const conversions = useMemo(
    () => UNIT_ORDER.map((u) => ({ unit: u, value: hashRateHs / UNIT_TO_HS[u] })),
    [hashRateHs]
  );

  const timeEstimate = useMemo(() => {
    const difficulty = (parseFloat(difficultyT) || 0) * 1e12;
    if (hashRateHs <= 0 || difficulty <= 0) return null;
    const seconds = (difficulty * Math.pow(2, 32)) / hashRateHs;
    const days = seconds / 86400;
    const years = days / 365;
    return { seconds, days, years };
  }, [hashRateHs, difficultyT]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="subtitle1" fontWeight={600}>Hash Rate</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="Value" type="number" value={value} onChange={(e) => setValue(e.target.value)} fullWidth />
          <Select value={unit} onChange={(e) => setUnit(e.target.value as Unit)} sx={{ minWidth: 100 }}>
            {UNIT_ORDER.map((u) => (
              <MenuItem key={u} value={u}>{u}/s</MenuItem>
            ))}
          </Select>
        </Box>

        <Typography variant="subtitle1" fontWeight={600} mt={2}>Estimate Time to Find a Block (Optional)</Typography>
        <TextField
          label="Network Difficulty"
          type="number"
          value={difficultyT}
          onChange={(e) => setDifficultyT(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">T</InputAdornment> } }}
          helperText="Enter in trillions (T). Leave your hash rate above set to see the estimate."
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Converted Hash Rate</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableBody>
              {conversions.map((c) => (
                <TableRow key={c.unit} selected={c.unit === unit}>
                  <TableCell>{c.unit}/s</TableCell>
                  <TableCell align="right">{formatHs(c.value)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {timeEstimate && (
          <Paper sx={{ mt: 3, p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Average Time to Find a Block Solo</Typography>
            <Typography variant="h4" fontWeight="bold">
              {timeEstimate.years >= 1 ? `${timeEstimate.years.toFixed(1)} years` : `${timeEstimate.days.toFixed(1)} days`}
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const HashRateCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Hash Rate Calculator Work?</Typography>
      <Typography variant="body1">
        Hash rate measures how many hash calculations a mining device performs per second, and it&apos;s
        commonly quoted in wildly different units depending on the hardware — from plain H/s for small
        devices up to PH/s (petahashes per second) for large mining farms. Enter your hardware&apos;s
        hash rate and its unit, and the calculator instantly converts it into every other common unit:
        H/s, kH/s, MH/s, GH/s, TH/s, and PH/s.
      </Typography>
      <Typography variant="body1">
        Optionally, enter the current network difficulty to get a simplified estimate of how long it
        would statistically take your hardware to find a block on its own, using the formula: time
        (seconds) = difficulty × 2³² ÷ your hash rate in H/s.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A hash rate of 110 TH/s converts to 110,000 GH/s, 110,000,000 MH/s, and 0.11 PH/s. At a network
        difficulty of 95,000 T, that same hardware would take an estimated several years, on average,
        to find a block solo — which is exactly why most individual miners join a pool instead of
        mining alone.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting hash rate figures between units when comparing hardware from different spec sheets.</li>
          <li>Understanding roughly how competitive solo mining is at the current network difficulty.</li>
          <li>Sanity-checking a mining pool&apos;s reported hash rate against your hardware&apos;s rated speed.</li>
          <li>Explaining hash rate scale to someone new to mining terminology.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between kH, MH, GH, TH, and PH?</Typography>
      <Typography variant="body1">
        Each step is a thousand times larger than the last: 1 kH/s = 1,000 H/s, 1 MH/s = 1,000 kH/s, 1
        GH/s = 1,000 MH/s, 1 TH/s = 1,000 GH/s, and 1 PH/s = 1,000 TH/s. Modern ASIC miners are
        typically rated in TH/s or PH/s.
      </Typography>
      <Typography variant="h3">How accurate is the time-to-find-a-block estimate?</Typography>
      <Typography variant="body1">
        It&apos;s a simplified statistical average, not a prediction — block discovery is random
        (Poisson-distributed), so an individual miner could find a block far sooner or much later than
        the average. Difficulty also changes roughly every two weeks, which shifts the real-world
        figure over time.
      </Typography>
      <Typography variant="h3">Does a higher hash rate always mean more profit?</Typography>
      <Typography variant="body1">
        Not by itself — profit also depends on the hardware&apos;s power consumption, your electricity
        price, and pool fees. A more efficient miner with a lower hash rate can be more profitable than
        a faster one that draws far more power. Use a mining profitability calculator alongside this
        tool to see the full picture.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/hash-rate-calculator" content={content}>
      <HashRateCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HashRateCalculator;
