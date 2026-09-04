'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function rot13(input: string): string {
  return input.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}

const Rot13DecoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => rot13(input), [input]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard not available */ }
  };

  const swap = () => setInput(output);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Text Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text here to ROT13 encode or decode it..."
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">ROT13 Output:</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" startIcon={<SwapVertIcon />} onClick={swap} disabled={!output}>
              Use as Input
            </Button>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
        </Box>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="ROT13 output will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const Rot13Decoder = () => {
  const content = (
    <>
      <Typography variant="h2">Free ROT13 Encoder / Decoder</Typography>
      <Typography variant="body1">
        Type or paste text above and it transforms to ROT13 instantly — no button to click, and no separate
        "encode" or "decode" mode needed. ROT13 shifts every letter 13 places through the alphabet, wrapping
        around from Z back to A, while leaving numbers, punctuation, and spacing untouched.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste any text — plain or already ROT13'd — into the left box, and the transformed result appears
        instantly on the right. Click "Use as Input" to send the output back into the input box, which is a
        quick way to flip between a message and its ROT13 form.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>Hello, World!</code> transforms to <code>Uryyb, Jbeyq!</code> — and running that same
        result back through the tool returns the original <code>Hello, World!</code>, since ROT13 applied twice
        cancels itself out.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Obscuring spoilers, puzzle answers, or punchlines in forum posts so they aren't read by accident.</li>
          <li>Quick, casual text obfuscation for novelty messages or programming exercises.</li>
          <li>Decoding old Usenet-style ROT13'd text or classic programming-challenge ciphers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is there only one mode instead of separate Encode and Decode buttons?</Typography>
      <Typography variant="body1">
        Because ROT13 is a self-inverse (or "involutive") cipher — shifting a letter 13 places forward is
        exactly the same operation as shifting it 13 places back, since the alphabet has 26 letters and 13 is
        exactly half of that. Applying ROT13 twice to the same text always returns the original text, so
        encoding and decoding are literally the same transform. That's exactly what makes ROT13 a quick,
        reversible obfuscation trick rather than real encryption — anyone who knows it's ROT13 can reverse it
        instantly with no key required.
      </Typography>
      <Typography variant="h3">Is ROT13 secure?</Typography>
      <Typography variant="body1">
        No — ROT13 provides no real security. It's meant only to casually hide text (like a spoiler or puzzle
        answer) from a quick glance, not to protect sensitive information from anyone who actually wants to
        read it.
      </Typography>
      <Typography variant="h3">Does ROT13 affect numbers or punctuation?</Typography>
      <Typography variant="body1">
        No — only the 26 letters of the English alphabet (A-Z, a-z) are shifted. Numbers, spaces, and
        punctuation marks pass through completely unchanged.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/rot13-decoder" content={content}>
      <Rot13DecoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Rot13Decoder;
