'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const DISTANCE_UNITS = [
  { value: 'mi', label: 'Miles' },
  { value: 'km', label: 'Kilometers' },
];

const FUEL_UNITS = [
  { value: 'gal', label: 'Gallons (US)' },
  { value: 'l', label: 'Liters' },
  { value: 'kwh', label: 'kWh (electric)' },
];

const MileageCalculator = () => {
  const [distance, setDistance] = useState<number>(300);
  const [distanceUnit, setDistanceUnit] = useState<string>('mi');
  const [fuelUsed, setFuelUsed] = useState<number>(10);
  const [fuelUnit, setFuelUnit] = useState<string>('gal');
  const [fuelPrice, setFuelPrice] = useState<number>(3.5);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const distanceLabel = DISTANCE_UNITS.find((u) => u.value === distanceUnit)?.label ?? '';
  const fuelLabel = FUEL_UNITS.find((u) => u.value === fuelUnit)?.label ?? '';

  const { efficiency, perHundred, totalCost, costPerDistance } = useMemo(() => {
    if (distance <= 0 || fuelUsed <= 0) {
      return { efficiency: 0, perHundred: 0, totalCost: 0, costPerDistance: 0 };
    }
    const eff = distance / fuelUsed;
    const per100 = (fuelUsed / distance) * 100;
    const cost = fuelUsed * fuelPrice;
    const costPerDist = fuelPrice / eff;

    return { efficiency: eff, perHundred: per100, totalCost: cost, costPerDistance: costPerDist };
  }, [distance, fuelUsed, fuelPrice]);

  const content = (
    <>
      <Typography variant="h2">How fuel efficiency (mileage) is calculated</Typography>
      <Typography variant="body1">
        Mileage — more precisely, fuel efficiency — measures how far a vehicle travels per unit of fuel
        consumed. In the US this is usually miles per gallon (mpg); elsewhere it&apos;s kilometers per liter
        (km/l) or, for electric vehicles, miles or kilometers per kWh of battery used. This calculator accepts
        any combination of distance and fuel units, including electric.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Fuel Efficiency = Distance Traveled ÷ Fuel Consumed
      </Box>
      <Typography variant="body1">
        Enter the distance you covered and how much fuel (or electricity) it took. If you also know the price
        per unit of fuel, the calculator estimates what that trip cost and the cost per unit distance.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Driving 300 miles on 10 gallons of gas gives a fuel efficiency of 30 mpg. At $3.50/gallon, that trip cost
        $35 in fuel, or about $0.117 per mile.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking your car&apos;s real-world mpg or km/l against the manufacturer&apos;s rated figure.</li>
          <li>Comparing fuel efficiency across different vehicles, including gas vs. electric.</li>
          <li>Estimating the fuel cost of a completed trip after the fact.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I calculate mpg manually?</Typography>
      <Typography variant="body1">
        Fill the tank, reset the trip odometer, drive normally, then fill up again and note the gallons needed
        to refill and the miles driven since the reset. Divide miles by gallons — that&apos;s your real-world
        mpg for that tank.
      </Typography>
      <Typography variant="h3">How does this work for electric vehicles?</Typography>
      <Typography variant="body1">
        Select &quot;kWh (electric)&quot; as the fuel unit and enter the kWh of battery used for the trip — the
        calculator then reports miles (or km) per kWh, the EV equivalent of mpg, along with kWh used per 100
        miles/km if you want to compare against a vehicle&apos;s rated efficiency.
      </Typography>
      <Typography variant="h3">Why does my mpg vary between tanks?</Typography>
      <Typography variant="body1">
        Driving style, terrain, traffic, temperature, tire pressure, and how much city vs. highway driving you
        did all affect real-world fuel efficiency — it&apos;s normal to see it fluctuate somewhat from the
        manufacturer&apos;s rated average.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/mileage-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Distance Traveled</Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(distance) ? '' : distance}
                onChange={(e) => setDistance(e.target.value === '' ? NaN : Number(e.target.value))}
              />
              <Select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)} sx={{ minWidth: 150 }}>
                {DISTANCE_UNITS.map((u) => (
                  <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Fuel Consumed</Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(fuelUsed) ? '' : fuelUsed}
                onChange={(e) => setFuelUsed(e.target.value === '' ? NaN : Number(e.target.value))}
              />
              <Select value={fuelUnit} onChange={(e) => setFuelUnit(e.target.value)} sx={{ minWidth: 150 }}>
                {FUEL_UNITS.map((u) => (
                  <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom>Fuel Price per Unit (optional)</Typography>
              <Select
                size="small"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                sx={{ minWidth: 110, mb: 1 }}
              >
                {CURRENCIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>{c.value}</MenuItem>
                ))}
              </Select>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(fuelPrice) ? '' : fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol(currency)}</InputAdornment>,
                }
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Fuel Efficiency</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
              {efficiency.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              {distanceLabel} / {fuelLabel}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">{fuelLabel} per 100 {distanceLabel}</Typography>
                <Typography variant="h6">{perHundred.toFixed(2)}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Cost per {distanceLabel.replace(/s$/, '')}</Typography>
                <Typography variant="h6">{formatMoney(costPerDistance, currency)}</Typography>
              </Box>
            </Box>

            <Box sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">Estimated Trip Fuel Cost</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{formatMoney(totalCost, currency)}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MileageCalculator;
