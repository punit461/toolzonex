'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type DistanceUnit = 'km' | 'mi';
type FuelUnit = 'l' | 'gal';

const FuelConsumptionCalculator = () => {
  const [distance, setDistance] = useState<string>('400');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [fuel, setFuel] = useState<string>('32');
  const [fuelUnit, setFuelUnit] = useState<FuelUnit>('l');

  const result = useMemo(() => {
    const d = parseFloat(distance);
    const f = parseFloat(fuel);
    if (Number.isNaN(d) || Number.isNaN(f) || d <= 0 || f <= 0) return null;

    const km = distanceUnit === 'km' ? d : d * 1.609344;
    const liters = fuelUnit === 'l' ? f : f * 3.785411784;

    const kmPerL = km / liters;
    const lPer100km = (liters / km) * 100;
    const mpgUs = (km * 0.621371192) / (liters / 3.785411784);
    const mpgUk = (km * 0.621371192) / (liters / 4.54609);

    return { kmPerL, lPer100km, mpgUs, mpgUk };
  }, [distance, distanceUnit, fuel, fuelUnit]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Fuel Consumption</Typography>
      <Typography variant="body1">
        Fuel consumption (or economy) compares distance traveled to fuel used, but it&apos;s expressed in
        different ways around the world: miles per gallon (US or UK) in the US and UK, liters per 100 km in
        most of Europe, and kilometers per liter in many parts of Asia and Latin America. This calculator
        converts your distance and fuel figures to a common base (kilometers and liters), then computes all
        four common units at once.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        km/L = Distance ÷ Fuel &nbsp;|&nbsp; L/100km = (Fuel ÷ Distance) × 100 &nbsp;|&nbsp; MPG = Distance ÷ Fuel (imperial units)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A car that travels 400 km using 32 liters of fuel gets 400 ÷ 32 = 12.5 km/L, which is equivalent to
        (32 ÷ 400) × 100 = 8 L/100km, about 29.4 US mpg, and about 35.3 UK mpg (since a UK/imperial gallon
        holds more fuel than a US gallon).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing a car&apos;s advertised fuel economy figures across regions with different units.</li>
          <li>Tracking your own vehicle&apos;s real-world fuel economy from odometer and fuel receipts.</li>
          <li>Estimating trip fuel costs by combining consumption with fuel price and distance.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is UK mpg higher than US mpg for the same car?</Typography>
      <Typography variant="body1">
        A US gallon (3.785 liters) is smaller than a UK/imperial gallon (4.546 liters). Since mpg is distance
        per gallon, using the larger UK gallon in the calculation produces a higher mpg number for the exact
        same real-world fuel economy.
      </Typography>
      <Typography variant="h3">Is a higher or lower L/100km number better?</Typography>
      <Typography variant="body1">
        Lower is better for L/100km, since it means less fuel is used to cover the same distance. This is the
        opposite of mpg or km/L, where a higher number means better fuel economy.
      </Typography>
      <Typography variant="h3">How accurate is my own calculated fuel economy?</Typography>
      <Typography variant="body1">
        Real-world figures depend on driving style, terrain, load, and how precisely you measure the fuel added
        at each fill-up. Averaging results over several tanks of fuel gives a more reliable figure than a
        single measurement.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fuel-consumption-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <TextField
              label="Distance Traveled"
              type="number"
              fullWidth
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              onFocus={(e) => e.target.select()}
              sx={{ mb: 1 }}
            />
            <ToggleButtonGroup value={distanceUnit} exclusive onChange={(_, v) => v && setDistanceUnit(v)} size="small" fullWidth>
              <ToggleButton value="km">Kilometers</ToggleButton>
              <ToggleButton value="mi">Miles</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            <TextField
              label="Fuel Used"
              type="number"
              fullWidth
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              onFocus={(e) => e.target.select()}
              sx={{ mb: 1 }}
            />
            <ToggleButtonGroup value={fuelUnit} exclusive onChange={(_, v) => v && setFuelUnit(v)} size="small" fullWidth>
              <ToggleButton value="l">Liters</ToggleButton>
              <ToggleButton value="gal">US Gallons</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, alignContent: 'center' }}>
          {result ? (
            <>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">km/L</Typography>
                <Typography variant="h6" fontWeight={700}>{result.kmPerL.toFixed(2)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">L/100km</Typography>
                <Typography variant="h6" fontWeight={700}>{result.lPer100km.toFixed(2)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">US MPG</Typography>
                <Typography variant="h6" fontWeight={700}>{result.mpgUs.toFixed(2)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">UK MPG</Typography>
                <Typography variant="h6" fontWeight={700}>{result.mpgUk.toFixed(2)}</Typography>
              </Paper>
            </>
          ) : (
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="body1" color="text.secondary" textAlign="center">Enter positive values to calculate</Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FuelConsumptionCalculator;
