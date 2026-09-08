'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface FlagItem {
  name: string;
  code: string;
}

const FLAGS: FlagItem[] = [
  { name: 'United States', code: 'US' }, { name: 'Canada', code: 'CA' }, { name: 'Mexico', code: 'MX' },
  { name: 'Brazil', code: 'BR' }, { name: 'Argentina', code: 'AR' }, { name: 'United Kingdom', code: 'GB' },
  { name: 'France', code: 'FR' }, { name: 'Germany', code: 'DE' }, { name: 'Italy', code: 'IT' },
  { name: 'Spain', code: 'ES' }, { name: 'Portugal', code: 'PT' }, { name: 'Netherlands', code: 'NL' },
  { name: 'Belgium', code: 'BE' }, { name: 'Switzerland', code: 'CH' }, { name: 'Sweden', code: 'SE' },
  { name: 'Norway', code: 'NO' }, { name: 'Denmark', code: 'DK' }, { name: 'Finland', code: 'FI' },
  { name: 'Poland', code: 'PL' }, { name: 'Greece', code: 'GR' }, { name: 'Turkey', code: 'TR' },
  { name: 'Russia', code: 'RU' }, { name: 'Ukraine', code: 'UA' }, { name: 'Egypt', code: 'EG' },
  { name: 'South Africa', code: 'ZA' }, { name: 'Nigeria', code: 'NG' }, { name: 'Kenya', code: 'KE' },
  { name: 'Morocco', code: 'MA' }, { name: 'India', code: 'IN' }, { name: 'China', code: 'CN' },
  { name: 'Japan', code: 'JP' }, { name: 'South Korea', code: 'KR' }, { name: 'Thailand', code: 'TH' },
  { name: 'Vietnam', code: 'VN' }, { name: 'Indonesia', code: 'ID' }, { name: 'Philippines', code: 'PH' },
  { name: 'Australia', code: 'AU' }, { name: 'New Zealand', code: 'NZ' }, { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Israel', code: 'IL' }, { name: 'Pakistan', code: 'PK' }, { name: 'Bangladesh', code: 'BD' },
  { name: 'Ireland', code: 'IE' }, { name: 'Iceland', code: 'IS' }, { name: 'Austria', code: 'AT' },
  { name: 'Jamaica', code: 'JM' }, { name: 'Colombia', code: 'CO' }, { name: 'Chile', code: 'CL' },
  { name: 'Peru', code: 'PE' }, { name: 'Cuba', code: 'CU' }, { name: 'Singapore', code: 'SG' },
];

function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 'A'.charCodeAt(0)))
    .join('');
}

interface EmojiItem {
  emoji: string;
  name: string;
}

const EMOJIS: EmojiItem[] = [
  { emoji: '😀', name: 'Grinning Face' }, { emoji: '😂', name: 'Face with Tears of Joy' },
  { emoji: '😍', name: 'Heart Eyes' }, { emoji: '😎', name: 'Cool / Sunglasses' },
  { emoji: '😭', name: 'Loudly Crying Face' }, { emoji: '😡', name: 'Angry Face' },
  { emoji: '🤔', name: 'Thinking Face' }, { emoji: '🥳', name: 'Partying Face' },
  { emoji: '😴', name: 'Sleeping Face' }, { emoji: '🤯', name: 'Mind Blown' },
  { emoji: '🎉', name: 'Party Popper' }, { emoji: '🔥', name: 'Fire' },
  { emoji: '💯', name: 'Hundred Points' }, { emoji: '⭐', name: 'Star' },
  { emoji: '🍕', name: 'Pizza' }, { emoji: '🍔', name: 'Hamburger' },
  { emoji: '🍩', name: 'Doughnut' }, { emoji: '🍦', name: 'Ice Cream' },
  { emoji: '☕', name: 'Coffee' }, { emoji: '🍺', name: 'Beer' },
  { emoji: '🚗', name: 'Car' }, { emoji: '✈️', name: 'Airplane' },
  { emoji: '🚀', name: 'Rocket' }, { emoji: '⚽', name: 'Soccer Ball' },
  { emoji: '🏀', name: 'Basketball' }, { emoji: '🎸', name: 'Guitar' },
  { emoji: '🎮', name: 'Video Game Controller' }, { emoji: '📚', name: 'Books' },
  { emoji: '💡', name: 'Light Bulb' }, { emoji: '💰', name: 'Money Bag' },
  { emoji: '🐶', name: 'Dog' }, { emoji: '🐱', name: 'Cat' },
  { emoji: '🦁', name: 'Lion' }, { emoji: '🐘', name: 'Elephant' },
  { emoji: '🐢', name: 'Turtle' }, { emoji: '🦋', name: 'Butterfly' },
  { emoji: '🌵', name: 'Cactus' }, { emoji: '🌈', name: 'Rainbow' },
  { emoji: '☀️', name: 'Sun' }, { emoji: '❄️', name: 'Snowflake' },
  { emoji: '⚡', name: 'Lightning Bolt' }, { emoji: '🎂', name: 'Birthday Cake' },
  { emoji: '🎁', name: 'Wrapped Gift' }, { emoji: '📱', name: 'Mobile Phone' },
  { emoji: '💻', name: 'Laptop' }, { emoji: '📷', name: 'Camera' },
  { emoji: '🔑', name: 'Key' }, { emoji: '🔒', name: 'Locked' },
  { emoji: '❤️', name: 'Red Heart' }, { emoji: '👍', name: 'Thumbs Up' },
];

