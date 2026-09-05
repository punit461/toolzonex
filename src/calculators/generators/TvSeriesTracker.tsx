'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, MenuItem, Select, Button, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Status = 'Watching' | 'Completed' | 'Plan to Watch';

interface Show {
  id: number;
  title: string;
  status: Status;
  season: string;
  episode: string;
  rating: number;
}

let nextId = 500;

const STATUS_OPTIONS: Status[] = ['Watching', 'Completed', 'Plan to Watch'];

const DEFAULT_SHOWS: Show[] = [
  { id: 1, title: 'Breaking Bad', status: 'Completed', season: '', episode: '', rating: 5 },
  { id: 2, title: 'The Bear', status: 'Watching', season: '3', episode: '4', rating: 0 },
  { id: 3, title: 'Severance', status: 'Plan to Watch', season: '', episode: '', rating: 0 },
];

const TvSeriesTrackerContent = () => {
  const [shows, setShows] = useState<Show[]>(DEFAULT_SHOWS);

  const addShow = () => setShows((prev) => [...prev, { id: nextId++, title: '', status: 'Plan to Watch', season: '', episode: '', rating: 0 }]);
  const removeShow = (id: number) => setShows((prev) => prev.filter((s) => s.id !== id));
  const updateShow = (id: number, patch: Partial<Show>) =>
    setShows((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const grouped = useMemo(() => {
    const valid = shows.filter((s) => s.title.trim());
    return {
      Watching: valid.filter((s) => s.status === 'Watching'),
      Completed: valid.filter((s) => s.status === 'Completed'),
      'Plan to Watch': valid.filter((s) => s.status === 'Plan to Watch'),
    };
  }, [shows]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Your Shows</Typography>
        <Stack spacing={2}>
          {shows.map((s) => (
            <Paper key={s.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size="small"
                  label="Show title"
                  value={s.title}
                  onChange={(e) => updateShow(s.id, { title: e.target.value })}
                  sx={{ flex: 2, minWidth: 150 }}
                />
                <Select
                  size="small"
                  value={s.status}
                  onChange={(e) => updateShow(s.id, { status: e.target.value as Status })}
                  sx={{ minWidth: 150 }}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
                <IconButton onClick={() => removeShow(s.id)} disabled={shows.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              {s.status === 'Watching' && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    label="Current season"
                    value={s.season}
                    onChange={(e) => updateShow(s.id, { season: e.target.value })}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    size="small"
                    label="Current episode"
                    value={s.episode}
                    onChange={(e) => updateShow(s.id, { episode: e.target.value })}
                    sx={{ flex: 1 }}
                  />
                </Box>
              )}
              {s.status === 'Completed' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Rating:</Typography>
                  <Rating value={s.rating} onChange={(_, v) => updateShow(s.id, { rating: v || 0 })} />
                </Box>
              )}
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addShow} sx={{ mt: 2 }}>
          Add Show
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Series Tracker</Typography>
        {STATUS_OPTIONS.map((opt) => (
          <Box key={opt} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} color="primary.main" mb={1}>
              {opt} ({grouped[opt].length})
            </Typography>
            {grouped[opt].length === 0 ? (
              <Typography variant="body2" color="text.secondary">No shows here yet.</Typography>
            ) : (
              <Stack spacing={1}>
                {grouped[opt].map((s) => (
                  <Paper key={s.id} variant="outlined" sx={{ p: 1.5 }}>
                    <Typography fontWeight={600}>{s.title}</Typography>
                    {s.status === 'Watching' && (s.season || s.episode) && (
                      <Typography variant="body2" color="text.secondary">
                        Season {s.season || '?'}, Episode {s.episode || '?'}
                      </Typography>
                    )}
                    {s.status === 'Completed' && <Rating value={s.rating} readOnly size="small" />}
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

const TvSeriesTracker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the TV Series Tracker</Typography>
      <Typography variant="body1">
        Add each show you want to track and set its status to &quot;Watching,&quot; &quot;Completed,&quot; or
        &quot;Plan to Watch.&quot; Shows marked Watching reveal fields for your current season and episode, so
        you always remember exactly where you left off, while shows marked Completed reveal a 1-to-5 star
        rating field. The tracker groups everything into three clear sections automatically.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting &quot;The Bear&quot; to Watching with season 3, episode 4 shows that exact progress point under
        the Watching section, while &quot;Breaking Bad&quot; marked Completed with a 5-star rating appears
        under Completed with its rating, and &quot;Severance&quot; marked Plan to Watch appears under that
        section with no extra fields.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Remembering exactly which season and episode you left off on for shows you&apos;re currently watching.</li>
          <li>Keeping a queue of shows you plan to start once you finish your current one.</li>
          <li>Rating and remembering completed series for future recommendations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why do season and episode fields only appear for some shows?</strong> They only appear when a show&apos;s status is Watching, since tracking progress only makes sense for a show you&apos;re actively partway through.</li>
          <li><strong>Can I track multiple shows as Watching at once?</strong> Yes — there&apos;s no limit, so you can track your current progress across as many shows as you&apos;re actively watching in parallel.</li>
          <li><strong>Is my tracker saved between visits?</strong> No — everything is generated fresh in your browser and resets on reload, so note down your progress elsewhere if you need it to persist.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/tv-series-tracker" content={content}>
      <TvSeriesTrackerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TvSeriesTracker;
