'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, MenuItem, Stack, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GAUGE_RESISTANCE: Record<string, number> = {
  '16': 4.016,
  '14': 2.525,
  '12': 1.588,
  '10': 0.999,
};

const ExtensionCordLoadCalculatorContent = () => {
  const [length, setLength] = useState('50');
  const [gauge, setGauge] = useState('14');
  const [current, setCurrent] = useState('10');
  const [voltage, setVoltage] = useState('120');

  const result = useMemo(() => {
    const L = parseFloat(length);
    const I = parseFloat(current);
    const V = parseFloat(voltage);
    const R = GAUGE_RESISTANCE[gauge];
    if (!L || !I || !V || L <= 0 || I <= 0 || V <= 0) return null;

    const drop = (2 * L * I * R) / 1000;
    const dropPct = (drop / V) * 100;

    let status: 'Safe' | 'Caution' | 'Not Recommended';
    if (dropPct < 3) status = 'Safe';
    else if (dropPct <= 5) status = 'Caution';
    else status = 'Not Recommended';

    return { drop, dropPct, status };
  }, [length, gauge, current, voltage]);

  const statusColor = result?.status === 'Safe' ? 'success' : result?.status === 'Caution' ? 'warning' : 'error';

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Cord Length (ft)"
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          fullWidth
        />
        <TextField
          select
          label="Wire Gauge (AWG)"
          value={gauge}
          onChange={(e) => setGauge(e.target.value)}
          fullWidth
        >
          <MenuItem value="16">16 AWG</MenuItem>
          <MenuItem value="14">14 AWG</MenuItem>
          <MenuItem value="12">12 AWG</MenuItem>
          <MenuItem value="10">10 AWG</MenuItem>
        </TextField>
        <TextField
          label="Current Draw (Amps)"
          type="number"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          fullWidth
          helperText="Divide the device's watts by the supply voltage if you only know watts."
        />
        <TextField
          label="Supply Voltage (V)"
          type="number"
          value={voltage}
          onChange={(e) => setVoltage(e.target.value)}
          fullWidth
        />
      </Stack>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
        {result ? (
          <>
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Voltage Drop</Typography>
              <Typography variant="h6" fontWeight="bold">{result.drop.toFixed(2)} V ({result.dropPct.toFixed(1)}%)</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Status</Typography>
              <Chip label={result.status} color={statusColor} sx={{ fontWeight: 700 }} />
            </Paper>
          </>
        ) : (
          <Paper sx={{ p: 2 }}>
            <Typography color="text.secondary">Enter valid values to see the voltage drop.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const ExtensionCordLoadCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Extension Cord Load Calculator</Typography>
      <Typography variant="body1">
        Enter the cord's length, its wire gauge (AWG — the standard sizes found on extension cords are 16,
        14, 12, and 10, with a smaller number meaning a thicker wire), the current draw of the device in
        amps, and the supply voltage (120V by default for standard US household outlets). The calculator
        uses the standard voltage-drop method: it looks up the wire's resistance per 1,000 feet for the
        selected gauge, multiplies by the round-trip distance (length out and back), and compares the
        resulting voltage drop against the supply voltage.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
        Voltage Drop = 2 × Length(ft) × Current(A) × Resistance(Ω/1000ft) / 1000
      </Box>
      <Typography variant="body1">
        A drop under 3% of supply voltage is generally considered safe, 3-5% is a caution zone where
        performance may suffer on sensitive equipment, and over 5% means you should use a shorter cord or a
        thicker gauge.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 50 ft, 14 AWG extension cord carrying 10 amps at 120V has a resistance of about 2.525 Ω per 1,000
        ft, giving a voltage drop of roughly 2.5V — about 2.1% of supply voltage, which falls in the Safe
        range.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing the right gauge extension cord for a long run to a power tool or space heater.</li>
          <li>Checking whether a cord you already own can safely handle a specific appliance's load.</li>
          <li>Understanding why longer cords need thicker wire to avoid overheating and power loss.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this an exact substitute for the cord's rated ampacity?</strong> No — this is a general voltage-drop estimate using standard published resistance values per gauge. Always check the actual ampacity rating printed on your specific extension cord and follow your local electrical code; a cord's real-world rated capacity depends on its insulation, construction, and intended use (indoor vs. outdoor), not just voltage drop math.</li>
          <li><strong>Why does cord length matter so much for voltage drop?</strong> Voltage drop scales directly with the round-trip length of wire the current has to travel through — doubling the cord length roughly doubles the resistance the current encounters, which doubles the voltage drop for the same current and gauge.</li>
          <li><strong>What happens if the voltage drop is too high?</strong> Motors and heating elements can run hotter, less efficiently, or fail to start correctly, and the cord itself can heat up more than expected. Switching to a thicker gauge (a lower AWG number) or using a shorter cord reduces resistance and brings the voltage drop back down.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/extension-cord-load-calculator" content={content}>
      <ExtensionCordLoadCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtensionCordLoadCalculator;
