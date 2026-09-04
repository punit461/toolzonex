'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FEET_PER_METER = 3.28084;

const SoundDelayCalculatorContent = () => {
  const [distance, setDistance] = useState('60');
  const [temperatureF, setTemperatureF] = useState('70');
  const [offsetMs, setOffsetMs] = useState('10');

  const result = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const tempF = parseFloat(temperatureF);
    const offset = parseFloat(offsetMs) || 0;
    if (d <= 0 || Number.isNaN(tempF)) return null;

    const tempC = ((tempF - 32) * 5) / 9;
    const speedMps = 331.3 + 0.606 * tempC;
    const speedFps = speedMps * FEET_PER_METER;

    const travelDelayMs = (d / speedFps) * 1000;
    const totalDelayMs = travelDelayMs + offset;

    return { speedFps, travelDelayMs, totalDelayMs };
  }, [distance, temperatureF, offsetMs]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Distance From Main Speaker"
          type="number"
          fullWidth
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
        />
        <TextField
          label="Air Temperature"
          type="number"
          fullWidth
          value={temperatureF}
          onChange={(e) => setTemperatureF(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Speed of sound changes slightly with temperature"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">°F</InputAdornment> } }}
        />
        <TextField
          label="Additional Precedence Offset"
          type="number"
          fullWidth
          value={offsetMs}
          onChange={(e) => setOffsetMs(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Extra delay beyond travel time so listeners localize sound to the main source (10-20ms typical, per the Haas effect)"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">ms</InputAdornment> } }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Delay Speaker Time Delay</Typography>
              <Typography variant="h2" fontWeight={800} color="primary.main">{result.totalDelayMs.toFixed(2)} ms</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Pure travel time: {result.travelDelayMs.toFixed(2)} ms &nbsp;|&nbsp; Speed of sound: {result.speedFps.toFixed(0)} ft/s
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter a positive distance to calculate</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const SoundDelayCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Set Delay Speaker Timing</Typography>
      <Typography variant="body1">
        In a live sound system, delay speakers extend coverage to areas far from the main speakers. Because
        sound travels at a finite speed (about 1,125 ft/s or 343 m/s at room temperature), listeners near the
        delay speaker would otherwise hear it before the sound from the distant main speakers arrives, making
        the source sound like it&apos;s coming from the wrong place and causing comb-filtering/echo issues.
        The fix is to electronically delay the signal to the delay speaker so both sounds arrive together.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Delay (ms) = (Distance ÷ Speed of Sound) × 1000
      </Box>
      <Typography variant="body1">
        Speed of sound increases slightly with temperature, so this calculator adjusts it based on the air
        temperature you enter. Many live sound engineers also add a small extra offset (commonly 10-20ms)
        beyond the pure travel-time delay — this exploits the &quot;Haas effect&quot; (precedence effect), where
        the human ear localizes a sound to whichever source it hears first, as long as a second copy arrives
        within about 30ms. Adding a bit of extra delay helps the audience perceive all sound as coming from
        the main stage, even when standing near a delay speaker.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A delay speaker positioned 60 ft from the main speakers, at 70°F, needs a pure travel-time delay of
        about 53.6ms. Adding a typical 10ms precedence offset brings the total delay setting to roughly 63.6ms.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting delay times for delay/fill speakers at concerts, houses of worship, or large venues.</li>
          <li>Time-aligning subwoofers or under-balcony speakers with the main PA.</li>
          <li>Planning a distributed sound system across a large outdoor venue.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does temperature affect the delay time?</Typography>
      <Typography variant="body1">
        Sound travels faster through warmer air because warmer air molecules move faster and transmit
        pressure waves more quickly. The difference is small over typical room-temperature ranges, but can
        matter for precise time-alignment over longer distances or in outdoor venues with big temperature
        swings.
      </Typography>
      <Typography variant="h3">Do I always need to add the extra precedence offset?</Typography>
      <Typography variant="body1">
        No — some engineers set delay speakers to the exact calculated travel-time delay with no offset,
        especially for pure intelligibility/fill applications. The extra 10-20ms offset is a common practice
        for helping the audience perceive the sound as coming from the main stage rather than the nearby
        delay speaker; feel free to set it to 0 if you prefer an exact time-aligned setup.
      </Typography>
      <Typography variant="h3">Does humidity affect the speed of sound too?</Typography>
      <Typography variant="body1">
        Slightly, but the effect is much smaller than temperature for typical live-sound purposes, so this
        calculator only adjusts for temperature to keep things simple and practical.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/sound-delay-calculator" content={content}>
      <SoundDelayCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SoundDelayCalculator;
