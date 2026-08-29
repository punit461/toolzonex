'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const COLUMN_RANGES: Record<string, [number, number]> = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
};
const COLUMNS = ['B', 'I', 'N', 'G', 'O'];

function pickUnique(count: number, min: number, max: number): number[] {
  const pool = new Set<number>();
  const rangeSize = max - min + 1;
  while (pool.size < count) {
    pool.add(Math.floor(Math.random() * rangeSize) + min);
  }
  return Array.from(pool);
}

function generateCard(): (number | 'FREE')[][] {
  const columns = COLUMNS.map((col) => pickUnique(5, ...COLUMN_RANGES[col]));
  const grid: (number | 'FREE')[][] = [];
  for (let row = 0; row < 5; row++) {
    grid.push(columns.map((col, colIndex) => (colIndex === 2 && row === 2 ? 'FREE' : col[row])));
  }
  return grid;
}

const BingoCardGeneratorContent = () => {
  const [card, setCard] = useState<(number | 'FREE')[][]>(() => COLUMNS.map(() => [0, 0, 0, 0, 0]));
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    setCard(generateCard());
    setGenerated(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        {generated ? 'Regenerate Card' : 'Generate Bingo Card'}
      </Button>

      {generated && (
        <Paper variant="outlined" sx={{ p: 2, maxWidth: 420, width: '100%' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0.5, mb: 0.5 }}>
            {COLUMNS.map((col) => (
              <Box key={col} sx={{ textAlign: 'center', py: 1, bgcolor: 'primary.main', color: 'common.white', borderRadius: 1, fontWeight: 800, fontSize: '1.3rem' }}>
                {col}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0.5 }}>
            {card.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Box
                  key={`${rowIndex}-${colIndex}`}
                  sx={{
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    fontWeight: cell === 'FREE' ? 700 : 500,
                    fontSize: cell === 'FREE' ? '0.75rem' : '1.1rem',
                    bgcolor: cell === 'FREE' ? 'success.light' : 'background.paper',
                  }}
                >
                  {cell}
                </Box>
              ))
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const BingoCardGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Bingo Card Generator Works</Typography>
      <Typography variant="body1">
        This tool creates a standard 5×5 bingo card following the classic B-I-N-G-O layout: column B holds
        numbers 1–15, I holds 16–30, N holds 31–45 (with a free space in the center), G holds 46–60, and O
        holds 61–75. Each column&apos;s five numbers are chosen randomly with no repeats.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click &quot;Generate Bingo Card&quot; to create a random card.</li>
          <li>The center square of the N column is a free space, marked automatically.</li>
          <li>Click &quot;Regenerate Card&quot; any time for a brand-new random card.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A generated card might have B: 3, 9, 12, 7, 14; I: 22, 18, 30, 16, 25; N: 33, 41, FREE, 38, 45; G: 52,
        48, 60, 46, 55; O: 61, 70, 66, 75, 63 — each column drawn independently from its own number range.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing quick bingo cards for a family game night, classroom activity, or party.</li>
          <li>Generating extra cards on the fly when you run out of physical ones.</li>
          <li>Creating unique cards for a fundraiser or community bingo event.</li>
          <li>Practicing or demonstrating how a standard bingo card is laid out.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are the numbers on each card unique?</Typography>
      <Typography variant="body1">
        Yes — within each column, all five numbers are unique, matching the standard rule that no number
        repeats within a single bingo card.
      </Typography>
      <Typography variant="h3">Why is the center square marked &quot;FREE&quot;?</Typography>
      <Typography variant="body1">
        The center space of a standard 5×5 bingo card is traditionally a free space that counts as
        automatically marked for every player, following the classic bingo card format.
      </Typography>
      <Typography variant="h3">Can I generate multiple different cards?</Typography>
      <Typography variant="body1">
        Yes — click &quot;Regenerate Card&quot; as many times as you like; each click produces a brand-new,
        independently randomized card.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/bingo-card-generator" content={content}>
      <BingoCardGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BingoCardGenerator;
