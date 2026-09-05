'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'gallons' | 'liters';

const TankFillingTimeCalculator = () => {
  const [unit, setUnit] = useState<Unit>('gallons');
  const [volume, setVolume] = useState('500');
  const [fillRate, setFillRate] = useState('10');
  const [alreadyFilled, setAlreadyFilled] = useState('0');

  const result = useMemo(() => {
    const v = parseFloat(volume) || 0;
    const r = parseFloat(fillRate) || 0;
    const pct = Math.min(100, Math.max(0, parseFloat(alreadyFilled) || 0));

    if (v <= 0 || r <= 0) return { valid: false, minutes: 0 };

    const remaining = v * (1 - pct / 100);
    const minutes = remaining / r;
    return { valid: true, minutes };
  }, [volume, fillRate, alreadyFilled]);

  const unitLabel = unit === 'gallons' ? 'gallons' : 'liters';

  const content = (
    <>
      <Typography variant="h2">How to Use the Tank Filling Time Calculator</Typography>
      <Typography variant="body1">
        Enter your tank&apos;s total volume, your fill rate (how much volume flows in per minute), and — if the
        tank isn&apos;t starting empty — what percentage is already filled. The calculator finds only the
        remaining volume that still needs to be filled and divides it by your fill rate to get the time
        remaining.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Time = (Volume × (1 − Already Filled %)) / Fill Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 500 gallon tank filling at 10 gallons per minute from empty takes 500 / 10 = 50 minutes. If the tank
        is already 20% full, only 400 gallons remain, so the time drops to 400 / 10 = 40 minutes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Timing how long it takes to fill a pool, aquarium, or water storage tank from a hose or pump.</li>
          <li>Estimating remaining fill time for a tank that&apos;s already partially full.</li>
          <li>Comparing fill times across different pump or hose flow rates before buying equipment.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if my fill rate slows down as the tank fills?</strong> This calculator assumes a constant fill rate, which is accurate for most pumps and hoses at typical pressures. If your real flow rate drops noticeably as backpressure builds (common with some gravity-fed systems), treat the result as an estimate on the faster side.</li>
          <li><strong>Can I use this for draining a tank instead of filling it?</strong> The math is the same in reverse — enter the volume that needs to drain as your &quot;volume&quot; and your drain rate as the &quot;fill rate&quot; to get the time to empty.</li>
          <li><strong>Does the unit (gallons vs liters) matter for the calculation?</strong> No — as long as your volume and fill rate use the same unit, the calculated time in minutes is correct regardless of which unit you pick. The toggle is just there to label your inputs clearly.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/tank-filling-time-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={(_, val: Unit | null) => { if (val) setUnit(val); }}
          size="small"
        >
          <ToggleButton value="gallons">Gallons</ToggleButton>
          <ToggleButton value="liters">Liters</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label={`Tank Volume (${unitLabel})`} type="number" value={volume} onChange={(e) => setVolume(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label={`Fill Rate (${unitLabel} per minute)`} type="number" value={fillRate} onChange={(e) => setFillRate(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField label="Already Filled (%)" type="number" value={alreadyFilled} onChange={(e) => setAlreadyFilled(e.target.value)} onFocus={(e) => e.target.select()} fullWidth helperText="Leave at 0 if the tank is starting empty" />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Time to Fill</Typography>
            <Typography variant="h3" fontWeight="bold">
              {result.valid ? `${result.minutes.toFixed(1)} min` : '—'}
            </Typography>
          </Paper>
          {result.valid && (
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>In Hours</Typography>
              <Typography fontWeight={600}>{(result.minutes / 60).toFixed(2)} hrs</Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TankFillingTimeCalculator;
