'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TargetHeartRateCalculator = () => {
  const [age, setAge] = useState<string>('30');
  const [restingHr, setRestingHr] = useState<string>('70');
  const [minIntensity, setMinIntensity] = useState<string>('50');
  const [maxIntensity, setMaxIntensity] = useState<string>('85');

  const { maxHr, hrr, lowTarget, highTarget } = useMemo(() => {
    const a = parseFloat(age) || 0;
    const rhr = parseFloat(restingHr) || 0;
    const minPct = parseFloat(minIntensity) || 0;
    const maxPct = parseFloat(maxIntensity) || 0;
    if (a <= 0 || rhr <= 0) return { maxHr: 0, hrr: 0, lowTarget: 0, highTarget: 0 };

    const mhr = 220 - a;
    const reserve = mhr - rhr;
    const low = Math.round(reserve * (minPct / 100) + rhr);
    const high = Math.round(reserve * (maxPct / 100) + rhr);

    return { maxHr: mhr, hrr: reserve, lowTarget: low, highTarget: high };
  }, [age, restingHr, minIntensity, maxIntensity]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Target Heart Rate Calculator</Typography>
      <Typography variant="body1">
        Enter your age, resting heart rate, and a desired intensity range. This calculator uses the{' '}
        <strong>Karvonen formula</strong>: <strong>Target HR = ((Max HR − Resting HR) × %Intensity) + Resting
        HR</strong>. Unlike a simple percentage of max heart rate, the Karvonen method factors in your resting
        heart rate — your Heart Rate Reserve (HRR) — which makes it more personalized and generally considered
        more accurate, especially for people whose resting heart rate is unusually high or low.
      </Typography>

      <Typography variant="h2">Why the Karvonen Formula Is More Accurate</Typography>
      <Typography variant="body1">
        A simple percentage-of-max-HR method treats everyone with the same age identically, ignoring
        cardiovascular fitness. Two 30-year-olds with the same max heart rate but very different resting heart
        rates (say 50 bpm for a trained athlete versus 80 bpm for a sedentary person) actually need different
        target zones to achieve the same relative effort. The Karvonen formula accounts for this by working
        from your Heart Rate Reserve — the gap between your resting and maximum heart rate — rather than max
        heart rate alone.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 30-year-old with a resting heart rate of 70 bpm has a max heart rate of 190 bpm and a Heart Rate
        Reserve of 120 bpm. For a 50-85% intensity range, the Karvonen formula gives a target zone of
        (120 × 0.50) + 70 = 130 bpm to (120 × 0.85) + 70 = 172 bpm.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a personalized cardio training zone that accounts for fitness level.</li>
          <li>Comparing training intensity across people with different resting heart rates.</li>
          <li>Tracking whether a workout heart rate matches an intended training zone.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the Karvonen formula?</Typography>
      <Typography variant="body1">
        The Karvonen formula calculates a target heart rate using your Heart Rate Reserve (max heart rate minus
        resting heart rate): <strong>Target HR = ((Max HR − Resting HR) × %Intensity) + Resting HR</strong>. It
        is considered more accurate than simply taking a percentage of max heart rate because it accounts for
        individual fitness via resting heart rate.
      </Typography>
      <Typography variant="h3">How do I find my resting heart rate?</Typography>
      <Typography variant="body1">
        Measure your pulse for a full minute right after waking up, before getting out of bed, on a day you
        feel well-rested. Average it over a few mornings for a more reliable number.
      </Typography>
      <Typography variant="h3">Is this a substitute for medical advice?</Typography>
      <Typography variant="body1">
        No — this tool gives a statistical estimate based on standard exercise-physiology formulas, not a
        personalized medical assessment. If you have a heart condition or are new to exercise, consult a doctor
        before training in these zones.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/target-heart-rate-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Age (Years)"
            fullWidth
            variant="outlined"
            type="number"
            onFocus={(e) => e.target.select()}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            label="Resting Heart Rate (bpm)"
            fullWidth
            variant="outlined"
            type="number"
            onFocus={(e) => e.target.select()}
            value={restingHr}
            onChange={(e) => setRestingHr(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Min Intensity (%)"
              fullWidth
              type="number"
              value={minIntensity}
              onChange={(e) => setMinIntensity(e.target.value)}
            />
            <TextField
              label="Max Intensity (%)"
              fullWidth
              type="number"
              value={maxIntensity}
              onChange={(e) => setMaxIntensity(e.target.value)}
            />
          </Box>
        </Box>

        <Box>
          <Paper sx={{ p: 4, bgcolor: 'action.hover', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Target Heart Rate Zone</Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '3rem', color: 'primary.main', my: 2, textAlign: 'center' }}>
              {lowTarget && highTarget ? `${lowTarget}–${highTarget}` : '—'}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>bpm</Typography>

            <Box sx={{ width: '100%', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Max Heart Rate</Typography>
                <Typography sx={{ fontWeight: 600 }}>{maxHr || '—'} bpm</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Heart Rate Reserve</Typography>
                <Typography sx={{ fontWeight: 600 }}>{hrr || '—'} bpm</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TargetHeartRateCalculator;
