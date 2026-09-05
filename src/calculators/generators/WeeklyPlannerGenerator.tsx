'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyPlannerGeneratorContent = () => {
  const [weekOf, setWeekOf] = useState('');
  const [tasks, setTasks] = useState<Record<string, string>>({});

  const plainText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`WEEKLY PLANNER${weekOf ? ` — Week of ${weekOf}` : ''}`);
    lines.push('');
    DAYS.forEach((day) => {
      lines.push(day.toUpperCase());
      const dayTasks = (tasks[day] || '').split('\n').map((t) => t.trim()).filter(Boolean);
      if (dayTasks.length === 0) {
        lines.push('  (no tasks)');
      } else {
        dayTasks.forEach((t) => lines.push(`  - ${t}`));
      }
      lines.push('');
    });
    return lines.join('\n');
  }, [weekOf, tasks]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <Box>
      <TextField
        label="Week Of"
        type="date"
        value={weekOf}
        onChange={(e) => setWeekOf(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3, maxWidth: 260 }}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(7, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        {DAYS.map((day) => (
          <Paper key={day} variant="outlined" sx={{ p: 1.5, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>{day}</Typography>
            <TextField
              multiline
              minRows={6}
              placeholder="One task per line"
              value={tasks[day] || ''}
              onChange={(e) => setTasks((prev) => ({ ...prev, [day]: e.target.value }))}
              fullWidth
              size="small"
            />
          </Paper>
        ))}
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight={600}>Printable Preview</Typography>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText}>
          Copy as Text
        </Button>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
          {plainText}
        </Typography>
      </Paper>
    </Box>
  );
};

const WeeklyPlannerGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Weekly Planner Generator</Typography>
      <Typography variant="body1">
        Pick the Monday your week starts, then type tasks into each of the seven day columns — one task per
        line. The grid runs Monday through Sunday, matching how most weekly planners are laid out. As you
        type, the printable preview below builds itself into a clean plain-text weekly plan you can copy or
        print.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Team meeting&quot; and &quot;Submit timesheet&quot; under Monday, and &quot;Grocery
        run&quot; under Saturday, produces a weekly plan where each day lists only its own tasks, with days
        that have no tasks marked &quot;(no tasks)&quot; in the copied text.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a work week across all seven days at a glance in one grid.</li>
          <li>Printing a weekly planner page for a physical planner or wall calendar.</li>
          <li>Splitting household chores or family tasks evenly across the week.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my weekly plan saved?</strong> No — it only lives in your browser&apos;s memory for the current visit and resets on reload, so copy or print it out if you want to keep a copy.</li>
          <li><strong>Why does the grid always start on Monday?</strong> This follows the common weekly-planner convention of a Monday-to-Sunday week. If you prefer a Sunday start, just treat the Sunday column as your first day when filling it in.</li>
          <li><strong>Can I add more than one task per day?</strong> Yes — each day&apos;s box is a free-form text area, so add as many tasks as you like, one per line, and they&apos;ll all appear as separate bullet points in the printable preview.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/weekly-planner-generator" content={content}>
      <WeeklyPlannerGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WeeklyPlannerGenerator;
