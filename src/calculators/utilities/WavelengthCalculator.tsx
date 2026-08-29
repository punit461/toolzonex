'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type WaveType = 'em' | 'sound';
type Direction = 'freqToWave' | 'waveToFreq';

const SPEED_OF_LIGHT = 299792458;
const SPEED_OF_SOUND = 343;

const FREQ_UNITS: Record<string, number> = { hz: 1, khz: 1e3, mhz: 1e6, ghz: 1e9 };

const WavelengthCalculator = () => {
  const [waveType, setWaveType] = useState<WaveType>('em');
  const [direction, setDirection] = useState<Direction>('freqToWave');
  const [frequency, setFrequency] = useState<string>('100');
  const [freqUnit, setFreqUnit] = useState<string>('mhz');
  const [wavelength, setWavelength] = useState<string>('3');

  const speed = waveType === 'em' ? SPEED_OF_LIGHT : SPEED_OF_SOUND;

  const result = useMemo((): { kind: 'wave'; wavelengthM: number } | { kind: 'freq'; frequencyHz: number } | null => {
    if (direction === 'freqToWave') {
      const f = parseFloat(frequency);
      if (Number.isNaN(f) || f <= 0) return null;
      const hz = f * FREQ_UNITS[freqUnit];
      return { kind: 'wave', wavelengthM: speed / hz };
    }
    const w = parseFloat(wavelength);
    if (Number.isNaN(w) || w <= 0) return null;
    return { kind: 'freq', frequencyHz: speed / w };
  }, [direction, frequency, freqUnit, wavelength, speed]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Wavelength and Frequency</Typography>
      <Typography variant="body1">
        Wavelength and frequency are related through the wave speed equation: Wavelength = Speed ÷ Frequency
        (and equivalently, Frequency = Speed ÷ Wavelength). The speed used depends on the type of wave — light
        and other electromagnetic waves travel at the speed of light (about 299,792,458 m/s in a vacuum), while
        sound waves travel much slower, at roughly 343 m/s through air at room temperature.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Wavelength (m) = Wave Speed ÷ Frequency (Hz)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An FM radio station broadcasting at 100 MHz (an electromagnetic wave) has a wavelength of
        299,792,458 ÷ 100,000,000 = 2.998 meters. A sound wave at 440 Hz (concert pitch A) has a much shorter
        wavelength of 343 ÷ 440 ≈ 0.78 meters, since sound travels far slower than light.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating antenna length requirements from a radio frequency.</li>
          <li>Finding the wavelength of visible light, Wi-Fi signals, or other electromagnetic waves.</li>
          <li>Estimating the wavelength of audible sound frequencies for acoustics or speaker design.</li>
          <li>Physics coursework relating frequency, wavelength, and wave speed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does sound speed matter for the calculation?</Typography>
      <Typography variant="body1">
        Sound travels at a speed that depends on the medium (air, water, or solids) and temperature, unlike
        light in a vacuum, which is a universal constant. This calculator uses 343 m/s, the commonly cited speed
        of sound in dry air at about 20°C — actual results will vary somewhat with temperature and altitude.
      </Typography>
      <Typography variant="h3">Does the speed of light change in different materials?</Typography>
      <Typography variant="body1">
        Yes — light travels slightly slower through materials like glass or water than through a vacuum. This
        calculator uses the vacuum speed of light, which is the standard reference value for most
        electromagnetic wavelength calculations, including radio and Wi-Fi frequencies traveling through air.
      </Typography>
      <Typography variant="h3">Can I convert wavelength back to frequency?</Typography>
      <Typography variant="body1">
        Yes — switch the direction toggle to &quot;Wavelength to Frequency&quot; and enter a wavelength in
        meters to get the corresponding frequency in Hz, using the same Speed ÷ Wavelength relationship.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/wavelength-calculator" content={content}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <ToggleButtonGroup value={waveType} exclusive onChange={(_, v) => v && setWaveType(v)} size="small">
          <ToggleButton value="em">Electromagnetic (light)</ToggleButton>
          <ToggleButton value="sound">Sound</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup value={direction} exclusive onChange={(_, v) => v && setDirection(v)} size="small">
          <ToggleButton value="freqToWave">Frequency → Wavelength</ToggleButton>
          <ToggleButton value="waveToFreq">Wavelength → Frequency</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          {direction === 'freqToWave' ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField label="Frequency" type="number" value={frequency} onChange={(e) => setFrequency(e.target.value)} onFocus={(e) => e.target.select()} />
              <FormControl>
                <InputLabel>Unit</InputLabel>
                <Select value={freqUnit} label="Unit" onChange={(e) => setFreqUnit(e.target.value)}>
                  <MenuItem value="hz">Hz</MenuItem>
                  <MenuItem value="khz">kHz</MenuItem>
                  <MenuItem value="mhz">MHz</MenuItem>
                  <MenuItem value="ghz">GHz</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <TextField label="Wavelength (m)" type="number" fullWidth value={wavelength} onChange={(e) => setWavelength(e.target.value)} onFocus={(e) => e.target.select()} />
          )}
          <Typography variant="body2" color="text.secondary" mt={2}>
            Wave speed used: {speed.toLocaleString()} m/s ({waveType === 'em' ? 'speed of light' : 'speed of sound in air'})
          </Typography>
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {result ? (
            result.kind === 'wave' ? (
              <>
                <Typography variant="body2" color="text.secondary">Wavelength</Typography>
                <Typography variant="h4" fontWeight={800} color="primary.main">{result.wavelengthM.toLocaleString(undefined, { maximumFractionDigits: 6 })} m</Typography>
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">Frequency</Typography>
                <Typography variant="h4" fontWeight={800} color="primary.main">{result.frequencyHz.toLocaleString(undefined, { maximumFractionDigits: 4 })} Hz</Typography>
              </>
            )
          ) : (
            <Typography variant="body1" color="text.secondary">Enter a positive value to calculate</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WavelengthCalculator;
