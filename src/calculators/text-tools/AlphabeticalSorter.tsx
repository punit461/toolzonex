'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, FormControlLabel, Checkbox, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Direction = 'asc' | 'desc';
type Delimiter = 'line' | 'comma';

const AlphabeticalSorterContent = () => {
  const [text, setText] = useState('');
  const [direction, setDirection] = useState<Direction>('asc');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [delimiter, setDelimiter] = useState<Delimiter>('line');

  const result = useMemo(() => {
    const items = (delimiter === 'line' ? text.split('\n') : text.split(','))
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const sorted = [...items].sort((a, b) => {
      const left = caseSensitive ? a : a.toLowerCase();
      const right = caseSensitive ? b : b.toLowerCase();
      if (left < right) return -1;
      if (left > right) return 1;
      return 0;
    });

    if (direction === 'desc') sorted.reverse();

    return delimiter === 'line' ? sorted.join('\n') : sorted.join(', ');
  }, [text, direction, caseSensitive, delimiter]);

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input List"
          placeholder={'banana\napple\ncherry'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>List Format</InputLabel>
            <Select value={delimiter} label="List Format" onChange={(e) => setDelimiter(e.target.value as Delimiter)}>
              <MenuItem value="line">One Item per Line</MenuItem>
              <MenuItem value="comma">Comma-Separated</MenuItem>
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={direction}
            exclusive
            onChange={(_, value) => value && setDirection(value)}
            size="small"
          >
            <ToggleButton value="asc">A → Z</ToggleButton>
            <ToggleButton value="desc">Z → A</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <FormControlLabel
          control={<Checkbox checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />}
          label="Case-sensitive sorting (uppercase before lowercase)"
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Sorted Result:</Typography>
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
          placeholder="Sorted list will appear here..."
        />
      </Box>
    </Box>
  );
};

const AlphabeticalSorter = () => {
  const content = (
    <>
      <Typography variant="h2">How to sort a list alphabetically</Typography>
      <Typography variant="body1">
        Paste your list into the box above, one item per line or as a comma-separated list. Choose A-Z or Z-A
        order, and decide whether sorting should be case-sensitive. The sorted result updates live below, ready
        to copy.
      </Typography>

      <Typography variant="h2">Case-sensitive vs. case-insensitive sorting</Typography>
      <Typography variant="body1">
        With case-sensitive sorting off (the default), &quot;apple&quot; and &quot;Apple&quot; sort together
        based on their letters alone. With case-sensitive sorting on, sorting follows standard character order,
        which places all uppercase letters before any lowercase letters — so &quot;Zebra&quot; would sort before
        &quot;apple&quot;.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;banana, apple, cherry&quot; sorted A-Z becomes &quot;apple, banana, cherry&quot;. Sorted Z-A, it
        becomes &quot;cherry, banana, apple&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Alphabetizing a list of names, tags, or references.</li>
          <li>Sorting comma-separated values before pasting into a spreadsheet.</li>
          <li>Arranging a bibliography or glossary in alphabetical order.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I sort a comma-separated list instead of one item per line?</Typography>
      <Typography variant="body1">
        Yes — choose &quot;Comma-Separated&quot; from the list format dropdown, and the tool splits, sorts, and
        rejoins the items with commas instead of line breaks.
      </Typography>
      <Typography variant="h3">Does it remove blank lines or extra spaces?</Typography>
      <Typography variant="body1">
        Yes — empty items are dropped, and leading/trailing spaces on each item are trimmed before sorting.
      </Typography>
      <Typography variant="h3">How does case-sensitive sorting order uppercase and lowercase?</Typography>
      <Typography variant="body1">
        Case-sensitive sorting uses standard character codes, where all uppercase letters (A-Z) come before any
        lowercase letters (a-z) — so &quot;Zebra&quot; sorts before &quot;apple&quot; even though Z comes after
        A alphabetically in everyday terms.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/alphabetical-sorter" content={content}>
      <AlphabeticalSorterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AlphabeticalSorter;
