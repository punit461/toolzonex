'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, MenuItem, Select, Button, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Status = 'To Read' | 'Reading' | 'Finished';

interface Book {
  id: number;
  title: string;
  author: string;
  status: Status;
  rating: number;
}

let nextId = 400;

const STATUS_OPTIONS: Status[] = ['To Read', 'Reading', 'Finished'];

const DEFAULT_BOOKS: Book[] = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', status: 'Finished', rating: 5 },
  { id: 2, title: 'Project Hail Mary', author: 'Andy Weir', status: 'Reading', rating: 0 },
  { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', status: 'To Read', rating: 0 },
];

const BookReadingListGeneratorContent = () => {
  const [books, setBooks] = useState<Book[]>(DEFAULT_BOOKS);

  const addBook = () => setBooks((prev) => [...prev, { id: nextId++, title: '', author: '', status: 'To Read', rating: 0 }]);
  const removeBook = (id: number) => setBooks((prev) => prev.filter((b) => b.id !== id));
  const updateBook = (id: number, patch: Partial<Book>) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const grouped = useMemo(() => {
    const valid = books.filter((b) => b.title.trim());
    return {
      'To Read': valid.filter((b) => b.status === 'To Read'),
      Reading: valid.filter((b) => b.status === 'Reading'),
      Finished: valid.filter((b) => b.status === 'Finished'),
    };
  }, [books]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Your Books</Typography>
        <Stack spacing={2}>
          {books.map((b) => (
            <Paper key={b.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size="small"
                  label="Title"
                  value={b.title}
                  onChange={(e) => updateBook(b.id, { title: e.target.value })}
                  sx={{ flex: 2, minWidth: 150 }}
                />
                <TextField
                  size="small"
                  label="Author"
                  value={b.author}
                  onChange={(e) => updateBook(b.id, { author: e.target.value })}
                  sx={{ flex: 1, minWidth: 120 }}
                />
                <Select
                  size="small"
                  value={b.status}
                  onChange={(e) => updateBook(b.id, { status: e.target.value as Status })}
                  sx={{ minWidth: 120 }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
                <IconButton onClick={() => removeBook(b.id)} disabled={books.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              {b.status === 'Finished' && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">Rating:</Typography>
                  <Rating value={b.rating} onChange={(_, v) => updateBook(b.id, { rating: v || 0 })} />
                </Box>
              )}
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addBook} sx={{ mt: 2 }}>
          Add Book
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Reading List</Typography>
        {STATUS_OPTIONS.map((s) => (
          <Box key={s} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={700} color="primary.main" mb={1}>
              {s} ({grouped[s].length})
            </Typography>
            {grouped[s].length === 0 ? (
              <Typography variant="body2" color="text.secondary">No books here yet.</Typography>
            ) : (
              <Stack spacing={1}>
                {grouped[s].map((b) => (
                  <Paper key={b.id} variant="outlined" sx={{ p: 1.5 }}>
                    <Typography fontWeight={600}>{b.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{b.author}</Typography>
                    {b.status === 'Finished' && <Rating value={b.rating} readOnly size="small" />}
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const BookReadingListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Book Reading List Generator</Typography>
      <Typography variant="body1">
        Add each book you want to track along with its author, and set its status to &quot;To Read,&quot;
        &quot;Reading,&quot; or &quot;Finished.&quot; Once a book is marked Finished, a 1-to-5 star rating field
        appears so you can score it. The tool automatically groups your full list into the three status
        sections, giving you an organized reading list rather than a single flat pile of titles.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Marking &quot;Atomic Habits&quot; as Finished with a 5-star rating, &quot;Project Hail Mary&quot; as
        Reading, and &quot;Sapiens&quot; as To Read produces a list with Atomic Habits (and its rating) under
        Finished, Project Hail Mary under Reading, and Sapiens under To Read.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Maintaining a to-be-read list across multiple books you plan to get to eventually.</li>
          <li>Tracking which book you&apos;re currently reading alongside others still in the queue.</li>
          <li>Rating and remembering books you&apos;ve finished for future recommendations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Reading Progress Calculator?</strong> The Reading Progress Calculator tracks page-by-page progress within one current book you&apos;re reading, projecting a finish date. This Book Reading List Generator instead manages a whole list of multiple books — a to-be-read and reading tracker — rather than tracking progress inside any single book.</li>
          <li><strong>Why does the rating field only appear for Finished books?</strong> Ratings only make sense once you&apos;ve actually finished a book, so the field is hidden for books still marked To Read or Reading.</li>
          <li><strong>Can I have more than one book marked as Reading?</strong> Yes — there&apos;s no restriction, so you can track multiple books in progress at once if you read more than one at a time.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/book-reading-list-generator" content={content}>
      <BookReadingListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BookReadingListGenerator;
