'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Representative weight-for-age reference points (kg) at the 3rd, 50th, and 97th
// percentiles, approximating the shape of the WHO Child Growth Standards. This is a
// compact approximation for a quick estimate, not the full official WHO dataset.
const REFERENCE: Record<'boy' | 'girl', { months: number; p3: number; p50: number; p97: number }[]> = {
  boy: [
    { months: 0, p3: 2.5, p50: 3.3, p97: 4.4 },
    { months: 1, p3: 3.4, p50: 4.5, p97: 5.8 },
    { months: 2, p3: 4.3, p50: 5.6, p97: 7.1 },
    { months: 3, p3: 5.0, p50: 6.4, p97: 8.0 },
    { months: 4, p3: 5.6, p50: 7.0, p97: 8.7 },
    { months: 6, p3: 6.4, p50: 7.9, p97: 9.8 },
    { months: 9, p3: 7.1, p50: 8.9, p97: 10.9 },
    { months: 12, p3: 7.7, p50: 9.6, p97: 11.8 },
    { months: 15, p3: 8.3, p50: 10.3, p97: 12.6 },
    { months: 18, p3: 8.8, p50: 10.9, p97: 13.3 },
    { months: 21, p3: 9.2, p50: 11.5, p97: 14.0 },
    { months: 24, p3: 9.7, p50: 12.2, p97: 14.7 },
    { months: 30, p3: 10.5, p50: 13.3, p97: 16.0 },
    { months: 36, p3: 11.3, p50: 14.3, p97: 17.3 },
  ],
  girl: [
    { months: 0, p3: 2.4, p50: 3.2, p97: 4.2 },
    { months: 1, p3: 3.2, p50: 4.2, p97: 5.5 },
    { months: 2, p3: 3.9, p50: 5.1, p97: 6.6 },
    { months: 3, p3: 4.5, p50: 5.8, p97: 7.5 },
    { months: 4, p3: 5.0, p50: 6.4, p97: 8.2 },
    { months: 6, p3: 5.7, p50: 7.3, p97: 9.3 },
    { months: 9, p3: 6.5, p50: 8.2, p97: 10.5 },
    { months: 12, p3: 7.0, p50: 8.9, p97: 11.5 },
    { months: 15, p3: 7.6, p50: 9.6, p97: 12.4 },
    { months: 18, p3: 8.1, p50: 10.2, p97: 13.2 },
    { months: 21, p3: 8.6, p50: 10.9, p97: 14.0 },
    { months: 24, p3: 9.0, p50: 11.5, p97: 14.8 },
    { months: 30, p3: 9.9, p50: 12.7, p97: 16.5 },
    { months: 36, p3: 10.8, p50: 13.9, p97: 18.1 },
  ],
};

function interpolateBand(sex: 'boy' | 'girl', months: number) {
  const rows = REFERENCE[sex];
  if (months <= rows[0].months) return rows[0];
  if (months >= rows[rows.length - 1].months) return rows[rows.length - 1];

  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i];
    const b = rows[i + 1];
    if (months >= a.months && months <= b.months) {
      const t = (months - a.months) / (b.months - a.months);
      return {
        months,
        p3: a.p3 + (b.p3 - a.p3) * t,
        p50: a.p50 + (b.p50 - a.p50) * t,
        p97: a.p97 + (b.p97 - a.p97) * t,
      };
    }
  }
  return rows[rows.length - 1];
}

function estimatePercentile(weightKg: number, band: { p3: number; p50: number; p97: number }) {
  if (weightKg <= band.p3) return Math.max(1, Math.round(3 * (weightKg / band.p3)));
  if (weightKg <= band.p50) return Math.round(3 + ((weightKg - band.p3) / (band.p50 - band.p3)) * (50 - 3));
  if (weightKg <= band.p97) return Math.round(50 + ((weightKg - band.p50) / (band.p97 - band.p50)) * (97 - 50));
  return Math.min(99, Math.round(97 + ((weightKg - band.p97) / band.p97) * 2));
}

