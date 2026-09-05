'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mood = 'Chill' | 'Workout' | 'Party' | 'Focus' | 'Road Trip' | 'Sad/Emo';

const MOODS: Mood[] = ['Chill', 'Workout', 'Party', 'Focus', 'Road Trip', 'Sad/Emo'];

const PLAYLIST_NAMES: Record<Mood, string[]> = {
  Chill: [
    'Chill Vibes', 'Sunday Slowdown', 'Lazy Afternoon', 'Mellow Moments', 'Soft Focus', 'Golden Hour',
    'Easy Listening', 'Calm Waters', 'Slow Burn', 'Quiet Nights', 'Hammock Hours', 'Rainy Day Mood',
  ],
  Workout: [
    'Workout Pump', 'Beast Mode', 'Iron Anthem', 'Sweat Session', 'Max Effort', 'Gym Grind',
    'Cardio Kickstart', 'Power Hour', 'No Days Off', 'Lift Heavy', 'Rep Machine', 'Runner’s High',
  ],
  Party: [
    'Party Starters', 'Turn It Up', 'Dance Floor Fire', 'Weekend Mode', 'Bass Drop', 'Night Out Anthems',
    'Get Loud', 'Rooftop Party', 'Confetti Vibes', 'Party Till Sunrise', 'House Party Hits', 'Let Loose',
  ],
  Focus: [
    'Deep Focus', 'Flow State', 'Study Session', 'Brain Fuel', 'Quiet Concentration', 'Productivity Mode',
    'In the Zone', 'Head Down Hustle', 'Lock In', 'Steady Grind', 'Silent Study', 'Clear Mind',
  ],
  'Road Trip': [
    'Road Trip Anthems', 'Highway Hits', 'Windows Down', 'Open Road', 'Cross-Country Mix', 'Mile Marker Mix',
    'Sunset Drive', 'Backseat Sing-Alongs', 'Gas Station Snacks & Good Tunes', 'Long Drive Home', 'Scenic Route', 'Passenger Seat Playlist',
  ],
  'Sad/Emo': [
    'Late Night Feels', 'Heartbreak Hotel', 'Rainy Window Thoughts', 'Cry It Out', 'Overthinking Anthems',
    'Bittersweet', 'Missing You', 'Sad Boy Hours', 'Emotional Damage', 'Blue Mood', 'Quiet Sadness', 'Lonely Nights',
  ],
};

const PlaylistNameGeneratorContent = () => {
  const [mood, setMood] = useState<Mood>('Chill');
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    const pool = [...PLAYLIST_NAMES[mood]];
    const picks: string[] = [];
    while (picks.length < 3 && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length);
      picks.push(pool.splice(idx, 1)[0]);
    }
    setNames(picks);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5, textAlign: 'center' }}>
          Mood / Genre
        </Typography>
        <ToggleButtonGroup
          exclusive
          value={mood}
          onChange={(_, val) => {
            if (val) {
              setMood(val);
              setNames([]);
            }
          }}
          sx={{ flexWrap: 'wrap' }}
        >
          {MOODS.map((m) => (
            <ToggleButton key={m} value={m} sx={{ textTransform: 'none' }}>
              {m}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<MusicNoteIcon />} onClick={generate}>
        {names.length === 0 ? 'Generate Playlist Names' : 'Regenerate'}
      </Button>

      {names.length > 0 && (
        <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 480 }}>
          {names.map((n) => (
            <Paper key={n} variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700}>
                {n}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

const PlaylistNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Playlist Name Generator</Typography>
      <Typography variant="body1">
        Pick a mood or genre — Chill, Workout, Party, Focus, Road Trip, or Sad/Emo — and click
        &quot;Generate Playlist Names&quot; for 3 suggestions drawn from a hand-picked list written to match
        that vibe. Click &quot;Regenerate&quot; for a fresh set any time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing Chill might suggest &quot;Chill Vibes&quot;, &quot;Sunday Slowdown&quot;, and
        &quot;Golden Hour&quot;, while Workout might suggest &quot;Beast Mode&quot;, &quot;Gym Grind&quot;,
        and &quot;Power Hour&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming a new playlist on Spotify, Apple Music, or YouTube Music.</li>
          <li>Finding a fitting title for a mood-based mix you&apos;re about to share with friends.</li>
          <li>Getting inspiration when you&apos;re stuck between generic names like &quot;Mix 1&quot;.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Can I combine two moods in one playlist name?</strong> The generator only pulls from
            one mood&apos;s list per click, but nothing stops you from picking your favorite word from two
            different generated names and combining them yourself.
          </li>
          <li>
            <strong>How many names are in each mood&apos;s list?</strong> Each of the 6 moods has 12
            hand-written suggestions, and each click shows 3 of them at random.
          </li>
          <li>
            <strong>Will I run out of new suggestions?</strong> Each click reshuffles the full list for
            that mood, so you can keep regenerating to see different combinations of the 12 names.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/playlist-name-generator" content={content}>
      <PlaylistNameGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default PlaylistNameGenerator;
