'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Grid, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface NamedChar {
  char: string;
  name: string;
  keywords: string[];
}

const SYMBOLS: NamedChar[] = [
  { char: '❤️', name: 'red heart', keywords: ['heart', 'love', 'red'] },
  { char: '🧡', name: 'orange heart', keywords: ['heart', 'love', 'orange'] },
  { char: '💛', name: 'yellow heart', keywords: ['heart', 'love', 'yellow'] },
  { char: '💚', name: 'green heart', keywords: ['heart', 'love', 'green'] },
  { char: '💙', name: 'blue heart', keywords: ['heart', 'love', 'blue'] },
  { char: '💜', name: 'purple heart', keywords: ['heart', 'love', 'purple'] },
  { char: '🖤', name: 'black heart', keywords: ['heart', 'love', 'black'] },
  { char: '💔', name: 'broken heart', keywords: ['heart', 'love', 'broken', 'sad'] },
  { char: '💕', name: 'two hearts', keywords: ['heart', 'love'] },
  { char: '💖', name: 'sparkling heart', keywords: ['heart', 'love', 'sparkle'] },
  { char: '💗', name: 'growing heart', keywords: ['heart', 'love'] },
  { char: '😀', name: 'grinning face', keywords: ['smile', 'happy', 'face'] },
  { char: '😃', name: 'grinning face with big eyes', keywords: ['smile', 'happy', 'face'] },
  { char: '😄', name: 'grinning face with smiling eyes', keywords: ['smile', 'happy', 'face'] },
  { char: '😁', name: 'beaming face with smiling eyes', keywords: ['smile', 'happy', 'face'] },
  { char: '😆', name: 'grinning squinting face', keywords: ['smile', 'happy', 'laugh', 'face'] },
  { char: '😂', name: 'face with tears of joy', keywords: ['laugh', 'cry', 'happy', 'face'] },
  { char: '🙂', name: 'slightly smiling face', keywords: ['smile', 'face'] },
  { char: '😉', name: 'winking face', keywords: ['wink', 'face'] },
  { char: '😊', name: 'smiling face with smiling eyes', keywords: ['smile', 'happy', 'face'] },
  { char: '😍', name: 'smiling face with heart-eyes', keywords: ['love', 'heart', 'face', 'smile'] },
  { char: '😘', name: 'face blowing a kiss', keywords: ['kiss', 'love', 'face'] },
  { char: '😎', name: 'smiling face with sunglasses', keywords: ['cool', 'sunglasses', 'face'] },
  { char: '🥳', name: 'partying face', keywords: ['party', 'celebrate', 'face'] },
  { char: '😢', name: 'crying face', keywords: ['cry', 'sad', 'face', 'tear'] },
  { char: '😭', name: 'loudly crying face', keywords: ['cry', 'sad', 'face', 'tear'] },
  { char: '😡', name: 'pouting face', keywords: ['angry', 'mad', 'face'] },
  { char: '😱', name: 'face screaming in fear', keywords: ['scared', 'shock', 'face'] },
  { char: '🤔', name: 'thinking face', keywords: ['think', 'face', 'hmm'] },
  { char: '😴', name: 'sleeping face', keywords: ['sleep', 'tired', 'face'] },
  { char: '⭐', name: 'star', keywords: ['star'] },
  { char: '🌟', name: 'glowing star', keywords: ['star', 'sparkle', 'glow'] },
  { char: '✨', name: 'sparkles', keywords: ['sparkle', 'star', 'shine'] },
  { char: '💫', name: 'dizzy star', keywords: ['star', 'sparkle', 'dizzy'] },
  { char: '☆', name: 'white star', keywords: ['star'] },
  { char: '✓', name: 'check mark', keywords: ['check', 'tick', 'yes', 'done'] },
  { char: '✔️', name: 'heavy check mark', keywords: ['check', 'tick', 'yes', 'done'] },
  { char: '✅', name: 'white heavy check mark', keywords: ['check', 'tick', 'yes', 'done', 'green'] },
  { char: '☑️', name: 'ballot box with check', keywords: ['check', 'tick', 'box'] },
  { char: '❌', name: 'cross mark', keywords: ['cross', 'no', 'wrong', 'x'] },
  { char: '❎', name: 'cross mark button', keywords: ['cross', 'no', 'wrong', 'x'] },
  { char: '✗', name: 'ballot x', keywords: ['cross', 'no', 'wrong', 'x'] },
  { char: '➡️', name: 'right arrow', keywords: ['arrow', 'right', 'point'] },
  { char: '⬅️', name: 'left arrow', keywords: ['arrow', 'left', 'point'] },
  { char: '⬆️', name: 'up arrow', keywords: ['arrow', 'up', 'point'] },
  { char: '⬇️', name: 'down arrow', keywords: ['arrow', 'down', 'point'] },
  { char: '↔️', name: 'left-right arrow', keywords: ['arrow', 'both', 'swap'] },
  { char: '↩️', name: 'right arrow curving left', keywords: ['arrow', 'return', 'back'] },
  { char: '🔁', name: 'repeat button', keywords: ['arrow', 'repeat', 'loop', 'refresh'] },
  { char: '→', name: 'rightwards arrow', keywords: ['arrow', 'right'] },
  { char: '←', name: 'leftwards arrow', keywords: ['arrow', 'left'] },
  { char: '↑', name: 'upwards arrow', keywords: ['arrow', 'up'] },
  { char: '↓', name: 'downwards arrow', keywords: ['arrow', 'down'] },
  { char: '🔥', name: 'fire', keywords: ['fire', 'hot', 'flame'] },
  { char: '💧', name: 'droplet', keywords: ['water', 'drop', 'rain'] },
  { char: '⚡', name: 'high voltage', keywords: ['lightning', 'bolt', 'electric', 'fast'] },
  { char: '🎉', name: 'party popper', keywords: ['party', 'celebrate', 'confetti'] },
  { char: '🎊', name: 'confetti ball', keywords: ['party', 'celebrate', 'confetti'] },
  { char: '🎁', name: 'wrapped gift', keywords: ['gift', 'present', 'box'] },
  { char: '🏆', name: 'trophy', keywords: ['trophy', 'win', 'award', 'champion'] },
  { char: '🥇', name: 'gold medal', keywords: ['medal', 'win', 'first', 'award'] },
  { char: '💯', name: 'hundred points', keywords: ['hundred', '100', 'perfect'] },
  { char: '👍', name: 'thumbs up', keywords: ['thumb', 'up', 'like', 'yes', 'good'] },
  { char: '👎', name: 'thumbs down', keywords: ['thumb', 'down', 'dislike', 'no', 'bad'] },
  { char: '👏', name: 'clapping hands', keywords: ['clap', 'hands', 'applause'] },
  { char: '🙌', name: 'raising hands', keywords: ['hands', 'celebrate', 'praise'] },
  { char: '🤝', name: 'handshake', keywords: ['hands', 'deal', 'agreement'] },
  { char: '👋', name: 'waving hand', keywords: ['hand', 'wave', 'hello', 'bye'] },
  { char: '✌️', name: 'victory hand', keywords: ['hand', 'peace', 'victory'] },
  { char: '🤞', name: 'crossed fingers', keywords: ['hand', 'luck', 'hope', 'fingers'] },
  { char: '💪', name: 'flexed biceps', keywords: ['arm', 'strong', 'muscle', 'gym'] },
  { char: '🙏', name: 'folded hands', keywords: ['hands', 'pray', 'please', 'thanks'] },
  { char: '👀', name: 'eyes', keywords: ['eyes', 'look', 'see', 'watching'] },
  { char: '💤', name: 'zzz', keywords: ['sleep', 'zzz', 'tired'] },
  { char: '💡', name: 'light bulb', keywords: ['idea', 'light', 'bulb'] },
  { char: '📌', name: 'pushpin', keywords: ['pin', 'location', 'mark'] },
  { char: '📍', name: 'round pushpin', keywords: ['pin', 'location', 'map'] },
  { char: '🔒', name: 'locked', keywords: ['lock', 'secure', 'private'] },
  { char: '🔓', name: 'unlocked', keywords: ['unlock', 'open', 'secure'] },
  { char: '🔑', name: 'key', keywords: ['key', 'unlock', 'access'] },
  { char: '⏰', name: 'alarm clock', keywords: ['clock', 'time', 'alarm'] },
  { char: '⏳', name: 'hourglass not done', keywords: ['time', 'hourglass', 'wait'] },
  { char: '📅', name: 'calendar', keywords: ['calendar', 'date', 'schedule'] },
  { char: '📧', name: 'e-mail', keywords: ['email', 'mail', 'message'] },
  { char: '📱', name: 'mobile phone', keywords: ['phone', 'mobile', 'cell'] },
  { char: '💻', name: 'laptop', keywords: ['computer', 'laptop', 'tech'] },
  { char: '🌍', name: 'globe showing europe-africa', keywords: ['world', 'earth', 'globe', 'planet'] },
  { char: '☀️', name: 'sun', keywords: ['sun', 'sunny', 'weather'] },
  { char: '🌙', name: 'crescent moon', keywords: ['moon', 'night', 'sleep'] },
  { char: '☁️', name: 'cloud', keywords: ['cloud', 'weather', 'sky'] },
  { char: '🌧️', name: 'cloud with rain', keywords: ['rain', 'weather', 'cloud'] },
  { char: '❄️', name: 'snowflake', keywords: ['snow', 'winter', 'cold'] },
  { char: '🌈', name: 'rainbow', keywords: ['rainbow', 'colorful', 'weather'] },
  { char: '🎵', name: 'musical note', keywords: ['music', 'note', 'song'] },
  { char: '🎶', name: 'musical notes', keywords: ['music', 'notes', 'song'] },
  { char: '📷', name: 'camera', keywords: ['camera', 'photo', 'picture'] },
  { char: '🚀', name: 'rocket', keywords: ['rocket', 'launch', 'space'] },
  { char: '🚗', name: 'automobile', keywords: ['car', 'vehicle', 'drive'] },
  { char: '✈️', name: 'airplane', keywords: ['plane', 'flight', 'travel'] },
  { char: '🏠', name: 'house', keywords: ['house', 'home'] },
  { char: '🍕', name: 'pizza', keywords: ['pizza', 'food'] },
  { char: '🍔', name: 'hamburger', keywords: ['burger', 'food'] },
  { char: '☕', name: 'hot beverage', keywords: ['coffee', 'tea', 'drink'] },
  { char: '🎂', name: 'birthday cake', keywords: ['cake', 'birthday', 'party'] },
  { char: '💰', name: 'money bag', keywords: ['money', 'cash', 'bag'] },
  { char: '💵', name: 'dollar banknote', keywords: ['money', 'dollar', 'cash'] },
  { char: '📈', name: 'chart increasing', keywords: ['chart', 'graph', 'up', 'growth'] },
  { char: '📉', name: 'chart decreasing', keywords: ['chart', 'graph', 'down', 'decline'] },
  { char: '⚠️', name: 'warning', keywords: ['warning', 'caution', 'alert'] },
  { char: '🚫', name: 'prohibited', keywords: ['no', 'forbidden', 'stop', 'ban'] },
  { char: '❓', name: 'question mark', keywords: ['question', 'ask', 'help'] },
  { char: '❗', name: 'exclamation mark', keywords: ['exclamation', 'important', 'alert'] },
  { char: '♥', name: 'heart suit', keywords: ['heart', 'love', 'card'] },
  { char: '♦', name: 'diamond suit', keywords: ['diamond', 'card'] },
  { char: '♣', name: 'club suit', keywords: ['club', 'card'] },
  { char: '♠', name: 'spade suit', keywords: ['spade', 'card'] },
  { char: '§', name: 'section sign', keywords: ['section', 'legal'] },
  { char: '¶', name: 'pilcrow sign', keywords: ['paragraph', 'pilcrow'] },
  { char: '©', name: 'copyright sign', keywords: ['copyright'] },
  { char: '®', name: 'registered sign', keywords: ['registered', 'trademark'] },
  { char: '™', name: 'trade mark sign', keywords: ['trademark'] },
  { char: '°', name: 'degree sign', keywords: ['degree', 'temperature'] },
  { char: '∞', name: 'infinity', keywords: ['infinity', 'forever'] },
  { char: '€', name: 'euro sign', keywords: ['euro', 'currency', 'money'] },
  { char: '£', name: 'pound sign', keywords: ['pound', 'currency', 'money'] },
  { char: '¥', name: 'yen sign', keywords: ['yen', 'currency', 'money'] },
];

