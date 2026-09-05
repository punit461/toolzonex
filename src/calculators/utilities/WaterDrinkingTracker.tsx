'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, Button, ToggleButtonGroup, ToggleButton, LinearProgress, Stack, IconButton } from '@mui/material';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'glasses' | 'liters' | 'ml';

const GLASS_ML = 250;

const WaterDrinkingTrackerContent = () => {
  const [unit, setUnit] = useState<Unit>('glasses');
  const [goal, setGoal] = useState('8');
  const [glassesConsumed, setGlassesConsumed] = useState(0);

  const goalNum = parseFloat(goal) || 0;

  const { goalMl, consumedMl, percent } = useMemo(() => {
    let goalMl = 0;
    if (unit === 'glasses') goalMl = goalNum * GLASS_ML;
    else if (unit === 'liters') goalMl = goalNum * 1000;
    else goalMl = goalNum;

    const consumedMl = glassesConsumed * GLASS_ML;
    const percent = goalMl > 0 ? Math.min(100, (consumedMl / goalMl) * 100) : 0;
    return { goalMl, consumedMl, percent };
  }, [unit, goalNum, glassesConsumed]);

  const consumedDisplay = unit === 'liters' ? (consumedMl / 1000).toFixed(2) + ' L' : unit === 'ml' ? Math.round(consumedMl) + ' ml' : `${glassesConsumed} glasses`;
  const goalDisplay = unit === 'liters' ? goalNum.toFixed(2) + ' L' : unit === 'ml' ? Math.round(goalNum) + ' ml' : `${goalNum} glasses`;

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center" flexWrap="wrap">
        <ToggleButtonGroup
          size="small"
          value={unit}
          exclusive
          onChange={(_, v) => v && setUnit(v)}
        >
          <ToggleButton value="glasses">Glasses</ToggleButton>
          <ToggleButton value="liters">Liters</ToggleButton>
          <ToggleButton value="ml">Milliliters</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <TextField
        label={`Daily Goal (${unit})`}
        type="number"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <LocalDrinkIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
        <Typography variant="h4" fontWeight={800}>{glassesConsumed}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>glasses today ({consumedDisplay} of {goalDisplay})</Typography>

        <LinearProgress variant="determinate" value={percent} sx={{ height: 12, borderRadius: 6, my: 2 }} />
        <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>{percent.toFixed(0)}% of daily goal</Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <IconButton color="primary" onClick={() => setGlassesConsumed((c) => Math.max(0, c - 1))} disabled={glassesConsumed === 0}>
            <RemoveIcon />
          </IconButton>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setGlassesConsumed((c) => c + 1)}>
            Add a Glass
          </Button>
          <IconButton onClick={() => setGlassesConsumed(0)} title="Reset today">
            <RestartAltIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};

const WaterDrinkingTracker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Water Drinking Tracker</Typography>
      <Typography variant="body1">
        Set your daily water goal in glasses, liters, or milliliters using the unit toggle, then tap
        &quot;Add a Glass&quot; each time you drink one (each glass is counted as a standard 250 ml serving).
        The progress bar and percentage update instantly to show how close you are to your daily goal, and
        the minus button lets you correct a miscount.
      </Typography>

      <Typography variant="body1">
        Note: this tracker uses only your browser&apos;s temporary memory — there&apos;s no account or
        backend behind it, so your count resets to zero every time you reload or leave the page.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a goal of 8 glasses set, tapping &quot;Add a Glass&quot; five times shows 5 glasses consumed
        (1,250 ml), a progress bar at 63%, and the text &quot;63% of daily goal&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping a rough tally of water intake through the day at a desk or while working out.</li>
          <li>Visualizing progress toward a hydration goal during a health or fitness challenge.</li>
          <li>Quickly checking how many more glasses are needed to hit a daily target.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this tool save my water intake history?</strong> No — this is a static, client-side-only tool with no backend or account system, so today&apos;s count is stored only in your browser&apos;s memory and resets whenever you reload or close the page.</li>
          <li><strong>How much is one &quot;glass&quot;?</strong> Each glass is counted as a standard 250 ml (about 8.5 fl oz) serving, which is used to convert your tally into liters or milliliters for the goal comparison.</li>
          <li><strong>Can I set a goal in liters instead of glasses?</strong> Yes — use the unit toggle to switch the goal field between glasses, liters, and milliliters; your glass count is automatically converted to match whichever unit you choose.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/water-drinking-tracker" content={content}>
      <WaterDrinkingTrackerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WaterDrinkingTracker;
