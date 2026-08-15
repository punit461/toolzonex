'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';

interface Props {
  os: 10 | 11;
  variant: 'bsod' | 'update';
  title: string;
  description: string;
  url: string;
}

const WindowsScreenDisplay = ({ os, variant }: { os: 10 | 11; variant: 'bsod' | 'update' }) => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (variant !== 'update') return;
    const id = setInterval(() => {
      setPercent((p) => (p >= 100 ? 0 : p + 1));
    }, 120);
    return () => clearInterval(id);
  }, [variant]);

  const isBlackBsod = os === 11 && variant === 'bsod';
  const bg = isBlackBsod ? '#000000' : '#0078d7';
  const fontFamily = "'Segoe UI', Arial, sans-serif";

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
          bgcolor: bg,
          color: '#fff',
          fontFamily,
          height: isFullscreen ? '100%' : 420,
          borderRadius: isFullscreen ? 0 : 2,
          p: { xs: 4, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          ...(isFullscreen && { position: 'fixed', inset: 0, zIndex: 1300 }),
        }}
      >
        {variant === 'bsod' ? (
          <Box sx={{ maxWidth: 640 }}>
            <Typography sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 300, lineHeight: 1, mb: 3 }}>:(</Typography>
            <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, mb: 3, fontWeight: 400 }}>
              Your PC ran into a problem and needs to restart. We&apos;re just collecting some error info, and then we&apos;ll restart for you.
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', mb: 4 }}>0% complete</Typography>
            <Typography sx={{ fontSize: '0.8rem', opacity: 0.85 }}>
              For more information about this issue and possible fixes, visit https://www.windows.com/stopcode
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', opacity: 0.85, mt: 1 }}>
              If you call a support person, give them this info:<br />
              Stop code: CRITICAL_PROCESS_DIED
            </Typography>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 640, textAlign: 'center', mx: 'auto' }}>
            <Box
              sx={{
                width: 60, height: 60, borderRadius: '50%', mx: 'auto', mb: 4,
                border: '4px solid rgba(255,255,255,0.3)', borderTopColor: '#fff',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
              }}
            />
            <Typography sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 400, mb: 1 }}>
              Working on updates {percent}%
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', opacity: 0.9 }}>
              Don&apos;t turn off your computer
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const WindowsScreen = ({ os, variant, title, description, url }: Props) => {
  const content = (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body1">
        A fake Windows {os} {variant === 'bsod' ? 'error (blue/black screen)' : 'update'} screen, for pranking
        friends and coworkers or as a harmless joke background. Go fullscreen for the full effect. Nothing on
        your computer is actually affected.
      </Typography>

      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) right before handing over the device, or while the target isn&apos;t looking.</li>
          <li>Press <strong>Esc</strong> at any time to exit back to the normal page.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Open this page on a coworker&apos;s screen while they step away, go fullscreen, and watch their
        reaction when they get back — press Esc together to reveal the prank.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Harmless office or classroom pranks.</li>
          <li>April Fools&apos; Day setups.</li>
          <li>Testing how someone reacts to a "computer crash" for a video or livestream bit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this actually affect the computer?</strong> No — it&apos;s just a fullscreen webpage that looks like a Windows error or update screen. Closing the tab or pressing Esc returns everything to normal instantly.</li>
          <li><strong>Will this trigger a real restart or update?</strong> No, nothing on the device is touched.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell title={title} description={description} url={url} content={content} category="Utilities">
      <WindowsScreenDisplay os={os} variant={variant} />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WindowsScreen;
