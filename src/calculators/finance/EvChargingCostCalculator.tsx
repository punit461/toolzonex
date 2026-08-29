'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const EvChargingCostCalculatorContent = () => {
  const [capacity, setCapacity] = useState('75');
  const [currentCharge, setCurrentCharge] = useState('20');
  const [targetCharge, setTargetCharge] = useState('90');
  const [price, setPrice] = useState('0.15');
  const [efficiency, setEfficiency] = useState('90');
  const [milesPerKwh, setMilesPerKwh] = useState('3.5');

  const result = useMemo(() => {
    const cap = parseFloat(capacity) || 0;
    const cur = parseFloat(currentCharge) || 0;
    const target = parseFloat(targetCharge) || 0;
    const p = parseFloat(price) || 0;
    const eff = (parseFloat(efficiency) || 0) / 100;
    const mpk = parseFloat(milesPerKwh) || 0;

    const pctToAdd = Math.max(target - cur, 0);
    const energyToBattery = cap * (pctToAdd / 100);
    const energyFromWall = eff > 0 ? energyToBattery / eff : 0;
    const cost = energyFromWall * p;
    const addedRange = mpk > 0 ? energyToBattery * mpk : null;

    return { pctToAdd, energyToBattery, energyFromWall, cost, addedRange };
  }, [capacity, currentCharge, targetCharge, price, efficiency, milesPerKwh]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Battery Capacity"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">kWh</InputAdornment> } }}
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Current Charge"
            type="number"
            value={currentCharge}
            onChange={(e) => setCurrentCharge(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Target Charge"
            type="number"
            value={targetCharge}
            onChange={(e) => setTargetCharge(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>
        <TextField
          label="Electricity Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
        />
        <TextField
          label="Charger Efficiency"
          type="number"
          value={efficiency}
          onChange={(e) => setEfficiency(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <TextField
          label="Vehicle Efficiency (Optional)"
          type="number"
          value={milesPerKwh}
          onChange={(e) => setMilesPerKwh(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">miles / kWh</InputAdornment> } }}
          helperText="Leave as-is or clear it if you don't want an added-range estimate."
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Cost to Charge</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.cost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Energy Added to Battery</Typography>
          <Typography fontWeight={600}>{result.energyToBattery.toFixed(2)} kWh</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Energy Drawn From Wall</Typography>
          <Typography fontWeight={600}>{result.energyFromWall.toFixed(2)} kWh</Typography>
        </Paper>
        {result.addedRange !== null && (
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated Added Range</Typography>
            <Typography fontWeight={600}>{result.addedRange.toFixed(0)} miles</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const EvChargingCostCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the EV Charging Cost Calculator Work?</Typography>
      <Typography variant="body1">
        Enter your EV&apos;s battery capacity, its current charge level, your target charge level, and
        your electricity price. The calculator finds how much energy needs to reach the battery (capacity
        × percentage to add), then divides by the charger&apos;s efficiency to find how much energy is
        actually drawn from the wall — chargers lose a portion of energy as heat during conversion, so
        you pay for more than the battery actually receives. That wall-drawn figure, multiplied by your
        electricity price, gives the total charging cost. If you provide your vehicle&apos;s efficiency in
        miles per kWh, the calculator also estimates the driving range added by the charge.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 75 kWh battery charged from 20% to 90% needs 52.5 kWh delivered to the battery. At 90% charger
        efficiency, that requires drawing about 58.3 kWh from the wall. At $0.15/kWh, the charge costs
        about $8.75. At 3.5 miles per kWh, the 52.5 kWh added to the battery is worth roughly 184 miles
        of extra range.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing home charging costs against public fast-charging station prices.</li>
          <li>Budgeting monthly EV charging costs based on typical daily driving.</li>
          <li>Deciding how far to charge before a trip based on cost versus needed range.</li>
          <li>Estimating cost-per-mile for an EV to compare against a gasoline vehicle.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is the energy drawn from the wall more than what reaches the battery?</Typography>
      <Typography variant="body1">
        Charging involves converting AC power from the wall into DC power stored in the battery, and
        that conversion isn&apos;t perfectly efficient — some energy is lost as heat. A 90% efficiency
        figure means you draw about 11% more energy from the wall than actually ends up stored.
      </Typography>
      <Typography variant="h3">What efficiency should I use for my charger?</Typography>
      <Typography variant="body1">
        Most modern Level 2 home chargers run around 85-95% efficient; fast DC chargers can vary more.
        If you don&apos;t know your charger&apos;s exact rating, 90% is a reasonable default estimate.
      </Typography>
      <Typography variant="h3">Does this include demand charges or time-of-use rates?</Typography>
      <Typography variant="body1">
        No — this calculator uses a single flat electricity price. If your utility charges different
        rates by time of day, run the calculation using the rate that applies during your actual
        charging window for a more accurate cost.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/ev-charging-cost-calculator" content={content}>
      <EvChargingCostCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EvChargingCostCalculator;
