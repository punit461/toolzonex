'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface TireSpec {
  width: number;
  aspect: number;
  rim: number;
  sidewallIn: number;
  diameterIn: number;
  circumferenceIn: number;
}

function parseTireSize(spec: string): TireSpec | null {
  const cleaned = spec.trim().toUpperCase().replace(/\s+/g, '');
  const match = cleaned.match(/^(\d{2,3})\/(\d{2,3})R?(\d{1,2}(?:\.\d)?)$/);
  if (!match) return null;

  const width = parseFloat(match[1]);
  const aspect = parseFloat(match[2]);
  const rim = parseFloat(match[3]);
  if (width <= 0 || aspect <= 0 || rim <= 0) return null;

  const sidewallMm = width * (aspect / 100);
  const sidewallIn = sidewallMm / 25.4;
  const diameterIn = rim + 2 * sidewallIn;
  const circumferenceIn = diameterIn * Math.PI;

  return { width, aspect, rim, sidewallIn, diameterIn, circumferenceIn };
}

const TireSizeCalculatorContent = () => {
  const [spec1, setSpec1] = useState('205/55R16');
  const [spec2, setSpec2] = useState('215/45R17');

  const tire1 = useMemo(() => parseTireSize(spec1), [spec1]);
  const tire2 = useMemo(() => parseTireSize(spec2), [spec2]);

  const comparison = useMemo(() => {
    if (!tire1 || !tire2) return null;
    const diffPct = ((tire2.diameterIn - tire1.diameterIn) / tire1.diameterIn) * 100;
    const speedoErrorPct = ((tire2.diameterIn / tire1.diameterIn) - 1) * 100;
    return { diffPct, speedoErrorPct };
  }, [tire1, tire2]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <TextField
            label="Original Tire Size"
            fullWidth
            value={spec1}
            onChange={(e) => setSpec1(e.target.value)}
            placeholder="e.g. 205/55R16"
            error={spec1.trim().length > 0 && !tire1}
            helperText={spec1.trim().length > 0 && !tire1 ? 'Format: width/aspectRrim, e.g. 205/55R16' : ' '}
          />
        </Box>
        <Box>
          <TextField
            label="New Tire Size"
            fullWidth
            value={spec2}
            onChange={(e) => setSpec2(e.target.value)}
            placeholder="e.g. 215/45R17"
            error={spec2.trim().length > 0 && !tire2}
            helperText={spec2.trim().length > 0 && !tire2 ? 'Format: width/aspectRrim, e.g. 215/45R17' : ' '}
          />
        </Box>
      </Box>

      {tire1 && tire2 && comparison ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">Original Tire ({spec1})</Typography>
            <Typography variant="h5" fontWeight={700}>{tire1.diameterIn.toFixed(2)} in diameter</Typography>
            <Typography variant="body2" color="text.secondary">Sidewall height: {tire1.sidewallIn.toFixed(2)} in</Typography>
            <Typography variant="body2" color="text.secondary">Circumference: {tire1.circumferenceIn.toFixed(2)} in</Typography>
          </Paper>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">New Tire ({spec2})</Typography>
            <Typography variant="h5" fontWeight={700}>{tire2.diameterIn.toFixed(2)} in diameter</Typography>
            <Typography variant="body2" color="text.secondary">Sidewall height: {tire2.sidewallIn.toFixed(2)} in</Typography>
            <Typography variant="body2" color="text.secondary">Circumference: {tire2.circumferenceIn.toFixed(2)} in</Typography>
          </Paper>

          <Paper sx={{ p: 3, gridColumn: { md: '1 / span 2' }, bgcolor: 'action.hover' }}>
            <Typography variant="subtitle2" color="text.secondary">Overall Diameter Difference</Typography>
            <Typography variant="h4" fontWeight={800} color={Math.abs(comparison.diffPct) > 3 ? 'error.main' : 'primary.main'}>
              {comparison.diffPct >= 0 ? '+' : ''}{comparison.diffPct.toFixed(2)}%
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Speedometer error when swapping from the original to the new size: {comparison.speedoErrorPct >= 0 ? '+' : ''}{comparison.speedoErrorPct.toFixed(2)}%.
              {comparison.speedoErrorPct > 0
                ? ' Your actual speed will be higher than what the speedometer shows (it will under-read).'
                : comparison.speedoErrorPct < 0
                ? ' Your actual speed will be lower than what the speedometer shows (it will over-read).'
                : ' No speedometer error — both sizes have the same overall diameter.'}
            </Typography>
            {Math.abs(comparison.diffPct) > 3 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                A diameter difference over about 3% is generally considered outside the safe range for tire
                swaps — it can affect speedometer accuracy, ABS/traction control calibration, and clearance.
              </Alert>
            )}
          </Paper>
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Enter two valid tire sizes in the format width/aspectRrim (e.g. 205/55R16) to compare them.
        </Typography>
      )}
    </Box>
  );
};

const TireSizeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Compare Tire Sizes</Typography>
      <Typography variant="body1">
        A tire size like <code>205/55R16</code> encodes its width in millimeters (205), its aspect ratio as a
        percentage of that width (55%, giving the sidewall height), and the rim diameter in inches (16). This
        calculator parses two tire sizes, computes each one's overall diameter, and compares them — including
        the speedometer error you'd introduce by swapping from one size to the other.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Sidewall height (in) = Width (mm) × Aspect Ratio ÷ 100 ÷ 25.4<br />
        Overall Diameter (in) = Rim Diameter (in) + 2 × Sidewall Height (in)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 205/55R16 tire has a sidewall height of 205 × 0.55 ÷ 25.4 ≈ 4.44 in, giving an overall diameter of 16
        + 2 × 4.44 ≈ 24.88 in. A 215/45R17 tire works out to about 24.98 in — a difference of roughly 0.4%,
        small enough to barely register on the speedometer.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a different tire size will fit without throwing off your speedometer or odometer.</li>
          <li>Comparing a wider/lower-profile "plus size" tire option against your factory size.</li>
          <li>Verifying that a spare or replacement tire size is close enough to the original to be safe.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How much tire size difference is considered safe?</Typography>
      <Typography variant="body1">
        A common rule of thumb among tire shops is to keep the overall diameter difference within about 3% of
        the original size, to avoid meaningfully affecting speedometer accuracy, gearing, and ABS/traction
        control systems that rely on wheel speed sensors.
      </Typography>
      <Typography variant="h3">Why does my speedometer read wrong after changing tire size?</Typography>
      <Typography variant="body1">
        A speedometer is calibrated assuming a specific tire diameter and the resulting wheel rotations per
        mile. Fitting a larger-diameter tire means each rotation covers more real-world distance than the
        speedometer assumes, so it under-reads your actual speed — a smaller tire has the opposite effect and
        causes the speedometer to over-read.
      </Typography>
      <Typography variant="h3">What does the tire size notation mean?</Typography>
      <Typography variant="body1">
        In "205/55R16": 205 is the tire's width in millimeters, 55 is the aspect ratio (sidewall height as a
        percentage of that width), "R" indicates radial construction, and 16 is the wheel rim diameter in
        inches that the tire is designed to fit.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/tire-size-calculator" content={content}>
      <TireSizeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TireSizeCalculator;
