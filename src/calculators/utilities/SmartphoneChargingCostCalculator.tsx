'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;

const SmartphoneChargingCostCalculator = () => {
  const [capacity, setCapacity] = useState('4000');
  const [voltage, setVoltage] = useState('3.85');
  const [chargesPerWeek, setChargesPerWeek] = useState('7');
  const [efficiency, setEfficiency] = useState('85');
  const [rate, setRate] = useState('0.16');

  const mah = parseFloat(capacity) || 0;
  const v = parseFloat(voltage) || 0;
  const charges = parseFloat(chargesPerWeek) || 0;
  const eff = parseFloat(efficiency) || 0;
  const r = parseFloat(rate) || 0;

  const batteryWh = (mah * v) / 1000;
  const energyPerChargeKwh = eff > 0 ? (batteryWh / 1000) / (eff / 100) : 0;
  const weeklyCost = energyPerChargeKwh * r * charges;
  const monthlyCost = weeklyCost * 4.33;
  const annualCost = weeklyCost * 52;

  const content = (
    <>
      <Typography variant="h2">How to Use the Smartphone Charging Cost Calculator</Typography>
      <Typography variant="body1">
        Enter your phone&apos;s battery capacity in mAh and its voltage (3.85V is typical for modern lithium-ion
        phone batteries, adjustable if you know your device&apos;s actual figure) to derive the battery&apos;s
        energy capacity in watt-hours. Then enter how many full charges you do per week and a charger
        efficiency percentage — chargers lose some energy as heat during conversion, so only part of what you
        draw from the wall actually reaches the battery, typically around 85%.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Battery Wh = (mAh × Voltage) / 1000<br />
        Energy per Charge (kWh) = (Battery Wh / 1000) / Charger Efficiency<br />
        Cost = Energy per Charge × Rate × Charges per Week
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4,000 mAh battery at 3.85V holds 15.4 Wh. At 85% charger efficiency, fully charging it from empty
        draws about 0.0181 kWh from the wall. Charging once a day (7 times a week) at $0.16 per kWh costs
        roughly $0.020 per week, $0.088 per month, and about $1.06 per year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Satisfying curiosity about how much it actually costs to charge a phone.</li>
          <li>Comparing charging cost between phones with different battery capacities.</li>
          <li>Putting a phone's tiny running cost in context against other household electronics.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is charging a phone really this cheap?</strong> Yes — because phone batteries hold a tiny amount of energy compared to almost any other household device, the annual cost to charge one is typically well under $1-2 a year at average electricity rates, even with daily charging. It's one of the smallest line items in a home electricity bill by far.</li>
          <li><strong>Why include charger efficiency at all if the cost is so small?</strong> It's included for accuracy — no charger is 100% efficient, and some energy is always lost as heat during AC-to-DC conversion. Even though the dollar impact is negligible for a phone, the same charging-efficiency concept matters more for larger devices like laptops or EVs.</li>
          <li><strong>Where do I find my phone's exact battery capacity and voltage?</strong> Check your phone manufacturer's official spec sheet, which typically lists battery capacity in mAh and sometimes voltage; if voltage isn't listed, 3.85V is a safe typical assumption for most modern smartphones.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/smartphone-charging-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Battery Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">mAh</InputAdornment> } }} />
          <TextField label="Battery Voltage" type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">V</InputAdornment> } }} />
          <TextField label="Full Charges per Week" type="number" value={chargesPerWeek} onChange={(e) => setChargesPerWeek(e.target.value)} fullWidth />
          <TextField label="Charger Efficiency" type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} />
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
              <Typography variant="h6">Weekly</Typography>
              <Typography variant="h6" fontWeight="bold">{money(weeklyCost)}</Typography>
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

export default SmartphoneChargingCostCalculator;
