'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SolarPanelCalculator = () => {
  const [dailyUsage, setDailyUsage] = useState('30');
  const [panelWattage, setPanelWattage] = useState('400');
  const [peakSunHours, setPeakSunHours] = useState('5');
  const [efficiency, setEfficiency] = useState('85');

  const result = useMemo(() => {
    const usage = parseFloat(dailyUsage) || 0;
    const wattage = parseFloat(panelWattage) || 400;
    const hours = parseFloat(peakSunHours) || 5;
    const eff = (parseFloat(efficiency) || 85) / 100;

    const panelOutput = (wattage * hours * eff) / 1000;
    const panelsNeeded = panelOutput > 0 ? Math.ceil(usage / panelOutput) : 0;
    const systemSizeKw = (panelsNeeded * wattage) / 1000;
    const dailyOutput = panelsNeeded * panelOutput;

    return { panelsNeeded, systemSizeKw, dailyOutput, panelOutputPerPanel: panelOutput };
  }, [dailyUsage, panelWattage, peakSunHours, efficiency]);

  const content = (
    <>
      <Typography variant="h2">How is Solar Panel Output Calculated?</Typography>
      <Typography variant="body1">
        The number of panels needed is determined by dividing your daily electricity usage by the daily output of a single panel. Panel output depends on its wattage, the average peak sun hours in your area, and system efficiency losses.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Panels Needed = Daily Usage / (Panel Wattage × Peak Sun Hours × Efficiency / 1000)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If you use 30 kWh per day, have 400W panels, 5 peak sun hours, and 85% efficiency, each panel produces about 1.7 kWh daily. You'd need roughly 18 panels (7.2 kW system) to cover your usage.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many solar panels your home needs.</li>
          <li>Planning a solar installation budget and roof space requirements.</li>
          <li>Comparing panel wattages and system configurations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What are peak sun hours?</Typography>
      <Typography variant="body1">
        Peak sun hours represent the number of hours per day when solar irradiance averages 1,000 W/m². This varies by location and season — check solar maps for your area.
      </Typography>
      <Typography variant="h3">Why is efficiency less than 100%?</Typography>
      <Typography variant="body1">
        Real-world losses come from inverter inefficiency, wiring, temperature effects, soiling, and shading. 80–90% is a typical system efficiency range.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/solar-panel-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Daily Electricity Usage" type="number" value={dailyUsage} onChange={(e) => setDailyUsage(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">kWh</InputAdornment> } }} fullWidth />
          <TextField label="Panel Wattage" type="number" value={panelWattage} onChange={(e) => setPanelWattage(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }} fullWidth />
          <TextField label="Peak Sun Hours" type="number" value={peakSunHours} onChange={(e) => setPeakSunHours(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }} fullWidth />
          <TextField label="System Efficiency" type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Panels Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.panelsNeeded}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total System Size</Typography>
            <Typography fontWeight={600}>{result.systemSizeKw.toFixed(1)} kW</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated Daily Output</Typography>
            <Typography fontWeight={600}>{result.dailyOutput.toFixed(1)} kWh</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Output per Panel</Typography>
            <Typography fontWeight={600}>{result.panelOutputPerPanel.toFixed(2)} kWh/day</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default SolarPanelCalculator;
