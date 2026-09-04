'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const NATO: Record<string, string> = {
  a: 'Alpha', b: 'Bravo', c: 'Charlie', d: 'Delta', e: 'Echo', f: 'Foxtrot',
  g: 'Golf', h: 'Hotel', i: 'India', j: 'Juliett', k: 'Kilo', l: 'Lima',
  m: 'Mike', n: 'November', o: 'Oscar', p: 'Papa', q: 'Quebec', r: 'Romeo',
  s: 'Sierra', t: 'Tango', u: 'Uniform', v: 'Victor', w: 'Whiskey', x: 'X-ray',
  y: 'Yankee', z: 'Zulu',
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner',
};

function toNato(text: string): string[] {
  const words: string[] = [];
  for (const ch of text.toLowerCase()) {
    const word = NATO[ch];
    if (word) words.push(word);
    // Non-letter/non-digit characters (spaces, punctuation) are skipped between words.
  }
  return words;
}

const NatoAlphabetConverterContent = () => {
  const [text, setText] = useState('SOS 2026');

  const words = useMemo(() => toNato(text), [text]);
  const output = words.join(' ');

  const copyOutput = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Enter text to convert"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={6}
        fullWidth
      />

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>NATO Phonetic Spelling</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyOutput} disabled={!output}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 160, fontFamily: 'monospace', wordBreak: 'break-word' }}>
          {output || <Typography color="text.secondary" component="span">Enter some text to see its NATO phonetic spelling.</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const NatoAlphabetConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the NATO Alphabet Converter</Typography>
      <Typography variant="body1">
        Type or paste any text into the box above. Each letter is converted to its NATO phonetic alphabet
        word — A becomes Alpha, B becomes Bravo, and so on through Z as Zulu — and each digit is converted to
        its standard spoken form, using the full 26-letter and 10-digit tables used in aviation and military
        radio communication. Spaces and punctuation are simply skipped between words rather than being
        spelled out or shown as separators.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;SOS 2026&quot; produces: <code>Sierra Oscar Sierra Two Zero Two Six</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Spelling out a name, code, or license plate clearly over a radio or phone call.</li>
          <li>Learning or practicing the standard NATO phonetic alphabet.</li>
          <li>Converting confirmation codes or reference numbers into an unambiguous spoken format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why is 9 spelled &quot;Niner&quot; instead of &quot;Nine&quot;?</strong> This is a real aviation and radio convention — &quot;Niner&quot; is used specifically because &quot;Nine&quot; can sound too similar to &quot;Five&quot; or get lost over noisy radio channels, so &quot;Niner&quot; was adopted as the standard, more distinct pronunciation.</li>
          <li><strong>What happens to spaces and punctuation in my text?</strong> They're skipped between the resulting phonetic words rather than being spelled out themselves, so the output is just a clean sequence of NATO words and number words for every letter and digit found.</li>
          <li><strong>Does capitalization matter?</strong> No — the conversion is case-insensitive, so uppercase and lowercase letters are converted to the same phonetic word.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/nato-alphabet-converter" content={content}>
      <NatoAlphabetConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NatoAlphabetConverter;
