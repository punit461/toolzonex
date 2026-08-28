'use client';

import { useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, Stack, Chip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MAYBE_CHANCE = 0.05;

const OUTCOMES = ['Yes', 'No', 'Maybe'];

const RESULT_COLORS: Record<string, string> = {
  Yes: '#2e7d32',
  No: '#c62828',
  Maybe: '#f9a825',
};

const pickOutcome = (): string => {
  if (Math.random() < MAYBE_CHANCE) return 'Maybe';
  return Math.random() < 0.5 ? 'Yes' : 'No';
};

const YesOrNoGeneratorContent = () => {
  const [result, setResult] = useState<string | null>(null);
  const [rollKey, setRollKey] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = useCallback(() => {
    const outcome = pickOutcome();
    setResult(outcome);
    setRollKey((k) => k + 1);
    setHistory((prev) => [outcome, ...prev].slice(0, 6));
  }, []);

  const copyResult = async () => {
    if (!result) return;
    try { await navigator.clipboard.writeText(result); } catch {}
  };

  return (
    <Stack spacing={4} alignItems="center">
      <Button variant="contained" size="large" onClick={handleGenerate} sx={{ px: 6, py: 1.5 }}>
        Ask the Question
      </Button>

      {result ? (
        <Paper
          key={rollKey}
          sx={{
            width: '100%',
            maxWidth: 420,
            p: 6,
            bgcolor: RESULT_COLORS[result],
            color: 'white',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'background-color 0.4s ease',
          }}
        >
          <Typography variant="h2" fontWeight="bold" sx={{ letterSpacing: 4, textAlign: 'center' }}>
            {result.toUpperCase()}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 3 }}>
            <IconButton size="small" onClick={copyResult} sx={{ color: 'white' }} aria-label="Copy result">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleGenerate} sx={{ color: 'white' }} aria-label="Regenerate">
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      ) : (
        <Paper variant="outlined" sx={{ p: 6, width: '100%', maxWidth: 420, textAlign: 'center', bgcolor: 'action.hover' }}>
          <Typography variant="body1" color="text.secondary">
            Click the button above to get a fresh Yes or No answer.
          </Typography>
        </Paper>
      )}

      {history.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>
            Recent answers
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {history.map((h, idx) => (
              <Chip key={idx} label={h} sx={{ color: RESULT_COLORS[h], fontWeight: 600 }} variant="outlined" />
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

const YesOrNoGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Yes or No Generator Work?</Typography>
      <Typography variant="body1">
        Click the button and the generator returns an answer for any question you have in mind. It defaults
        to an even split between Yes and No, with a small chance (about 5%) of returning Maybe for those
        truly uncertain calls. No data leaves your browser — the result is purely random.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Need a quick decision? Ask "Should I order takeout tonight?" and click the button. The generator
        might answer "Yes" — or "Maybe", if the mood is undecided. Keep clicking until you have the nudge
        you need.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Breaking a tie when two options feel equally good.</li>
          <li>Adding a fun, random element to group decisions or games.</li>
          <li>Breaking out of analysis paralysis on low-stakes choices.</li>
          <li>Kicking off a brainstorm or icebreaker with a coin-flip energy.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is the result truly random?</Typography>
      <Typography variant="body1">
        Yes — every click uses a fresh random draw generated in your browser. There is no pattern or bias
        toward one answer over the other.
      </Typography>
      <Typography variant="h3">How often does "Maybe" appear?</Typography>
      <Typography variant="body1">
        "Maybe" has about a 5% chance of appearing on any click, so most of the time you will get a clear
        Yes or No. It surfaces occasionally to mirror the uncertainty of real decisions.
      </Typography>
      <Typography variant="h3">Can I use this for important decisions?</Typography>
      <Typography variant="body1">
        This tool is meant for fun and low-stakes choices. For important decisions, rely on real information
        and careful thought rather than random answers.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/yes-or-no-generator" content={content}>
      <YesOrNoGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default YesOrNoGenerator;
