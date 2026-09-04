'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'count' | 'strip';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const LedWattageCalculator = () => {
  const [mode, setMode] = useState<Mode>('count');
  const [ledCount, setLedCount] = useState('20');
  const [wattPerLed, setWattPerLed] = useState('0.5');
  const [stripLength, setStripLength] = useState('5');
  const [wattPerMeter, setWattPerMeter] = useState('9.6');
  const [hoursPerDay, setHoursPerDay] = useState('6');
  const [price, setPrice] = useState('0.15');

  const result = useMemo(() => {
    const h = parseFloat(hoursPerDay) || 0;
    const p = parseFloat(price) || 0;

    let totalWatts: number;
    if (mode === 'count') {
      totalWatts = (parseFloat(ledCount) || 0) * (parseFloat(wattPerLed) || 0);
    } else {
      totalWatts = (parseFloat(stripLength) || 0) * (parseFloat(wattPerMeter) || 0);
    }

    const dailyKwh = (totalWatts / 1000) * h;
    const dailyCost = dailyKwh * p;

    return { totalWatts, dailyKwh, dailyCost, monthlyCost: dailyCost * 30 };
  }, [mode, ledCount, wattPerLed, stripLength, wattPerMeter, hoursPerDay, price]);

  const content = (
    <>
      <Typography variant="h2">How LED Total Wattage Is Calculated</Typography>
      <Typography variant="body1">
        This calculator finds the total power consumption of a group of LEDs or an LED strip — different from
        sizing a current-limiting series resistor for a single LED circuit. Enter either the number of
        individual LEDs and the wattage of each, or the length of an LED strip and its watts-per-meter rating
        (printed on most strip packaging), to get total wattage. From there, adding hours run per day and your
        electricity price estimates the running cost, the same way other appliance cost calculators on this
        site work.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Wattage (by count) = Number of LEDs × Watts per LED
        <br />
        Total Wattage (by strip) = Strip Length (m) × Watts per Meter
        <br />
        Daily Cost = (Total Wattage ÷ 1000) × Hours per Day × Price per kWh
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        20 LEDs at 0.5W each draw 10W total. A 5-meter LED strip rated at 9.6W per meter draws 48W total. Run
        for 6 hours a day at $0.15 per kWh, that 48W strip costs about $0.043 a day, or roughly $1.30 a month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing a power supply for a run of LED strip lighting or an array of individual LEDs.</li>
          <li>Estimating the electricity cost of decorative or accent LED lighting.</li>
          <li>Comparing total power draw between different LED strip densities or LED counts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from an LED resistor calculator?</Typography>
      <Typography variant="body1">
        An LED resistor calculator sizes the current-limiting resistor needed for a single LED circuit using
        Ohm&apos;s Law. This tool instead totals up power consumption across many LEDs or a whole strip, which
        is useful for power supply sizing and estimating running costs rather than circuit design.
      </Typography>
      <Typography variant="h3">Where do I find watts-per-meter for my LED strip?</Typography>
      <Typography variant="body1">
        It&apos;s usually printed on the strip&apos;s packaging or spec sheet — common values range from about
        4.8W/m for basic strips to 14.4W/m or higher for dense, high-brightness strips. Check your specific
        product for an accurate figure.
      </Typography>
      <Typography variant="h3">Does this account for power supply efficiency losses?</Typography>
      <Typography variant="body1">
        No — this calculates the LEDs&apos; own power draw. A power supply or driver isn&apos;t 100% efficient,
        so actual wall-outlet power consumption will be somewhat higher than the LED wattage alone, typically by
        10-20% depending on the driver.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/led-wattage-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth>
            <ToggleButton value="count">Number of LEDs</ToggleButton>
            <ToggleButton value="strip">LED Strip Length</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'count' ? (
            <>
              <TextField
                label="Number of LEDs"
                type="number"
                value={ledCount}
                onChange={(e) => setLedCount(e.target.value)}
                fullWidth
              />
              <TextField
                label="Wattage Per LED"
                type="number"
                value={wattPerLed}
                onChange={(e) => setWattPerLed(e.target.value)}
                fullWidth
                slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
              />
            </>
          ) : (
            <>
              <TextField
                label="Strip Length"
                type="number"
                value={stripLength}
                onChange={(e) => setStripLength(e.target.value)}
                fullWidth
                slotProps={{ input: { endAdornment: <InputAdornment position="end">m</InputAdornment> } }}
              />
              <TextField
                label="Watts Per Meter"
                type="number"
                value={wattPerMeter}
                onChange={(e) => setWattPerMeter(e.target.value)}
                fullWidth
                slotProps={{ input: { endAdornment: <InputAdornment position="end">W/m</InputAdornment> } }}
              />
            </>
          )}

          <TextField
            label="Hours Run Per Day (optional)"
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hours</InputAdornment> } }}
          />
          <TextField
            label="Electricity Price (optional)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Wattage</Typography>
            <Typography variant="h3" fontWeight="bold">{result.totalWatts.toFixed(1)} W</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily Energy Use</Typography>
            <Typography fontWeight={600}>{result.dailyKwh.toFixed(3)} kWh</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily Running Cost</Typography>
            <Typography fontWeight={600}>{money(result.dailyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Running Cost</Typography>
            <Typography fontWeight={600}>{money(result.monthlyCost)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LedWattageCalculator;
