'use client';

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SpinTheBottleGeneratorContent = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [resultAngle, setResultAngle] = useState<number | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResultAngle(null);

    const extraSpins = 1440 + Math.floor(Math.random() * 360);
    const newRotation = rotation + extraSpins;
    setRotation(newRotation);

    setTimeout(() => {
      setResultAngle(Math.round(newRotation % 360));
      setSpinning(false);
    }, 3000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box sx={{ position: 'relative', width: 220, height: 220 }}>
        <Box sx={{
          width: '100%', height: '100%', borderRadius: '50%',
          border: '3px dashed', borderColor: 'divider',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Box
            sx={{
              width: 8,
              height: 90,
              bgcolor: 'primary.main',
              borderRadius: 4,
              transformOrigin: 'center 100%',
              position: 'relative',
              top: 20,
              transition: 'transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)',
              transform: `rotate(${rotation}deg)`,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: -14,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: '18px solid',
                borderBottomColor: 'primary.main',
              },
            }}
          />
        </Box>
      </Box>

      <Button variant="contained" size="large" onClick={spin} disabled={spinning} sx={{ px: 5, borderRadius: 8 }}>
        {spinning ? 'Spinning...' : 'Spin the Bottle'}
      </Button>

      <Box sx={{ minHeight: 32, textAlign: 'center' }}>
        {resultAngle !== null && !spinning && (
          <Typography variant="h6" color="success.main" fontWeight={700}>
            Landed at {resultAngle}°
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const SpinTheBottleGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Spin the Bottle Generator Works</Typography>
      <Typography variant="body1">
        Click &quot;Spin the Bottle&quot; and a virtual bottle spins several full rotations before slowing to
        a stop, landing on a random direction shown in degrees. It works as a simple digital stand-in for a
        physical bottle spin — handy as a party-game randomizer when there is no bottle around, or when you
        want a random direction picked without any names or options typed in.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Arrange players or options in a circle, mentally or physically, around a clock-style layout.</li>
          <li>Click &quot;Spin the Bottle&quot; and watch it spin.</li>
          <li>The bottle lands on a random angle (0–359°) — use that to point to whichever person or option sits at that position.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If four players sit at 0°, 90°, 180°, and 270° around the circle, and the bottle lands at
        &quot;182°,&quot; the player closest to that angle (180°) is the one it points to.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Playing a classic party game that needs a random direction picked from a group sitting in a circle.</li>
          <li>Deciding who goes first, next, or is &quot;it&quot; in a group game.</li>
          <li>Adding a random-direction element to a game night without needing an actual bottle.</li>
          <li>Using the spin as a simple random-angle generator for other creative games.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Wheel Spinner?</Typography>
      <Typography variant="body1">
        The Wheel Spinner and Name Picker Wheel pick a winner from a typed list of named entries. This tool
        needs no list at all — it simulates a plain spinning bottle landing on a random angle, for games where
        players themselves (not typed names) sit around the circle.
      </Typography>
      <Typography variant="h3">Is the spin genuinely random?</Typography>
      <Typography variant="body1">
        Yes — the final resting angle is chosen at random each time, giving every direction an equal chance.
      </Typography>
      <Typography variant="h3">Can I spin again?</Typography>
      <Typography variant="body1">
        Yes — click &quot;Spin the Bottle&quot; as many times as you like for a fresh, independent random spin
        each time.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/spin-the-bottle-generator" content={content}>
      <SpinTheBottleGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SpinTheBottleGenerator;
