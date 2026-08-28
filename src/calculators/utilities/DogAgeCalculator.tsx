'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type DogSize = 'small' | 'medium' | 'large';

const milestones: { label: string; dogAge: number; note: string }[] = [
  { label: 'Puppy', dogAge: 0.5, note: '~6 months old' },
  { label: 'Adolescent', dogAge: 1, note: '1 year old' },
  { label: 'Young Adult', dogAge: 3, note: '3 years old' },
  { label: 'Mature Adult', dogAge: 7, note: '7 years old' },
  { label: 'Senior', dogAge: 10, note: '10 years old' },
  { label: 'Geriatric', dogAge: 15, note: '15 years old' },
];

const DogAgeCalculator = () => {
  const [dogAge, setDogAge] = useState('3');
  const [size, setSize] = useState<DogSize>('medium');

  const result = useMemo(() => {
    const age = parseFloat(dogAge) || 0;
    if (age <= 0) return { linear: 0, ln: 0, sizeAdj: 0, age: 0 };

    // Simple linear: first year = 15 human years, second = 9, then +4 per year
    let linear: number;
    if (age < 1) linear = age * 15;
    else if (age < 2) linear = 15 + (age - 1) * 9;
    else linear = 24 + (age - 2) * 4;

    // Natural log formula: human years = 16 * ln(dogYears) + 31
    const ln = 16 * Math.log(age) + 31;

    // Size-adjusted multiplier (research-based estimates)
    const sizeMultipliers: Record<DogSize, number> = { small: 1.0, medium: 0.95, large: 0.85 };
    const sizeAdj = ln * sizeMultipliers[size];

    return { linear, ln, sizeAdj, age };
  }, [dogAge, size]);

  const getMilestoneHumanAge = (dogAgeMilestone: number): number => {
    if (dogAgeMilestone <= 0) return 0;
    if (dogAgeMilestone < 1) return dogAgeMilestone * 15;
    if (dogAgeMilestone < 2) return 15 + (dogAgeMilestone - 1) * 9;
    return 24 + (dogAgeMilestone - 2) * 4;
  };

  const content = (
    <>
      <Typography variant="h2">How is Dog Age Calculated?</Typography>
      <Typography variant="body1">
        The old "1 human year = 7 dog years" is a myth. Modern research shows dogs age rapidly in their first two years, then slow down. The most cited formula is: Human Years = 16 × ln(Dog Years) + 31. Size also matters — smaller dogs tend to live longer and age more slowly.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Logarithmic: 16 × ln(Dog Years) + 31<br />
        Linear: Year 1 = 15 human, Year 2 = +9, then +4 per year
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3-year-old dog: the linear method gives 24 + (3−2)×4 = 28 human years. The logarithmic method gives 16 × ln(3) + 31 ≈ 48.6 human years. A medium-size dog would be about 46.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Understanding your dog's life stage for health and dietary planning.</li>
          <li>Comparing your dog's biological age to human equivalents.</li>
          <li>Planning age-appropriate exercise, nutrition, and vet schedules.</li>
          <li>Fun conversation about your pet's "real" age.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is the "1 dog year = 7 human years" formula wrong?</Typography>
      <Typography variant="body1">
        Dogs mature much faster than humans in their first two years. A 1-year-old dog is roughly sexually mature (like a 15-year-old human), while a 7-year-old dog is middle-aged. The logarithmic formula better captures this non-linear aging.
      </Typography>
      <Typography variant="h3">How does size affect dog aging?</Typography>
      <Typography variant="body1">
        Research shows smaller breeds tend to live longer than large breeds. A 10-year-old Chihuahua is biologically younger than a 10-year-old Great Dane. The size adjustment applies a multiplier to reflect this.
      </Typography>
      <Typography variant="h3">At what age is a dog considered senior?</Typography>
      <Typography variant="body1">
        Generally, dogs are considered senior around 7 years for medium/large breeds and 10+ years for small breeds. Giant breeds (Great Danes, Saint Bernards) may be considered senior as early as 5–6 years.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/dog-age-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Dog's Age" type="number" value={dogAge} onChange={(e) => setDogAge(e.target.value)} slotProps={{ input: { endAdornment: <Typography variant="body2" color="text.secondary">years</Typography> } }} fullWidth />
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Dog Size</Typography>
            <ToggleButtonGroup value={size} exclusive onChange={(_, v) => v && setSize(v)} fullWidth>
              <ToggleButton value="small">Small</ToggleButton>
              <ToggleButton value="medium">Medium</ToggleButton>
              <ToggleButton value="large">Large</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Human Equivalent Age</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Logarithmic Method (research)</Typography>
            <Typography variant="h3" fontWeight="bold">{result.sizeAdj.toFixed(1)} human years</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Linear Method</Typography>
            <Typography fontWeight={600}>{result.linear.toFixed(0)} human years</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Log (unadjusted)</Typography>
            <Typography fontWeight={600}>{result.ln.toFixed(1)} human years</Typography>
          </Paper>

          <Typography variant="subtitle2" fontWeight={600} mb={1}>Dog-Human Age Milestones</Typography>
          <Paper sx={{ p: 2 }}>
            {milestones.map((m, i) => (
              <Box key={m.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: i < milestones.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                <Typography variant="body2">{m.label} ({m.note})</Typography>
                <Typography variant="body2" fontWeight={600}>≈ {getMilestoneHumanAge(m.dogAge)} human years</Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default DogAgeCalculator;
