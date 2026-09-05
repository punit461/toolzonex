'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const NATO: Record<string, string> = {
  a: 'Alpha', b: 'Bravo', c: 'Charlie', d: 'Delta', e: 'Echo', f: 'Foxtrot',
  g: 'Golf', h: 'Hotel', i: 'India', j: 'Juliett', k: 'Kilo', l: 'Lima',
  m: 'Mike', n: 'November', o: 'Oscar', p: 'Papa', q: 'Quebec', r: 'Romeo',
  s: 'Sierra', t: 'Tango', u: 'Uniform', v: 'Victor', w: 'Whiskey', x: 'X-ray',
  y: 'Yankee', z: 'Zulu',
};

const DIGITS: Record<string, string> = {
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner',
};

const SYMBOLS: Record<string, string> = {
  '!': 'exclamation mark',
  '@': 'at sign',
  '#': 'hash (pound sign)',
  '$': 'dollar sign',
  '%': 'percent sign',
  '^': 'caret',
  '&': 'ampersand',
  '*': 'asterisk',
  '(': 'open parenthesis',
  ')': 'close parenthesis',
  '-': 'hyphen (dash)',
  '_': 'underscore',
  '=': 'equals sign',
  '+': 'plus sign',
  '[': 'open bracket',
  ']': 'close bracket',
  '{': 'open brace',
  '}': 'close brace',
  '\\': 'backslash',
  '|': 'pipe',
  ';': 'semicolon',
  ':': 'colon',
  '\'': 'apostrophe',
  '"': 'quotation mark',
  ',': 'comma',
  '.': 'dot (period)',
  '<': 'less than sign',
  '>': 'greater than sign',
  '/': 'forward slash',
  '?': 'question mark',
  '~': 'tilde',
  '`': 'backtick',
  ' ': 'space',
};

function pronounce(text: string): { char: string; label: string }[] {
  const result: { char: string; label: string }[] = [];
  for (const ch of text) {
    const lower = ch.toLowerCase();
    if (NATO[lower]) {
      const word = NATO[lower];
      const isUpper = ch !== lower;
      result.push({ char: ch, label: isUpper ? `Capital ${word}` : word });
    } else if (DIGITS[ch]) {
      result.push({ char: ch, label: DIGITS[ch] });
    } else if (SYMBOLS[ch]) {
      result.push({ char: ch, label: SYMBOLS[ch] });
    } else {
      result.push({ char: ch, label: `"${ch}"` });
    }
  }
  return result;
}

const PasswordPronunciationToolContent = () => {
  const [input, setInput] = useState('Tr0ub4dor&3');

  const parts = useMemo(() => pronounce(input), [input]);
  const spokenText = parts.map((p) => p.label).join(', ');

  const copy = async () => {
    if (!spokenText) return;
    try { await navigator.clipboard.writeText(spokenText); } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Password or text to spell out"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>Spoken Breakdown</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!spokenText}>
            Copy
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {parts.length === 0 ? (
            <Typography color="text.secondary">Enter a password above to see its spoken breakdown.</Typography>
          ) : (
            <Box component="ol" sx={{ m: 0, pl: 3 }}>
              {parts.map((p, idx) => (
                <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                  <Typography component="span" sx={{ fontFamily: 'monospace', bgcolor: 'action.hover', px: 0.5, borderRadius: 0.5, mr: 1 }}>
                    {p.char === ' ' ? '␣' : p.char}
                  </Typography>
                  {p.label}
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const PasswordPronunciationTool = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Password Pronunciation Tool</Typography>
      <Typography variant="body1">
        Type or paste a password or any string into the box. Each character is converted into a clear,
        unambiguous spoken form: letters use the NATO phonetic alphabet (with &quot;Capital&quot; noted before
        uppercase letters), digits use spoken-word forms including &quot;Niner&quot; for 9 per standard radio
        convention, and common symbols are given hand-written spoken names like &quot;at sign&quot; or
        &quot;exclamation mark&quot;.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The password <code>Tr0ub4dor&amp;3</code> is broken down as: Capital Tango, Romeo, Zero, Uniform,
        Bravo, Four, Delta, Oscar, Romeo, ampersand, Three — making it possible to read the exact password
        aloud over the phone without any ambiguity.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading a temporary password to someone over a phone call or voice chat without confusion.</li>
          <li>Verbally confirming a complex password character-by-character with IT support.</li>
          <li>Dictating a Wi-Fi password or confirmation code clearly to another person in the room.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this tool for generating or storing passwords?</strong> No — this tool is meant purely for securely and unambiguously communicating an existing password over voice or phone. It doesn&apos;t generate new passwords or store anything you type; use a dedicated password generator and manager for those purposes.</li>
          <li><strong>Why use the NATO phonetic alphabet for letters?</strong> The NATO phonetic alphabet was specifically designed to avoid confusion between similar-sounding letters (like B and D, or M and N) over noisy audio channels, making it the clearest standard way to spell something out loud.</li>
          <li><strong>Why is 9 spelled &quot;Niner&quot;?</strong> This is the same radio convention used in aviation — &quot;Niner&quot; is used instead of &quot;Nine&quot; because &quot;Nine&quot; can sound too close to &quot;Five&quot; over the phone or radio.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/password-pronunciation-tool" content={content}>
      <PasswordPronunciationToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PasswordPronunciationTool;
