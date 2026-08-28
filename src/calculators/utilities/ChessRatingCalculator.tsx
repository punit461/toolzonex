'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ChessRatingCalculator = () => {
  const [mode, setMode] = useState<'performance' | 'expected'>('performance');

  // Mode A - performance rating
  const [oppRating, setOppRating] = useState('1500');
  const [wins, setWins] = useState('3');
  const [draws, setDraws] = useState('1');
  const [losses, setLosses] = useState('1');

  // Mode B - expected score
  const [myRating, setMyRating] = useState('1400');
  const [vsRating, setVsRating] = useState('1500');

  const performance = useMemo(() => {
    const opp = parseFloat(oppRating) || 0;
    const w = parseFloat(wins) || 0;
    const d = parseFloat(draws) || 0;
    const l = parseFloat(losses) || 0;
    const total = w + d + l;
    if (total <= 0) return { perf: 0, score: 0, opp };
    const score = w - d - l;
    const perf = opp + (400 * score) / total;
    return { perf, score, opp, total };
  }, [oppRating, wins, draws, losses]);

  const expected = useMemo(() => {
    const my = parseFloat(myRating) || 0;
    const vs = parseFloat(vsRating) || 0;
    const expectedScore = 1 / (1 + Math.pow(10, (vs - my) / 400));
    return { expectedScore, estChange: (expectedScore - 0.5) * 16, my, vs };
  }, [myRating, vsRating]);

  const content = (
    <>
      <Typography variant="h2">How is a Chess Performance Rating Calculated?</Typography>
      <Typography variant="body1">
        A performance rating is the rating a player performed at over a set of games, derived from the average opponent rating and the results. A simple commonly used formula is:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Performance = Avg Opponent Rating + 400 × (Wins − Draws − Losses) / (Total Games)
      </Box>
      <Typography variant="body1">
        Expected Score follows the Elo model: Expected = 1 / (1 + 10^((Opponent − Yours) / 400)). An expected score above 0.5 means you're favored; below 0.5 means you're the underdog. Rating change is roughly (Score − Expected) × K-factor, commonly K = 16 or 32 for club play.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A player scores 3 wins, 1 draw, and 1 loss (~3.5/5) against opponents averaging 1500. Performance = 1500 + 400 × (3 − 1 − 1)/5 = 1500 + 80 = 1580. Expected score versus a 1500 opponent from a 1400 rating: 1/(1 + 10^((1500−1400)/400)) ≈ 0.36.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating a player's effective strength from a tournament result.</li>
          <li>Working out how much a win, draw, or loss should change your rating.</li>
          <li>Assessing whether a pairing is favorable before a match.</li>
          <li>Tracking progress after club, online, or tournament games.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a good performance rating?</Typography>
      <Typography variant="body1">
        That depends entirely on your level. A performance rating notably above your current rating signals a strong result; one below your rating signals a poor result. FIDE categories reach ~2500+ for grandmasters, while club players typically sit in the 1200–2000 range.
      </Typography>
      <Typography variant="h3">How is the rating change calculated?</Typography>
      <Typography variant="body1">
        The change is typically K × (actual score − expected score), where a win counts as 1, a draw as 0.5, and a loss as 0. Higher-rated players use a smaller K-factor so their ratings are more stable. This tool shows an estimate using K = 16.
      </Typography>
      <Typography variant="h3">Is the performance rating formula exact?</Typography>
      <Typography variant="body1">
        Official performance ratings use a more rigorous method. The formula here is a widely used, simple approximation that gives a reliable estimate for a handful of games and is ideal for quick self-assessment.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/chess-rating-calculator" content={content}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" mb={1}>Calculation Mode</Typography>
        <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth>
          <ToggleButton value="performance">Performance Rating</ToggleButton>
          <ToggleButton value="expected">Expected Score</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {mode === 'performance' ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField label="Average Opponent Rating" type="number" value={oppRating} onChange={(e) => setOppRating(e.target.value)} fullWidth />
            <TextField label="Wins" type="number" value={wins} onChange={(e) => setWins(e.target.value)} fullWidth />
            <TextField label="Draws" type="number" value={draws} onChange={(e) => setDraws(e.target.value)} fullWidth />
            <TextField label="Losses" type="number" value={losses} onChange={(e) => setLosses(e.target.value)} fullWidth />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
            <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Performance Rating</Typography>
              <Typography variant="h3" fontWeight="bold">{performance.perf.toFixed(0)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Total Games</Typography>
              <Typography fontWeight={600}>{performance.total} ({performance.score} net)</Typography>
            </Paper>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField label="Your Rating" type="number" value={myRating} onChange={(e) => setMyRating(e.target.value)} fullWidth />
            <TextField label="Opponent Rating" type="number" value={vsRating} onChange={(e) => setVsRating(e.target.value)} fullWidth />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
            <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Expected Score</Typography>
              <Typography variant="h3" fontWeight="bold">{expected.expectedScore.toFixed(2)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Rating Gap (Opp − Yours)</Typography>
              <Typography fontWeight={600}>{(expected.vs - expected.my).toFixed(0)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Rating Change if Drawn (K=16)</Typography>
              <Typography fontWeight={600}>{expected.estChange >= 0 ? '+' : ''}{expected.estChange.toFixed(1)}</Typography>
            </Paper>
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default ChessRatingCalculator;
