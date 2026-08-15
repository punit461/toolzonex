'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';

const COLORS = ['#e11d48', '#1a56db', '#00b140', '#eab308', '#7c3aed', '#f97316', '#ec4899', '#06b6d4'];

const DvdScreensaverContent = () => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();
  const logoRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('DVD');
  const pos = useRef({ x: 40, y: 40, dx: 2.2, dy: 1.7 });
  const colorIndex = useRef(0);
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    let frame: number;

    const tick = () => {
      const container = targetRef.current;
      const logo = logoRef.current;
      if (container && logo) {
        const cw = container.clientWidth;
        const ch = container.clientHeight;
        const lw = logo.offsetWidth;
        const lh = logo.offsetHeight;

        let { x, y, dx, dy } = pos.current;
        x += dx;
        y += dy;

        let bounced = false;
        if (x <= 0 || x + lw >= cw) { dx = -dx; x = Math.max(0, Math.min(x, cw - lw)); bounced = true; }
        if (y <= 0 || y + lh >= ch) { dy = -dy; y = Math.max(0, Math.min(y, ch - lh)); bounced = true; }

        if (bounced) {
          colorIndex.current = (colorIndex.current + 1) % COLORS.length;
          setColor(COLORS[colorIndex.current]);
        }

        pos.current = { x, y, dx, dy };
        logo.style.transform = `translate(${x}px, ${y}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [targetRef]);

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <TextField
          label="Logo Text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 12))}
          size="small"
          sx={{ maxWidth: 200 }}
        />
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
          bgcolor: '#000',
          height: isFullscreen ? '100%' : 400,
          borderRadius: isFullscreen ? 0 : 2,
          position: 'relative',
          overflow: 'hidden',
          ...(isFullscreen && { position: 'fixed', inset: 0, zIndex: 1300 }),
        }}
      >
        <Box
          ref={logoRef}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontWeight: 900,
            fontSize: { xs: '1.5rem', md: '2.5rem' },
            color,
            fontStyle: 'italic',
            userSelect: 'none',
            willChange: 'transform',
          }}
        >
          {text || 'DVD'}
        </Box>
      </Box>
    </Box>
  );
};

const DvdScreensaver = () => {
  const content = (
    <>
      <Typography variant="h2">The Classic DVD Screensaver</Typography>
      <Typography variant="body1">
        A recreation of the iconic bouncing DVD logo screensaver. The logo bounces around your screen and
        changes color every time it hits an edge — customize the text and go fullscreen for the full effect.
      </Typography>

      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Type custom text into the &quot;Logo Text&quot; field (up to 12 characters), or leave it as &quot;DVD&quot;.</li>
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) for the full effect.</li>
          <li>Watch it bounce — and see if it ever perfectly hits a corner.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Type your company name or a friend&apos;s name into the Logo Text field, go fullscreen, and leave it
        running as a fun background during a meeting or party.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Nostalgic background for a stream, party, or office screen.</li>
          <li>A lighthearted "waiting" screen between meetings or presentations.</li>
          <li>The classic office bet: will it ever hit the corner exactly?</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I change the logo text?</strong> Yes, type anything up to 12 characters before going fullscreen.</li>
          <li><strong>Does the color change randomly?</strong> The logo cycles through a fixed sequence of colors, one step forward each time it bounces off an edge.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title="DVD Screensaver"
      description="The classic bouncing DVD logo screensaver, recreated online. Customize the text and go fullscreen."
      url="/utilities/dvd-screensaver"
      content={content}
      category="Utilities"
    >
      <DvdScreensaverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DvdScreensaver;
