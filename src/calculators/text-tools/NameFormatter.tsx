'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LOWERCASE_PARTICLES = new Set(['von', 'van', 'de', 'la', 'der', 'den', 'del', 'di', 'da', 'le']);
const SUFFIXES = new Set(['jr', 'jr.', 'sr', 'sr.', 'ii', 'iii', 'iv', 'v']);

function capitalizeWord(word: string, isFirstWordOfName: boolean): string {
  if (!word) return word;

  const lower = word.toLowerCase();

  // Suffixes: keep a canonical capitalization (Jr., Sr., II, III, IV, V), never lowercase mid-name.
  if (SUFFIXES.has(lower)) {
    if (lower === 'jr' || lower === 'jr.') return 'Jr.';
    if (lower === 'sr' || lower === 'sr.') return 'Sr.';
    return lower.toUpperCase();
  }

  // Particles like von/van/de/la stay lowercase unless they open the whole name.
  if (!isFirstWordOfName && LOWERCASE_PARTICLES.has(lower)) {
    return lower;
  }

  // O'Brien style
  if (/^o'/i.test(word)) {
    const rest = word.slice(2);
    return `O'${rest.charAt(0).toUpperCase()}${rest.slice(1).toLowerCase()}`;
  }

  // Mac-prefixed names like MacArthur (keep the letter after "Mac" capitalized if the
  // remainder looks like a full word, e.g. "macarthur" -> "MacArthur").
  if (/^mac[a-z]{2,}$/i.test(word) && word.length > 5) {
    return `Mac${word.charAt(3).toUpperCase()}${word.slice(4).toLowerCase()}`;
  }

  // Mc-prefixed names like McDonald
  if (/^mc[a-z]+$/i.test(word) && word.length > 2) {
    return `Mc${word.charAt(2).toUpperCase()}${word.slice(3).toLowerCase()}`;
  }

  // Hyphenated names: capitalize each hyphen-joined segment independently.
  if (word.includes('-')) {
    return word
      .split('-')
      .map((seg) => capitalizeWord(seg, isFirstWordOfName))
      .join('-');
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function formatName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.map((w, i) => capitalizeWord(w, i === 0)).join(' ');
}

const NameFormatterContent = () => {
  const [raw, setRaw] = useState("JOHN SMITH\njane doe\nMARY-JANE o'BRIEN\nludwig van BEETHOVEN\nrobert downey jr");

  const lines = useMemo(
    () => raw.split('\n').filter((l) => l.trim().length > 0),
    [raw]
  );

  const formatted = useMemo(() => lines.map(formatName), [lines]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Name(s) — one per line"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        multiline
        rows={10}
        fullWidth
      />

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Formatted Name(s)</Typography>
        {formatted.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            Enter a name to see it properly capitalized here.
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>
              {formatted.map((name, i) => (
                <Typography key={i}>{name}</Typography>
              ))}
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const NameFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Name Formatter</Typography>
      <Typography variant="body1">
        Paste a name, or a list of names one per line, in any inconsistent casing — all caps, all lowercase,
        or a mix — and the tool properly capitalizes each one. It includes hand-written handling for common
        name patterns: <code>Mc</code> prefixes (McDonald), <code>Mac</code> prefixes (MacArthur),
        <code> O&apos;</code> prefixes (O&apos;Brien), lowercase particles like <code>von</code>,{' '}
        <code>van</code>, <code>de</code>, and <code>la</code> when they appear mid-name (as in &quot;Ludwig
        van Beethoven&quot;), and suffixes like <code>Jr.</code>, <code>Sr.</code>, <code>II</code>, and{' '}
        <code>III</code>, which are kept in their proper form rather than lowercased.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>JOHN SMITH</code> becomes <code>John Smith</code>; <code>MARY-JANE o&apos;BRIEN</code> becomes{' '}
        <code>Mary-Jane O&apos;Brien</code>; <code>ludwig van BEETHOVEN</code> becomes{' '}
        <code>Ludwig van Beethoven</code>; and <code>robert downey jr</code> becomes{' '}
        <code>Robert Downey Jr.</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fixing inconsistent capitalization in a spreadsheet or database column of names.</li>
          <li>Cleaning up all-caps names pasted from a form, PDF, or legacy system.</li>
          <li>Standardizing name capitalization before printing badges, certificates, or mailing labels.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Name Splitter?</strong> The <a href="/text-tools/name-splitter">Name Splitter</a> takes a full name and breaks it apart into separate first, middle, and last name fields. This Name Formatter does the opposite kind of work — it never splits the name into parts, it only fixes the capitalization of the name as a whole, leaving it as one string.</li>
          <li><strong>Will every unusual name be handled perfectly?</strong> No naming convention rule set can cover every name in the world — this tool uses hand-written patterns for the most common prefixes, particles, and suffixes, but unusual or less common name structures may still need manual review.</li>
          <li><strong>Are particles like "von" or "de" always lowercased?</strong> Only when they appear in the middle of a name, following common convention (as in "Ludwig van Beethoven"). If one of these words is the very first word of the name, it&apos;s capitalized instead, since names don&apos;t typically start with a lowercase particle.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/name-formatter" content={content}>
      <NameFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NameFormatter;
