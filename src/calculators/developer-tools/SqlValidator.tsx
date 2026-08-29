'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert, List, ListItem, ListItemText } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SQL_KEYWORDS = [
  'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'WITH', 'MERGE', 'TRUNCATE', 'REPLACE',
];

interface CheckResult { issues: string[]; keywordFound: string | null; }

function checkSql(sql: string): CheckResult {
  const issues: string[] = [];

  // Balanced parentheses.
  let depth = 0;
  for (const ch of sql) {
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth < 0) { issues.push('Found a closing ")" with no matching opening "(".'); break; }
    }
  }
  if (depth > 0) issues.push(`${depth} unclosed opening parenthesis "(" — check for a missing ")".`);

  // Balanced quotes (single, double, backtick) — ignoring escaped '' inside strings.
  (['\'', '"', '`'] as const).forEach((q) => {
    const count = (sql.match(new RegExp(q, 'g')) || []).length;
    if (count % 2 !== 0) issues.push(`Odd number of ${q} characters — a string literal may be unterminated.`);
  });

  // At least one recognized keyword.
  const upper = sql.toUpperCase();
  const keywordFound = SQL_KEYWORDS.find((kw) => new RegExp(`\\b${kw}\\b`).test(upper)) || null;
  if (!keywordFound) issues.push("No recognized SQL statement keyword found (SELECT, INSERT, UPDATE, DELETE, CREATE, etc.).");

  // Common typos / sanity checks.
  if (/\bSELECT\b/i.test(sql) && !/\bFROM\b/i.test(sql) && !/\bSELECT\s+@/i.test(sql)) {
    issues.push('SELECT statement has no FROM clause — fine for a literal SELECT, but check if one was intended.');
  }
  if (/,\s*(FROM|WHERE|GROUP BY|ORDER BY|\))/i.test(sql)) {
    issues.push('A comma appears right before a clause keyword or closing parenthesis — check for a trailing comma.');
  }
  if (/\bFORM\b/i.test(sql)) issues.push('Found "FORM" — did you mean "FROM"?');
  if (/\bWHER\b/i.test(sql)) issues.push('Found "WHER" — did you mean "WHERE"?');

  return { issues, keywordFound };
}

const SAMPLE = "SELECT id, name FROM users WHERE status = 'active' ORDER BY name;";

const SqlValidatorContent = () => {
  const [input, setInput] = useState('');

  const result = useMemo(() => (input.trim() ? checkSql(input) : null), [input]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="SQL to check"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        multiline
        rows={10}
        placeholder={SAMPLE}
        sx={{ fontFamily: 'monospace' }}
      />

      {result && (
        result.issues.length === 0 ? (
          <Alert severity="success">No obvious structural issues found — balanced parentheses and quotes, and a recognized SQL keyword was detected.</Alert>
        ) : (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Alert severity="warning" sx={{ mb: 2 }}>{result.issues.length} potential issue(s) found:</Alert>
            <List dense>
              {result.issues.map((issue, i) => (
                <ListItem key={i}><ListItemText primary={issue} /></ListItem>
              ))}
            </List>
          </Paper>
        )
      )}
    </Box>
  );
};

const SqlValidator = () => {
  const content = (
    <>
      <Typography variant="h2">Free SQL Sanity Checker</Typography>
      <Typography variant="body1">
        Paste a SQL statement to run a quick basic sanity check — unbalanced parentheses, unterminated quotes,
        missing keywords, and a few common typos, all checked instantly in your browser.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your SQL into the box. The checker scans for structural issues like unbalanced brackets/quotes
        and a few common mistakes, and lists anything it finds.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>{SAMPLE}</code> passes cleanly. Removing the closing quote around <code>active</code>
        triggers an "unterminated string" warning.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Catching an unclosed parenthesis or quote before running a query.</li>
          <li>Spotting a trailing comma left behind after editing a column list.</li>
          <li>A quick first-pass check before pasting SQL into a real database client.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this fully validate SQL syntax for my database?</Typography>
      <Typography variant="body1">
        No — this is a basic structural sanity-checker, not a full SQL parser. It can't validate every rule of
        every SQL dialect (MySQL, PostgreSQL, SQL Server, etc.) — it only checks for unbalanced
        parentheses/quotes, the presence of a recognized statement keyword, and a few common typos. Always test
        real queries against your actual database.
      </Typography>
      <Typography variant="h3">Why did it flag my valid query?</Typography>
      <Typography variant="body1">
        Some warnings are heuristic (like the trailing-comma check) and can trigger on valid, unusual syntax.
        Treat flagged issues as things worth double-checking, not definitive errors.
      </Typography>
      <Typography variant="h3">Is my SQL uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — checking happens entirely client-side in your browser. Nothing you paste is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sql-validator" content={content}>
      <SqlValidatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SqlValidator;
