'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { CURRENCIES, CurrencyCode, currencySymbol, formatMoney } from '../currencyConfig';

const UNIT_SYSTEMS = [
  { value: 'us', label: 'Miles & MPG (per gallon)', distanceLabel: 'miles', efficiencyLabel: 'mpg' },
  { value: 'metric', label: 'Kilometers & km/l (per liter)', distanceLabel: 'km', efficiencyLabel: 'km/l' },
];

const FuelCostCalculator = () => {
  const [system, setSystem] = useState<string>('us');
  const [distance, setDistance] = useState<number>(500);
  const [efficiency, setEfficiency] = useState<number>(28);
  const [fuelPrice, setFuelPrice] = useState<number>(3.5);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const unitConfig = UNIT_SYSTEMS.find((u) => u.value === system) ?? UNIT_SYSTEMS[0];

  const { fuelNeeded, totalCost, costPerDistance } = useMemo(() => {
    if (distance <= 0 || efficiency <= 0) {
      return { fuelNeeded: 0, totalCost: 0, costPerDistance: 0 };
    }
    const fuel = distance / efficiency;
    const cost = fuel * fuelPrice;
    const perDist = fuelPrice / efficiency;

    return { fuelNeeded: fuel, totalCost: cost, costPerDistance: perDist };
  }, [distance, efficiency, fuelPrice]);

  const content = (
    <>
      <Typography variant="h2">How trip fuel cost is calculated</Typography>
      <Typography variant="body1">
        To estimate what a trip will cost in fuel, you need three numbers: the distance you&apos;ll travel, your
        vehicle&apos;s fuel efficiency, and the current fuel price. The calculator first works out how much fuel
        the trip will need, then multiplies that by the price per unit.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Fuel Needed = Trip Distance ÷ Fuel Efficiency
        <br />
        Total Fuel Cost = Fuel Needed × Price per Unit
      </Box>
      <Typography variant="body1">
        Switch between US units (miles &amp; mpg) and metric units (kilometers &amp; km/l) with the unit selector
        — the calculator keeps the math consistent for whichever system you choose.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 500-mile road trip in a car that gets 28 mpg needs about 17.9 gallons of fuel. At $3.50/gallon, the
        trip costs roughly $62.50 in fuel, or about $0.125 per mile.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Budgeting fuel cost for a road trip or daily commute before you leave.</li>
          <li>Comparing trip cost across vehicles with different fuel efficiency.</li>
          <li>Splitting fuel cost fairly between passengers on a shared trip.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where do I find my vehicle&apos;s fuel efficiency?</Typography>
      <Typography variant="body1">
        Check your vehicle&apos;s manual or window sticker for the manufacturer&apos;s rated mpg or km/l, or use
        the <a href="/finance/mileage-calculator">Mileage Calculator</a> to work out your actual real-world
        efficiency from a recent fill-up.
      </Typography>
      <Typography variant="h3">Does this account for traffic, terrain, or driving style?</Typography>
      <Typography variant="body1">
        No — it assumes your vehicle achieves the fuel efficiency figure you enter for the entire trip. Heavy
        traffic, hills, high speeds, and aggressive driving all reduce real-world efficiency below the rated
        figure, so treat the estimate as a reasonable ballpark rather than an exact number.
      </Typography>
      <Typography variant="h3">Can I use this for a round trip?</Typography>
      <Typography variant="body1">
        Yes — just enter the full round-trip distance (there and back) rather than the one-way distance, and the
        calculator will estimate the total fuel cost for the entire journey.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/fuel-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Unit System</Typography>
            <Select fullWidth value={system} onChange={(e) => setSystem(e.target.value)}>
              {UNIT_SYSTEMS.map((u) => (
                <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Trip Distance ({unitConfig.distanceLabel})</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(distance) ? '' : distance}
              onChange={(e) => setDistance(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{unitConfig.distanceLabel}</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Vehicle Fuel Efficiency ({unitConfig.efficiencyLabel})</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(efficiency) ? '' : efficiency}
              onChange={(e) => setEfficiency(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{unitConfig.efficiencyLabel}</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography gutterBottom>Fuel Price per Unit</Typography>
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
            <Typography variant="h6" color="text.secondary">Total Trip Fuel Cost</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}>
              {formatMoney(totalCost, currency)}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Fuel Needed</Typography>
                <Typography variant="h6">{fuelNeeded.toFixed(2)} {system === 'us' ? 'gal' : 'L'}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Cost per {unitConfig.distanceLabel.replace(/s$/, '')}</Typography>
                <Typography variant="h6">{formatMoney(costPerDistance, currency)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FuelCostCalculator;
