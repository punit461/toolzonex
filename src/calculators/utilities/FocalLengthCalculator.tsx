'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PRESETS: Record<string, { label: string; width: number }> = {
  fullframe: { label: 'Full Frame (36mm wide)', width: 36 },
  apsc: { label: 'APS-C (23.6mm wide)', width: 23.6 },
  m43: { label: 'Micro Four Thirds (17.3mm wide)', width: 17.3 },
  oneinch: { label: '1-inch Sensor (13.2mm wide)', width: 13.2 },
  custom: { label: 'Custom', width: 36 },
};

type Mode = 'fov' | 'subject';

const toRadians = (deg: number) => (deg * Math.PI) / 180;

const FocalLengthCalculator = () => {
  const [mode, setMode] = useState<Mode>('fov');

  const [preset, setPreset] = useState<string>('fullframe');
  const [sensorWidth, setSensorWidth] = useState<string>('36');
  const [fov, setFov] = useState<string>('40');

  const [distance, setDistance] = useState<string>('10');
  const [subjectSize, setSubjectSize] = useState<string>('1.8');
  const [imageSize, setImageSize] = useState<string>('20');

  const handlePresetChange = (value: string) => {
    setPreset(value);
    if (value !== 'custom') setSensorWidth(String(PRESETS[value].width));
  };

  const fovResult = useMemo(() => {
    const sw = parseFloat(sensorWidth);
    const angle = parseFloat(fov);
    if (isNaN(sw) || isNaN(angle) || sw <= 0 || angle <= 0 || angle >= 180) return null;
    return sw / (2 * Math.tan(toRadians(angle) / 2));
  }, [sensorWidth, fov]);

  const subjectResult = useMemo(() => {
    const d = parseFloat(distance);
    const subj = parseFloat(subjectSize);
    const img = parseFloat(imageSize);
    if (isNaN(d) || isNaN(subj) || isNaN(img) || d <= 0 || subj <= 0 || img <= 0) return null;
    // focal length (mm) = (image size on sensor (mm) x distance (m converted to mm)) / real subject size (m)
    return (img * (d * 1000)) / (subj * 1000);
  }, [distance, subjectSize, imageSize]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Required Focal Length</Typography>
      <Typography variant="body1">
        Focal length determines how much of a scene a lens captures and how large a distant subject appears on
        the sensor. This calculator works two ways: from a desired field of view and sensor size, or from a
        subject&apos;s distance and how large you want it to appear on the sensor.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Focal Length = Sensor Width ÷ (2 × tan(FOV ÷ 2)) &nbsp;|&nbsp; Focal Length = (Image Size × Distance) ÷ Subject Size
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        To get a 40° horizontal field of view on a full-frame sensor (36mm wide), you need a focal length of
        36 ÷ (2 × tan(20°)) ≈ 49.5mm — close to a standard 50mm lens. Separately, to make a 1.8m tall subject
        fill 20mm of the sensor from 10m away, you&apos;d need a focal length of (20 × 10,000) ÷ 1,800 ≈ 111mm.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing a lens to achieve a specific angle of view for landscape, portrait, or architectural photography.</li>
          <li>Working out how much reach (telephoto focal length) you need to fill the frame with a distant subject.</li>
          <li>Planning a shot when you know the subject distance and desired framing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a field-of-view calculator?</Typography>
      <Typography variant="body1">
        A field-of-view calculator starts from a known focal length and tells you the resulting angle of view.
        This calculator works the other way: you specify the field of view or framing you want, and it tells you
        the focal length required to achieve it.
      </Typography>
      <Typography variant="h3">Why does sensor size matter?</Typography>
      <Typography variant="body1">
        A smaller sensor captures a narrower slice of the same lens&apos;s image circle, so it needs a shorter
        focal length than a full-frame sensor to achieve the same field of view — this is often described using
        a camera&apos;s &quot;crop factor.&quot;
      </Typography>
      <Typography variant="h3">Which mode should I use?</Typography>
      <Typography variant="body1">
        Use the field-of-view mode when you know how wide a scene you want to capture. Use the subject-framing
        mode when you know how far away your subject will be and how large you want it to appear in the frame,
        such as for wildlife or sports photography.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/focal-length-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
            <ToggleButton value="fov">From Field of View</ToggleButton>
            <ToggleButton value="subject">From Subject Distance</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {mode === 'fov' ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="fl-preset">Sensor Size</InputLabel>
                <Select labelId="fl-preset" label="Sensor Size" value={preset} onChange={(e) => handlePresetChange(e.target.value)}>
                  {Object.entries(PRESETS).map(([key, p]) => (
                    <MenuItem key={key} value={key}>{p.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Sensor Width (mm)"
                type="number"
                fullWidth
                value={sensorWidth}
                onChange={(e) => { setSensorWidth(e.target.value); setPreset('custom'); }}
                onFocus={(e) => e.target.select()}
              />
              <TextField
                label="Desired Horizontal Field of View (degrees)"
                type="number"
                fullWidth
                value={fov}
                onChange={(e) => setFov(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </Stack>
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Required Focal Length</Typography>
              <Typography variant="h3" color="primary" fontWeight={800}>
                {fovResult !== null ? `${fovResult.toFixed(1)} mm` : '—'}
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
            <Stack spacing={2}>
              <TextField
                label="Subject Distance (m)"
                type="number"
                fullWidth
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <TextField
                label="Real Subject Size (m)"
                type="number"
                fullWidth
                value={subjectSize}
                onChange={(e) => setSubjectSize(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <TextField
                label="Desired Image Size on Sensor (mm)"
                type="number"
                fullWidth
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </Stack>
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Required Focal Length</Typography>
              <Typography variant="h3" color="primary" fontWeight={800}>
                {subjectResult !== null ? `${subjectResult.toFixed(1)} mm` : '—'}
              </Typography>
            </Paper>
          </Box>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FocalLengthCalculator;
