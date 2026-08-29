'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, FormControlLabel, Checkbox, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RemoveDuplicateLinesContent = () => {
  const [text, setText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);

  const { result, removedCount } = useMemo(() => {
    if (!text) return { result: '', removedCount: 0 };
    const lines = text.split('\n');
    const seen = new Set<string>();
    const kept: string[] = [];
    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        kept.push(line);
      }
    }
    return { result: kept.join('\n'), removedCount: lines.length - kept.length };
  }, [text, caseSensitive]);

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
          label="Input Text (one item per line)"
          placeholder="Paste your list here with duplicate lines..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />}
          label={'Case-sensitive matching ("Apple" ≠ "apple")'}
          sx={{ mb: 2 }}
        />
        {text && (
          <Alert severity={removedCount > 0 ? 'success' : 'info'}>
            Removed <strong>{removedCount}</strong> duplicate line{removedCount === 1 ? '' : 's'}.
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
          placeholder="List with duplicates removed will appear here..."
        />
      </Box>
    </Box>
  );
};

const RemoveDuplicateLines = () => {
  const content = (
    <>
      <Typography variant="h2">How to remove duplicate lines from text</Typography>
      <Typography variant="body1">
        Paste your list into the box above, one item per line. Every line after the first occurrence of a
        duplicate is removed automatically, and the result updates live. Toggle case-sensitive matching
        depending on whether &quot;Apple&quot; and &quot;apple&quot; should count as the same line.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;apple\nbanana\nApple\napple\ncherry&quot; becomes &quot;apple\nbanana\nApple\ncherry&quot; with
        case-sensitive matching (since &quot;Apple&quot; and &quot;apple&quot; differ), or
        &quot;apple\nbanana\ncherry&quot; with case-insensitive matching on.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning a mailing list or contact list before sending a campaign.</li>
          <li>Deduplicating keywords, tags, or log entries.</li>
          <li>Tidying up a pasted list before importing it into a spreadsheet.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which occurrence of a duplicate is kept?</Typography>
      <Typography variant="body1">
        The first occurrence of each unique line is kept; every later repeat of that exact line is removed.
      </Typography>
      <Typography variant="h3">Is matching case-sensitive?</Typography>
      <Typography variant="body1">
        By default, yes — &quot;Apple&quot; and &quot;apple&quot; are treated as different lines. Untick the
        case-sensitive option to treat them as duplicates of each other.
      </Typography>
      <Typography variant="h3">Does it trim whitespace before comparing lines?</Typography>
      <Typography variant="body1">
        No — lines are compared exactly as typed, so a line with trailing spaces is treated as different from
        the same line without them. Run the Text Cleaner tool first if you need to normalize whitespace before
        deduplicating.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/remove-duplicate-lines" content={content}>
      <RemoveDuplicateLinesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveDuplicateLines;
