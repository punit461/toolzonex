import { useState, useMemo } from 'react';
import { Box, Typography, TextField, InputAdornment, Chip } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

// Indian Army CFT Standards (approximate)
// Events: 5 mile run + ammo can lift (30 lb) + maneuver under fire

interface GradeResult { grade: string; color: string }

const getGrade = (value: number, outstanding: number, good: number, avg: number, higherIsBetter = true): GradeResult => {
  if (higherIsBetter) {
    if (value >= outstanding) return { grade: 'Outstanding', color: '#22c55e' };
    if (value >= good) return { grade: 'Good', color: '#84cc16' };
    if (value >= avg) return { grade: 'Average', color: '#eab308' };
    return { grade: 'Below Standard', color: '#ef4444' };
  } else {
    // lower is better (time events)
    if (value <= outstanding) return { grade: 'Outstanding', color: '#22c55e' };
    if (value <= good) return { grade: 'Good', color: '#84cc16' };
    if (value <= avg) return { grade: 'Average', color: '#eab308' };
    return { grade: 'Below Standard', color: '#ef4444' };
  }
};

const toSeconds = (min: number, sec: number) => min * 60 + sec;

const CFTCalculator = () => {
  // 5-mile tactical march
  const [marchMin, setMarchMin] = useState<number>(75);
  const [marchSec, setMarchSec] = useState<number>(0);

  // Ammo can lifts (30 lb overhead, 2 minutes)
  const [ammoCan, setAmmoCan] = useState<number>(60);

  // 300m shuttle run (seconds)
  const [shuttleMin, setShuttleMin] = useState<number>(1);
  const [shuttleSec, setShuttleSec] = useState<number>(20);

  // Farmer carry / casualty drag (metres per minute - simulated as reps)
  const [dragReps, setDragReps] = useState<number>(3);

  const marchTotal = useMemo(() => toSeconds(marchMin, marchSec), [marchMin, marchSec]);
  const shuttleTotal = useMemo(() => toSeconds(shuttleMin, shuttleSec), [shuttleMin, shuttleSec]);

  // Grades for each event
  const marchGrade = useMemo(() => getGrade(marchTotal, 4200, 4800, 5400, false), [marchTotal]);      // 70:00 / 80:00 / 90:00
  const ammoGrade = useMemo(() => getGrade(ammoCan, 80, 60, 40, true), [ammoCan]);
  const shuttleGrade = useMemo(() => getGrade(shuttleTotal, 70, 80, 95, false), [shuttleTotal]);     // 1:10 / 1:20 / 1:35
  const dragGrade = useMemo(() => getGrade(dragReps, 5, 4, 3, true), [dragReps]);

  const grades = ['Outstanding', 'Good', 'Average', 'Below Standard'];
  const allGrades = [marchGrade.grade, ammoGrade.grade, shuttleGrade.grade, dragGrade.grade];
  const overallGrade = grades.find(g => allGrades.includes(g)) ?? 'Below Standard';
  const overallColor = [marchGrade, ammoGrade, shuttleGrade, dragGrade].find(r => r.grade === overallGrade)?.color ?? '#ef4444';

  const fmt = (min: number, sec: number) => `${min}:${String(sec).padStart(2, '0')}`;

  const content = (
    <>
      <Typography variant="h2">What is the CFT?</Typography>
      <Typography variant="body1">
        The Combat Fitness Test (CFT) evaluates a soldier's ability to perform physically demanding tasks under simulated combat conditions. It is a more advanced and operationally realistic test compared to the standard Physical Fitness Test (PFT). Indian Army and paramilitary forces use CFT to assess combat readiness.
      </Typography>

      <Typography variant="h2">CFT Events</Typography>
      <ul>
        <li><strong>Tactical March (5 miles / ~8 km):</strong> A timed march in full combat gear, testing endurance and load-bearing capacity.</li>
        <li><strong>Ammo Can Lifts:</strong> Overhead pressing a 30 lb ammunition can for 2 minutes — simulates re-loading and supply tasks.</li>
        <li><strong>300m Shuttle Run:</strong> A 300-metre sprint with direction changes, simulating tactical movement on the battlefield.</li>
        <li><strong>Casualty Drag:</strong> Dragging a simulated casualty a set distance, testing functional strength under pressure.</li>
      </ul>

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
            ['Tactical March (5 mi)', '≤ 70:00', '≤ 80:00', '≤ 90:00'],
            ['Ammo Can Lifts', '≥ 80 reps', '≥ 60 reps', '≥ 40 reps'],
            ['300m Shuttle Run', '≤ 1:10', '≤ 1:20', '≤ 1:35'],
            ['Casualty Drag', '≥ 5 sets', '≥ 4 sets', '≥ 3 sets'],
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

  const events = [
    { label: `Tactical March (${fmt(marchMin, marchSec)})`, result: marchGrade },
    { label: `Ammo Can Lifts (${ammoCan} reps)`, result: ammoGrade },
    { label: `300m Shuttle (${fmt(shuttleMin, shuttleSec)})`, result: shuttleGrade },
    { label: `Casualty Drag (${dragReps} sets)`, result: dragGrade },
  ];

  return (
    <CalculatorShell
      title="CFT Calculator — Combat Fitness Test"
      description="Calculate your Combat Fitness Test (CFT) grade for Indian Army and paramilitary forces."
      url="/health/cft-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          {/* Tactical March */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom sx={{ fontWeight: 600 }}>Tactical March Time (5 miles / ~8 km)</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Minutes" type="number" value={marchMin}
                onChange={(e) => setMarchMin(Number(e.target.value))} onFocus={(e) => e.target.select()}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment> } }}
              />
              <TextField fullWidth label="Seconds" type="number" value={marchSec}
                onChange={(e) => setMarchSec(Math.min(59, Number(e.target.value)))} onFocus={(e) => e.target.select()}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">sec</InputAdornment> } }}
              />
            </Box>
          </Box>

          {/* Ammo Can */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom sx={{ fontWeight: 600 }}>Ammo Can Lifts (30 lb, 2 minutes)</Typography>
            <TextField fullWidth type="number" label="Repetitions" value={ammoCan}
              onChange={(e) => setAmmoCan(Number(e.target.value))} onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">reps</InputAdornment> } }}
            />
          </Box>

          {/* 300m Shuttle */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom sx={{ fontWeight: 600 }}>300m Shuttle Run Time</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField fullWidth label="Minutes" type="number" value={shuttleMin}
                onChange={(e) => setShuttleMin(Number(e.target.value))} onFocus={(e) => e.target.select()}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">min</InputAdornment> } }}
              />
              <TextField fullWidth label="Seconds" type="number" value={shuttleSec}
                onChange={(e) => setShuttleSec(Math.min(59, Number(e.target.value)))} onFocus={(e) => e.target.select()}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">sec</InputAdornment> } }}
              />
            </Box>
          </Box>

          {/* Casualty Drag */}
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom sx={{ fontWeight: 600 }}>Casualty Drag (completed sets)</Typography>
            <TextField fullWidth type="number" label="Sets completed" value={dragReps}
              onChange={(e) => setDragReps(Number(e.target.value))} onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">sets</InputAdornment> } }}
            />
          </Box>
        </Box>

        {/* Results */}
        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Combat Readiness Grade</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, color: overallColor, mb: 3 }}>
              {overallGrade}
            </Typography>

            {events.map(({ label, result }) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: '1px solid #E5E5E5' }}>
                <Typography variant="body2" color="text.secondary">{label}</Typography>
                <Chip label={result.grade} size="small" sx={{ bgcolor: result.color, color: '#fff', fontWeight: 700 }} />
              </Box>
            ))}

            <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
              * Overall grade is determined by your lowest performing event.
            </Typography>
          </Box>
        </Box>
      </Box>
    </CalculatorShell>
  );
};

export default CFTCalculator;
