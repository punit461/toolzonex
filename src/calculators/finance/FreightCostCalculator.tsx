'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type UnitSystem = 'metric' | 'imperial';

const DIVISORS: Record<UnitSystem, number> = { metric: 5000, imperial: 139 };

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const FreightCostCalculator = () => {
  const [system, setSystem] = useState<UnitSystem>('metric');
  const [length, setLength] = useState('60');
  const [width, setWidth] = useState('40');
  const [height, setHeight] = useState('40');
  const [actualWeight, setActualWeight] = useState('20');
  const [divisor, setDivisor] = useState('5000');
  const [ratePerUnit, setRatePerUnit] = useState('3');

  const dimUnit = system === 'metric' ? 'cm' : 'in';
  const weightUnit = system === 'metric' ? 'kg' : 'lb';

  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const actual = parseFloat(actualWeight) || 0;
    const div = parseFloat(divisor) || DIVISORS[system];
    const rate = parseFloat(ratePerUnit) || 0;

    const volumetricWeight = div > 0 ? (l * w * h) / div : 0;
    const chargeableWeight = Math.max(actual, volumetricWeight);
    const totalCost = chargeableWeight * rate;
    const billedOn = volumetricWeight > actual ? 'volumetric' : 'actual';

    return { volumetricWeight, chargeableWeight, totalCost, billedOn };
  }, [length, width, height, actualWeight, divisor, ratePerUnit, system]);

  const content = (
    <>
      <Typography variant="h2">How Freight Cost and Volumetric Weight Are Calculated</Typography>
      <Typography variant="body1">
        Freight carriers bill shipments on whichever is greater: the shipment&apos;s actual weight or its
        volumetric (dimensional) weight — an industry-standard way of charging for bulky, lightweight packages
        that take up a lot of truck or cargo space without weighing much. Volumetric weight is calculated from
        the shipment&apos;s length, width, and height divided by a dimensional divisor (a standard industry
        factor — commonly 5000 for centimeters and kilograms, or 139 for inches and pounds). Whichever weight
        is higher — actual or volumetric — becomes the chargeable weight used to compute the total cost. This is
        the key difference between freight billing and a simple small-parcel courier calculation, which
        typically bills on actual weight and distance alone.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Volumetric Weight = (Length × Width × Height) ÷ Dimensional Divisor
        <br />
        Chargeable Weight = MAX(Actual Weight, Volumetric Weight)
        <br />
        Total Cost = Chargeable Weight × Rate Per Unit
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A box measuring 60 × 40 × 40 cm with a divisor of 5000 has a volumetric weight of (60 × 40 × 40) ÷ 5000
        = 19.2 kg. If it actually weighs 20 kg, the carrier bills on the higher figure — the 20 kg actual weight
        — since it exceeds the volumetric weight in this case. At $3 per kg, that&apos;s a $60 freight charge.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating freight cost for bulky but lightweight shipments before booking a carrier.</li>
          <li>Understanding why a large, light package costs more to ship than its actual weight suggests.</li>
          <li>Comparing packaging options to reduce dimensional weight and lower shipping cost.</li>
          <li>Budgeting freight spend for pallets, crates, or oversized e-commerce shipments.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is volumetric (dimensional) weight, and why does it exist?</Typography>
      <Typography variant="body1">
        Volumetric weight estimates how much space a shipment takes up relative to its actual weight. Carriers
        use it because a truck, plane, or container has limited space — a large, light box can cost the carrier
        more in lost capacity than a small, heavy one of the same actual weight, so billing on whichever weight
        is greater keeps pricing fair to the carrier.
      </Typography>
      <Typography variant="h3">Why do the two common divisors (5000 and 139) differ?</Typography>
      <Typography variant="body1">
        They're the same underlying conversion factor expressed in different unit systems — 5000 is used with
        centimeters and kilograms, while 139 is the equivalent factor for inches and pounds. Some carriers and
        freight modes (air vs. ocean vs. road) may use other divisors, so always confirm the exact figure with
        your carrier.
      </Typography>
      <Typography variant="h3">How is this different from a small-parcel courier calculator?</Typography>
      <Typography variant="body1">
        A courier or small-parcel calculator usually just multiplies actual weight and distance by a flat or
        tiered rate. Freight billing specifically accounts for dimensional weight because freight shipments are
        often bulkier relative to their weight — this calculator adds that volumetric-weight comparison, which
        a simple parcel calculator doesn&apos;t need.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/freight-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup
            value={system}
            exclusive
            onChange={(_, v) => {
              if (!v) return;
              setSystem(v);
              setDivisor(String(DIVISORS[v as UnitSystem]));
            }}
            fullWidth
          >
            <ToggleButton value="metric">Metric (cm / kg)</ToggleButton>
            <ToggleButton value="imperial">Imperial (in / lb)</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <TextField
              label="Length"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{dimUnit}</InputAdornment> } }}
            />
            <TextField
              label="Width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{dimUnit}</InputAdornment> } }}
            />
            <TextField
              label="Height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{dimUnit}</InputAdornment> } }}
            />
          </Box>

          <TextField
            label="Actual Weight"
            type="number"
            value={actualWeight}
            onChange={(e) => setActualWeight(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment> } }}
          />
          <TextField
            label="Dimensional Divisor"
            type="number"
            value={divisor}
            onChange={(e) => setDivisor(e.target.value)}
            fullWidth
            helperText={`Standard: 5000 for cm³/kg, 139 for in³/lb`}
          />
          <TextField
            label="Rate Per Unit"
            type="number"
            value={ratePerUnit}
            onChange={(e) => setRatePerUnit(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ {weightUnit}</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Freight Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.totalCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Volumetric Weight</Typography>
            <Typography fontWeight={600}>{result.volumetricWeight.toFixed(2)} {weightUnit}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Chargeable Weight</Typography>
            <Typography fontWeight={600}>{result.chargeableWeight.toFixed(2)} {weightUnit}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Billed On</Typography>
            <Typography fontWeight={600} sx={{ textTransform: 'capitalize' }}>{result.billedOn} weight</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FreightCostCalculator;
