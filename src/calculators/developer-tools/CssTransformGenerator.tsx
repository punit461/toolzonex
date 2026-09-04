'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Slider, Paper, FormControl, InputLabel, Select, MenuItem, IconButton, Stack, Grid } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ORIGINS = ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'];

const CssTransformGeneratorContent = () => {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [origin, setOrigin] = useState('center');

  const transformValue = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale}) skew(${skewX}deg, ${skewY}deg)`;

  const css = useMemo(
    () => `transform: ${transformValue};\ntransform-origin: ${origin};`,
    [transformValue, origin]
  );

  const copyCss = async () => {
    try { await navigator.clipboard.writeText(css); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>Translate X: {translateX}px</Typography>
            <Slider value={translateX} onChange={(_, v) => setTranslateX(v as number)} min={-200} max={200} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>Translate Y: {translateY}px</Typography>
            <Slider value={translateY} onChange={(_, v) => setTranslateY(v as number)} min={-200} max={200} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>Rotate: {rotate}deg</Typography>
            <Slider value={rotate} onChange={(_, v) => setRotate(v as number)} min={-180} max={180} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>Scale: {scale.toFixed(2)}</Typography>
            <Slider value={scale} onChange={(_, v) => setScale(v as number)} min={0.1} max={3} step={0.05} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>Skew X: {skewX}deg</Typography>
            <Slider value={skewX} onChange={(_, v) => setSkewX(v as number)} min={-89} max={89} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>Skew Y: {skewY}deg</Typography>
            <Slider value={skewY} onChange={(_, v) => setSkewY(v as number)} min={-89} max={89} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel>Transform Origin</InputLabel>
              <Select value={origin} label="Transform Origin" onChange={(e) => setOrigin(e.target.value)}>
                {ORIGINS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Paper variant="outlined" sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 260, mb: 2, overflow: 'hidden' }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              borderRadius: 2,
              transform: transformValue,
              transformOrigin: origin,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </Paper>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>CSS Output</Typography>
          <IconButton size="small" onClick={copyCss} aria-label="Copy CSS">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
          {css}
        </Paper>
      </Box>
    </Box>
  );
};

const CssTransformGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CSS Transform Generator</Typography>
      <Typography variant="body1">
        Adjust the sliders for translateX, translateY, rotate, scale, skewX, and skewY to build a CSS
        <code> transform</code> declaration, and pick a <code>transform-origin</code> to control the point the
        rotation and scaling pivot around. The colored box updates live so you can see exactly how the
        transform looks before copying the final CSS into your stylesheet.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting rotate to 15deg and scale to 1.2 with a center origin produces:
        <br />
        <code>transform: translate(0px, 0px) rotate(15deg) scale(1.2) skew(0deg, 0deg);</code>
        <br />
        <code>transform-origin: center;</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a hover-effect transform for a card or button visually before writing CSS.</li>
          <li>Fine-tuning the exact rotation or skew angle for a design element.</li>
          <li>Experimenting with transform-origin to see how it changes rotation and scaling behavior.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does transform-origin actually change?</strong> It sets the fixed point that rotation and scaling pivot around — the default is the center of the element, but setting it to &quot;top left&quot; for example makes the element rotate and scale around its top-left corner instead.</li>
          <li><strong>Can I combine multiple transforms at once?</strong> Yes — this tool always outputs all six transform functions together in one declaration, so translate, rotate, scale, and skew all apply simultaneously, matching how the CSS transform property actually works.</li>
          <li><strong>Will this work in all browsers?</strong> The CSS transform property is supported in all modern browsers, though very old browsers may need vendor prefixes like -webkit-transform for full compatibility.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-transform-generator" content={content}>
      <CssTransformGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssTransformGenerator;
