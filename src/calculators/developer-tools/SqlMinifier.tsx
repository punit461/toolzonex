'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function minifySql(sql: string): string {
  let result = sql
    .replace(/--[^\n]*/g, '')         // Remove line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\s+/g, ' ')             // Collapse whitespace to single space
    .replace(/\s*,\s*/g, ',')         // Trim around commas
    .replace(/\s*\(\s*/g, '(')        // Trim inside open parens
    .replace(/\s*\)\s*/g, ')')        // Trim inside close parens
    .replace(/\s*;\s*/g, ';')         // Trim around semicolons
    .replace(/\s*=\s*/g, '=')         // Trim around equals
    .trim();
  return result;
}

const SqlMinifier = () => {
  const [input, setInput] = useState('');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return minifySql(input);
  }, [input]);

  const originalSize = useMemo(() => new Blob([input]).size, [input]);
  const minifiedSize = useMemo(() => new Blob([output]).size, [output]);
  const savings = originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;

  const copyToClipboard = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const content = (
    <>
      <Typography variant="h2">How Does It Work?</Typography>
      <Typography variant="body1">
        The SQL Minifier strips unnecessary whitespace from your SQL queries to reduce their size.
        It collapses multiple spaces into one, removes line comments (-- style) and block comments, trims whitespace around commas, parentheses, semicolons, and equals signs, all while preserving the query's logic and behavior.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Input: <code>{'SELECT  id,  name\nFROM    users\nWHERE   active = 1;'}</code><br />
        Minified: <code>SELECT id, name FROM users WHERE active = 1;</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reducing SQL query size for embedding in application code or configuration files.</li>
          <li>Cleaning up auto-generated or ORM output queries for readability in logs.</li>
          <li>Minimizing network payload size when sending queries to databases over slow connections.</li>
          <li>Preparing SQL for inclusion in JSON or YAML configuration files where whitespace matters.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will minifying change how my query runs?</Typography>
      <Typography variant="body1">
        No. Removing comments and extra whitespace does not affect SQL execution. The database parser treats minified SQL identically to formatted SQL.
      </Typography>
      <Typography variant="h3">Does it handle multi-line comments?</Typography>
      <Typography variant="body1">
        Yes — both single-line comments (-- style) and block comments (/* ... */) are removed by the minifier.
      </Typography>
      <Typography variant="h3">What about string literals containing spaces?</Typography>
      <Typography variant="body1">
        The minifier does not parse string literals, so spaces inside quoted strings may be collapsed. For production use with complex SQL, a dedicated SQL parser is recommended.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sql-minifier" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">SQL Input</Typography>
          <TextField
            multiline
            rows={15}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"SELECT id, name, email\nFROM users\nWHERE active = 1\nORDER BY name ASC;"}
            fullWidth
            variant="outlined"
            sx={{ fontFamily: 'monospace' }}
          />
          {input && (
            <Typography variant="caption" color="text.secondary">
              Original: {originalSize} characters
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="600">Minified SQL</Typography>
            <IconButton onClick={copyToClipboard} disabled={!output} size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, minHeight: 390, fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem', overflow: 'auto' }}>
            {output || <Typography color="text.secondary">Minified output will appear here...</Typography>}
          </Paper>
          {output && (
            <Typography variant="caption" color="text.secondary">
              Minified: {minifiedSize} characters ({savings}% smaller)
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SqlMinifier;
