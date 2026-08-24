'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, LinearProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function hashNames(a: string, b: string): number {
  const combined = [a.trim().toLowerCase(), b.trim().toLowerCase()].sort().join('+');
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash * 31 + combined.charCodeAt(i)) % 1000003;
  }
  return Math.abs(hash) % 101;
}

function getBand(score: number): { label: string; message: string } {
  if (score >= 90) return { label: 'Soulmates', message: 'Off the charts! The stars — or at least the letters in your names — say you two are practically made for each other.' };
  if (score >= 75) return { label: 'Great Connection', message: 'A strong match! There\'s clearly something special brewing between you two.' };
  if (score >= 50) return { label: 'Good Match', message: 'Solid compatibility — with a bit of effort, this could really go somewhere.' };
  if (score >= 25) return { label: 'Worth a Shot', message: 'Not the strongest score, but plenty of great relationships beat the odds. Give it a chance!' };
  return { label: "It's Complicated", message: 'The numbers say it might take some work — but hey, opposites attract sometimes.' };
}

const LoveCalculatorContent = () => {
  const [nameA, setNameA] = useState('');
  const [nameB, setNameB] = useState('');
  const [result, setResult] = useState<{ score: number; label: string; message: string } | null>(null);

  const calculate = () => {
    if (!nameA.trim() || !nameB.trim()) return;
    const score = hashNames(nameA, nameB);
    const { label, message } = getBand(score);
    setResult({ score, label, message });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', maxWidth: 500, mx: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField label="Your Name" value={nameA} onChange={(e) => setNameA(e.target.value)} fullWidth />
        <TextField label="Their Name" value={nameB} onChange={(e) => setNameB(e.target.value)} fullWidth />
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<FavoriteIcon />}
        onClick={calculate}
        disabled={!nameA.trim() || !nameB.trim()}
        sx={{ px: 6, py: 1.5, borderRadius: 8 }}
      >
        Calculate Love Percentage
      </Button>

      {result && (
        <Paper sx={{ p: 4, width: '100%', textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h3" fontWeight="800" color="error.main" sx={{ mt: 0, mb: 1 }}>
            {result.score}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={result.score}
            color="error"
            sx={{ height: 10, borderRadius: 5, mb: 2 }}
          />
          <Typography variant="h5" fontWeight="700" gutterBottom>{result.label}</Typography>
          <Typography variant="body1" color="text.secondary">{result.message}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const LoveCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Love Calculator — Name Compatibility Test</Typography>
      <Typography variant="body1">
        Enter two names and get a fun compatibility percentage, complete with a playful verdict. The same
        pair of names always produces the same result, so you can compare notes with friends.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type in both names and click "Calculate Love Percentage." The tool combines the two names into a
        deterministic score between 0% and 100%, along with a fun compatibility label.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering "Alex" and "Sam" always produces the exact same percentage and verdict every time you try
        that pair — the result depends only on the letters in the two names, not on randomness.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>A lighthearted icebreaker game with friends or at a party.</li>
          <li>Fun content for social media posts or group chats.</li>
          <li>Settling a playful debate about who's more "compatible" with whom.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this a real measure of relationship compatibility?</Typography>
      <Typography variant="body1">
        No — this is a fun novelty tool, not a scientific or psychological compatibility test. The percentage
        is generated from a simple deterministic formula based on the letters in the two names and shouldn't
        be taken as relationship advice.
      </Typography>
      <Typography variant="h3">Why do I get the same score every time for the same names?</Typography>
      <Typography variant="body1">
        The calculation is deterministic — it converts the combined names into a number using their character
        codes, so the same pair of names (in either order) always produces the same percentage.
      </Typography>
      <Typography variant="h3">Does the order I enter the names matter?</Typography>
      <Typography variant="body1">
        No — the two names are sorted before scoring, so entering "Alex, Sam" or "Sam, Alex" gives you the
        exact same result either way.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/love-calculator" content={content}>
      <LoveCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoveCalculator;
