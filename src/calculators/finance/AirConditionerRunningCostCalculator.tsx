'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type InputMode = 'wattage' | 'tonnage';

const TONNAGE_WATTS: Record<string, number> = {
  '1': 1200,
  '1.5': 1800,
  '2': 2400,
};

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const AirConditionerRunningCostCalculator = () => {
  const [mode, setMode] = useState<InputMode>('tonnage');
  const [tonnage, setTonnage] = useState('1.5');
  const [wattsPerTon, setWattsPerTon] = useState('1200');
  const [wattage, setWattage] = useState('1800');
  const [hoursPerDay, setHoursPerDay] = useState('8');
  const [price, setPrice] = useState('0.15');

  const result = useMemo(() => {
    const h = parseFloat(hoursPerDay) || 0;
    const p = parseFloat(price) || 0;

    let watts: number;
    if (mode === 'tonnage') {
      const ton = parseFloat(tonnage) || 0;
      const wpt = parseFloat(wattsPerTon) || TONNAGE_WATTS[tonnage] || 1200;
      watts = ton * wpt;
    } else {
      watts = parseFloat(wattage) || 0;
    }

    const dailyKwh = (watts / 1000) * h;
    const dailyCost = dailyKwh * p;

    return { watts, dailyKwh, dailyCost, monthlyCost: dailyCost * 30 };
  }, [mode, tonnage, wattsPerTon, wattage, hoursPerDay, price]);

  const content = (
    <>
      <Typography variant="h2">How Air Conditioner Running Cost Is Calculated</Typography>
      <Typography variant="body1">
        Air conditioners are usually sized in tons of cooling capacity (1 ton, 1.5 ton, 2 ton being the most
        common for a home split AC) rather than a wattage figure printed clearly on the unit. This calculator
        lets you enter wattage directly if you know it, or pick a tonnage and it estimates typical power draw
        using a reference of roughly 1,200 watts per ton for a standard split AC — a figure you can adjust if
        your unit&apos;s spec sheet lists something different. From there, it multiplies by hours run per day
        and your electricity price to estimate daily and monthly running cost.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Estimated Wattage = Tonnage × Watts per Ton (≈1,200W/ton)
        <br />
        Daily Cost = (Wattage ÷ 1000) × Hours per Day × Price per kWh
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1.5-ton AC at roughly 1,200W per ton draws about 1,800W. Run for 8 hours a day at $0.15 per kWh, that&apos;s
        1.8 kW × 8 hours = 14.4 kWh daily, costing about $2.16 a day or roughly $64.80 a month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting summer electricity bills before buying or running an air conditioner.</li>
          <li>Comparing running costs of different AC tonnages before choosing a unit for a room.</li>
          <li>Estimating savings from running an AC fewer hours per day or raising the thermostat.</li>
          <li>Checking whether an old AC&apos;s actual wattage is costing more than a newer, efficient model.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does AC tonnage matter for power consumption?</Typography>
      <Typography variant="body1">
        Tonnage measures cooling capacity, not electrical power directly, but larger-capacity units generally
        draw more watts to produce that cooling. The roughly 1,200W-per-ton figure is a common rule of thumb
        for standard split ACs, though actual draw varies by efficiency rating (SEER/EER), brand, and model.
      </Typography>
      <Typography variant="h3">Is this different from a generic appliance electricity calculator?</Typography>
      <Typography variant="body1">
        Yes — a generic appliance calculator needs you to already know the exact wattage. This tool adds an
        AC-specific path: if you only know your unit&apos;s tonnage (a very common way ACs are sized and sold),
        it estimates the wattage for you using the standard per-ton reference.
      </Typography>
      <Typography variant="h3">How can I get a more accurate estimate?</Typography>
      <Typography variant="body1">
        Check your AC&apos;s nameplate or spec sheet for its actual rated power input in watts and enter that
        directly using the wattage input mode — this will always be more accurate than the tonnage-based
        estimate, since actual draw varies by efficiency and inverter technology.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/air-conditioner-running-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth>
            <ToggleButton value="tonnage">By AC Tonnage</ToggleButton>
            <ToggleButton value="wattage">By Wattage</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'tonnage' ? (
            <>
              <FormControl fullWidth>
                <InputLabel>AC Capacity</InputLabel>
                <Select
                  value={tonnage}
                  label="AC Capacity"
                  onChange={(e) => {
                    setTonnage(e.target.value);
                    setWattsPerTon(String(TONNAGE_WATTS[e.target.value] ?? 1200));
                  }}
                >
                  <MenuItem value="1">1 Ton</MenuItem>
                  <MenuItem value="1.5">1.5 Ton</MenuItem>
                  <MenuItem value="2">2 Ton</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Watts Per Ton (reference)"
                type="number"
                value={wattsPerTon}
                onChange={(e) => setWattsPerTon(e.target.value)}
                fullWidth
                slotProps={{ input: { endAdornment: <InputAdornment position="end">W/ton</InputAdornment> } }}
              />
            </>
          ) : (
            <TextField
              label="AC Wattage"
              type="number"
              value={wattage}
              onChange={(e) => setWattage(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
            />
          )}

          <TextField
            label="Hours Run Per Day"
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hours</InputAdornment> } }}
          />
          <TextField
            label="Electricity Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Monthly Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.monthlyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily Cost</Typography>
            <Typography fontWeight={600}>{money(result.dailyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily Energy Use</Typography>
            <Typography fontWeight={600}>{result.dailyKwh.toFixed(2)} kWh</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated Wattage</Typography>
            <Typography fontWeight={600}>{result.watts.toFixed(0)} W</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AirConditionerRunningCostCalculator;
