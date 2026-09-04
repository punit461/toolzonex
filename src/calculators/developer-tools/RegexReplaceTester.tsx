'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Checkbox, FormControlLabel, FormGroup, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RegexReplaceTesterContent = () => {
  const [pattern, setPattern] = useState<string>('(\\w+)@(\\w+)\\.com');
  const [flagG, setFlagG] = useState<boolean>(true);
  const [flagI, setFlagI] = useState<boolean>(false);
  const [flagM, setFlagM] = useState<boolean>(false);
  const [sampleText, setSampleText] = useState<string>('Contact us at hello@example.com or sales@example.com.');
  const [replacement, setReplacement] = useState<string>('$1[at]$2[dot]com');

  const { output, error } = useMemo(() => {
    if (!pattern) return { output: sampleText, error: null };
    try {
      const flags = `${flagG ? 'g' : ''}${flagI ? 'i' : ''}${flagM ? 'm' : ''}`;
      const regex = new RegExp(pattern, flags);
      return { output: sampleText.replace(regex, replacement), error: null };
    } catch (e) {
      return { output: sampleText, error: e instanceof Error ? e.message : 'Invalid regular expression' };
    }
  }, [pattern, flagG, flagI, flagM, sampleText, replacement]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'flex-start' }}>
        <TextField
          label="Regular Expression Pattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          fullWidth
          sx={{ flex: 1, fontFamily: 'monospace' }}
          error={!!error}
          helperText={error}
        />
        <Paper variant="outlined" sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
          <FormGroup row>
            <FormControlLabel control={<Checkbox checked={flagG} onChange={(e) => setFlagG(e.target.checked)} size="small" />} label="g (Global)" />
            <FormControlLabel control={<Checkbox checked={flagI} onChange={(e) => setFlagI(e.target.checked)} size="small" />} label="i (Ignore Case)" />
            <FormControlLabel control={<Checkbox checked={flagM} onChange={(e) => setFlagM(e.target.checked)} size="small" />} label="m (Multiline)" />
          </FormGroup>
        </Paper>
      </Box>

      <TextField
        label="Replacement String"
        value={replacement}
        onChange={(e) => setReplacement(e.target.value)}
        fullWidth
        sx={{ fontFamily: 'monospace' }}
        helperText="Supports JavaScript replace syntax like $1, $2 for capture groups."
      />

      <TextField
        label="Sample Text"
        multiline
        rows={5}
        value={sampleText}
        onChange={(e) => setSampleText(e.target.value)}
        fullWidth
        sx={{ fontFamily: 'monospace' }}
      />

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Result After Replace</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Paper variant="outlined" sx={{ p: 2, minHeight: 100, bgcolor: 'action.hover', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {output}
        </Paper>
      </Box>
    </Box>
  );
};

const RegexReplaceTester = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Regex Replace Tester</Typography>
      <Typography variant="body1">
        Enter a regular expression pattern, toggle the g (global), i (ignore case), and m (multiline) flags,
        type a replacement string, and paste sample text — the tool runs JavaScript&apos;s{' '}
        <code>String.replace()</code> live and shows exactly what the resulting text looks like. The
        replacement string supports standard capture-group syntax like <code>$1</code> and <code>$2</code> to
        reuse parts of each match.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Result = sampleText.replace(new RegExp(pattern, flags), replacement)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pattern <code>(\w+)@(\w+)\.com</code> with global matching against &quot;Contact us at
        hello@example.com or sales@example.com.&quot;, replaced with <code>$1[at]$2[dot]com</code>, produces
        &quot;Contact us at hello[at]example[dot]com or sales[at]example[dot]com.&quot; — each captured
        group is reinserted into the replacement text.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Previewing a find-and-replace regex before running it against real code or data.</li>
          <li>Testing capture-group substitution patterns like <code>$1</code> and <code>$2</code> before using them in scripts.</li>
          <li>Cleaning or reformatting sample text (like masking emails or normalizing whitespace) interactively.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Regex Tester?</strong> The Regex Tester only tests and highlights matches within your sample text — it shows you what a pattern finds, but doesn't change anything. This Regex Replace Tester goes one step further and specifically previews the find-and-replace OUTPUT text, running your pattern through JavaScript's <code>String.replace()</code> with your replacement string so you can see the transformed result before using it in real code.</li>
          <li><strong>What happens if my pattern is invalid?</strong> The tool catches the error from JavaScript's regex engine and displays a friendly error message instead of crashing, so you can fix your pattern and keep experimenting without losing your sample text or replacement string.</li>
          <li><strong>How do I reuse captured groups in the replacement?</strong> Wrap the parts of your pattern you want to reuse in parentheses, then reference them in the replacement string as <code>$1</code>, <code>$2</code>, and so on, in the order the groups appear in the pattern — this is standard JavaScript <code>String.replace()</code> syntax.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/regex-replace-tester" content={content}>
      <RegexReplaceTesterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RegexReplaceTester;
