'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, Grid } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LETTER_VALUES: Record<string, number> = {};
[['AJS', 1], ['BKT', 2], ['CLU', 3], ['DMV', 4], ['ENW', 5], ['FOX', 6], ['GPY', 7], ['HQZ', 8], ['IR', 9]].forEach(
  ([letters, value]) => {
    (letters as string).split('').forEach((c) => { LETTER_VALUES[c] = value as number; });
  }
);

const MASTER_NUMBERS = [11, 22, 33];

function reduceNumber(num: number): number {
  while (num > 9 && !MASTER_NUMBERS.includes(num)) {
    num = String(num).split('').reduce((s, d) => s + parseInt(d, 10), 0);
  }
  return num;
}

function calculateLifePath(dob: string): number {
  const digits = dob.replace(/\D/g, '');
  const sum = digits.split('').reduce((s, d) => s + parseInt(d, 10), 0);
  return reduceNumber(sum);
}

function calculateNameNumber(name: string): number {
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .reduce((s, c) => s + (LETTER_VALUES[c] || 0), 0);
  return reduceNumber(sum);
}

const LIFE_PATH_MEANINGS: Record<number, string> = {
  1: 'The Leader — independent, ambitious, and driven to forge your own path.',
  2: 'The Peacemaker — cooperative, sensitive, and skilled at building harmony.',
  3: 'The Communicator — creative, expressive, and naturally social.',
  4: 'The Builder — practical, disciplined, and focused on stability.',
  5: 'The Adventurer — freedom-loving, curious, and adaptable to change.',
  6: 'The Nurturer — caring, responsible, and family-oriented.',
  7: 'The Seeker — analytical, introspective, and drawn to deeper truths.',
  8: 'The Achiever — ambitious, business-minded, and focused on material success.',
  9: 'The Humanitarian — compassionate, idealistic, and globally minded.',
  11: 'The Intuitive (Master Number) — highly perceptive, inspiring, and spiritually attuned.',
  22: 'The Master Builder (Master Number) — capable of turning big visions into practical reality.',
  33: 'The Master Teacher (Master Number) — deeply compassionate, guided by service to others.',
};

const NumerologyCalculatorContent = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState<{ lifePath: number; nameNumber: number } | null>(null);

  const calculate = () => {
    if (!dob) return;
    setResult({
      lifePath: calculateLifePath(dob),
      nameNumber: name.trim() ? calculateNameNumber(name) : 0,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 560, mx: 'auto' }}>
      <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField
        label="Date of Birth"
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <Button variant="contained" size="large" onClick={calculate} disabled={!dob}>
        Calculate My Numbers
      </Button>

      {result && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={name.trim() ? 6 : 12}>
            <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, height: '100%' }}>
              <Typography variant="body2" color="text.secondary">Life Path Number</Typography>
              <Typography variant="h3" fontWeight="800" color="primary.main" sx={{ my: 1 }}>
                {result.lifePath}
              </Typography>
              <Typography variant="body2">{LIFE_PATH_MEANINGS[result.lifePath]}</Typography>
            </Paper>
          </Grid>
          {name.trim() && (
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, height: '100%' }}>
                <Typography variant="body2" color="text.secondary">Name Number</Typography>
                <Typography variant="h3" fontWeight="800" color="secondary.main" sx={{ my: 1 }}>
                  {result.nameNumber}
                </Typography>
                <Typography variant="body2">
                  Derived from the letters in your full name using the Pythagorean numerology system.
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

const NumerologyCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Numerology Calculator — Life Path & Name Number</Typography>
      <Typography variant="body1">
        Calculate your Life Path Number from your date of birth, and your Name Number from your full name,
        using the standard numerology reduction method — including master numbers 11, 22, and 33.
      </Typography>

      <Typography variant="h2">How the Calculation Works</Typography>
      <Typography variant="body1">
        The Life Path Number is found by adding together every digit in your date of birth, then repeatedly
        reducing that sum to a single digit — except when the running total is 11, 22, or 33, which are
        "master numbers" kept unreduced. The Name Number uses the Pythagorean system, where each letter maps
        to a number from 1-9 (A=1, B=2, C=3, ... I=9, then the pattern repeats), summing every letter in your
        name and reducing it the same way.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A birth date of 29-11-1994 sums to 2+9+1+1+1+9+9+4 = 36, which reduces to 3+6 = 9 — a Life Path Number
        of 9. If the digits had summed to 22 instead of continuing to reduce, that master number would be kept
        as-is.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Exploring numerology as a fun way to reflect on personality traits.</li>
          <li>Comparing Life Path Numbers with friends or family for a lighthearted discussion.</li>
          <li>Checking whether a name change or nickname shifts your Name Number.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What are master numbers in numerology?</Typography>
      <Typography variant="body1">
        11, 22, and 33 are considered "master numbers" in numerology and are traditionally left unreduced
        rather than being summed down further, since they're believed to carry a more intense version of
        their base number's meaning (2, 4, and 6 respectively).
      </Typography>
      <Typography variant="h3">Is numerology scientifically accurate?</Typography>
      <Typography variant="body1">
        No — numerology is a belief system and form of entertainment, not a scientifically validated method
        for predicting personality or life events. This calculator applies the standard traditional
        calculation method for those exploring numerology for fun or personal reflection.
      </Typography>
      <Typography variant="h3">Which name should I use for the Name Number?</Typography>
      <Typography variant="body1">
        Most numerology traditions use your full birth name. You can also try entering a nickname or married
        name to see how the Name Number changes.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/numerology-calculator" content={content}>
      <NumerologyCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NumerologyCalculator;
