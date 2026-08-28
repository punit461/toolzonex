'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ONES: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16,
  seventeen: 17, eighteen: 18, nineteen: 19,
};

const TENS: Record<string, number> = {
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};

const SCALES: Record<string, number> = {
  hundred: 100,
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
  trillion: 1000000000000,
};

const DIGIT_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const wordsToNumber = (input: string): { value: number | null; error: string | null } => {
  const cleaned = input
    .toLowerCase()
    .replace(/,/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleaned) return { value: null, error: 'Enter a number written in words, e.g. "one hundred twenty three".' };

  const parts = cleaned.split(' ');
  let negative = false;
  let tokens = parts;
  if (parts[0] === 'minus' || parts[0] === 'negative') {
    negative = true;
    tokens = parts.slice(1);
  }
  if (tokens.length === 0) return { value: null, error: 'A number word is missing after "minus".' };

  let total = 0;
  let current = 0;
  let afterPoint = false;
  let decimals = '';

  for (const token of tokens) {
    if (token === 'and') continue;

    if (token === 'point') {
      if (afterPoint) return { value: null, error: '"point" can only appear once.' };
      afterPoint = true;
      continue;
    }

    if (afterPoint) {
      if (!DIGIT_WORDS.includes(token)) {
        return { value: null, error: `"${token}" is not a digit word after "point".` };
      }
      decimals += String(DIGIT_WORDS.indexOf(token));
      continue;
    }

    if (token in ONES) {
      current += ONES[token];
      continue;
    }

    if (token in TENS) {
      current += TENS[token];
      continue;
    }

    if (token === 'hundred') {
      if (current === 0) return { value: null, error: '"hundred" needs a number before it.' };
      if (current > 9) return { value: null, error: 'Only the digits 1–9 can come before "hundred".' };
      current *= 100;
      continue;
    }

    if (token in SCALES) {
      if (current === 0) return { value: null, error: `"${token}" needs a number before it.` };
      total += current * SCALES[token];
      current = 0;
      continue;
    }

    return { value: null, error: `Unrecognized word "${token}".` };
  }

  const value = total + current;
  const finalValue = negative ? -value : value;
  if (Math.abs(finalValue) > Number.MAX_SAFE_INTEGER) {
    return { value: null, error: 'The number is too large to convert safely.' };
  }

  if (decimals) {
    const parsed = parseFloat(`${finalValue}.${decimals}`);
    if (isNaN(parsed)) return { value: null, error: 'Unable to parse the decimal part.' };
    return { value: parsed, error: null };
  }

  return { value: finalValue, error: null };
};

const WordsToNumberConverterContent = () => {
  const [input, setInput] = useState<string>('one hundred twenty three');
  const [copied, setCopied] = useState(false);

  const result = wordsToNumber(input);

  const handleCopy = () => {
    if (result.value === null) return;
    navigator.clipboard.writeText(String(result.value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Number in Words"
          multiline
          rows={6}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          placeholder="e.g. one million two hundred thousand"
        />
        <Typography variant="body2" color="text.secondary">
          Supports English cardinal words from zero up to billions and trillions, hyphens, commas, "and",
          and "point" for decimals (e.g. "twenty-three" or "one point five").
        </Typography>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            Parse: scale words (hundred, thousand, million, billion) multiply, smaller words add to the
            running total.
          </Typography>
          {result.error === null && result.value !== null && (
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
              &quot;{input.trim().replace(/\s+/g, ' ')}&quot; → {result.value}
            </Typography>
          )}
        </Paper>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {result.error === null && result.value !== null ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h3" fontWeight="bold" sx={{ wordBreak: 'break-all' }}>
                  {result.value.toLocaleString('en-US', { maximumFractionDigits: 10 })}
                </Typography>
                <IconButton size="small" onClick={handleCopy} sx={{ color: 'white' }}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
                {copied ? 'Copied!' : 'Numeric Value'}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" sx={{ opacity: 0.9, textAlign: 'center' }}>
              {result.error}
            </Typography>
          )}
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Input Words</Typography>
            <Typography variant="body2" fontWeight="bold">{input.trim().replace(/\s+/g, ' ') || '—'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Numeric Value</Typography>
            <Typography variant="body2" fontWeight="bold">
              {result.value !== null ? result.value.toLocaleString('en-US', { maximumFractionDigits: 10 }) : '—'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Word Count</Typography>
            <Typography variant="body2" fontWeight="bold">{input.trim() ? input.trim().split(/\s+/).length : 0}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const WordsToNumberConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Words to Number Converter Work?</Typography>
      <Typography variant="body1">
        Paste or type a number written in English words and the converter parses it into its numeric
        value. Small words like &quot;twenty-three&quot; add to the running total, while scale words like
        hundred, thousand, million, and billion multiply what has been read so far. Hyphens, commas, and
        &quot;and&quot; are accepted, and &quot;point&quot; supports decimals such as &quot;one point
        five&quot;.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;one hundred twenty three&quot; converts to 123. &quot;one million two hundred thousand&quot;
        converts to 1,200,000. &quot;two hundred fifty five&quot; converts to 255. If a word is not
        recognized, the converter stops and explains the problem instead of guessing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting an amount written on a check into digits before entering it.</li>
          <li>Turning spelled-out figures from contracts or documents into spreadsheet numbers.</li>
          <li>Verifying that a number written in words matches the numeric amount.</li>
          <li>Helping students check their spelling of large numbers in words.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What number formats are supported?</Typography>
      <Typography variant="body1">
        English cardinal words from zero up to trillions, with hyphens (&quot;twenty-three&quot;), commas
        (&quot;one hundred, five&quot;), and &quot;and&quot; (&quot;one hundred and five&quot;) all
        accepted. Decimals are supported with &quot;point&quot; followed by digit words.
      </Typography>
      <Typography variant="h3">How does the parser handle &quot;one million and fifty&quot;?</Typography>
      <Typography variant="body1">
        &quot;million&quot; multiplies the one (1,000,000), then fifty adds 50, giving 1,000,050. Scale
        words carry their multiplier to whatever number word precedes them.
      </Typography>
      <Typography variant="h3">What happens if the input is invalid?</Typography>
      <Typography variant="body1">
        The converter shows a clear error message instead of an empty result, such as when a word is not
        recognized, a scale word is missing its number, or &quot;hundred&quot; is preceded by a value
        greater than nine.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/words-to-number-converter" content={content}>
      <WordsToNumberConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordsToNumberConverter;