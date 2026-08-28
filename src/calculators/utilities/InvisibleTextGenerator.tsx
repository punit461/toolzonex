'use client';

import { useState, useCallback } from 'react';
import { Box, TextField, Typography, Button, Chip, IconButton, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const invisibleChars = [
  { name: 'Zero-Width Space', char: '\u200B', code: 'U+200B' },
  { name: 'Zero-Width Joiner', char: '\u200D', code: 'U+200D' },
  { name: 'Zero-Width Non-Joiner', char: '\u200C', code: 'U+200C' },
  { name: 'Hair Space', char: '\u200A', code: 'U+200A' },
  { name: 'Thin Space', char: '\u2009', code: 'U+2009' },
  { name: 'En Space', char: '\u2002', code: 'U+2002' },
  { name: 'Em Space', char: '\u2003', code: 'U+2003' },
  { name: 'Ideographic Space', char: '\u3000', code: 'U+3000' },
];

const InvisibleTextGenerator = () => {
  const [fillerWord, setFillerWord] = useState('');
  const [surroundChar, setSurroundChar] = useState('\u200B');
  const [generated, setGenerated] = useState('');

  const generate = useCallback(() => {
    const wrapper = surroundChar.repeat(3);
    setGenerated(`${wrapper}${fillerWord}${wrapper}`);
  }, [fillerWord, surroundChar]);

  const generateStandalone = (char: string) => {
    setGenerated(char.repeat(20));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const charCount = generated.length;
  const hexCodes = [...new Set(generated.split('').map((c) => `U+${c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}`))];

  const content = (
    <>
      <Typography variant="h2">How Does It Work?</Typography>
      <Typography variant="body1">
        Invisible text uses Unicode characters that render as zero-width or near-invisible spaces.
        These characters are real Unicode code points but have no visible glyph, making text appear invisible or creating hidden content between visible words.
        Select a character type and generate text, or wrap a filler word with invisible characters for hidden placement.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A zero-width space (\u200B) between two words looks like a single continuous word, but search engines and screen readers may treat them as separate tokens. Generating 20 zero-width spaces creates invisible text you can paste into text fields that require input.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pasting invisible text into fields that require characters (e.g. usernames, bios).</li>
          <li>Adding hidden watermarks or invisible markers to text content.</li>
          <li>Testing how apps handle zero-width and special Unicode characters.</li>
          <li>Creating invisible spacing or separating content without visible gaps.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are invisible characters safe to use?</Typography>
      <Typography variant="body1">
        Yes for legitimate purposes like testing and design. However, using invisible text to manipulate search rankings or hide spam content violates most platforms' terms of service.
      </Typography>
      <Typography variant="h3">What is a zero-width space?</Typography>
      <Typography variant="body1">
        A zero-width space (U+200B) is a Unicode character that takes up no horizontal space. It tells the text engine it's allowed to break a line at that point without adding visible space.
      </Typography>
      <Typography variant="h3">How do I detect invisible text?</Typography>
      <Typography variant="body1">
        Paste the text into a hex editor or use JavaScript's charCodeAt() to reveal hidden characters. Most text editors also show formatting marks when enabled.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/invisible-text-generator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="subtitle1" fontWeight="600">Generate Invisible Text</Typography>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Quick Generate (20 characters)</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {invisibleChars.map((ic) => (
              <Chip
                key={ic.code}
                label={`${ic.name} (${ic.code})`}
                onClick={() => generateStandalone(ic.char)}
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Wrap Filler Word with Invisible Characters</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              size="small"
              label="Filler word or phrase"
              value={fillerWord}
              onChange={(e) => setFillerWord(e.target.value)}
              sx={{ minWidth: 200 }}
            />
            <TextField
              size="small"
              select
              label="Invisible char"
              value={surroundChar}
              onChange={(e) => setSurroundChar(e.target.value)}
              sx={{ minWidth: 200 }}
              SelectProps={{ native: true }}
            >
              {invisibleChars.map((ic) => (
                <option key={ic.code} value={ic.char}>{ic.name} ({ic.code})</option>
              ))}
            </TextField>
            <Button variant="contained" onClick={generate} disabled={!fillerWord}>Generate</Button>
          </Box>
        </Box>

        {generated && (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">Generated Output</Typography>
              <IconButton size="small" onClick={() => copyToClipboard(generated)}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
            <TextField
              multiline
              rows={3}
              value={generated}
              fullWidth
              variant="outlined"
              InputProps={{ readOnly: true }}
              sx={{ fontFamily: 'monospace' }}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="caption" color="text.secondary">
                Characters: {charCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Unique codes: {hexCodes.join(', ')}
              </Typography>
            </Box>
          </Paper>
        )}

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>All Invisible Characters Reference</Typography>
          <Box component="table" sx={{ width: '100%', typography: 'body2' }}>
            <Box component="thead">
              <Box component="tr">
                <Box component="th" sx={{ textAlign: 'left', pb: 1 }}>Name</Box>
                <Box component="th" sx={{ textAlign: 'left', pb: 1 }}>Code</Box>
                <Box component="th" sx={{ textAlign: 'left', pb: 1 }}>Copy</Box>
              </Box>
            </Box>
            <Box component="tbody">
              {invisibleChars.map((ic) => (
                <Box component="tr" key={ic.code}>
                  <Box component="td" sx={{ py: 0.5 }}>{ic.name}</Box>
                  <Box component="td" sx={{ py: 0.5, fontFamily: 'monospace' }}>{ic.code}</Box>
                  <Box component="td" sx={{ py: 0.5 }}>
                    <Button size="small" onClick={() => copyToClipboard(ic.char)}>Copy</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InvisibleTextGenerator;
