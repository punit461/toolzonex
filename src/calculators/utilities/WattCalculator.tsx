'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WattCalculator = () => {
  const [watts, setWatts] = useState<string>('');
  const [amps, setAmps] = useState<string>('');
  const [volts, setVolts] = useState<string>('');

  const filledFields = [watts !== '', amps !== '', volts !== ''].filter(Boolean).length;

  const result = useMemo(() => {
    const W = watts !== '' ? Number(watts) : NaN;
    const I = amps !== '' ? Number(amps) : NaN;
    const V = volts !== '' ? Number(volts) : NaN;

    if (filledFields < 2) return null;

    let calcW = W, calcI = I, calcV = V;

    if (isNaN(W) && !isNaN(V) && !isNaN(I)) {
      calcW = V * I;
    } else if (isNaN(I) && !isNaN(W) && !isNaN(V) && V !== 0) {
      calcI = W / V;
    } else if (isNaN(V) && !isNaN(W) && !isNaN(I) && I !== 0) {
      calcV = W / I;
    } else {
      return null;
    }

    if (calcI === 0) return null;

    const resistance = calcV / calcI;
    const energyPerHour = calcW;

    return { watts: calcW, amps: calcI, volts: calcV, resistance, energyPerHour };
  }, [watts, amps, volts, filledFields]);

  const content = (
    <>
      <Typography variant="h2">How is Power (Watts) Calculated?</Typography>
      <Typography variant="body1">
        Electrical power in watts is calculated by multiplying voltage by current. Leave any one of the
        three fields (watts, amps, or volts) blank and fill in the other two to calculate the missing
        value. This uses the fundamental electrical formulas W = V × I, V = W / I, and I = W / V.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        W = V × I &nbsp;&nbsp;|&nbsp;&nbsp; V = W / I &nbsp;&nbsp;|&nbsp;&nbsp; I = W / V &nbsp;&nbsp;|&nbsp;&nbsp; R = V / I
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A device draws 2 amps at 120 volts. Power = 120 × 2 = 240 watts. The resistance is 120 / 2 = 60 Ω.
        Running this device for one hour consumes 240 watt-hours (Wh) of energy.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out the wattage of an appliance when you only know its voltage and current draw.</li>
          <li>Determining how much current a device needs given its power rating and supply voltage.</li>
          <li>Calculating energy cost — multiply watt-hours by your electricity rate to estimate running cost.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between watts and watt-hours?</Typography>
      <Typography variant="body1">
        Watts (W) measure instantaneous power — how fast energy is being used. Watt-hours (Wh) measure
        energy consumed over time. A 100W bulb running for 3 hours uses 300 Wh of energy.
      </Typography>
      <Typography variant="h3">Can I use this for DC and AC circuits?</Typography>
      <Typography variant="body1">
        The basic formulas W = V × I work for DC circuits and for AC circuits with a pure resistive load
        (power factor of 1). For AC circuits with reactive loads, you would need to account for the power
        factor, which this calculator does not include.
      </Typography>
      <Typography variant="h3">What is resistance and why is it shown?</Typography>
      <Typography variant="body1">
        Resistance (measured in ohms, Ω) is the opposition to current flow. It is calculated using Ohm's
        law R = V / I and is useful for understanding the electrical characteristics of the circuit.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/watt-calculator" content={content}>
      <Stack spacing={3}>
        {filledFields >= 2 && (
          <Alert severity="info" variant="outlined">
            Leave exactly one field blank to calculate it.
          </Alert>
        )}

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Watts (W)"
              type="number"
              fullWidth
              value={watts}
              onChange={(e) => setWatts(e.target.value)}
              onFocus={(e) => e.target.select()}
              helperText={result ? `= ${result.volts.toFixed(2)} V × ${result.amps.toFixed(2)} A` : ''}
            />
            <TextField
              label="Amps (A)"
              type="number"
              fullWidth
              value={amps}
              onChange={(e) => setAmps(e.target.value)}
              onFocus={(e) => e.target.select()}
              helperText={result ? `= ${result.watts.toFixed(2)} W / ${result.volts.toFixed(2)} V` : ''}
            />
            <TextField
              label="Volts (V)"
              type="number"
              fullWidth
              value={volts}
              onChange={(e) => setVolts(e.target.value)}
              onFocus={(e) => e.target.select()}
              helperText={result ? `= ${result.watts.toFixed(2)} W / ${result.amps.toFixed(2)} A` : ''}
            />
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Typography variant="h6" gutterBottom>Results</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Power</Typography>
                <Typography variant="h5" color="primary" fontWeight={700}>{result.watts.toFixed(2)} W</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Current</Typography>
                <Typography variant="h5" color="primary" fontWeight={700}>{result.amps.toFixed(2)} A</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Voltage</Typography>
                <Typography variant="h5" color="primary" fontWeight={700}>{result.volts.toFixed(2)} V</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Resistance</Typography>
                <Typography variant="h5" fontWeight={700}>{result.resistance.toFixed(2)} Ω</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Energy/Hour</Typography>
                <Typography variant="h5" fontWeight={700}>{result.energyPerHour.toFixed(2)} Wh</Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WattCalculator;
