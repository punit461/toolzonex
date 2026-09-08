'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type MediaType = 'movie' | 'music' | 'book';

const GENRES: Record<MediaType, string[]> = {
  movie: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Fantasy'],
  music: ['Pop', 'Rock', 'Hip-Hop', 'Jazz', 'Classical', 'Electronic', 'Country', 'R&B', 'Metal', 'Folk'],
  book: ['Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Thriller', 'Biography', 'Self-Help', 'Historical Fiction', 'Horror', 'Young Adult'],
};

const LABELS: Record<MediaType, string> = { movie: 'Movie', music: 'Music', book: 'Book' };

const GenrePickerContent = () => {
  const [mediaType, setMediaType] = useState<MediaType>('movie');
  const [genre, setGenre] = useState<string | null>(null);

  const changeMediaType = (_: unknown, value: MediaType | null) => {
    if (!value) return;
    setMediaType(value);
    setGenre(null);
  };

  const pick = () => {
    const list = GENRES[mediaType];
    setGenre(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <ToggleButtonGroup value={mediaType} exclusive onChange={changeMediaType} color="primary">
        <ToggleButton value="movie">Movie</ToggleButton>
        <ToggleButton value="music">Music</ToggleButton>
        <ToggleButton value="book">Book</ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={pick}>
        Pick a Genre
      </Button>

      {genre && (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white', width: '100%', maxWidth: 420 }}>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>Your {LABELS[mediaType]} Genre</Typography>
          <Typography variant="h4" fontWeight={800}>{genre}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const GenrePicker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Genre Picker</Typography>
      <Typography variant="body1">
        Choose a media type — Movie, Music, or Book — then click &quot;Pick a Genre&quot;. Each media type
        has its own curated list of 10 genres, and the tool picks one at random from that list. Click again
        to get a new random genre any time you want a different suggestion.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting Movie and clicking &quot;Pick a Genre&quot; might return &quot;Sci-Fi&quot; — a nudge
        toward your next movie night pick when you can&apos;t decide what to watch.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding what to watch, listen to, or read when you can&apos;t settle on a genre yourself.</li>
          <li>Adding variety to your entertainment habits by trying genres you wouldn&apos;t normally pick.</li>
          <li>Settling a group disagreement over what kind of movie, album, or book to choose next.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this tool recommend specific movies, songs, or books?</strong> No — it only picks a genre (like "Horror" or "Jazz"), not a specific title. You can then use that genre to search your favorite streaming service, library, or bookstore for something to enjoy.</li>
          <li><strong>Can I get the same genre twice in a row?</strong> Yes — each pick is fully independent and random, so repeats are possible, just like rolling a die can land on the same number twice.</li>
          <li><strong>Are the genre lists the same for all three media types?</strong> No — each media type (Movie, Music, Book) has its own genuinely distinct list of 10 genres tailored to that medium, rather than one shared generic list.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/genre-picker" content={content}>
      <GenrePickerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GenrePicker;
