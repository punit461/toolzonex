'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, LinearProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BatteryBackupCalculator = () => {
  const [voltage, setVoltage] = useState('12');
  const [capacity, setCapacity] = useState('100');
  const [loadPower, setLoadPower] = useState('50');

  const result = useMemo(() => {
    const v = parseFloat(voltage) || 0;
    const ah = parseFloat(capacity) || 0;
    const w = parseFloat(loadPower) || 0;

    const totalWh = v * ah;
    const theoreticalHours = w > 0 ? totalWh / w : 0;
    const efficiency = 0.85;
    const practicalHours = w > 0 ? (totalWh * efficiency) / w : 0;

    const intervals = 10;
    const barData: { hour: number; remaining: number }[] = [];
    for (let i = 0; i <= intervals; i++) {
      const hour = (practicalHours * i) / intervals;
      const remaining = Math.max(100 - (i / intervals) * 100, 0);
      barData.push({ hour: parseFloat(hour.toFixed(1)), remaining });
    }

    return { totalWh, theoreticalHours, practicalHours, barData };
  }, [voltage, capacity, loadPower]);

  const content = (
    <>
      <Typography variant="h2">How is Battery Backup Calculated?</Typography>
      <Typography variant="body1">
        Battery backup runtime is calculated by dividing the total energy capacity (Watt-hours) by the load power (Watts). Real-world runtime is reduced by about 15% due to inverter losses, battery discharge curves, and temperature effects.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Wh = Voltage × Capacity (Ah)
        <br />
        Runtime = Total Wh / Load Power (W)
        <br />
        Practical Runtime = Runtime × 0.85 (efficiency)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12V 100Ah battery has 1,200 Wh of energy. Powering a 50W load, it theoretically lasts 24 hours. After accounting for 85% efficiency, practical runtime is about 20.4 hours.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning UPS (uninterruptible power supply) backup for critical equipment.</li>
          <li>Estimating how long a portable battery station can power devices during outages.</li>
          <li>Sizing battery banks for solar or RV setups.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is practical runtime less than theoretical?</Typography>
      <Typography variant="body1">
        Real batteries lose efficiency from inverter conversion, heat, discharge rate, and the fact that voltage sags as the battery drains. The 85% factor is a common industry estimate.
      </Typography>
      <Typography variant="h3">Does temperature affect battery life?</Typography>
      <Typography variant="body1">
        Yes. Cold temperatures reduce available capacity, while excessive heat degrades battery health over time. Most batteries perform best between 50°F and 85°F.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/battery-backup-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Battery Voltage" type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">V</InputAdornment> } }} fullWidth />
          <TextField label="Battery Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">Ah</InputAdornment> } }} fullWidth />
          <TextField label="Load Power" type="number" value={loadPower} onChange={(e) => setLoadPower(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Energy</Typography>
            <Typography variant="h3" fontWeight="bold">{result.totalWh} Wh</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Theoretical Runtime</Typography>
            <Typography fontWeight={600}>{result.theoreticalHours.toFixed(1)} hours</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Practical Runtime (85%)</Typography>
            <Typography fontWeight={600} color="success.main">{result.practicalHours.toFixed(1)} hours</Typography>
          </Paper>
        </Box>
      </Box>

      {result.barData.length > 0 && result.totalWh > 0 && (
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>Remaining Capacity Over Time</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {result.barData.map((d, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ minWidth: 60, textAlign: 'right' }}>{d.hour}h</Typography>
                <LinearProgress variant="determinate" value={d.remaining} sx={{ flex: 1, height: 16, borderRadius: 1, '& .MuiLinearProgress-bar': { bgcolor: d.remaining > 50 ? 'success.main' : d.remaining > 20 ? 'warning.main' : 'error.main' } }} />
                <Typography variant="body2" sx={{ minWidth: 40 }}>{Math.round(d.remaining)}%</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default BatteryBackupCalculator;