type Mode = 'flags' | 'emoji';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestion(mode: Mode) {
  if (mode === 'flags') {
    const shuffled = shuffle(FLAGS);
    const correct = shuffled[0];
    const wrongs = shuffled.slice(1, 4);
    const choices = shuffle([correct, ...wrongs]).map((c) => c.name);
    return { prompt: flagEmoji(correct.code), correctAnswer: correct.name, choices };
  }
  const shuffled = shuffle(EMOJIS);
  const correct = shuffled[0];
  const wrongs = shuffled.slice(1, 4);
  const choices = shuffle([correct, ...wrongs]).map((c) => c.name);
  return { prompt: correct.emoji, correctAnswer: correct.name, choices };
}

const FlagEmojiQuizGeneratorContent = () => {
  const [mode, setMode] = useState<Mode>('flags');
  const [question, setQuestion] = useState(() => buildQuestion('flags'));
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  const changeMode = (_: unknown, value: Mode | null) => {
    if (!value) return;
    setMode(value);
    setQuestion(buildQuestion(value));
    setSelected(null);
    setScore(0);
    setTotal(0);
  };

  const choose = (choice: string) => {
    if (selected) return;
    setSelected(choice);
    setTotal((t) => t + 1);
    if (choice === question.correctAnswer) setScore((s) => s + 1);
  };

  const next = () => {
    setQuestion(buildQuestion(mode));
    setSelected(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <ToggleButtonGroup value={mode} exclusive onChange={changeMode} color="primary">
        <ToggleButton value="flags">Flags</ToggleButton>
        <ToggleButton value="emoji">Emoji</ToggleButton>
      </ToggleButtonGroup>

      <Chip label={`Score: ${score} / ${total}`} color="primary" variant="outlined" />

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', width: '100%', maxWidth: 480 }}>
        <Typography sx={{ fontSize: '5rem', lineHeight: 1, mb: 1 }}>{question.prompt}</Typography>
        <Typography variant="body2" color="text.secondary">
          {mode === 'flags' ? 'Which country does this flag belong to?' : 'What is this emoji commonly called?'}
        </Typography>
      </Paper>

      <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 480 }}>
        {question.choices.map((choice) => {
          const isCorrect = choice === question.correctAnswer;
          const isSelected = choice === selected;
          let color: 'primary' | 'success' | 'error' = 'primary';
          if (selected) {
            if (isCorrect) color = 'success';
            else if (isSelected) color = 'error';
          }
          return (
            <Button
              key={choice}
              variant={selected && (isCorrect || isSelected) ? 'contained' : 'outlined'}
              color={color}
              onClick={() => choose(choice)}
              disabled={!!selected}
              fullWidth
              sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
            >
              {choice}
            </Button>
          );
        })}
      </Stack>

      {selected && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color={selected === question.correctAnswer ? 'success.main' : 'error.main'} fontWeight={700}>
            {selected === question.correctAnswer ? 'Correct!' : `Incorrect — it was "${question.correctAnswer}"`}
          </Typography>
          <Button variant="contained" onClick={next} sx={{ mt: 2 }}>
            Next Question
          </Button>
        </Box>
      )}
    </Box>
  );
};

const FlagEmojiQuizGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Flag & Emoji Quiz Generator</Typography>
      <Typography variant="body1">
        Choose a quiz mode — Flags or Emoji. In Flags mode, a country&apos;s flag is rendered as an emoji
        (computed from its ISO code via Unicode Regional Indicator Symbols) and you pick the matching
        country from four multiple-choice options: one correct answer and three random wrong ones. In Emoji
        mode, an emoji is shown and you pick its commonly-used name from four choices. Each answer is marked
        correct or incorrect immediately, and your score for the session is tracked at the top.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In Flags mode you might see 🇯🇵 with the options &quot;Japan&quot;, &quot;South Korea&quot;,
        &quot;China&quot;, and &quot;Thailand&quot; — picking &quot;Japan&quot; marks it correct and your
        score updates to reflect it.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Practicing world geography and flag recognition for a class, trivia night, or personal fun.</li>
          <li>Testing how well you know common emoji names and meanings.</li>
          <li>A quick, replayable game for classrooms, icebreakers, or casual competition with friends.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Country Flag Finder?</strong> The Country Flag Finder is a lookup tool — you search a country name and instantly see its flag, with no quiz element. This Flag & Emoji Quiz Generator is a game: it shows you a flag (or emoji) and challenges you to pick the correct answer from multiple choices, tracking your score as you go.</li>
          <li><strong>Are the wrong answer choices random each time?</strong> Yes — the three incorrect options are randomly selected from the rest of the list for every new question, so the same flag or emoji can appear with different wrong-answer combinations across attempts.</li>
          <li><strong>Does my score save between visits?</strong> No — the score only tracks your current session and resets to 0 whenever you switch between Flags and Emoji mode or reload the page.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/flag-emoji-quiz-generator" content={content}>
      <FlagEmojiQuizGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlagEmojiQuizGenerator;
