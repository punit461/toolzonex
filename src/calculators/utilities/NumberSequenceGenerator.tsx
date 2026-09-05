'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, ToggleButtonGroup, ToggleButton, Stack, Button } from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SeqType = 'arithmetic' | 'geometric' | 'fibonacci';

function generateSequence(type: SeqType, count: number, a: number, b: number): number[] {
  if (count <= 0) return [];
  const result: number[] = [];

  if (type === 'arithmetic') {
    for (let i = 0; i < count; i++) result.push(a + i * b);
  } else if (type === 'geometric') {
    let current = a;
    for (let i = 0; i < count; i++) {
      result.push(current);
      current *= b;
    }
  } else {
    // fibonacci-style: two starting values, each term is sum of previous two
    result.push(a);
    if (count > 1) result.push(b);
    for (let i = 2; i < count; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
  }

  return result;
}

const NumberSequenceGeneratorContent = () => {
  const [type, setType] = useState<SeqType>('arithmetic');
  const [startA, setStartA] = useState('1');
  const [startB, setStartB] = useState('2');
  const [count, setCount] = useState('10');
  const [lineSeparated, setLineSeparated] = useState(false);

  const aNum = parseFloat(startA) || 0;
  const bNum = parseFloat(startB) || 0;
  const countNum = Math.min(500, Math.max(0, parseInt(count, 10) || 0));

  const sequence = useMemo(() => generateSequence(type, countNum, aNum, bNum), [type, countNum, aNum, bNum]);

  const outputText = sequence.join(lineSeparated ? '\n' : ', ');

  const copyOutput = async () => {
    try { await navigator.clipboard.writeText(outputText); } catch {}
  };

  const labelA = type === 'fibonacci' ? 'First Value' : 'Start Value';
  const labelB = type === 'arithmetic' ? 'Common Difference' : type === 'geometric' ? 'Common Ratio' : 'Second Value';

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <ToggleButtonGroup
        size="small"
        value={type}
        exclusive
        onChange={(_, v) => v && setType(v)}
        sx={{ mb: 3, flexWrap: 'wrap' }}
      >
        <ToggleButton value="arithmetic">Arithmetic</ToggleButton>
        <ToggleButton value="geometric">Geometric</ToggleButton>
        <ToggleButton value="fibonacci">Fibonacci-style</ToggleButton>
      </ToggleButtonGroup>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <TextField label={labelA} type="number" value={startA} onChange={(e) => setStartA(e.target.value)} fullWidth />
        <TextField label={labelB} type="number" value={startB} onChange={(e) => setStartB(e.target.value)} fullWidth />
        <TextField label="Number of Terms" type="number" value={count} onChange={(e) => setCount(e.target.value)} fullWidth />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <ToggleButtonGroup
          size="small"
          value={lineSeparated ? 'lines' : 'commas'}
          exclusive
          onChange={(_, v) => v && setLineSeparated(v === 'lines')}
        >
          <ToggleButton value="commas">Comma-separated</ToggleButton>
          <ToggleButton value="lines">Line-separated</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormatListNumberedIcon fontSize="small" /> Generated Sequence
          </Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyOutput} disabled={sequence.length === 0}>
            Copy
          </Button>
        </Stack>
        <Typography
          variant="body1"
          component="pre"
          sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', m: 0 }}
        >
          {outputText || 'Enter values above to generate a sequence.'}
        </Typography>
      </Paper>
    </Box>
  );
};

const NumberSequenceGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Number Sequence Generator</Typography>
      <Typography variant="body1">
        Choose a sequence type — Arithmetic, Geometric, or Fibonacci-style — then fill in the starting
        values and how many terms to generate. An Arithmetic sequence adds a fixed common difference to each
        term; a Geometric sequence multiplies each term by a fixed common ratio; a Fibonacci-style sequence
        starts from two values you choose and makes every following term the sum of the previous two. The
        result appears below as a comma-separated or line-separated list you can copy.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An Arithmetic sequence starting at 1 with a common difference of 2, generating 6 terms, produces:
        1, 3, 5, 7, 9, 11. A Fibonacci-style sequence starting with 1 and 1 for the same 6 terms produces:
        1, 1, 2, 3, 5, 8.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating practice sequences for math homework or teaching pattern recognition.</li>
          <li>Quickly producing a geometric sequence for compound growth or interest illustrations.</li>
          <li>Exploring how Fibonacci-style sequences behave with different starting pairs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What&apos;s the difference between Arithmetic and Geometric sequences?</strong> An Arithmetic sequence adds the same fixed amount (the common difference) to get each next term, while a Geometric sequence multiplies by the same fixed amount (the common ratio) instead — arithmetic grows linearly, geometric grows exponentially.</li>
          <li><strong>Does the Fibonacci-style option have to start with 1 and 1?</strong> No — you can enter any two starting values, and each following term will still be the sum of the previous two, so you can generate Fibonacci-like sequences from any custom starting pair.</li>
          <li><strong>Is there a limit on how many terms I can generate?</strong> Yes, the tool caps generation at 500 terms to keep the output readable and the page responsive.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/number-sequence-generator" content={content}>
      <NumberSequenceGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NumberSequenceGenerator;
