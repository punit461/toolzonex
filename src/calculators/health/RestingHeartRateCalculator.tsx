'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Gender = 'male' | 'female';

interface Bracket {
  minAge: number;
  maxAge: number;
  // Upper bound (inclusive) of bpm for each category, in order; anything above the last is "Poor".
  thresholds: { label: string; upTo: number }[];
}

const MALE_BRACKETS: Bracket[] = [
  { minAge: 18, maxAge: 25, thresholds: [{ label: 'Athlete', upTo: 59 }, { label: 'Excellent', upTo: 65 }, { label: 'Good', upTo: 69 }, { label: 'Above Average', upTo: 73 }, { label: 'Average', upTo: 78 }, { label: 'Below Average', upTo: 84 }] },
  { minAge: 26, maxAge: 35, thresholds: [{ label: 'Athlete', upTo: 59 }, { label: 'Excellent', upTo: 64 }, { label: 'Good', upTo: 69 }, { label: 'Above Average', upTo: 73 }, { label: 'Average', upTo: 78 }, { label: 'Below Average', upTo: 84 }] },
  { minAge: 36, maxAge: 45, thresholds: [{ label: 'Athlete', upTo: 59 }, { label: 'Excellent', upTo: 65 }, { label: 'Good', upTo: 70 }, { label: 'Above Average', upTo: 74 }, { label: 'Average', upTo: 78 }, { label: 'Below Average', upTo: 84 }] },
  { minAge: 46, maxAge: 55, thresholds: [{ label: 'Athlete', upTo: 60 }, { label: 'Excellent', upTo: 65 }, { label: 'Good', upTo: 70 }, { label: 'Above Average', upTo: 75 }, { label: 'Average', upTo: 80 }, { label: 'Below Average', upTo: 84 }] },
  { minAge: 56, maxAge: 65, thresholds: [{ label: 'Athlete', upTo: 60 }, { label: 'Excellent', upTo: 65 }, { label: 'Good', upTo: 70 }, { label: 'Above Average', upTo: 75 }, { label: 'Average', upTo: 80 }, { label: 'Below Average', upTo: 84 }] },
  { minAge: 66, maxAge: 200, thresholds: [{ label: 'Athlete', upTo: 60 }, { label: 'Excellent', upTo: 65 }, { label: 'Good', upTo: 70 }, { label: 'Above Average', upTo: 75 }, { label: 'Average', upTo: 80 }, { label: 'Below Average', upTo: 84 }] },
];

const FEMALE_BRACKETS: Bracket[] = [
  { minAge: 18, maxAge: 25, thresholds: [{ label: 'Athlete', upTo: 59 }, { label: 'Excellent', upTo: 64 }, { label: 'Good', upTo: 68 }, { label: 'Above Average', upTo: 72 }, { label: 'Average', upTo: 76 }, { label: 'Below Average', upTo: 82 }] },
  { minAge: 26, maxAge: 35, thresholds: [{ label: 'Athlete', upTo: 59 }, { label: 'Excellent', upTo: 64 }, { label: 'Good', upTo: 69 }, { label: 'Above Average', upTo: 73 }, { label: 'Average', upTo: 78 }, { label: 'Below Average', upTo: 84 }] },
  { minAge: 36, maxAge: 45, thresholds: [{ label: 'Athlete', upTo: 59 }, { label: 'Excellent', upTo: 64 }, { label: 'Good', upTo: 69 }, { label: 'Above Average', upTo: 74 }, { label: 'Average', upTo: 79 }, { label: 'Below Average', upTo: 84 }] },
  { minAge: 46, maxAge: 55, thresholds: [{ label: 'Athlete', upTo: 60 }, { label: 'Excellent', upTo: 65 }, { label: 'Good', upTo: 69 }, { label: 'Above Average', upTo: 73 }, { label: 'Average', upTo: 78 }, { label: 'Below Average', upTo: 84 }] },
  { minAge: 56, maxAge: 65, thresholds: [{ label: 'Athlete', upTo: 60 }, { label: 'Excellent', upTo: 65 }, { label: 'Good', upTo: 69 }, { label: 'Above Average', upTo: 73 }, { label: 'Average', upTo: 77 }, { label: 'Below Average', upTo: 83 }] },
  { minAge: 66, maxAge: 200, thresholds: [{ label: 'Athlete', upTo: 60 }, { label: 'Excellent', upTo: 65 }, { label: 'Good', upTo: 69 }, { label: 'Above Average', upTo: 73 }, { label: 'Average', upTo: 77 }, { label: 'Below Average', upTo: 83 }] },
];

