'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup, Alert } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface LotteryFormat {
  key: string;
  label: string;
  mainCount: number;
  mainMax: number;
  bonusMax?: number;
  bonusLabel?: string;
}

const FORMATS: LotteryFormat[] = [
  { key: '6-49', label: '6 from 1–49', mainCount: 6, mainMax: 49 },
  { key: '5-70-25', label: '5 from 1–70 + 1 from 1–25', mainCount: 5, mainMax: 70, bonusMax: 25, bonusLabel: 'Bonus' },
  { key: '5-50-12', label: '5 from 1–50 + 1 from 1–12', mainCount: 5, mainMax: 50, bonusMax: 12, bonusLabel: 'Bonus' },
  { key: '6-59', label: '6 from 1–59', mainCount: 6, mainMax: 59 },
];

function pickUnique(count: number, max: number): number[] {
  const pool = new Set<number>();
  while (pool.size < count) {
    pool.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(pool).sort((a, b) => a - b);
}

const NumberBall = ({ value, variant = 'main' }: { value: number; variant?: 'main' | 'bonus' }) => (
  <Box
    sx={{
      width: 46,
      height: 46,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '1.05rem',
      bgcolor: variant === 'bonus' ? 'secondary.main' : 'background.paper',
      color: variant === 'bonus' ? 'common.white' : 'text.primary',
      border: variant === 'bonus' ? 'none' : '2px solid',
      borderColor: 'divider',
      boxShadow: 1,
    }}
  >
    {value}
  </Box>
);

const LotteryNumberGeneratorContent = () => {
  const [formatKey, setFormatKey] = useState(FORMATS[0].key);
  const [result, setResult] = useState<{ main: number[]; bonus?: number } | null>(null);

  const format = FORMATS.find((f) => f.key === formatKey) ?? FORMATS[0];

  const generate = () => {
    const main = pickUnique(format.mainCount, format.mainMax);
    const bonus = format.bonusMax ? Math.floor(Math.random() * format.bonusMax) + 1 : undefined;
    setResult({ main, bonus });
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5 }}>Choose a format</Typography>
      <ToggleButtonGroup
        exclusive
        value={formatKey}
        onChange={(_, val) => { if (val) { setFormatKey(val); setResult(null); } }}
        sx={{ flexWrap: 'wrap', mb: 3 }}
      >
        {FORMATS.map((f) => (
          <ToggleButton key={f.key} value={f.key} sx={{ textTransform: 'none' }}>
            {f.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box>
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Generate Numbers
        </Button>
      </Box>

      {result && (
        <Paper sx={{ p: 2.5, mt: 3, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          {result.main.map((n) => <NumberBall key={n} value={n} />)}
          {result.bonus !== undefined && (
            <>
              <Typography sx={{ mx: 0.5, color: 'text.secondary' }}>+</Typography>
              <NumberBall value={result.bonus} variant="bonus" />
            </>
          )}
        </Paper>
      )}

      <Alert severity="warning" sx={{ mt: 3 }}>
        For entertainment only. This tool has no connection to any official lottery operator, cannot predict
        winning numbers, and every combination has exactly the same odds. Always check your lottery&apos;s
        official rules before playing.
      </Alert>
    </Box>
  );
};

const LotteryNumberGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Lottery Number Generator Works</Typography>
      <Typography variant="body1">
        Pick a common lottery format — a classic &quot;6 from 49&quot; draw, or a main-plus-bonus format like
        &quot;5 from 70 + 1 from 25&quot; — and click &quot;Generate Numbers&quot; for a random, unique set of
        numbers matching that format. Generate again any time for a fresh set.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        This is an independent random number generator for fun and planning purposes. It is not affiliated
        with or endorsed by any specific lottery operator, and it does not predict or influence real drawing
        results.
      </Alert>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choose the lottery format that matches the game you play.</li>
          <li>Click &quot;Generate Numbers&quot; to get a random set for that format.</li>
          <li>Click again as many times as you like for a new set.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With &quot;6 from 1–49&quot; selected, a generated set might be 4, 15, 22, 29, 37, 46 — six unique
        numbers with no repeats, in ascending order.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a random ticket to play, alongside or instead of a store-bought quick pick.</li>
          <li>Picking numbers for an office pool or group play where several sets are needed.</li>
          <li>Demonstrating how a lottery-style random draw works for a class or presentation.</li>
          <li>Choosing random numbers for a raffle or game night using a similar format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these real winning numbers?</Typography>
      <Typography variant="body1">
        No — these are randomly generated for entertainment and planning purposes only. Check your lottery
        operator&apos;s official website for verified drawing results.
      </Typography>
      <Typography variant="h3">Which format should I pick?</Typography>
      <Typography variant="body1">
        Pick whichever format matches the specific game you&apos;re playing — check your lottery ticket or
        official rules for the exact number ranges and count it uses. For the well-known U.S. Powerball
        format specifically, this site also has a dedicated Powerball Number Generator.
      </Typography>
      <Typography variant="h3">Does picking my own numbers improve my odds?</Typography>
      <Typography variant="body1">
        No — every number and every combination in an official drawing has exactly the same probability of
        being drawn, whether picked by you or generated randomly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/lottery-number-generator" content={content}>
      <LotteryNumberGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LotteryNumberGenerator;
