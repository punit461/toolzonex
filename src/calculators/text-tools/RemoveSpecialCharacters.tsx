'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RemoveSpecialCharactersContent = () => {
  const [text, setText] = useState('');
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [keepPunctuation, setKeepPunctuation] = useState(false);
  const [keepLineBreaks, setKeepLineBreaks] = useState(true);

  const result = useMemo(() => {
    let pattern = 'a-zA-Z0-9';
    if (keepSpaces) pattern += ' ';
    if (keepPunctuation) pattern += '.,!?;:\'"()-';
    if (keepLineBreaks) pattern += '\\n\\r';
    const regex = new RegExp(`[^${pattern}]`, 'g');
    return text.replace(regex, '');
  }, [text, keepSpaces, keepPunctuation, keepLineBreaks]);

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
          label="Input Text"
          placeholder="Paste text with special characters, e.g. 'Hello!! @World #2024 (test)...'"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <FormControlLabel
            control={<Checkbox checked={keepSpaces} onChange={(e) => setKeepSpaces(e.target.checked)} />}
            label="Keep spaces"
          />
          <FormControlLabel
            control={<Checkbox checked={keepLineBreaks} onChange={(e) => setKeepLineBreaks(e.target.checked)} />}
            label="Keep line breaks"
          />
          <FormControlLabel
            control={<Checkbox checked={keepPunctuation} onChange={(e) => setKeepPunctuation(e.target.checked)} />}
            label="Keep basic punctuation (. , ! ? ; : ' &quot; ( ) -)"
          />
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result (updates live):</Typography>
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
          placeholder="Cleaned text will appear here..."
        />
      </Box>
    </Box>
  );
};

const RemoveSpecialCharacters = () => {
  const content = (
    <>
      <Typography variant="h2">How to remove special characters from text</Typography>
      <Typography variant="body1">
        Paste your text into the box above. By default, every character that isn&apos;t a letter or number is
        stripped out, leaving only alphanumeric text. Use the checkboxes to keep spaces, line breaks, or basic
        punctuation as exceptions — the result updates live as you type or change the options.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Hello!! @World #2024 (test)...&quot; becomes &quot;Hello World 2024 test&quot; with spaces kept
        and everything else removed, or &quot;HelloWorld2024test&quot; with spaces unchecked too.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sanitizing user input or filenames before saving them.</li>
          <li>Stripping emoji, symbols, and stray formatting from scraped text.</li>
          <li>Preparing plain alphanumeric strings for use as IDs or slugs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this remove accented letters like é or ñ?</Typography>
      <Typography variant="body1">
        Yes — only plain ASCII letters (a-z, A-Z) and digits (0-9) are kept by default, so accented and
        non-Latin characters are treated as special characters and removed.
      </Typography>
      <Typography variant="h3">Can I keep punctuation like periods and commas?</Typography>
      <Typography variant="body1">
        Yes — tick &quot;Keep basic punctuation&quot; to preserve periods, commas, exclamation marks, question
        marks, colons, semicolons, quotes, parentheses, and hyphens while still removing other symbols.
      </Typography>
      <Typography variant="h3">Does it update as I type?</Typography>
      <Typography variant="body1">
        Yes — there&apos;s no button to click. The cleaned result recalculates instantly whenever you edit the
        text or toggle one of the &quot;keep&quot; options.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/remove-special-characters" content={content}>
      <RemoveSpecialCharactersContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveSpecialCharacters;
