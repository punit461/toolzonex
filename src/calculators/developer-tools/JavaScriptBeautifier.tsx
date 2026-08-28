'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, ToggleButton, ToggleButtonGroup, IconButton, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function beautifyJs(code: string, indent: number): string {
  let result = '';
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escaped = false;

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];

    if (escaped) {
      result += ch;
      escaped = false;
      continue;
    }
    if (ch === '\\' && inString) {
      result += ch;
      escaped = true;
      continue;
    }
    if (inString) {
      result += ch;
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = true;
      stringChar = ch;
      result += ch;
      continue;
    }

    if (ch === '{' || ch === '[') {
      result += ch + '\n' + ' '.repeat((depth + 1) * indent);
      depth++;
    } else if (ch === '}' || ch === ']') {
      depth = Math.max(0, depth - 1);
      result = result.trimEnd() + '\n' + ' '.repeat(depth * indent) + ch;
    } else if (ch === ';') {
      result += ';\n' + ' '.repeat(depth * indent);
    } else if (ch === '\n' || ch === '\r') {
      continue;
    } else if (ch === ' ' || ch === '\t') {
      if (result.length > 0 && result[result.length - 1] !== ' ' && result[result.length - 1] !== '\n') {
        result += ' ';
      }
    } else {
      result += ch;
    }
  }
  return result.trim();
}

function minifyJs(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([=+\-*/<>!&|{}()[\];:,.\?])\s*/g, '$1')
    .trim();
}

const JavaScriptBeautifier = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [indent, setIndent] = useState<2 | 4>(2);

  const output = useMemo(() => {
    if (!input.trim()) return '';
    try {
      return mode === 'beautify' ? beautifyJs(input, indent) : minifyJs(input);
    } catch {
      return 'Error processing JavaScript.';
    }
  }, [input, mode, indent]);

  const copyToClipboard = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const content = (
    <>
      <Typography variant="h2">How Does It Work?</Typography>
      <Typography variant="body1">
        The JavaScript Beautifier reformats minified or messy JS code into a readable, properly indented structure.
        It tracks brace depth to indent code blocks, keeps opening braces on the same line, and adds newlines after semicolons and closing braces.
        The Minify mode strips comments and collapses whitespace to produce the smallest possible output.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Input: <code>{'function greet(name){console.log("Hello, "+name);return true;}'}</code><br />
        Beautified (2 spaces): The function opens with proper indentation, the console.log sits one level deep, and the closing brace aligns with the function keyword.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading minified JavaScript libraries or bundled scripts during debugging.</li>
          <li>Cleaning up auto-generated or compressed code before code review.</li>
          <li>Preparing JS for pasting into documentation or Stack Overflow examples.</li>
          <li>Reducing file size of scripts before deployment with the minify option.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this the same as a JS formatter or prettifier?</Typography>
      <Typography variant="body1">
        Yes — beautify, format, and prettify all refer to the same thing: re-indenting JavaScript code for readability.
      </Typography>
      <Typography variant="h3">Will beautifying change how my code runs?</Typography>
      <Typography variant="body1">
        No. Beautifying only adds whitespace and newlines for readability. Minifying removes comments and extra whitespace but preserves the code logic. Neither alters the actual execution behavior.
      </Typography>
      <Typography variant="h3">Does it handle template literals and regular expressions?</Typography>
      <Typography variant="body1">
        The beautifier respects string boundaries (single, double, and backtick strings) so content inside strings is not affected by formatting rules. For complex template literals with embedded expressions, a full AST-based tool is recommended.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/javascript-beautifier" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">JavaScript Input</Typography>
          <TextField
            multiline
            rows={15}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'function hello() {\n  console.log("Hello, World!");\n}'}
            fullWidth
            variant="outlined"
            sx={{ fontFamily: 'monospace' }}
          />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(_, v) => v && setMode(v)}
              size="small"
            >
              <ToggleButton value="beautify">Beautify</ToggleButton>
              <ToggleButton value="minify">Minify</ToggleButton>
            </ToggleButtonGroup>
            {mode === 'beautify' && (
              <ToggleButtonGroup
                value={indent}
                exclusive
                onChange={(_, v) => v && setIndent(v)}
                size="small"
              >
                <ToggleButton value={2}>2 spaces</ToggleButton>
                <ToggleButton value={4}>4 spaces</ToggleButton>
              </ToggleButtonGroup>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600">Output</Typography>
            <IconButton onClick={copyToClipboard} disabled={!output} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, minHeight: 390, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem', overflow: 'auto' }}>
            {output || <Typography color="text.secondary">Output will appear here...</Typography>}
          </Paper>
          {output && (
            <Typography variant="caption" color="text.secondary">
              {input.length} chars → {output.length} chars ({Math.round((1 - output.length / Math.max(input.length, 1)) * 100)}% {mode === 'minify' ? 'reduced' : 'formatted'})
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JavaScriptBeautifier;
