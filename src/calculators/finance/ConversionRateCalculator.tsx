'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'rate' | 'conversions' | 'visitors';

const ConversionRateCalculator = () => {
  const [mode, setMode] = useState<Mode>('rate');
  const [conversions, setConversions] = useState('150');
  const [visitors, setVisitors] = useState('5000');
  const [targetRate, setTargetRate] = useState('5');

  const result = useMemo(() => {
    const conv = parseFloat(conversions) || 0;
    const vis = parseFloat(visitors) || 0;
    const rate = parseFloat(targetRate) || 0;

    if (mode === 'rate') {
      const conversionRate = vis > 0 ? (conv / vis) * 100 : null;
      return { conversionRate, requiredConversions: null as number | null, requiredVisitors: null as number | null };
    } else if (mode === 'conversions') {
      const requiredConversions = rate > 0 ? (vis * rate) / 100 : 0;
      return { conversionRate: null, requiredConversions, requiredVisitors: null };
    } else {
      const requiredVisitors = rate > 0 ? (conv / rate) * 100 : null;
      return { conversionRate: null, requiredConversions: null, requiredVisitors };
    }
  }, [mode, conversions, visitors, targetRate]);

  const content = (
    <>
      <Typography variant="h2">How Conversion Rate Is Calculated</Typography>
      <Typography variant="body1">
        Conversion rate measures what percentage of visitors or leads take a desired action — a
        purchase, sign-up, or other goal. This calculator supports three directions: find the
        conversion rate from conversions and visitors, find how many conversions are needed to hit a
        target rate at a given visitor count, or find how many visitors are needed to reach a target
        rate with a fixed number of conversions.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Conversion Rate = (Conversions / Visitors) × 100
        <br />
        Required Conversions = Visitors × Target Rate %
        <br />
        Required Visitors = Conversions / Target Rate %
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        150 conversions from 5,000 visitors gives a conversion rate of 3%. If the goal instead were a
        5% conversion rate with the same 5,000 visitors, you&apos;d need 250 conversions. To hit a 5%
        rate with only 150 conversions, you&apos;d need to bring visitors down to 3,000 — or improve the
        rate itself instead.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Measuring how well a landing page, funnel, or campaign converts visitors.</li>
          <li>Setting a required traffic target to hit a sales or sign-up goal.</li>
          <li>Working out how many conversions are needed to hit a target rate.</li>
          <li>Comparing conversion performance across channels or time periods.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a good conversion rate?</Typography>
      <Typography variant="body1">
        It varies enormously by industry and traffic source — e-commerce sites often see 1-4%, while a
        highly targeted email campaign or a strong landing page can convert well above 10%. Compare
        your rate against your own historical baseline more than a generic external benchmark.
      </Typography>
      <Typography variant="h3">How do I increase visitors needed for a lower rate?</Typography>
      <Typography variant="body1">
        Use the &quot;Required Visitors&quot; mode: enter your current conversions and a lower target
        rate, and the calculator shows how much traffic you&apos;d need to bring in to hit that easier
        rate with the same number of conversions.
      </Typography>
      <Typography variant="h3">Does conversion rate account for traffic quality?</Typography>
      <Typography variant="body1">
        No — it&apos;s a simple ratio and doesn&apos;t distinguish between high-intent and low-intent
        traffic. Two campaigns with identical conversion rates can have very different revenue quality
        depending on the visitors they attract.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/conversion-rate-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, val) => val && setMode(val)}
            size="small"
            fullWidth
          >
            <ToggleButton value="rate">Find Rate</ToggleButton>
            <ToggleButton value="conversions">Find Conversions</ToggleButton>
            <ToggleButton value="visitors">Find Visitors</ToggleButton>
          </ToggleButtonGroup>

          {mode !== 'conversions' && (
            <TextField
              label="Conversions"
              type="number"
              value={conversions}
              onChange={(e) => setConversions(e.target.value)}
              fullWidth
            />
          )}
          {mode !== 'visitors' && (
            <TextField
              label="Total Visitors / Leads"
              type="number"
              value={visitors}
              onChange={(e) => setVisitors(e.target.value)}
              fullWidth
            />
          )}
          {mode !== 'rate' && (
            <TextField
              label="Target Conversion Rate"
              type="number"
              value={targetRate}
              onChange={(e) => setTargetRate(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          {mode === 'rate' && (
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Conversion Rate</Typography>
              <Typography variant="h3" fontWeight="bold">
                {result.conversionRate !== null ? `${result.conversionRate.toFixed(2)}%` : '--'}
              </Typography>
            </Paper>
          )}
          {mode === 'conversions' && (
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Required Conversions</Typography>
              <Typography variant="h3" fontWeight="bold">
                {result.requiredConversions !== null ? Math.ceil(result.requiredConversions).toLocaleString() : '--'}
              </Typography>
            </Paper>
          )}
          {mode === 'visitors' && (
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Required Visitors</Typography>
              <Typography variant="h3" fontWeight="bold">
                {result.requiredVisitors !== null ? Math.ceil(result.requiredVisitors).toLocaleString() : '--'}
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ConversionRateCalculator;
