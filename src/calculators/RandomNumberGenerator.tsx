'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const RandomNumberGeneratorContent = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState('');

  const generateNumbers = () => {
    setError('');
    
    if (min > max) {
      setError('Minimum value cannot be greater than maximum value.');
      return;
    }
    
    if (!allowDuplicates && count > (max - min + 1)) {
      setError('Cannot generate unique numbers: count exceeds the range available.');
      return;
    }

    const newResults: number[] = [];
    
    if (allowDuplicates) {
      for (let i = 0; i < count; i++) {
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        newResults.push(rand);
      }
    } else {
      // Generate unique numbers
      const pool = new Set<number>();
      while (pool.size < count) {
        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
        pool.add(rand);
      }
      newResults.push(...Array.from(pool));
    }

    setResults(newResults);
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const copyResults = async () => {
    try {
      await navigator.clipboard.writeText(results.join(', '));
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Min Value"
            type="number"
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value) || 0)}
            fullWidth
          />
          <TextField
            label="Max Value"
            type="number"
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value) || 0)}
            fullWidth
          />
        </Box>

        <TextField
          label="How many numbers to generate?"
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{ inputProps: { min: 1, max: 10000 } }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} />}
            label="Allow duplicate numbers"
          />
        </Box>

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <Button variant="contained" onClick={generateNumbers} fullWidth size="large" startIcon={<RefreshIcon />}>
          Generate Numbers
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Generated Numbers:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResults}>
            Copy All
          </Button>
        </Box>
        
        <Paper sx={{ p: 3, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', minHeight: 200, maxHeight: 400, overflow: 'auto' }}>
          <Typography variant="h4" sx={{ wordBreak: 'break-word' }}>
            {results.join(', ')}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const RandomNumberGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Random Number Generator?</Typography>
      <Typography variant="body1">
        Set your minimum and maximum values (e.g., from 1 to 100). Choose how many numbers you want to generate at once, and decide whether you want to allow duplicate numbers in the results. Click "Generate" to instantly get your numbers.
      </Typography>

      <Typography variant="h2">Common Uses</Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>Giveaways & Raffles:</strong> Pick a random winner from a list of entries by picking a random number between 1 and the total number of participants.</li>
          <li><strong>Statistics & Research:</strong> Generate random sample sizes for data analysis.</li>
          <li><strong>Games:</strong> Roll virtual dice (1 to 6) or flip virtual coins (1 to 2).</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Random Number Generator"
      description="Generate random numbers instantly between any range. Free online RNG tool for raffles, giveaways, and statistics."
      url="/tools/random-number-generator"
      content={content}
      category="Tools"
    >
      <RandomNumberGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomNumberGenerator;
