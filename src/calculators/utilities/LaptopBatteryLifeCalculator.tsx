'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type CapacityMode = 'wh' | 'mah';

const POWER_PRESETS: { label: string; watts: string }[] = [
  { label: 'Light Use (~6.5W)', watts: '6.5' },
  { label: 'Moderate Use (~12.5W)', watts: '12.5' },
  { label: 'Heavy / Gaming (~32W)', watts: '32' },
  { label: 'Custom', watts: '' },
];

const LaptopBatteryLifeCalculator = () => {
  const [capacityMode, setCapacityMode] = useState<CapacityMode>('wh');
  const [wh, setWh] = useState('56');
  const [mah, setMah] = useState('4800');
  const [voltage, setVoltage] = useState('11.4');
  const [preset, setPreset] = useState('Moderate Use (~12.5W)');
  const [customWatts, setCustomWatts] = useState('12.5');

  const { capacityWh, powerDraw, runtimeHours } = useMemo(() => {
    const capacityWh = capacityMode === 'wh'
      ? (parseFloat(wh) || 0)
      : ((parseFloat(mah) || 0) * (parseFloat(voltage) || 0)) / 1000;

    const activePreset = POWER_PRESETS.find((p) => p.label === preset);
    const powerDraw = activePreset && activePreset.watts !== ''
      ? parseFloat(activePreset.watts)
      : parseFloat(customWatts) || 0;

    const runtimeHours = powerDraw > 0 ? capacityWh / powerDraw : 0;
    return { capacityWh, powerDraw, runtimeHours };
  }, [capacityMode, wh, mah, voltage, preset, customWatts]);

  const content = (
    <>
      <Typography variant="h2">How to Estimate Laptop Battery Life</Typography>
      <Typography variant="body1">
        Enter your laptop&apos;s battery capacity — either directly in watt-hours (Wh), or as milliamp-hours
        (mAh) plus voltage if that&apos;s what&apos;s printed on the battery — and an average power draw for how
        you use the laptop. Dividing capacity by power draw gives an estimated runtime in hours.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Capacity (Wh) = (mAh × Voltage) ÷ 1000
        <br />
        Runtime (hours) = Capacity (Wh) ÷ Average Power Draw (W)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 56 Wh battery under moderate use (about 12.5W average draw — general browsing, documents, video)
        gives an estimated runtime of 56 ÷ 12.5 ≈ 4.5 hours. The same battery under heavy gaming load (around
        32W) would only last about 56 ÷ 32 ≈ 1.75 hours.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing expected battery life across different laptops before buying.</li>
          <li>Estimating how long a laptop will last for a specific task like gaming or video calls.</li>
          <li>Understanding why real-world battery life falls short of a manufacturer&apos;s marketed figure.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where do I find my laptop&apos;s battery capacity?</Typography>
      <Typography variant="body1">
        Check the battery&apos;s label (often on the underside if removable), the manufacturer&apos;s spec
        sheet, or your operating system&apos;s battery report tool, which frequently lists both design capacity
        and current capacity in Wh or mWh.
      </Typography>
      <Typography variant="h3">Why does actual battery life vary so much from the marketed number?</Typography>
      <Typography variant="body1">
        Manufacturer estimates are usually measured under light, best-case conditions like video playback at
        low brightness. Real-world power draw jumps with screen brightness, active apps, background tasks, and
        especially gaming or video editing, which is why choosing a realistic preset here matters.
      </Typography>
      <Typography variant="h3">Does battery age affect this estimate?</Typography>
      <Typography variant="body1">
        Yes — batteries lose capacity over charge cycles and time. If your laptop is a couple of years old,
        check your OS&apos;s current (not design) capacity for a more accurate Wh figure, since a worn battery
        will run for less time than its original rated capacity suggests.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/laptop-battery-life-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup
            value={capacityMode}
            exclusive
            onChange={(_, val: CapacityMode | null) => { if (val) setCapacityMode(val); }}
            size="small"
          >
            <ToggleButton value="wh">Watt-Hours (Wh)</ToggleButton>
            <ToggleButton value="mah">mAh + Voltage</ToggleButton>
          </ToggleButtonGroup>

          {capacityMode === 'wh' ? (
            <TextField
              label="Battery Capacity" type="number" value={wh}
              onChange={(e) => setWh(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">Wh</InputAdornment> } }}
            />
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Capacity" type="number" value={mah}
                onChange={(e) => setMah(e.target.value)} onFocus={(e) => e.target.select()}
                fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">mAh</InputAdornment> } }}
              />
              <TextField
                label="Voltage" type="number" value={voltage}
                onChange={(e) => setVoltage(e.target.value)} onFocus={(e) => e.target.select()}
                fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">V</InputAdornment> } }}
              />
            </Box>
          )}

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Usage Level</Typography>
            <ToggleButtonGroup
              value={preset}
              exclusive
              onChange={(_, val: string | null) => { if (val) setPreset(val); }}
              size="small"
              orientation="vertical"
              fullWidth
            >
              {POWER_PRESETS.map((p) => (
                <ToggleButton key={p.label} value={p.label} sx={{ justifyContent: 'flex-start' }}>{p.label}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          {preset === 'Custom' && (
            <TextField
              label="Average Power Draw" type="number" value={customWatts}
              onChange={(e) => setCustomWatts(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
            />
          )}
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Battery Capacity</Typography>
            <Typography variant="h5" fontWeight={700}>{capacityWh.toFixed(1)} Wh</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Average Power Draw</Typography>
            <Typography variant="h6" fontWeight={600}>{powerDraw.toFixed(1)} W</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Estimated Runtime</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>{runtimeHours.toFixed(1)} hours</Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LaptopBatteryLifeCalculator;
