'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const wireGauges: { gauge: string; resistance: number }[] = [
  { gauge: '14 AWG', resistance: 2.525 },
  { gauge: '12 AWG', resistance: 1.588 },
  { gauge: '10 AWG', resistance: 0.999 },
  { gauge: '8 AWG', resistance: 0.628 },
  { gauge: '6 AWG', resistance: 0.395 },
];

const VoltageDropCalculator = () => {
  const [length, setLength] = useState('100');
  const [wireGauge, setWireGauge] = useState('12 AWG');
  const [current, setCurrent] = useState('15');
  const [voltage, setVoltage] = useState('120');

  const result = useMemo(() => {
    const L = parseFloat(length) || 0;
    const R = wireGauges.find((w) => w.gauge === wireGauge)?.resistance ?? 1.588;
    const I = parseFloat(current) || 0;
    const V = parseFloat(voltage) || 120;

    const vd = (2 * L * I * R) / 1000;
    const pctDrop = V > 0 ? (vd / V) * 100 : 0;
    const isWarning = pctDrop > 3;

    return { vd, pctDrop, isWarning, resistance: R };
  }, [length, wireGauge, current, voltage]);

  const content = (
    <>
      <Typography variant="h2">How is Voltage Drop Calculated?</Typography>
      <Typography variant="body1">
        Voltage drop in a DC or single-phase AC circuit is calculated using the formula: VD = 2 × L × I × R / 1000, where L is the one-way wire length in feet, I is the current in amps, and R is the wire resistance in ohms per 1,000 feet.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        VD = 2 × L × I × R / 1,000<br />
        % Drop = (VD / System Voltage) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a 120V circuit with 15A load running through 100 feet of 12 AWG wire: VD = 2 × 100 × 15 × 1.588 / 1000 = 4.76V, which is a 3.97% drop — exceeding the recommended 3% limit.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing wire for outdoor buildings, sheds, and workshops.</li>
          <li>Ensuring adequate voltage at the end of long cable runs.</li>
          <li>Designing low-voltage landscape lighting circuits.</li>
          <li>Verifying wire gauge meets NEC voltage drop recommendations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the recommended maximum voltage drop?</Typography>
      <Typography variant="body1">
        The NEC recommends no more than 3% voltage drop from the panel to the furthest outlet on a branch circuit, and no more than 5% total (panel to load, including branch and feeder). For critical or sensitive equipment, 2% or less is preferred.
      </Typography>
      <Typography variant="h3">Why does wire length matter?</Typography>
      <Typography variant="body1">
        Longer wire has more resistance, which causes a greater voltage drop. Doubling the wire length doubles the voltage drop. This is why wire gauge must be increased (lower AWG number) for longer runs.
      </Typography>
      <Typography variant="h3">What wire resistance values are used?</Typography>
      <Typography variant="body1">
        The calculator uses NEC Chapter 9 Table 8 values for uncoated copper conductors at 75°C: 14 AWG = 2.525, 12 AWG = 1.588, 10 AWG = 0.999, 8 AWG = 0.628, and 6 AWG = 0.395 ohms per 1,000 feet.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/voltage-drop-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Wire Length (one-way)" type="number" value={length} onChange={(e) => setLength(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} fullWidth />
          <TextField label="Wire Gauge" select value={wireGauge} onChange={(e) => setWireGauge(e.target.value)} fullWidth>
            {wireGauges.map((w) => (
              <MenuItem key={w.gauge} value={w.gauge}>{w.gauge} ({w.resistance} Ω/1000 ft)</MenuItem>
            ))}
          </TextField>
          <TextField label="Current" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">A</InputAdornment> } }} fullWidth />
          <TextField label="System Voltage" select value={voltage} onChange={(e) => setVoltage(e.target.value)} fullWidth>
            <MenuItem value="120">120V (Single Phase)</MenuItem>
            <MenuItem value="240">240V (Single Phase)</MenuItem>
          </TextField>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          {result.isWarning && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Voltage drop exceeds 3%. Consider using a larger wire gauge to reduce losses.
            </Alert>
          )}
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Voltage Drop</Typography>
            <Typography variant="h3" fontWeight="bold">{result.vd.toFixed(2)}V</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Percentage Drop</Typography>
            <Typography fontWeight={600} color={result.isWarning ? 'error.main' : 'success.main'}>{result.pctDrop.toFixed(2)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Wire Resistance</Typography>
            <Typography fontWeight={600}>{result.resistance} Ω/1000 ft</Typography>
          </Paper>

          <Typography variant="subtitle2" fontWeight={600} mb={1}>Wire Gauge Reference</Typography>
          <Paper sx={{ p: 2 }}>
            {wireGauges.map((w, i) => (
              <Box key={w.gauge} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: i < wireGauges.length - 1 ? '1px solid' : 'none', borderColor: 'divider', bgcolor: w.gauge === wireGauge ? 'action.hover' : 'transparent', borderRadius: 0.5 }}>
                <Typography variant="body2" fontWeight={w.gauge === wireGauge ? 600 : 400}>{w.gauge}</Typography>
                <Typography variant="body2">{w.resistance} Ω/1000 ft</Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default VoltageDropCalculator;
