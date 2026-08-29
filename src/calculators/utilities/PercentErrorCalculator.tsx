'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PercentErrorCalculator = () => {
  const [measured, setMeasured] = useState<string>('48');
  const [accepted, setAccepted] = useState<string>('50');

  const result = useMemo(() => {
    const m = parseFloat(measured);
    const a = parseFloat(accepted);
    if (isNaN(m) || isNaN(a) || a === 0) return null;
    const signedPct = ((m - a) / a) * 100;
    const absPct = Math.abs(signedPct);
    return { signedPct, absPct };
  }, [measured, accepted]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Percent Error</Typography>
      <Typography variant="body1">
        Percent error measures how far an experimental or measured value deviates from the theoretical or
        accepted value, expressed as a percentage of the accepted value. It&apos;s a standard way to quantify
        accuracy in a lab measurement, calculation, or estimate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Percent Error = |Measured − Accepted| / |Accepted| × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If a student measures the boiling point of water as 98°C when the accepted value is 100°C, the percent
        error is |98 − 100| / 100 × 100 = 2%. The measured value is below the accepted value, so it&apos;s
        described as a 2% underestimate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Evaluating accuracy in science lab experiments against known reference values.</li>
          <li>Comparing an estimate, forecast, or model prediction to the actual outcome.</li>
          <li>Quality control checks comparing a measured value to a specified target.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between percent error and percent difference?</Typography>
      <Typography variant="body1">
        Percent error compares a measured value against a known, accepted, or theoretical value — treating one
        value as the "truth." Percent difference instead compares two measured values of equal standing, with
        neither treated as more correct than the other.
      </Typography>
      <Typography variant="h3">Can percent error be negative?</Typography>
      <Typography variant="body1">
        The standard definition uses an absolute value, so percent error itself is always zero or positive.
        This calculator also shows the signed version so you can see whether your measured value overestimated
        or underestimated the accepted value.
      </Typography>
      <Typography variant="h3">What counts as a "good" percent error?</Typography>
      <Typography variant="body1">
        It depends entirely on the context — a percent error under 5% is often considered good in many school
        science experiments, but precision manufacturing or analytical chemistry may require far smaller
        errors, sometimes well under 1%.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/percent-error-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Measured / Experimental Value"
            type="number"
            fullWidth
            value={measured}
            onChange={(e) => setMeasured(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <TextField
            label="Theoretical / Accepted Value"
            type="number"
            fullWidth
            value={accepted}
            onChange={(e) => setAccepted(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Percent Error</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {result !== null ? `${result.absPct.toFixed(3)}%` : '—'}
          </Typography>
          {result !== null && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              {result.signedPct >= 0 ? 'Overestimate' : 'Underestimate'} by {result.absPct.toFixed(3)}%
            </Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PercentErrorCalculator;
