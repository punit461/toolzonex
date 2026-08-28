'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const OhmsLawCalculator = () => {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');

  const result = useMemo(() => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);
    const P = parseFloat(power);

    const hasV = !Number.isNaN(V);
    const hasI = !Number.isNaN(I);
    const hasR = !Number.isNaN(R);
    const hasP = !Number.isNaN(P);

    let solved: { label: string; symbol: string; value: string } | null = null;

    if (hasV && hasI) {
      if (!hasR) solved = { label: 'Resistance', symbol: 'R', value: `${(V / I).toFixed(2)} Ω` };
    } else if (hasV && hasR) {
      if (R !== 0 && !hasI) solved = { label: 'Current', symbol: 'I', value: `${(V / R).toFixed(2)} A` };
      if (R !== 0 && !hasP) solved = { label: 'Power', symbol: 'P', value: `${(V * V / R).toFixed(2)} W` };
    } else if (hasP && hasV) {
      if (V !== 0 && !hasI) solved = { label: 'Current', symbol: 'I', value: `${(P / V).toFixed(2)} A` };
      if (P !== 0 && !hasR) solved = { label: 'Resistance', symbol: 'R', value: `${(V * V / P).toFixed(2)} Ω` };
    } else if (hasP && hasI) {
      if (I !== 0 && !hasV) solved = { label: 'Voltage', symbol: 'V', value: `${(P / I).toFixed(2)} V` };
      if (I !== 0 && !hasR) solved = { label: 'Resistance', symbol: 'R', value: `${(P / (I * I)).toFixed(2)} Ω` };
    } else if (hasP && hasR) {
      if (R !== 0 && !hasV) solved = { label: 'Voltage', symbol: 'V', value: `${Math.sqrt(P * R).toFixed(2)} V` };
      if (R !== 0 && !hasI) solved = { label: 'Current', symbol: 'I', value: `${Math.sqrt(P / R).toFixed(2)} A` };
    } else if (hasI && hasR) {
      if (!hasV) solved = { label: 'Voltage', symbol: 'V', value: `${(I * R).toFixed(2)} V` };
      if (!hasP) solved = { label: 'Power', symbol: 'P', value: `${(I * I * R).toFixed(2)} W` };
    }

    // Always include the known values that were entered directly
    const knownValues: { label: string; symbol: string; value: string }[] = [];
    if (hasV) knownValues.push({ label: 'Voltage', symbol: 'V', value: `${V} V` });
    if (hasI) knownValues.push({ label: 'Current', symbol: 'I', value: `${I} A` });
    if (hasR) knownValues.push({ label: 'Resistance', symbol: 'R', value: `${R} Ω` });
    if (hasP) knownValues.push({ label: 'Power', symbol: 'P', value: `${P} W` });

    const inputCount = Number(hasV) + Number(hasI) + Number(hasR) + Number(hasP);

    return { knownValues, solved, inputCount };
  }, [voltage, current, resistance, power]);

  const content = (
    <>
      <Typography variant="h2">What is Ohm's Law?</Typography>
      <Typography variant="body1">
        Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across those points. Combined with the power formulas, it lets you solve for any one quantity in a circuit when two others are known.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        V = I × R<br />
        P = V × I<br />
        P = I² × R<br />
        P = V² / R
      </Box>

      <Typography variant="h2">The Ohm's Law Wheel</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre' }}>
{`        ┌───────── V = I·R ─────────┐
   ┌───►│                         │◄──┐
   │    │      P = I·R²          │   │
   │    │                         │   │
   │    └───► V     I     R ─────┘   │
   │        │          ↕          │
   R = V/I  │   P = V²/R          │  I = V/R
   │        │          ↕          │
   │        └─── P     V     I ───┘   │
   │    ┌───►                         │
   └────┤   P = V·I   R = V²/P        │
        │    P = I²·R                 │
        └─────────────────────────────┘`}
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Leave one field blank and enter the others. For instance, if you know a 12 V supply drives 3 A, then R = 12/3 = 4 Ω and P = 12 × 3 = 36 W. Enter any two of V, I, R, P and the calculator finds the missing values.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a resistor to limit current to a safe level in an LED circuit.</li>
          <li>Estimating power dissipation to select an appropriately rated resistor.</li>
          <li>Designing and troubleshooting DC electronic circuits.</li>
          <li>Verifying component specifications against an unknown value.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many fields do I need to fill in?</Typography>
      <Typography variant="body1">
        Fill in any two of the four quantities — voltage (V), current (I), resistance (R), or power (P) — and the calculator determines the rest. Leave the unknown field blank.
      </Typography>
      <Typography variant="h3">Does Ohm's law apply to AC circuits?</Typography>
      <Typography variant="body1">
        This calculator assumes DC circuits. In AC circuits with reactive components (capacitors, inductors), impedance replaces simple resistance and phase angles come into play, so these formulas are only directly applicable for resistive AC loads like heaters or incandescent bulbs.
      </Typography>
      <Typography variant="h3">What if I enter values that don't match?</Typography>
      <Typography variant="body1">
        The calculator treats the blank field as the one to solve for. If the entered values are internally inconsistent, the result will simply reflect the combination you supplied — double-check your units (ohms, amps, volts, watts).
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ohms-law-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Voltage (V)" type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">V</InputAdornment> } }} fullWidth />
          <TextField label="Current (I)" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">A</InputAdornment> } }} fullWidth />
          <TextField label="Resistance (R)" type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">Ω</InputAdornment> } }} fullWidth />
          <TextField label="Power (P)" type="number" value={power} onChange={(e) => setPower(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Computed Value</Typography>
            <Typography variant="h5" fontWeight="bold">
              {result.solved ? `${result.solved.label}: ${result.solved.value}` : 'Enter 2+ values'}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>Known Values</Typography>
            {result.knownValues.length === 0 ? (
              <Typography variant="body2" color="text.secondary">None yet — enter at least two quantities.</Typography>
            ) : (
              result.knownValues.map((k) => (
                <Box key={k.symbol} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
                  <Typography variant="body2">{k.label} ({k.symbol})</Typography>
                  <Typography variant="body2" fontWeight={600}>{k.value}</Typography>
                </Box>
              ))
            )}
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>Derived Values</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Power (P = V·I)</Typography>
              <Typography variant="body2" fontWeight={600}>
                {(() => {
                  const V = parseFloat(voltage);
                  const I = parseFloat(current);
                  if (!Number.isNaN(V) && !Number.isNaN(I)) return `${(V * I).toFixed(2)} W`;
                  return '—';
                })()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Power (P = I²·R)</Typography>
              <Typography variant="body2" fontWeight={600}>
                {(() => {
                  const I = parseFloat(current);
                  const R = parseFloat(resistance);
                  if (!Number.isNaN(I) && !Number.isNaN(R)) return `${(I * I * R).toFixed(2)} W`;
                  return '—';
                })()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Power (P = V²/R)</Typography>
              <Typography variant="body2" fontWeight={600}>
                {(() => {
                  const V = parseFloat(voltage);
                  const R = parseFloat(resistance);
                  if (!Number.isNaN(V) && !Number.isNaN(R) && R !== 0) return `${(V * V / R).toFixed(2)} W`;
                  return '—';
                })()}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default OhmsLawCalculator;
