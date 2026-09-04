'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SolveFor = 'watts' | 'volts' | 'amps';

const ApplianceWattageCalculator = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('watts');
  const [volts, setVolts] = useState('120');
  const [amps, setAmps] = useState('5');
  const [watts, setWatts] = useState('600');

  const result = useMemo(() => {
    const v = parseFloat(volts) || 0;
    const a = parseFloat(amps) || 0;
    const w = parseFloat(watts) || 0;

    if (solveFor === 'watts') return v * a;
    if (solveFor === 'volts') return a > 0 ? w / a : 0;
    return v > 0 ? w / v : 0;
  }, [solveFor, volts, amps, watts]);

  const content = (
    <>
      <Typography variant="h2">How Appliance Wattage Is Calculated</Typography>
      <Typography variant="body1">
        This is a single-appliance electrical calculator based on Ohm&apos;s Law power formula: wattage equals
        voltage multiplied by amperage. It&apos;s the tool to reach for when a device&apos;s nameplate or label
        lists its amp draw but not its wattage — for example, many appliance labels only show a voltage and an
        amperage rating. Pick which value you want to solve for, enter the other two, and the missing value is
        calculated instantly.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Watts = Volts × Amps
        <br />
        Volts = Watts ÷ Amps
        <br />
        Amps = Watts ÷ Volts
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A label reading &quot;120V, 5A&quot; means the appliance draws 120 × 5 = 600 watts. Conversely, if you
        know an appliance is rated at 1500 watts on a standard 120-volt circuit, it draws 1500 ÷ 120 = 12.5 amps.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a nameplate&apos;s voltage and amperage rating into a wattage figure.</li>
          <li>Checking whether a single appliance will overload a circuit&apos;s amp rating.</li>
          <li>Working out the voltage a device needs given its known wattage and amp draw.</li>
          <li>Quick single-device power checks before buying a plug adapter or extension cord.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the LED Wattage Calculator?</Typography>
      <Typography variant="body1">
        The LED Wattage Calculator totals the combined power draw of many LEDs or an entire LED strip. This tool
        instead works with a single appliance and applies the basic Ohm&apos;s Law power formula (watts = volts
        × amps) to solve for whichever one of the three values you don&apos;t already know.
      </Typography>
      <Typography variant="h3">How is this different from the Inverter Size Calculator?</Typography>
      <Typography variant="body1">
        The Inverter Size Calculator adds up the wattage of a whole list of appliances to size a backup power
        inverter, including a safety margin. This tool is a simple single-appliance electrical calculation —
        useful for finding one appliance&apos;s wattage before adding it to an inverter sizing list.
      </Typography>
      <Typography variant="h3">Does this account for power factor on motor-driven appliances?</Typography>
      <Typography variant="body1">
        No — this uses the basic resistive-load power formula (watts = volts × amps), which is accurate for
        purely resistive loads like heaters and incandescent lighting. Motor-driven appliances have a power
        factor below 1, so their real wattage may be somewhat lower than volts × amps suggests.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/appliance-wattage-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">Solve For</Typography>
          <ToggleButtonGroup value={solveFor} exclusive onChange={(_, v) => v && setSolveFor(v)} fullWidth>
            <ToggleButton value="watts">Watts</ToggleButton>
            <ToggleButton value="volts">Volts</ToggleButton>
            <ToggleButton value="amps">Amps</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Voltage"
            type="number"
            value={volts}
            onChange={(e) => setVolts(e.target.value)}
            fullWidth
            disabled={solveFor === 'volts'}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">V</InputAdornment> } }}
          />
          <TextField
            label="Amperage"
            type="number"
            value={amps}
            onChange={(e) => setAmps(e.target.value)}
            fullWidth
            disabled={solveFor === 'amps'}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">A</InputAdornment> } }}
          />
          <TextField
            label="Wattage"
            type="number"
            value={watts}
            onChange={(e) => setWatts(e.target.value)}
            fullWidth
            disabled={solveFor === 'watts'}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white', height: 'fit-content' }}>
            <Typography variant="body2">
              {solveFor === 'watts' ? 'Wattage' : solveFor === 'volts' ? 'Voltage' : 'Amperage'}
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {result.toFixed(2)} {solveFor === 'watts' ? 'W' : solveFor === 'volts' ? 'V' : 'A'}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ApplianceWattageCalculator;
