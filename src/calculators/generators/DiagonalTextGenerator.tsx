'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function toDiagonal(text: string, step: number): string {
  const chars = text.split('');
  return chars.map((c, i) => ' '.repeat(i * step) + c).join('\n');
}

const DiagonalTextGeneratorContent = () => {
  const [input, setInput] = useState('Hello');
  const [step, setStep] = useState('2');
  const [copied, setCopied] = useState(false);

  const stepNum = Math.max(1, parseInt(step, 10) || 1);
  const output = useMemo(() => toDiagonal(input, stepNum), [input, stepNum]);

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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Text"
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, 40))}
          sx={{ flex: 1, minWidth: 220 }}
          helperText="Short word or phrase works best (max 40 characters)"
        />
        <TextField
          label="Spacing per Step"
          type="number"
          value={step}
          onChange={(e) => setStep(e.target.value)}
          sx={{ width: 160 }}
          inputProps={{ min: 1, max: 6 }}
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Diagonal Output:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            overflowX: 'auto',
            minHeight: 120,
          }}
        >
          {output || ' '}
        </Box>
      </Box>
    </Box>
  );
};

const DiagonalTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Diagonal Text Generator</Typography>
      <Typography variant="body1">
        Type a short word or phrase and choose a spacing value. Each successive character is placed on its own
        line, offset by an increasing number of leading spaces, so the text reads down and to the right like a
        staircase. The result is plain monospace text — it copies and pastes cleanly into anywhere that preserves
        spacing, such as a Discord code block, a plain text file, or a terminal.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>Hi</code> with a spacing of 2 produces:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        H<br />
        &nbsp;&nbsp;i
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating an eye-catching diagonal banner for a Discord bio, forum signature, or chat message.</li>
          <li>Making stylized ASCII-style text for a README file or code comment.</li>
          <li>Adding a playful visual effect to a plain-text greeting card or message.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will the diagonal effect show up everywhere I paste it?</strong> It only looks correct in places that use a monospace font and preserve leading spaces exactly, like a code block, plain text editor, or terminal. Regular chat text boxes or rich-text editors that collapse whitespace will not display it correctly.</li>
          <li><strong>Why does spacing matter?</strong> The spacing value controls how many spaces are added per step — a higher value spreads the characters further apart diagonally, creating a steeper staircase effect.</li>
          <li><strong>Is there a length limit?</strong> Input is capped at 40 characters, since very long text becomes impractical to read once spread diagonally across dozens of lines.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/diagonal-text-generator" content={content}>
      <DiagonalTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DiagonalTextGenerator;
