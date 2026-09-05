'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RECOMMENDED_WIDTH = 1280;
const RECOMMENDED_HEIGHT = 720;
const MIN_WIDTH = 640;
const RATIO = 16 / 9;

const YoutubeThumbnailRatioCalculator = () => {
  const [mode, setMode] = useState<'fromWidth' | 'fromHeight' | 'check'>('fromWidth');
  const [width, setWidth] = useState('1280');
  const [height, setHeight] = useState('720');

  const w = parseFloat(width);
  const h = parseFloat(height);

  const usePreset = () => {
    setWidth(String(RECOMMENDED_WIDTH));
    setHeight(String(RECOMMENDED_HEIGHT));
  };

  let calculatedHeight = 0;
  let calculatedWidth = 0;
  if (mode === 'fromWidth' && !isNaN(w) && w > 0) {
    calculatedHeight = w / RATIO;
  }
  if (mode === 'fromHeight' && !isNaN(h) && h > 0) {
    calculatedWidth = h * RATIO;
  }

  const checkRatio = !isNaN(w) && !isNaN(h) && w > 0 && h > 0 ? w / h : 0;
  const matchesRatio = mode === 'check' && Math.abs(checkRatio - RATIO) < 0.01;
  const meetsMinWidth = mode === 'check' && w >= MIN_WIDTH;

  const content = (
    <>
      <Typography variant="h2">How to Use the YouTube Thumbnail Ratio Calculator</Typography>
      <Typography variant="body1">
        YouTube officially recommends thumbnails at 1280×720 pixels (a 16:9 ratio), with a minimum width of
        640 pixels and a roughly 2MB file size limit. Use the preset button to load YouTube&apos;s
        recommended size directly, calculate a proportional height or width from one known dimension, or
        check whether an existing image matches YouTube&apos;s 16:9 guideline and minimum width.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Height = Width ÷ (16/9)    Width = Height × (16/9)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If you have a custom thumbnail width of 1920px, the proportional 16:9 height would be 1920 ÷
        (16/9) = 1080px. Checking an existing 1080×1080 square image against YouTube&apos;s guidelines would
        flag it as not matching the recommended 16:9 ratio, even though it clears the 640px minimum width.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing a custom thumbnail design to YouTube&apos;s recommended 1280×720 resolution before upload.</li>
          <li>Checking whether an existing thumbnail image meets YouTube&apos;s ratio and minimum width guidelines.</li>
          <li>Calculating a proportional dimension when only one side of the thumbnail size is known.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the general Aspect Ratio Calculator?</strong> The Aspect Ratio Calculator is a general-purpose tool for calculating any ratio between any two dimensions. This tool is pre-loaded specifically with YouTube&apos;s official thumbnail guidelines — the 1280×720 recommended size, the 640px minimum width, and the 16:9 target ratio — built for content creators sizing thumbnails specifically.</li>
          <li><strong>What happens if my thumbnail isn&apos;t exactly 16:9?</strong> YouTube will still accept it, but it may be cropped or padded when displayed in different placements across the platform (search results, suggested videos, mobile), so matching 16:9 exactly gives the most predictable, uncropped appearance.</li>
          <li><strong>Does file size matter as much as pixel dimensions?</strong> Yes — YouTube also enforces a roughly 2MB file size limit on thumbnail uploads separate from pixel dimensions, so a correctly-sized image with heavy compression artifacts or an uncompressed format can still be rejected for exceeding the file size cap.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/youtube-thumbnail-ratio-calculator" content={content}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Button variant="outlined" size="small" onClick={usePreset} sx={{ alignSelf: 'flex-start' }}>
          Use YouTube&apos;s Recommended Size (1280×720)
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant={mode === 'fromWidth' ? 'contained' : 'outlined'} onClick={() => setMode('fromWidth')}>From Width</Button>
          <Button size="small" variant={mode === 'fromHeight' ? 'contained' : 'outlined'} onClick={() => setMode('fromHeight')}>From Height</Button>
          <Button size="small" variant={mode === 'check' ? 'contained' : 'outlined'} onClick={() => setMode('check')}>Check My Size</Button>
        </Box>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          {mode !== 'fromHeight' && (
            <TextField label="Width (px)" type="number" value={width} onChange={(e) => setWidth(e.target.value)} fullWidth />
          )}
          {mode !== 'fromWidth' && (
            <TextField label="Height (px)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} fullWidth />
          )}
          <Alert severity="info">Recommended: 1280×720 · Minimum width: 640px · File size limit: ~2MB</Alert>
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          {mode === 'fromWidth' && (
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Proportional Height</Typography>
              <Typography variant="h3" fontWeight="bold">{calculatedHeight > 0 ? Math.round(calculatedHeight) : '—'}</Typography>
              <Typography variant="body2">px</Typography>
            </Paper>
          )}
          {mode === 'fromHeight' && (
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Proportional Width</Typography>
              <Typography variant="h3" fontWeight="bold">{calculatedWidth > 0 ? Math.round(calculatedWidth) : '—'}</Typography>
              <Typography variant="body2">px</Typography>
            </Paper>
          )}
          {mode === 'check' && (
            <Stack spacing={2}>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Matches 16:9 Ratio</Typography>
                <Typography fontWeight={600} color={matchesRatio ? 'success.main' : 'error.main'}>{matchesRatio ? 'Yes' : 'No'}</Typography>
              </Paper>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Meets Minimum Width (640px)</Typography>
                <Typography fontWeight={600} color={meetsMinWidth ? 'success.main' : 'error.main'}>{meetsMinWidth ? 'Yes' : 'No'}</Typography>
              </Paper>
            </Stack>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YoutubeThumbnailRatioCalculator;
