'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, IconButton, Checkbox, Stack, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

let nextId = 1;

const ToDoListGeneratorContent = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [draft, setDraft] = useState('');

  const addItem = () => {
    const text = draft.trim();
    if (!text) return;
    setItems([...items, { id: String(nextId++), text, done: false }]);
    setDraft('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const removeItem = (id: string) => setItems(items.filter((item) => item.id !== id));

  const remaining = items.filter((item) => !item.done).length;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
        <TextField
          label="Add a to-do item"
          fullWidth
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addItem(); }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={addItem}>Add</Button>
      </Stack>

      {items.length === 0 ? (
        <Typography color="text.secondary" align="center">No items yet — add your first one above.</Typography>
      ) : (
        <Stack spacing={1}>
          {items.map((item) => (
            <Paper key={item.id} variant="outlined" sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
              <Checkbox checked={item.done} onChange={() => toggleItem(item.id)} />
              <Typography
                sx={{
                  flex: 1,
                  textDecoration: item.done ? 'line-through' : 'none',
                  color: item.done ? 'text.secondary' : 'text.primary',
                }}
              >
                {item.text}
              </Typography>
              <IconButton color="error" size="small" onClick={() => removeItem(item.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      )}

      {items.length > 0 && (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          {remaining} of {items.length} remaining
        </Typography>
      )}
    </Box>
  );
};

const ToDoListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the To-Do List Generator Works</Typography>
      <Typography variant="body1">
        Type a task into the box and click &quot;Add&quot; (or press Enter) to add it to your list. Check the
        box next to an item to mark it done, or click the trash icon to remove it entirely. Your list updates
        instantly as you go.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Buy groceries,&quot; &quot;Reply to emails,&quot; and &quot;Book dentist
        appointment&quot; creates a simple three-item checklist you can check off as you complete each task.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Jotting down a quick task list for the day without opening a full app.</li>
          <li>Keeping track of a short shopping list or errand list.</li>
          <li>Organizing a quick checklist for a meeting or small project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this list save if I close the page?</Typography>
      <Typography variant="body1">
        No — this is a quick scratch-pad list only. It lives in your browser tab for the current session and
        is not saved, synced, or backed up anywhere, so it will be gone if you refresh or close the page. For a
        saved or synced to-do app, use dedicated task management software instead.
      </Typography>
      <Typography variant="h3">Is there a limit to how many items I can add?</Typography>
      <Typography variant="body1">
        No practical limit — add as many items as you need for your current session.
      </Typography>
      <Typography variant="h3">Can I reorder items?</Typography>
      <Typography variant="body1">
        Not currently — items appear in the order you add them. Remove and re-add an item if you want to move
        it, or simply keep adding new items as priorities shift.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/to-do-list-generator" content={content}>
      <ToDoListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ToDoListGenerator;