const BabyGrowthCalculator = () => {
  const [sex, setSex] = useState<'boy' | 'girl'>('boy');
  const [ageUnit, setAgeUnit] = useState<'months' | 'weeks'>('months');
  const [ageValue, setAgeValue] = useState<string>('6');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<string>('7.5');

  const { percentile, band, ageMonths } = useMemo(() => {
    const rawAge = parseFloat(ageValue) || 0;
    const months = ageUnit === 'months' ? rawAge : rawAge / 4.345;
    const w = parseFloat(weight) || 0;
    if (months < 0 || w <= 0) return { percentile: 0, band: null, ageMonths: months };

    const weightKg = weightUnit === 'kg' ? w : w / 2.20462;
    const clampedMonths = Math.min(36, Math.max(0, months));
    const refBand = interpolateBand(sex, clampedMonths);
    const pct = estimatePercentile(weightKg, refBand);

    return { percentile: pct, band: refBand, ageMonths: months };
  }, [sex, ageUnit, ageValue, weightUnit, weight]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Baby Growth Calculator</Typography>
      <Typography variant="body1">
        Enter your baby's sex, age, and current weight to see an estimated <strong>weight-for-age
        percentile</strong> — how your baby's weight compares to other babies of the same age and sex. This
        tool focuses specifically on weight-for-age, the single most commonly tracked growth metric in a baby's
        first few years, using a compact reference dataset shaped like the WHO Child Growth Standards curves.
      </Typography>

      <Typography variant="h2">How the Percentile Is Estimated</Typography>
      <Typography variant="body1">
        The calculator holds reference weight values at the 3rd, 50th, and 97th percentiles across a range of
        ages from birth to 36 months, separately for boys and girls. It interpolates between these reference
        points for the exact age you enter, then estimates where your baby's weight falls between those bands.
        A result near the 50th percentile means your baby's weight is roughly in the middle of the typical
        range for their age and sex; a lower or higher number means their weight tracks below or above that
        midpoint.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 6-month-old boy weighing 7.9 kg lands almost exactly at the 50th percentile for weight, since 7.9 kg
        is the approximate median weight for boys at that age. A 6-month-old boy weighing 6.4 kg would land
        closer to the 3rd percentile, since that's the lower reference boundary at that age.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a quick, general sense of where a baby's weight falls before a checkup.</li>
          <li>Understanding what "percentile" means when a pediatrician mentions it.</li>
          <li>Tracking rough weight trends between official growth-chart measurements.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this an official medical growth chart?</Typography>
      <Typography variant="body1">
        No — <strong>this is an estimate, not a medical diagnostic tool.</strong> It uses a small representative
        dataset approximating the WHO growth standard curves for weight-for-age only. Your pediatrician's
        official growth chart, which plots your baby's measurements over multiple visits using the full WHO or
        CDC dataset, is the authoritative reference for your baby's health and development — always discuss any
        growth concerns with your baby's doctor rather than relying on this tool alone.
      </Typography>
      <Typography variant="h3">Why does this only calculate weight percentile?</Typography>
      <Typography variant="body1">
        Weight-for-age is the most frequently referenced growth metric and the one most parents ask about, so
        this calculator focuses on giving that one estimate well. Height/length-for-age and head-circumference
        percentiles use separate reference curves and are best tracked on your pediatrician's official growth
        chart alongside weight.
      </Typography>
      <Typography variant="h3">What if my baby's weight percentile changes a lot between visits?</Typography>
      <Typography variant="body1">
        Some fluctuation is normal, especially in the first year. Pediatricians generally look for a consistent
        trend along a similar percentile curve over time rather than a single reading — a sudden, large jump up
        or down is what usually prompts a closer look, not the exact percentile number itself.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/baby-growth-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Sex</Typography>
            <ToggleButtonGroup
              color="primary"
              value={sex}
              exclusive
              onChange={(_, value) => { if (value) setSex(value); }}
              size="small"
            >
              <ToggleButton value="boy" sx={{ px: 2 }}>Boy</ToggleButton>
              <ToggleButton value="girl" sx={{ px: 2 }}>Girl</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography>Age</Typography>
              <ToggleButtonGroup
                color="primary"
                value={ageUnit}
                exclusive
                onChange={(_, value) => { if (value) setAgeUnit(value); }}
                size="small"
              >
                <ToggleButton value="weeks" sx={{ px: 1 }}>Weeks</ToggleButton>
                <ToggleButton value="months" sx={{ px: 1 }}>Months</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <TextField
              fullWidth
              type="number"
              onFocus={(e) => e.target.select()}
              value={ageValue}
              onChange={(e) => setAgeValue(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{ageUnit}</InputAdornment> } }}
            />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography>Weight</Typography>
              <ToggleButtonGroup
                color="primary"
                value={weightUnit}
                exclusive
                onChange={(_, value) => { if (value) setWeightUnit(value); }}
                size="small"
              >
                <ToggleButton value="kg" sx={{ px: 1 }}>kg</ToggleButton>
                <ToggleButton value="lbs" sx={{ px: 1 }}>lbs</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <TextField
              fullWidth
              type="number"
              onFocus={(e) => e.target.select()}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Paper sx={{ p: 4, bgcolor: 'action.hover', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Estimated Weight Percentile</Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '3.5rem', color: 'primary.main', my: 2 }}>
              {percentile ? `~${percentile}th` : '—'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              {band
                ? `Reference median at this age: ${band.p50.toFixed(1)} kg (range ${band.p3.toFixed(1)}–${band.p97.toFixed(1)} kg)`
                : 'Enter age and weight to see the estimate'}
            </Typography>
            {ageMonths > 36 && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                This dataset covers ages up to 36 months; the estimate above is extrapolated beyond that.
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BabyGrowthCalculator;
