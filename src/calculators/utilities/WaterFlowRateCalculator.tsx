'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type VolumeUnit = 'gallons' | 'liters';

const WaterFlowRateCalculatorContent = () => {
  const [unit, setUnit] = useState<VolumeUnit>('gallons');
  const [volume, setVolume] = useState('5');
  const [seconds, setSeconds] = useState('20');

  const result = useMemo(() => {
    const v = parseFloat(volume) || 0;
    const t = parseFloat(seconds) || 0;
    if (t <= 0) return { gpm: 0, lpm: 0 };

    const volumeGallons = unit === 'gallons' ? v : v / 3.78541;
    const volumeLiters = unit === 'gallons' ? v * 3.78541 : v;

    const gpm = (volumeGallons / t) * 60;
    const lpm = (volumeLiters / t) * 60;

    return { gpm, lpm };
  }, [unit, volume, seconds]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, val) => val && setUnit(val)} size="small" fullWidth>
          <ToggleButton value="gallons">Gallons</ToggleButton>
          <ToggleButton value="liters">Liters</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label={`Volume Collected (${unit})`}
          type="number" fullWidth value={volume}
          onChange={(e) => setVolume(e.target.value)} onFocus={(e) => e.target.select()}
          helperText="e.g. how much a bucket held when you timed it filling up"
        />
        <TextField
          label="Time Taken (seconds)"
          type="number" fullWidth value={seconds}
          onChange={(e) => setSeconds(e.target.value)} onFocus={(e) => e.target.select()}
        />
      </Box>

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">Flow Rate</Typography>
        <Typography variant="h4" color="primary" fontWeight={800}>{result.gpm.toFixed(2)} GPM</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>{result.lpm.toFixed(2)} L/min</Typography>
      </Paper>
    </Box>
  );
};

const WaterFlowRateCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Water Flow Rate Calculator Works</Typography>
      <Typography variant="body1">
        This is the easiest way to measure real-world flow rate without knowing any pipe diameter or pressure
        figures: fill a container of known volume (like a 5-gallon bucket) from the tap, faucet, or hose you
        want to measure, time how many seconds it takes to fill, and enter both numbers here. The calculator
        converts that into a standard flow rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Flow Rate (GPM) = (Volume Collected ÷ Time in Seconds) × 60
      </Box>
      <Typography variant="body1">
        If you already know your pipe&apos;s diameter and the fluid&apos;s velocity and want to calculate flow
        rate from those instead, see our separate Pipe Flow Calculator, which uses the pipe cross-sectional
        area formula rather than a timed measurement.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Filling a 5-gallon bucket in 20 seconds gives a flow rate of (5 ÷ 20) × 60 = 15 gallons per minute
        (about 56.8 liters per minute).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a faucet, showerhead, or hose&apos;s actual flow rate at home.</li>
          <li>Measuring well or irrigation output without specialized flow meter equipment.</li>
          <li>Diagnosing low water pressure by comparing measured flow to expected fixture ratings.</li>
          <li>Estimating how long a tank will take to fill at a measured flow rate.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why measure flow rate this way instead of from pipe diameter?</Typography>
      <Typography variant="body1">
        Calculating flow from pipe diameter and velocity requires knowing the fluid&apos;s velocity, which
        most people can&apos;t easily measure at home. Timing how long it takes to fill a known-volume
        container is a simple, practical measurement anyone can do with just a bucket and a stopwatch, and it
        captures the real-world effects of pressure and restrictions that a theoretical pipe calculation might
        miss.
      </Typography>
      <Typography variant="h3">Does the container size matter for accuracy?</Typography>
      <Typography variant="body1">
        A larger container measured over a longer time generally gives a more accurate average flow rate,
        since it smooths out small timing errors. A 1-gallon container timed over just a couple of seconds is
        more sensitive to stopwatch reaction time than a 5-gallon bucket timed over 20+ seconds.
      </Typography>
      <Typography variant="h3">Will the flow rate stay constant over time?</Typography>
      <Typography variant="body1">
        Not necessarily — water pressure can fluctuate with other fixtures being used simultaneously, well
        pump cycling, or municipal supply changes. Take a few measurements at different times for a more
        reliable picture of typical flow rate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/water-flow-rate-calculator" content={content}>
      <WaterFlowRateCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WaterFlowRateCalculator;
