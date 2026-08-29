'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

const ModeCalculator = () => {
  const [input, setInput] = useState<string>('4, 8, 4, 3, 8, 8, 2');

  const { modes, maxFreq, count, isUniform } = useMemo(() => {
    const numbers = parseNumbers(input);
    const freq = new Map<number, number>();
    for (const n of numbers) freq.set(n, (freq.get(n) ?? 0) + 1);

    const maxFreq = numbers.length > 0 ? Math.max(...freq.values()) : 0;
    const modes = [...freq.entries()].filter(([, c]) => c === maxFreq).map(([n]) => n).sort((a, b) => a - b);
    const isUniform = numbers.length > 0 && modes.length === freq.size;

    return { modes, maxFreq, count: numbers.length, isUniform };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How to Find the Mode of a List of Numbers</Typography>
      <Typography variant="body1">
        The mode is the value (or values) that appears most frequently in a data set. To find it, count how
        many times each number appears, then identify the number(s) with the highest count. A data set can have
        one mode, multiple modes (if two or more values tie for the highest frequency), or no mode at all if
        every value appears exactly once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For the list 4, 8, 4, 3, 8, 8, 2 — the number 8 appears 3 times, 4 appears twice, and 3 and 2 each
        appear once. Since 8 has the highest frequency, the mode is 8. If instead 4 also appeared 3 times, the
        data set would be bimodal, with modes 4 and 8.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the most common response in survey or poll data.</li>
          <li>Identifying the most frequently occurring value in sales, inventory, or test score data.</li>
          <li>Statistics coursework comparing mode against mean and median for the same data set.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does it mean if there is no mode?</Typography>
      <Typography variant="body1">
        If every value in the list appears exactly the same number of times (including exactly once each),
        there&apos;s technically no single most frequent value, so the data set has no unique mode — this
        calculator will show every value as tied, which effectively means no mode exists.
      </Typography>
      <Typography variant="h3">Can a data set have more than one mode?</Typography>
      <Typography variant="body1">
        Yes — this is called bimodal (two modes) or multimodal (more than two modes). It happens whenever two
        or more distinct values are tied for the highest frequency in the data set.
      </Typography>
      <Typography variant="h3">Does mode work for non-numeric data?</Typography>
      <Typography variant="body1">
        The concept of mode applies to any category of data, including text or categories, but this calculator
        is built for numeric lists. For categorical data, the same principle applies: count occurrences and
        find the category with the highest count.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/mode-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Numbers (comma, space, or line separated)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 4, 8, 4, 3, 8, 8, 2"
          />
        </Box>

        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {count > 0 ? (
            isUniform ? (
              <Typography variant="h6" color="text.secondary" textAlign="center">No mode — every value appears equally often</Typography>
            ) : (
              <>
                <Typography variant="h6" color="text.secondary" gutterBottom>{modes.length > 1 ? 'Modes' : 'Mode'}</Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1, wordBreak: 'break-word', textAlign: 'center' }}>
                  {modes.join(', ')}
                </Typography>
                <Typography variant="body2" color="text.secondary">Appears {maxFreq} time{maxFreq === 1 ? '' : 's'} ({count} values total)</Typography>
              </>
            )
          ) : (
            <Typography variant="body1" color="text.secondary">Enter numbers to find the mode</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ModeCalculator;
