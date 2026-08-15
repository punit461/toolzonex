'use client';

import { Box, Typography, Button } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';

// Deterministic crack pattern radiating from two impact points -- no
// Math.random() here since this is a client component and randomizing per
// render would cause a hydration mismatch between server and client output.
function CrackSvg() {
  // All coordinates are plain numbers in the 0-100 viewBox space (not CSS
  // pixels/percent) so they render correctly without relying on calc().
  const impacts = [
    { cx: 32, cy: 45, r: 3 },
    { cx: 68, cy: 65, r: 2 },
  ];
  const spokesFor = (angleOffset: number, count: number, length: number) =>
    Array.from({ length: count }, (_, i) => {
      const angle = (360 / count) * i + angleOffset;
      const rad = (angle * Math.PI) / 180;
      const jitter = (i % 3) * 3 - 3;
      const len = length + jitter;
      return { dx: Math.cos(rad) * len, dy: Math.sin(rad) * len };
    });

  return (
    <Box component="svg" viewBox="0 0 100 100" preserveAspectRatio="none" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {impacts.map((impact, idx) => (
        <g key={idx} opacity={0.55}>
          {spokesFor(idx * 17, 14, idx === 0 ? 22 : 15).map((s, i) => (
            <line
              key={i}
              x1={impact.cx}
              y1={impact.cy}
              x2={impact.cx + s.dx}
              y2={impact.cy + s.dy}
              stroke="white"
              strokeWidth={0.3}
            />
          ))}
          <circle cx={impact.cx} cy={impact.cy} r={impact.r} fill="none" stroke="white" strokeWidth={0.4} opacity={0.7} />
        </g>
      ))}
    </Box>
  );
}

const BrokenScreenContent = () => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Button variant="contained" size="large" startIcon={<FullscreenIcon />} onClick={toggle}>
          Click to Fullscreen
        </Button>
        <Typography variant="caption" color="text.secondary">
          Press F or Space for fullscreen &bull; Esc to exit
        </Typography>
      </Box>

      <Box
        ref={targetRef}
        sx={{
          bgcolor: '#0a0a0a',
          height: isFullscreen ? '100%' : 400,
          borderRadius: isFullscreen ? 0 : 2,
          position: 'relative',
          overflow: 'hidden',
          ...(isFullscreen && { position: 'fixed', inset: 0, zIndex: 1300 }),
        }}
      >
        <CrackSvg />
      </Box>
    </Box>
  );
};

const BrokenScreen = () => {
  const content = (
    <>
      <Typography variant="h2">Broken Screen Prank</Typography>
      <Typography variant="body1">
        A fake cracked-screen overlay for pranking friends and coworkers. Go fullscreen on their device and
        watch the reaction — it&apos;s just a picture, no actual damage.
      </Typography>

      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Open this page on the target device.</li>
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) right before handing it over.</li>
          <li>Press <strong>Esc</strong> to instantly reveal the prank and return to normal.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Open this page on a friend&apos;s laptop, go fullscreen while they&apos;re not looking, then hand it
        back — the "cracked" overlay covers the whole screen until they press Esc.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Harmless pranks on friends, family, or coworkers.</li>
          <li>April Fools&apos; Day setups.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this actually damage the screen?</strong> No — it&apos;s purely a visual overlay on a webpage. Nothing about the device is affected.</li>
          <li><strong>How do I undo it?</strong> Press Esc or close the browser tab.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title="Broken Screen"
      description="A fake cracked screen prank overlay. Go fullscreen to prank friends and coworkers -- no real damage."
      url="/utilities/broken-screen"
      content={content}
      category="Utilities"
    >
      <BrokenScreenContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BrokenScreen;
