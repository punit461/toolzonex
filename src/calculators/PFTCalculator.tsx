'use client';

import { useState, useMemo } from 'react';
import {
  Box, Typography, TextField, InputAdornment, ToggleButtonGroup,
  ToggleButton, Chip
} from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

// Scoring tables based on Indian Army / NDA / CDS PFT standards
const RUN_SCORES: Record<string, { max: number; good: number; avg: number; label: string }> = {
  '1600m': { max: 390, good: 420, avg: 480, label: '1.6 km Run (seconds)' },   // 6:30 / 7:00 / 8:00
  '2400m': { max: 600, good: 660, avg: 720, label: '2.4 km Run (seconds)' },   // 10:00 / 11:00 / 12:00
};

const getRunGrade = (seconds: number, event: string) => {
  const s = RUN_SCORES[event];
  if (seconds <= s.max) return { grade: 'Outstanding', color: '#22c55e' };
  if (seconds <= s.good) return { grade: 'Good', color: '#84cc16' };
  if (seconds <= s.avg) return { grade: 'Average', color: '#eab308' };
  return { grade: 'Below Standard', color: '#ef4444' };
};

const getPushupGrade = (count: number) => {
  if (count >= 40) return { grade: 'Outstanding', color: '#22c55e' };
  if (count >= 30) return { grade: 'Good', color: '#84cc16' };
  if (count >= 20) return { grade: 'Average', color: '#eab308' };
  return { grade: 'Below Standard', color: '#ef4444' };
};

const getSitupGrade = (count: number) => {
  if (count >= 35) return { grade: 'Outstanding', color: '#22c55e' };
  if (count >= 25) return { grade: 'Good', color: '#84cc16' };
  if (count >= 15) return { grade: 'Average', color: '#eab308' };
  return { grade: 'Below Standard', color: '#ef4444' };
};

const toSeconds = (min: number, sec: number) => min * 60 + sec;

const PFTCalculator = () => {
  const [runEvent, setRunEvent] = useState<'1600m' | '2400m'>('1600m');
  const [runMin, setRunMin] = useState<number>(6);
  const [runSec, setRunSec] = useState<number>(30);
  const [pushups, setPushups] = useState<number>(30);
  const [situps, setSitups] = useState<number>(25);

  const totalSeconds = toSeconds(runMin, runSec);

  const runResult = useMemo(() => getRunGrade(totalSeconds, runEvent), [totalSeconds, runEvent]);
  const pushupResult = useMemo(() => getPushupGrade(pushups), [pushups]);
  const situpResult = useMemo(() => getSitupGrade(situps), [situps]);

  // Overall grade — worst of the three wins
  const grades = ['Outstanding', 'Good', 'Average', 'Below Standard'];
  const gradeOrder = [runResult.grade, pushupResult.grade, situpResult.grade];
  const overallGrade = grades.find(g => gradeOrder.includes(g)) ?? 'Below Standard';
  const overallColor = [runResult, pushupResult, situpResult].find(r => r.grade === overallGrade)?.color ?? '#ef4444';

  const content = (
    <>
      <Typography variant="h2">What is the PFT?</Typography>
      <Typography variant="body1">
        The Physical Fitness Test (PFT) is a standardised assessment used by the Indian Army, Navy, Air Force, NDA, CDS, and state police services to evaluate a candidate's physical fitness. It typically consists of a timed run, push-ups, and sit-ups.
      </Typography>

      <Typography variant="h2">Standard Benchmarks</Typography>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', mt: 1 }}>
        <thead>
          <tr>
            {['Event', 'Outstanding', 'Good', 'Average'].map(h => (
              <Box component="th" key={h} sx={{ textAlign: 'left', p: 1, borderBottom: '2px solid #E5E5E5', fontSize: '0.85rem', fontWeight: 700 }}>{h}</Box>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['1.6 km Run', '≤ 6:30', '≤ 7:00', '≤ 8:00'],
            ['2.4 km Run', '≤ 10:00', '≤ 11:00', '≤ 12:00'],
            ['Push-ups (2 min)', '≥ 40', '≥ 30', '≥ 20'],
            ['Sit-ups (2 min)', '≥ 35', '≥ 25', '≥ 15'],
          ].map(([ev, ...vals]) => (
            <tr key={ev}>
              <Box component="td" sx={{ p: 1, borderBottom: '1px solid #F0F0F0', fontWeight: 600, fontSize: '0.85rem' }}>{ev}</Box>
              {vals.map((v, i) => (
                <Box component="td" key={i} sx={{ p: 1, borderBottom: '1px solid #F0F0F0', fontSize: '0.85rem' }}>{v}</Box>
              ))}
            </tr>
          ))}
        </tbody>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title="PFT Calculator — Physical Fitness Test"
      description="Calculate your Physical Fitness Test (PFT) grade for Indian Army, NDA, CDS and defence recruitment."
      url="/health/pft-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          {/* Run event selector */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom sx={{ fontWeight: 600 }}>Running Event</Typography>
            <ToggleButtonGroup
              fullWidth
              exclusive
              value={runEvent}
              onChange={(_, v) => { if (v) setRunEvent(v); }}
              color="primary"
            >
              <ToggleButton value="1600m" sx={{ fontWeight: 600 }}>1.6 km (1600 m)</ToggleButton>
              <ToggleButton value="2400m" sx={{ fontWeight: 600 }}>2.4 km (2400 m)</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Run time */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom sx={{ fontWeight: 600 }}>{RUN_SCORES[runEvent].label}</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth label="Minutes" type="number"
                value={runMin}
                onChange={(e) => setRunMin(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment> } }}
              />
              <TextField
                fullWidth label="Seconds" type="number"
                value={runSec}
                onChange={(e) => setRunSec(Math.min(59, Number(e.target.value)))}
                onFocus={(e) => e.target.select()}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">sec</InputAdornment> } }}
              />
            </Box>
          </Box>

          {/* Push-ups */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom sx={{ fontWeight: 600 }}>Push-ups (in 2 minutes)</Typography>
            <TextField
              fullWidth type="number" label="Count"
              value={pushups}
              onChange={(e) => setPushups(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">reps</InputAdornment> } }}
            />
          </Box>

          {/* Sit-ups */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom sx={{ fontWeight: 600 }}>Sit-ups (in 2 minutes)</Typography>
            <TextField
              fullWidth type="number" label="Count"
              value={situps}
              onChange={(e) => setSitups(Number(e.target.value))}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">reps</InputAdornment> } }}
            />
          </Box>
        </Box>

        {/* Results */}
        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Overall Grade</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, color: overallColor, mb: 3 }}>
              {overallGrade}
            </Typography>

            {[
              { label: `${runEvent} Run (${runMin}:${String(runSec).padStart(2, '0')})`, result: runResult },
              { label: `Push-ups (${pushups} reps)`, result: pushupResult },
              { label: `Sit-ups (${situps} reps)`, result: situpResult },
            ].map(({ label, result }) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid #E5E5E5' }}>
                <Typography variant="body2" color="text.secondary">{label}</Typography>
                <Chip label={result.grade} size="small" sx={{ bgcolor: result.color, color: '#fff', fontWeight: 700 }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </CalculatorShell>
  );
};

export default PFTCalculator;
