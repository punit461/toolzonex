'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FORCE_UNITS: Record<string, { label: string; toNewtons: number }> = {
  n: { label: 'Newtons (N)', toNewtons: 1 },
  lbf: { label: 'Pound-force (lbf)', toNewtons: 4.4482216153 },
  kgf: { label: 'Kilogram-force (kgf)', toNewtons: 9.80665 },
};

const DISTANCE_UNITS: Record<string, { label: string; toMeters: number }> = {
  m: { label: 'Meters (m)', toMeters: 1 },
  cm: { label: 'Centimeters (cm)', toMeters: 0.01 },
  ft: { label: 'Feet (ft)', toMeters: 0.3048 },
  in: { label: 'Inches (in)', toMeters: 0.0254 },
};

const TorqueCalculator = () => {
  const [force, setForce] = useState<string>('50');
  const [forceUnit, setForceUnit] = useState<string>('n');
  const [distance, setDistance] = useState<string>('0.3');
  const [distanceUnit, setDistanceUnit] = useState<string>('m');

  const result = useMemo(() => {
    const f = parseFloat(force);
    const d = parseFloat(distance);
    if (Number.isNaN(f) || Number.isNaN(d)) return null;

    const newtons = f * FORCE_UNITS[forceUnit].toNewtons;
    const meters = d * DISTANCE_UNITS[distanceUnit].toMeters;
    const torqueNm = newtons * meters;

    const lbf = newtons / FORCE_UNITS.lbf.toNewtons;
    const feet = meters / DISTANCE_UNITS.ft.toMeters;
    const torqueLbFt = lbf * feet;
    const inches = meters / DISTANCE_UNITS.in.toMeters;
    const torqueLbIn = lbf * inches;

    return { torqueNm, torqueLbFt, torqueLbIn };
  }, [force, forceUnit, distance, distanceUnit]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Torque</Typography>
      <Typography variant="body1">
        Torque is a rotational force, calculated as Force × Distance from the pivot point (the lever arm
        length), when the force is applied perpendicular to the lever arm. Enter a force and a distance in any
        combination of common units, and this calculator converts everything to newton-meters internally, then
        shows the result in newton-meters (N·m), pound-feet (lb-ft), and pound-inches (lb-in) at once.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Torque = Force × Distance
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Applying 50 N of force at the end of a 0.3 m wrench gives a torque of 50 × 0.3 = 15 N·m, which is
        equivalent to about 11.06 lb-ft, or 132.7 lb-in — the kind of specification commonly found in a torque
        wrench setting for tightening bolts.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a torque wrench to the manufacturer&apos;s specified value for bolts and fasteners.</li>
          <li>Converting a manufacturer&apos;s torque specification between metric and imperial units.</li>
          <li>Physics and mechanical engineering coursework involving rotational force and levers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does the angle of the applied force matter?</Typography>
      <Typography variant="body1">
        Yes — this calculator assumes the force is applied perpendicular (at 90°) to the lever arm, which
        produces the maximum possible torque for a given force and distance. If the force is applied at an
        angle, the effective torque is reduced by a factor of sin(angle).
      </Typography>
      <Typography variant="h3">What is the difference between lb-ft and lb-in?</Typography>
      <Typography variant="body1">
        Both measure torque in the imperial system, but lb-ft uses a one-foot lever arm as the reference while
        lb-in uses a one-inch lever arm. Since a foot is 12 inches, 1 lb-ft equals exactly 12 lb-in.
      </Typography>
      <Typography variant="h3">Why is force sometimes given in kilogram-force?</Typography>
      <Typography variant="body1">
        Kilogram-force is a non-SI unit still used informally in some regions and specifications, representing
        the force exerted by one kilogram of mass under standard gravity (9.80665 m/s²). This calculator
        converts it to newtons automatically for the torque calculation.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/torque-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField label="Force" type="number" value={force} onChange={(e) => setForce(e.target.value)} onFocus={(e) => e.target.select()} />
            <FormControl>
              <InputLabel>Unit</InputLabel>
              <Select value={forceUnit} label="Unit" onChange={(e) => setForceUnit(e.target.value)}>
                {Object.entries(FORCE_UNITS).map(([key, def]) => (
                  <MenuItem key={key} value={key}>{def.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField label="Lever Arm Distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} onFocus={(e) => e.target.select()} />
            <FormControl>
              <InputLabel>Unit</InputLabel>
              <Select value={distanceUnit} label="Unit" onChange={(e) => setDistanceUnit(e.target.value)}>
                {Object.entries(DISTANCE_UNITS).map(([key, def]) => (
                  <MenuItem key={key} value={key}>{def.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Paper sx={{ p: 3, bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
          {result ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Newton-meters</Typography>
                <Typography fontWeight={700}>{result.torqueNm.toFixed(4)} N·m</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Pound-feet</Typography>
                <Typography fontWeight={700}>{result.torqueLbFt.toFixed(4)} lb-ft</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography color="text.secondary">Pound-inches</Typography>
                <Typography fontWeight={700}>{result.torqueLbIn.toFixed(4)} lb-in</Typography>
              </Box>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center">Enter force and distance to calculate</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TorqueCalculator;
