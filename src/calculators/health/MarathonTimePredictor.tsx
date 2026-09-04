'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MARATHON_KM = 42.195;

const PRESET_DISTANCES: Record<string, number> = {
  '5k': 5,
  '10k': 10,
  half: 21.0975,
  custom: 0,
};

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
}

function formatPace(secondsPerKm: number): string {
  const m = Math.floor(secondsPerKm / 60);
  const s = Math.round(secondsPerKm % 60);
  return `${m}:${s.toString().padStart(2, '0')} /km`;
}

const MarathonTimePredictorContent = () => {
  const [preset, setPreset] = useState('10k');
  const [customDistance, setCustomDistance] = useState('15');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('50');
  const [seconds, setSeconds] = useState('0');

  const referenceDistance = preset === 'custom' ? parseFloat(customDistance) || 0 : PRESET_DISTANCES[preset];

  const result = useMemo(() => {
    const t1 = (parseFloat(hours) || 0) * 3600 + (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0);
    if (referenceDistance <= 0 || t1 <= 0) return null;
    const t2 = t1 * Math.pow(MARATHON_KM / referenceDistance, 1.06);
    const paceSecPerKm = t2 / MARATHON_KM;
    return { t2, paceSecPerKm };
  }, [referenceDistance, hours, minutes, seconds]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Reference Race Distance</InputLabel>
          <Select label="Reference Race Distance" value={preset} onChange={(e) => setPreset(e.target.value)}>
            <MenuItem value="5k">5K</MenuItem>
            <MenuItem value="10k">10K</MenuItem>
            <MenuItem value="half">Half Marathon (21.0975 km)</MenuItem>
            <MenuItem value="custom">Custom Distance</MenuItem>
          </Select>
        </FormControl>

        {preset === 'custom' && (
          <TextField
            label="Custom Distance (km)"
            type="number"
            fullWidth
            value={customDistance}
            onChange={(e) => setCustomDistance(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        )}

        <Typography variant="subtitle2">Finish Time for That Race</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField label="Hr" type="number" value={hours} onChange={(e) => setHours(e.target.value)} fullWidth />
          <TextField label="Min" type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} fullWidth />
          <TextField label="Sec" type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} fullWidth />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Predicted Marathon Time</Typography>
              <Typography variant="h2" fontWeight={800} color="primary.main">{formatDuration(result.t2)}</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Pace: {formatPace(result.paceSecPerKm)}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter a valid distance and finish time</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const MarathonTimePredictor = () => {
  const content = (
    <>
      <Typography variant="h2">How Marathon Time Prediction Works</Typography>
      <Typography variant="body1">
        This calculator uses Riegel&apos;s race-time-prediction formula, a widely used method for estimating
        performance at a different race distance based on a recent result. Enter the distance and finish time
        of a recent race (like a 10K or half marathon), and it predicts your equivalent marathon finish time.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        T2 = T1 × (D2 ÷ D1)^1.06
      </Box>
      <Typography variant="body1">
        Where T1 and D1 are the time and distance of your reference race, and T2 and D2 are the predicted time
        and marathon distance (42.195 km). The 1.06 exponent reflects the fact that pace naturally slows over
        longer distances due to fatigue and endurance limits, not just linear scaling.
      </Typography>
      <Typography variant="body1">
        The prediction is most accurate when your reference race distance is reasonably close to a marathon
        (like a half marathon) — predicting from a much shorter distance (like a 5K) is less reliable, since it
        doesn&apos;t capture how your specific endurance holds up over a much longer effort. This formula also
        doesn&apos;t account for race-day conditions (weather, course terrain, elevation), pacing strategy, or
        any training you do between now and race day — all of which can meaningfully change your actual result.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A runner who finishes a 10K in 50:00 would have a predicted marathon time of
        50:00 × (42.195 ÷ 10)^1.06 ≈ 3h 51m.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a realistic marathon goal pace based on recent training race results.</li>
          <li>Comparing predicted performance across different training cycles.</li>
          <li>Deciding on a marathon pace group or target finish time before race day.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is Riegel&apos;s formula?</Typography>
      <Typography variant="body1">
        It&apos;s a well-regarded estimate, especially when the reference distance is close to a marathon (like
        a half marathon), but it&apos;s still just a prediction. Actual performance depends on training
        specific to marathon distance, pacing discipline, nutrition, and race-day conditions.
      </Typography>
      <Typography variant="h3">Which reference race gives the best prediction?</Typography>
      <Typography variant="body1">
        A half marathon result is generally the most reliable predictor of marathon performance, since the
        distance and effort profile are closer to a marathon than a 5K or 10K.
      </Typography>
      <Typography variant="h3">Should I train differently for a marathon than for shorter races?</Typography>
      <Typography variant="body1">
        Yes — this calculator predicts a time based on your current fitness, but a marathon requires
        distance-specific endurance training (like long runs) that a 5K or 10K training plan may not include.
        Following a marathon-specific training plan will typically produce a better result than this
        prediction alone.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/marathon-time-predictor" content={content}>
      <MarathonTimePredictorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MarathonTimePredictor;
