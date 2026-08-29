'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ZONES = [
  { label: 'Zone 1 · Warm Up', range: [0.5, 0.6], desc: 'Very light activity, warm-up and cool-down.' },
  { label: 'Zone 2 · Fat Burn', range: [0.6, 0.7], desc: 'Light aerobic effort, builds base endurance.' },
  { label: 'Zone 3 · Cardio', range: [0.7, 0.8], desc: 'Moderate-to-hard effort, improves cardiovascular fitness.' },
  { label: 'Zone 4 · Peak', range: [0.8, 0.9], desc: 'Hard anaerobic effort, boosts speed and performance.' },
  { label: 'Zone 5 · Max Effort', range: [0.9, 1.0], desc: 'Maximum, short-burst effort — sprints only.' },
];

const HeartRateCalculator = () => {
  const [age, setAge] = useState<string>('30');

  const { maxHr, tanakaHr } = useMemo(() => {
    const a = parseFloat(age) || 0;
    if (a <= 0) return { maxHr: 0, tanakaHr: 0 };
    return {
      maxHr: Math.round(220 - a),
      tanakaHr: Math.round(208 - 0.7 * a),
    };
  }, [age]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Heart Rate Calculator</Typography>
      <Typography variant="body1">
        Enter your age and the calculator instantly estimates your maximum heart rate (MHR) using the classic
        <strong> 220 − age</strong> formula, plus your five heart-rate training zones as percentages of that
        max. It also shows the more accurate Tanaka formula (<strong>208 − 0.7 × age</strong>) as an alternative,
        since the traditional formula tends to overestimate max heart rate in older adults.
      </Typography>

      <Typography variant="h2">Which Formula Is More Accurate?</Typography>
      <Typography variant="body1">
        The classic <strong>220 − age</strong> formula (Fox, 1971) is the most widely known, but research since
        then — notably a 2001 study by Tanaka, Monahan, and Seals — found it systematically overestimates max
        heart rate for many adults, especially past middle age. The <strong>Tanaka formula (208 − 0.7 × age)</strong>{' '}
        was derived from a much larger dataset and is generally considered more accurate across a wider age range.
        Both are population averages, though — your true max heart rate can only be confirmed with a supervised
        maximal exercise test.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 40-year-old has an estimated max heart rate of 180 bpm using 220 − age, or about 180 bpm using the
        Tanaka formula (208 − 0.7 × 40 = 180) — in this case the two formulas agree almost exactly, though they
        diverge more at younger and older ages.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting heart-rate training zones for cardio and endurance workouts.</li>
          <li>Choosing an intensity target for fat-burning versus performance training.</li>
          <li>Checking whether your workout heart rate falls in a safe, sustainable range.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I calculate my maximum heart rate?</Typography>
      <Typography variant="body1">
        The simplest estimate is 220 minus your age. For a more accurate estimate, use the Tanaka formula:
        208 − (0.7 × your age). Both are shown automatically above once you enter your age.
      </Typography>
      <Typography variant="h3">What are heart rate training zones?</Typography>
      <Typography variant="body1">
        Training zones divide your max heart rate into percentage bands — roughly 50-60% for warm-up, 60-70%
        for fat burn, 70-80% for cardio, 80-90% for peak/anaerobic effort, and 90-100% for maximum short bursts.
        Each zone targets a different training benefit.
      </Typography>
      <Typography variant="h3">Is this calculator a substitute for medical advice?</Typography>
      <Typography variant="body1">
        No — this tool provides a statistical estimate based on population-average formulas, not a personalized
        medical assessment. If you have a heart condition, are new to exercise, or are on medication that
        affects heart rate, consult a doctor before using these zones to guide your training.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/heart-rate-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Age (Years)</Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            onFocus={(e) => e.target.select()}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <Box sx={{ mt: 4, p: 3, bgcolor: 'action.hover', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Max Heart Rate (220 − age)</Typography>
              <Typography sx={{ fontWeight: 700 }}>{maxHr || '—'} bpm</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Max Heart Rate (Tanaka)</Typography>
              <Typography sx={{ fontWeight: 700 }}>{tanakaHr || '—'} bpm</Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Training Zones (based on 220 − age)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {ZONES.map((zone) => (
              <Paper key={zone.label} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography sx={{ fontWeight: 600 }}>{zone.label}</Typography>
                  <Typography sx={{ fontWeight: 700 }}>
                    {maxHr ? `${Math.round(maxHr * zone.range[0])}–${Math.round(maxHr * zone.range[1])} bpm` : '—'}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">{zone.desc}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HeartRateCalculator;
