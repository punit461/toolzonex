'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const USD_TO_INR = 83;

const ElectricityBillCalculatorContent = () => {
  const [previousReading, setPreviousReading] = useState<string>('1000');
  const [currentReading, setCurrentReading] = useState<string>('1350');
  const [rate, setRate] = useState<string>('6.5');
  const [fixedCharge, setFixedCharge] = useState<string>('50');

  const prevNum = parseFloat(previousReading) || 0;
  const currNum = parseFloat(currentReading) || 0;
  const rateNum = parseFloat(rate) || 0;
  const fixedNum = parseFloat(fixedCharge) || 0;

  const units = Math.max(0, currNum - prevNum);
  const energyCharge = units * rateNum;
  const totalBillInr = energyCharge + fixedNum;
  const totalBillUsd = totalBillInr / USD_TO_INR;
  const avgPerUnit = units > 0 ? totalBillInr / units : 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Previous Meter Reading (kWh)"
          type="number"
          value={previousReading}
          onChange={(e) => setPreviousReading(e.target.value)}
          fullWidth
        />
        <TextField
          label="Current Meter Reading (kWh)"
          type="number"
          value={currentReading}
          onChange={(e) => setCurrentReading(e.target.value)}
          fullWidth
        />
        <TextField
          label="Per-Unit Rate (₹ per kWh)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          fullWidth
        />
        <TextField
          label="Fixed Charge (₹)"
          type="number"
          value={fixedCharge}
          onChange={(e) => setFixedCharge(e.target.value)}
          fullWidth
        />

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Units = Current − Previous
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            {currNum} − {prevNum} = {units} kWh
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 1 }}>
            Energy Charge = Units × Rate
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
            {units} × {rateNum} = ₹{energyCharge.toFixed(2)}
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
            Total Bill
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            ₹{totalBillInr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            ${totalBillUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })} · {units} units consumed
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Units Consumed</Typography>
            <Typography variant="body2" fontWeight="bold">{units.toFixed(2)} kWh</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Energy Charge (₹)</Typography>
            <Typography variant="body2" fontWeight="bold">₹{energyCharge.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Fixed Charge (₹)</Typography>
            <Typography variant="body2" fontWeight="bold">₹{fixedNum.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total Bill ($)</Typography>
            <Typography variant="body2" fontWeight="bold">${totalBillUsd.toLocaleString('en-US', { maximumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Average Cost Per Unit (₹)</Typography>
            <Typography variant="body2" fontWeight="bold">₹{avgPerUnit.toFixed(2)}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const ElectricityBillCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Electricity Bill Calculator Work?</Typography>
      <Typography variant="body1">
        Enter your previous and current meter readings. The units consumed equal the current reading minus
        the previous reading. Multiplying the units by your per-unit rate gives the energy charge, and
        adding the fixed charge gives the total bill. Many utilities use a slab tariff — a tiered rate
        where the first block of units costs less per kWh and higher blocks cost more, so the effective
        per-unit price can change as your consumption crosses each slab boundary.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a previous reading of 1000 kWh, a current reading of 1350 kWh, a rate of ₹6.5 per unit, and a
        fixed charge of ₹50, the bill is (1350 − 1000) = 350 units × ₹6.5 = ₹2,275 for energy, plus ₹50
        fixed charge = ₹2,325.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating an upcoming electricity bill before the meter is read.</li>
          <li>Verifying that a billed amount matches the readings and tariff.</li>
          <li>Budgeting monthly utility expenses for homes and small businesses.</li>
          <li>Comparing tariff plans by calculating the cost at different usage levels.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a slab tariff?</Typography>
      <Typography variant="body1">
        A slab tariff charges different rates per unit depending on total consumption. For example, the
        first 100 units may cost ₹4 each, while units beyond 100 cost ₹6.5 each. This calculator uses a
        single average rate, so enter your effective rate if your provider uses slabs.
      </Typography>
      <Typography variant="h3">Why is there a fixed charge?</Typography>
      <Typography variant="body1">
        Utilities charge a fixed amount to cover the cost of maintaining the connection, meter, and
        infrastructure, regardless of how much electricity you use. It appears on the bill even at zero
        consumption.
      </Typography>
      <Typography variant="h3">What if my current reading is lower than the previous one?</Typography>
      <Typography variant="body1">
        A lower reading usually means the meter was reset, replaced, or read incorrectly. This calculator
        clamps the units to zero when the current reading is lower, so you should verify the readings with
        your provider.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/electricity-bill-calculator" content={content}>
      <ElectricityBillCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ElectricityBillCalculator;