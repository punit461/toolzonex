'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CableLengthCalculatorContent = () => {
  const [distance, setDistance] = useState('75');
  const [slackPercent, setSlackPercent] = useState('15');

  const result = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const slack = parseFloat(slackPercent) || 0;
    if (d <= 0) return null;
    const extra = d * (slack / 100);
    const total = d + extra;
    return { extra, total };
  }, [distance, slackPercent]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Straight-Line Distance"
          type="number"
          fullWidth
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
        />
        <TextField
          label="Slack / Routing Allowance"
          type="number"
          fullWidth
          value={slackPercent}
          onChange={(e) => setSlackPercent(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Extra for corners, drops, and connections — 10-15% is typical"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Cable Length to Buy</Typography>
              <Typography variant="h2" fontWeight={800} color="primary.main">{result.total.toFixed(1)} ft</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Includes {result.extra.toFixed(1)} ft of slack allowance
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter a positive distance to calculate</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const CableLengthCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Estimate Total Cable Length</Typography>
      <Typography variant="body1">
        Measure (or estimate) the straight-line distance between where your cable starts and where it ends,
        then add a slack allowance to cover the fact that real cable runs are never perfectly straight — they
        go around corners, drop down walls, loop through conduit, and need a little extra at each end to
        actually reach the connector or terminal. This calculator adds that allowance as a percentage of the
        straight-line distance to give you a practical amount to buy.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Length = Distance × (1 + Slack% ÷ 100)
      </Box>
      <Typography variant="body1">
        Buying a bit extra cable is far cheaper than running short mid-job and having to make a second trip to
        the store — a small roll of spare cable costs a lot less than your time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A run measuring 75 ft in a straight line, with a 15% slack allowance for corners and connections,
        needs 75 × 1.15 = 86.25 ft of cable — round up to the nearest standard length when buying.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much network, speaker, or extension cable to buy for a room-to-room run.</li>
          <li>Planning cable purchases for a home theater, security camera, or networking installation.</li>
          <li>Budgeting cable length for a job before visiting the hardware store.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a wire gauge calculator?</Typography>
      <Typography variant="body1">
        This tool estimates how much total cable length to buy for a run. It doesn&apos;t determine what
        thickness (gauge) of wire you need for safety and voltage drop — for that, use our Wire Size
        Calculator, which sizes AWG gauge based on current and voltage drop over a given run length.
      </Typography>
      <Typography variant="h3">How much slack allowance should I use?</Typography>
      <Typography variant="body1">
        10-15% covers most straightforward runs with a few corners. Runs with many bends, obstacles, or where
        you need extra service loop at equipment racks may warrant 20% or more.
      </Typography>
      <Typography variant="h3">Should I round up the final number?</Typography>
      <Typography variant="body1">
        Yes — cable is typically sold in fixed roll or spool lengths, so round the calculated total up to the
        next available length rather than trying to buy an exact fractional amount.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cable-length-calculator" content={content}>
      <CableLengthCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CableLengthCalculator;
