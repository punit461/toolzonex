'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, ToggleButtonGroup, ToggleButton, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'consecutive' | 'all';

function dedupeConsecutive(text: string): { result: string; removed: number } {
  const tokens = text.split(/(\s+)/); // keep whitespace tokens so spacing is preserved
  const kept: string[] = [];
  let removed = 0;
  let lastWord: string | null = null;
  for (const token of tokens) {
    if (/^\s+$/.test(token) || token === '') {
      kept.push(token);
      continue;
    }
    if (lastWord !== null && token.toLowerCase() === lastWord.toLowerCase()) {
      removed++;
      // drop this word and the whitespace token right before it (already pushed) — remove trailing space too
      if (kept.length && /^\s+$/.test(kept[kept.length - 1])) kept.pop();
      continue;
    }
    kept.push(token);
    lastWord = token;
  }
  return { result: kept.join(''), removed };
}

function dedupeAll(text: string): { result: string; removed: number } {
  const tokens = text.split(/(\s+)/);
  const seen = new Set<string>();
  const kept: string[] = [];
  let removed = 0;
  for (const token of tokens) {
    if (/^\s+$/.test(token) || token === '') {
      kept.push(token);
      continue;
    }
    const key = token.toLowerCase().replace(/[^\w']/g, '');
    if (key && seen.has(key)) {
      removed++;
      if (kept.length && /^\s+$/.test(kept[kept.length - 1])) kept.pop();
      continue;
    }
    if (key) seen.add(key);
    kept.push(token);
  }
  return { result: kept.join(''), removed };
}

const TextDeduplicatorContent = () => {
  const [text, setText] = useState('the the quick brown brown fox jumps over the lazy dog and the dog barks');
  const [mode, setMode] = useState<Mode>('consecutive');

  const { result, removed } = useMemo(() => {
    if (!text) return { result: '', removed: 0 };
    return mode === 'consecutive' ? dedupeConsecutive(text) : dedupeAll(text);
  }, [text, mode]);

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <ToggleButton value="consecutive">Consecutive Duplicates Only</ToggleButton>
          <ToggleButton value="all">All Duplicates (Keep First)</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label="Input Text"
          placeholder="Paste text with repeated words..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />
        {text && (
          <Alert severity={removed > 0 ? 'success' : 'info'}>
            Removed <strong>{removed}</strong> duplicate word{removed === 1 ? '' : 's'}.
          </Alert>
        )}
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          {result && (
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
              Copy
            </Button>
          )}
        </Box>
        <TextField
          value={result}
          multiline
          rows={12}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Deduplicated text will appear here..."
        />
      </Box>
    </Box>
  );
};

const TextDeduplicator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Text Deduplicator</Typography>
      <Typography variant="body1">
        Paste any running text into the box and choose a mode. &quot;Consecutive Duplicates Only&quot; removes a
        word only when it repeats immediately after itself (like a typo where you accidentally typed
        &quot;the the&quot;). &quot;All Duplicates&quot; scans the entire text and removes every repeated
        occurrence of a word anywhere in it, keeping only the first time each word appears. This tool works at
        the word level, on running text — it does not operate on whole lines.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;the the quick brown brown fox&quot; becomes &quot;the quick brown fox&quot; in Consecutive mode
        (only the immediately repeated &quot;the&quot; and &quot;brown&quot; are removed). In All Duplicates
        mode, &quot;the quick brown fox jumps over the lazy dog and the dog barks&quot; becomes &quot;the quick
        brown fox jumps over lazy dog and barks&quot; — every later &quot;the&quot; and &quot;dog&quot; is
        removed, keeping only the first occurrence of each.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a stuttered or accidentally doubled word after a typing mistake.</li>
          <li>Tightening repetitive writing by removing every repeated word in a paragraph.</li>
          <li>Cleaning up text pasted from voice-to-text transcription, which often repeats words.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Remove Duplicate Lines tool?</strong> Remove Duplicate Lines operates on whole LINES of text — it removes an entire line if it exactly repeats an earlier line. This Text Deduplicator instead operates on individual WORDS within running sentences and paragraphs, which is a completely different level of granularity.</li>
          <li><strong>Is word matching case-sensitive?</strong> No — matching is case-insensitive, so &quot;The&quot; and &quot;the&quot; are treated as the same word for deduplication purposes, though the first occurrence&apos;s original casing is preserved in the output.</li>
          <li><strong>Does punctuation attached to a word affect matching in All Duplicates mode?</strong> Punctuation is ignored when comparing words, so &quot;dog&quot; and &quot;dog,&quot; are treated as the same word, but the original punctuation is kept on whichever occurrence is retained.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/text-deduplicator" content={content}>
      <TextDeduplicatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextDeduplicator;
