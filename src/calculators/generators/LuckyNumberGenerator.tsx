'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Checkbox, FormControlLabel, Chip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function generateLuckyNumbers(min: number, max: number, count: number, allowDuplicates: boolean): number[] {
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  const rangeSize = hi - lo + 1;

  if (allowDuplicates || rangeSize <= count) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * rangeSize) + lo);
  }

  const pool = new Set<number>();
  while (pool.size < count) {
    pool.add(Math.floor(Math.random() * rangeSize) + lo);
  }
  return Array.from(pool);
}

const LuckyNumberGeneratorContent = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(99);
  const [count, setCount] = useState(3);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState('');

  const generate = () => {
    if (min === max && count > 1 && !allowDuplicates) {
      setError('The range only contains one number — allow duplicates or widen the range.');
      return;
    }
    if (!allowDuplicates && Math.abs(max - min) + 1 < count) {
      setError('The range is too small to fit that many unique numbers — allow duplicates or widen the range.');
      return;
    }
    setError('');
    setNumbers(generateLuckyNumbers(min, max, Math.min(Math.max(Math.round(count) || 1, 1), 20), allowDuplicates));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField label="Min" type="number" size="small" value={min} onChange={(e) => setMin(Number(e.target.value))} sx={{ width: 110 }} />
        <TextField label="Max" type="number" size="small" value={max} onChange={(e) => setMax(Number(e.target.value))} sx={{ width: 110 }} />
        <TextField
          label="How many"
          type="number"
          size="small"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          inputProps={{ min: 1, max: 20 }}
          sx={{ width: 130 }}
        />
        <FormControlLabel
          control={<Checkbox checked={allowDuplicates} onChange={(e) => setAllowDuplicates(e.target.checked)} />}
          label="Allow duplicates"
        />
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Generate
        </Button>
      </Box>

      {error && <Typography color="error.main">{error}</Typography>}

      {numbers.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {numbers.map((n, i) => (
            <Chip key={i} label={n} sx={{ fontSize: '1.3rem', fontWeight: 700, px: 2, py: 3, height: 'auto' }} color="primary" />
          ))}
        </Box>
      )}
    </Box>
  );
};

const LuckyNumberGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Lucky Number Generator Works</Typography>
      <Typography variant="body1">
        Set a minimum and maximum, choose how many lucky numbers you want, and decide whether duplicates are
        allowed. Click &quot;Generate&quot; and the tool randomly picks numbers within your range, ready for a
        lottery slip, raffle entry, or just for fun.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter a minimum and maximum value for your number range.</li>
          <li>Choose how many lucky numbers to generate (up to 20).</li>
          <li>Toggle &quot;Allow duplicates&quot; if the same number can appear more than once.</li>
          <li>Click &quot;Generate&quot; to see your lucky numbers.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a range of 1–99 and 3 numbers requested, a result might be 7, 42, and 88 — each chosen
        independently and at random within your chosen range.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking personal &quot;lucky numbers&quot; for a birthday, anniversary, or superstition.</li>
          <li>Generating numbers for a custom lottery, raffle, or office pool with a specific range.</li>
          <li>Choosing random numbers for games, giveaways, or number-guessing activities.</li>
          <li>Deciding on a random number when you just need one within specific bounds.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens if I ask for more unique numbers than fit in my range?</Typography>
      <Typography variant="body1">
        The tool shows an error asking you to either allow duplicates or widen your range, since it&apos;s not
        possible to generate that many unique numbers from a smaller pool.
      </Typography>
      <Typography variant="h3">Can duplicate numbers appear?</Typography>
      <Typography variant="body1">
        Only if you turn on &quot;Allow duplicates.&quot; With it off, every generated number in a batch is
        unique.
      </Typography>
      <Typography variant="h3">Is this connected to any real lottery?</Typography>
      <Typography variant="body1">
        No — this is an independent random number tool for personal use, games, or fun. For official lottery
        formats, see this site&apos;s dedicated Lottery Number Generator and Powerball Number Generator tools.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/lucky-number-generator" content={content}>
      <LuckyNumberGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LuckyNumberGenerator;
