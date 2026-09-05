'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'CROSS', 'ON',
  'AND', 'OR', 'NOT', 'NULL', 'IS', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'INSERT', 'INTO',
  'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'ADD', 'COLUMN',
  'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'UNIQUE', 'CHECK', 'DEFAULT',
  'CONSTRAINT', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'DISTINCT', 'AS',
  'UNION', 'ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
  'ASC', 'DESC', 'VIEW', 'TRIGGER', 'PROCEDURE', 'FUNCTION', 'RETURNS', 'BEGIN', 'COMMIT',
  'ROLLBACK', 'TRANSACTION', 'GRANT', 'REVOKE', 'TRUNCATE', 'CASCADE', 'WITH', 'RECURSIVE',
  'OVER', 'PARTITION', 'USING', 'NATURAL', 'IF', 'WHILE', 'DECLARE', 'VARCHAR', 'INT',
  'INTEGER', 'FLOAT', 'DOUBLE', 'DECIMAL', 'DATE', 'DATETIME', 'TIMESTAMP', 'BOOLEAN', 'TEXT',
  'BLOB', 'REPLACE',
]);

// Matches single-quoted string literals as one token (so their contents are left untouched),
// otherwise matches individual words so each can be checked against the keyword set.
const TOKEN_REGEX = /('(?:[^'\\]|\\.)*')|(\b[A-Za-z_][A-Za-z0-9_]*\b)/g;

function uppercaseKeywords(sql: string): string {
  return sql.replace(TOKEN_REGEX, (match, stringLiteral, word) => {
    if (stringLiteral) return stringLiteral;
    if (word && SQL_KEYWORDS.has(word.toUpperCase())) return word.toUpperCase();
    return match;
  });
}

const SAMPLE = "select id, name from users where status = 'active' and age > 18 order by name limit 10;";

const SqlKeywordsUppercaseContent = () => {
  const [input, setInput] = useState('');

  const output = useMemo(() => (input.trim() ? uppercaseKeywords(input) : ''), [input]);

  const copy = () => output && navigator.clipboard.writeText(output);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">SQL Input</Typography>
        <TextField
          multiline
          rows={14}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={SAMPLE}
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <Button variant="outlined" onClick={() => setInput(SAMPLE)}>Load Sample</Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Output (Keywords Uppercased)</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 340, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {output || <Typography color="text.secondary">Output will appear here...</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const SqlKeywordsUppercase = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use SQL Keywords Uppercase</Typography>
      <Typography variant="body1">
        Paste any SQL query into the input box. This tool scans it against a list of roughly 70 common SQL
        keywords (<code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>JOIN</code>,{' '}
        <code>GROUP</code>, <code>ORDER</code>, and many more) and converts every recognized keyword to
        UPPERCASE, matched as a whole word and case-insensitively — while leaving table names, column names,
        numbers, and punctuation completely untouched. Content inside single-quoted string literals is
        skipped entirely, so a value like <code>'select this'</code> is never mistaken for a keyword.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Input <code>{"select id, name from users where status = 'active'"}</code> becomes{' '}
        <code>{"SELECT id, name FROM users WHERE status = 'active'"}</code> — every recognized keyword is
        capitalized, table/column names are left as-is, and the quoted string <code>'active'</code> is
        untouched.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Standardizing keyword casing in SQL before committing it to a shared codebase or style guide.</li>
          <li>Cleaning up lowercase SQL generated by a tool or copied from documentation.</li>
          <li>Making a long query easier to scan by visually distinguishing keywords from identifiers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the SQL Formatter or SQL Beautifier?</strong> Our <a href="/developer-tools/sql-formatter">SQL Formatter</a> and <a href="/developer-tools/sql-beautifier">SQL Beautifier</a> reformat whitespace and indentation, restructuring the query onto multiple lines. This tool ONLY changes keyword casing — every other character, including line breaks and spacing, is left exactly as you typed it.</li>
          <li><strong>Will this change text inside string literals?</strong> No — content inside single-quoted strings is detected and skipped, so a value like <code>'select all rows'</code> stays exactly as written even though it contains words that would otherwise be recognized as keywords.</li>
          <li><strong>Does it recognize every SQL keyword from every database dialect?</strong> It covers roughly 70 of the most common standard SQL keywords used across MySQL, PostgreSQL, SQLite, and SQL Server. Highly dialect-specific keywords not on that list are left in their original case.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sql-keywords-uppercase" content={content}>
      <SqlKeywordsUppercaseContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SqlKeywordsUppercase;
