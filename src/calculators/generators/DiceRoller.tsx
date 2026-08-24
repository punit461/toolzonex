'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DIE_TYPES = [4, 6, 8, 10, 12, 20];
const DICE_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const DiceRollerContent = () => {
  const [diceCount, setDiceCount] = useState(2);
  const [dieType, setDieType] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [results, setResults] = useState<number[] | null>(null);

  const rollDice = () => {
    setRolling(true);
    setResults(null);
    setTimeout(() => {
      const rolls = Array.from({ length: diceCount }, () => Math.floor(Math.random() * dieType) + 1);
      setResults(rolls);
      setRolling(false);
    }, 500);
  };

  const total = results ? results.reduce((a, b) => a + b, 0) : null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Number of Dice</InputLabel>
          <Select value={diceCount} label="Number of Dice" onChange={(e) => setDiceCount(Number(e.target.value))}>
            {DICE_COUNTS.map((n) => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Die Type</InputLabel>
          <Select value={dieType} label="Die Type" onChange={(e) => setDieType(Number(e.target.value))}>
            {DIE_TYPES.map((d) => <MenuItem key={d} value={d}>d{d}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<CasinoIcon />}
        onClick={rollDice}
        disabled={rolling}
        sx={{ px: 6, py: 1.5, borderRadius: 8 }}
      >
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </Button>

      {results && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
            {results.map((r, i) => (
              <Paper
                key={i}
                elevation={2}
                sx={{
                  width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 2, fontSize: '1.5rem', fontWeight: 700, bgcolor: 'primary.main', color: 'white',
                }}
              >
                {r}
              </Paper>
            ))}
          </Box>
          <Typography variant="h5" fontWeight="700">
            Total: {total}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const DiceRoller = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Dice Roller</Typography>
      <Typography variant="body1">
        Roll any number of virtual dice — d4, d6, d8, d10, d12, or d20 — and get an instant randomized result
        for each die plus the total sum. Perfect for tabletop games, RPGs, or settling a quick decision.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Choose how many dice to roll and which die type you need, then click "Roll Dice." Each die's result
        appears individually along with the combined total.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Rolling 2d6 (two six-sided dice) might produce results of 4 and 5, for a total of 9 — exactly like
        rolling a pair of physical dice.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Rolling dice for tabletop RPGs like Dungeons & Dragons (d4, d8, d12, d20).</li>
          <li>Playing board games that need standard six-sided dice without a physical set.</li>
          <li>Making a quick random decision by rolling a single die.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are the dice rolls truly random?</Typography>
      <Typography variant="body1">
        Each roll uses your browser's pseudorandom number generator to pick a value uniformly between 1 and
        the die's number of sides, which is unpredictable enough for games and casual use.
      </Typography>
      <Typography variant="h3">What dice types are supported?</Typography>
      <Typography variant="body1">
        d4, d6, d8, d10, d12, and d20 — the standard set used in most tabletop RPGs and board games — with up
        to 10 dice rolled at once.
      </Typography>
      <Typography variant="h3">Can I roll dice of different types together?</Typography>
      <Typography variant="body1">
        This roller rolls a chosen quantity of one die type at a time. To combine different types (like a d20
        plus a d6), roll each type separately and add the totals together.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/dice-roller" content={content}>
      <DiceRollerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DiceRoller;
