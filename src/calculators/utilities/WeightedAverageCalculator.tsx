'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Entry {
  id: string;
  value: number;
  weight: number;
}

let nextId = 4;

const WeightedAverageCalculator = () => {
  const [entries, setEntries] = useState<Entry[]>([
    { id: '1', value: 80, weight: 2 },
    { id: '2', value: 90, weight: 1 },
    { id: '3', value: 70, weight: 3 },
  ]);

  const addEntry = () => setEntries([...entries, { id: String(nextId++), value: 0, weight: 1 }]);
  const removeEntry = (id: string) => setEntries(entries.filter((e) => e.id !== id));
  const updateEntry = (id: string, field: 'value' | 'weight', val: number) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: val } : e)));
  };

  const { average, totalWeight } = useMemo(() => {
    let weightSum = 0;
    let weightedSum = 0;
    for (const e of entries) {
      const value = Number.isNaN(e.value) ? 0 : e.value;
      const weight = Number.isNaN(e.weight) ? 0 : e.weight;
      weightSum += weight;
      weightedSum += value * weight;
    }
    return { average: weightSum > 0 ? weightedSum / weightSum : 0, totalWeight: weightSum };
  }, [entries]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate a Weighted Average</Typography>
      <Typography variant="body1">
        A weighted average multiplies each value by its assigned weight before averaging, so values with a
        larger weight count for more in the final result than values with a smaller weight. Add each
        value/weight pair below and the total weighted average updates automatically.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Weighted Average = Σ(Value × Weight) ÷ Σ(Weight)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Three values — 80 with weight 2, 90 with weight 1, and 70 with weight 3 — give a weighted average of
        (80×2 + 90×1 + 70×3) ÷ (2+1+3) = 460 ÷ 6 ≈ 76.67, which differs from the plain average of the three
        values (80) because the lower value (70) carries more weight.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating the average purchase price of a stock or asset bought in multiple lots.</li>
          <li>Combining survey or review scores where some responses carry more weight than others.</li>
          <li>Blending interest rates across loans or accounts of different sizes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between a weighted average and a simple average?</Typography>
      <Typography variant="body1">
        A simple average treats every value equally, dividing the sum of values by the count of values. A
        weighted average instead gives each value an explicit importance (its weight), so values with larger
        weights pull the result toward themselves more strongly.
      </Typography>
      <Typography variant="h3">Do the weights need to add up to 100 or 1?</Typography>
      <Typography variant="body1">
        No — the formula divides by the total weight you enter, so it works correctly whether your weights are
        percentages, counts, dollar amounts, or any other consistent unit, regardless of what they sum to.
      </Typography>
      <Typography variant="h3">What happens if a weight is zero?</Typography>
      <Typography variant="body1">
        A row with a weight of zero is effectively excluded from the result, since it contributes nothing to
        either the weighted sum or the total weight. Negative weights aren&apos;t meaningful for a typical
        weighted average and should be avoided.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/weighted-average-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Value / Weight Pairs</Typography>
          <Stack spacing={2}>
            {entries.map((entry, index) => (
              <Stack key={entry.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 28, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Value" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(entry.value) ? '' : entry.value}
                  onChange={(e) => updateEntry(entry.id, 'value', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <TextField
                  label="Weight" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(entry.weight) ? '' : entry.weight}
                  onChange={(e) => updateEntry(entry.id, 'weight', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <IconButton color="error" size="small" onClick={() => removeEntry(entry.id)} disabled={entries.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addEntry} sx={{ mt: 2 }}>Add Entry</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Weighted Average</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{average.toFixed(4)}</Typography>
          <Typography variant="caption" color="text.secondary">Total weight: {totalWeight}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WeightedAverageCalculator;
