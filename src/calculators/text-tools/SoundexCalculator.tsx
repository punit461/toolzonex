'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import { soundexLines } from '../soundex/soundexEngine';

const SoundexCalculatorContent = () => {
  const [text, setText] = useState('Robert\nRupert\nSmith\nSmyth');

  const results = useMemo(() => soundexLines(text), [text]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <TextField
          label="Word(s) or Name(s)"
          placeholder={'One word or name per line, e.g.\nRobert\nRupert'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          The Soundex code updates live as you type — enter multiple names, one per line, to compare their codes side by side.
        </Typography>
      </Box>

      {results.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {results.map((r, i) => (
              <Box
                key={`${r.word}-${i}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  py: 1,
                  px: 1.5,
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {r.word}
                </Typography>
                <Chip
                  label={r.code}
                  color="primary"
                  sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem' }}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const SoundexCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Soundex Works</Typography>
      <Typography variant="body1">
        Soundex is a phonetic algorithm developed in the early 1900s (and still an ANSI/NIST standard) that
        encodes a word — usually a name — into a 4-character code: one letter followed by three digits. Words
        that sound alike, even when spelled differently, often produce the same code, which is what makes
        Soundex useful for fuzzy, spelling-tolerant name matching.
      </Typography>
      <Typography variant="body1">
        The algorithm works in a few steps:
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ol>
          <li>Keep the first letter of the word exactly as it is.</li>
          <li>
            Convert every remaining consonant to a digit using this grouping: <strong>1</strong> = B, F, P, V;{' '}
            <strong>2</strong> = C, G, J, K, Q, S, X, Z; <strong>3</strong> = D, T; <strong>4</strong> = L;{' '}
            <strong>5</strong> = M, N; <strong>6</strong> = R.
          </li>
          <li>Drop all vowels (A, E, I, O, U) and Y — they don&apos;t get a digit.</li>
          <li>
            If two letters that map to the <em>same</em> digit sit next to each other, only the first is kept.
            H and W are treated as invisible when checking for this — so a repeated digit separated only by H
            or W is still merged into one, while a vowel in between keeps both digits.
          </li>
          <li>Pad the result with trailing zeros, or cut it short, so it&apos;s always exactly 4 characters.</li>
        </ol>
      </Box>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        1 = B F P V &nbsp;&nbsp; 2 = C G J K Q S X Z &nbsp;&nbsp; 3 = D T &nbsp;&nbsp; 4 = L &nbsp;&nbsp; 5 = M N &nbsp;&nbsp; 6 = R
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <strong>&quot;Robert&quot; → R163.</strong> R is kept as the first letter. O is a vowel and is dropped.
        B maps to 1. E is a vowel and is dropped. R maps to 6. T maps to 3. That gives R-1-6-3.
      </Typography>
      <Typography variant="body1">
        <strong>&quot;Rupert&quot; → R163.</strong> Despite the different spelling, the same steps produce the
        identical code — U, E are vowels (dropped), P maps to 1, R maps to 6, T maps to 3 — which is exactly why
        Soundex is used to catch alternate spellings of the same name.
      </Typography>
      <Typography variant="body1">
        <strong>&quot;Smith&quot; and &quot;Smyth&quot; both → S530.</strong> In &quot;Smith&quot;, S is kept, M
        maps to 5, I is a vowel (dropped), T maps to 3, H is dropped, giving S-5-3, padded to S530. In
        &quot;Smyth&quot;, S is kept, M maps to 5, Y is treated like a vowel (dropped), T maps to 3, H is
        dropped — the same S-5-3-0. Two completely different spellings, one identical code.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Genealogy and ancestry research</strong> — historical records often misspell surnames, so
            genealogy databases (including US and UK census indexes) index names by Soundex code to find every
            spelling variant of a family name at once.
          </li>
          <li>
            <strong>Fuzzy database name matching</strong> — CRM and customer databases use Soundex to catch
            duplicate records for the same person entered with different spellings (e.g. &quot;Catherine&quot;
            vs &quot;Kathryn&quot;).
          </li>
          <li>
            <strong>Spell-tolerant search</strong> — search tools use Soundex codes as a fallback so a
            misspelled name still surfaces the record the user was looking for.
          </li>
          <li>
            <strong>Data deduplication</strong> — grouping records by Soundex code is a quick way to flag
            probable duplicate names for manual review before merging datasets.
          </li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is Soundex?</Typography>
      <Typography variant="body1">
        Soundex is a phonetic algorithm that converts a word — typically a name — into a 4-character code (one
        letter plus three digits) representing how it sounds, so that similar-sounding words share the same
        code regardless of small spelling differences.
      </Typography>
      <Typography variant="h3">Why do two different spellings get the same code?</Typography>
      <Typography variant="body1">
        Soundex groups consonants that sound alike (like B, F, P, V) into the same digit and ignores vowels
        entirely, since vowels vary the most between alternate spellings of the same name. Two names that sound
        similar, such as &quot;Smith&quot; and &quot;Smyth&quot; or &quot;Robert&quot; and &quot;Rupert&quot;,
        follow the same consonant pattern and so end up with the same code even though they&apos;re spelled
        differently.
      </Typography>
      <Typography variant="h3">Is Soundex case-sensitive?</Typography>
      <Typography variant="body1">
        No. Soundex first converts the input to uppercase, so &quot;robert&quot;, &quot;Robert&quot;, and
        &quot;ROBERT&quot; all produce the identical code, R163.
      </Typography>
      <Typography variant="h3">Does Soundex work for non-English names?</Typography>
      <Typography variant="body1">
        Soundex was designed around English-language pronunciation and spelling patterns, so it works best on
        names common in English-speaking records (which is why it&apos;s still widely used in US and UK
        genealogy archives). It can still be applied to non-English names since it only looks at Latin letters,
        but the codes it produces may not reflect how those names actually sound in their original language —
        algorithms like Double Metaphone or NYSIIS tend to handle non-English names more accurately.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/text-tools/soundex-calculator"
      content={content}
    >
      <SoundexCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SoundexCalculator;
