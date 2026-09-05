'use client';

import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Paper, Snackbar } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: { label: string; emoji: string[] }[] = [
  {
    label: 'Smileys & Emotion',
    emoji: ['😀', '😂', '🙂', '😉', '😊', '😍', '😘', '😎', '🥳', '🤔', '😢', '😭', '😡', '😱', '😴', '🥰', '😇', '🙃', '😜', '🤯'],
  },
  {
    label: 'People & Body',
    emoji: ['👍', '👎', '👏', '🙌', '🤝', '👋', '✌️', '🤞', '💪', '🙏', '👀', '🧠', '👶', '🧑', '👨', '👩', '🧓', '💃', '🕺', '🤦'],
  },
  {
    label: 'Animals & Nature',
    emoji: ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🦁', '🐯', '🐨', '🐮', '🐷', '🐸', '🐵', '🐔', '🦋', '🐝', '🌳', '🌸', '🌞'],
  },
  {
    label: 'Food & Drink',
    emoji: ['🍎', '🍌', '🍕', '🍔', '🍟', '🍣', '🍩', '🍰', '☕', '🍺', '🍷', '🥗', '🍳', '🍜', '🌮', '🍪', '🍫', '🥑', '🍇', '🍉'],
  },
  {
    label: 'Travel & Places',
    emoji: ['✈️', '🚗', '🚕', '🚀', '⛵', '🚲', '🏠', '🏰', '🗽', '🌋', '🏝️', '🗻', '🚉', '🚦', '🌉', '🏕️', '🛳️', '🚁', '🗺️', '🧳'],
  },
  {
    label: 'Activities',
    emoji: ['⚽', '🏀', '🏈', '🎾', '🎮', '🎸', '🎨', '🎬', '🎯', '🏆', '🎳', '🏄', '🚴', '🎣', '🧗', '♟️', '🎲', '🎤', '🎧', '🏋️'],
  },
  {
    label: 'Objects',
    emoji: ['💡', '📱', '💻', '📷', '🔑', '🔒', '📚', '✏️', '🎁', '🕰️', '💰', '🔨', '💊', '🧴', '🧸', '🪑', '📌', '🔋', '🧲', '🕯️'],
  },
  {
    label: 'Symbols',
    emoji: ['❤️', '⭐', '✅', '❌', '❓', '❗', '💯', '♻️', '⚠️', '🔥', '💧', '⚡', '🔴', '🟢', '🔵', '⚫', '⚪', '🔶', '🔷', '➡️'],
  },
  {
    label: 'Flags',
    emoji: ['🏳️', '🏴', '🏁', '🚩', '🇺🇸', '🇬🇧', '🇮🇳', '🇨🇦', '🇦🇺', '🇯🇵', '🇩🇪', '🇫🇷', '🇧🇷', '🇮🇹', '🇪🇸', '🇰🇷', '🇨🇳', '🇲🇽', '🇿🇦', '🇳🇿'],
  },
];

const EmojiCategoryBrowserContent = () => {
  const [tab, setTab] = useState(0);
  const [snackOpen, setSnackOpen] = useState(false);
  const [copiedEmoji, setCopiedEmoji] = useState('');

  const copyEmoji = async (emoji: string) => {
    try {
      await navigator.clipboard.writeText(emoji);
      setCopiedEmoji(emoji);
      setSnackOpen(true);
    } catch {}
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {CATEGORIES.map((c) => (
          <Tab key={c.label} label={c.label} />
        ))}
      </Tabs>

      <Grid container spacing={1.5}>
        {CATEGORIES[tab].emoji.map((e, i) => (
          <Grid item xs={3} sm={2} md={1.5} key={i}>
            <Paper
              onClick={() => copyEmoji(e)}
              sx={{ p: 1.5, textAlign: 'center', cursor: 'pointer', fontSize: '1.8rem', '&:hover': { bgcolor: 'action.hover' } }}
              variant="outlined"
            >
              {e}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackOpen}
        autoHideDuration={1500}
        onClose={() => setSnackOpen(false)}
        message={`Copied ${copiedEmoji} to clipboard`}
      />
    </Box>
  );
};

const EmojiCategoryBrowser = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Emoji Category Browser</Typography>
      <Typography variant="body1">
        Click through the category tabs — Smileys & Emotion, People & Body, Animals & Nature, Food & Drink,
        Travel & Places, Activities, Objects, Symbols, and Flags — to browse a curated selection of emoji within
        each of the standard Unicode emoji categories. Click any emoji to copy it straight to your clipboard.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking the &quot;Food & Drink&quot; tab shows a grid including 🍎, 🍕, 🍩, and ☕. Clicking 🍕 copies
        the pizza emoji directly to your clipboard, ready to paste anywhere.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Browsing emoji by theme when you don&apos;t know the exact name to search for.</li>
          <li>Quickly grabbing a themed set of emoji for a social media post or message.</li>
          <li>Exploring what emoji exist within a category you don&apos;t use often, like Flags or Objects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Unicode Character Finder?</strong> Unicode Character Finder is a keyword-based search — you type a word like &quot;heart&quot; and it searches across a curated list by name. This Emoji Category Browser is organized for BROWSING instead: you pick a standard Unicode category tab and scroll through what&apos;s in it, without needing to know a search term at all.</li>
          <li><strong>Does this include every emoji in each category?</strong> No — each category shows a genuinely useful selection of 15-25 popular emoji rather than the complete Unicode emoji set, which numbers in the thousands.</li>
          <li><strong>Does clicking an emoji copy it automatically?</strong> Yes — clicking any emoji copies it directly to your clipboard and shows a brief confirmation.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/emoji-category-browser" content={content}>
      <EmojiCategoryBrowserContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmojiCategoryBrowser;
