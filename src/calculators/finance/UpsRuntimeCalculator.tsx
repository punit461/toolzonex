'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const POWER_FACTOR = 0.8;

const UpsRuntimeCalculatorContent = () => {
  const [capacityType, setCapacityType] = useState<'VA' | 'Wh'>('VA');
  const [capacity, setCapacity] = useState('1500');
  const [load, setLoad] = useState('300');
  const [efficiency, setEfficiency] = useState('80');

  const result = useMemo(() => {
    const cap = parseFloat(capacity) || 0;
    const loadW = parseFloat(load) || 0;
    const eff = (parseFloat(efficiency) || 0) / 100;

    const wattHours = capacityType === 'VA' ? cap * POWER_FACTOR : cap;
    const runtimeHours = loadW > 0 ? (wattHours * eff) / loadW : 0;
    const runtimeMinutes = runtimeHours * 60;

    return { wattHours, runtimeHours, runtimeMinutes };
  }, [capacityType, capacity, load, efficiency]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="UPS Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} fullWidth />
          <Select value={capacityType} onChange={(e) => setCapacityType(e.target.value as 'VA' | 'Wh')} sx={{ minWidth: 100 }}>
            <MenuItem value="VA">VA</MenuItem>
            <MenuItem value="Wh">Wh</MenuItem>
          </Select>
        </Box>
        {capacityType === 'VA' && (
          <Typography variant="body2" color="text.secondary">
            Assumes a typical power factor of {POWER_FACTOR} to convert VA to watt-hours. Choose Wh
            instead if your UPS documentation already states capacity in watt-hours.
          </Typography>
        )}
        <TextField
          label="Connected Load"
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
        />
        <TextField
          label="UPS Efficiency"
          type="number"
          value={efficiency}
          onChange={(e) => setEfficiency(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Estimated Runtime</Typography>
          <Typography variant="h3" fontWeight="bold">{result.runtimeMinutes.toFixed(1)} min</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Runtime in Hours</Typography>
          <Typography fontWeight={600}>{result.runtimeHours.toFixed(2)} hours</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Usable Energy</Typography>
          <Typography fontWeight={600}>{result.wattHours.toFixed(0)} Wh</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const UpsRuntimeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the UPS Runtime Calculator Work?</Typography>
      <Typography variant="body1">
        Enter your UPS&apos;s rated capacity (either in VA — volt-amps — or Wh — watt-hours, whichever
        your unit&apos;s label or manual specifies), the power draw of the equipment you have plugged
        into it, and the UPS&apos;s efficiency. If your capacity is in VA, the calculator applies a
        typical power factor of 0.8 to estimate the usable watt-hours, since VA and watts aren&apos;t
        the same unit for most UPS loads. It then multiplies the usable energy by the efficiency and
        divides by your connected load to estimate runtime in hours and minutes.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1,500 VA UPS at a 0.8 power factor provides about 1,200 Wh of usable energy. Running an 80%
        efficient UPS with a 300W connected load (a desktop PC and monitor), the estimated runtime is
        (1,200 × 0.8) ÷ 300 = 3.2 hours, or about 192 minutes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing a UPS to keep a server or network equipment running through a short power outage.</li>
          <li>Checking how long a UPS will bridge power for a home office setup.</li>
          <li>Comparing runtime across UPS models with different VA/Wh ratings.</li>
          <li>Planning how much load a UPS can safely support for a target backup duration.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does VA capacity need a power factor to estimate watt-hours?</Typography>
      <Typography variant="body1">
        VA (apparent power) and watts (real power) are only equal when the power factor is 1.0, which is
        rare for real equipment. Most UPS units and the loads they power have a power factor around
        0.6-0.9, so this calculator uses 0.8 as a reasonable estimate — check your UPS&apos;s
        documentation for its exact rated watts if you need a more precise figure.
      </Typography>
      <Typography variant="h3">What efficiency should I use for my UPS?</Typography>
      <Typography variant="body1">
        Standard offline/line-interactive UPS units are commonly rated around 80-90% efficient in normal
        (non-battery) operation; online double-conversion units can run somewhat lower due to constant
        AC-DC-AC conversion. Check your unit&apos;s spec sheet, or use 80% as a conservative default.
      </Typography>
      <Typography variant="h3">Is this runtime estimate exact?</Typography>
      <Typography variant="body1">
        No — it&apos;s a simplified estimate. Real UPS runtime also depends on battery age and health,
        temperature, and the specific discharge curve of the battery chemistry, all of which can shift
        actual runtime below a brand-new battery&apos;s rated figures.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/ups-runtime-calculator" content={content}>
      <UpsRuntimeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UpsRuntimeCalculator;
