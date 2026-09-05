'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, MenuItem, Select, Button, Chip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Priority = 'High' | 'Medium' | 'Low';

interface TaskRow {
  id: number;
  task: string;
  priority: Priority;
}

let nextId = 4;

const DEFAULT_ROWS: TaskRow[] = [
  { id: 1, task: 'Finish quarterly report', priority: 'High' },
  { id: 2, task: 'Reply to client emails', priority: 'Medium' },
  { id: 3, task: 'Organize desk files', priority: 'Low' },
];

const PRIORITY_ORDER: Priority[] = ['High', 'Medium', 'Low'];
const PRIORITY_COLOR: Record<Priority, 'error' | 'warning' | 'success'> = {
  High: 'error',
  Medium: 'warning',
  Low: 'success',
};

const PriorityListGeneratorContent = () => {
  const [rows, setRows] = useState<TaskRow[]>(DEFAULT_ROWS);

  const addRow = () => setRows((prev) => [...prev, { id: nextId++, task: '', priority: 'Medium' }]);
  const removeRow = (id: number) => setRows((prev) => prev.filter((r) => r.id !== id));
  const updateRow = (id: number, patch: Partial<TaskRow>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const grouped = useMemo(() => {
    const result: Record<Priority, TaskRow[]> = { High: [], Medium: [], Low: [] };
    rows.forEach((r) => {
      if (r.task.trim()) result[r.priority].push(r);
    });
    return result;
  }, [rows]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Your Tasks</Typography>
        <Stack spacing={1.5}>
          {rows.map((r) => (
            <Box key={r.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Task description"
                value={r.task}
                onChange={(e) => updateRow(r.id, { task: e.target.value })}
              />
              <Select
                size="small"
                value={r.priority}
                onChange={(e) => updateRow(r.id, { priority: e.target.value as Priority })}
                sx={{ minWidth: 110 }}
              >
                {PRIORITY_ORDER.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
              <IconButton onClick={() => removeRow(r.id)} disabled={rows.length <= 1} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addRow} sx={{ mt: 2 }}>
          Add Task
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Sorted by Priority</Typography>
        {PRIORITY_ORDER.map((p) => (
          <Box key={p} sx={{ mb: 2 }}>
            <Chip label={`${p} Priority (${grouped[p].length})`} color={PRIORITY_COLOR[p]} size="small" sx={{ mb: 1 }} />
            {grouped[p].length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>No tasks.</Typography>
            ) : (
              <Stack spacing={1}>
                {grouped[p].map((r) => (
                  <Paper key={r.id} variant="outlined" sx={{ p: 1.5 }}>
                    <Typography variant="body2">{r.task}</Typography>
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const PriorityListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Priority List Generator</Typography>
      <Typography variant="body1">
        Add your tasks one at a time, assigning each one a priority level of High, Medium, or Low from the
        dropdown next to it. Use the Add Task button for as many rows as you need, and the trash icon to remove
        any row. The panel on the right automatically resorts every task into three grouped sections — High
        Priority first, then Medium, then Low — so you always see what to tackle first without manually
        reordering anything.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Finish quarterly report&quot; as High, &quot;Reply to client emails&quot; as Medium, and
        &quot;Organize desk files&quot; as Low produces a sorted list with the report at the top under High
        Priority, emails under Medium Priority, and filing under Low Priority.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Organizing a daily or weekly to-do list so the most important tasks stand out.</li>
          <li>Triaging a backlog of work items before a team stand-up or planning meeting.</li>
          <li>Deciding what to work on first when facing a long, unsorted list of responsibilities.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I change a task&apos;s priority after adding it?</strong> Yes — just change the dropdown next to any task at any time, and the sorted list on the right updates instantly.</li>
          <li><strong>What happens to a task with no description?</strong> Blank task rows are ignored in the sorted output on the right, so you can leave placeholder rows without cluttering your final list.</li>
          <li><strong>Is there a limit to how many tasks I can add?</strong> No — click Add Task as many times as you need; there&apos;s no fixed limit on the number of rows.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/priority-list-generator" content={content}>
      <PriorityListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PriorityListGenerator;
