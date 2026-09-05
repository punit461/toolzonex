'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, FormControlLabel, Switch, Stack, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function literalReplace(source: string, find: string, replace: string, caseSensitive: boolean, replaceAll: boolean): { output: string; count: number } {
  if (!find) return { output: source, count: 0 };
  const flags = (replaceAll ? 'g' : '') + (caseSensitive ? '' : 'i');
  const regex = new RegExp(escapeRegExp(find), flags);
  const matches = source.match(new RegExp(escapeRegExp(find), 'g' + (caseSensitive ? '' : 'i')));
  const count = replaceAll ? (matches ? matches.length : 0) : (matches && matches.length > 0 ? 1 : 0);
  const output = source.replace(regex, replace);
  return { output, count };
}

const FindAndReplaceTextContent = () => {
  const [source, setSource] = useState('The quick brown fox jumps over the lazy dog. The dog barks.');
  const [find, setFind] = useState('dog');
  const [replace, setReplace] = useState('cat');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replaceAll, setReplaceAll] = useState(true);

  const { output, count } = useMemo(
    () => literalReplace(source, find, replace, caseSensitive, replaceAll),
    [source, find, replace, caseSensitive, replaceAll],
  );

  const copy = async () => {
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Source Text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        multiline
        rows={5}
        fullWidth
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <TextField label="Find" value={find} onChange={(e) => setFind(e.target.value)} fullWidth />
        <TextField label="Replace With" value={replace} onChange={(e) => setReplace(e.target.value)} fullWidth />
      </Box>

      <Stack direction="row" spacing={3} flexWrap="wrap">
        <FormControlLabel
          control={<Switch checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />}
          label="Case-sensitive"
        />
        <FormControlLabel
          control={<Switch checked={replaceAll} onChange={(e) => setReplaceAll(e.target.checked)} />}
          label={replaceAll ? 'Replace All Occurrences' : 'Replace First Occurrence Only'}
        />
      </Stack>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            Result {find && `(${count} replacement${count === 1 ? '' : 's'})`}
          </Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy}>Copy</Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 100, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {output}
        </Paper>
      </Box>
    </Box>
  );
};

const FindAndReplaceText = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Find and Replace Text Tool</Typography>
      <Typography variant="body1">
        Paste your source text, then enter the text you want to find and the text you want to replace it
        with. Toggle case-sensitivity on or off, and choose whether to replace every occurrence or only the
        first one found. The tool performs a simple, literal substitution — no regular expression syntax is
        needed at all.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In &quot;The quick brown fox jumps over the lazy dog. The dog barks.&quot;, finding &quot;dog&quot;
        and replacing with &quot;cat&quot; with Replace All enabled produces &quot;The quick brown fox jumps
        over the lazy cat. The cat barks.&quot; — both occurrences are replaced.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly swapping a name, term, or placeholder throughout a block of text.</li>
          <li>Fixing a repeated typo across a document without touching correctly-spelled words elsewhere.</li>
          <li>Replacing just the first occurrence of a word while leaving the rest of the text unchanged.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Regex Replace Tester?</strong> The Regex Replace Tester requires writing a REGEX pattern for advanced, pattern-based matching — useful for things like matching any digit or any email address. This Find and Replace Text tool does simple literal text find-and-replace with no regex syntax needed at all, for users who just want a quick, straightforward substitution.</li>
          <li><strong>What does &quot;case-sensitive&quot; control?</strong> When enabled, the search only matches text with exactly the same uppercase/lowercase letters you typed in the Find field. When disabled, &quot;Dog&quot;, &quot;dog&quot;, and &quot;DOG&quot; are all treated as matches.</li>
          <li><strong>What happens with &quot;Replace First Occurrence Only&quot;?</strong> Only the very first match found in the text (reading left to right) gets replaced — every later occurrence of the same text is left exactly as it was.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/find-and-replace-text" content={content}>
      <FindAndReplaceTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FindAndReplaceText;
