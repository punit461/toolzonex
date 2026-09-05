'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WORD_EMOJI_MAP: Record<string, string> = {
  love: '❤️', fire: '🔥', happy: '😊', sad: '😢', cat: '🐱', dog: '🐶',
  money: '💰', sun: '☀️', moon: '🌙', star: '⭐', heart: '❤️', coffee: '☕',
  pizza: '🍕', music: '🎵', book: '📖', phone: '📱', car: '🚗', house: '🏠',
  party: '🎉', sleep: '😴', laugh: '😂', cry: '😭', angry: '😠', cool: '😎',
  smile: '🙂', kiss: '😘', hug: '🤗', wink: '😉', shocked: '😱', bored: '😑',
  tired: '😪', sick: '🤒', hot: '🥵', cold: '🥶', rain: '🌧️', snow: '❄️',
  beach: '🏖️', mountain: '⛰️', tree: '🌳', flower: '🌸', ocean: '🌊', earth: '🌍',
  rocket: '🚀', plane: '✈️', train: '🚆', bike: '🚲', run: '🏃', walk: '🚶',
  gym: '🏋️', soccer: '⚽', basketball: '🏀', birthday: '🎂', gift: '🎁', friend: '🧑‍🤝‍🧑',
  king: '👑', queen: '👑', crown: '👑', diamond: '💎', clock: '⏰', idea: '💡',
  warning: '⚠️', check: '✅', cross: '❌', question: '❓', win: '🏆', game: '🎮',
};

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const WORDS_SORTED = Object.keys(WORD_EMOJI_MAP).sort((a, b) => b.length - a.length);
const MATCH_RE = new RegExp(`\\b(${WORDS_SORTED.map(escapeRegex).join('|')})\\b`, 'gi');

function convertToEmoji(text: string): string {
  return text.replace(MATCH_RE, (match) => WORD_EMOJI_MAP[match.toLowerCase()] ?? match);
}

const EmojiTextConverterContent = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => convertToEmoji(text), [text]);

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Input Text"
        placeholder="I love pizza and coffee, it makes me happy!"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={6}
        fullWidth
      />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          value={output}
          multiline
          rows={6}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Emoji-converted text will appear here..."
        />
      </Box>

      <Typography variant="body2" color="text.secondary">
        Recognizes {Object.keys(WORD_EMOJI_MAP).length} common words including: love, fire, happy, sad, cat,
        dog, money, sun, moon, star, coffee, pizza, music, book, phone, car, house, party, sleep, and more.
      </Typography>
    </Box>
  );
};

const EmojiTextConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Emoji Text Converter</Typography>
      <Typography variant="body1">
        Type or paste any text into the box, and every whole word that matches one of around 50 common words in
        the tool&apos;s built-in dictionary — like &quot;love&quot;, &quot;fire&quot;, &quot;pizza&quot;, or
        &quot;coffee&quot; — is replaced with its matching emoji. The match is case-insensitive and only replaces
        whole words, so a word like &quot;catalog&quot; is left alone even though it contains &quot;cat&quot;.
        Any word not in the dictionary passes through completely unchanged.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;I love pizza and coffee, it makes me happy!&quot; converts to &quot;I ❤️ 🍕 and ☕, it makes me
        😊!&quot; — only the recognized words are swapped for emoji.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding a playful emoji flair to a caption or message without manually hunting for each emoji.</li>
          <li>Livening up plain text for a social media post or greeting card message.</li>
          <li>Quickly previewing how a piece of text would look with common words replaced by emoji.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Random Emoji Generator?</strong> The Random Emoji Generator produces random emoji unrelated to any text you provide. This tool instead transforms EXISTING text by replacing recognized words with a matching emoji — it never picks anything at random.</li>
          <li><strong>How is this different from the Emoji Counter?</strong> The Emoji Counter analyzes emoji that are ALREADY present in text you paste in and counts them. This tool does the opposite — it adds new emoji into your text by replacing matching words, rather than counting anything that's already there.</li>
          <li><strong>What happens to words not in the dictionary?</strong> They&apos;re left exactly as typed — only whole words that exactly match one of the tool&apos;s built-in ~50 recognized words are ever replaced.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/emoji-text-converter" content={content}>
      <EmojiTextConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmojiTextConverter;
