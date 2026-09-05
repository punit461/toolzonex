'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Button, Typography, Paper, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SortMode = 'alphabetical' | 'numerical' | 'length';

const SortTextLinesContent = () => {
  const [text, setText] = useState('');
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [mode, setMode] = useState<SortMode>('alphabetical');
  const [caseInsensitive, setCaseInsensitive] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);

  const sorted = useMemo(() => {
    let lines = text.split('\n').filter((line) => line.trim() !== '');
    if (removeDuplicates) lines = Array.from(new Set(lines));

    const dir = direction === 'asc' ? 1 : -1;

    lines.sort((a, b) => {
      if (mode === 'length') {
        return (a.length - b.length) * dir;
      }
      if (mode === 'numerical') {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        const validA = !isNaN(numA);
        const validB = !isNaN(numB);
        if (validA && validB) return (numA - numB) * dir;
        if (validA) return -1;
        if (validB) return 1;
        return 0;
      }
      const valA = caseInsensitive ? a.toLowerCase() : a;
      const valB = caseInsensitive ? b.toLowerCase() : b;
      if (valA < valB) return -1 * dir;
      if (valA > valB) return 1 * dir;
      return 0;
    });

    return lines.join('\n');
  }, [text, direction, mode, caseInsensitive, removeDuplicates]);

  const copy = () => sorted && navigator.clipboard.writeText(sorted);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text (one item per line)"
          placeholder={'banana\napple\n10\n2'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={12}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Sort Mode</InputLabel>
            <Select value={mode} label="Sort Mode" onChange={(e) => setMode(e.target.value as SortMode)}>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
              <MenuItem value="numerical">Numerical (parse each line as a number)</MenuItem>
              <MenuItem value="length">By Line Length</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Direction</InputLabel>
            <Select value={direction} label="Direction" onChange={(e) => setDirection(e.target.value as 'asc' | 'desc')}>
              <MenuItem value="asc">Ascending (A-Z / Low-High)</MenuItem>
              <MenuItem value="desc">Descending (Z-A / High-Low)</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <FormControlLabel
              control={<Checkbox checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} disabled={mode !== 'alphabetical'} />}
              label="Case-insensitive"
            />
            <FormControlLabel
              control={<Checkbox checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} />}
              label="Remove duplicates"
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Sorted Result</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!sorted}>Copy</Button>
        </Box>
        <TextField
          value={sorted}
          multiline
          rows={14}
          fullWidth
          InputProps={{ readOnly: true, sx: { fontFamily: 'monospace' } }}
          placeholder="Sorted lines will appear here..."
        />
      </Box>
    </Box>
  );
};

const SortTextLines = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use Sort Text Lines</Typography>
      <Typography variant="body1">
        Paste your list into the input box, one item per line, then choose a sort mode: Alphabetical sorts
        lines as text (A-Z or Z-A), Numerical parses each line as a number and sorts by its numeric value —
        so <code>10</code> correctly sorts after <code>2</code>, unlike plain text sorting — and By Line
        Length sorts purely by how many characters are in each line, ignoring content. Toggle
        case-insensitive matching for alphabetical sorting, and optionally strip duplicate lines from the
        result before sorting.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Sorting the lines <code>10</code>, <code>2</code>, and <code>33</code> alphabetically (as plain text)
        produces the order <code>10, 2, 33</code>, because text comparison looks at the first character. Using
        Numerical mode instead correctly produces <code>2, 10, 33</code>, since each line is parsed as an
        actual number before comparing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sorting a list of scores, prices, or IDs numerically instead of as plain text.</li>
          <li>Alphabetizing a list of names or tags while removing duplicate entries in one pass.</li>
          <li>Ranking lines by length, such as finding the shortest or longest entries in a list.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does numerical sorting matter if I could just sort alphabetically?</strong> Plain text (lexicographic) sorting compares numbers character by character, so <code>"10"</code> is treated as coming before <code>"2"</code> because the character &quot;1&quot; is less than &quot;2&quot;. Numerical mode instead parses each line into an actual number first, giving the mathematically correct order.</li>
          <li><strong>What happens to lines that aren't valid numbers in Numerical mode?</strong> Lines that can't be parsed as a number are pushed to the end of the ascending order (or the start in descending order), so your numeric lines still sort correctly among themselves.</li>
          <li><strong>Does Remove Duplicates consider case?</strong> Duplicate removal is exact-match — <code>Apple</code> and <code>apple</code> are treated as different lines unless they match exactly, so combine it with lowercase text beforehand if you need case-insensitive de-duplication.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/sort-text-lines" content={content}>
      <SortTextLinesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SortTextLines;
