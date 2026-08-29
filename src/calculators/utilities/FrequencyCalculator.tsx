'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack, Divider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type WaveSolve = 'frequency' | 'wavelength' | 'speed';

const FrequencyCalculator = () => {
  const [period, setPeriod] = useState<string>('0.02');
  const [lastEdited, setLastEdited] = useState<'period' | 'frequency'>('period');
  const [frequency, setFrequency] = useState<string>('50');

  const handlePeriodChange = (val: string) => {
    setPeriod(val);
    setLastEdited('period');
    const p = parseFloat(val);
    if (!isNaN(p) && p > 0) setFrequency((1 / p).toString());
  };

  const handleFrequencyChange = (val: string) => {
    setFrequency(val);
    setLastEdited('frequency');
    const f = parseFloat(val);
    if (!isNaN(f) && f > 0) setPeriod((1 / f).toString());
  };

  const [waveSolve, setWaveSolve] = useState<WaveSolve>('speed');
  const [waveFreq, setWaveFreq] = useState<string>('50');
  const [wavelength, setWavelength] = useState<string>('6.86');
  const [speed, setSpeed] = useState<string>('343');

  const wf = parseFloat(waveFreq);
  const wl = parseFloat(wavelength);
  const sp = parseFloat(speed);

  let waveResult: number | null = null;
  let waveFormula = '';
  if (waveSolve === 'speed' && !isNaN(wf) && !isNaN(wl)) {
    waveResult = wf * wl;
    waveFormula = `v = f × λ = ${wf} × ${wl} = ${waveResult.toFixed(4)}`;
  } else if (waveSolve === 'frequency' && !isNaN(sp) && !isNaN(wl) && wl !== 0) {
    waveResult = sp / wl;
    waveFormula = `f = v / λ = ${sp} / ${wl} = ${waveResult.toFixed(4)}`;
  } else if (waveSolve === 'wavelength' && !isNaN(sp) && !isNaN(wf) && wf !== 0) {
    waveResult = sp / wf;
    waveFormula = `λ = v / f = ${sp} / ${wf} = ${waveResult.toFixed(4)}`;
  }

  const content = (
    <>
      <Typography variant="h2">How to Calculate Frequency from Period</Typography>
      <Typography variant="body1">
        Frequency is the number of complete cycles that occur per second, and period is the time it takes to
        complete a single cycle. The two are reciprocals of each other — enter either value below and the other
        updates instantly. A secondary Wave Speed mode also lets you relate frequency, wavelength, and wave
        speed for any wave (sound, electromagnetic, or otherwise), solving for whichever one you&apos;re missing.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        f = 1 / T &nbsp;&nbsp;|&nbsp;&nbsp; T = 1 / f &nbsp;&nbsp;|&nbsp;&nbsp; v = f × λ
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A signal that completes one cycle every 0.02 seconds has a frequency of f = 1 / 0.02 = 50 Hz — the
        standard AC mains frequency in much of the world. For a wave traveling at 343 m/s (the speed of sound in
        air) with a frequency of 50 Hz, the wavelength is λ = 343 / 50 = 6.86 meters.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting between a signal&apos;s period and its frequency in electronics or physics.</li>
          <li>Working out AC mains frequency, clock speeds, or oscillation rates.</li>
          <li>Relating frequency, wavelength, and propagation speed for any generic wave.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between period and frequency?</Typography>
      <Typography variant="body1">
        Period is the time taken for one complete cycle, measured in seconds. Frequency is how many cycles
        happen per second, measured in Hertz (Hz). They are exact reciprocals: f = 1/T and T = 1/f.
      </Typography>
      <Typography variant="h3">How is this different from a wavelength calculator?</Typography>
      <Typography variant="body1">
        A dedicated wavelength calculator usually fixes the wave speed to a known constant, like the speed of
        light or the speed of sound. The Wave Speed mode here is fully generic — enter any propagation speed —
        so it works for water waves, seismic waves, or any custom scenario, not just light or sound.
      </Typography>
      <Typography variant="h3">Can frequency or period be negative or zero?</Typography>
      <Typography variant="body1">
        No — both must be positive numbers greater than zero, since a cycle can&apos;t take zero or negative
        time, and a frequency of zero would mean no oscillation at all.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/frequency-calculator" content={content}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>Period ↔ Frequency</Typography>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <TextField
                label="Period (seconds)"
                type="number"
                fullWidth
                value={period}
                onChange={(e) => handlePeriodChange(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <TextField
                label="Frequency (Hz)"
                type="number"
                fullWidth
                value={frequency}
                onChange={(e) => handleFrequencyChange(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {lastEdited === 'period' ? 'Frequency calculated from period.' : 'Period calculated from frequency.'}
            </Typography>
          </Paper>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>Wave Speed (f × λ = v)</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ToggleButtonGroup value={waveSolve} exclusive onChange={(_, v) => v && setWaveSolve(v)} size="small">
              <ToggleButton value="speed">Solve for Speed</ToggleButton>
              <ToggleButton value="frequency">Solve for Frequency</ToggleButton>
              <ToggleButton value="wavelength">Solve for Wavelength</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2}>
              {waveSolve !== 'frequency' && (
                <TextField label="Frequency (Hz)" type="number" fullWidth value={waveFreq} onChange={(e) => setWaveFreq(e.target.value)} onFocus={(e) => e.target.select()} />
              )}
              {waveSolve !== 'wavelength' && (
                <TextField label="Wavelength (meters)" type="number" fullWidth value={wavelength} onChange={(e) => setWavelength(e.target.value)} onFocus={(e) => e.target.select()} />
              )}
              {waveSolve !== 'speed' && (
                <TextField label="Wave Speed (m/s)" type="number" fullWidth value={speed} onChange={(e) => setSpeed(e.target.value)} onFocus={(e) => e.target.select()} />
              )}
            </Stack>
            {waveResult !== null && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                <Typography variant="h5" color="primary" fontWeight={700}>{waveResult.toFixed(4)}</Typography>
                <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>{waveFormula}</Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FrequencyCalculator;
