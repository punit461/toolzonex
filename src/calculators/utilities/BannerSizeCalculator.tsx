'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SizeUnit = 'ft' | 'in' | 'm' | 'cm';

const UNIT_TO_INCHES: Record<SizeUnit, number> = {
  ft: 12,
  in: 1,
  m: 39.3700787,
  cm: 0.393700787,
};

const DPI_PRESETS = [100, 150, 300];

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

const BannerSizeCalculator = () => {
  const [width, setWidth] = useState('10');
  const [height, setHeight] = useState('3');
  const [unit, setUnit] = useState<SizeUnit>('ft');
  const [dpi, setDpi] = useState(150);

  const { pixelWidth, pixelHeight, fileSizeUncompressed, fileSizeCompressedLow, fileSizeCompressedHigh } = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const wIn = w * UNIT_TO_INCHES[unit];
    const hIn = h * UNIT_TO_INCHES[unit];
    const pw = Math.round(wIn * dpi);
    const ph = Math.round(hIn * dpi);
    const pixels = pw * ph;
    const uncompressed = pixels * 3; // 24-bit RGB, no compression
    return {
      pixelWidth: pw,
      pixelHeight: ph,
      fileSizeUncompressed: uncompressed,
      fileSizeCompressedLow: uncompressed * 0.05,
      fileSizeCompressedHigh: uncompressed * 0.3,
    };
  }, [width, height, unit, dpi]);

  const content = (
    <>
      <Typography variant="h2">How Banner Pixel Size Is Calculated</Typography>
      <Typography variant="body1">
        Enter your desired physical banner size and a target print resolution (DPI — dots per inch), and this
        calculator tells you the pixel dimensions your artwork file needs to be for a sharp, non-pixelated
        print at that size.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Pixel Width = Physical Width (in inches) × DPI<br />
        Pixel Height = Physical Height (in inches) × DPI
      </Box>
      <Typography variant="body1">
        Large-format banners viewed from a distance (billboards, event backdrops) often use a lower DPI like
        100, since fine detail isn&apos;t as noticeable from far away. Banners viewed up close, or with fine
        text and detail, generally look best at 150-300 DPI.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10 ft × 3 ft banner (120 in × 36 in) printed at 150 DPI needs artwork that&apos;s 120 × 150 = 18,000
        pixels wide by 36 × 150 = 5,400 pixels tall.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting up a design file at the correct pixel dimensions before sending it to a print shop.</li>
          <li>Checking whether an existing image has enough resolution for a target banner size.</li>
          <li>Deciding how much DPI you actually need for a viewing-distance-appropriate print.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What DPI should I use for a large banner?</Typography>
      <Typography variant="body1">
        For banners viewed from a distance of several feet or more (trade show backdrops, billboards), 100 DPI
        is often sufficient and keeps file sizes manageable. For banners viewed up close or with small text,
        150-300 DPI gives a sharper result.
      </Typography>
      <Typography variant="h3">How accurate is the estimated file size?</Typography>
      <Typography variant="body1">
        The file size shown is a rough range only. The uncompressed figure assumes an uncompressed 24-bit RGB
        bitmap; real design files (PDF, TIFF, PSD, compressed JPEG/PNG) vary enormously based on compression,
        color depth, layers, and content complexity — use this as a ballpark planning figure, not an exact
        prediction.
      </Typography>
      <Typography variant="h3">Do I need to convert my physical size to inches first?</Typography>
      <Typography variant="body1">
        No — enter your width and height in feet, inches, meters, or centimeters and pick the matching unit;
        the calculator converts to inches internally before applying the DPI.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/banner-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Width"
              type="number"
              fullWidth
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <TextField
              label="Height"
              type="number"
              fullWidth
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>Size Unit</InputLabel>
            <Select label="Size Unit" value={unit} onChange={(e) => setUnit(e.target.value as SizeUnit)}>
              <MenuItem value="ft">Feet</MenuItem>
              <MenuItem value="in">Inches</MenuItem>
              <MenuItem value="m">Meters</MenuItem>
              <MenuItem value="cm">Centimeters</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Print Resolution (DPI)</InputLabel>
            <Select label="Print Resolution (DPI)" value={dpi} onChange={(e) => setDpi(Number(e.target.value))}>
              {DPI_PRESETS.map((d) => (
                <MenuItem key={d} value={d}>{d} DPI</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Required Pixel Dimensions</Typography>
            <Typography variant="h4" fontWeight="bold">
              {pixelWidth.toLocaleString('en-US')} × {pixelHeight.toLocaleString('en-US')} px
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated File Size</Typography>
            <Typography fontWeight={600}>
              ~{formatBytes(fileSizeCompressedLow)} – {formatBytes(fileSizeCompressedHigh)} (compressed)
            </Typography>
          </Paper>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Uncompressed (raw): ~{formatBytes(fileSizeUncompressed)}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BannerSizeCalculator;
