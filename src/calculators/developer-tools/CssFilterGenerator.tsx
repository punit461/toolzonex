'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Button, Paper, Slider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SAMPLE_IMAGE = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='260'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%2387ceeb'/%3E%3Cstop offset='100%25' stop-color='%23e0f7fa'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='260' fill='url(%23sky)'/%3E%3Ccircle cx='330' cy='50' r='30' fill='%23ffd54f'/%3E%3Cellipse cx='120' cy='210' rx='260' ry='70' fill='%234caf50'/%3E%3Ccircle cx='90' cy='180' r='40' fill='%232e7d32'/%3E%3Ccircle cx='150' cy='190' r='55' fill='%23388e3c'/%3E%3Crect x='250' y='140' width='40' height='70' fill='%235d4037'/%3E%3Ccircle cx='270' cy='120' r='45' fill='%2343a047'/%3E%3C/svg%3E";

interface FilterState {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  saturate: number;
  sepia: number;
}

const DEFAULTS: FilterState = { blur: 0, brightness: 100, contrast: 100, grayscale: 0, hueRotate: 0, invert: 0, saturate: 100, sepia: 0 };

const SLIDERS: { key: keyof FilterState; label: string; min: number; max: number; unit: string }[] = [
  { key: 'blur', label: 'Blur', min: 0, max: 20, unit: 'px' },
  { key: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%' },
  { key: 'contrast', label: 'Contrast', min: 0, max: 200, unit: '%' },
  { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, unit: '%' },
  { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, unit: 'deg' },
  { key: 'invert', label: 'Invert', min: 0, max: 100, unit: '%' },
  { key: 'saturate', label: 'Saturate', min: 0, max: 200, unit: '%' },
  { key: 'sepia', label: 'Sepia', min: 0, max: 100, unit: '%' },
];

const CssFilterGeneratorContent = () => {
  const [filters, setFilters] = useState<FilterState>(DEFAULTS);

  const filterCss = useMemo(() => [
    `blur(${filters.blur}px)`,
    `brightness(${filters.brightness}%)`,
    `contrast(${filters.contrast}%)`,
    `grayscale(${filters.grayscale}%)`,
    `hue-rotate(${filters.hueRotate}deg)`,
    `invert(${filters.invert}%)`,
    `saturate(${filters.saturate}%)`,
    `sepia(${filters.sepia}%)`,
  ].join(' '), [filters]);

  const css = `filter: ${filterCss};`;
  const copy = () => navigator.clipboard.writeText(css);
  const reset = () => setFilters(DEFAULTS);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {SLIDERS.map((s) => (
          <Box key={s.key}>
            <Typography variant="subtitle2" mb={0.5}>{s.label}: {filters[s.key]}{s.unit}</Typography>
            <Slider
              value={filters[s.key]}
              min={s.min}
              max={s.max}
              onChange={(_, v) => setFilters((f) => ({ ...f, [s.key]: v as number }))}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={reset}>Reset</Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'center', bgcolor: 'action.hover' }}>
          <Box component="img" src={SAMPLE_IMAGE} alt="Sample preview" sx={{ maxWidth: '100%', borderRadius: 1, filter: filterCss }} />
        </Paper>
        <Box sx={{ position: 'relative' }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {css}
          </Paper>
          <Button variant="contained" size="small" startIcon={<ContentCopyIcon />} onClick={copy} sx={{ position: 'absolute', top: 8, right: 8 }}>
            Copy
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const CssFilterGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS Filter Generator</Typography>
      <Typography variant="body1">
        Adjust sliders for blur, brightness, contrast, grayscale, hue-rotate, invert, saturate, and sepia to
        build a CSS <code>filter</code> value visually, with a live preview on a sample image.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Drag any slider and watch the preview image update instantly. All eight filter functions combine into
        one <code>filter</code> declaration — copy it and apply it to any element.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting grayscale to 100% and contrast to 120% produces a classic black-and-white, slightly punchier
        photo effect using pure CSS — no image editing software required.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a grayscale hover effect for a gallery of images.</li>
          <li>Building a dark-mode-friendly "dimmed" image treatment with brightness/contrast.</li>
          <li>Prototyping a duotone or sepia photo filter before implementing it in CSS.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Do these filters affect page performance?</Typography>
      <Typography variant="body1">
        CSS filters are GPU-accelerated in most browsers, but applying heavy blur to large images or many
        elements can still impact rendering performance — test on the actual target devices.
      </Typography>
      <Typography variant="h3">Can I apply a filter to text or the whole page?</Typography>
      <Typography variant="body1">
        Yes — <code>filter</code> works on any element, not just images, including text, videos, and entire
        containers.
      </Typography>
      <Typography variant="h3">Is my image uploaded anywhere?</Typography>
      <Typography variant="body1">
        This tool uses a built-in sample illustration for the live preview — the CSS itself is just generated
        client-side and nothing is uploaded to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-filter-generator" content={content}>
      <CssFilterGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssFilterGenerator;
