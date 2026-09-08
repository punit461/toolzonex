'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface FlashcardPair {
  id: number;
  term: string;
  definition: string;
}

let nextId = 1;

const DEFAULT_PAIRS: FlashcardPair[] = [
  { id: nextId++, term: 'Photosynthesis', definition: 'The process by which plants convert light energy into chemical energy.' },
  { id: nextId++, term: 'Mitochondria', definition: 'The organelle responsible for producing energy in a cell.' },
];

const FlashcardTextGeneratorContent = () => {
  const [pairs, setPairs] = useState<FlashcardPair[]>(DEFAULT_PAIRS);

  const addPair = () => setPairs((prev) => [...prev, { id: nextId++, term: '', definition: '' }]);
  const removePair = (id: number) => setPairs((prev) => prev.filter((p) => p.id !== id));
  const updatePair = (id: number, patch: Partial<FlashcardPair>) =>
    setPairs((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const validPairs = useMemo(() => pairs.filter((p) => p.term.trim() && p.definition.trim()), [pairs]);

  const cardText = useMemo(
    () =>
      validPairs
        .map((p, i) => `Card ${i + 1}\nFront: ${p.term.trim()}\nBack: ${p.definition.trim()}`)
        .join('\n\n---\n\n'),
    [validPairs]
  );

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(cardText);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Term / Definition Pairs</Typography>
        <Stack spacing={2}>
          {pairs.map((p) => (
            <Paper key={p.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Term (front)" value={p.term} onChange={(e) => updatePair(p.id, { term: e.target.value })} />
                <IconButton onClick={() => removePair(p.id)} disabled={pairs.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField size="small" fullWidth multiline label="Definition (back)" value={p.definition} onChange={(e) => updatePair(p.id, { definition: e.target.value })} />
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addPair} sx={{ mt: 2 }}>
          Add Flashcard
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Printable Flashcard Text</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText} disabled={validPairs.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {validPairs.length === 0 && (
            <Typography variant="body2" color="text.secondary">Fill in a term and definition to generate flashcard text.</Typography>
          )}
          {validPairs.length > 0 && (
            <Box component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
              {cardText}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const FlashcardTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Flashcard Text Generator</Typography>
      <Typography variant="body1">
        Add each term you want to study along with its definition. The panel on the right formats every
        pair into a numbered card with a clearly labeled &quot;Front&quot; and &quot;Back&quot;, separated
        by a divider — a layout designed so you can copy the text, paste it into a document, and cut it
        into physical flashcards, or print it directly and fold each card in half.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;Photosynthesis&quot; as the term with its definition produces Card 1 showing
        &quot;Front: Photosynthesis&quot; on one line and &quot;Back: The process by which plants convert
        light energy into chemical energy.&quot; on the next, followed by a divider before the next card.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a vocabulary list or study guide into printable flashcards before an exam.</li>
          <li>Preparing language-learning flashcards with a foreign word on the front and its translation on the back.</li>
          <li>Creating quiz cards for a classroom activity or study group session.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do both the term and definition need to be filled in?</strong> Yes — a card only appears in the generated text once both its term and definition fields have content, so incomplete entries are simply skipped.</li>
          <li><strong>Can I paste the output into a word processor to print physical cards?</strong> Yes — copy the generated text into a document, then use your word processor&apos;s print or page-break settings to space out and cut each card.</li>
          <li><strong>Is my flashcard set saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the text before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/flashcard-text-generator" content={content}>
      <FlashcardTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlashcardTextGenerator;
