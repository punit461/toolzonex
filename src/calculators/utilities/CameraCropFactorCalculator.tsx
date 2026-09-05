'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FULL_FRAME_DIAGONAL = 43.3;

const SENSOR_PRESETS: Record<string, number> = {
  'Full Frame (1.0x)': 1.0,
  'APS-C — Nikon/Sony (1.5x)': 1.5,
  'APS-C — Canon (1.6x)': 1.6,
  'Micro Four Thirds (2.0x)': 2.0,
  '1-inch Sensor (2.7x)': 2.7,
  'Custom Sensor Diagonal': 0,
};

const CameraCropFactorCalculator = () => {
  const [preset, setPreset] = useState('APS-C — Nikon/Sony (1.5x)');
  const [customDiagonal, setCustomDiagonal] = useState('28.2');
  const [focalLength, setFocalLength] = useState('50');

  const cropFactor = useMemo(() => {
    if (preset === 'Custom Sensor Diagonal') {
      const d = parseFloat(customDiagonal);
      return !isNaN(d) && d > 0 ? FULL_FRAME_DIAGONAL / d : 0;
    }
    return SENSOR_PRESETS[preset];
  }, [preset, customDiagonal]);

  const focal = parseFloat(focalLength) || 0;
  const equivalent = focal * cropFactor;

  const content = (
    <>
      <Typography variant="h2">How to Use the Camera Crop Factor Calculator</Typography>
      <Typography variant="body1">
        Select your camera&apos;s sensor format (or enter a custom sensor diagonal in millimeters) and a lens
        focal length. The calculator finds the crop factor relative to a full-frame sensor and multiplies it
        by your focal length to get the full-frame-equivalent focal length — the number you&apos;d need on a
        full-frame camera to get the same field of view.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Crop Factor = 43.3mm / Sensor Diagonal (mm)
        <br />
        Full-Frame Equivalent Focal Length = Lens Focal Length × Crop Factor
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 50mm lens on a Nikon/Sony APS-C camera (1.5x crop factor) gives a full-frame-equivalent field of
        view of 50 × 1.5 = 75mm — noticeably more zoomed-in than a true 50mm lens on a full-frame body.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing field of view when switching between a crop-sensor and full-frame camera.</li>
          <li>Understanding how a lens will actually frame a shot on your specific camera body.</li>
          <li>Deciding which focal length lens to buy to match a desired full-frame look.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Circle of Confusion Calculator?</strong> The Circle of Confusion Calculator is also sensor-format-based, but it&apos;s for a completely different purpose — finding the correct circle-of-confusion value used in depth-of-field and hyperfocal distance calculations. This tool is about focal-length equivalence, used for comparing field of view and framing across different sensor sizes.</li>
          <li><strong>Why do Canon and Nikon/Sony APS-C cameras have different crop factors?</strong> Canon&apos;s APS-C sensors are physically slightly smaller (diagonal ~26.8mm) than Nikon and Sony&apos;s APS-C sensors (diagonal ~28.2mm), giving Canon a 1.6x crop factor versus roughly 1.5x for the others, even though both are called &quot;APS-C.&quot;</li>
          <li><strong>Does crop factor change the lens&apos;s actual focal length?</strong> No — the lens&apos;s physical focal length and aperture don&apos;t change. Crop factor only describes how much of the lens&apos;s image circle the smaller sensor captures, which affects field of view (framing) but not the lens&apos;s true optical properties like depth of field at a given aperture.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/camera-crop-factor-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Sensor Format" value={preset} onChange={(e) => setPreset(e.target.value)} fullWidth>
            {Object.keys(SENSOR_PRESETS).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </TextField>
          {preset === 'Custom Sensor Diagonal' && (
            <TextField
              label="Custom Sensor Diagonal (mm)"
              type="number"
              value={customDiagonal}
              onChange={(e) => setCustomDiagonal(e.target.value)}
              fullWidth
            />
          )}
          <TextField label="Lens Focal Length (mm)" type="number" value={focalLength} onChange={(e) => setFocalLength(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Crop Factor</Typography>
            <Typography variant="h3" fontWeight="bold">{cropFactor.toFixed(2)}×</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Full-Frame Equivalent Focal Length</Typography>
            <Typography fontWeight={600}>{equivalent.toFixed(1)}mm</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CameraCropFactorCalculator;
