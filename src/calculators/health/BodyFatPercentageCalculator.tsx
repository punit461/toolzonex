'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, RadioGroup, Radio, FormControlLabel, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function categorize(gender: 'male' | 'female', bf: number): string {
  if (gender === 'male') {
    if (bf < 6) return 'Essential Fat';
    if (bf <= 13) return 'Athletes';
    if (bf <= 17) return 'Fitness';
    if (bf <= 24) return 'Average';
    return 'Obese';
  }
  if (bf < 14) return 'Essential Fat';
  if (bf <= 20) return 'Athletes';
  if (bf <= 24) return 'Fitness';
  if (bf <= 31) return 'Average';
  return 'Obese';
}

const BodyFatPercentageContent = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState<number>(75);
  const [waist, setWaist] = useState<number>(85);

  const { bodyFat, category } = useMemo(() => {
    if (!weight || !waist || weight <= 0 || waist <= 0) return { bodyFat: null as number | null, category: '' };

    // YMCA Method: needs weight in pounds and waist in inches.
    const weightLbs = unit === 'metric' ? weight * 2.20462 : weight;
    const waistIn = unit === 'metric' ? waist / 2.54 : waist;

    const base = gender === 'male' ? -98.42 : -76.76;
    const bf = ((base + 4.15 * waistIn - 0.082 * weightLbs) / weightLbs) * 100;

    if (!Number.isFinite(bf) || bf <= 0 || bf > 70) return { bodyFat: null as number | null, category: '' };

    const rounded = Math.round(bf * 10) / 10;
    return { bodyFat: rounded, category: categorize(gender, rounded) };
  }, [gender, unit, weight, waist]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <ToggleButtonGroup color="primary" value={gender} exclusive onChange={(_, v) => v && setGender(v)} size="small">
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
          </ToggleButtonGroup>

          <RadioGroup row value={unit} onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}>
            <FormControlLabel value="metric" control={<Radio size="small" />} label="Metric (kg/cm)" />
            <FormControlLabel value="imperial" control={<Radio size="small" />} label="US (lbs/in)" />
          </RadioGroup>
        </Box>

        <TextField
          label={`Weight (${unit === 'metric' ? 'kg' : 'lbs'})`}
          type="number"
          value={weight || ''}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setWeight(Number(e.target.value))}
          fullWidth
        />
        <TextField
          label={`Waist circumference (${unit === 'metric' ? 'cm' : 'inches'})`}
          type="number"
          value={waist || ''}
          onFocus={(e) => e.target.select()}
          onChange={(e) => setWaist(Number(e.target.value))}
          fullWidth
          helperText="Measure at the navel, standing relaxed."
        />
      </Box>

      <Box>
        {bodyFat !== null ? (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Estimated Body Fat (YMCA Method)</Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '4rem', color: 'primary.main', my: 1 }}>{bodyFat}%</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{category}</Typography>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Enter your weight and waist circumference to estimate body fat percentage using the YMCA method.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const BodyFatPercentageCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Body Fat Percentage Calculator — YMCA Method</Typography>
      <Typography variant="body1">
        This calculator estimates body fat percentage using the <strong>YMCA method</strong>, a formula developed
        for use in YMCA fitness assessments that needs only two measurements — body weight and waist
        circumference. It&apos;s a different, quicker estimation approach than the tape-measure US Navy method
        (which factors in neck, waist, height, and hip), making it a useful alternative when you want a fast
        estimate without measuring your neck or hips.
      </Typography>

      <Typography variant="h2">How the YMCA Formula Works</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Select your gender and preferred unit (metric or US).</li>
          <li>Enter your body weight.</li>
          <li>Enter your waist circumference, measured at the navel while standing relaxed.</li>
          <li>
            The formula converts your inputs to pounds and inches internally, then applies:
            {' '}<code>Men: ((-98.42 + 4.15 × waist) − 0.082 × weight) / weight × 100</code>,{' '}
            <code>Women: ((-76.76 + 4.15 × waist) − 0.082 × weight) / weight × 100</code>.
          </li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A man weighing 180 lbs with a 34-inch waist gets an estimated body fat percentage in the &quot;Average&quot;
        range using the YMCA formula above.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a fast body fat estimate with just a scale and a tape measure around the waist.</li>
          <li>Cross-checking results against other estimation methods, like the Navy tape-measure method.</li>
          <li>Tracking body composition trends over time without special equipment.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from your other body fat calculator?</Typography>
      <Typography variant="body1">
        This tool uses the <strong>YMCA method</strong>, which only requires body weight and waist circumference.
        Our separate Body Fat Calculator uses the US Navy tape-measure method, which requires neck, waist,
        height, and (for women) hip measurements. The two formulas can give slightly different results since
        they use different inputs and statistical models.
      </Typography>
      <Typography variant="h3">How accurate is the YMCA body fat method?</Typography>
      <Typography variant="body1">
        It&apos;s a reasonable estimate for the general population but, like all circumference-based formulas, it
        is not as precise as lab methods such as DEXA scans or hydrostatic weighing. It tends to be less
        accurate for very muscular or very lean individuals. Use it to track trends over weeks and months
        rather than treating any single reading as an exact number. This tool is for general fitness
        information only and is not a substitute for professional medical or clinical body composition testing.
      </Typography>
      <Typography variant="h3">What do I need to measure for this calculator?</Typography>
      <Typography variant="body1">
        Just your body weight and your waist circumference at the navel — no neck or hip measurement is
        required for the YMCA method, unlike the Navy tape-measure method.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/body-fat-percentage-calculator" content={content}>
      <BodyFatPercentageContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BodyFatPercentageCalculator;