const UnicodeCharacterFinderContent = () => {
  const [query, setQuery] = useState('heart');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SYMBOLS.filter((s) => s.name.includes(q) || s.keywords.some((k) => k.includes(q)));
  }, [query]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <TextField
        label="Search by name or keyword"
        placeholder="e.g. heart, arrow, star, check, smile"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {query.trim() && results.length === 0 && (
        <Alert severity="info">No matching characters found. Try a broader keyword.</Alert>
      )}

      <Grid container spacing={2}>
        {results.map((s) => (
          <Grid item xs={6} sm={4} md={3} key={s.char + s.name}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '2.2rem' }}>{s.char}</Typography>
              <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5 }}>{s.name}</Typography>
              <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                U+{(s.char.codePointAt(0) ?? 0).toString(16).toUpperCase()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const UnicodeCharacterFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Unicode Character Finder Works</Typography>
      <Typography variant="body1">
        Type a keyword describing the character you&apos;re looking for — like &quot;heart&quot;,
        &quot;arrow&quot;, &quot;star&quot;, &quot;check&quot;, or &quot;smile&quot; — and the tool searches a
        curated list of roughly 130 common named symbols and emoji for matches against their name and
        associated keywords, showing every match with its character, name, and code point.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;heart&quot; returns ❤️ red heart, 💔 broken heart, 💕 two hearts, 💖 sparkling
        heart, and several more heart-related characters, each shown with its Unicode code point.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the right emoji or symbol when you only remember roughly what it looks like.</li>
          <li>Discovering related characters in the same theme, like arrows or hearts, all at once.</li>
          <li>Getting a character&apos;s code point for use in code or documentation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Unicode Character Lookup?</strong> Unicode Character Lookup is for when you already have one specific character or code point in hand and want its full details. This Unicode Character Finder is the opposite direction — you only know roughly what the character should be called or represent, and the tool helps you find it by keyword search.</li>
          <li><strong>Does this cover every emoji?</strong> No — it's a curated list of roughly 130 of the most commonly searched symbols and emoji, not the full Unicode emoji set. It's designed to quickly surface popular, everyday characters rather than being an exhaustive reference.</li>
          <li><strong>Can I search using a synonym instead of the exact name?</strong> Yes — each character has several associated keywords beyond its formal name, so searching "like" for 👍 or "money" for 💰 and 💵 will still find relevant matches.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/unicode-character-finder" content={content}>
      <UnicodeCharacterFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnicodeCharacterFinder;
