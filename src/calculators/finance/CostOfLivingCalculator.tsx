'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const CostOfLivingCalculatorContent = () => {
  const [salary, setSalary] = useState('80000');
  const [currentIndex, setCurrentIndex] = useState('100');
  const [targetIndex, setTargetIndex] = useState('130');

  const result = useMemo(() => {
    const s = parseFloat(salary) || 0;
    const cur = parseFloat(currentIndex) || 0;
    const target = parseFloat(targetIndex) || 0;

    const equivalentSalary = cur > 0 ? (s * target) / cur : 0;
    const difference = equivalentSalary - s;
    const pctChange = cur > 0 ? ((target - cur) / cur) * 100 : 0;

    return { equivalentSalary, difference, pctChange };
  }, [salary, currentIndex, targetIndex]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Current Salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Current City Cost-of-Living Index"
          type="number"
          value={currentIndex}
          onChange={(e) => setCurrentIndex(e.target.value)}
          fullWidth
        />
        <TextField
          label="Target City Cost-of-Living Index"
          type="number"
          value={targetIndex}
          onChange={(e) => setTargetIndex(e.target.value)}
          fullWidth
        />
        <Typography variant="body2" color="text.secondary">
          Look up index numbers for your two cities from a public cost-of-living index source, then
          enter them here — this calculator doesn&apos;t look up city data automatically.
        </Typography>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Equivalent Salary Needed</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.equivalentSalary)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Difference From Current Salary</Typography>
          <Typography fontWeight={600} sx={{ color: result.difference >= 0 ? 'success.main' : 'error.main' }}>
            {result.difference >= 0 ? '+' : ''}{money(result.difference)}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Cost-of-Living Change</Typography>
          <Typography fontWeight={600}>{result.pctChange >= 0 ? '+' : ''}{result.pctChange.toFixed(1)}%</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const CostOfLivingCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Cost of Living Calculator Work?</Typography>
      <Typography variant="body1">
        This calculator compares two cities using their cost-of-living index numbers, which you look up
        yourself from a public cost-of-living index source and enter manually — it doesn&apos;t fetch
        live city data automatically. Enter your current salary, your current city&apos;s index, and
        your target city&apos;s index. The calculator scales your salary by the ratio of the two
        indexes (equivalent salary = current salary × target index ÷ current index) to estimate the
        salary you&apos;d need in the target city to maintain the same standard of living.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Someone earning $80,000 in a city with a cost-of-living index of 100 who&apos;s considering a
        move to a city with an index of 130 would need about $104,000 (80,000 × 130 ÷ 100) to maintain
        the same purchasing power — a difference of $24,000, reflecting a 30% higher cost of living in
        the target city.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Negotiating a salary before relocating for a new job.</li>
          <li>Comparing job offers in different cities on an equal footing.</li>
          <li>Deciding whether a remote-work relocation makes financial sense.</li>
          <li>Understanding roughly how far a given salary would stretch in a different city.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where do I find cost-of-living index numbers for a city?</Typography>
      <Typography variant="body1">
        Several public sources publish city and metro-area cost-of-living indexes, usually benchmarked
        against a baseline city or national average (often set to 100). Search for a cost-of-living
        index by city name to find current figures, and make sure both numbers you enter come from the
        same source, since different sources use different baselines and methodology.
      </Typography>
      <Typography variant="h3">Does this account for taxes?</Typography>
      <Typography variant="body1">
        No — cost-of-living indexes typically measure everyday expenses like housing, groceries,
        transportation, and utilities, not income tax rates. State and local taxes can differ
        significantly between cities and should be considered separately alongside this comparison.
      </Typography>
      <Typography variant="h3">Is a single index number enough to compare cities?</Typography>
      <Typography variant="body1">
        It&apos;s a useful starting estimate, but a single blended index can hide big differences in
        specific categories — one city might have much cheaper groceries but far more expensive
        housing. For a bigger decision, look at the category breakdown behind the index, not just the
        overall number.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/cost-of-living-calculator" content={content}>
      <CostOfLivingCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CostOfLivingCalculator;
