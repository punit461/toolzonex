'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TimeCalculatorContent = () => {
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  
  // Base Time
  const [baseDays, setBaseDays] = useState<string>('0');
  const [baseHours, setBaseHours] = useState<string>('0');
  const [baseMinutes, setBaseMinutes] = useState<string>('0');
  const [baseSeconds, setBaseSeconds] = useState<string>('0');

  // Time to add/subtract
  const [diffDays, setDiffDays] = useState<string>('0');
  const [diffHours, setDiffHours] = useState<string>('0');
  const [diffMinutes, setDiffMinutes] = useState<string>('0');
  const [diffSeconds, setDiffSeconds] = useState<string>('0');

  // Results
  const [resDays, setResDays] = useState<number>(0);
  const [resHours, setResHours] = useState<number>(0);
  const [resMinutes, setResMinutes] = useState<number>(0);
  const [resSeconds, setResSeconds] = useState<number>(0);

  const calculate = () => {
    const toSeconds = (d: string, h: string, m: string, s: string) => {
      return (
        (parseInt(d) || 0) * 86400 +
        (parseInt(h) || 0) * 3600 +
        (parseInt(m) || 0) * 60 +
        (parseInt(s) || 0)
      );
    };

    const baseSecs = toSeconds(baseDays, baseHours, baseMinutes, baseSeconds);
    const diffSecs = toSeconds(diffDays, diffHours, diffMinutes, diffSeconds);

    let totalSecs = operation === 'add' ? baseSecs + diffSecs : baseSecs - diffSecs;
    
    // Handle negative time
    let isNegative = false;
    if (totalSecs < 0) {
      isNegative = true;
      totalSecs = Math.abs(totalSecs);
    }

    const d = Math.floor(totalSecs / 86400);
    totalSecs %= 86400;
    const h = Math.floor(totalSecs / 3600);
    totalSecs %= 3600;
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;

    setResDays(isNegative ? -d : d);
    setResHours(isNegative && d === 0 ? -h : h);
    setResMinutes(isNegative && d === 0 && h === 0 ? -m : m);
    setResSeconds(isNegative && d === 0 && h === 0 && m === 0 ? -s : s);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 4 }}>
      
      <Box sx={{ maxWidth: 800, mx: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        
        {/* Base Time */}
        <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Base Time</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            <TextField label="Days" type="number" value={baseDays} onChange={e => setBaseDays(e.target.value)} size="small" />
            <TextField label="Hours" type="number" value={baseHours} onChange={e => setBaseHours(e.target.value)} size="small" />
            <TextField label="Minutes" type="number" value={baseMinutes} onChange={e => setBaseMinutes(e.target.value)} size="small" />
            <TextField label="Seconds" type="number" value={baseSeconds} onChange={e => setBaseSeconds(e.target.value)} size="small" />
          </Box>
        </Paper>

        {/* Operation */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Operation</InputLabel>
            <Select value={operation} label="Operation" onChange={e => setOperation(e.target.value as any)}>
              <MenuItem value="add">Add (+)</MenuItem>
              <MenuItem value="subtract">Subtract (-)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Diff Time */}
        <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Time to Add / Subtract</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            <TextField label="Days" type="number" value={diffDays} onChange={e => setDiffDays(e.target.value)} size="small" />
            <TextField label="Hours" type="number" value={diffHours} onChange={e => setDiffHours(e.target.value)} size="small" />
            <TextField label="Minutes" type="number" value={diffMinutes} onChange={e => setDiffMinutes(e.target.value)} size="small" />
            <TextField label="Seconds" type="number" value={diffSeconds} onChange={e => setDiffSeconds(e.target.value)} size="small" />
          </Box>
        </Paper>
        
        <Button variant="contained" size="large" onClick={calculate} fullWidth>
          Calculate
        </Button>

        {/* Result */}
        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="subtitle2" mb={1}>Result</Typography>
          <Typography variant="h4" fontWeight="bold">
            {resDays}d {resHours}h {resMinutes}m {resSeconds}s
          </Typography>
        </Paper>
        
      </Box>
    </Box>
  );
};

const TimeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to add or subtract time?</Typography>
      <Typography variant="body1">
        Adding or subtracting time can be tricky because time is not based on a decimal system (base-10). Instead, there are 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day. This calculator handles the base conversions automatically, allowing you to seamlessly add or subtract days, hours, minutes, and seconds.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Time Calculator"
      description="Add or subtract days, hours, minutes, and seconds easily. Free online time duration calculator."
      url="/utilities/time-calculator"
      content={content}
      category="Utilities"
    >
      <TimeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TimeCalculator;
