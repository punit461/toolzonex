'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type HeaterType = 'electric' | 'gas';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const WaterHeatingCostCalculator = () => {
  const [heaterType, setHeaterType] = useState<HeaterType>('electric');
  const [gallonsPerDay, setGallonsPerDay] = useState('60');
  const [coldTemp, setColdTemp] = useState('55');
  const [hotTemp, setHotTemp] = useState('120');
  const [electricRate, setElectricRate] = useState('15');
  const [gasRate, setGasRate] = useState('1.20');

  const result = useMemo(() => {
    const gallons = parseFloat(gallonsPerDay) || 0;
    const cold = parseFloat(coldTemp) || 0;
    const hot = parseFloat(hotTemp) || 0;
    const tempRise = Math.max(hot - cold, 0);

    const btu = gallons * 8.33 * tempRise;

    let dailyCost = 0;
    if (heaterType === 'electric') {
      const kwh = btu / 3412;
      const rate = (parseFloat(electricRate) || 0) / 100; // cents to dollars
      dailyCost = kwh * rate;
    } else {
      const therms = btu / 100000;
      const rate = parseFloat(gasRate) || 0;
      dailyCost = therms * rate;
    }

    return {
      btu,
      dailyCost,
      monthlyCost: dailyCost * 30,
      annualCost: dailyCost * 365,
    };
  }, [heaterType, gallonsPerDay, coldTemp, hotTemp, electricRate, gasRate]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Water Heating Cost Calculator</Typography>
      <Typography variant="body1">
        Enter how many gallons of hot water your household uses per day, the incoming cold water temperature,
        and the target hot water temperature. Choose electric or gas as your water heater type and enter your
        energy price to see the daily, monthly, and annual cost of heating that water. Water requires 8.33 BTU
        per gallon per degree Fahrenheit of temperature rise, which the calculator converts into kilowatt-hours
        for electric heaters or therms for gas heaters.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Energy Needed (BTU) = Gallons × 8.33 × (Target Temp − Incoming Temp)
        <br />
        Electric: kWh = BTU / 3,412, Cost = kWh × Electric Rate
        <br />
        Gas: Therms = BTU / 100,000, Cost = Therms × Gas Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A household uses 60 gallons of hot water per day, with incoming water at 55°F heated to 120°F — a
        65°F rise. That&apos;s 60 × 8.33 × 65 ≈ 32,487 BTU per day. On an electric heater, that&apos;s about
        32,487 / 3,412 ≈ 9.52 kWh, costing roughly $1.43 per day at 15¢/kWh, or about $42.90 per month.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the monthly and annual cost of running a household water heater.</li>
          <li>Comparing water heating costs between electric and gas energy sources.</li>
          <li>Seeing how lowering your water heater&apos;s temperature setting affects your energy bill.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this account for water heater efficiency losses?</strong> No — this calculates the theoretical energy needed to raise the water temperature. Real water heaters have some standby and conversion losses (heat lost through the tank, pilot lights, etc.), so actual costs are typically somewhat higher than this baseline figure.</li>
          <li><strong>How do I find my incoming cold water temperature?</strong> It varies by location and season — groundwater temperature commonly ranges from around 40°F in colder climates and winter months to 70°F or more in warmer regions and summer. Check with your local utility or use a thermometer on your cold tap for an accurate reading.</li>
          <li><strong>Would lowering my water heater's temperature save money?</strong> Yes — reducing the target temperature lowers the temperature rise needed, which directly reduces energy use. Many water heaters are set higher than necessary; many manufacturers suggest 120°F is sufficient for most households while also reducing scald risk.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/water-heating-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup value={heaterType} exclusive onChange={(_, v) => v && setHeaterType(v)} fullWidth>
            <ToggleButton value="electric">Electric</ToggleButton>
            <ToggleButton value="gas">Gas</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            label="Hot Water Used Per Day" type="number" value={gallonsPerDay}
            onChange={(e) => setGallonsPerDay(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">gal</InputAdornment> } }}
          />
          <TextField
            label="Incoming (Cold) Water Temperature" type="number" value={coldTemp}
            onChange={(e) => setColdTemp(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">°F</InputAdornment> } }}
          />
          <TextField
            label="Target Hot Water Temperature" type="number" value={hotTemp}
            onChange={(e) => setHotTemp(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">°F</InputAdornment> } }}
          />
          {heaterType === 'electric' ? (
            <TextField
              label="Electricity Price" type="number" value={electricRate}
              onChange={(e) => setElectricRate(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">¢/kWh</InputAdornment> } }}
            />
          ) : (
            <TextField
              label="Gas Price" type="number" value={gasRate}
              onChange={(e) => setGasRate(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/therm</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Daily Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.dailyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Cost</Typography>
            <Typography fontWeight={600}>{money(result.monthlyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Annual Cost</Typography>
            <Typography fontWeight={600}>{money(result.annualCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily Energy Needed</Typography>
            <Typography fontWeight={600}>{result.btu.toFixed(0)} BTU</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WaterHeatingCostCalculator;
