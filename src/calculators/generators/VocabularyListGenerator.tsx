'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface VocabWord {
  id: number;
  word: string;
  definition: string;
  example: string;
}

let nextId = 1;

const DEFAULT_WORDS: VocabWord[] = [
  { id: nextId++, word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere.', example: 'Smartphones have become ubiquitous in modern life.' },
  { id: nextId++, word: 'Ephemeral', definition: 'Lasting for a very short time.', example: 'The beauty of cherry blossoms is ephemeral.' },
];

const VocabularyListGeneratorContent = () => {
  const [words, setWords] = useState<VocabWord[]>(DEFAULT_WORDS);

  const addWord = () => setWords((prev) => [...prev, { id: nextId++, word: '', definition: '', example: '' }]);
  const removeWord = (id: number) => setWords((prev) => prev.filter((w) => w.id !== id));
  const updateWord = (id: number, patch: Partial<VocabWord>) =>
    setWords((prev) => prev.map((w) => (w.id === id ? { ...w, ...patch } : w)));

  const alphabetized = useMemo(
    () =>
      words
        .filter((w) => w.word.trim())
        .slice()
        .sort((a, b) => a.word.trim().toLowerCase().localeCompare(b.word.trim().toLowerCase())),
    [words]
  );

  const copyList = async () => {
    const lines = alphabetized.map((w) => {
      let line = `${w.word} — ${w.definition}`;
      if (w.example.trim()) line += `\n    e.g. "${w.example.trim()}"`;
      return line;
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Vocabulary Words</Typography>
        <Stack spacing={2}>
          {words.map((w) => (
            <Paper key={w.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Word" value={w.word} onChange={(e) => updateWord(w.id, { word: e.target.value })} />
                <IconButton onClick={() => removeWord(w.id)} disabled={words.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField size="small" fullWidth multiline label="Definition" value={w.definition} onChange={(e) => updateWord(w.id, { definition: e.target.value })} sx={{ mb: 1 }} />
              <TextField size="small" fullWidth multiline label="Example sentence (optional)" value={w.example} onChange={(e) => updateWord(w.id, { example: e.target.value })} />
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addWord} sx={{ mt: 2 }}>
          Add Word
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Alphabetized Study List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={alphabetized.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {alphabetized.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add a word with a definition to build your study list.</Typography>
          )}
          <ol style={{ marginTop: 0, paddingLeft: 20 }}>
            {alphabetized.map((w) => (
              <li key={w.id} style={{ marginBottom: 10 }}>
                <strong>{w.word}</strong> — {w.definition}
                {w.example.trim() && (
                  <div style={{ fontStyle: 'italic', color: 'inherit', opacity: 0.8 }}>e.g. &quot;{w.example.trim()}&quot;</div>
                )}
              </li>
            ))}
          </ol>
        </Paper>
      </Box>
    </Box>
  );
};

const VocabularyListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Vocabulary List Generator</Typography>
      <Typography variant="body1">
        Add each vocabulary word along with its definition and an optional example sentence. As you add
        words, the panel on the right automatically alphabetizes them into a clean, organized study list —
        no need to sort anything yourself. Leave the word field blank to exclude an entry from the output,
        and use the Copy button to grab the finished list as plain text for a study guide, worksheet, or
        shared document.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;Ubiquitous&quot; and &quot;Ephemeral&quot; with their definitions produces an
        alphabetized list showing Ephemeral first, followed by Ubiquitous, each with its definition and
        example sentence indented underneath.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a vocabulary study sheet for a spelling bee, SAT prep, or foreign language class.</li>
          <li>Organizing new words from a reading assignment into an alphabetized reference list.</li>
          <li>Creating a shared class vocabulary list for teachers to hand out or post online.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is the example sentence required?</strong> No — the example sentence field is optional; words without one still appear in the list with just their definition.</li>
          <li><strong>Does the list re-sort automatically as I edit words?</strong> Yes — the alphabetized list on the right updates instantly whenever you add, edit, or remove a word.</li>
          <li><strong>Is my vocabulary list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/vocabulary-list-generator" content={content}>
      <VocabularyListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VocabularyListGenerator;
