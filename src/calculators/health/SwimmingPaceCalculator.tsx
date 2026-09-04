'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SwimmingPaceCalculator = () => {
  const [poolLength, setPoolLength] = useState<'25m' | '50m' | '25yd'>('25m');
  const [distance, setDistance] = useState<string>('400');
  const [minutes, setMinutes] = useState<string>('6');
  const [seconds, setSeconds] = useState<string>('40');

  const result = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const totalSec = (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0);
    if (d <= 0 || totalSec <= 0) return { pace100: '—', paceLength: '—' };

    const secPerUnit = totalSec / d;
    const unitLength = poolLength === '50m' ? 50 : 25;
    const label = poolLength === '25yd' ? 'yd' : 'm';
    const per100 = secPerUnit * 100;
    const m100 = Math.floor(per100 / 60);
    const s100 = Math.round(per100 % 60);

    const secPerLength = secPerUnit * unitLength;
    const mLen = Math.floor(secPerLength / 60);
    const sLen = Math.round(secPerLength % 60);

    return {
      pace100: `${m100}:${s100.toString().padStart(2, '0')} /100${label}`,
      paceLength: `${mLen > 0 ? mLen + ':' : ''}${sLen.toString().padStart(mLen > 0 ? 2 : 1, '0')} /${poolLength}`,
    };
  }, [poolLength, distance, minutes, seconds]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Swimming Pace Calculator</Typography>
      <Typography variant="body1">
        Enter the total distance you swam, your finish time, and your pool length, and this tool converts it
        into the two numbers swimmers actually train around: pace per 100m/100yd (the standard unit for
        comparing swim speed across any distance) and pace per pool length (useful for planning interval sets).
        This is distinct from the site&apos;s general running/walking <code>Pace Calculator</code>, which works
        in kilometers/miles and doesn&apos;t use pool-length-based splits.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Swimming 400m in a 25m pool in 6:40 gives a pace of 1:40 /100m — that&apos;s a 25-second average per
        length, which you can use to set target split times for interval training.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a set or race time into a standard per-100 pace for comparing across distances.</li>
          <li>Planning interval training sets with a target per-length split time.</li>
          <li>Tracking swim pace improvements over time in a consistent unit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why pace per 100m instead of per km, like running?</strong> Swimming is almost always measured and compared in 100m/100yd splits since pools are built in fixed lengths (25m, 50m, 25yd) — it&apos;s the standard unit competitive and fitness swimmers use, not distance per hour.</li>
          <li><strong>Does it matter if my pool is short-course (25m) or long-course (50m)?</strong> Yes for the per-length figure — a 50m pool length pace covers twice the distance of a 25m length, so make sure the pool length you select matches where you swam.</li>
          <li><strong>How is this different from the site&apos;s Pace Calculator?</strong> That tool is built around running/walking distance in kilometers or miles. This one is scoped specifically to swimming&apos;s pool-length-based training conventions.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/health/swimming-pace-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Pool Length</InputLabel>
            <Select label="Pool Length" value={poolLength} onChange={(e) => setPoolLength(e.target.value as '25m' | '50m' | '25yd')}>
              <MenuItem value="25m">25m (short course)</MenuItem>
              <MenuItem value="50m">50m (long course)</MenuItem>
              <MenuItem value="25yd">25 yards</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Distance Swum"
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            fullWidth
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField label="Min" type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} fullWidth />
            <TextField label="Sec" type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} fullWidth />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">Pace per 100</Typography>
            <Typography variant="h6" fontWeight="bold">{result.pace100}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'secondary.main', color: 'white' }}>
            <Typography variant="h6">Pace per Length</Typography>
            <Typography variant="h6" fontWeight="bold">{result.paceLength}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SwimmingPaceCalculator;
