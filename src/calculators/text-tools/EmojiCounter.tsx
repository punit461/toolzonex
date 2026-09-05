'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{2190}-\u{21FF}\u{2300}-\u{23FF}\u{25A0}-\u{25FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;

const EmojiCounterContent = () => {
  const [text, setText] = useState('');

  const { total, breakdown } = useMemo(() => {
    if (!text) return { total: 0, breakdown: [] as [string, number][] };
    const matches = text.match(EMOJI_RE) || [];
    // Merge zero-width joiner sequences (like family emoji) is out of scope here —
    // count individual matched emoji code points, which covers the vast majority of cases.
    const filtered = matches.filter((m) => m !== '‍' && m !== '️');
    const counts: Record<string, number> = {};
    filtered.forEach((e) => {
      counts[e] = (counts[e] || 0) + 1;
    });
    const breakdown = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return { total: filtered.length, breakdown };
  }, [text]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Input text"
        placeholder="Paste text with emojis here... 😀🎉🚀"
        multiline
        rows={12}
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />

      <Box>
        <Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Total Emoji Found</Typography>
          <Typography variant="h4" fontWeight="bold">{total}</Typography>
        </Paper>

        {breakdown.length > 0 ? (
          <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 360 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Emoji</strong></TableCell>
                  <TableCell align="right"><strong>Count</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {breakdown.map(([emoji, count]) => (
                  <TableRow key={emoji} hover>
                    <TableCell sx={{ fontSize: '1.3rem' }}>{emoji}</TableCell>
                    <TableCell align="right">{count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          text && <Alert severity="info">No emoji found in this text.</Alert>
        )}
      </Box>
    </Box>
  );
};

const EmojiCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How the Emoji Counter Works</Typography>
      <Typography variant="body1">
        Paste your text into the box and the tool scans it with a broad Unicode-range regular expression
        covering common emoji blocks — including faces, symbols, and pictographs — to count every emoji
        character present. It also breaks down the result into a table showing each distinct emoji found and
        how many times it occurs.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting &quot;Great job today! 🎉🎉🚀😀&quot; shows a total of 4 emoji, with a breakdown of 🎉 (2),
        🚀 (1), and 😀 (1).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Analyzing how heavily a social media caption or message relies on emoji.</li>
          <li>Checking which specific emoji appear most often in a block of text.</li>
          <li>Auditing content style before publishing to a platform with emoji-usage guidelines.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from Remove Emojis?</strong> Remove Emojis strips emoji characters out of your text (or extracts them into a separate string) — it changes your text. This Emoji Counter only counts and analyzes the emoji already present; it never modifies your input.</li>
          <li><strong>How is this different from the Random Emoji Generator?</strong> The Random Emoji Generator creates new random emoji for you to use. This tool does the opposite — it analyzes emoji that already exist in text you provide, rather than generating anything new.</li>
          <li><strong>Does it catch every possible emoji?</strong> It covers a broad set of standard emoji Unicode ranges, which handles the large majority of emoji in everyday use. A very small number of newer or unusual composite emoji sequences may not be perfectly separated in the breakdown.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/emoji-counter" content={content}>
      <EmojiCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmojiCounter;
