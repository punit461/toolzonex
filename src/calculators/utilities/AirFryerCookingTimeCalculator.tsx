'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'F' | 'C';

const AirFryerCookingTimeCalculator = () => {
  const [unit, setUnit] = useState<Unit>('F');
  const [ovenTemp, setOvenTemp] = useState('400');
  const [ovenTime, setOvenTime] = useState('30');

  const result = useMemo(() => {
    const temp = parseFloat(ovenTemp) || 0;
    const time = parseFloat(ovenTime) || 0;
    const tempDrop = unit === 'F' ? 25 : 15;
    return {
      airFryerTemp: temp - tempDrop,
      airFryerTime: time * 0.8,
    };
  }, [ovenTemp, ovenTime, unit]);

  const tempLabel = unit === 'F' ? '°F' : '°C';

  const content = (
    <>
      <Typography variant="h2">How to Use the Air Fryer Cooking Time Calculator</Typography>
      <Typography variant="body1">
        Enter the oven temperature and cook time from a recipe, and this tool applies the commonly published
        air-fryer conversion guideline: lower the temperature slightly and cut the cook time, since air
        fryers circulate hot air much more intensely than a conventional oven and cook food faster at a given
        temperature.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Air Fryer Temp = Oven Temp − 25°F (or − 15°C)
        <br />
        Air Fryer Time = Oven Time × 0.80
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A recipe calls for baking at 400°F for 30 minutes in a conventional oven. In an air fryer, set the
        temperature to 400 − 25 = 375°F and the time to 30 × 0.8 = 24 minutes as a starting point, then check
        doneness from there.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a conventional oven recipe to air fryer settings without guesswork.</li>
          <li>Getting a starting point for cooking frozen foods labeled with oven-only instructions.</li>
          <li>Comparing expected cook time savings before deciding whether to use the air fryer.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is the -25°F and 20% time reduction exact for every air fryer?</strong> No — this is a commonly used starting-point guideline, not an exact science. Actual air fryer models vary significantly in wattage, basket size, and airflow design, so always check food for doneness rather than relying on the adjusted numbers alone.</li>
          <li><strong>Should I preheat the air fryer?</strong> Many air fryers benefit from a short preheat (2-5 minutes) for the most accurate results, similar to a conventional oven, though some recipes and models skip this step. Check your air fryer&apos;s manual for its specific recommendation.</li>
          <li><strong>Why does the air fryer need less time at a similar temperature?</strong> Air fryers use a small, enclosed chamber with a powerful fan that circulates hot air directly around the food, transferring heat much faster and more evenly than the larger air volume in a conventional oven.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/air-fryer-cooking-time-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={(_, val: Unit | null) => { if (val) setUnit(val); }}
          size="small"
        >
          <ToggleButton value="F">°F</ToggleButton>
          <ToggleButton value="C">°C</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label={`Oven Temperature (${tempLabel})`} type="number" value={ovenTemp} onChange={(e) => setOvenTemp(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Oven Cook Time (minutes)" type="number" value={ovenTime} onChange={(e) => setOvenTime(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Air Fryer Temperature</Typography>
            <Typography variant="h3" fontWeight="bold">{result.airFryerTemp}{tempLabel}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Air Fryer Time</Typography>
            <Typography fontWeight={600}>{result.airFryerTime.toFixed(0)} min</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AirFryerCookingTimeCalculator;
