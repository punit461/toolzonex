'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function teamLetters(count: number): string[] {
  return Array.from({ length: count }, (_, i) => String.fromCharCode(65 + i));
}

const RandomTeamGeneratorContent = () => {
  const [namesInput, setNamesInput] = useState('');
  const [teamCount, setTeamCount] = useState(3);
  const [teams, setTeams] = useState<string[][]>([]);

  const generate = () => {
    const names = namesInput
      .split(/\r?\n/)
      .map((n) => n.trim())
      .filter(Boolean);
    if (names.length === 0) {
      setTeams([]);
      return;
    }
    const target = Math.min(teamCount, names.length);
    const shuffled = shuffle(names);
    const groups: string[][] = Array.from({ length: target }, () => []);
    for (let i = 0; i < shuffled.length; i++) {
      groups[i % target].push(shuffled[i]);
    }
    setTeams(groups);
  };

  const letters = teamLetters(Math.max(teams.length, 1));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">Names (one per line)</Typography>
          <TextField
            multiline
            rows={10}
            value={namesInput}
            onChange={(e) => setNamesInput(e.target.value)}
            placeholder={'Alice\nBob\nCarol\nDave\nEve\nFrank'}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">Number of teams</Typography>
          <TextField
            type="number"
            value={teamCount}
            onChange={(e) => {
              const v = Math.min(10, Math.max(2, Number(e.target.value) || 2));
              setTeamCount(v);
            }}
            inputProps={{ min: 2, max: 10 }}
            fullWidth
          />
          <Typography variant="body2" color="text.secondary">Between 2 and 10 teams.</Typography>
          <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
            Generate Teams
          </Button>
          <Button variant="outlined" onClick={generate} disabled={teams.length === 0}>
            Regenerate
          </Button>
        </Box>
      </Box>

      {teams.length > 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
          {teams.map((team, idx) => (
            <Paper
              key={idx}
              variant="outlined"
              sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, borderLeft: 4, borderColor: getColor(idx) }}
            >
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                Team {letters[idx]}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {team.map((name, i) => (
                  <Typography key={i} variant="body2">{name}</Typography>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

function getColor(idx: number) {
  const map = ['primary.main', 'secondary.main', 'success.main', 'warning.main', 'info.main', 'error.main'];
  return map[idx % map.length];
}

const RandomTeamGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How does it work?</Typography>
      <Typography variant="body1">
        Paste a list of names (one per line), choose how many teams to create (2–10), and click "Generate Teams".
        The tool shuffles everyone randomly and distributes them as evenly as possible across the teams.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 6 names and 3 teams, you get 3 teams of 2 — like Team A, Team B, and Team C each holding a random
        pair of names.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Splitting a class, workshop, or exercise group into fair random teams.</li>
          <li>Creating balanced teams for office games, sports, or trivia nights.</li>
          <li>Randomly assigning people to working groups or breakout rooms.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if there aren't enough names for all teams?</Typography>
      <Typography variant="body1">
        If you pick more teams than names, the tool only creates as many teams as there are names, so every team
        gets at least one person.
      </Typography>
      <Typography variant="h3">Are teams truly random?</Typography>
      <Typography variant="body1">
        Yes — names are shuffled using a random order and then dealt in a round-robin, so each new generation
        produces a different result.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-team-generator" content={content}>
      <RandomTeamGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomTeamGenerator;
