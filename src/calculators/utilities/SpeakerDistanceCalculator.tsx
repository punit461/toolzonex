'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TOE_IN_DEGREES = 30;

const SpeakerDistanceCalculator = () => {
  const [listeningDistance, setListeningDistance] = useState('8');

  const result = useMemo(() => {
    const d = parseFloat(listeningDistance) || 0;
    return { spacing: d, toeIn: TOE_IN_DEGREES };
  }, [listeningDistance]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Speaker Distance Calculator</Typography>
      <Typography variant="body1">
        Enter how far you sit from your stereo speakers to get a recommended speaker placement using the
        equilateral triangle rule — a widely used starting point for stereo imaging. In this setup, the
        distance between the two speakers is made equal to the distance from each speaker to the listening
        position, forming a triangle with three equal sides so both speakers arrive at the listening spot with
        balanced timing and volume.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Distance Between Speakers = Listening Distance (equilateral triangle)
        <br />
        Recommended Toe-In Angle ≈ 30° inward
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If you sit 8 feet from where your speakers will be, place the speakers 8 feet apart from each other as
        well, forming an equilateral triangle with your listening position. Angle each speaker inward by
        roughly 30° so they both point toward the listening spot.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting up a new pair of stereo speakers in a living room or home studio.</li>
          <li>Repositioning speakers after rearranging furniture or moving to a new room.</li>
          <li>Getting a solid starting point before fine-tuning placement by ear.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is the equilateral triangle rule a strict requirement?</strong> No — it&apos;s a well-established starting guideline, not a strict rule. Room acoustics, furniture, wall reflections, and speaker design all affect the ideal placement, so treat this as a solid baseline to fine-tune from by ear.</li>
          <li><strong>Why angle the speakers inward at all?</strong> Toe-in aims each speaker&apos;s most direct, focused sound at the listening position rather than letting it fire straight ahead past the listener, which typically sharpens stereo imaging and center-channel focus for near-field and mid-field listening distances.</li>
          <li><strong>Does this work for all room sizes?</strong> The equilateral triangle scales with any listening distance, but very small rooms may need to compromise on exact spacing due to walls and furniture, and very large rooms may benefit from slightly wider spacing than a strict equilateral triangle to fill the space.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/speaker-distance-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Desired Listening Distance" type="number" value={listeningDistance}
            onChange={(e) => setListeningDistance(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Distance Between Speakers</Typography>
            <Typography variant="h4" fontWeight="bold">{result.spacing.toFixed(1)} ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Recommended Toe-In Angle</Typography>
            <Typography fontWeight={600}>~{result.toeIn}°</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SpeakerDistanceCalculator;
