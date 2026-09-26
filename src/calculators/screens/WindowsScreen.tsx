'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { QRCodeSVG } from 'qrcode.react';
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

// #0078d4 rather than #0078d7: indistinguishable, but white text on it clears
// WCAG AA (4.53:1) where #0078d7 sits exactly on the 4.5 line.
const WINDOWS_BLUE = '#0078d4';

// Real Windows stop codes, most familiar first.
const STOP_CODES = [
  'CRITICAL_PROCESS_DIED',
  'MEMORY_MANAGEMENT',
  'IRQL_NOT_LESS_OR_EQUAL',
  'SYSTEM_SERVICE_EXCEPTION',
  'KERNEL_SECURITY_CHECK_FAILURE',
  'PAGE_FAULT_IN_NONPAGED_AREA',
  'DPC_WATCHDOG_VIOLATION',
  'VIDEO_TDR_FAILURE',
];

/**
 * Counts up the way the real screens do: an update creeps a percent every few
 * seconds with stalls and never reaches 100% (so the prank can run as long as
 * needed), while a crash dump runs to 100% in about a minute. Remounted via
 * `key` whenever the prank restarts, so the count begins again from `start`.
 */
const Percent = ({ start, mode }: { start: number; mode: 'update' | 'bsod' }) => {
  const [percent, setPercent] = useState(start);
  useEffect(() => {
    const id = setInterval(() => {
      setPercent((p) => {
        if (mode === 'update') return p < 99 && Math.random() < 0.35 ? p + 1 : p;
        return p < 100 && Math.random() < 0.5 ? p + 1 : p;
      });
    }, mode === 'update' ? 3000 : 300);
    return () => clearInterval(id);
  }, [mode]);
  return <>{percent}</>;
};

/** The five-dot orbit Windows 10 and 11 show while updating (not a generic ring spinner). */
const WindowsDots = () => (
  <Box
    aria-hidden
    sx={{
      position: 'relative', width: 56, height: 56, mx: 'auto', mb: 4,
      '& span': {
        position: 'absolute', inset: 0,
        animation: 'winOrbit 5.5s infinite',
        '&::after': {
          content: '""', position: 'absolute', left: '50%', top: 0,
          width: 6, height: 6, ml: '-3px', borderRadius: '50%', bgcolor: '#fff',
        },
      },
      '& span:nth-of-type(2)': { animationDelay: '0.24s' },
      '& span:nth-of-type(3)': { animationDelay: '0.48s' },
      '& span:nth-of-type(4)': { animationDelay: '0.72s' },
      '& span:nth-of-type(5)': { animationDelay: '0.96s' },
      '@keyframes winOrbit': {
        '0%': { transform: 'rotate(225deg)', opacity: 1, animationTimingFunction: 'ease-out' },
        '7%': { transform: 'rotate(345deg)', animationTimingFunction: 'linear' },
        '30%': { transform: 'rotate(455deg)', animationTimingFunction: 'ease-in-out' },
        '39%': { transform: 'rotate(690deg)', animationTimingFunction: 'linear' },
        '70%': { transform: 'rotate(815deg)', opacity: 1, animationTimingFunction: 'ease-out' },
        '75%': { transform: 'rotate(945deg)', animationTimingFunction: 'ease-out' },
        '76%': { transform: 'rotate(945deg)', opacity: 0 },
        '100%': { transform: 'rotate(945deg)', opacity: 0 },
      },
    }}
  >
    {[0, 1, 2, 3, 4].map((i) => <span key={i} />)}
  </Box>
);

