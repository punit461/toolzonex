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

function parseShutterSpeed(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.includes('/')) {
    const [num, den] = trimmed.split('/').map((v) => parseFloat(v));
    if (!num || !den) return null;
    return num / den;
  }
  const val = parseFloat(trimmed);
  return Number.isNaN(val) ? null : val;
}

function formatShutterSpeed(seconds: number): string {
  if (seconds >= 1) return `${seconds.toFixed(seconds >= 10 ? 0 : 1)}s`;
  const denominator = Math.round(1 / seconds);
  return `1/${denominator}s`;
}

type SolveFor = 'aperture' | 'shutter' | 'iso';

const ExposureCalculatorContent = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('aperture');
  const [aperture, setAperture] = useState('8');
  const [shutter, setShutter] = useState('1/125');
  const [iso, setIso] = useState('100');
  const [targetEv, setTargetEv] = useState('12');

  const result = useMemo(() => {
    const N = parseFloat(aperture);
    const t = parseShutterSpeed(shutter);
    const S = parseFloat(iso);
    const ev = parseFloat(targetEv);
    if (Number.isNaN(ev)) return null;

    // EV at ISO 100 baseline: EV = log2(N^2 / t) - log2(S / 100)
    if (solveFor === 'aperture') {
      if (!t || t <= 0 || Number.isNaN(S) || S <= 0) return null;
      const nSquared = Math.pow(2, ev + Math.log2(S / 100)) * t;
      const n = Math.sqrt(nSquared);
      return { label: 'Aperture', value: `f/${n.toFixed(1)}` };
    }
    if (solveFor === 'shutter') {
      if (Number.isNaN(N) || N <= 0 || Number.isNaN(S) || S <= 0) return null;
      const t2 = (N * N) / Math.pow(2, ev + Math.log2(S / 100));
      return { label: 'Shutter Speed', value: formatShutterSpeed(t2) };
    }
    // solve for ISO
    if (Number.isNaN(N) || N <= 0 || !t || t <= 0) return null;
    const s2 = 100 * Math.pow(2, Math.log2((N * N) / t) - ev);
    return { label: 'ISO', value: Math.round(s2).toString() };
  }, [solveFor, aperture, shutter, iso, targetEv]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Solve For</InputLabel>
          <Select label="Solve For" value={solveFor} onChange={(e) => setSolveFor(e.target.value as SolveFor)}>
            <MenuItem value="aperture">Aperture (f-stop)</MenuItem>
            <MenuItem value="shutter">Shutter Speed</MenuItem>
            <MenuItem value="iso">ISO</MenuItem>
          </Select>
        </FormControl>

        {solveFor !== 'aperture' && (
          <TextField label="Aperture (f-stop)" value={aperture} onChange={(e) => setAperture(e.target.value)} onFocus={(e) => e.target.select()} fullWidth placeholder="e.g. 8" />
        )}
        {solveFor !== 'shutter' && (
          <TextField label="Shutter Speed (seconds, e.g. 1/125 or 2)" value={shutter} onChange={(e) => setShutter(e.target.value)} onFocus={(e) => e.target.select()} fullWidth placeholder="e.g. 1/125" />
        )}
        {solveFor !== 'iso' && (
          <TextField label="ISO" value={iso} onChange={(e) => setIso(e.target.value)} onFocus={(e) => e.target.select()} fullWidth placeholder="e.g. 100" />
        )}
        <TextField
          label="Target Exposure Value (EV)"
          type="number"
          value={targetEv}
          onChange={(e) => setTargetEv(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="EV 12-15 is typical for bright daylight; EV 5-8 for indoor/overcast"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>{result.label}</Typography>
              <Typography variant="h2" fontWeight={800} color="primary.main">{result.value}</Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter the other two exposure values and a target EV</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const ExposureCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Understanding the Exposure Triangle</Typography>
      <Typography variant="body1">
        Every photo&apos;s exposure (how bright or dark it looks) is controlled by three settings, known as the
        exposure triangle: <strong>aperture</strong> (the f-stop, controlling how much light the lens opening
        lets through), <strong>shutter speed</strong> (how long the sensor is exposed to light), and{' '}
        <strong>ISO</strong> (the sensor&apos;s sensitivity to light). Changing any one of them changes the
        exposure — but each also has a side effect: aperture affects depth of field (background blur),
        shutter speed affects motion blur, and ISO affects image noise/grain. Photographers balance all three
        to get the exposure they want with the trade-offs they can live with.
      </Typography>

      <Typography variant="h2">How This Calculator Works</Typography>
      <Typography variant="body1">
        Exposure Value (EV) is a single number that represents a specific combination of aperture and shutter
        speed at ISO 100 — the brighter the scene, the higher the EV needed to avoid overexposure. Enter any
        two of the three exposure triangle values plus your target EV, and this calculator solves for the
        third value using the standard photographic exposure formula.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        EV = log₂(N² ÷ t) − log₂(ISO ÷ 100)
      </Box>
      <Typography variant="body1">
        Where N is the f-number (aperture), and t is the shutter speed in seconds.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At f/8 and ISO 100 with a target EV of 12 (typical bright, hazy daylight), solving for shutter speed
        gives approximately 1/250s. If you instead wanted to solve for aperture at 1/250s and ISO 100 with the
        same EV of 12, you&apos;d get back f/8.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out an equivalent exposure when you want to change aperture for depth of field.</li>
          <li>Finding the right shutter speed to freeze or blur motion at a given aperture and ISO.</li>
          <li>Learning how the exposure triangle trades off in manual mode.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is Exposure Value (EV)?</Typography>
      <Typography variant="body1">
        EV is a number that combines aperture and shutter speed into a single value representing the total
        amount of light reaching the sensor at ISO 100. The same EV can be achieved with many different
        aperture/shutter combinations — a stop faster shutter with a stop wider aperture gives the same EV
        (this is called an &quot;equivalent exposure&quot;).
      </Typography>
      <Typography variant="h3">Do I need to know the exact EV for my scene?</Typography>
      <Typography variant="body1">
        Not exactly — most cameras display an exposure meter reading (often relative to 0, meaning
        &quot;correctly exposed&quot; for the camera&apos;s current settings) which you can use as a starting
        point, or use common EV reference guides for lighting conditions (e.g. EV 15 for bright sun, EV 5 for
        typical indoor lighting).
      </Typography>
      <Typography variant="h3">Why does my shutter speed input need a slash, like 1/125?</Typography>
      <Typography variant="body1">
        Shutter speeds are usually written as a fraction of a second. You can enter it as a fraction (like
        1/125) or as a decimal number of seconds (like 2 for a 2-second exposure) — both formats work.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/exposure-calculator" content={content}>
      <ExposureCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExposureCalculator;
