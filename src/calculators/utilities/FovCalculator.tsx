'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PRESETS: Record<string, { label: string; width: number; height: number }> = {
  fullframe: { label: 'Full Frame (36 × 24mm)', width: 36, height: 24 },
  apsc: { label: 'APS-C (23.6 × 15.6mm)', width: 23.6, height: 15.6 },
  m43: { label: 'Micro Four Thirds (17.3 × 13mm)', width: 17.3, height: 13 },
  oneinch: { label: '1-inch Sensor (13.2 × 8.8mm)', width: 13.2, height: 8.8 },
  custom: { label: 'Custom', width: 36, height: 24 },
};

const toDegrees = (rad: number) => (rad * 180) / Math.PI;

const FovCalculator = () => {
  const [preset, setPreset] = useState<string>('fullframe');
  const [sensorWidth, setSensorWidth] = useState<string>('36');
  const [sensorHeight, setSensorHeight] = useState<string>('24');
  const [focalLength, setFocalLength] = useState<string>('50');

  const handlePresetChange = (value: string) => {
    setPreset(value);
    if (value !== 'custom') {
      setSensorWidth(String(PRESETS[value].width));
      setSensorHeight(String(PRESETS[value].height));
    }
  };

  const sw = parseFloat(sensorWidth);
  const sh = parseFloat(sensorHeight);
  const fl = parseFloat(focalLength);
  const valid = !isNaN(sw) && !isNaN(sh) && !isNaN(fl) && sw > 0 && sh > 0 && fl > 0;

  const hFov = valid ? 2 * toDegrees(Math.atan(sw / (2 * fl))) : 0;
  const vFov = valid ? 2 * toDegrees(Math.atan(sh / (2 * fl))) : 0;
  const diagonalMm = valid ? Math.sqrt(sw * sw + sh * sh) : 0;
  const dFov = valid ? 2 * toDegrees(Math.atan(diagonalMm / (2 * fl))) : 0;

  const content = (
    <>
      <Typography variant="h2">How to Calculate Camera Field of View</Typography>
      <Typography variant="body1">
        A lens&apos;s angle of view depends on both the focal length and the size of the camera&apos;s sensor.
        Pick a common sensor preset (or enter a custom sensor size) and a focal length to get the horizontal,
        vertical, and diagonal field of view in degrees.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        FOV = 2 × arctan(Sensor Dimension ÷ (2 × Focal Length))
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A full-frame sensor (36mm × 24mm) with a 50mm lens gives a horizontal FOV of 2 × arctan(36 ÷ 100) ≈
        39.6°, a vertical FOV of 2 × arctan(24 ÷ 100) ≈ 27.0°, and a diagonal FOV (using the 43.3mm sensor
        diagonal) of about 46.8°.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a lens focal length for landscape, portrait, or architectural photography.</li>
          <li>Comparing how the same focal length behaves on different sensor sizes.</li>
          <li>Planning a shot&apos;s framing before arriving on location.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do APS-C cameras have a &quot;crop factor&quot;?</Typography>
      <Typography variant="body1">
        A smaller sensor captures a narrower slice of the same lens&apos;s image circle, producing a narrower
        field of view than a full-frame sensor at the same focal length — this narrowing is commonly expressed
        as a crop factor multiplier, typically around 1.5x to 1.6x for APS-C sensors.
      </Typography>
      <Typography variant="h3">Which FOV value matters most — horizontal, vertical, or diagonal?</Typography>
      <Typography variant="body1">
        Horizontal FOV is the most commonly cited figure for landscape-orientation shooting, vertical FOV
        matters more for portrait orientation, and diagonal FOV represents the sensor&apos;s true corner-to-corner
        angle of view, which is what lens focal length ratings are technically based on.
      </Typography>
      <Typography variant="h3">Does lens distortion affect the actual field of view?</Typography>
      <Typography variant="body1">
        This formula assumes an ideal rectilinear lens. Real lenses — especially wide-angle and fisheye designs
        — introduce some distortion, which can make the practically perceived field of view differ slightly
        from this idealized trigonometric calculation.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fov-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sensor Preset</InputLabel>
            <Select label="Sensor Preset" value={preset} onChange={(e) => handlePresetChange(e.target.value)}>
              {Object.entries(PRESETS).map(([key, p]) => (
                <MenuItem key={key} value={key}>{p.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Sensor Width (mm)" type="number" fullWidth value={sensorWidth}
            disabled={preset !== 'custom'}
            onChange={(e) => setSensorWidth(e.target.value)} onFocus={(e) => e.target.select()}
          />
          <TextField
            label="Sensor Height (mm)" type="number" fullWidth value={sensorHeight}
            disabled={preset !== 'custom'}
            onChange={(e) => setSensorHeight(e.target.value)} onFocus={(e) => e.target.select()}
          />
          <TextField label="Focal Length (mm)" type="number" fullWidth value={focalLength} onChange={(e) => setFocalLength(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Diagonal Field of View</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{valid ? `${dFov.toFixed(1)}°` : '—'}</Typography>
          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Horizontal FOV</Typography>
              <Typography variant="h6">{valid ? `${hFov.toFixed(1)}°` : '—'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Vertical FOV</Typography>
              <Typography variant="h6">{valid ? `${vFov.toFixed(1)}°` : '—'}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FovCalculator;
