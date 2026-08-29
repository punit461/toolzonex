'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface ExtraCost {
  id: number;
  label: string;
  amount: string;
}

const DEFAULT_EXTRAS: ExtraCost[] = [
  { id: 1, label: 'Tolls', amount: '15' },
  { id: 2, label: 'Parking', amount: '10' },
  { id: 3, label: 'Food', amount: '40' },
];

const TripCostCalculatorContent = () => {
  const [distance, setDistance] = useState('300');
  const [efficiency, setEfficiency] = useState('30');
  const [fuelPrice, setFuelPrice] = useState('3.5');
  const [extras, setExtras] = useState<ExtraCost[]>(DEFAULT_EXTRAS);
  const [nextId, setNextId] = useState(DEFAULT_EXTRAS.length + 1);

  const addExtra = () => {
    setExtras([...extras, { id: nextId, label: 'Other', amount: '0' }]);
    setNextId(nextId + 1);
  };
  const removeExtra = (id: number) => setExtras(extras.filter((e) => e.id !== id));
  const updateExtra = (id: number, field: 'label' | 'amount', v: string) =>
    setExtras(extras.map((e) => (e.id === id ? { ...e, [field]: v } : e)));

  const result = useMemo(() => {
    const dist = parseFloat(distance) || 0;
    const mpg = parseFloat(efficiency) || 0;
    const price = parseFloat(fuelPrice) || 0;
    const extrasTotal = extras.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const fuelNeeded = mpg > 0 ? dist / mpg : 0;
    const fuelCost = fuelNeeded * price;
    const totalCost = fuelCost + extrasTotal;
    const costPerMile = dist > 0 ? totalCost / dist : 0;

    return { fuelNeeded, fuelCost, extrasTotal, totalCost, costPerMile };
  }, [distance, efficiency, fuelPrice, extras]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Trip Distance"
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">miles</InputAdornment> } }}
        />
        <TextField
          label="Vehicle Fuel Efficiency"
          type="number"
          value={efficiency}
          onChange={(e) => setEfficiency(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">mpg</InputAdornment> } }}
        />
        <TextField
          label="Fuel Price"
          type="number"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ gallon</InputAdornment> } }}
        />

        <Typography variant="subtitle1" fontWeight={600}>Extra Costs</Typography>
        {extras.map((e) => (
          <Box key={e.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField label="Item" value={e.label} onChange={(ev) => updateExtra(e.id, 'label', ev.target.value)} size="small" sx={{ flex: 2 }} />
            <TextField
              label="Amount"
              type="number"
              value={e.amount}
              onChange={(ev) => updateExtra(e.id, 'amount', ev.target.value)}
              size="small"
              sx={{ flex: 1 }}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <IconButton onClick={() => removeExtra(e.id)} size="small" aria-label="Remove item">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addExtra} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Extra Cost
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Total Trip Cost</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.totalCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Fuel Needed</Typography>
          <Typography fontWeight={600}>{result.fuelNeeded.toFixed(1)} gallons</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Fuel Cost</Typography>
          <Typography fontWeight={600}>{money(result.fuelCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Extra Costs</Typography>
          <Typography fontWeight={600}>{money(result.extrasTotal)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Cost Per Mile</Typography>
          <Typography fontWeight={600}>{money(result.costPerMile)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const TripCostCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Trip Cost Calculator Work?</Typography>
      <Typography variant="body1">
        Enter your trip distance, your vehicle&apos;s fuel efficiency, and the current fuel price. The
        calculator divides distance by fuel efficiency to get the gallons needed, then multiplies by
        the fuel price to get the fuel cost. Add any extra costs — tolls, parking, food, or anything
        else — as separate line items, and the calculator adds them to the fuel cost for a total trip
        cost, plus a cost-per-mile figure.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 300-mile trip in a car that gets 30 mpg needs 10 gallons of fuel. At $3.50 per gallon, that&apos;s
        $35 in fuel. Adding $15 in tolls, $10 in parking, and $40 for food brings the total trip cost to
        $100 — about $0.33 per mile.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting for a road trip before you leave.</li>
          <li>Comparing the true cost of driving versus flying or taking a train.</li>
          <li>Splitting trip costs fairly among passengers based on the total.</li>
          <li>Estimating reimbursable travel expenses for work trips.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this account for round trips?</Typography>
      <Typography variant="body1">
        Enter the total distance you&apos;ll actually drive — if it&apos;s a round trip, double your
        one-way distance before entering it, or enter the full round-trip mileage directly.
      </Typography>
      <Typography variant="h3">What if my vehicle&apos;s fuel efficiency varies by driving conditions?</Typography>
      <Typography variant="body1">
        Use a conservative (lower) mpg figure for highway-and-city mixed driving, or your vehicle&apos;s
        combined EPA rating, to avoid underestimating fuel cost. Aggressive driving, cargo weight, and
        terrain can all reduce real-world efficiency below the rated figure.
      </Typography>
      <Typography variant="h3">Can I use this for an electric vehicle?</Typography>
      <Typography variant="body1">
        Not directly — this calculator is built around gallons and fuel price. For an EV, use a
        dedicated EV charging cost calculator that works in kWh and electricity price instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/trip-cost-calculator" content={content}>
      <TripCostCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TripCostCalculator;