function classify(bpm: number, age: number, gender: Gender): string {
  const brackets = gender === 'male' ? MALE_BRACKETS : FEMALE_BRACKETS;
  const bracket = brackets.find((b) => age >= b.minAge && age <= b.maxAge) ?? brackets[brackets.length - 1];
  for (const t of bracket.thresholds) {
    if (bpm <= t.upTo) return t.label;
  }
  return 'Poor';
}

const RestingHeartRateCalculator = () => {
  const [bpm, setBpm] = useState<string>('68');
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<Gender>('male');

  const result = useMemo(() => {
    const b = parseFloat(bpm);
    const a = parseFloat(age);
    if (Number.isNaN(b) || Number.isNaN(a) || b <= 0 || a <= 0) return null;
    return classify(b, a, gender);
  }, [bpm, age, gender]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Resting Heart Rate Calculator</Typography>
      <Typography variant="body1">
        Enter your measured resting heart rate — your pulse taken at rest, ideally first thing in the
        morning before getting out of bed — along with your age and gender, and this tool classifies it into
        a fitness category using published resting-heart-rate-by-age-and-gender bands, similar to charts
        commonly used by fitness organizations. A lower resting heart rate generally reflects better
        cardiovascular fitness.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Fitness Category = lookup(Measured Resting BPM, Age Bracket, Gender)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 30-year-old male with a measured resting heart rate of 68 bpm falls in the 26-35 age bracket, where
        68 bpm lands in the &quot;Good&quot; category — above &quot;Excellent&quot; (60-64 bpm) but better than
        &quot;Above Average&quot; (70-73 bpm).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking how your morning resting pulse compares to others of your age and gender.</li>
          <li>Tracking whether your cardiovascular fitness is improving as your resting heart rate drops over time.</li>
          <li>Getting context on a resting heart rate reading from a fitness tracker or smartwatch.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Heart Rate Calculator?</strong> The Heart Rate Calculator estimates your maximum heart rate and training zones from a formula based only on your age (220 − age, or the Tanaka formula) — it doesn't use a measured pulse at all. This Resting Heart Rate Calculator does the opposite: it takes a pulse number YOU actually measured at rest and classifies it into a fitness category. It calculates no maximum or target values.</li>
          <li><strong>How is this different from the Target Heart Rate Calculator?</strong> The Target Heart Rate Calculator uses the Karvonen formula to compute a target training zone (a range of bpm to aim for during exercise) from your age, resting heart rate, and desired intensity. This tool doesn't calculate any target or training zone — it only classifies your already-measured resting pulse into a fitness category like Excellent, Good, or Average.</li>
          <li><strong>How do I measure my resting heart rate accurately?</strong> Take your pulse for a full 60 seconds right after waking up, while still lying down, before coffee, exercise, or checking your phone. Measuring on a few different mornings and averaging the results gives a more reliable number than a single reading, since resting heart rate can fluctuate day to day with sleep, stress, and hydration.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/health/resting-heart-rate-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Measured Resting Heart Rate" type="number" value={bpm}
            onChange={(e) => setBpm(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">bpm</InputAdornment> } }}
          />
          <TextField
            label="Age" type="number" value={age}
            onChange={(e) => setAge(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">yrs</InputAdornment> } }}
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Fitness Category</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Based on Age &amp; Gender</Typography>
            <Typography variant="h4" fontWeight="bold">{result ?? '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RestingHeartRateCalculator;