const WindowsScreenDisplay = ({ os, variant }: { os: 10 | 11; variant: 'bsod' | 'update' }) => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();
  const [start, setStart] = useState(0);
  const [stopCode, setStopCode] = useState(STOP_CODES[0]);
  // Windows 11 switched to a black crash screen in the 2025 (24H2) redesign.
  const [crashStyle, setCrashStyle] = useState<'blue' | 'black'>('blue');

  const isBlackCrash = variant === 'bsod' && os === 11 && crashStyle === 'black';
  const runKey = `${isFullscreen}-${start}-${stopCode}-${crashStyle}`;

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Button variant="contained" size="large" startIcon={<FullscreenIcon />} onClick={toggle}>
          Click to Fullscreen
        </Button>
        <Typography variant="caption" color="text.secondary">
          Press F or Space for fullscreen &bull; Esc to exit (swipe back on a phone)
        </Typography>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {variant === 'update' ? (
          <TextField
            label="Start at (%)"
            type="number"
            size="small"
            value={start}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setStart(Math.min(99, Math.max(0, Math.round(Number(e.target.value) || 0))))}
            sx={{ width: 140 }}
          />
        ) : (
          <>
            <TextField select label="Stop code" size="small" value={stopCode} onChange={(e) => setStopCode(e.target.value)} sx={{ minWidth: 280 }}>
              {STOP_CODES.map((code) => <MenuItem key={code} value={code}>{code}</MenuItem>)}
            </TextField>
            {os === 11 && (
              <TextField select label="Style" size="small" value={crashStyle} onChange={(e) => setCrashStyle(e.target.value as 'blue' | 'black')} sx={{ minWidth: 220 }}>
                <MenuItem value="blue">Classic blue screen</MenuItem>
                <MenuItem value="black">2025 black screen</MenuItem>
              </TextField>
            )}
          </>
        )}
      </Box>

      <Box
        ref={targetRef}
        sx={{
          bgcolor: isBlackCrash ? '#000000' : WINDOWS_BLUE,
          color: '#fff',
          fontFamily: "'Segoe UI', Arial, sans-serif",
          height: isFullscreen ? '100%' : 420,
          borderRadius: isFullscreen ? 0 : 2,
          p: { xs: 4, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // A visible mouse pointer gives the prank away.
          cursor: isFullscreen ? 'none' : 'auto',
          ...(isFullscreen && { position: 'fixed', inset: 0, zIndex: 1300 }),
        }}
      >
        {variant === 'update' && (
          <Box sx={{ maxWidth: 640, textAlign: 'center', mx: 'auto' }}>
            <WindowsDots />
            <Typography sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 400, mb: 1 }}>
              Working on updates <Percent key={runKey} start={start} mode="update" />% complete
            </Typography>
            <Typography sx={{ fontSize: '0.95rem' }}>
              {os === 11 ? "Don't turn off your PC. This will take a while." : "Don't turn off your computer"}
            </Typography>
          </Box>
        )}

        {variant === 'bsod' && isBlackCrash && (
          <Box sx={{ maxWidth: 680 }}>
            <Typography sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 400, mb: 3 }}>
              Your device ran into a problem and needs to restart.
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, mb: 6 }}>
              <Percent key={runKey} start={0} mode="bsod" />% complete
            </Typography>
            <Typography sx={{ fontSize: '0.85rem' }}>Stop code: {stopCode}</Typography>
          </Box>
        )}

        {variant === 'bsod' && !isBlackCrash && (
          <Box sx={{ maxWidth: 680 }}>
            <Typography sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 300, lineHeight: 1, mb: 3 }}>:(</Typography>
            <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, mb: 3, fontWeight: 400 }}>
              Your PC ran into a problem and needs to restart. We&apos;re just collecting some error info, and then we&apos;ll restart for you.
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, mb: 4 }}>
              <Percent key={runKey} start={0} mode="bsod" />% complete
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Box sx={{ flexShrink: 0, lineHeight: 0 }}>
                <QRCodeSVG value="https://www.windows.com/stopcode" size={88} bgColor="#ffffff" fgColor={WINDOWS_BLUE} marginSize={1} title="QR code linking to windows.com/stopcode" />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.8rem' }}>
                  For more information about this issue and possible fixes, visit https://www.windows.com/stopcode
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', mt: 1 }}>
                  If you call a support person, give them this info:<br />
                  Stop code: {stopCode}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const WindowsScreen = ({ os, variant, title, description, url }: Props) => {
  const siblingUrl = `/utilities/windows-${os}-${variant === 'bsod' ? 'update' : 'blue'}-screen`;
  const content = (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="body1">
        A fake Windows {os} {variant === 'bsod' ? 'crash (blue screen of death)' : 'update'} screen, for pranking
        friends and coworkers or as a harmless joke background. Go fullscreen for the full effect. Nothing on
        your computer is actually affected.
      </Typography>

      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          {variant === 'update' ? (
            <li>Optionally set the percentage it <strong>starts at</strong>. It then creeps up slowly, the way a real update does.</li>
          ) : (
            <li>Pick a <strong>stop code</strong>{os === 11 ? <>, and choose the classic blue screen or the black screen Windows 11 switched to in 2025</> : null}.</li>
          )}
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) right before handing over the device, or while the target isn&apos;t looking. The mouse pointer is hidden in fullscreen.</li>
          <li>Press <strong>Esc</strong> at any time to exit back to the normal page. On a phone, swipe back.</li>
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
          <li>Testing how someone reacts to a &quot;computer crash&quot; for a video or livestream bit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this actually affect the computer?</strong> No — it&apos;s just a fullscreen webpage that looks like a Windows {variant === 'bsod' ? 'error' : 'update'} screen. Closing the tab or pressing Esc returns everything to normal instantly.</li>
          <li><strong>Will this trigger a real restart or update?</strong> No, nothing on the device is touched.</li>
          <li><strong>Is this made by Microsoft?</strong> No. It&apos;s an unofficial imitation for harmless pranks. Windows is a trademark of Microsoft Corporation, which isn&apos;t affiliated with ToolZoneX. Don&apos;t use it to deceive anyone into paying or giving access to a device — that&apos;s how tech-support scams work.</li>
          {variant === 'update' ? (
            <>
              <li><strong>How do I set up this Windows {os} update screen prank on a coworker&apos;s PC?</strong> Open this page on their screen while they&apos;re away, click &quot;Click to Fullscreen&quot; (or press F), and leave it running — the spinning &quot;Working on updates&quot; percentage looks convincing at a glance. Press Esc together to reveal the prank when they get back.</li>
              <li><strong>Does the update percentage actually progress?</strong> Yes — it creeps up a percent every few seconds with pauses, like a real Windows update, and never reaches 100%, so it can run for as long as you need.</li>
              <li><strong>Want a crash instead?</strong> Try the <Link href={siblingUrl}>Windows {os} blue screen prank</Link>, the &quot;:( Your PC ran into a problem&quot; error screen.</li>
            </>
          ) : (
            <>
              {os === 11 && (
                <li><strong>Is the Windows 11 crash screen blue or black?</strong> Both have existed: Windows 11 shipped with the classic blue screen, and the 2025 update (24H2) replaced it with a plainer black screen that drops the sad face. Pick the one that matches the PC you&apos;re pranking.</li>
              )}
              <li><strong>Does the QR code work?</strong> Yes — like the real one, it points to Microsoft&apos;s stop code help page, windows.com/stopcode.</li>
              <li><strong>Want something slower?</strong> Try the <Link href={siblingUrl}>Windows {os} update screen prank</Link>, a &quot;Working on updates&quot; screen that never finishes.</li>
            </>
          )}
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url={url}
      content={content}
    >
      <WindowsScreenDisplay os={os} variant={variant} />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WindowsScreen;
