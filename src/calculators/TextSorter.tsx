'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextSorterContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);

  const handleSort = () => {
    let lines = text.split('\n').filter(line => line.trim() !== '');

    if (removeDuplicates) {
      lines = [...new Set(lines)];
    }

    lines.sort((a, b) => {
      if (sortByLength) {
        return sortOrder === 'asc' ? a.length - b.length : b.length - a.length;
      }
      
      let valA = a;
      let valB = b;
      
      if (!caseSensitive) {
        valA = a.toLowerCase();
        valB = b.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setResult(lines.join('\n'));
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text (one item per line)"
          placeholder="Paste your list here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={sortOrder}
              label="Sort Order"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Ascending (A-Z)</MenuItem>
              <MenuItem value="desc">Descending (Z-A)</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />}
              label="Case Sensitive"
            />
            <FormControlLabel
              control={<Checkbox checked={removeDuplicates} onChange={(e) => setRemoveDuplicates(e.target.checked)} />}
              label="Remove Duplicates"
            />
            <FormControlLabel
              control={<Checkbox checked={sortByLength} onChange={(e) => setSortByLength(e.target.checked)} />}
              label="Sort by Length"
            />
          </Box>
        </Box>

        <Button variant="contained" onClick={handleSort} fullWidth size="large">
          Sort Text
        </Button>
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
          placeholder="Sorted text will appear here..."
        />
      </Box>
    </Box>
  );
};

const TextSorter = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Text Sorter?</Typography>
      <Typography variant="body1">
        Simply paste your list of words or phrases into the input box (each item on a new line). Choose your preferred sorting options, such as ascending (A-Z) or descending (Z-A), and click "Sort Text". The sorted list will appear in the result box.
      </Typography>

      <Typography variant="h2">What options are available?</Typography>
      <Typography variant="body1">
        You can customize how your text is sorted:
        <ul>
          <li><strong>Ascending/Descending:</strong> Sort alphabetically from A-Z or Z-A.</li>
          <li><strong>Case Sensitive:</strong> Distinguish between uppercase and lowercase letters when sorting.</li>
          <li><strong>Remove Duplicates:</strong> Automatically filter out identical lines from your list.</li>
          <li><strong>Sort by Length:</strong> Ignore alphabetical order and sort purely by the number of characters in each line.</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Sorter"
      description="Sort lists alphabetically or by line length. Easily arrange your text in alphabetical order (A-Z or Z-A)."
      url="/tools/text-sorter"
      content={content}
      category="Tools"
    >
      <TextSorterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextSorter;
