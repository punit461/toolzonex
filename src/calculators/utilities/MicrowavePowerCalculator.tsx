'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MicrowavePowerCalculator = () => {
  const [originalTime, setOriginalTime] = useState('3');
  const [originalWattage, setOriginalWattage] = useState('1000');
  const [yourWattage, setYourWattage] = useState('700');

  const result = useMemo(() => {
    const t = parseFloat(originalTime) || 0;
    const ow = parseFloat(originalWattage) || 0;
    const yw = parseFloat(yourWattage) || 0;
    if (t <= 0 || ow <= 0 || yw <= 0) return { valid: false, newTime: 0 };
    return { valid: true, newTime: t * (ow / yw) };
  }, [originalTime, originalWattage, yourWattage]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Microwave Power Calculator</Typography>
      <Typography variant="body1">
        Enter the cook time and wattage listed on your food&apos;s packaging or recipe, then enter your own
        microwave&apos;s actual wattage. A lower-wattage microwave delivers less energy per minute, so it needs
        more time to deliver the same total energy — and a higher-wattage microwave needs less time.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        New Time = Original Time × (Original Wattage / Your Wattage)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A package says to microwave for 3 minutes at 1000 watts, but your microwave is only 700 watts. New
        Time = 3 × (1000 / 700) ≈ 4.3 minutes — noticeably longer, since your microwave delivers less power
        per minute.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adjusting frozen meal or popcorn cook times listed for a different microwave wattage.</li>
          <li>Converting recipe or reheating instructions when using a dorm, RV, or office microwave.</li>
          <li>Comparing expected cook times before buying a new, differently-rated microwave.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does a lower wattage need MORE time, not less?</strong> Wattage measures how much energy the microwave delivers per second. A lower-wattage microwave delivers energy more slowly, so it takes longer to deliver the same total amount of energy needed to heat the food through — hence more time, not less.</li>
          <li><strong>Where do I find my microwave&apos;s actual wattage?</strong> Check the inside of the door, the back panel, or the manufacturer&apos;s manual — it&apos;s usually listed in watts (e.g. &quot;700W&quot; or &quot;1100W&quot;). This is different from the wattage a recipe assumes, which is why conversion matters.</li>
          <li><strong>Is this conversion exact for all foods?</strong> It&apos;s a solid mathematical starting point, but actual results can vary slightly by food density, moisture content, and container material. Check food periodically near the end of the adjusted time rather than relying on it as an exact cutoff.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/microwave-power-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Original Cook Time (minutes)" type="number" value={originalTime} onChange={(e) => setOriginalTime(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Original Microwave Wattage" type="number" value={originalWattage} onChange={(e) => setOriginalWattage(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Your Microwave's Wattage" type="number" value={yourWattage} onChange={(e) => setYourWattage(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Adjusted Cook Time</Typography>
            <Typography variant="h3" fontWeight="bold">
              {result.valid ? `${result.newTime.toFixed(1)} min` : '—'}
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MicrowavePowerCalculator;
