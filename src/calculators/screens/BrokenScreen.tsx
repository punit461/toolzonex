'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton, Link } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import UploadIcon from '@mui/icons-material/Upload';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';
import { paintBrokenScreen, seededRng, type ArtStyle } from './brokenScreenArt';

type Style = ArtStyle | 'custom';

// Offsets so switching style with the same seed doesn't reuse the same random stream.
const STYLE_SEED: Record<ArtStyle, number> = { lcd: 11, shattered: 23, crack: 37 };

/**
 * One crack: a copy of the licensed crack photo (white cracks on black, see
 * the credit in the page content). x/y are fractions of the screen, rotate is
 * in degrees, and scale multiplies the base size.
 */
interface Crack {
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

const CRACK_SRC = '/broken-glass-cracks.webp';
// Where the impact point sits in the photo, as fractions of its width/height.
// Each copy is anchored there so a tap lands exactly on the impact.
const IMPACT = { x: 0.55, y: 0.45 };

const BrokenScreenContent = () => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();
  const [style, setStyle] = useState<Style>('lcd');
  const [cracks, setCracks] = useState<Crack[]>([]);
  // Generated artwork with a random seed per visit. The seed only feeds the
  // canvas and the client-side crack list (never the server markup), so a
  // different value on the client can't cause a hydration mismatch.
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const [seedCracks, setSeedCracks] = useState<Crack[]>([]);
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
      // The photo is landscape. On a portrait screen, turn the main break
      // sideways so its long cracks still run the full height.
      const baseTurn = h > w ? 90 : 0;
      setSeedCracks(impacts.map((p, i) => ({
        x: p.x / w,
        y: p.y / h,
        rotate: (i === 0 ? baseTurn : rng() * 360) + (rng() - 0.5) * 30,
        scale: p.scale,
      })));
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(container);
    return () => observer.disconnect();
  }, [style, seed, targetRef]);

  const addCrack = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const crack: Crack = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      rotate: Math.random() * 360,
      scale: 0.45 + Math.random() * 0.3,
    };
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
          // Lets each crack size itself with cqmax (the screen's longer side).
          containerType: 'size',
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
        {allCracks.map((c, i) => (
          // "screen" blending drops the photo's black glass and keeps only the
          // white cracks, so the drawn screen underneath shows through.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={CRACK_SRC}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{
              position: 'absolute',
              left: `${c.x * 100}%`,
              top: `${c.y * 100}%`,
              width: `${125 * c.scale}cqmax`,
              maxWidth: 'none',
              transformOrigin: `${IMPACT.x * 100}% ${IMPACT.y * 100}%`,
              transform: `translate(-${IMPACT.x * 100}%, -${IMPACT.y * 100}%) rotate(${c.rotate}deg)`,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />
        ))}
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
        or cracked glass, with real-looking cracks from a photo of shattered glass, or upload your own image. Go
        fullscreen on their device and watch the reaction. It&apos;s just a picture, no actual damage.
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
          <li><strong>What&apos;s the difference between the styles?</strong> Broken LCD shows coloured stripes and leaking black ink like a failed display; Shattered Screen is a hard impact with light bleeding from the backlight; Cracked Glass is several impacts across dark glass. The damage underneath is drawn in your browser and the cracks are placed at random, so click <strong>New pattern</strong> for a different break.</li>
          <li><strong>Can I upload my own image?</strong> Yes, click Upload Your Own Image to display any picture from your device full-screen.</li>
          <li><strong>Is my uploaded image saved anywhere?</strong> No, it stays only in your browser for this session and is never uploaded to a server.</li>
          <li><strong>Does it work on a phone?</strong> Yes. On iPhone, where websites can&apos;t use true fullscreen, the broken screen fills the browser window instead; swipe back to exit.</li>
          <li><strong>How do I undo it?</strong> Press Esc or close the browser tab. <strong>Clear cracks</strong> removes the tap cracks.</li>
        </ul>
      </Box>

      <Typography variant="body2" color="text.secondary">
        Crack photo: &ldquo;Black background with radiating white cracks on broken glass&rdquo; by Sadhin Costa,{' '}
        <Link href="https://www.vecteezy.com/free-photos/broken-display">Broken Display Stock photos by Vecteezy</Link>,
        used under the Vecteezy Free License.
      </Typography>
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
