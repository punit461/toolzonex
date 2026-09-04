'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SENSORS: Record<string, { label: string; cropFactor: number }> = {
  fullFrame: { label: 'Full Frame (35mm)', cropFactor: 1.0 },
  apsc: { label: 'APS-C (1.5x, Nikon/Sony/Fuji)', cropFactor: 1.5 },
  apscCanon: { label: 'APS-C (1.6x, Canon)', cropFactor: 1.6 },
  mft: { label: 'Micro Four Thirds (2.0x)', cropFactor: 2.0 },
  oneInch: { label: '1-inch Sensor (2.7x)', cropFactor: 2.7 },
};

const BASE_COC_MM = 0.03; // circle of confusion for full-frame (35mm), in mm

function formatDistance(meters: number): string {
  if (!isFinite(meters)) return '∞';
  if (meters >= 1000) return `${(meters / 1000).toFixed(2)} km`;
  return `${meters.toFixed(2)} m`;
}

const DepthOfFieldCalculatorContent = () => {
  const [focalLength, setFocalLength] = useState('50');
  const [aperture, setAperture] = useState('2.8');
  const [distance, setDistance] = useState('5');
  const [sensor, setSensor] = useState<keyof typeof SENSORS>('fullFrame');

  const result = useMemo(() => {
    const f = parseFloat(focalLength);
    const N = parseFloat(aperture);
    const s = parseFloat(distance) * 1000; // meters -> mm
    if (!f || f <= 0 || !N || N <= 0 || !s || s <= 0) return null;

    const c = BASE_COC_MM / SENSORS[sensor].cropFactor;
    const hyperfocal = (f * f) / (N * c) + f;

    const nearMm = (hyperfocal * s) / (hyperfocal + (s - f));
    const isBeyondHyperfocal = s >= hyperfocal;
    const farMm = isBeyondHyperfocal ? Infinity : (hyperfocal * s) / (hyperfocal - (s - f));

    const near = nearMm / 1000;
    const far = isBeyondHyperfocal ? Infinity : farMm / 1000;
    const totalDof = isFinite(far) ? far - near : Infinity;

    return { near, far, totalDof, hyperfocal: hyperfocal / 1000 };
  }, [focalLength, aperture, distance, sensor]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Focal Length"
          type="number"
          fullWidth
          value={focalLength}
          onChange={(e) => setFocalLength(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">mm</InputAdornment> } }}
        />
        <TextField
          label="Aperture (f-stop)"
          type="number"
          fullWidth
          value={aperture}
          onChange={(e) => setAperture(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { startAdornment: <InputAdornment position="start">f/</InputAdornment> } }}
        />
        <TextField
          label="Subject Distance"
          type="number"
          fullWidth
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">m</InputAdornment> } }}
        />
        <FormControl fullWidth>
          <InputLabel>Camera Sensor Size</InputLabel>
          <Select label="Camera Sensor Size" value={sensor} onChange={(e) => setSensor(e.target.value as keyof typeof SENSORS)}>
            {Object.entries(SENSORS).map(([key, item]) => (
              <MenuItem key={key} value={key}>{item.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Depth of Field</Typography>
              <Typography variant="h4" fontWeight={800} color="primary.main">
                {formatDistance(result.near)} — {isFinite(result.far) ? formatDistance(result.far) : '∞'}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Total DOF: {isFinite(result.totalDof) ? formatDistance(result.totalDof) : 'Infinite (beyond hyperfocal distance)'}
                <br />
                Hyperfocal distance: {formatDistance(result.hyperfocal)}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter focal length, aperture, and subject distance</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const DepthOfFieldCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Depth of Field Is Calculated</Typography>
      <Typography variant="body1">
        Depth of field (DOF) is the range of distance in a photo that appears acceptably sharp, controlled by
        focal length, aperture (f-stop), subject distance, and sensor size. This is a different photography
        concept from exposure — for balancing brightness via aperture, shutter speed, and ISO, see our{' '}
        <a href="/utilities/exposure-calculator">Exposure Calculator</a>. This tool focuses specifically on how
        much of the scene stays in focus.
      </Typography>
      <Typography variant="body1">
        The calculator first finds the hyperfocal distance — the focus distance beyond which everything up to
        infinity stays sharp — then uses it to find the near and far limits of acceptable sharpness for your
        specific subject distance.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Hyperfocal Distance (H) = f² ÷ (N × c) + f<br />
        Near Limit = (H × s) ÷ (H + (s − f))<br />
        Far Limit = (H × s) ÷ (H − (s − f))
      </Box>
      <Typography variant="body1">
        Where f is focal length, N is the f-number, s is subject distance, and c is the circle of confusion — a
        value that depends on sensor size (smaller sensors use a smaller circle of confusion, which is why
        smaller sensors generally produce more depth of field at the same aperture).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 50mm lens at f/2.8, focused on a subject 5m away on a full-frame camera, gives a depth of field of
        roughly 4.3m to 6.1m — about 1.8m of the scene stays acceptably sharp. The same settings on a
        Micro Four Thirds camera produce a noticeably deeper zone of sharpness, since smaller sensors need less
        aperture to achieve the same depth of field.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning how much background blur (bokeh) a portrait shot will have.</li>
          <li>Making sure a landscape shot keeps foreground and background both in focus.</li>
          <li>Understanding how switching cameras or lenses changes your usual depth of field.</li>
          <li>Finding the hyperfocal distance for landscape or street photography.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does sensor size affect depth of field?</Typography>
      <Typography variant="body1">
        Smaller sensors require a shorter focal length to achieve the same field of view as a larger sensor,
        and shorter focal lengths naturally produce more depth of field at a given aperture — which is why
        phone cameras (very small sensors) struggle to produce shallow-depth-of-field background blur compared
        to full-frame cameras.
      </Typography>
      <Typography variant="h3">What is the circle of confusion?</Typography>
      <Typography variant="body1">
        The circle of confusion is the largest blur spot the human eye still perceives as a sharp point at
        normal viewing distances. It&apos;s a standardized value that scales with sensor size — this calculator
        uses 0.03mm for full-frame and scales it down proportionally for smaller sensors via their crop factor.
      </Typography>
      <Typography variant="h3">What happens if my subject distance is beyond the hyperfocal distance?</Typography>
      <Typography variant="body1">
        Once your subject distance meets or exceeds the hyperfocal distance, everything from roughly half that
        distance out to infinity is in acceptable focus — the calculator shows the far limit as infinite (∞) in
        that case.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/depth-of-field-calculator" content={content}>
      <DepthOfFieldCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DepthOfFieldCalculator;
