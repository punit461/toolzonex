'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Direction = 'paceToSpeed' | 'speedToPace';
type Unit = 'mile' | 'km';

const PaceToSpeedCalculator = () => {
  const [direction, setDirection] = useState<Direction>('paceToSpeed');
  const [unit, setUnit] = useState<Unit>('mile');
  const [paceMin, setPaceMin] = useState<string>('8');
  const [paceSec, setPaceSec] = useState<string>('0');
  const [speed, setSpeed] = useState<string>('7.5');

  const unitLabel = unit === 'mile' ? 'mile' : 'km';
  const speedUnit = unit === 'mile' ? 'mph' : 'km/h';

  const min = parseFloat(paceMin);
  const sec = parseFloat(paceSec);
  const spd = parseFloat(speed);

  let resultSpeed: number | null = null;
  let resultPaceMin = 0;
  let resultPaceSec = 0;

  if (direction === 'paceToSpeed' && !isNaN(min) && !isNaN(sec) && (min > 0 || sec > 0)) {
    const totalMinutes = min + sec / 60;
    resultSpeed = 60 / totalMinutes;
  } else if (direction === 'speedToPace' && !isNaN(spd) && spd > 0) {
    const paceDecimal = 60 / spd;
    resultPaceMin = Math.floor(paceDecimal);
    resultPaceSec = Math.round((paceDecimal - resultPaceMin) * 60);
    if (resultPaceSec === 60) {
      resultPaceSec = 0;
      resultPaceMin += 1;
    }
  }

  const content = (
    <>
      <Typography variant="h2">How to Convert Pace to Speed (and Back)</Typography>
      <Typography variant="body1">
        Pace (time per mile or kilometer) and speed (distance per hour) describe the same thing two different
        ways. This calculator converts between them: enter a pace in minutes and seconds per unit distance to
        get speed, or enter a speed to get the equivalent pace.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Speed = 60 ÷ Pace (minutes) &nbsp;|&nbsp; Pace (minutes) = 60 ÷ Speed
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A pace of 8:00 minutes per mile converts to a speed of 60 ÷ 8 = 7.5 mph. Going the other way, a speed of
        7.5 mph converts back to a pace of 60 ÷ 7.5 = 8.00 minutes per mile, or 8:00.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a treadmill&apos;s speed setting into a familiar running pace, or vice versa.</li>
          <li>Planning race splits from a target finish time and distance.</li>
          <li>Comparing running or walking pace across mile-based and kilometer-based training plans.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is pace different from speed?</Typography>
      <Typography variant="body1">
        Pace expresses how long it takes to cover one unit of distance (like 8 minutes per mile), while speed
        expresses how much distance is covered in one unit of time (like 7.5 miles per hour). They&apos;re
        inversely related — a faster pace (smaller number) means a higher speed, and vice versa.
      </Typography>
      <Typography variant="h3">Does it matter whether I use miles or kilometers?</Typography>
      <Typography variant="body1">
        The math is identical either way — only the label changes. Just make sure the pace and speed you&apos;re
        comparing use the same distance unit, since a mile pace and a kilometer pace aren&apos;t directly
        comparable without converting.
      </Typography>
      <Typography variant="h3">What if my seconds value is 60 or higher?</Typography>
      <Typography variant="body1">
        Enter seconds between 0 and 59 and carry any extra time into the minutes field instead — for example,
        enter a pace of 8 minutes 75 seconds as 9 minutes 15 seconds.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pace-to-speed-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          <ToggleButtonGroup value={direction} exclusive onChange={(_, v) => v && setDirection(v)} size="small">
            <ToggleButton value="paceToSpeed">Pace &rarr; Speed</ToggleButton>
            <ToggleButton value="speedToPace">Speed &rarr; Pace</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small">
            <ToggleButton value="mile">Mile</ToggleButton>
            <ToggleButton value="km">Kilometer</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper variant="outlined" sx={{ p: 3 }}>
          {direction === 'paceToSpeed' ? (
            <Stack direction="row" spacing={2}>
              <TextField label="Minutes" type="number" fullWidth value={paceMin} onChange={(e) => setPaceMin(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Seconds" type="number" fullWidth value={paceSec} onChange={(e) => setPaceSec(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
          ) : (
            <TextField label={`Speed (${speedUnit})`} type="number" fullWidth value={speed} onChange={(e) => setSpeed(e.target.value)} onFocus={(e) => e.target.select()} />
          )}
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Result</Typography>
          {direction === 'paceToSpeed' ? (
            <Typography variant="h4" color="primary" fontWeight={700}>
              {resultSpeed !== null ? `${resultSpeed.toFixed(2)} ${speedUnit}` : '—'}
            </Typography>
          ) : (
            <Typography variant="h4" color="primary" fontWeight={700}>
              {!isNaN(spd) && spd > 0 ? `${resultPaceMin}:${String(resultPaceSec).padStart(2, '0')} / ${unitLabel}` : '—'}
            </Typography>
          )}
        </Paper>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PaceToSpeedCalculator;
