'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const STANDARD_FUSES = [1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100];

const FuseSizeCalculator = () => {
  const [current, setCurrent] = useState('12');

  const result = useMemo(() => {
    const amps = parseFloat(current) || 0;
    const raw = amps * 1.25;
    const recommended = STANDARD_FUSES.find((f) => f >= raw) ?? null;
    return { amps, raw, recommended };
  }, [current]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Fuse Size Calculator</Typography>
      <Typography variant="body1">
        Enter the full load current (in amps) that a circuit will draw. Electrical codes generally recommend
        sizing a fuse or breaker at 125% of the continuous full load current, which builds in a safety margin
        for continuous loads rather than sizing the fuse right at the load&apos;s exact current draw. If you
        only know an appliance&apos;s wattage and voltage, use a separate wattage/amperage calculator first
        (current = watts / volts) to get the amp figure to enter here.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Recommended Rating = Full Load Current × 1.25 → rounded up to the nearest standard fuse size
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A circuit with a full load current of 12 amps needs 12 × 1.25 = 15 amps at minimum. Since 15 amps is
        already a standard fuse size, the recommended fuse is 15A. A load of 16 amps would need 16 × 1.25 = 20
        amps, which also happens to land exactly on the next standard size, 20A.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a starting estimate for fuse or breaker sizing on a new circuit.</li>
          <li>Checking whether an existing fuse is undersized for a load it&apos;s protecting.</li>
          <li>Sizing fuses for automotive, marine, or off-grid solar electrical projects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this a substitute for a licensed electrician?</strong> No — this is a general estimate based on the common 125% continuous-load rule of thumb. Actual fuse and breaker sizing must comply with local electrical code, wire gauge ampacity ratings, and equipment-specific requirements, so always confirm with a qualified electrician for real installations.</li>
          <li><strong>Why 125% and not the exact load current?</strong> Continuous loads (running 3 hours or more) generate heat over time, and electrical code typically requires a 25% safety margin above the load&apos;s rated current to prevent nuisance tripping and reduce fire risk from sustained near-capacity operation.</li>
          <li><strong>What if my exact calculated value falls between two standard sizes?</strong> Always round up to the next larger standard fuse size, never down — an undersized fuse can trip under normal operation, while rounding up keeps you within the safety margin the 125% rule is designed to provide.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fuse-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Full Load Current" type="number" value={current}
            onChange={(e) => setCurrent(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">A</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Recommended Standard Fuse Size</Typography>
            <Typography variant="h3" fontWeight="bold">{result.recommended !== null ? `${result.recommended}A` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Raw Value at 125%</Typography>
            <Typography fontWeight={600}>{result.raw.toFixed(2)} A</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FuseSizeCalculator;
