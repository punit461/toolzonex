'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

function isVowel(ch: string): boolean {
  return VOWELS.has(ch);
}

// Translates a single word (letters only, no surrounding punctuation) to Pig Latin,
// preserving whether the original started with a capital letter.
function pigLatinWord(word: string): string {
  if (!word) return word;
  const startedCapital = word[0] === word[0].toUpperCase() && /[a-zA-Z]/.test(word[0]);
  const lower = word.toLowerCase();

  let result: string;
  if (isVowel(lower[0])) {
    // Vowel-leading word: append "way" (matches the common "apple" -> "appleway" convention).
    result = `${lower}way`;
  } else {
    // Consonant-leading word: move the leading consonant cluster (up to the first vowel) to
    // the end and append "ay". If there's no vowel at all (e.g. "my", "gym" treated as all
    // consonants), the whole word moves and "ay" is appended.
    let i = 0;
    while (i < lower.length && !isVowel(lower[i])) i++;
    if (i === 0) {
      result = `${lower}way`;
    } else if (i === lower.length) {
      result = `${lower}ay`;
    } else {
      result = `${lower.slice(i)}${lower.slice(0, i)}ay`;
    }
  }

  return startedCapital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
}

// Applies the word-level translation across a full sentence, preserving spacing and
// leaving non-letter characters (punctuation) attached in place around each word.
function toPigLatin(sentence: string): string {
  return sentence.replace(/[A-Za-z]+/g, (word) => pigLatinWord(word));
}

const PigLatinTranslatorContent = () => {
  const [input, setInput] = useState('Hello, how are you today?');

  const output = useMemo(() => toPigLatin(input), [input]);

  const copy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="English Text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={8}
        fullWidth
      />

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Pig Latin</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output}>Copy</Button>
        </Stack>
        <TextField
          multiline
          rows={8}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
        />
      </Box>
    </Box>
  );
};

const PigLatinTranslator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Pig Latin Translator</Typography>
      <Typography variant="body1">
        Type or paste any English sentence and it&apos;s translated to Pig Latin instantly, word by word.
        For a word starting with a consonant or consonant cluster, the tool moves that leading cluster (up
        to the first vowel) to the end of the word and appends &quot;ay&quot; — so &quot;hello&quot; becomes
        &quot;ellohay&quot; and &quot;string&quot; becomes &quot;ingstray&quot;. For a word starting with a
        vowel, it simply appends &quot;way&quot; to the end — so &quot;apple&quot; becomes
        &quot;appleway&quot;. Spacing and punctuation are preserved exactly as in the original sentence.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing &quot;Hello, how are you today?&quot; produces &quot;Ellohay, owhay areway ouyay
        odaytay?&quot; — each word translated individually while the comma, question mark, and spacing stay
        in place.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Playing the classic Pig Latin wordplay game with friends or kids.</li>
          <li>Creating a lighthearted secret language for notes, messages, or games.</li>
          <li>Teaching syllables, vowels, and consonant clusters in a fun, hands-on way.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can this tool translate Pig Latin back to English?</strong> No — this tool is one-directional (English to Pig Latin) by design. Reversing Pig Latin back to standard English is fundamentally ambiguous: many different English words can produce very similar or identical Pig Latin forms, so there's no reliable general rule for automatically undoing the transformation.</li>
          <li><strong>What happens to punctuation and capitalization?</strong> Punctuation stays exactly where it was relative to each word, and capitalization is preserved — if a word started with a capital letter, the translated version starts with a capital letter too.</li>
          <li><strong>What happens with a word that has no vowels, like "my" or "gym"?</strong> If no vowel is found in the word at all, the entire word is treated as the leading consonant cluster and moved to the front with "ay" appended — for example, "my" becomes "myay".</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/pig-latin-translator" content={content}>
      <PigLatinTranslatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PigLatinTranslator;
