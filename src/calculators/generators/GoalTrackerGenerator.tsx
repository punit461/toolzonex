'use client';

import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, IconButton, Stack, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Goal {
  id: number;
  description: string;
  target: string;
  current: string;
}

const DEFAULT_GOALS: Goal[] = [
  { id: 1, description: 'Save for vacation', target: '5000', current: '1200' },
  { id: 2, description: 'Read books this year', target: '24', current: '9' },
];

const GoalTrackerGeneratorContent = () => {
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS);
  const [nextId, setNextId] = useState(DEFAULT_GOALS.length + 1);

  const addGoal = () => {
    setGoals([...goals, { id: nextId, description: 'New goal', target: '100', current: '0' }]);
    setNextId(nextId + 1);
  };
  const removeGoal = (id: number) => setGoals(goals.filter((g) => g.id !== id));
  const updateGoal = (id: number, field: 'description' | 'target' | 'current', value: string) =>
    setGoals(goals.map((g) => (g.id === id ? { ...g, [field]: value } : g)));

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        {goals.map((goal) => {
          const target = parseFloat(goal.target) || 0;
          const current = parseFloat(goal.current) || 0;
          const pct = target > 0 ? Math.min(100, Math.max(0, (current / target) * 100)) : 0;

          return (
            <Paper key={goal.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mb: 1.5 }}>
                <TextField
                  label="Goal Description"
                  value={goal.description}
                  onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                  size="small"
                  sx={{ flex: 2, minWidth: 160 }}
                />
                <TextField
                  label="Current Progress"
                  type="number"
                  value={goal.current}
                  onChange={(e) => updateGoal(goal.id, 'current', e.target.value)}
                  size="small"
                  sx={{ flex: 1, minWidth: 120 }}
                />
                <TextField
                  label="Target"
                  type="number"
                  value={goal.target}
                  onChange={(e) => updateGoal(goal.id, 'target', e.target.value)}
                  size="small"
                  sx={{ flex: 1, minWidth: 120 }}
                />
                <IconButton onClick={() => removeGoal(goal.id)} size="small" aria-label="Remove goal" disabled={goals.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <LinearProgress variant="determinate" value={pct} sx={{ height: 10, borderRadius: 5, mb: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {current.toLocaleString()} / {target.toLocaleString()} — {pct.toFixed(1)}% complete
              </Typography>
            </Paper>
          );
        })}
        <Button startIcon={<AddIcon />} onClick={addGoal} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
          Add Goal
        </Button>
      </Stack>
    </Box>
  );
};

const GoalTrackerGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Goal Tracker Generator</Typography>
      <Typography variant="body1">
        Add each goal you want to track with a short description, a target numeric value, and your current
        progress value — add or remove rows freely. The tool computes a progress bar and percentage-complete
        for every goal by dividing current progress by the target value.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Percent Complete = (Current Progress ÷ Target) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A goal named &quot;Save for vacation&quot; with a target of 5000 and current progress of 1200 shows a
        progress bar at 24.0% complete.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking progress toward a savings target, like a vacation fund or emergency fund.</li>
          <li>Monitoring a reading, fitness, or learning goal measured in a cumulative count.</li>
          <li>Keeping several personal or team goals visible side by side with clear percentage progress.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Habit Tracker Generator?</strong> The Habit Tracker Generator is a daily yes/no checkbox GRID for tracking habit consistency across many days — it doesn&apos;t use numeric targets at all. This Goal Tracker Generator tracks cumulative numeric PROGRESS toward a quantifiable target over time, like saving a specific dollar amount or reading a specific number of books — a fundamentally different tracking model.</li>
          <li><strong>Does my progress get saved?</strong> No — this tool uses client-side state only, with no persistence. Your goals and progress reset when you reload the page, so it&apos;s best used for a quick snapshot rather than long-term tracking.</li>
          <li><strong>Can a goal go over 100%?</strong> The progress bar itself caps visually at 100%, but the percentage-complete text will show the true value if your current progress exceeds your target.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/goal-tracker-generator" content={content}>
      <GoalTrackerGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GoalTrackerGenerator;
