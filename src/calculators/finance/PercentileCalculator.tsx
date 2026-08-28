'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PercentileCalculatorContent = () => {
  const [scoresInput, setScoresInput] = useState('85, 90, 78, 92, 88, 76, 95, 89, 84, 91');
  const [targetInput, setTargetInput] = useState('89');

  const { percentileRank, countBelow, countAbove, countEqual, total, sortedScores } = useMemo(() => {
    const scores = scoresInput
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));

    const target = parseFloat(targetInput);

    if (scores.length === 0 || isNaN(target)) {
      return { percentileRank: null, countBelow: 0, countAbove: 0, countEqual: 0, total: 0, sortedScores: [] };
    }

    const sorted = [...scores].sort((a, b) => a - b);
    const below = scores.filter((s) => s < target).length;
    const equal = scores.filter((s) => s === target).length;
    const above = scores.filter((s) => s > target).length;
    const rank = ((below + 0.5 * equal) / scores.length) * 100;

    return {
      percentileRank: rank,
      countBelow: below,
      countAbove: above,
      countEqual: equal,
      total: scores.length,
      sortedScores: sorted,
    };
  }, [scoresInput, targetInput]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Scores (comma-separated)"
          value={scoresInput}
          onChange={(e) => setScoresInput(e.target.value)}
          fullWidth
          multiline
          minRows={2}
          placeholder="e.g. 85, 90, 78, 92, 88"
        />
        <TextField
          label="Target Value"
          type="number"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          fullWidth
        />
        {sortedScores.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <strong>Sorted list ({total} values):</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sortedScores.join(', ')}
            </Typography>
          </Paper>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
        {percentileRank !== null ? (
          <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Percentile Rank</Typography>
              <Typography variant="h6" fontWeight="bold">{percentileRank.toFixed(1)}th percentile</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2">Values Below Target</Typography>
              <Typography variant="body2" fontWeight="bold">{countBelow} of {total}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2">Values Equal to Target</Typography>
              <Typography variant="body2" fontWeight="bold">{countEqual} of {total}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">Values Above Target</Typography>
              <Typography variant="body2" fontWeight="bold">{countAbove} of {total}</Typography>
            </Box>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">Enter scores and a target value to see the percentile rank.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const PercentileCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the percentile calculator?</Typography>
      <Typography variant="body1">
        Enter a set of scores as comma-separated numbers, then enter the target value whose percentile rank
        you want to find. The calculator sorts the data, counts how many values fall below, equal, or above the
        target, and computes the percentile rank using the standard formula.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Percentile Rank = ((Number of values below target + 0.5 × Number equal to target) / Total values) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In the dataset 85, 90, 78, 92, 88, 76, 95, 89, 84, 91, the target value 89 has 6 values below it and
        1 equal to it. The percentile rank is ((6 + 0.5 × 1) / 10) × 100 = 65.0 — meaning 89 scores higher
        than about 65% of the dataset.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does &quot;65th percentile&quot; mean?</strong> A 65th-percentile score is higher than approximately 65% of the values in the dataset. It does not mean the score is 65 out of 100.</li>
          <li><strong>What formula is used?</strong> This calculator uses the standard percentile rank formula: (below + 0.5 × equal) / total × 100. Other methods (e.g., below / total × 100) exist and may give slightly different results.</li>
          <li><strong>Can I enter negative numbers or decimals?</strong> Yes — the calculator accepts any valid numeric values, including negatives and decimals.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a student&apos;s percentile rank on a standardized test.</li>
          <li>Comparing an individual score against a distribution of benchmark scores.</li>
          <li>Understanding where a data point falls within a dataset for performance analysis.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/percentile-calculator" content={content}>
      <PercentileCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PercentileCalculator;
