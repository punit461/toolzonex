'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const PRESETS = [
  { key: 'custom', label: 'Custom', watts: null },
  { key: '32led', label: '32" LED (~30-50W)', watts: 40 },
  { key: '55led', label: '55" LED (~60-100W)', watts: 80 },
  { key: '65oled', label: '65" OLED (~100-150W)', watts: 125 },
];

const TvElectricityCostCalculator = () => {
  const [preset, setPreset] = useState('55led');
  const [customWattage, setCustomWattage] = useState('80');
  const [hoursPerDay, setHoursPerDay] = useState('4');
  const [rate, setRate] = useState('0.16');

  const selected = PRESETS.find((p) => p.key === preset)!;
  const wattage = selected.watts ?? (parseFloat(customWattage) || 0);
  const hrs = parseFloat(hoursPerDay) || 0;
  const r = parseFloat(rate) || 0;

  const dailyKwh = (wattage / 1000) * hrs;
  const dailyCost = dailyKwh * r;
  const monthlyCost = dailyCost * 30;
  const annualCost = dailyCost * 365;

  const content = (
    <>
      <Typography variant="h2">How to Use the TV Electricity Cost Calculator</Typography>
      <Typography variant="body1">
        Pick a screen-size/type preset for a typical wattage, or enter your TV&apos;s actual wattage directly,
        along with how many hours per day you watch and your electricity rate. The calculator converts wattage
        and hours into daily energy use, then multiplies by your rate to estimate daily, monthly, and annual
        cost.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Daily kWh = (Wattage / 1000) × Hours Watched per Day<br />
        Cost = Daily kWh × Electricity Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An 80W 55&quot; LED TV watched 4 hours a day uses 0.32 kWh per day (0.08 × 4). At $0.16 per kWh, that&apos;s
        about $0.05 per day, $1.54 per month, and $18.69 per year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the ongoing electricity cost of watching TV based on your actual viewing habits.</li>
          <li>Comparing running cost between different TV sizes and panel types (LED vs. OLED).</li>
          <li>Checking how much cutting down daily viewing hours would save on electricity.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How accurate are the preset wattage figures?</strong> They're illustrative typical ranges for common screen sizes and panel types, not a specific model's exact rating. For the most accurate result, check your TV's rated power consumption on its label, spec sheet, or an Energy Guide sticker and enter that as a custom wattage.</li>
          <li><strong>Why does OLED sometimes use more power than LED at a similar size?</strong> OLED pixels emit their own light individually, and power draw scales with how bright and colorful the content is — bright scenes can draw noticeably more power than dark ones, whereas LED-backlit LCD TVs draw more consistently regardless of content brightness.</li>
          <li><strong>Does standby power matter?</strong> Modern TVs typically draw only a small amount of standby power when off, which adds a modest amount to an annual total if left plugged in constantly — this calculator focuses on active viewing time, which is normally the larger share of total cost.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/tv-electricity-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="TV Size / Type" value={preset} onChange={(e) => setPreset(e.target.value)} fullWidth>
            {PRESETS.map((p) => (
              <MenuItem key={p.key} value={p.key}>{p.label}</MenuItem>
            ))}
          </TextField>
          {preset === 'custom' ? (
            <TextField label="TV Wattage" type="number" value={customWattage} onChange={(e) => setCustomWattage(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }} />
          ) : (
            <Typography variant="body2" color="text.secondary">Using {wattage}W typical for this preset.</Typography>
          )}
          <TextField label="Hours Watched per Day" type="number" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} fullWidth />
          <TextField
            label="Electricity Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/kWh</InputAdornment> } }}
          />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Estimated Cost</Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Daily</Typography>
              <Typography variant="h6" fontWeight="bold">{money(dailyCost)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Monthly</Typography>
              <Typography variant="h6" fontWeight="bold">{money(monthlyCost)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Annual</Typography>
              <Typography variant="h6" fontWeight="bold">{money(annualCost)}</Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TvElectricityCostCalculator;
