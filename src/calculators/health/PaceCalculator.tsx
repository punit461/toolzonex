'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PaceCalculator = () => {
  const [mode, setMode] = useState<'time-to-pace' | 'pace-to-time'>('time-to-pace');
  const [unit, setUnit] = useState<'km' | 'mi'>('km');

  const [distance, setDistance] = useState<string>('10');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('50');
  const [seconds, setSeconds] = useState<string>('0');

  const [paceMin, setPaceMin] = useState<string>('5');
  const [paceSec, setPaceSec] = useState<string>('0');

  const result = useMemo(() => {
    if (mode === 'time-to-pace') {
      const d = parseFloat(distance) || 0;
      const totalSec = (parseFloat(hours) || 0) * 3600 + (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0);
      if (d <= 0 || totalSec <= 0) return { paceText: '—', speed: '—' };
      const secPerUnit = totalSec / d;
      const m = Math.floor(secPerUnit / 60);
      const s = Math.round(secPerUnit % 60);
      const speed = (d / (totalSec / 3600)).toFixed(2);
      return {
        paceText: `${m}:${s.toString().padStart(2, '0')} /${unit}`,
        speed: `${speed} ${unit}/hr`,
      };
    } else {
      const d = parseFloat(distance) || 0;
      const pSecPerUnit = (parseFloat(paceMin) || 0) * 60 + (parseFloat(paceSec) || 0);
      if (d <= 0 || pSecPerUnit <= 0) return { paceText: '—', speed: '—' };
      const totalSec = d * pSecPerUnit;
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = Math.round(totalSec % 60);
      return {
        paceText: `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`,
        speed: '—',
      };
    }
  }, [mode, unit, distance, hours, minutes, seconds, paceMin, paceSec]);

  const content = (
    <>
      <Typography variant="h2">How to use?</Typography>
      <Typography variant="body1">
        Choose a mode: convert a distance and finish time into your pace (and speed),
        or enter a target pace and distance to find your predicted finish time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Running 10 km in 50:00 gives a pace of 5:00 /km and a speed of 12 km/hr.
        A 5:00 /km pace over 21.1 km predicts a finish time of about 1h 45m 30s.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a good running pace?</strong> It varies widely by fitness; recreational runners often average 5:30–7:00 /km.</li>
          <li><strong>Does it support miles?</strong> Yes — switch the unit to miles to compute pace in min/mi.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning race pacing and training runs.</li>
          <li>Estimating finish times for events.</li>
          <li>Tracking running speed improvements.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/health/pace-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Mode</InputLabel>
            <Select label="Mode" value={mode} onChange={(e) => setMode(e.target.value as any)}>
              <MenuItem value="time-to-pace">Time → Pace</MenuItem>
              <MenuItem value="pace-to-time">Pace → Time</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Unit</InputLabel>
            <Select label="Unit" value={unit} onChange={(e) => setUnit(e.target.value as 'km' | 'mi')}>
              <MenuItem value="km">Kilometers</MenuItem>
              <MenuItem value="mi">Miles</MenuItem>
            </Select>
          </FormControl>

          <TextField label="Distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">{unit}</InputAdornment> }} />

          {mode === 'time-to-pace' ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField label="Hr" type="number" value={hours} onChange={(e) => setHours(e.target.value)} fullWidth />
              <TextField label="Min" type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} fullWidth />
              <TextField label="Sec" type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} fullWidth />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField label="Pace Min" type="number" value={paceMin} onChange={(e) => setPaceMin(e.target.value)} fullWidth />
              <TextField label="Pace Sec" type="number" value={paceSec} onChange={(e) => setPaceSec(e.target.value)} fullWidth />
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">{mode === 'time-to-pace' ? 'Pace' : 'Finish Time'}</Typography>
            <Typography variant="h6" fontWeight="bold">{result.paceText}</Typography>
          </Paper>
          {result.speed !== '—' && (
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'secondary.main', color: 'white' }}>
              <Typography variant="h6">Speed</Typography>
              <Typography variant="h6" fontWeight="bold">{result.speed}</Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PaceCalculator;
