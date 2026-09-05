'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Grid } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function detectCase(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '—';

  if (/^[a-z][a-z0-9]*([A-Z][a-z0-9]*)+$/.test(trimmed)) return 'camelCase';
  if (/^([A-Z][a-z0-9]*){2,}$/.test(trimmed)) return 'PascalCase';
  if (/^[A-Z0-9]+(_[A-Z0-9]+)+$/.test(trimmed)) return 'SCREAMING_SNAKE_CASE';
  if (/^[a-z0-9]+(_[a-z0-9]+)+$/.test(trimmed)) return 'snake_case';
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(trimmed)) return 'kebab-case';
  if (/^[A-Z]+$/.test(trimmed.replace(/[^A-Za-z]/g, '')) && /[A-Z]/.test(trimmed)) return 'UPPERCASE';
  if (/^[a-z]+$/.test(trimmed.replace(/[^A-Za-z]/g, '')) && /[a-z]/.test(trimmed)) return 'lowercase';

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    const isTitle = words.every((w) => /^[A-Z][a-z'-]*$/.test(w) || /^[a-z0-9'-]*$/.test(w) === false && /^[A-Z]/.test(w));
    const strictTitle = words.every((w) => /^[A-Z]/.test(w[0]) && !/[A-Z]/.test(w.slice(1)));
    if (strictTitle) return 'Title Case';

    const isSentence =
      /^[A-Z]/.test(words[0]) &&
      words.slice(1).every((w) => /^[a-z]/.test(w) || !/[A-Za-z]/.test(w[0]));
    if (isSentence) return 'Sentence case';
    void isTitle;
  }

  return 'Mixed / No clear pattern';
}

const TextCaseAnalyzerContent = () => {
  const [text, setText] = useState('');

  const { detected, stats } = useMemo(() => {
    const detected = detectCase(text);
    let upper = 0, lower = 0, digit = 0, space = 0, other = 0;
    for (const ch of text) {
      if (/[A-Z]/.test(ch)) upper++;
      else if (/[a-z]/.test(ch)) lower++;
      else if (/[0-9]/.test(ch)) digit++;
      else if (/\s/.test(ch)) space++;
      else other++;
    }
    return { detected, stats: { upper, lower, digit, space, other } };
  }, [text]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste text or an identifier like myVariableName, MY_CONSTANT, or a Title Case Heading..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={10}
        fullWidth
      />

      <Box>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Detected Case Style</Typography>
          <Typography variant="h5" fontWeight="bold">{detected}</Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>Character Composition</Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={6}><Typography variant="body2">Uppercase letters: <strong>{stats.upper}</strong></Typography></Grid>
            <Grid item xs={6}><Typography variant="body2">Lowercase letters: <strong>{stats.lower}</strong></Typography></Grid>
            <Grid item xs={6}><Typography variant="body2">Digits: <strong>{stats.digit}</strong></Typography></Grid>
            <Grid item xs={6}><Typography variant="body2">Spaces: <strong>{stats.space}</strong></Typography></Grid>
            <Grid item xs={6}><Typography variant="body2">Other/special: <strong>{stats.other}</strong></Typography></Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

const TextCaseAnalyzer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Text Case Analyzer</Typography>
      <Typography variant="body1">
        Paste any text or identifier into the box, and the tool checks it against common naming and case
        conventions — camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, Title Case, Sentence
        case, UPPERCASE, and lowercase — in a sensible priority order, reporting the closest match or
        &quot;Mixed / No clear pattern&quot; if nothing fits cleanly. It also breaks down your text&apos;s
        character composition: how many uppercase letters, lowercase letters, digits, spaces, and other/special
        characters it contains.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>myVariableName</code> is detected as camelCase, <code>MY_CONSTANT_VALUE</code> as
        SCREAMING_SNAKE_CASE, and <code>my-component-name</code> as kebab-case, each along with a full
        character-composition breakdown.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking what naming convention a variable, file, or identifier already follows.</li>
          <li>Auditing a codebase&apos;s naming consistency by checking sample names one at a time.</li>
          <li>Analyzing the character makeup of a password, username, or generated string.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Case Converter?</strong> The Case Converter CONVERTS text between case styles on request — you tell it which style to produce. This tool does the opposite: it ANALYZES and DETECTS what case style the input text is ALREADY written in, without changing anything.</li>
          <li><strong>What does &quot;Mixed / No clear pattern&quot; mean?</strong> It means the text doesn&apos;t cleanly match any of the recognized conventions — for example, a sentence with irregular capitalization or a string that combines multiple naming styles.</li>
          <li><strong>Does the detector check single words too?</strong> Yes, though single all-lowercase or all-uppercase words are reported simply as lowercase or UPPERCASE rather than camelCase or snake_case, since those conventions require multiple words to be meaningfully identified.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/text-case-analyzer" content={content}>
      <TextCaseAnalyzerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextCaseAnalyzer;
