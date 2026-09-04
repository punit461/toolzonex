'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Button, Paper, Slider, FormControlLabel, Switch } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CssBorderRadiusGeneratorContent = () => {
  const [uniform, setUniform] = useState(true);
  const [topLeft, setTopLeft] = useState(24);
  const [topRight, setTopRight] = useState(24);
  const [bottomRight, setBottomRight] = useState(24);
  const [bottomLeft, setBottomLeft] = useState(24);

  const setAll = (val: number) => {
    setTopLeft(val);
    setTopRight(val);
    setBottomRight(val);
    setBottomLeft(val);
  };

  const cssValue = useMemo(() => {
    if (uniform || (topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft)) {
      return `${topLeft}px`;
    }
    return `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;
  }, [uniform, topLeft, topRight, bottomRight, bottomLeft]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`border-radius: ${cssValue};`);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControlLabel
          control={<Switch checked={uniform} onChange={(e) => setUniform(e.target.checked)} />}
          label="Uniform (all corners linked)"
        />

        {uniform ? (
          <Box>
            <Typography variant="subtitle2" mb={1}>All Corners: {topLeft}px</Typography>
            <Slider value={topLeft} min={0} max={200} onChange={(_e, val) => setAll(val as number)} />
          </Box>
        ) : (
          <>
            <Box>
              <Typography variant="subtitle2" mb={1}>Top-Left: {topLeft}px</Typography>
              <Slider value={topLeft} min={0} max={200} onChange={(_e, val) => setTopLeft(val as number)} />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>Top-Right: {topRight}px</Typography>
              <Slider value={topRight} min={0} max={200} onChange={(_e, val) => setTopRight(val as number)} />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>Bottom-Right: {bottomRight}px</Typography>
              <Slider value={bottomRight} min={0} max={200} onChange={(_e, val) => setBottomRight(val as number)} />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>Bottom-Left: {bottomLeft}px</Typography>
              <Slider value={bottomLeft} min={0} max={200} onChange={(_e, val) => setBottomLeft(val as number)} />
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper
          sx={{
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'action.hover',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              width: 160,
              height: 160,
              bgcolor: 'primary.main',
              borderTopLeftRadius: `${topLeft}px`,
              borderTopRightRadius: `${topRight}px`,
              borderBottomRightRadius: `${bottomRight}px`,
              borderBottomLeftRadius: `${bottomLeft}px`,
              transition: 'border-radius 0.15s ease',
            }}
          />
        </Paper>

        <Box sx={{ position: 'relative' }}>
          <Paper
            variant="outlined"
            sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', wordBreak: 'break-all' }}
          >
            border-radius: {cssValue};
          </Paper>
          <Button
            variant="contained"
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={copyToClipboard}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Copy
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const CssBorderRadiusGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Border Radius Generator</Typography>
      <Typography variant="body1">
        Toggle &quot;Uniform&quot; off to control each corner independently, or leave it on to adjust all four
        corners together with a single slider. The preview box updates live, and the generated CSS
        automatically switches between the short one-value form (when all corners match) and the full
        four-value form (when they differ).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting all corners to 24px generates the shorthand <code>border-radius: 24px;</code>. Setting a
        &quot;squircle&quot; card with a sharp bottom-left corner (top-left 24px, top-right 24px, bottom-right
        24px, bottom-left 0px) generates <code>border-radius: 24px 24px 24px 0px;</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Designing rounded cards, buttons, and modals visually instead of guessing pixel values.</li>
          <li>Creating asymmetric or &quot;organic&quot; shapes with mismatched corner radii.</li>
          <li>Quickly generating copy-paste-ready CSS for a design system or component library.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What order are the four values in?</Typography>
      <Typography variant="body1">
        CSS&apos;s <code>border-radius</code> shorthand always follows the order top-left, top-right,
        bottom-right, bottom-left — the same clockwise-from-top-left convention used by other CSS shorthand
        properties like <code>margin</code> and <code>padding</code>.
      </Typography>
      <Typography variant="h3">Can I use percentages instead of pixels?</Typography>
      <Typography variant="body1">
        This generator outputs pixel values, which work well for most fixed-size UI elements. For a shape that
        should scale with the element (like a perfect circle or pill button regardless of size), you can
        manually replace the pixel value with <code>50%</code> in your CSS.
      </Typography>
      <Typography variant="h3">Does browser support vary for border-radius?</Typography>
      <Typography variant="body1">
        No — <code>border-radius</code> has been supported unprefixed in all modern browsers for many years,
        so the CSS generated here works everywhere without vendor prefixes.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-border-radius-generator" content={content}>
      <CssBorderRadiusGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssBorderRadiusGenerator;
