'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'mi' | 'km';

const FlightTimeCalculator = () => {
  const [unit, setUnit] = useState<Unit>('mi');
  const [distance, setDistance] = useState<string>('2500');
  const [speed, setSpeed] = useState<string>('500');
  const [buffer, setBuffer] = useState<string>('30');

  const result = useMemo(() => {
    const d = parseFloat(distance);
    const s = parseFloat(speed);
    const b = parseFloat(buffer);
    if ([d, s, b].some((n) => Number.isNaN(n)) || d <= 0 || s <= 0 || b < 0) return null;

    const cruiseHours = d / s;
    const totalHours = cruiseHours + b / 60;
    return { cruiseHours, totalHours };
  }, [distance, speed, buffer]);

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const content = (
    <>
      <Typography variant="h2">How to Estimate Flight Time</Typography>
      <Typography variant="body1">
        Basic flight time is simply Distance ÷ Cruising Speed. Real flights also include time on the ground and
        during climb and descent — for taxiing, takeoff, and landing — that isn&apos;t spent at cruising speed,
        so this calculator adds an adjustable buffer (30 minutes by default) on top of the pure cruise-time
        calculation for a more realistic total estimate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Time = (Distance ÷ Cruising Speed) + Taxi/Takeoff/Landing Buffer
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2,500-mile flight at a 500 mph cruising speed takes 2,500 ÷ 500 = 5 hours at cruise. Adding the
        default 30-minute buffer for taxi, takeoff, and landing brings the estimated total flight time to about
        5 hours 30 minutes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating total travel time for trip planning before booking a flight.</li>
          <li>Comparing flight duration across different routes or aircraft cruising speeds.</li>
          <li>Aviation and geography coursework involving distance-speed-time relationships.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why isn&apos;t this the same as the flight time shown when booking a ticket?</Typography>
      <Typography variant="body1">
        Airlines factor in actual flight plans, wind patterns (tailwinds and headwinds), air traffic routing,
        and airport-specific taxi times, all of which can meaningfully shift the real duration. This calculator
        gives a simplified straight-line estimate using average cruising speed and a fixed buffer.
      </Typography>
      <Typography variant="h3">Should I use great-circle distance or driving distance?</Typography>
      <Typography variant="body1">
        Use great-circle (straight-line) distance between the two airports, since aircraft fly roughly along
        that path rather than following ground routes. Many flight-distance lookup tools report this figure
        directly.
      </Typography>
      <Typography variant="h3">Why does the buffer matter for short flights?</Typography>
      <Typography variant="body1">
        For short routes, the fixed taxi, takeoff, and landing time can be a large fraction of total flight
        time, since the aircraft spends less time at full cruising speed. This is why very short flights often
        feel disproportionately long relative to the distance covered.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/flight-time-calculator" content={content}>
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small">
          <ToggleButton value="mi">Miles / mph</ToggleButton>
          <ToggleButton value="km">Kilometers / km/h</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label={`Distance (${unit === 'mi' ? 'miles' : 'km'})`} type="number" fullWidth value={distance} onChange={(e) => setDistance(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label={`Average Cruising Speed (${unit === 'mi' ? 'mph' : 'km/h'})`} type="number" fullWidth value={speed} onChange={(e) => setSpeed(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Taxi/Takeoff/Landing Buffer (minutes)" type="number" fullWidth value={buffer} onChange={(e) => setBuffer(e.target.value)} onFocus={(e) => e.target.select()} />
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Estimated Total Flight Time</Typography>
              <Typography variant="h3" fontWeight={800} color="primary.main">{formatTime(result.totalHours)}</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Cruise time only: {formatTime(result.cruiseHours)}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter positive distance and speed to calculate</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlightTimeCalculator;
