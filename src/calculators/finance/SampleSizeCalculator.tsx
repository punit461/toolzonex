'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const Z: Record<string, number> = {
  '90': 1.645,
  '95': 1.96,
  '99': 2.576,
};

const SampleSizeCalculator = () => {
  const [population, setPopulation] = useState<string>('10000');
  const [confidence, setConfidence] = useState<string>('95');
  const [margin, setMargin] = useState<string>('5');

  const sampleSize = useMemo(() => {
    const N = parseFloat(population) || 0;
    const z = Z[confidence] ?? 1.96;
    const e = (parseFloat(margin) || 0) / 100;
    if (e <= 0) return 0;
    const p = 0.5;
    const n0 = (z * z * p * (1 - p)) / (e * e);
    const n = N > 0 ? n0 / (1 + (n0 - 1) / N) : n0;
    return Math.ceil(n);
  }, [population, confidence, margin]);

  const content = (
    <>
      <Typography variant="h2">What is a sample size calculator?</Typography>
      <Typography variant="body1">
        A sample size calculator tells you how many responses you need for a survey or study to be
        statistically reliable. It uses Cochran&apos;s formula and applies a finite-population correction so
        the result stays sensible for smaller populations.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        n₀ = Z² × p(1−p) ÷ e² &nbsp; (p = 0.5 worst case)
        <br />
        n = n₀ ÷ (1 + (n₀−1)/N) &nbsp; [finite-population correction]
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a population of 10,000 at 95% confidence and a 5% margin of error, you need about 370
        respondents. Narrower margins or higher confidence increase the required sample.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning market-research and customer surveys.</li>
          <li>Sizing clinical or academic studies.</li>
          <li>Estimating poll respondent counts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is p set to 0.5?</Typography>
      <Typography variant="body1">
        p = 0.5 maximizes p(1−p), giving the most conservative (largest) sample size — safest when you
        don&apos;t know the expected proportion.
      </Typography>
      <Typography variant="h3">What does the finite-population correction do?</Typography>
      <Typography variant="body1">
        For small populations it reduces the required sample below the infinite-population estimate, since
        you&apos;re sampling a meaningful fraction of the whole group.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/sample-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Population Size"
            type="number"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">N</InputAdornment> } }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="ss-conf">Confidence Level</InputLabel>
            <Select labelId="ss-conf" label="Confidence Level" value={confidence} onChange={(e) => setConfidence(e.target.value)}>
              <MenuItem value="90">90%</MenuItem>
              <MenuItem value="95">95%</MenuItem>
              <MenuItem value="99">99%</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Margin of Error"
            type="number"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Result
          </Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Required Sample Size</Typography>
            <Typography variant="h3" fontWeight="bold">{sampleSize}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default SampleSizeCalculator;
