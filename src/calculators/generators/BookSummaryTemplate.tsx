'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Takeaway {
  id: number;
  text: string;
}

let nextId = 1;

const BookSummaryTemplateContent = () => {
  const [title, setTitle] = useState('Atomic Habits');
  const [author, setAuthor] = useState('James Clear');
  const [takeaways, setTakeaways] = useState<Takeaway[]>([
    { id: nextId++, text: 'Small habits compound into remarkable results over time.' },
    { id: nextId++, text: 'Focus on systems, not just goals.' },
  ]);
  const [quote, setQuote] = useState('You do not rise to the level of your goals, you fall to the level of your systems.');
  const [rating, setRating] = useState<number | null>(4);
  const [summary, setSummary] = useState('A practical guide to building good habits and breaking bad ones through small, consistent changes.');

  const addTakeaway = () => setTakeaways((prev) => [...prev, { id: nextId++, text: '' }]);
  const removeTakeaway = (id: number) => setTakeaways((prev) => prev.filter((t) => t.id !== id));
  const updateTakeaway = (id: number, text: string) => setTakeaways((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));

  const validTakeaways = useMemo(() => takeaways.filter((t) => t.text.trim()), [takeaways]);

  const outputText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Title: ${title.trim() || '(untitled)'}`);
    lines.push(`Author: ${author.trim() || '(unknown)'}`);
    lines.push(`Rating: ${'★'.repeat(rating ?? 0)}${'☆'.repeat(5 - (rating ?? 0))} (${rating ?? 0}/5)`);
    lines.push('');
    if (summary.trim()) {
      lines.push('Summary:');
      lines.push(summary.trim());
      lines.push('');
    }
    if (validTakeaways.length > 0) {
      lines.push('Key Takeaways:');
      validTakeaways.forEach((t) => lines.push(`  - ${t.text.trim()}`));
      lines.push('');
    }
    if (quote.trim()) {
      lines.push(`Favorite Quote: "${quote.trim()}"`);
    }
    return lines.join('\n');
  }, [title, author, rating, summary, validTakeaways, quote]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2}>
              <TextField size="small" fullWidth label="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <TextField size="small" fullWidth label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Stack>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>Your Rating</Typography>
              <Rating value={rating} onChange={(_, v) => setRating(v)} />
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>Key Takeaways</Typography>
            <Stack spacing={1}>
              {takeaways.map((t) => (
                <Box key={t.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField size="small" fullWidth value={t.text} onChange={(e) => updateTakeaway(t.id, e.target.value)} placeholder="A key takeaway from the book" />
                  <IconButton onClick={() => removeTakeaway(t.id)} disabled={takeaways.length <= 1} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
            <Button startIcon={<AddIcon />} onClick={addTakeaway} sx={{ mt: 1 }} size="small">
              Add Takeaway
            </Button>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <TextField size="small" fullWidth multiline label="Favorite Quote" value={quote} onChange={(e) => setQuote(e.target.value)} sx={{ mb: 2 }} />
            <TextField size="small" fullWidth multiline label="One-Line Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
          </Paper>
        </Stack>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Book Summary</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          <Box component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
            {outputText}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const BookSummaryTemplate = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Book Summary Template</Typography>
      <Typography variant="body1">
        Fill in the book&apos;s title and author, add as many key takeaways as you like, star-rate the book
        from 1 to 5, and write your favorite quote and a one-line summary. The panel on the right builds a
        formatted, ready-to-copy book summary combining every field — useful as a personal reading log
        entry, a book club discussion note, or a review draft.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;Atomic Habits&quot; by James Clear with a 4-star rating, two key takeaways, a
        favorite quote, and a one-line summary produces a formatted block listing the title, author, star
        rating, summary, bulleted takeaways, and the quote in order.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping a personal reading log with a consistent format across every book you finish.</li>
          <li>Preparing discussion notes or a review draft for a book club meeting.</li>
          <li>Summarizing a nonfiction book&apos;s key ideas for future reference.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do I need to fill in every field?</strong> No — blank fields like the quote or summary are simply omitted from the generated output, so you can use as much or as little of the template as you like.</li>
          <li><strong>Can I add more than a couple of key takeaways?</strong> Yes — click &quot;Add Takeaway&quot; as many times as you need; there&apos;s no fixed limit on how many bullet points appear in your summary.</li>
          <li><strong>Is my book summary saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the summary before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/book-summary-template" content={content}>
      <BookSummaryTemplateContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BookSummaryTemplate;
