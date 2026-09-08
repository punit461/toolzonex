'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Same exotic invisible Unicode characters the Invisible Character Detector flags.
const INVISIBLE_CODES = [0x200b, 0x200c, 0x200d, 0x00a0, 0xfeff, 0x00ad, 0x2060];
const INVISIBLE_SET = new Set(INVISIBLE_CODES);

const DEFAULT_TEXT = 'This looks normal but has a zero​width space and a soft­hyphen hidden inside.';

const UnicodeSpaceRemoverContent = () => {
  const [text, setText] = useState(DEFAULT_TEXT);

  const { cleaned, removedCount } = useMemo(() => {
    let removed = 0;
    let out = '';
    for (const ch of text) {
      const code = ch.codePointAt(0) ?? 0;
      if (INVISIBLE_SET.has(code)) {
        removed++;
      } else {
        out += ch;
      }
    }
    return { cleaned: out, removedCount: removed };
  }, [text]);

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(cleaned);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste text that may contain hidden invisible characters..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>Cleaned Text</Typography>
          {cleaned && (
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
              Copy
            </Button>
          )}
        </Box>
        <TextField
          value={cleaned}
          multiline
          rows={10}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Cleaned text will appear here..."
          sx={{ mb: 2 }}
        />
        {removedCount > 0 ? (
          <Alert severity="success">Removed {removedCount} invisible character{removedCount === 1 ? '' : 's'}.</Alert>
        ) : (
          <Paper variant="outlined" sx={{ p: 1.5 }}>
            <Typography variant="body2" color="text.secondary">No exotic invisible Unicode characters found — text is unchanged.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const UnicodeSpaceRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Unicode Space Remover</Typography>
      <Typography variant="body1">
        Paste text into the input field. The tool strips out the same set of exotic invisible Unicode
        characters that often hide in copy-pasted text — zero-width space, zero-width joiner, zero-width
        non-joiner, non-breaking space, the byte order mark (BOM), soft hyphen, and word joiner — and shows the
        cleaned result on the right along with a count of how many were removed.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting text containing a hidden zero-width space and a soft hyphen produces a cleaned version with
        both characters stripped out and a message confirming 2 invisible characters were removed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning URLs or code snippets copied from a webpage or PDF before pasting them elsewhere.</li>
          <li>Sanitizing form input or CMS content that&apos;s failing validation for no visible reason.</li>
          <li>Stripping a stray byte order mark (BOM) from text before it&apos;s used in another program.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Invisible Character Detector?</strong> The Invisible Character Detector only highlights and flags these characters in place for review, without altering your text. This tool actually removes them and gives you back cleaned, ready-to-use text.</li>
          <li><strong>Will this remove ordinary spaces and tabs too?</strong> No — it only targets exotic invisible Unicode characters like zero-width spaces and the BOM. For ordinary spaces, tabs, and empty lines, use the Whitespace Cleaner instead.</li>
          <li><strong>Is my text saved anywhere?</strong> No — everything happens in your browser only; nothing is uploaded or stored anywhere.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/unicode-space-remover" content={content}>
      <UnicodeSpaceRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnicodeSpaceRemover;
