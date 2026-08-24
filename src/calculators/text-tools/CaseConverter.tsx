'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab';

function splitWords(text: string): string[] {
  return text
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean);
}

function convert(text: string, mode: Mode): string {
  switch (mode) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
    case 'sentence':
      return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case 'camel': {
      const words = splitWords(text.toLowerCase());
      return words
        .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join('');
    }
    case 'pascal': {
      const words = splitWords(text.toLowerCase());
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    }
    case 'snake':
      return splitWords(text.toLowerCase()).join('_');
    case 'kebab':
      return splitWords(text.toLowerCase()).join('-');
    default:
      return text;
  }
}

const MODES: { value: Mode; label: string }[] = [
  { value: 'upper', label: 'UPPERCASE' },
  { value: 'lower', label: 'lowercase' },
  { value: 'title', label: 'Title Case' },
  { value: 'sentence', label: 'Sentence case' },
  { value: 'camel', label: 'camelCase' },
  { value: 'pascal', label: 'PascalCase' },
  { value: 'snake', label: 'snake_case' },
  { value: 'kebab', label: 'kebab-case' },
];

const CaseConverterContent = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<Mode>('upper');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => convert(text, mode), [text, mode]);

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
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={6}
        fullWidth
      />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Choose a case:</Typography>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { border: '1px solid', borderColor: 'divider !important', borderRadius: '4px !important' } }}
        >
          {MODES.map((m) => (
            <ToggleButton key={m.value} value={m.value} size="small">{m.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

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
          placeholder="Converted text will appear here..."
        />
      </Box>
    </Box>
  );
};

const CaseConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use This Case Converter</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Type or paste your text into the input box.</li>
          <li>Pick a case style — UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, or kebab-case.</li>
          <li>The result updates instantly; click Copy to grab the converted text.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The phrase &quot;hello world example&quot; converts to <code>HELLO WORLD EXAMPLE</code> (UPPERCASE),
        {' '}<code>Hello World Example</code> (Title Case), <code>helloWorldExample</code> (camelCase),
        {' '}<code>HelloWorldExample</code> (PascalCase), <code>hello_world_example</code> (snake_case), and
        {' '}<code>hello-world-example</code> (kebab-case).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting variable or function names between camelCase, PascalCase, and snake_case for different programming languages.</li>
          <li>Formatting URL slugs into kebab-case.</li>
          <li>Fixing capitalization in titles, headings, or pasted text.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between camelCase and PascalCase?</Typography>
      <Typography variant="body1">
        camelCase starts with a lowercase letter (e.g. <code>myVariableName</code>), while PascalCase capitalizes
        every word including the first (e.g. <code>MyVariableName</code>). camelCase is common for variables and
        functions; PascalCase is common for class and component names.
      </Typography>
      <Typography variant="h3">How does the converter decide where words start?</Typography>
      <Typography variant="body1">
        It splits your text on spaces, hyphens, and underscores to find word boundaries, then rebuilds it in the
        selected case style — so text already written in snake_case or kebab-case converts cleanly too.
      </Typography>
      <Typography variant="h3">Does converting case change punctuation or numbers?</Typography>
      <Typography variant="body1">
        Numbers are preserved as-is. For snake_case, kebab-case, camelCase, and PascalCase, punctuation is
        dropped from word boundaries since those formats don&apos;t use punctuation; other modes leave
        punctuation untouched.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/case-converter" content={content}>
      <CaseConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CaseConverter;
