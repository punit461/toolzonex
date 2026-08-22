'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import UploadIcon from '@mui/icons-material/Upload';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { useFullscreen } from './useFullscreen';

type Style = 'crack' | 'lcd1' | 'lcd2' | 'custom';

const BrokenScreenContent = () => {
  const { targetRef, isFullscreen, toggle } = useFullscreen<HTMLDivElement>();
  const [style, setStyle] = useState<Style>('lcd1');
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
    style === 'lcd1' ? '/broken1.jpg' :
    style === 'lcd2' ? '/broken2.jpg' :
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
        {imageSrc && (
          <Box
            component="img"
            src={imageSrc}
            alt="Broken screen"
            draggable={false}
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none' }}
          />
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
          <li>Click <strong>Click to Fullscreen</strong> (or press F / Space) right before handing it over.</li>
          <li>Press <strong>Esc</strong> to instantly reveal the prank and return to normal.</li>
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
