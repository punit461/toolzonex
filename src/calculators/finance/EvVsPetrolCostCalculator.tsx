'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type EvUnit = 'mi_per_kwh' | 'kwh_per_100mi';
type PetrolUnit = 'mpg' | 'l100km';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const EvVsPetrolCostCalculator = () => {
  const [distance, setDistance] = useState('1000');
  const [distanceUnit] = useState<'mi'>('mi');

  const [evUnit, setEvUnit] = useState<EvUnit>('mi_per_kwh');
  const [evPrice, setEvPrice] = useState('0.15');
  const [evEfficiency, setEvEfficiency] = useState('3.5');

  const [petrolUnit, setPetrolUnit] = useState<PetrolUnit>('mpg');
  const [petrolPrice, setPetrolPrice] = useState('3.5');
  const [petrolEfficiency, setPetrolEfficiency] = useState('28');

  const result = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const evP = parseFloat(evPrice) || 0;
    const evE = parseFloat(evEfficiency) || 0;
    const petP = parseFloat(petrolPrice) || 0;
    const petE = parseFloat(petrolEfficiency) || 0;

    let evCost = 0;
    if (evE > 0) {
      const miPerKwh = evUnit === 'mi_per_kwh' ? evE : 100 / evE;
      evCost = (d / miPerKwh) * evP;
    }

    let petrolCost = 0;
    if (petE > 0) {
      if (petrolUnit === 'mpg') {
        petrolCost = (d / petE) * petP;
      } else {
        // L/100km: convert distance in miles to km, then apply L/100km rate.
        const distanceKm = d * 1.60934;
        petrolCost = (distanceKm / 100) * petE * petP;
      }
    }

    const savings = Math.abs(evCost - petrolCost);
    const cheaper = evCost === petrolCost ? 'tie' : evCost < petrolCost ? 'ev' : 'petrol';

    return { evCost, petrolCost, savings, cheaper };
  }, [distance, evUnit, evPrice, evEfficiency, petrolUnit, petrolPrice, petrolEfficiency]);

  const content = (
    <>
      <Typography variant="h2">How to Use the EV vs Petrol Cost Calculator</Typography>
      <Typography variant="body1">
        Enter the distance you want to compare over, then fill in each side&apos;s cost inputs. For the EV
        side, enter electricity price per kWh and efficiency — either miles per kWh, or kWh per 100 miles,
        whichever your vehicle&apos;s spec sheet uses. For the petrol side, enter fuel price per gallon or
        liter and efficiency in mpg or L/100km. The calculator bridges these two completely different unit
        systems into a single comparable dollar cost for the same distance.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        EV Cost = (Distance ÷ Miles per kWh) × Price per kWh
        <br />
        Petrol Cost (mpg) = (Distance ÷ MPG) × Price per Gallon
        <br />
        Petrol Cost (L/100km) = (Distance in km ÷ 100) × L/100km × Price per Liter
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Over 1,000 miles, an EV averaging 3.5 mi/kWh at $0.15/kWh costs about {money(result.evCost)} in
        electricity. A gas car averaging 28 mpg at $3.50/gallon costs about {money(result.petrolCost)} in
        fuel for the same distance — a difference of about {money(result.savings)}.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether switching from a gas vehicle to an EV would lower your fuel/energy costs.</li>
          <li>Comparing running costs when cross-shopping an EV against a gas or hybrid alternative.</li>
          <li>Estimating long-term energy savings before committing to an EV purchase or lease.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Fuel Savings Calculator?</strong> The Fuel Savings Calculator compares two vehicles using the SAME fuel-type efficiency units — both in mpg or both in L/100km — which only works for comparing two gas or diesel vehicles. This tool specifically bridges electricity (cost-per-kWh) against petrol (cost-per-gallon or liter), the two fundamentally different unit systems needed to compare an EV against a gas vehicle.</li>
          <li><strong>Which EV efficiency unit should I use?</strong> Use whichever your EV's spec sheet lists — miles per kWh (higher is better) or kWh per 100 miles (lower is better). Either one is converted internally to the same underlying cost calculation, so the result is identical either way.</li>
          <li><strong>Does this account for public charging costs, which are often higher than home charging?</strong> No — enter whatever electricity price actually applies to your typical charging pattern. If you charge mostly at public stations at a higher rate, use that blended rate instead of a flat home electricity rate for a more accurate comparison.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/ev-vs-petrol-cost-calculator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
        <TextField
          label="Distance to Compare" type="number" value={distance} onChange={(e) => setDistance(e.target.value)}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">{distanceUnit}</InputAdornment> } }}
          sx={{ maxWidth: 320 }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>Electric Vehicle</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ToggleButtonGroup value={evUnit} exclusive onChange={(_, v) => v && setEvUnit(v)} size="small" fullWidth>
              <ToggleButton value="mi_per_kwh">mi / kWh</ToggleButton>
              <ToggleButton value="kwh_per_100mi">kWh / 100mi</ToggleButton>
            </ToggleButtonGroup>
            <TextField
              label="Electricity Price" type="number" value={evPrice} onChange={(e) => setEvPrice(e.target.value)}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
            />
            <TextField
              label="Efficiency" type="number" value={evEfficiency} onChange={(e) => setEvEfficiency(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{evUnit === 'mi_per_kwh' ? 'mi/kWh' : 'kWh/100mi'}</InputAdornment> } }}
            />
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>Petrol Vehicle</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <ToggleButtonGroup value={petrolUnit} exclusive onChange={(_, v) => v && setPetrolUnit(v)} size="small" fullWidth>
              <ToggleButton value="mpg">MPG</ToggleButton>
              <ToggleButton value="l100km">L/100km</ToggleButton>
            </ToggleButtonGroup>
            <TextField
              label="Fuel Price" type="number" value={petrolPrice} onChange={(e) => setPetrolPrice(e.target.value)}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">{petrolUnit === 'mpg' ? '/ gal' : '/ liter'}</InputAdornment> } }}
            />
            <TextField
              label="Efficiency" type="number" value={petrolEfficiency} onChange={(e) => setPetrolEfficiency(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{petrolUnit === 'mpg' ? 'mpg' : 'L/100km'}</InputAdornment> } }}
            />
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">EV Cost</Typography>
          <Typography variant="h5" fontWeight={700}>{money(result.evCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Petrol Cost</Typography>
          <Typography variant="h5" fontWeight={700}>{money(result.petrolCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">
            {result.cheaper === 'tie' ? 'Equal Cost' : result.cheaper === 'ev' ? 'EV Saves' : 'Petrol Saves'}
          </Typography>
          <Typography variant="h5" fontWeight={700}>{money(result.savings)}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EvVsPetrolCostCalculator;
