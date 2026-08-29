'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface AwgRow {
  awg: string;
  ohmsPer1000ft: number;
  ampacity: number;
}

// Standard copper wire chart: approximate resistance at 75C insulation and
// typical ampacity for general (60-75C) building wire. Real installations
// should always be verified against the applicable electrical code.
const AWG_TABLE: AwgRow[] = [
  { awg: '14', ohmsPer1000ft: 2.525, ampacity: 15 },
  { awg: '12', ohmsPer1000ft: 1.588, ampacity: 20 },
  { awg: '10', ohmsPer1000ft: 0.999, ampacity: 30 },
  { awg: '8', ohmsPer1000ft: 0.628, ampacity: 40 },
  { awg: '6', ohmsPer1000ft: 0.395, ampacity: 55 },
  { awg: '4', ohmsPer1000ft: 0.249, ampacity: 70 },
  { awg: '3', ohmsPer1000ft: 0.197, ampacity: 85 },
  { awg: '2', ohmsPer1000ft: 0.156, ampacity: 95 },
  { awg: '1', ohmsPer1000ft: 0.124, ampacity: 110 },
  { awg: '1/0', ohmsPer1000ft: 0.098, ampacity: 125 },
  { awg: '2/0', ohmsPer1000ft: 0.078, ampacity: 145 },
  { awg: '3/0', ohmsPer1000ft: 0.062, ampacity: 165 },
  { awg: '4/0', ohmsPer1000ft: 0.049, ampacity: 195 },
];

const WireSizeCalculator = () => {
  const [current, setCurrent] = useState<string>('20');
  const [voltage, setVoltage] = useState<string>('120');
  const [length, setLength] = useState<string>('50');
  const [maxDropPct, setMaxDropPct] = useState<string>('3');

  const result = useMemo(() => {
    const i = parseFloat(current);
    const v = parseFloat(voltage);
    const len = parseFloat(length);
    const dropPct = parseFloat(maxDropPct);
    if ([i, v, len, dropPct].some((n) => Number.isNaN(n)) || i <= 0 || v <= 0 || len <= 0 || dropPct <= 0) return null;

    const allowedDropVolts = v * (dropPct / 100);
    // Round-trip conductor length (out and back) determines total resistance.
    const requiredOhmsPer1000ft = (allowedDropVolts * 1000) / (2 * len * i);

    const recommended = AWG_TABLE.find((row) => row.ohmsPer1000ft <= requiredOhmsPer1000ft && row.ampacity >= i) ?? null;

    return { allowedDropVolts, requiredOhmsPer1000ft, recommended };
  }, [current, voltage, length, maxDropPct]);

  const content = (
    <>
      <Typography variant="h2">How to Size a Wire Gauge (AWG)</Typography>
      <Typography variant="body1">
        Choosing the right wire gauge involves two checks: the wire must be rated to safely carry the circuit&apos;s
        current (ampacity), and it must be thick enough that resistance over the run length doesn&apos;t cause an
        excessive voltage drop. This calculator computes the maximum resistance per 1,000 ft that keeps voltage
        drop under your target percentage, then finds the smallest standard AWG size from the reference table
        below that satisfies both the resistance and ampacity requirements.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Allowed Drop (V) = Voltage × Drop% &nbsp;|&nbsp; Required Ω/1000ft = (Drop × 1000) ÷ (2 × Length × Current)
      </Box>

      <Typography variant="h2">AWG Reference Table (Copper Wire)</Typography>
      <Box sx={{ overflowX: 'auto', my: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>AWG</TableCell>
              <TableCell>Resistance (Ω/1000ft)</TableCell>
              <TableCell>Typical Ampacity (A)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AWG_TABLE.map((row) => (
              <TableRow key={row.awg}>
                <TableCell>{row.awg}</TableCell>
                <TableCell>{row.ohmsPer1000ft}</TableCell>
                <TableCell>{row.ampacity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20A, 120V circuit running 50 feet one-way with a 3% max voltage drop allows a drop of 120 × 0.03 =
        3.6V. The required resistance is (3.6 × 1000) ÷ (2 × 50 × 20) = 1.8 Ω/1000ft. Looking at the table, 12
        AWG (1.588 Ω/1000ft, 20A ampacity) satisfies both requirements, so 12 AWG is recommended.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing extension cords or long circuit runs for tools, generators, or workshops.</li>
          <li>Planning wiring for a garage, shed, or outbuilding a significant distance from the main panel.</li>
          <li>Checking whether an existing wire run is adequate for a new higher-draw appliance.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this a substitute for professional electrical code compliance?</Typography>
      <Typography variant="body1">
        No. This calculator gives a reasonable engineering estimate based on standard resistance and ampacity
        figures, but actual wire sizing must follow your local electrical code (such as the NEC), which
        accounts for insulation type, ambient temperature, conduit fill, and other derating factors. Always
        consult a licensed electrician for real installations.
      </Typography>
      <Typography variant="h3">Why does wire length matter so much?</Typography>
      <Typography variant="body1">
        Voltage drop increases with the round-trip distance current has to travel, so doubling the length of a
        circuit run doubles the voltage drop for the same wire and current, often requiring a thicker gauge to
        compensate.
      </Typography>
      <Typography variant="h3">What voltage drop percentage should I use?</Typography>
      <Typography variant="body1">
        3% is a commonly recommended maximum for branch circuits, and 5% for the combined feeder and branch
        circuit, though some equipment or codes may specify a different limit.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/wire-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Current (Amps)" type="number" fullWidth value={current} onChange={(e) => setCurrent(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Voltage (V)" type="number" fullWidth value={voltage} onChange={(e) => setVoltage(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="One-Way Wire Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Max Voltage Drop (%)" type="number" fullWidth value={maxDropPct} onChange={(e) => setMaxDropPct(e.target.value)} onFocus={(e) => e.target.select()} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
            {result ? (
              result.recommended ? (
                <>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Recommended Wire Gauge</Typography>
                  <Typography variant="h2" fontWeight={800} color="primary.main">{result.recommended.awg} AWG</Typography>
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    Allowed drop: {result.allowedDropVolts.toFixed(2)} V &nbsp;|&nbsp; Required: {result.requiredOhmsPer1000ft.toFixed(3)} Ω/1000ft
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" color="error">
                  No standard gauge in this table meets the requirement — consider a shorter run, higher drop tolerance, or a specialist cable size.
                </Typography>
              )
            ) : (
              <Typography variant="body1" color="text.secondary">Enter positive values to calculate</Typography>
            )}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WireSizeCalculator;
