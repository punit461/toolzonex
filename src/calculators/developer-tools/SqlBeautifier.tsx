'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MAJOR_KEYWORDS = ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX', 'VIEW', 'AS', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'SET', 'VALUES', 'INTO', 'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'EXISTS', 'IF', 'REPLACE', 'TRUNCATE'];

function formatSql(sql: string): string {
  const normalized = sql.replace(/\s+/g, ' ').trim();
  const tokens: string[] = [];
  let current = '';
  let inSingle = false;
  let inDouble = false;

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (ch === "'" && !inDouble) { inSingle = !inSingle; current += ch; continue; }
    if (ch === '"' && !inSingle) { inDouble = !inDouble; current += ch; continue; }
    if (inSingle || inDouble) { current += ch; continue; }

    if (ch === ' ') {
      if (current) tokens.push(current);
      current = '';
      continue;
    }
    if (ch === ',' || ch === '(' || ch === ')') {
      if (current) tokens.push(current);
      tokens.push(ch);
      current = '';
      continue;
    }
    current += ch;
  }
  if (current) tokens.push(current);

  const upper = tokens.map((t) => t.toUpperCase());
  const lines: string[] = [];
  let indent = 0;
  const INDENT = '    ';

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    const u = upper[i];

    if (u === ')') indent = Math.max(0, indent - 1);

    if (['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'SET', 'VALUES', 'INTO', 'ON', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'UNION', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE'].includes(u)) {
      if (lines.length > 0) lines.push('');
      lines.push(INDENT.repeat(indent) + tok);
      indent++;
    } else if (u === 'AND' || u === 'OR') {
      lines.push(INDENT.repeat(indent) + tok);
    } else if (u === ',') {
      lines.push(lines.pop() + ',');
    } else if (u === '(') {
      lines.push(INDENT.repeat(indent) + tok);
      indent++;
    } else {
      if (lines.length === 0) {
        lines.push(INDENT.repeat(indent) + tok);
      } else {
        lines[lines.length - 1] += ' ' + tok;
      }
    }
  }

  return lines.join('\n');
}

const SqlBeautifierContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleBeautify = () => {
    if (!input.trim()) { setOutput(''); setError(null); return; }
    try {
      setOutput(formatSql(input));
      setError(null);
    } catch {
      setError('Failed to format SQL. Check the query syntax.');
    }
  };

  const copyToClipboard = async () => {
    if (output) await navigator.clipboard.writeText(output);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Minified SQL</Typography>
        <TextField
          multiline
          rows={15}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SELECT id, name FROM users WHERE age > 18 AND country = 'US' ORDER BY name LIMIT 10"
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="contained" onClick={handleBeautify} fullWidth>Beautify SQL</Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Formatted SQL</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, height: '100%', minHeight: 395, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {output || <Typography color="text.secondary">Formatted SQL will appear here...</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const SqlBeautifier = () => {
  const content = (
    <>
      <Typography variant="h2">Free SQL Beautifier &amp; Formatter</Typography>
      <Typography variant="body1">
        Paste a minified or single-line SQL query and get a cleanly formatted version with proper indentation and keywords on separate lines. Runs entirely in your browser — no data is sent anywhere.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your SQL into the left panel and click &quot;Beautify SQL.&quot; The formatted query appears on the right, with major keywords (SELECT, FROM, WHERE, JOIN, etc.) placed on their own lines and logical indentation for nested clauses.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A single-line query like <code>SELECT id, name FROM users WHERE age &gt; 18 AND country = &apos;US&apos; ORDER BY name</code> is transformed into a multi-line, indented format that&apos;s easy to read and maintain.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading minified SQL generated by ORMs or query builders.</li>
          <li>Formatting SQL before committing it to a code repository.</li>
          <li>Cleaning up SQL copied from a log file or monitoring tool.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this validate SQL syntax?</Typography>
      <Typography variant="body1">
        No — this tool only reformats whitespace and indentation. It does not parse or validate SQL syntax. Use a dedicated SQL linter for syntax checking.
      </Typography>
      <Typography variant="h3">Does it support all SQL dialects?</Typography>
      <Typography variant="body1">
        The formatter handles standard SQL keywords and works well with MySQL, PostgreSQL, SQLite, and SQL Server. Dialect-specific syntax (like PL/pgSQL blocks) may not format perfectly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sql-beautifier" content={content}>
      <SqlBeautifierContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SqlBeautifier;
