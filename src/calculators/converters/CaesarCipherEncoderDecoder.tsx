'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup, Slider, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'encode' | 'decode';

function shiftLetter(char: string, shift: number): string {
  const isUpper = char >= 'A' && char <= 'Z';
  const isLower = char >= 'a' && char <= 'z';
  if (!isUpper && !isLower) return char;
  const base = isUpper ? 65 : 97;
  const normalizedShift = ((shift % 26) + 26) % 26;
  return String.fromCharCode(((char.charCodeAt(0) - base + normalizedShift) % 26) + base);
}

function caesarCipher(text: string, shift: number): string {
  return text.split('').map((c) => shiftLetter(c, shift)).join('');
}

const CaesarCipherEncoderDecoderContent = () => {
  const [mode, setMode] = useState<Mode>('encode');
  const [shift, setShift] = useState(3);
  const [input, setInput] = useState('Hello, World!');

  // Encoding shifts forward by N; decoding shifts by 26-N (equivalent to shifting back by N),
  // since an arbitrary shift is not self-inverse the way the fixed 13-shift ROT13 is.
  const effectiveShift = mode === 'encode' ? shift : 26 - shift;
  const output = useMemo(() => caesarCipher(input, effectiveShift), [input, effectiveShift]);

  const changeMode = (_: unknown, value: Mode | null) => {
    if (!value) return;
    setMode(value);
  };

  const copy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <ToggleButtonGroup value={mode} exclusive onChange={changeMode} color="primary">
          <ToggleButton value="encode">Encode</ToggleButton>
          <ToggleButton value="decode">Decode</ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ minWidth: 260, flexGrow: 1, maxWidth: 400 }}>
          <Typography variant="body2" gutterBottom>Shift Amount: {shift}</Typography>
          <Slider
            value={shift}
            onChange={(_, v) => setShift(v as number)}
            min={1}
            max={25}
            step={1}
            marks={[{ value: 1, label: '1' }, { value: 13, label: '13' }, { value: 25, label: '25' }]}
            valueLabelDisplay="auto"
          />
        </Box>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <TextField
          label={mode === 'encode' ? 'Plain Text' : 'Ciphertext'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          multiline
          rows={8}
          fullWidth
        />

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>{mode === 'encode' ? 'Ciphertext' : 'Plain Text'}</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output}>Copy</Button>
          </Box>
          <TextField
            multiline
            rows={8}
            fullWidth
            value={output}
            InputProps={{ readOnly: true }}
            sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const CaesarCipherEncoderDecoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Caesar Cipher Encoder/Decoder</Typography>
      <Typography variant="body1">
        Pick a shift amount from 1 to 25 using the slider, choose Encode or Decode, and type or paste your
        text. In Encode mode, every letter shifts forward through the alphabet by the chosen amount,
        wrapping from Z back to A, while case is preserved and non-letter characters (numbers, spaces,
        punctuation) pass through unchanged. In Decode mode, the tool automatically applies the complementary
        shift (26 minus your chosen amount) so the same shift value correctly reverses an encoded message.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a shift of 3 in Encode mode, &quot;Hello, World!&quot; becomes &quot;Khoor, Zruog!&quot; — each
        letter moved 3 places forward (H→K, e→h, and so on). Switching to Decode mode with the same shift of
        3 and entering &quot;Khoor, Zruog!&quot; returns the original &quot;Hello, World!&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Learning how classical substitution ciphers work in a cryptography or computer science class.</li>
          <li>Creating a customizable secret code for puzzles, games, or scavenger hunts.</li>
          <li>Decoding a Caesar-shifted message when you know or can guess the shift amount.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the ROT13 Encoder/Decoder?</strong> ROT13 is specifically the fixed 13-shift case of the Caesar cipher, which happens to be self-inverse — applying it twice returns the original text, so one box handles both directions. This tool allows any shift from 1 to 25, and since an arbitrary shift generally isn't self-inverse, it requires an explicit Encode/Decode mode toggle to pick the correct direction.</li>
          <li><strong>What happens if I set the shift to exactly 13?</strong> At a shift of 13, this tool behaves exactly like ROT13 — encoding and decoding become the same operation, since shifting forward 13 and shifting back 13 (26-13=13) are identical.</li>
          <li><strong>Is the Caesar cipher secure?</strong> No — with only 25 possible shifts, a Caesar cipher can be broken almost instantly by trying every shift value or using letter-frequency analysis. It's useful for learning and casual puzzles, not for protecting sensitive information.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/caesar-cipher-encoder-decoder" content={content}>
      <CaesarCipherEncoderDecoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CaesarCipherEncoderDecoder;
