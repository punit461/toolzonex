'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ComputerElectricityCostCalculator = () => {
  const [idleWatts, setIdleWatts] = useState('60');
  const [idleHours, setIdleHours] = useState('16');
  const [loadWatts, setLoadWatts] = useState('350');
  const [loadHours, setLoadHours] = useState('8');
  const [price, setPrice] = useState('0.15');

  const result = useMemo(() => {
    const iw = parseFloat(idleWatts) || 0;
    const ih = parseFloat(idleHours) || 0;
    const lw = parseFloat(loadWatts) || 0;
    const lh = parseFloat(loadHours) || 0;
    const p = parseFloat(price) || 0;

    const dailyKwh = (iw * ih + lw * lh) / 1000;
    const dailyCost = dailyKwh * p;

    return {
      dailyKwh,
      dailyCost,
      monthlyCost: dailyCost * 30,
      annualCost: dailyCost * 365,
    };
  }, [idleWatts, idleHours, loadWatts, loadHours, price]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Your PC&apos;s Electricity Cost</Typography>
      <Typography variant="body1">
        A desktop or gaming PC&apos;s power draw swings a lot more than most household appliances — it might
        idle at 50-80W while sitting at a desktop, then jump to 300W or more under gaming or heavy load. Because
        of that swing, this calculator uses two separate wattage figures — idle and load — each with its own
        daily hours, rather than the single fixed wattage most generic electricity cost calculators assume.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Daily kWh = (Idle W × Idle Hours + Load W × Load Hours) ÷ 1000
        <br />
        Daily Cost = Daily kWh × Price per kWh
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A gaming PC idling at 60W for 16 hours a day and gaming at 350W for 8 hours a day uses
        (60 × 16 + 350 × 8) ÷ 1000 = 3.76 kWh per day. At $0.15 per kWh, that&apos;s $0.56 a day, about $16.92 a
        month, and roughly $205.86 a year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the true running cost of a gaming PC or workstation.</li>
          <li>Comparing electricity costs between a more efficient and a power-hungry build.</li>
          <li>Understanding how much heavy gaming or rendering sessions add to a power bill.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I find my PC&apos;s idle and load wattage?</Typography>
      <Typography variant="body1">
        A plug-in power meter (like a Kill A Watt) gives the most accurate real-world reading. Without one,
        software tools like HWMonitor or your GPU&apos;s companion app can estimate component power draw, or
        you can add up your PSU-rated wattages for components and estimate 20-30% for idle draw versus full
        rated load for gaming.
      </Typography>
      <Typography variant="h3">How is this different from a generic kWh cost calculator?</Typography>
      <Typography variant="body1">
        A generic appliance calculator assumes one fixed wattage for the whole time it&apos;s used, which works
        fine for something like a space heater. A computer spends most of its time idling at low power and only
        occasionally draws its peak wattage, so splitting the calculation into idle and load states gives a much
        more realistic cost estimate.
      </Typography>
      <Typography variant="h3">Does this include monitors and peripherals?</Typography>
      <Typography variant="body1">
        No — this estimates the PC tower itself. Add a monitor&apos;s wattage (commonly 20-40W) separately if
        you want to include it, since monitors typically run whenever the PC is actively in use.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/computer-electricity-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">Idle</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Idle Power Draw" type="number" value={idleWatts}
              onChange={(e) => setIdleWatts(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
            />
            <TextField
              label="Idle Hours / Day" type="number" value={idleHours}
              onChange={(e) => setIdleHours(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
            />
          </Box>
          <Typography variant="subtitle2" color="text.secondary">Load / Active Use</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Load Power Draw" type="number" value={loadWatts}
              onChange={(e) => setLoadWatts(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
            />
            <TextField
              label="Load Hours / Day" type="number" value={loadHours}
              onChange={(e) => setLoadHours(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
            />
          </Box>
          <TextField
            label="Electricity Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onFocus={(e) => e.target.select()}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Daily Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.dailyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily Energy Use</Typography>
            <Typography fontWeight={600}>{result.dailyKwh.toFixed(2)} kWh</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Cost</Typography>
            <Typography fontWeight={600}>{money(result.monthlyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Annual Cost</Typography>
            <Typography fontWeight={600}>{money(result.annualCost)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ComputerElectricityCostCalculator;
