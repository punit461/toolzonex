'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HabitTrackerGeneratorContent = () => {
  const [habits, setHabits] = useState<string[]>(['Drink water', 'Exercise', 'Read']);
  const [days, setDays] = useState('30');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const dayCount = Math.max(1, Math.min(366, parseInt(days, 10) || 30));
  const dayNumbers = useMemo(() => Array.from({ length: dayCount }, (_, i) => i + 1), [dayCount]);

  const addHabit = () => setHabits((prev) => [...prev, '']);
  const removeHabit = (idx: number) => setHabits((prev) => prev.filter((_, i) => i !== idx));
  const updateHabit = (idx: number, value: string) =>
    setHabits((prev) => prev.map((h, i) => (i === idx ? value : h)));

  const toggle = (habitIdx: number, day: number) => {
    const key = `${habitIdx}-${day}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const validHabits = habits.filter((h) => h.trim());

  const plainText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`HABIT TRACKER (${dayCount} days)`);
    lines.push('');
    validHabits.forEach((habit) => {
      const habitIdx = habits.indexOf(habit);
      const marks = dayNumbers
        .map((day) => (checked[`${habitIdx}-${day}`] ? 'X' : '.'))
        .join(' ');
      lines.push(`${habit}: ${marks}`);
    });
    return lines.join('\n');
  }, [validHabits, habits, dayNumbers, checked, dayCount]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3, maxWidth: 300 }}>
        <TextField
          label="Days to Track"
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          fullWidth
          inputProps={{ min: 1, max: 366 }}
        />
      </Stack>

      <Typography variant="subtitle2" fontWeight={600} mb={1}>Habits</Typography>
      <Stack spacing={1} sx={{ mb: 3, maxWidth: 500 }}>
        {habits.map((habit, idx) => (
          <Stack direction="row" spacing={1} key={idx} alignItems="center">
            <TextField
              size="small"
              value={habit}
              onChange={(e) => updateHabit(idx, e.target.value)}
              fullWidth
              placeholder="e.g. Drink water"
            />
            <IconButton size="small" onClick={() => removeHabit(idx)} disabled={habits.length <= 1}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
        <Button size="small" startIcon={<AddIcon />} onClick={addHabit} sx={{ alignSelf: 'flex-start' }}>
          Add Habit
        </Button>
      </Stack>

      <Typography variant="subtitle2" fontWeight={600} mb={1}>Tracker Grid</Typography>
      <Paper variant="outlined" sx={{ p: 1.5, mb: 3, overflowX: 'auto' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: `160px repeat(${dayCount}, 28px)`, gap: '2px', minWidth: 160 + dayCount * 28 }}>
          <Box />
          {dayNumbers.map((day) => (
            <Typography key={day} variant="caption" textAlign="center" color="text.secondary">
              {day}
            </Typography>
          ))}
          {validHabits.map((habit) => {
            const habitIdx = habits.indexOf(habit);
            return (
              <Box key={habitIdx} sx={{ display: 'contents' }}>
                <Typography variant="body2" sx={{ pr: 1, display: 'flex', alignItems: 'center' }}>
                  {habit}
                </Typography>
                {dayNumbers.map((day) => {
                  const key = `${habitIdx}-${day}`;
                  const isChecked = !!checked[key];
                  return (
                    <Box
                      key={day}
                      onClick={() => toggle(habitIdx, day)}
                      sx={{
                        width: 24,
                        height: 24,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 0.5,
                        cursor: 'pointer',
                        bgcolor: isChecked ? 'success.main' : 'transparent',
                        '&:hover': { borderColor: 'primary.main' },
                      }}
                    />
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight={600}>Printable Preview</Typography>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText}>
          Copy as Text
        </Button>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2, overflowX: 'auto' }}>
        <Typography component="pre" sx={{ whiteSpace: 'pre', fontFamily: 'monospace', fontSize: '0.8rem', m: 0 }}>
          {plainText}
        </Typography>
      </Paper>
    </Box>
  );
};

const HabitTrackerGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Habit Tracker Generator</Typography>
      <Typography variant="body1">
        Add the habits you want to track (add or remove rows freely) and set how many days you want the grid
        to cover — 30 days by default. The tool builds a grid with your habits as rows and days as numbered
        columns; click any cell to mark that habit done on that day. Use the printable preview to copy a plain
        text version, where a filled cell shows as &quot;X&quot; and an empty one as &quot;.&quot;.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Tracking &quot;Drink water&quot;, &quot;Exercise&quot;, and &quot;Read&quot; over 7 days and checking
        off Exercise on days 1, 2, and 4 produces a row that reads <code>Exercise: X X . X . . .</code> in the
        copied text.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing a monthly habit tracker grid to fill in by hand on paper.</li>
          <li>Tracking multiple habits side by side over a custom number of days.</li>
          <li>Quickly visualizing a habit streak before committing it to a permanent tracker app.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does my progress get saved?</strong> No — this tool uses client-side state only, with no persistence. Checked cells reset the moment you reload the page, so it&apos;s best used for printing a blank grid or building a quick reference rather than long-term tracking.</li>
          <li><strong>How many habits or days can I add?</strong> You can add as many habit rows as you like, and the day count accepts anywhere from 1 to 366 days, though very large grids may require scrolling to view comfortably.</li>
          <li><strong>Can I print the grid itself instead of the text version?</strong> The plain-text preview is designed for copying into a document to print, since it keeps the exact grid alignment in a simple format any text editor or printer can handle.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/habit-tracker-generator" content={content}>
      <HabitTrackerGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HabitTrackerGenerator;
