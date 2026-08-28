'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Service = 'standard' | 'express' | 'priority';

const SERVICE_BASE: Record<Service, number> = { standard: 5, express: 10, priority: 20 };
const SERVICE_WEIGHT_PER_KG: Record<Service, number> = { standard: 0.5, express: 0.9, priority: 1.5 };
const SERVICE_DISTANCE_PER_KM: Record<Service, number> = { standard: 0.1, express: 0.2, priority: 0.35 };

const CourierChargeCalculator = () => {
  const [weight, setWeight] = useState('2');
  const [distance, setDistance] = useState('50');
  const [service, setService] = useState<Service>('standard');
  const [fuel, setFuel] = useState('10');

  const moneyFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  const result = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const d = parseFloat(distance) || 0;
    const fuelPct = parseFloat(fuel) || 0;

    const base = SERVICE_BASE[service];
    const weightCharge = w * SERVICE_WEIGHT_PER_KG[service];

    let distanceCharge = 0;
    // Distance tiers: first 10km, next 100km, beyond
    const firstTier = Math.min(d, 10);
    const secondTier = Math.min(Math.max(d - 10, 0), 100);
    const thirdTier = Math.max(d - 110, 0);
    distanceCharge += firstTier * SERVICE_DISTANCE_PER_KM[service];
    distanceCharge += secondTier * SERVICE_DISTANCE_PER_KM[service] * 0.8;
    distanceCharge += thirdTier * SERVICE_DISTANCE_PER_KM[service] * 0.6;

    const subtotal = base + weightCharge + distanceCharge;
    const fuelCharge = subtotal * (fuelPct / 100);
    const total = subtotal + fuelCharge;

    return { base, weightCharge, distanceCharge, firstTier, secondTier, thirdTier, fuelCharge, subtotal, total, w, d };
  }, [weight, distance, service, fuel]);

  const content = (
    <>
      <Typography variant="h2">How is a Courier Charge Calculated?</Typography>
      <Typography variant="body1">
        This courier charge estimator combines a fixed base rate per service, a per-kilogram weight charge, a distance-based charge with tiered rates, and an optional fuel surcharge. Long distances become cheaper per kilometer through the tiers.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total = Base + (Weight × per-kg) + (Distance tiers) + Fuel Surcharge<br />
        Tiers: first 10 km at full rate, next 100 km at 80%, beyond at 60%
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2 kg standard parcel over 50 km: base $5.00 + weight 2 × $0.50 = $1.00 + distance (10 × $0.10 + 40 × $0.08) = $4.20 = subtotal $10.20. A 10% fuel surcharge adds $1.02, for a total of $11.22.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating shipping costs before sending a parcel.</li>
          <li>Comparing standard, express, and priority service pricing.</li>
          <li>Budgeting e-commerce fulfillment and logistics spend.</li>
          <li>Planning deliveries across short vs. long distances.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does the fuel surcharge do?</Typography>
      <Typography variant="body1">
        Carriers pass on fuel price changes as a percentage surcharge added on top of the base shipping cost. Enter the current surcharge rate (check your carrier's fuel table) to see its effect on the final price.
      </Typography>
      <Typography variant="h3">Why does long-distance shipping get cheaper per km?</Typography>
      <Typography variant="body1">
        Many of the fixed costs (pickup, sorting, handling) are already covered in the base and weight charges, so the per-kilometer marginal cost tends to fall for longer hauls. This calculator reflects that with tiered distance rates.
      </Typography>
      <Typography variant="h3">Is this an official pricing quote?</Typography>
      <Typography variant="body1">
        No — this is an estimate based on simplified, illustrative rates. Actual courier pricing depends on the specific carrier, zone, packaging, insurance, and additional fees. Use it to compare services and budget, then confirm with your carrier for an exact quote.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/courier-charge-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Service Type</Typography>
            <ToggleButtonGroup value={service} exclusive onChange={(_, v) => v && setService(v)} fullWidth>
              <ToggleButton value="standard">Standard</ToggleButton>
              <ToggleButton value="express">Express</ToggleButton>
              <ToggleButton value="priority">Priority</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <TextField label="Package Weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }} fullWidth />
          <TextField label="Distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">km</InputAdornment> } }} fullWidth />
          <TextField label="Fuel Surcharge" type="number" value={fuel} onChange={(e) => setFuel(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Cost Breakdown</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Total</Typography>
            <Typography variant="h3" fontWeight="bold">{moneyFmt.format(result.total)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Base Rate ({service})</Typography>
              <Typography variant="body2" fontWeight={600}>{moneyFmt.format(result.base)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Weight Charge ({result.w} kg)</Typography>
              <Typography variant="body2" fontWeight={600}>{moneyFmt.format(result.weightCharge)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Distance Charge ({result.d} km)</Typography>
              <Typography variant="body2" fontWeight={600}>{moneyFmt.format(result.distanceCharge)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2" fontWeight={600}>{moneyFmt.format(result.subtotal)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Fuel Surcharge ({result.w > 0 || result.d > 0 ? fuel : 0}%)</Typography>
              <Typography variant="body2" fontWeight={600}>{moneyFmt.format(result.fuelCharge)}</Typography>
            </Box>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>Distance Tiers Applied</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">First 10 km ({result.firstTier.toFixed(0)} km)</Typography>
              <Typography variant="body2" fontWeight={600}>full rate</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Next 100 km ({result.secondTier.toFixed(0)} km)</Typography>
              <Typography variant="body2" fontWeight={600}>80% rate</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Beyond 110 km ({result.thirdTier.toFixed(0)} km)</Typography>
              <Typography variant="body2" fontWeight={600}>60% rate</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default CourierChargeCalculator;
