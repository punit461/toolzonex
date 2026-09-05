'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, MenuItem, Select, Button, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Status = 'Want to Watch' | 'Watched';

interface Movie {
  id: number;
  title: string;
  status: Status;
  rating: number;
  notes: string;
}

let nextId = 300;

const STATUS_OPTIONS: Status[] = ['Want to Watch', 'Watched'];

const DEFAULT_MOVIES: Movie[] = [
  { id: 1, title: 'Inception', status: 'Watched', rating: 5, notes: '' },
  { id: 2, title: 'Dune: Part Two', status: 'Want to Watch', rating: 0, notes: '' },
];

const MovieWatchlistGeneratorContent = () => {
  const [movies, setMovies] = useState<Movie[]>(DEFAULT_MOVIES);

  const addMovie = () => setMovies((prev) => [...prev, { id: nextId++, title: '', status: 'Want to Watch', rating: 0, notes: '' }]);
  const removeMovie = (id: number) => setMovies((prev) => prev.filter((m) => m.id !== id));
  const updateMovie = (id: number, patch: Partial<Movie>) =>
    setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const grouped = useMemo(() => {
    const valid = movies.filter((m) => m.title.trim());
    return {
      'Want to Watch': valid.filter((m) => m.status === 'Want to Watch'),
      Watched: valid.filter((m) => m.status === 'Watched'),
    };
  }, [movies]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Your Movies</Typography>
        <Stack spacing={2}>
          {movies.map((m) => (
            <Paper key={m.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size="small"
                  label="Movie title"
                  value={m.title}
                  onChange={(e) => updateMovie(m.id, { title: e.target.value })}
                  sx={{ flex: 2, minWidth: 160 }}
                />
                <Select
                  size="small"
                  value={m.status}
                  onChange={(e) => updateMovie(m.id, { status: e.target.value as Status })}
                  sx={{ minWidth: 150 }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
                <IconButton onClick={() => removeMovie(m.id)} disabled={movies.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              {m.status === 'Watched' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Rating:</Typography>
                  <Rating value={m.rating} onChange={(_, v) => updateMovie(m.id, { rating: v || 0 })} />
                </Box>
              )}
              <TextField
                size="small"
                fullWidth
                placeholder="Notes (optional)"
                value={m.notes}
                onChange={(e) => updateMovie(m.id, { notes: e.target.value })}
              />
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addMovie} sx={{ mt: 2 }}>
          Add Movie
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Watchlist</Typography>
        {STATUS_OPTIONS.map((s) => (
          <Box key={s} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} color="primary.main" mb={1}>
              {s} ({grouped[s].length})
            </Typography>
            {grouped[s].length === 0 ? (
              <Typography variant="body2" color="text.secondary">No movies here yet.</Typography>
            ) : (
              <Stack spacing={1}>
                {grouped[s].map((m) => (
                  <Paper key={m.id} variant="outlined" sx={{ p: 1.5 }}>
                    <Typography fontWeight={600}>{m.title}</Typography>
                    {m.status === 'Watched' && <Rating value={m.rating} readOnly size="small" />}
                    {m.notes && <Typography variant="body2" color="text.secondary">{m.notes}</Typography>}
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

const MovieWatchlistGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Movie Watchlist Generator</Typography>
      <Typography variant="body1">
        Add each movie you want to track, set its status to &quot;Want to Watch&quot; or &quot;Watched,&quot;
        and — once marked Watched — give it a 1-to-5 star rating and any notes you like. The tool groups your
        full list into two clear sections so you can see at a glance what&apos;s still on your queue and what
        you&apos;ve already seen, complete with your own ratings.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Marking &quot;Inception&quot; as Watched with a 5-star rating and &quot;Dune: Part Two&quot; as Want to
        Watch produces a list with Inception (and its 5-star rating) under the Watched section, and Dune: Part
        Two under Want to Watch with no rating shown.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping a running queue of movies to watch on a streaming service.</li>
          <li>Tracking and rating films you&apos;ve already seen for future reference.</li>
          <li>Sharing a movie night shortlist with friends or family, separated by who has and hasn&apos;t watched what.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the star rating only appear for some movies?</strong> The rating field only shows once a movie&apos;s status is set to Watched, since you can&apos;t meaningfully rate something you haven&apos;t seen yet.</li>
          <li><strong>Can I move a movie from Want to Watch to Watched?</strong> Yes — just change its status dropdown to Watched, and a rating field will appear so you can score it before it moves into the Watched section.</li>
          <li><strong>Is my watchlist saved between visits?</strong> No — the list is generated fresh in your browser each time and resets on reload, so keep a copy elsewhere if you want it to persist.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/movie-watchlist-generator" content={content}>
      <MovieWatchlistGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MovieWatchlistGenerator;
