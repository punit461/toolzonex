'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Chip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DEFAULT_OPTIONS = ['Yes', 'No'];
const MAX_HISTORY = 8;

const RandomDecisionMakerContent = () => {
  const [text, setText] = useState('');
  const [decision, setDecision] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const options = text.trim()
    ? text.split('\n').map((line) => line.trim()).filter((line) => line.length > 0)
    : DEFAULT_OPTIONS;

  const decide = () => {
    if (options.length === 0) return;
    const pick = options[Math.floor(Math.random() * options.length)];
    setDecision(pick);
    setHistory((prev) => [pick, ...prev].slice(0, MAX_HISTORY));
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Enter your options (one per line) — leave blank for a simple Yes/No decision:
        </Typography>
        <TextField
          multiline
          rows={8}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'Pizza\nSushi\nTacos\nBurgers'}
        />
        <Typography variant="caption" color="text.secondary">
          {text.trim() ? `${options.length} option${options.length === 1 ? '' : 's'}` : 'Using default Yes/No mode'}
        </Typography>
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={decide} disabled={options.length === 0}>
          Decide
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper
          sx={{
            p: 4, textAlign: 'center', bgcolor: decision ? 'primary.main' : 'action.hover',
            color: decision ? 'white' : 'text.secondary', minHeight: 140,
            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3,
          }}
        >
          <Typography variant="h3" fontWeight={800}>
            {decision ?? 'Click Decide'}
          </Typography>
        </Paper>

        {history.length > 0 && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>Recent Decisions</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {history.map((h, idx) => (
                <Chip key={idx} label={h} variant={idx === 0 ? 'filled' : 'outlined'} color={idx === 0 ? 'primary' : 'default'} />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const RandomDecisionMaker = () => {
  const content = (
    <>
      <Typography variant="h2">Free Random Decision Maker</Typography>
      <Typography variant="body1">
        Can't decide? List your options and let this tool pick one at random. Leave the list empty for a quick
        Yes/No decision instead — either way, one click gives you an instant, unbiased answer.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type your options into the box, one per line — like a list of restaurants, movies, or tasks — and click
        "Decide" to pick one at random. If you leave the box empty, the tool defaults to a simple Yes/No
        decision. Your last few decisions are listed below so you can see what came up before.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing "Pizza", "Sushi", "Tacos", and "Burgers" (one per line) and clicking "Decide" picks one of the
        four at random with equal odds — click again for a fresh pick, and each result gets added to the recent
        decisions list.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding where to eat, what to watch, or what to do next when a group can't agree.</li>
          <li>Quickly making a simple Yes/No call when you're stuck between two options.</li>
          <li>Randomly picking who goes first, which task to tackle next, or which idea to try.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is the decision truly random?</Typography>
      <Typography variant="body1">
        Yes — every option in your list has an equal chance of being picked, using your browser's random number
        generator to make the selection.
      </Typography>
      <Typography variant="h3">Does it remember my past decisions after I close the page?</Typography>
      <Typography variant="body1">
        No — the recent decisions list is kept only for your current session in the browser tab. Refreshing or
        closing the page clears it; nothing is saved or sent to a server.
      </Typography>
      <Typography variant="h3">What happens if I don't enter any options?</Typography>
      <Typography variant="body1">
        The tool automatically falls back to a simple Yes/No decision mode, so you can use it as a quick coin
        flip alternative without typing anything first.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-decision-maker" content={content}>
      <RandomDecisionMakerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomDecisionMaker;
