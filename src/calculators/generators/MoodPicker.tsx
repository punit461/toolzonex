'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface MoodInfo {
  mood: string;
  emoji: string;
  responses: string[];
}

const MOODS: MoodInfo[] = [
  {
    mood: 'Happy', emoji: '😄',
    responses: [
      "Ride this feeling — write down what caused it so you can revisit it later.",
      "Share the good mood with someone else; happiness tends to multiply when it's passed along.",
      "Take a moment to actually notice how this feels, rather than rushing past it.",
    ],
  },
  {
    mood: 'Sad', emoji: '😢',
    responses: [
      "It's okay to sit with this feeling for a bit — sadness doesn't need to be fixed immediately.",
      "Reach out to someone you trust, even just to say you're having a hard time.",
      "Try a small comforting ritual — a warm drink, a favorite blanket, a familiar song.",
    ],
  },
  {
    mood: 'Anxious', emoji: '😰',
    responses: [
      "Try box breathing: inhale for 4 counts, hold for 4, exhale for 4, hold for 4, and repeat a few times.",
      "Write down what's worrying you — naming it specifically can make it feel more manageable.",
      "Ground yourself by naming 5 things you can see, 4 you can hear, and 3 you can touch right now.",
    ],
  },
  {
    mood: 'Excited', emoji: '🤩',
    responses: [
      "Channel this energy into starting something you've been putting off.",
      "Tell someone about what's exciting you — enthusiasm is more fun when it's shared.",
      "Jot down what you're looking forward to so you can look back on it later.",
    ],
  },
  {
    mood: 'Tired', emoji: '😴',
    responses: [
      "Give yourself permission to rest without guilt, even for just 10 minutes.",
      "Drink a glass of water and step away from screens for a few minutes.",
      "If a full break isn't possible right now, pick the smallest possible next task instead of the biggest.",
    ],
  },
  {
    mood: 'Angry', emoji: '😠',
    responses: [
      "Step away from the situation for a few minutes before responding to anything.",
      "Try physically releasing the tension — a short walk, some stretching, or a few deep breaths.",
      "Write down exactly what's bothering you before deciding whether or how to address it.",
    ],
  },
  {
    mood: 'Calm', emoji: '😌',
    responses: [
      "Use this steady moment to plan something that usually feels harder when you're stressed.",
      "Take a mental note of what helped you get here, so you can return to it later.",
      "Enjoy it without overthinking it — calm doesn't need to be justified.",
    ],
  },
  {
    mood: 'Stressed', emoji: '😫',
    responses: [
      "Pick just one task to focus on next, instead of trying to tackle everything at once.",
      "Take a short break — even five minutes away from the source of stress can help reset your focus.",
      "Write a quick list of what's on your plate; stress often feels worse when it's all just floating in your head.",
    ],
  },
];

const MoodPickerContent = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const info = selected !== null ? MOODS[selected] : null;

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight={600} mb={1}>How are you feeling right now?</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 3 }}>
        {MOODS.map((m, idx) => (
          <Button
            key={m.mood}
            variant={selected === idx ? 'contained' : 'outlined'}
            onClick={() => setSelected(idx)}
            sx={{ fontSize: '1rem' }}
          >
            {m.emoji} {m.mood}
          </Button>
        ))}
      </Box>

      {info && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            {info.emoji} Feeling {info.mood}
          </Typography>
          <Stack spacing={1.5}>
            {info.responses.map((r, i) => (
              <Typography key={i} variant="body1">• {r}</Typography>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

const MoodPicker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Mood Picker</Typography>
      <Typography variant="body1">
        Select the mood that best matches how you&apos;re feeling right now from the eight options — Happy,
        Sad, Anxious, Excited, Tired, Angry, Calm, or Stressed. The tool shows a small set of hand-written
        affirmations, suggestions, or activity ideas tailored to that specific mood.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;Anxious&quot; shows suggestions like trying box breathing, writing down what&apos;s
        worrying you, or grounding yourself using the 5-4-3 senses technique.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a quick, small suggestion when you're not sure how to handle a specific mood.</li>
          <li>Building a habit of checking in with yourself emotionally throughout the day.</li>
          <li>Finding a simple activity idea to shift or lean into your current mood.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this a substitute for professional mental health support?</strong> No — this tool offers simple, general suggestions for everyday moods, not clinical advice. If you're dealing with persistent or serious distress, please reach out to a qualified mental health professional.</li>
          <li><strong>Does the tool track my mood over time?</strong> No — the Mood Picker doesn't save or track anything; it's a simple in-the-moment tool with no persistence between visits.</li>
          <li><strong>What if my mood doesn't fit any of the eight options?</strong> Pick whichever option feels closest — most moods share some overlap with these eight categories, and the suggestions are broad enough to be useful even for a related feeling.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/mood-picker" content={content}>
      <MoodPickerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MoodPicker;
