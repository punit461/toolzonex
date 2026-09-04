'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'steps' | 'riser';

const StairStringerCalculator = () => {
  const [mode, setMode] = useState<Mode>('steps');
  const [totalRise, setTotalRise] = useState('108');
  const [numSteps, setNumSteps] = useState('14');
  const [targetRiser, setTargetRiser] = useState('7.5');
  const [targetRun, setTargetRun] = useState('10.5');

  const result = useMemo(() => {
    const rise = parseFloat(totalRise) || 0;
    const run = parseFloat(targetRun) || 0;

    let risers: number;
    if (mode === 'steps') {
      risers = Math.max(Math.round(parseFloat(numSteps) || 0), 1);
    } else {
      const target = parseFloat(targetRiser) || 7.5;
      risers = Math.max(Math.round(rise / target), 1);
    }

    const actualRiserHeight = rise / risers;
    const numTreads = Math.max(risers - 1, 0);
    const totalRun = numTreads * run;
    const stringerLength = Math.sqrt(rise * rise + totalRun * totalRun);
    const inComfortRange = actualRiserHeight >= 7 && actualRiserHeight <= 7.75;

    return { risers, actualRiserHeight, numTreads, totalRun, stringerLength, inComfortRange };
  }, [mode, totalRise, numSteps, targetRiser, targetRun]);

  const content = (
    <>
      <Typography variant="h2">How Stair Stringer Dimensions Are Calculated</Typography>
      <Typography variant="body1">
        Enter the total rise — the full floor-to-floor height the staircase needs to climb — and either the
        number of steps you want or a target riser height (most building codes call for risers between about 7
        and 7.75 inches for a comfortable climb). The tool divides the total rise evenly across that many
        risers, then uses your target tread depth (typically 10-11 inches) to work out the total run and the
        stringer length — the diagonal cut board that supports the stairs — via the Pythagorean theorem.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Actual Riser Height = Total Rise ÷ Number of Risers
        <br />
        Number of Treads = Number of Risers − 1
        <br />
        Total Run = Number of Treads × Tread Depth
        <br />
        Stringer Length = √(Total Rise² + Total Run²)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 108-inch total rise split into 14 steps gives an actual riser height of 108 ÷ 14 = 7.71 inches — within
        the comfortable range. With 13 treads at 10.5 inches each, the total run is 136.5 inches, and the
        stringer length works out to √(108² + 136.5²) ≈ 174 inches.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a deck, porch, or basement staircase before cutting stringers.</li>
          <li>Checking whether a planned step count keeps risers within a comfortable, code-friendly range.</li>
          <li>Estimating the length of stringer lumber needed for a job.</li>
          <li>Working backward from a desired riser height to find how many steps a staircase needs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What riser height is considered comfortable or code-compliant?</Typography>
      <Typography variant="body1">
        Most residential building codes call for a riser height between roughly 7 and 7.75 inches, with treads
        around 10-11 inches deep. This tool flags whether your calculated actual riser height falls in that
        typical comfort range — always confirm exact limits against your local building code before building.
      </Typography>
      <Typography variant="h3">Why is the number of treads one less than the number of risers?</Typography>
      <Typography variant="body1">
        The top riser brings you up to the level of the upper floor itself, which already acts as the final
        &quot;tread,&quot; so a staircase with a given number of risers only needs one fewer physical tread
        board.
      </Typography>
      <Typography variant="h3">Does the stringer length include extra length for the horizontal foot?</Typography>
      <Typography variant="body1">
        No — this calculates the theoretical diagonal length from the Pythagorean theorem using total rise and
        total run. In practice, always add extra length when cutting a real stringer board to account for the
        horizontal seat cut at the bottom and the thickness of the framing lumber it lands on.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/stair-stringer-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Rise (floor-to-floor height)"
            type="number"
            value={totalRise}
            onChange={(e) => setTotalRise(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />

          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth>
            <ToggleButton value="steps">By Number of Steps</ToggleButton>
            <ToggleButton value="riser">By Target Riser Height</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'steps' ? (
            <TextField
              label="Desired Number of Steps"
              type="number"
              value={numSteps}
              onChange={(e) => setNumSteps(e.target.value)}
              fullWidth
            />
          ) : (
            <TextField
              label="Target Riser Height"
              type="number"
              value={targetRiser}
              onChange={(e) => setTargetRiser(e.target.value)}
              fullWidth
              helperText="Standard comfort range: about 7-7.75 in"
              slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
            />
          )}

          <TextField
            label="Target Tread Depth (run)"
            type="number"
            value={targetRun}
            onChange={(e) => setTargetRun(e.target.value)}
            fullWidth
            helperText="Standard comfort range: about 10-11 in"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Stringer Length</Typography>
            <Typography variant="h3" fontWeight="bold">{result.stringerLength.toFixed(1)} in</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Number of Risers</Typography>
            <Typography fontWeight={600}>{result.risers}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Actual Riser Height</Typography>
            <Typography fontWeight={600}>{result.actualRiserHeight.toFixed(2)} in</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Number of Treads</Typography>
            <Typography fontWeight={600}>{result.numTreads}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Run</Typography>
            <Typography fontWeight={600}>{result.totalRun.toFixed(1)} in</Typography>
          </Paper>
          {!result.inComfortRange && (
            <Alert severity="warning">
              The actual riser height falls outside the typical 7-7.75 in comfort range. Adjust the number of
              steps or total rise for a more comfortable, code-friendly stair.
            </Alert>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StairStringerCalculator;
