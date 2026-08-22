'use client';

import { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';

const TEST_COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#ff0000' },
  { name: 'Green', value: '#00ff00' },
  { name: 'Blue', value: '#0000ff' },
];

const DeadPixelTestContent = () => {
  const [index, setIndex] = useState(0);
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();
  const current = TEST_COLORS[index];

  const next = () => setIndex((i) => (i + 1) % TEST_COLORS.length);
  const prev = () => setIndex((i) => (i - 1 + TEST_COLORS.length) % TEST_COLORS.length);

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Button variant="contained" size="large" startIcon={<FullscreenIcon />} onClick={toggle}>
          Click to Fullscreen
        </Button>
        <Typography variant="caption" color="text.secondary">
          Press F or Space for fullscreen &bull; Esc to exit &bull; Click the screen (or use arrow keys) to cycle colors
        </Typography>
      </Box>

      <Box
        ref={targetRef}
        onClick={next}
        sx={{
          bgcolor: current.value,
          height: isFullscreen ? '100%' : 320,
          borderRadius: isFullscreen ? 0 : 2,
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(isFullscreen && { position: 'fixed', inset: 0, zIndex: 1300 }),
        }}
      >
        <Box sx={{ position: 'absolute', top: 16, left: 0, right: 0, textAlign: 'center' }}>
          <Typography sx={{ color: current.value === '#ffffff' || current.value === '#00ff00' ? '#000' : '#fff', opacity: 0.6, fontSize: '0.85rem' }}>
            {current.name} ({index + 1} / {TEST_COLORS.length})
          </Typography>
        </Box>
        <IconButton
          onClick={(e) => { e.stopPropagation(); prev(); }}
          sx={{ position: 'absolute', left: 16, color: current.value === '#ffffff' || current.value === '#00ff00' ? '#000' : '#fff' }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={(e) => { e.stopPropagation(); next(); }}
          sx={{ position: 'absolute', right: 16, color: current.value === '#ffffff' || current.value === '#00ff00' ? '#000' : '#fff' }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const DeadPixelTest = () => {
  const content = (
    <>
      <Typography variant="h2">What is a Dead Pixel Test?</Typography>
      <Typography variant="body1">
        A dead (or stuck) pixel is a spot on your screen that doesn&apos;t change color with the rest of the
        display. Cycling through solid white, black, red, green, and blue screens makes stuck or dead pixels
        much easier to spot, since a pixel that stays the wrong color will stand out clearly against each
        solid background.
      </Typography>
      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click <strong>Click to Fullscreen</strong> to fill your entire screen.</li>
          <li>Click anywhere on the screen (or use the arrow buttons) to cycle through each test color.</li>
          <li>Look closely for any pixel that doesn&apos;t match the current color — that&apos;s a dead or stuck pixel.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        On the solid green screen, a single pixel that stays gray or black stands out immediately — that&apos;s
        a dead pixel. On the white screen, a pixel that stays red, green, or blue is a stuck pixel.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a new or used monitor, laptop, or phone screen before buying or within a return window.</li>
          <li>Diagnosing a suspected stuck pixel before contacting a manufacturer for warranty replacement.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What&apos;s the difference between a dead pixel and a stuck pixel?</strong> A dead pixel stays black and never lights up; a stuck pixel is stuck showing one color (often red, green, or blue) regardless of what&apos;s displayed.</li>
          <li><strong>Can this tool fix a stuck pixel?</strong> No, but some stuck pixels can be resolved by gently massaging the area or using dedicated pixel-fixing software that rapidly flashes colors — this tool only helps you find them.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/utilities/dead-pixel-test"
      content={content}
    >
      <DeadPixelTestContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DeadPixelTest;
