'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const LEET_MAP: Record<string, string> = {
  a: '4', e: '3', i: '1', o: '0', s: '5', t: '7', b: '8', g: '9',
};

const LeetspeakConverterContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [useNumbers, setUseNumbers] = useState(true);
  const [useRandomCase, setUseRandomCase] = useState(true);

  const handleConvert = () => {
    const converted = text
      .split('')
      .map((char) => {
        const lower = char.toLowerCase();
        let output = char;

        if (useNumbers && LEET_MAP[lower]) {
          output = LEET_MAP[lower];
        } else if (useRandomCase && /[a-z]/i.test(char)) {
          output = Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
        }

        return output;
      })
      .join('');
    setResult(converted);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ minWidth: 0 }}>
        <TextField
          label="Input Text"
          placeholder="Type or paste text, e.g. iloveindia..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            control={<Checkbox checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} />}
            label="Replace letters with numbers (a→4, e→3, i→1, o→0, s→5, t→7, b→8, g→9)"
          />
          <FormControlLabel
            control={<Checkbox checked={useRandomCase} onChange={(e) => setUseRandomCase(e.target.checked)} />}
            label="Randomize case on remaining letters"
          />
        </Box>

        <Button variant="contained" onClick={handleConvert} fullWidth size="large">
          Convert Text
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
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
          placeholder="Converted text will appear here, e.g. 1l0v31Nd1A..."
        />
      </Box>
    </Box>
  );
};

const LeetspeakConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Leetspeak Converter?</Typography>
      <Typography variant="body1">
        Type or paste your text, choose whether to substitute letters with number lookalikes and/or randomize
        letter case, and click &quot;Convert Text&quot;. Great for usernames, stylized text, or classic &quot;1337 speak&quot;.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Input:</strong> iloveindia</li>
          <li><strong>Output:</strong> something like 1l0v31Nd1A — vowels and lookalike letters become numbers, the rest get randomized case.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating stylized usernames or gamertags.</li>
          <li>Nostalgic &quot;1337 speak&quot; text for forums, chat, or social media bios.</li>
          <li>Obfuscating text to bypass simple keyword filters (for legitimate, non-abusive uses).</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I convert leetspeak back to normal text?</strong> Not with this tool — it&apos;s one-way, since number substitutions aren&apos;t always reversible unambiguously.</li>
          <li><strong>Why does the same input give different output each time?</strong> The random-case option randomizes on every conversion — turn it off for consistent, repeatable output.</li>
          <li><strong>Is my text uploaded anywhere?</strong> No — conversion happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title="Leetspeak Converter"
      description="Convert text to leetspeak (1337 speak) with number substitutions and random casing. Free online text encoder."
      url="/text-tools/leetspeak-converter"
      content={content}
      category="Text Tools"
    >
      <LeetspeakConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LeetspeakConverter;
