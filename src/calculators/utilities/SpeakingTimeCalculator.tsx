'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function formatMinutesSeconds(totalMinutes: number): string {
  const totalSeconds = Math.round(totalMinutes * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
}

const SpeakingTimeCalculator = () => {
  const [mode, setMode] = useState<'wordsToTime' | 'timeToWords'>('wordsToTime');
  const [wordCount, setWordCount] = useState<string>('1000');
  const [wpm, setWpm] = useState<string>('140');
  const [desiredMinutes, setDesiredMinutes] = useState<string>('5');

  const result = useMemo(() => {
    const rate = parseFloat(wpm);
    if (isNaN(rate) || rate <= 0) return null;

    if (mode === 'wordsToTime') {
      const words = parseFloat(wordCount);
      if (isNaN(words) || words < 0) return null;
      return { type: 'time' as const, minutes: words / rate };
    }
    const minutes = parseFloat(desiredMinutes);
    if (isNaN(minutes) || minutes < 0) return null;
    return { type: 'words' as const, words: minutes * rate };
  }, [mode, wordCount, wpm, desiredMinutes]);

  const content = (
    <>
      <Typography variant="h2">How to Estimate Speaking Time</Typography>
      <Typography variant="body1">
        Speaking pace varies by speaker and context, but a typical conversational or presentation pace is
        around 130-150 words per minute. Divide your word count by your speaking pace to estimate how long a
        speech or script will take to deliver — or work backward from a target duration to find how many words
        to write.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Time (minutes) = Word Count / Words per Minute &nbsp;|&nbsp; Words = Time (minutes) × Words per Minute
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1,000-word speech at a pace of 140 words per minute takes 1,000 / 140 ≈ 7.14 minutes, or about 7
        minutes 9 seconds. If instead you needed to fill exactly 5 minutes at that same pace, you&apos;d write
        about 5 × 140 = 700 words.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Timing a speech, presentation, or wedding toast before delivering it live.</li>
          <li>Writing a script to fit a specific video or podcast episode length.</li>
          <li>Checking whether a written speech fits within a conference or event&apos;s time slot.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What speaking pace should I use?</Typography>
      <Typography variant="body1">
        130-150 words per minute is typical for a clear, conversational presentation pace. Slower, more
        deliberate speaking (like a formal speech with pauses) can drop to 100-120 wpm, while fast, energetic
        speaking can reach 160-170 wpm or more.
      </Typography>
      <Typography variant="h3">Does this account for pauses, slides, or audience laughter?</Typography>
      <Typography variant="body1">
        No — this is a pure words-per-minute estimate based on continuous speaking. Add extra time on top of the
        estimate for planned pauses, slide transitions, audience interaction, or anticipated laughter and
        applause.
      </Typography>
      <Typography variant="h3">How do I find my own speaking pace?</Typography>
      <Typography variant="body1">
        Time yourself reading a passage of known word count out loud at your natural pace, then divide the word
        count by the time in minutes — use that personal words-per-minute figure here for a more accurate
        estimate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/speaking-time-calculator" content={content}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
          <ToggleButton value="wordsToTime">Words → Time</ToggleButton>
          <ToggleButton value="timeToWords">Time → Words</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mode === 'wordsToTime' ? (
            <TextField label="Word Count" type="number" fullWidth value={wordCount} onChange={(e) => setWordCount(e.target.value)} onFocus={(e) => e.target.select()} />
          ) : (
            <TextField label="Desired Duration (minutes)" type="number" fullWidth value={desiredMinutes} onChange={(e) => setDesiredMinutes(e.target.value)} onFocus={(e) => e.target.select()} />
          )}
          <TextField label="Speaking Pace (words per minute)" type="number" fullWidth value={wpm} onChange={(e) => setWpm(e.target.value)} onFocus={(e) => e.target.select()} helperText="Typical conversational pace is 130-150 wpm" />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {result?.type === 'time' && (
            <>
              <Typography variant="body2" color="text.secondary">Estimated Speaking Time</Typography>
              <Typography variant="h3" color="primary" fontWeight={800}>{formatMinutesSeconds(result.minutes)}</Typography>
            </>
          )}
          {result?.type === 'words' && (
            <>
              <Typography variant="body2" color="text.secondary">Target Word Count</Typography>
              <Typography variant="h3" color="primary" fontWeight={800}>{Math.round(result.words)} words</Typography>
            </>
          )}
          {!result && <Typography color="text.secondary">Enter valid values above</Typography>}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SpeakingTimeCalculator;
