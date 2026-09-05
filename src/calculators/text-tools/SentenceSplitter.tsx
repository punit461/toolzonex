'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SentenceSplitterContent = () => {
  const [text, setText] = useState(
    'This is the first sentence. Is this the second one? Yes, it certainly is!'
  );

  const sentences = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return [];
    return trimmed
      .split(/(?<=[.!?])(?:\s+|$)/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [text]);

  const copyAll = async () => {
    if (sentences.length === 0) return;
    try { await navigator.clipboard.writeText(sentences.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Paste a paragraph of text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={12}
        fullWidth
      />

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            Extracted Sentences ({sentences.length})
          </Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll} disabled={sentences.length === 0}>
            Copy All
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 260 }}>
          {sentences.length === 0 && (
            <Typography variant="body2" color="text.secondary">Enter a paragraph to see individual sentences listed here.</Typography>
          )}
          {sentences.length > 0 && (
            <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {sentences.map((s, idx) => (
                <li key={idx} style={{ marginBottom: 8 }}>
                  <Typography variant="body1">{s}</Typography>
                </li>
              ))}
            </ol>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const SentenceSplitter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Sentence Splitter</Typography>
      <Typography variant="body1">
        Paste a paragraph of text into the box on the left. The tool splits it into individual sentences using
        a simple, punctuation-based rule — it breaks the text wherever a period, exclamation mark, or question
        mark is followed by whitespace or the end of the text. Each extracted sentence is then listed as its
        own numbered item on the right, and you can copy the entire list at once with the &quot;Copy All&quot;
        button.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting &quot;This is the first sentence. Is this the second one? Yes, it certainly is!&quot; produces
        a numbered list of exactly three sentences: &quot;This is the first sentence.&quot;, &quot;Is this the
        second one?&quot;, and &quot;Yes, it certainly is!&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Breaking a long paragraph into individual sentences for editing one at a time.</li>
          <li>Extracting sentences from a block of text to build a list or dataset.</li>
          <li>Reviewing sentence-by-sentence structure when checking writing style or flow.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Sentence Counter?</strong> The <a href="/text-tools/sentence-counter">Sentence Counter</a> only reports how many sentences, words, and characters are in your text — it doesn&apos;t show you the individual sentences themselves. This Sentence Splitter's entire purpose is the opposite: producing the actual list of extracted sentences, one per line, ready to copy or review.</li>
          <li><strong>Does it handle abbreviations like &quot;Dr.&quot; or &quot;e.g.&quot; correctly?</strong> Not perfectly — this tool uses a simple punctuation rule without any special handling for abbreviations, so a period inside an abbreviation may cause an early split. This keeps the logic fast and predictable for typical writing without heavy abbreviation use.</li>
          <li><strong>Can I copy just one sentence instead of all of them?</strong> The Copy All button copies every extracted sentence at once, one per line; to copy just one, simply select and copy that sentence's text directly from the list.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/sentence-splitter" content={content}>
      <SentenceSplitterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SentenceSplitter;
