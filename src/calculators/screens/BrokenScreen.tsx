'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import UploadIcon from '@mui/icons-material/Upload';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';
import { makeCrack, paintBrokenScreen, seededRng, VIEW, type ArtStyle } from './brokenScreenArt';

type Style = ArtStyle | 'custom';

// Offsets so switching style with the same seed doesn't reuse the same random stream.
const STYLE_SEED: Record<ArtStyle, number> = { lcd: 11, shattered: 23, crack: 37 };

const BrokenScreenContent = () => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();
  const [style, setStyle] = useState<Style>('lcd');
  const [cracks, setCracks] = useState<string[][]>([]);
  // Generated artwork with a random seed per visit. The seed only feeds the
  // canvas (never the markup), so a different value on the client can't cause
  // a hydration mismatch.
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const [seedCracks, setSeedCracks] = useState<string[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Paint the chosen style at the screen's current size, and again whenever it
  // resizes (entering fullscreen). The seeded RNG keeps the pattern the same.
  useEffect(() => {
    const container = targetRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || style === 'custom') {
      setSeedCracks([]);
      return;
    }
    const draw = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rng = seededRng(seed + STYLE_SEED[style]);
      const { impacts } = paintBrokenScreen(ctx, w, h, style, rng);
      setSeedCracks(impacts.map((p) => makeCrack(p.x, p.y, w, h, rng, p.scale)));
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(container);
    return () => observer.disconnect();
  }, [style, seed, targetRef]);

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

  const allCracks = [...seedCracks, ...cracks];

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <ToggleButtonGroup
          value={style}
          exclusive
          size="small"
          onChange={(_, value) => value && setStyle(value)}
        >
          <ToggleButton value="lcd">Broken LCD</ToggleButton>
          <ToggleButton value="shattered">Shattered Screen</ToggleButton>
          <ToggleButton value="crack">Cracked Glass</ToggleButton>
          <ToggleButton value="custom" disabled={!customSrc}>Custom</ToggleButton>
        </ToggleButtonGroup>
        {style !== 'custom' && (
          <Button variant="text" size="small" onClick={() => setSeed(Math.floor(Math.random() * 2 ** 31))}>
            New pattern
          </Button>
        )}
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
        {style === 'custom' ? (
          customSrc && (
            <Box
              component="img"
              src={customSrc}
              alt="Your uploaded image"
              draggable={false}
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none' }}
            />
          )
        ) : (
          <Box
            component="canvas"
            ref={canvasRef}
            aria-hidden="true"
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
          />
        )}
        {allCracks.length > 0 && (
          <Box
            component="svg"
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            preserveAspectRatio="none"
            aria-hidden
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          >
            {allCracks.flat().map((d, i) => (
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
        A fake broken-screen overlay for pranking friends and coworkers. Choose a broken LCD, a shattered screen
        or cracked glass — each one is drawn fresh in your browser — or upload your own image, go fullscreen on
        their device, and watch the reaction. It&apos;s just a picture, no actual damage.
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
          <li><strong>What&apos;s the difference between the styles?</strong> Broken LCD shows coloured stripes and leaking black ink like a failed display; Shattered Screen is a hard impact with light bleeding from the backlight; Cracked Glass is spider-web cracks across dark glass. All three are drawn by code in your browser, so click <strong>New pattern</strong> for a different break.</li>
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
