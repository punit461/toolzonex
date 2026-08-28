'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RESISTOR_COLORS = [
  { band: '0', color: 'Black', value: 0 },
  { band: '1', color: 'Brown', value: 1 },
  { band: '2', color: 'Red', value: 2 },
  { band: '3', color: 'Orange', value: 3 },
  { band: '4', color: 'Yellow', value: 4 },
  { band: '5', color: 'Green', value: 5 },
  { band: '6', color: 'Blue', value: 6 },
  { band: '7', color: 'Violet', value: 7 },
  { band: '8', color: 'Grey', value: 8 },
  { band: '9', color: 'White', value: 9 },
];

const ResistanceCalculator = () => {
  const [mode, setMode] = useState<string>('R');
  const [v, setV] = useState<string>('');
  const [i, setI] = useState<string>('');
  const [r, setR] = useState<string>('');
  const [p, setP] = useState<string>('');

  const result = useMemo(() => {
    const voltage = Number(v);
    const current = Number(i);
    const resistance = Number(r);
    const power = Number(p);

    let out: { ohms: number; watts: number } | null = null;

    if (mode === 'R') {
      if (!voltage || !current || current < 0) return null;
      out = { ohms: voltage / current, watts: voltage * current };
    } else if (mode === 'V') {
      if (!current || !resistance || current < 0) return null;
      out = { ohms: resistance, watts: current * current * resistance };
    } else if (mode === 'I') {
      if (!voltage || !resistance || resistance <= 0) return null;
      out = { ohms: resistance, watts: (voltage * voltage) / resistance };
    } else if (mode === 'P') {
      if (!power || !current || current < 0) return null;
      out = { ohms: power / (current * current), watts: power };
    }

    return out;
  }, [mode, v, i, r, p]);

  const content = (
    <>
      <Typography variant="h2">How is Resistance Calculated?</Typography>
      <Typography variant="body1">
        Electrical resistance is calculated using Ohm's law: R = V / I, where V is the voltage in volts and
        I is the current in amps. The power dissipated by the circuit is P = V × I. Depending on which two
        values you know, the calculator can find resistance, voltage, or current.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If a 12 V supply pushes a current of 2 A through a circuit, the resistance is 12 / 2 = 6 ohms, and
        the power is 12 × 2 = 24 watts.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing the correct resistor value for LEDs and other components.</li>
          <li>Checking that a circuit won't exceed the power rating of a component.</li>
          <li>Verifying the current drawn by an appliance from a known voltage and resistance.</li>
        </ul>
      </Box>

      <Typography variant="h2">Resistor Color Code Reference</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          {RESISTOR_COLORS.map((c) => (
            <li key={c.band}>{c.color} = {c.value}</li>
          ))}
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does Ohm's law state?</Typography>
      <Typography variant="body1">
        Ohm's law states that the current through a conductor between two points is directly proportional to
        the voltage and inversely proportional to the resistance: V = I × R.
      </Typography>
      <Typography variant="h3">How do I read a resistor color code?</Typography>
      <Typography variant="body1">
        Each color represents a digit (0-9), and the first two bands spell out the significant digits, the
        third is the multiplier, and the fourth is the tolerance. For example, brown-black-red = 1 0 × 100 =
        1000 ohms.
      </Typography>
      <Typography variant="h3">Why does power matter when choosing a resistor?</Typography>
      <Typography variant="body1">
        A resistor converts electrical energy to heat. If the power (P = V × I) exceeds the resistor's
        power rating (usually 1/8 W to 1 W), it will overheat and can burn out.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/resistance-calculator" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Calculate</InputLabel>
              <Select value={mode} label="Calculate" onChange={(e) => setMode(e.target.value)}>
                <MenuItem value="R">Resistance from Voltage &amp; Current</MenuItem>
                <MenuItem value="V">Voltage from Current &amp; Resistance</MenuItem>
                <MenuItem value="I">Current from Voltage &amp; Resistance</MenuItem>
                <MenuItem value="P">Resistance from Power &amp; Current</MenuItem>
              </Select>
            </FormControl>
            {(mode === 'R' || mode === 'P') && (
              <TextField label="Voltage (V)" type="number" fullWidth value={v} onChange={(e) => setV(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {(mode === 'V' || mode === 'R' || mode === 'P') && (
              <TextField label="Current (A)" type="number" fullWidth value={i} onChange={(e) => setI(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {mode === 'V' && (
              <TextField label="Resistance (Ω)" type="number" fullWidth value={r} onChange={(e) => setR(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {mode === 'I' && (
              <>
                <TextField label="Voltage (V)" type="number" fullWidth value={v} onChange={(e) => setV(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Resistance (Ω)" type="number" fullWidth value={r} onChange={(e) => setR(e.target.value)} onFocus={(e) => e.target.select()} />
              </>
            )}
            {mode === 'P' && (
              <TextField label="Power (W)" type="number" fullWidth value={p} onChange={(e) => setP(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Resistance</Typography>
                <Typography variant="h5" fontWeight={700}>{result.ohms.toFixed(2)} Ω</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Power</Typography>
                <Typography variant="h5" fontWeight={700}>{result.watts.toFixed(2)} W</Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ResistanceCalculator;
