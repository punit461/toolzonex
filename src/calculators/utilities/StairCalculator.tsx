'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const StairCalculator = () => {
  const [totalRise, setTotalRise] = useState('108');
  const [riserHeight, setRiserHeight] = useState('7.5');
  const [treadDepth, setTreadDepth] = useState('10');

  const result = useMemo(() => {
    const rise = parseFloat(totalRise) || 0;
    const desiredRiser = parseFloat(riserHeight) || 7.5;
    const desiredTread = parseFloat(treadDepth) || 10;

    const steps = rise > 0 && desiredRiser > 0 ? Math.ceil(rise / desiredRiser) : 0;
    const actualRiser = steps > 0 ? rise / steps : 0;
    const totalRun = steps * desiredTread;
    const stringerLength = Math.sqrt(rise * rise + totalRun * totalRun);

    return { steps, actualRiser, totalRun, stringerLength, treadDepth: desiredTread };
  }, [totalRise, riserHeight, treadDepth]);

  const stairDiagram = useMemo(() => {
    const maxSteps = Math.min(result.steps, 15);
    if (maxSteps === 0) return '';
    let diagram = '';
    for (let i = 0; i < maxSteps; i++) {
      const indent = '  '.repeat(i);
      diagram += `${indent}┌──────┐\n`;
      diagram += `${indent}│ step ${i + 1} │\n`;
    }
    const finalIndent = '  '.repeat(maxSteps);
    diagram += `${finalIndent}└──────┘`;
    return diagram;
  }, [result.steps]);

  const content = (
    <>
      <Typography variant="h2">How is a Staircase Calculated?</Typography>
      <Typography variant="body1">
        A stair calculator determines the number of steps, actual riser height, total run, and stringer length for your staircase. It ensures your stairs meet building codes and are comfortable to use.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Steps = ⌈Total Rise / Desired Riser Height⌉
        <br />
        Actual Riser = Total Rise / Steps
        <br />
        Total Run = Steps × Tread Depth
        <br />
        Stringer Length = √(Rise² + Run²)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a 108-inch rise with 7.5-inch risers and 10-inch treads, you need 15 steps with an actual riser of 7.2 inches. The total run is 150 inches and the stringer length is about 184 inches (15.3 feet).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a home renovation or new staircase build.</li>
          <li>Ensuring compliance with local building codes (typical riser: 7–7.75 inches).</li>
          <li>Calculating materials needed for stringers, treads, and risers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the standard riser height?</Typography>
      <Typography variant="body1">
        Most building codes require risers between 4 and 7.75 inches, with 7 to 7.5 inches being the most comfortable and common range for residential stairs.
      </Typography>
      <Typography variant="h3">What is a stringer?</Typography>
      <Typography variant="body1">
        A stringer is the structural support member that runs along the side of the staircase, cut to hold the treads and risers. Its length determines the diagonal span of your stairs.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/stair-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Total Rise" type="number" value={totalRise} onChange={(e) => setTotalRise(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">inches</InputAdornment> } }} fullWidth />
          <TextField label="Desired Riser Height" type="number" value={riserHeight} onChange={(e) => setRiserHeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">inches</InputAdornment> } }} fullWidth />
          <TextField label="Desired Tread Depth" type="number" value={treadDepth} onChange={(e) => setTreadDepth(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">inches</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Number of Steps</Typography>
            <Typography variant="h3" fontWeight="bold">{result.steps}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Actual Riser Height</Typography>
            <Typography fontWeight={600}>{result.actualRiser.toFixed(2)} inches</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Run</Typography>
            <Typography fontWeight={600}>{result.totalRun.toFixed(1)} inches</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Stringer Length</Typography>
            <Typography fontWeight={600}>{result.stringerLength.toFixed(1)} inches</Typography>
          </Paper>
        </Box>
      </Box>

      {stairDiagram && (
        <Paper sx={{ mt: 3, p: 2, fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'pre', overflowX: 'auto' }}>
          <Typography variant="subtitle2" mb={1}>Stair Diagram</Typography>
          {stairDiagram}
        </Paper>
      )}

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default StairCalculator;
