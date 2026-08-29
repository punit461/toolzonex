'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WorkCalculator = () => {
  const [force, setForce] = useState<string>('20');
  const [distance, setDistance] = useState<string>('5');
  const [angle, setAngle] = useState<string>('0');

  const result = useMemo(() => {
    const f = parseFloat(force);
    const d = parseFloat(distance);
    const a = parseFloat(angle);
    if (isNaN(f) || isNaN(d) || isNaN(a)) return null;
    const work = f * d * Math.cos((a * Math.PI) / 180);
    return work;
  }, [force, distance, angle]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Work Done (Physics)</Typography>
      <Typography variant="body1">
        In physics, work is done when a force moves an object through a distance. It equals the force applied
        multiplied by the distance moved, multiplied by the cosine of the angle between the force direction and
        the direction of movement. When the force acts exactly along the direction of motion (angle = 0°),
        cosine is 1 and the formula simplifies to just force × distance.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Work = Force × Distance × cos(θ)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pushing a box with 20 N of force across 5 meters in the same direction as the push gives Work = 20 × 5 ×
        cos(0°) = 100 joules. If instead the force were applied at a 60° angle to the direction of motion, Work
        = 20 × 5 × cos(60°) = 50 joules — only half as much useful work, since part of the force doesn&apos;t
        contribute to the motion.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Physics homework calculating work done by a force over a distance.</li>
          <li>Understanding how an angled force (like pulling a sled with a rope) reduces effective work.</li>
          <li>Estimating energy transferred when lifting, pushing, or pulling an object.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What units does the result come out in?</Typography>
      <Typography variant="body1">
        If force is in newtons (N) and distance is in meters (m), the result is in joules (J) — the standard SI
        unit of work and energy. Keep your input units consistent for the result to make physical sense.
      </Typography>
      <Typography variant="h3">Why does a 90° angle give zero work?</Typography>
      <Typography variant="body1">
        At 90°, the force is applied entirely perpendicular to the direction of motion, so cos(90°) = 0 — none of
        the force contributes to moving the object along its path, so no work is done in the physics sense, even
        if the object is moving.
      </Typography>
      <Typography variant="h3">Can work be negative?</Typography>
      <Typography variant="body1">
        Yes — when the angle is greater than 90°, cosine becomes negative, meaning the force opposes the
        direction of motion (like friction slowing something down). Negative work represents energy being
        removed rather than added.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/work-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Force (N)" type="number" fullWidth value={force} onChange={(e) => setForce(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Distance (m)" type="number" fullWidth value={distance} onChange={(e) => setDistance(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Angle Between Force & Displacement (°)" type="number" fullWidth value={angle} onChange={(e) => setAngle(e.target.value)} onFocus={(e) => e.target.select()} helperText="Default 0° means the force acts fully in the direction of motion" />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Work Done</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {result !== null ? `${result.toLocaleString(undefined, { maximumFractionDigits: 3 })} J` : '—'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WorkCalculator;
