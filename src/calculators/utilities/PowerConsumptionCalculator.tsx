'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Button } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const APPLIANCES = [
  { name: 'LED Bulb', watts: 9 },
  { name: 'Ceiling Fan', watts: 75 },
  { name: 'AC', watts: 1500 },
  { name: 'Refrigerator', watts: 150 },
  { name: 'Washing Machine', watts: 500 },
];

const USD_TO_INR = 83;

const PowerConsumptionCalculatorContent = () => {
  const [watts, setWatts] = useState<string>('1500');
  const [quantity, setQuantity] = useState<string>('1');
  const [hoursPerDay, setHoursPerDay] = useState<string>('6');
  const [rate, setRate] = useState<string>('6.5');
  const [billingDays, setBillingDays] = useState<string>('30');

  const wattsNum = parseFloat(watts) || 0;
  const qtyNum = parseFloat(quantity) || 0;
  const hoursNum = parseFloat(hoursPerDay) || 0;
  const rateNum = parseFloat(rate) || 0;
  const daysNum = parseFloat(billingDays) || 0;

  const kwhPerDay = (wattsNum * qtyNum * hoursNum) / 1000;
  const kwhPerBilling = kwhPerDay * daysNum;
  const costInr = kwhPerBilling * rateNum;
  const costUsd = costInr / USD_TO_INR;
  const annualCostInr = ((wattsNum * qtyNum * hoursNum * 365) / 1000) * rateNum;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Appliance Power (watts)"
          type="number"
          value={watts}
          onChange={(e) => setWatts(e.target.value)}
          fullWidth
        />
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          inputProps={{ min: 1 }}
        />
        <TextField
          label="Hours Used Per Day"
          type="number"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
          fullWidth
        />
        <TextField
          label="Rate (₹ per kWh)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          fullWidth
        />
        <TextField
          label="Billing Days (per period)"
          type="number"
          value={billingDays}
          onChange={(e) => setBillingDays(e.target.value)}
          fullWidth
        />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Quick Pick Appliance
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {APPLIANCES.map((appliance) => (
              <Button
                key={appliance.name}
                size="small"
                variant="outlined"
                onClick={() => setWatts(String(appliance.watts))}
              >
                {appliance.name} ({appliance.watts}W)
              </Button>
            ))}
          </Box>
        </Box>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            (Watts × Quantity × Hours) / 1000 = kWh per day
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            ({wattsNum} × {qtyNum} × {hoursNum}) / 1000 = {kwhPerDay.toFixed(2)} kWh/day
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Energy Used Per Day
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {kwhPerDay.toFixed(2)} kWh
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Estimated Cost ({kwhPerBilling.toFixed(1)} kWh): ₹{costInr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">kWh Per Billing Period</Typography>
            <Typography variant="body2" fontWeight="bold">{kwhPerBilling.toFixed(2)} kWh</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Cost (₹)</Typography>
            <Typography variant="body2" fontWeight="bold">₹{costInr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Cost ($)</Typography>
            <Typography variant="body2" fontWeight="bold">${costUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Annual Cost (₹)</Typography>
            <Typography variant="body2" fontWeight="bold">₹{annualCostInr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const PowerConsumptionCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Power Consumption Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the appliance power in watts, the quantity of identical appliances, and the hours they run
        per day. The calculator converts watts into kilowatt-hours (kWh) using the formula: (Watts ×
        Quantity × Hours) / 1000 = kWh per day. Multiplying the daily consumption by your billing days
        and per-unit rate (₹ per kWh) gives the estimated electricity cost for the period.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1500 W AC used for 6 hours a day consumes (1500 × 1 × 6) / 1000 = 9 kWh per day. At ₹6.5 per
        kWh over a 30-day billing period, the cost is 270 kWh × ₹6.5 = ₹1,755.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the monthly electricity bill of a household appliance.</li>
          <li>Comparing energy usage of different appliances before buying one.</li>
          <li>Budgeting for electricity costs of offices, shops, or work-from-home setups.</li>
          <li>Calculating annual energy costs to evaluate energy-efficient alternatives.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I convert watts to kilowatt-hours?</Typography>
      <Typography variant="body1">
        Multiply the watts by the hours of use and divide by 1000. For example, a 100 W bulb running 10
        hours uses (100 × 10) / 1000 = 1 kWh.
      </Typography>
      <Typography variant="h3">Why does my actual bill differ from the estimate?</Typography>
      <Typography variant="body1">
        Real bills include fixed charges, taxes, slab-based tariffs, and appliances that do not always run
        at their rated power. This calculator gives a close estimate of the energy charge only.
      </Typography>
      <Typography variant="h3">Is a higher watt rating always worse?</Typography>
      <Typography variant="body1">
        Not necessarily — a higher-watt appliance used fewer hours can cost less than a lower-watt appliance
        left running all day. The calculator accounts for both watts and usage hours.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/power-consumption-calculator" content={content}>
      <PowerConsumptionCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PowerConsumptionCalculator;