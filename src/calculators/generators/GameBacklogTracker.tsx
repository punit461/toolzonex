'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, MenuItem, Select, Button, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Status = 'Backlog' | 'Playing' | 'Completed';

interface Game {
  id: number;
  title: string;
  platform: string;
  status: Status;
  hours: string;
  rating: number;
}

let nextId = 600;

const STATUS_OPTIONS: Status[] = ['Backlog', 'Playing', 'Completed'];

const DEFAULT_GAMES: Game[] = [
  { id: 1, title: 'The Legend of Zelda: Tears of the Kingdom', platform: 'Switch', status: 'Completed', hours: '85', rating: 5 },
  { id: 2, title: 'Baldur\'s Gate 3', platform: 'PC', status: 'Playing', hours: '40', rating: 0 },
  { id: 3, title: 'Elden Ring', platform: 'PS5', status: 'Backlog', hours: '0', rating: 0 },
];

const GameBacklogTrackerContent = () => {
  const [games, setGames] = useState<Game[]>(DEFAULT_GAMES);

  const addGame = () => setGames((prev) => [...prev, { id: nextId++, title: '', platform: '', status: 'Backlog', hours: '', rating: 0 }]);
  const removeGame = (id: number) => setGames((prev) => prev.filter((g) => g.id !== id));
  const updateGame = (id: number, patch: Partial<Game>) =>
    setGames((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  const grouped = useMemo(() => {
    const valid = games.filter((g) => g.title.trim());
    return {
      Backlog: valid.filter((g) => g.status === 'Backlog'),
      Playing: valid.filter((g) => g.status === 'Playing'),
      Completed: valid.filter((g) => g.status === 'Completed'),
    };
  }, [games]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Your Games</Typography>
        <Stack spacing={2}>
          {games.map((g) => (
            <Paper key={g.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size="small"
                  label="Game title"
                  value={g.title}
                  onChange={(e) => updateGame(g.id, { title: e.target.value })}
                  sx={{ flex: 2, minWidth: 150 }}
                />
                <TextField
                  size="small"
                  label="Platform"
                  value={g.platform}
                  onChange={(e) => updateGame(g.id, { platform: e.target.value })}
                  sx={{ flex: 1, minWidth: 100 }}
                />
                <Select
                  size="small"
                  value={g.status}
                  onChange={(e) => updateGame(g.id, { status: e.target.value as Status })}
                  sx={{ minWidth: 120 }}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
                <IconButton onClick={() => removeGame(g.id)} disabled={games.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField
                  size="small"
                  label="Est. hours played"
                  type="number"
                  value={g.hours}
                  onChange={(e) => updateGame(g.id, { hours: e.target.value })}
                  sx={{ flex: 1 }}
                />
                {g.status === 'Completed' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">Rating:</Typography>
                    <Rating value={g.rating} onChange={(_, v) => updateGame(g.id, { rating: v || 0 })} />
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addGame} sx={{ mt: 2 }}>
          Add Game
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Game Backlog</Typography>
        {STATUS_OPTIONS.map((opt) => (
          <Box key={opt} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} color="primary.main" mb={1}>
              {opt} ({grouped[opt].length})
            </Typography>
            {grouped[opt].length === 0 ? (
              <Typography variant="body2" color="text.secondary">No games here yet.</Typography>
            ) : (
              <Stack spacing={1}>
                {grouped[opt].map((g) => (
                  <Paper key={g.id} variant="outlined" sx={{ p: 1.5 }}>
                    <Typography fontWeight={600}>{g.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {g.platform}{g.hours ? ` · ${g.hours} hrs` : ''}
                    </Typography>
                    {g.status === 'Completed' && <Rating value={g.rating} readOnly size="small" />}
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const GameBacklogTracker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Game Backlog Tracker</Typography>
      <Typography variant="body1">
        Add each video game you own or want to play, along with its platform. Set its status to
        &quot;Backlog,&quot; &quot;Playing,&quot; or &quot;Completed,&quot; and track your estimated hours
        played for every game. Once a game is marked Completed, a 1-to-5 star rating field appears. The tracker
        groups your full library into three sections so your backlog stops feeling like an unmanageable pile.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Marking &quot;Elden Ring&quot; on PS5 as Backlog, &quot;Baldur&apos;s Gate 3&quot; on PC as Playing with
        40 hours logged, and &quot;Tears of the Kingdom&quot; on Switch as Completed with a 5-star rating and 85
        hours produces three organized sections, one per status.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Managing a large backlog of unplayed games across multiple platforms.</li>
          <li>Tracking how many hours you&apos;ve sunk into games you&apos;re currently playing.</li>
          <li>Rating and remembering completed games for future recommendations to friends.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the rating field only appear for Completed games?</strong> A meaningful rating usually requires having finished (or at least substantially played) a game, so the field only shows once a game&apos;s status is set to Completed.</li>
          <li><strong>Do I have to enter exact hours played?</strong> No — the hours field accepts any estimate, so a rough guess is fine if you don&apos;t track exact playtime elsewhere.</li>
          <li><strong>Can I track the same game on two different platforms separately?</strong> Yes — just add it twice with a different platform noted in each entry, since each row is tracked independently.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/game-backlog-tracker" content={content}>
      <GameBacklogTrackerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GameBacklogTracker;
