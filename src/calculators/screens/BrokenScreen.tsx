'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import UploadIcon from '@mui/icons-material/Upload';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';

type Style = 'crack' | 'lcd1' | 'lcd2' | 'custom';

// Crack paths live in a 1000x1000 viewBox stretched over the screen.
const VIEW = 1000;

/**
 * A spider-web crack around (x, y): jagged rays running outward, joined by a
 * few broken rings near the impact point. Built in the screen's own pixel
 * space so the angles look right, then mapped into the stretched viewBox.
 */
const makeCrack = (x: number, y: number, w: number, h: number): string[] => {
  const toView = (px: number, py: number) => `${((px / w) * VIEW).toFixed(1)},${((py / h) * VIEW).toFixed(1)}`;
  const reach = Math.hypot(w, h) * 0.45;
  const rayCount = 9 + Math.floor(Math.random() * 5);
  const rays: [number, number][][] = [];
  const paths: string[] = [];

  for (let i = 0; i < rayCount; i++) {
    let angle = (i / rayCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const length = reach * (0.3 + Math.random() * 0.7);
    const points: [number, number][] = [[x, y]];
    let travelled = 0;
    let [px, py] = [x, y];
    while (travelled < length) {
      const step = 20 + Math.random() * 40;
      angle += (Math.random() - 0.5) * 0.5;
      px += Math.cos(angle) * step;
      py += Math.sin(angle) * step;
      travelled += step;
      points.push([px, py]);
    }
    rays.push(points);
    paths.push(`M${points.map(([a, b]) => toView(a, b)).join(' L')}`);
  }

  // Rings: link neighbouring rays at a few distances, skipping some for a broken look.
  for (const ringIndex of [1, 3, 5]) {
    for (let i = 0; i < rays.length; i++) {
      const a = rays[i][ringIndex];
      const b = rays[(i + 1) % rays.length][ringIndex];
      if (a && b && Math.random() < 0.75) paths.push(`M${toView(...a)} L${toView(...b)}`);
    }
  }
  return paths;
};

const BrokenScreenContent = () => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();
  const [style, setStyle] = useState<Style>('lcd1');
  const [cracks, setCracks] = useState<string[][]>([]);

  const addCrack = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const crack = makeCrack(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
    setCracks((prev) => [...prev, crack]);
  };
  const [customSrc, setCustomSrc] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setCustomSrc(url);
    setStyle('custom');
    e.target.value = '';
  };

  const imageSrc =
    style === 'lcd1' ? '/broken1.webp' :
    style === 'lcd2' ? '/broken2.webp' :
    style === 'crack' ? '/cracked_glass.jpg' :
    customSrc;

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <ToggleButtonGroup
          value={style}
          exclusive
          size="small"
          onChange={(_, value) => value && setStyle(value)}
        >
          <ToggleButton value="lcd1">Broken LCD</ToggleButton>
          <ToggleButton value="lcd2">Shattered Screen</ToggleButton>
          <ToggleButton value="crack">Cracked Glass</ToggleButton>
          <ToggleButton value="custom" disabled={!customSrc}>Custom</ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="outlined"
          size="small"
          startIcon={<UploadIcon />}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Your Own Image
        </Button>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
        <Button variant="contained" size="large" startIcon={<FullscreenIcon />} onClick={toggle}>
          Click to Fullscreen
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
          Press F or Space for fullscreen &bull; Esc to exit (swipe back on a phone)
          <br />
          Tap or click the screen to add a fresh crack
          {cracks.length > 0 && (
            <> &bull; <Button size="small" onClick={() => setCracks([])} sx={{ p: 0, minWidth: 0, verticalAlign: 'baseline' }}>Clear cracks</Button></>
          )}
        </Typography>
      </Box>

      <Box
        ref={targetRef}
        onPointerDown={addCrack}
        sx={{
          bgcolor: '#0a0a0a',
          height: isFullscreen ? '100%' : 400,
          borderRadius: isFullscreen ? 0 : 2,
          position: 'relative',
          overflow: 'hidden',
          touchAction: 'manipulation',
          // A visible mouse pointer gives the prank away.
          cursor: isFullscreen ? 'none' : 'crosshair',
          ...(isFullscreen && { position: 'fixed', inset: 0, zIndex: 1300 }),
        }}
      >
        {imageSrc && (
          <Box
            component="img"
            src={imageSrc}
            alt="Broken screen"
            draggable={false}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none' }}
          />
        )}
        {cracks.length > 0 && (
          <Box
            component="svg"
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            preserveAspectRatio="none"
            aria-hidden
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            {cracks.flat().map((d, i) => (
              <g key={i}>
                {/* Dark shadow under a bright edge reads as split glass on any background. */}
                <path d={d} fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth={3} vectorEffect="non-scaling-stroke" />
                <path d={d} fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const BrokenScreen = () => {
  const content = (
    <>
      <Typography variant="h2">Broken Screen Prank</Typography>
      <Typography variant="body1">
        A fake broken-screen overlay for pranking friends and coworkers. Choose between a realistic shattered
        LCD photo, a cracked glass photo, or upload your own image, go fullscreen on their device, and
        watch the reaction — it&apos;s just a picture, no actual damage.
      </Typography>

      <Typography variant="h2">How to use it</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pick a style: <strong>Broken LCD</strong>, <strong>Shattered Screen</strong>, or <strong>Cracked Glass</strong> — or click <strong>Upload Your Own Image</strong> to use any picture from your device.</li>
          <li>Open this page on the target device.</li>
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) right before handing it over. The mouse pointer is hidden in fullscreen.</li>
          <li>Every tap or click on the screen adds a new crack right where it lands, so the damage &quot;spreads&quot; when they touch it.</li>
          <li>Press <strong>Esc</strong> to instantly reveal the prank and return to normal. On a phone, swipe back.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Open this page on a friend&apos;s laptop, pick the Broken LCD style, go fullscreen while they&apos;re
        not looking, then hand it back — the &quot;broken&quot; screen covers the whole display until they press Esc.
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
          <li><strong>What&apos;s the difference between the styles?</strong> Broken LCD and Shattered Screen are photos of damaged displays; Cracked Glass is a photo of shattered glass with a spider-web crack pattern.</li>
          <li><strong>Can I upload my own image?</strong> Yes, click Upload Your Own Image to display any picture from your device full-screen.</li>
          <li><strong>Is my uploaded image saved anywhere?</strong> No, it stays only in your browser for this session and is never uploaded to a server.</li>
          <li><strong>Does it work on a phone?</strong> Yes. On iPhone, where websites can&apos;t use true fullscreen, the broken screen fills the browser window instead; swipe back to exit.</li>
          <li><strong>How do I undo it?</strong> Press Esc or close the browser tab. <strong>Clear cracks</strong> removes the tap cracks.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/utilities/broken-screen"
      content={content}
    >
      <BrokenScreenContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BrokenScreen;
