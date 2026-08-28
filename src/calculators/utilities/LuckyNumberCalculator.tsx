'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const NAME_MEANINGS: Record<string, string> = {
  '1': 'Independent, a natural leader, ambitious and determined.',
  '2': 'Cooperative, diplomatic, sensitive and peace-loving.',
  '3': 'Creative, expressive, social and full of optimism.',
  '4': 'Practical, disciplined, hard-working and dependable.',
  '5': 'Adventurous, freedom-loving, versatile and resourceful.',
  '6': 'Nurturing, responsible, caring and family-oriented.',
  '7': 'Analytical, introspective, spiritual and a seeker of truth.',
  '8': 'Ambitious, authoritative, good with money and power.',
  '9': 'Compassionate, artistic, humanitarian and giving.',
};

const LIFE_PATH_MEANINGS: Record<string, string> = {
  '1': 'A born leader who thrives on independence and new beginnings.',
  '2': 'A peacemaker who values harmony, partnership and cooperation.',
  '3': 'A creative communicator who brings joy through self-expression.',
  '4': 'A builder who finds fulfillment in stability, order and hard work.',
  '5': 'A free spirit who craves change, travel and variety.',
  '6': 'A nurturer who finds purpose in home, family and service.',
  '7': 'A thinker who seeks knowledge, wisdom and inner truth.',
  '8': 'A business-minded achiever who is drawn to power and success.',
  '9': 'A humanitarian with a big heart and a global outlook.',
  '11': 'A master teacher and intuitive who inspires others.',
  '22': 'A master builder who turns grand visions into reality.',
};

function reduceNumber(n: number): number {
  let value = n;
  while (value > 9 && value !== 11 && value !== 22) {
    value = String(value)
      .split('')
      .reduce((acc, d) => acc + Number(d), 0);
  }
  return value;
}

function letterValue(c: string): number {
  const code = c.toUpperCase().charCodeAt(0);
  if (code < 65 || code > 90) return 0;
  return ((code - 65) % 9) + 1;
}

function nameNumber(fullName: string): number {
  const sum = fullName.replace(/[^a-zA-Z]/g, '').split('').reduce((acc, c) => acc + letterValue(c), 0);
  return reduceNumber(sum);
}

function personalityNumber(fullName: string): number {
  const consonants = fullName.replace(/[^a-zA-Z]/g, '').replace(/[AEIOU]/gi, '').split('');
  const sum = consonants.reduce((acc, c) => acc + letterValue(c), 0);
  if (sum === 0) return 0;
  return reduceNumber(sum);
}

function lifePath(dateStr: string): number {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3) return 0;
  const total = parts.reduce((acc, p) => acc + p, 0);
  return reduceNumber(total);
}

const LuckyNumberCalculator = () => {
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');

  const result = useMemo(() => {
    const lp = lifePath(birth);
    const nn = nameNumber(name);
    const pn = personalityNumber(name);
    return { lp, nn, pn };
  }, [name, birth]);

  const showLife = result.lp > 0;
  const showName = result.nn > 0;

  const content = (
    <>
      <Typography variant="h2">How are Lucky Numbers Calculated?</Typography>
      <Typography variant="body1">
        Numerology reduces the digits of your birth date and the letters of your name down to single-digit
        numbers (or master numbers 11 and 22). The life path number comes from summing the digits of the
        year, month, and day of your birth. The expression (name) number maps letters to 1-9 using the
        Pythagorean chart and sums the results. Each resulting number carries a set of spiritual meanings.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For someone born on 1990-05-17, the digits 1+9+9+0+5+1+7 = 32, then 3+2 = 5, giving a life path
        number of 5. For the name "Alex", A=1, L=3, E=5, X=6, giving 1+3+5+6 = 15, then 1+5 = 6, so the
        name number is 6.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Exploring numerology and personal symbolism for fun and self-reflection.</li>
          <li>Choosing an auspicious number for personal or creative projects.</li>
          <li>Understanding the traits associated with your life path and expression numbers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a master number?</Typography>
      <Typography variant="body1">
        Master numbers 11 and 22 are not reduced further in numerology because they are thought to carry
        heightened spiritual potential. 11 represents intuition and inspiration, while 22 represents the
        ability to manifest large-scale visions.
      </Typography>
      <Typography variant="h3">Is numerology scientific?</Typography>
      <Typography variant="body1">
        Numerology is a belief system, not a science. It is best treated as a fun, introspective tool rather
        than a source of factual predictions.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/lucky-number-calculator" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <TextField label="Full Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Birth Date" type="date" fullWidth value={birth} onChange={(e) => setBirth(e.target.value)} InputLabelProps={{ shrink: true }} />
          </Stack>
        </Paper>

        {(showLife || showName) && (
          <Stack spacing={2}>
            {showLife && (
              <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
                <Box sx={{ textAlign: 'center', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Life Path Number</Typography>
                  <Typography variant="h3" fontWeight={700} color="primary.main">{result.lp}</Typography>
                  <Typography variant="body1">{LIFE_PATH_MEANINGS[String(result.lp)]}</Typography>
                </Box>
              </Paper>
            )}
            {showName && (
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover', flex: 1 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Expression / Name Number</Typography>
                    <Typography variant="h4" fontWeight={700} color="primary.main">{result.nn}</Typography>
                    <Typography variant="body1">{NAME_MEANINGS[String(result.nn)]}</Typography>
                  </Box>
                </Paper>
                {result.pn > 0 && (
                  <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover', flex: 1 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">Personality Number</Typography>
                      <Typography variant="h4" fontWeight={700} color="primary.main">{result.pn}</Typography>
                      <Typography variant="body1">{NAME_MEANINGS[String(result.pn)]}</Typography>
                    </Box>
                  </Paper>
                )}
              </Stack>
            )}
          </Stack>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LuckyNumberCalculator;
