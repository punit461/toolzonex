'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type FillOrder = 'across' | 'down';

function buildColumns(items: string[], numColumns: number, order: FillOrder): string {
  if (items.length === 0 || numColumns < 1) return '';

  const rows = Math.ceil(items.length / numColumns);
  const grid: string[][] = Array.from({ length: rows }, () => Array(numColumns).fill(''));

  if (order === 'across') {
    items.forEach((item, i) => {
      const row = Math.floor(i / numColumns);
      const col = i % numColumns;
      grid[row][col] = item;
    });
  } else {
    items.forEach((item, i) => {
      const col = Math.floor(i / rows);
      const row = i % rows;
      grid[row][col] = item;
    });
  }

  const colWidths = Array.from({ length: numColumns }, (_, col) =>
    Math.max(...grid.map((row) => (row[col] || '').length), 0)
  );

  return grid
    .map((row) =>
      row
        .map((cell, col) => cell.padEnd(colWidths[col] + 2, ' '))
        .join('')
        .trimEnd()
    )
    .join('\n');
}

const TextColumnizerContent = () => {
  const [text, setText] = useState('');
  const [numColumns, setNumColumns] = useState('3');
  const [order, setOrder] = useState<FillOrder>('across');
  const [copied, setCopied] = useState(false);

  const items = useMemo(() => text.split('\n').map((l) => l.trim()).filter(Boolean), [text]);
  const cols = Math.max(1, parseInt(numColumns, 10) || 1);

  const output = useMemo(() => buildColumns(items, cols, order), [items, cols, order]);

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Input List (one item per line)"
          placeholder={'Item 1\nItem 2\nItem 3\n...'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
        />
        <TextField
          label="Number of Columns"
          type="number"
          value={numColumns}
          onChange={(e) => setNumColumns(e.target.value)}
          inputProps={{ min: 1 }}
          fullWidth
        />
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Fill order:</Typography>
          <ToggleButtonGroup value={order} exclusive onChange={(_, v) => v && setOrder(v)}>
            <ToggleButton value="across">Across then down</ToggleButton>
            <ToggleButton value="down">Down then across</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

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
          rows={12}
          fullWidth
          InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', whiteSpace: 'pre' } }}
          placeholder="Columnized text will appear here..."
        />
      </Box>
    </Box>
  );
};

const TextColumnizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Text Columnizer</Typography>
      <Typography variant="body1">
        Paste a flat list of items, one per line, choose how many columns you want, and pick a fill order —
        &quot;Across then down&quot; fills each row left to right before moving to the next row (row-major), while
        &quot;Down then across&quot; fills each column top to bottom before moving to the next column
        (column-major). The result is rearranged into a neatly aligned, space-padded grid in monospace font,
        ready to copy into a print-friendly layout.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Items 1 through 6 arranged into 3 columns &quot;Across then down&quot; produce two rows:{' '}
        <code>1  2  3</code> then <code>4  5  6</code>. The same items &quot;Down then across&quot; instead
        produce <code>1  3  5</code> then <code>2  4  6</code>, since column 1 fills with 1 and 2 before moving
        to column 2.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Laying out a list of names into columns for printed name badges.</li>
          <li>Arranging raffle ticket numbers or a numbered list into a compact printable grid.</li>
          <li>Preparing a long flat list (like a phone directory or index) for multi-column print formatting.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What&apos;s the difference between the two fill orders?</strong> &quot;Across then down&quot; (row-major) fills row 1 completely with the first few items before starting row 2, like reading order. &quot;Down then across&quot; (column-major) instead fills column 1 top-to-bottom first, then moves to column 2 — useful when items should read down each column, like a printed ballot or numbered list.</li>
          <li><strong>Why does the output use monospace font?</strong> Monospace ensures every character takes up the same width, so the space-padded columns actually line up visually — with a variable-width font, the padding would look misaligned.</li>
          <li><strong>What happens if the number of items doesn&apos;t divide evenly into columns?</strong> The last row (or column) is simply left with empty cells for the remainder — the layout still renders correctly, just with some blank spots at the end.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/text-columnizer" content={content}>
      <TextColumnizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextColumnizer;
