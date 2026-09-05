'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function escapeRegex(text: string, escapeSlash: boolean): string {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escapeSlash ? escaped.replace(/\//g, '\\/') : escaped;
}

const RegexEscapeToolContent = () => {
  const [input, setInput] = useState('');
  const [escapeSlash, setEscapeSlash] = useState(false);

  const output = useMemo(() => escapeRegex(input, escapeSlash), [input, escapeSlash]);

  const copy = () => output && navigator.clipboard.writeText(output);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Plain Text</Typography>
        <TextField
          multiline
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 3.14 + (a*b)?"
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
        <FormControlLabel
          control={<Checkbox checked={escapeSlash} onChange={(e) => setEscapeSlash(e.target.checked)} />}
          label="Also escape forward slashes (for JS /regex/ literals)"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Escaped for Regex</Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output} size="small">Copy</Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250, bgcolor: 'grey.50', overflow: 'auto', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {output || <Typography color="text.secondary">Escaped text will appear here...</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const RegexEscapeTool = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Regex Escape Tool</Typography>
      <Typography variant="body1">
        Type or paste any plain text you want to match LITERALLY inside a regular expression. Every regex
        special character — <code>. * + ? ^ $ {'{'} {'}'} ( ) | [ ] \</code> — is automatically prefixed with a
        backslash so it's treated as a literal character instead of regex syntax, using the standard{' '}
        <code>{"text.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')"}</code> approach. Toggle the extra option
        to also escape forward slashes if you're embedding the result inside a JavaScript{' '}
        <code>/pattern/</code> literal.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The input <code>3.14 + (a*b)?</code> becomes <code>3\.14 \+ \(a\*b\)\?</code> — every character that
        would otherwise have special meaning in a regex is escaped, so the resulting pattern matches that
        exact literal text and nothing else.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Safely inserting user-supplied or dynamic text into a regex pattern built at runtime.</li>
          <li>Building a "find literal text" search pattern from a string that contains punctuation like parentheses or periods.</li>
          <li>Preparing a filename, URL, or version string (all of which often contain dots) to be matched exactly inside a larger pattern.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Regex Tester or Regex Replace Tester?</strong> Our <a href="/developer-tools/regex-tester">Regex Tester</a> and <a href="/developer-tools/regex-replace-tester">Regex Replace Tester</a> TEST or apply a regex pattern you already have against sample text. This Regex Escape Tool does something upstream of that — it prepares arbitrary literal text so it can be SAFELY embedded inside a regex pattern without its characters being misinterpreted as regex syntax.</li>
          <li><strong>Why would I need to escape plain text before using it in a regex?</strong> Characters like <code>.</code>, <code>*</code>, and <code>(</code> have special meaning in regular expressions. If you insert unescaped user input or a dynamic string containing those characters directly into a pattern, it can match unintended text or throw a syntax error — escaping first guarantees it's treated as literal text.</li>
          <li><strong>Do I need to escape forward slashes too?</strong> Only if you're building a JavaScript regex literal written between two slashes, like <code>/pattern/</code> — in that context an unescaped <code>/</code> would end the pattern early. If you're passing a string to <code>new RegExp(pattern)</code> instead, forward slashes don't need escaping.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/regex-escape-tool" content={content}>
      <RegexEscapeToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RegexEscapeTool;
