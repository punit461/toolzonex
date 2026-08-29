'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Grid, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const StatBox = ({ label, value }: { label: string; value: string | number }) => (
  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
    <Typography variant="h4" fontWeight="bold">{value}</Typography>
    <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>{label}</Typography>
  </Paper>
);

const ReadingTimeCalculatorContent = () => {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(225);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const totalSeconds = wpm > 0 ? Math.round((words / wpm) * 60) : 0;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { words, minutes, seconds };
  }, [text, wpm]);

  const readingTimeLabel = stats.words === 0
    ? '0 sec'
    : stats.minutes > 0
      ? `${stats.minutes} min ${stats.seconds} sec`
      : `${stats.seconds} sec`;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Paste your article, essay, or speech here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={12}
        fullWidth
      />

      <Box>
        <Typography gutterBottom>
          Reading speed: <strong>{wpm}</strong> words per minute
        </Typography>
        <Slider
          value={wpm}
          onChange={(_, value) => setWpm(value as number)}
          min={100}
          max={450}
          step={5}
          valueLabelDisplay="auto"
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <StatBox label="Word Count" value={stats.words} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <StatBox label="Estimated Reading Time" value={readingTimeLabel} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatBox label="Words per Minute" value={wpm} />
        </Grid>
      </Grid>
    </Box>
  );
};

const ReadingTimeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use this reading time calculator</Typography>
      <Typography variant="body1">
        Paste your article, blog post, essay, or script into the box above. This tool counts the words and
        instantly estimates how long it takes to read out loud based on your chosen reading speed — adjust the
        slider to match your audience, then read the estimate update live.
      </Typography>

      <Typography variant="h2">How is reading time calculated?</Typography>
      <Typography variant="body1">
        Reading time is estimated as word count divided by words-per-minute (WPM), converted to minutes and
        seconds. The default speed of 225 WPM reflects an average adult silent-reading pace; slower readers,
        younger audiences, or dense technical content may read closer to 150-180 WPM, while fast readers can
        exceed 300 WPM.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 900-word blog post at the default 225 WPM has an estimated reading time of exactly 4 minutes. At a
        slower 150 WPM, the same post takes about 6 minutes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding an accurate &quot;X min read&quot; label to a blog post before publishing.</li>
          <li>Estimating how long a speech or presentation script will take to deliver.</li>
          <li>Checking whether an email or announcement is too long for a quick skim.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s a good words-per-minute value to use?</Typography>
      <Typography variant="body1">
        225 words per minute is a commonly used average for adult silent reading and works well for general
        blog content. Use a lower value like 150-180 WPM for technical or academic material, and a higher value
        for skimmable, casual content.
      </Typography>
      <Typography variant="h3">Does this update as I type?</Typography>
      <Typography variant="body1">
        Yes — the word count and estimated reading time recalculate instantly as you type, paste text, or
        adjust the reading speed slider.
      </Typography>
      <Typography variant="h3">Is this the same as calculating speaking time?</Typography>
      <Typography variant="body1">
        No — reading time here assumes silent reading speed. Spoken delivery is typically slower (roughly
        120-150 words per minute), so a script&apos;s speaking time will usually be longer than its silent
        reading time.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/reading-time-calculator" content={content}>
      <ReadingTimeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReadingTimeCalculator;
