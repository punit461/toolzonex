'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const KeepOnlyLettersContent = () => {
  const [text, setText] = useState('');
  const [keepSpaces, setKeepSpaces] = useState(true);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const pattern = keepSpaces ? /[^a-zA-Z\s]/g : /[^a-zA-Z]/g;
    return text.replace(pattern, '');
  }, [text, keepSpaces]);

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Input Text"
        placeholder="Type or paste text containing letters, numbers, and symbols..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={6}
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox checked={keepSpaces} onChange={(e) => setKeepSpaces(e.target.checked)} />}
        label="Preserve spaces between words"
      />

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
          rows={6}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Cleaned text will appear here..."
        />
      </Box>
    </Box>
  );
};

const KeepOnlyLetters = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use Keep Only Letters</Typography>
      <Typography variant="body1">
        Paste any text into the box, and every character that isn&apos;t an alphabetic letter (A-Z, a-z) is
        stripped out instantly — numbers, punctuation, and symbols all disappear. Leave &quot;Preserve
        spaces&quot; checked (the default) to keep the words readable and separated, or untick it to squash
        everything into one continuous run of letters.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Order #4521: 3x Widgets, $19.99 each!&quot; becomes &quot;Order Widgets each&quot; with spaces
        preserved, or &quot;OrderWidgetseach&quot; with spaces also removed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning messy pasted text down to just the words for a word-frequency or spelling check.</li>
          <li>Stripping order numbers, prices, and symbols out of copied receipt or invoice text.</li>
          <li>Preparing a plain-letters-only sample for cipher, puzzle, or teaching exercises.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this remove numbers too?</strong> Yes — only alphabetic letters are kept; every digit, symbol, and punctuation mark is stripped out along with everything else that isn&apos;t a letter.</li>
          <li><strong>Why keep the spaces toggle on by default?</strong> Stripping spaces along with everything else usually isn&apos;t what people want, since it jams every word together into one unreadable block — keeping spaces preserved by default keeps the result usable out of the box.</li>
          <li><strong>Are accented letters like é or ñ kept?</strong> No — only the standard A-Z / a-z letters are treated as letters; accented and non-Latin characters are removed along with numbers and symbols.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/keep-only-letters" content={content}>
      <KeepOnlyLettersContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default KeepOnlyLetters;
