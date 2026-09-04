'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type UnitSystem = 'mpg' | 'l100km';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const FuelSavingsCalculator = () => {
  const [system, setSystem] = useState<UnitSystem>('mpg');
  const [distance, setDistance] = useState('12000');
  const [period, setPeriod] = useState<'annual' | 'monthly'>('annual');
  const [fuelPrice, setFuelPrice] = useState('3.5');
  const [efficiencyA, setEfficiencyA] = useState('25');
  const [efficiencyB, setEfficiencyB] = useState('40');

  const result = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const price = parseFloat(fuelPrice) || 0;
    const effA = parseFloat(efficiencyA) || 0;
    const effB = parseFloat(efficiencyB) || 0;

    const costFor = (eff: number) => {
      if (eff <= 0) return 0;
      if (system === 'mpg') return (d / eff) * price;
      return (d / 100) * eff * price;
    };

    const costA = costFor(effA);
    const costB = costFor(effB);
    const higher = Math.max(costA, costB);
    const lower = Math.min(costA, costB);
    const savings = higher - lower;
    const savingsPercent = higher > 0 ? (savings / higher) * 100 : 0;
    const betterVehicle = costA === costB ? 'tie' : costA < costB ? 'A' : 'B';

    return { costA, costB, savings, savingsPercent, betterVehicle };
  }, [system, distance, fuelPrice, efficiencyA, efficiencyB]);

  const distLabel = period === 'annual' ? 'Annual Distance Driven' : 'Monthly Distance Driven';
  const effUnit = system === 'mpg' ? 'mpg' : 'L/100km';
  const priceUnit = system === 'mpg' ? '/ gallon' : '/ liter';

  const content = (
    <>
      <Typography variant="h2">How Fuel Savings Between Two Vehicles Is Calculated</Typography>
      <Typography variant="body1">
        This calculator compares the fuel cost of two vehicles based on their fuel efficiency, how far you
        drive, and the price of fuel, so you can see exactly how much choosing the more efficient one saves you
        in both dollars and percentage terms. It works with either mpg (miles per gallon, higher is better) or
        L/100km (liters per 100 kilometers, lower is better) — pick whichever unit matches how your vehicles'
        efficiency is listed.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Fuel Cost (mpg) = (Distance ÷ MPG) × Price Per Gallon
        <br />
        Fuel Cost (L/100km) = (Distance ÷ 100) × L/100km × Price Per Liter
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Driving 12,000 miles a year at $3.50 per gallon, a 25 mpg vehicle costs about $1,680 a year in fuel,
        while a 40 mpg vehicle costs about $1,050 — a savings of $630, or roughly 37.5%, from choosing the more
        efficient vehicle.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding between two cars when shopping, factoring in long-term fuel costs.</li>
          <li>Estimating how much a hybrid or more efficient vehicle saves over a gas-heavier one.</li>
          <li>Comparing a current vehicle against a potential replacement before trading in.</li>
          <li>Justifying the upfront cost premium of a more fuel-efficient vehicle over time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does a lower L/100km number mean better efficiency?</Typography>
      <Typography variant="body1">
        L/100km measures how much fuel is used to travel a fixed distance, so using less fuel for the same
        distance is better — the opposite of mpg, where a higher number (more miles per gallon) is better.
      </Typography>
      <Typography variant="h3">Does this account for differences in fuel type?</Typography>
      <Typography variant="body1">
        No — enter the fuel price each vehicle actually uses (regular, premium, or diesel) separately if they
        differ, since this calculator assumes a single fuel price applies to both vehicles' cost comparison.
      </Typography>
      <Typography variant="h3">Should I use my real-world mileage or the manufacturer's rating?</Typography>
      <Typography variant="body1">
        Real-world fuel economy is often somewhat lower than official manufacturer ratings, especially in city
        driving or cold weather. Using your own tracked average, if available, gives a more accurate savings
        estimate than the sticker rating alone.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fuel-savings-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup value={system} exclusive onChange={(_, v) => v && setSystem(v)} fullWidth>
            <ToggleButton value="mpg">MPG</ToggleButton>
            <ToggleButton value="l100km">L/100km</ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup value={period} exclusive onChange={(_, v) => v && setPeriod(v)} size="small" fullWidth>
            <ToggleButton value="annual">Annual Distance</ToggleButton>
            <ToggleButton value="monthly">Monthly Distance</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label={distLabel}
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">{system === 'mpg' ? 'mi' : 'km'}</InputAdornment> } }}
          />
          <TextField
            label="Fuel Price"
            type="number"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">{priceUnit}</InputAdornment> } }}
          />
          <TextField
            label="Vehicle A Efficiency"
            type="number"
            value={efficiencyA}
            onChange={(e) => setEfficiencyA(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">{effUnit}</InputAdornment> } }}
          />
          <TextField
            label="Vehicle B Efficiency"
            type="number"
            value={efficiencyB}
            onChange={(e) => setEfficiencyB(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">{effUnit}</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Fuel Savings</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.savings)}</Typography>
            <Typography variant="body2">({result.savingsPercent.toFixed(1)}%)</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Vehicle A Fuel Cost</Typography>
            <Typography fontWeight={600}>{money(result.costA)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Vehicle B Fuel Cost</Typography>
            <Typography fontWeight={600}>{money(result.costB)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>More Efficient Vehicle</Typography>
            <Typography fontWeight={600}>
              {result.betterVehicle === 'tie' ? 'Tie' : `Vehicle ${result.betterVehicle}`}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FuelSavingsCalculator;
