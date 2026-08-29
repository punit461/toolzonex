'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip, TextField, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Row { pattern: string; description: string; }
interface Section { title: string; rows: Row[]; }

const SECTIONS: Section[] = [
  {
    title: 'Character Classes',
    rows: [
      { pattern: '.', description: 'Any character except newline' },
      { pattern: '\\d', description: 'Any digit (0-9)' },
      { pattern: '\\D', description: 'Any non-digit' },
      { pattern: '\\w', description: 'Word character (letter, digit, underscore)' },
      { pattern: '\\W', description: 'Non-word character' },
      { pattern: '\\s', description: 'Whitespace (space, tab, newline)' },
      { pattern: '\\S', description: 'Non-whitespace' },
      { pattern: '[abc]', description: 'Any of a, b, or c' },
      { pattern: '[^abc]', description: 'Any character except a, b, or c' },
      { pattern: '[a-z]', description: 'Any lowercase letter a through z' },
    ],
  },
  {
    title: 'Quantifiers',
    rows: [
      { pattern: '*', description: 'Zero or more of the preceding token' },
      { pattern: '+', description: 'One or more of the preceding token' },
      { pattern: '?', description: 'Zero or one of the preceding token (optional)' },
      { pattern: '{n}', description: 'Exactly n occurrences' },
      { pattern: '{n,}', description: 'n or more occurrences' },
      { pattern: '{n,m}', description: 'Between n and m occurrences' },
      { pattern: '*?', description: 'Zero or more, non-greedy (lazy)' },
      { pattern: '+?', description: 'One or more, non-greedy (lazy)' },
    ],
  },
  {
    title: 'Anchors & Boundaries',
    rows: [
      { pattern: '^', description: 'Start of string (or line, with the m flag)' },
      { pattern: '$', description: 'End of string (or line, with the m flag)' },
      { pattern: '\\b', description: 'Word boundary' },
      { pattern: '\\B', description: 'Not a word boundary' },
    ],
  },
  {
    title: 'Groups & Alternation',
    rows: [
      { pattern: '(abc)', description: 'Capturing group' },
      { pattern: '(?:abc)', description: 'Non-capturing group' },
      { pattern: '(?<name>abc)', description: 'Named capturing group' },
      { pattern: 'a|b', description: 'Alternation — matches a or b' },
      { pattern: '(?=abc)', description: 'Positive lookahead' },
      { pattern: '(?!abc)', description: 'Negative lookahead' },
      { pattern: '(?<=abc)', description: 'Positive lookbehind' },
      { pattern: '(?<!abc)', description: 'Negative lookbehind' },
    ],
  },
  {
    title: 'Common Flags',
    rows: [
      { pattern: 'g', description: 'Global — find all matches, not just the first' },
      { pattern: 'i', description: 'Case-insensitive matching' },
      { pattern: 'm', description: 'Multiline — ^ and $ match line boundaries' },
      { pattern: 's', description: 'Dot matches newline characters too' },
    ],
  },
  {
    title: 'Common Patterns',
    rows: [
      { pattern: '^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$', description: 'Email address' },
      { pattern: '^https?:\\/\\/[\\w.-]+(?:\\.[a-zA-Z]{2,})+[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]*$', description: 'URL (http/https)' },
      { pattern: '^\\+?[0-9]{7,15}$', description: 'Phone number (digits, optional leading +)' },
      { pattern: '^\\d{5}(-\\d{4})?$', description: 'US ZIP code (5 or ZIP+4)' },
      { pattern: '^#(?:[0-9a-fA-F]{3}){1,2}$', description: 'Hex color code' },
      { pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$', description: 'Password: 8+ chars, upper, lower, digit' },
    ],
  },
];

function CopyableRow({ row }: { row: Row }) {
  return (
    <TableRow hover>
      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{row.pattern}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell align="right" sx={{ width: 48 }}>
        <Tooltip title="Copy pattern">
          <IconButton size="small" onClick={() => navigator.clipboard.writeText(row.pattern)}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

const QuickTester = () => {
  const [pattern, setPattern] = useState('\\d+');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Order 42 shipped, invoice 108 paid.');

  const { matches, error } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const found = testString.match(re);
      return { matches: found ? Array.from(found) : [], error: null };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : 'Invalid pattern' };
    }
  }, [pattern, flags, testString]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField label="Pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} sx={{ flex: 2, minWidth: 200, fontFamily: 'monospace' }} />
        <TextField label="Flags" value={flags} onChange={(e) => setFlags(e.target.value)} sx={{ flex: 1, minWidth: 100 }} />
      </Box>
      <TextField label="Test string" value={testString} onChange={(e) => setTestString(e.target.value)} fullWidth multiline rows={2} />
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Alert severity={matches.length ? 'success' : 'info'}>
          {matches.length ? `${matches.length} match(es): ${matches.join(', ')}` : 'No matches found.'}
        </Alert>
      )}
    </Box>
  );
};

const RegexCheatSheetContent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="subtitle1" fontWeight="600" gutterBottom>Quick Pattern Tester</Typography>
      <QuickTester />
    </Paper>

    {SECTIONS.map((section) => (
      <Box key={section.title}>
        <Typography variant="h3" gutterBottom>{section.title}</Typography>
        <Paper variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Pattern</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {section.rows.map((row) => <CopyableRow key={row.pattern} row={row} />)}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    ))}
  </Box>
);

const RegexCheatSheet = () => {
  const content = (
    <>
      <Typography variant="h2">Free Regex Cheat Sheet — Common Patterns & Syntax</Typography>
      <Typography variant="body1">
        A categorized quick reference for regular expression syntax — character classes, quantifiers, anchors,
        groups, flags, and ready-to-use patterns for email, URL, phone, and more. Every pattern has a one-click
        copy button.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Browse the categorized tables below, or use the quick tester at the top to try a pattern against a
        sample string right away. Click the copy icon next to any pattern to grab it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Need an email-matching regex? Copy <code>^[\w.+-]+@[\w-]+\.[a-zA-Z]{'{2,}'}$</code> straight from the
        Common Patterns table below.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Looking up regex syntax you don't use often enough to memorize.</li>
          <li>Grabbing a ready-made pattern for email, URL, or password validation.</li>
          <li>Quickly testing whether a pattern matches a sample string before using it in code.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these patterns guaranteed to cover every edge case?</Typography>
      <Typography variant="body1">
        No — patterns like the email and URL examples cover the vast majority of real-world cases but aren't
        exhaustive against every technically valid edge case in their respective specifications. For strict
        validation (like real email deliverability), pair regex checks with an actual verification step.
      </Typography>
      <Typography variant="h3">Does this tool support every regex flavor?</Typography>
      <Typography variant="body1">
        The reference and tester use JavaScript's regex engine (ECMAScript syntax). Most patterns here also work
        in PCRE-based languages like Python or PHP, but some advanced features may differ slightly.
      </Typography>
      <Typography variant="h3">Is my test data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the quick tester runs entirely client-side in your browser. Nothing you type is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/regex-cheat-sheet" content={content}>
      <RegexCheatSheetContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RegexCheatSheet;
