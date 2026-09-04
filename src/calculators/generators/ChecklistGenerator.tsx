'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ChecklistGeneratorContent = () => {
  const [raw, setRaw] = useState('Buy groceries\nFinish report\nCall the dentist\nPack for trip');
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const items = useMemo(
    () => raw.split('\n').map((l) => l.trim()).filter(Boolean),
    [raw]
  );

  const toggle = (idx: number) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyMarkdown = async () => {
    const md = items.map((item, idx) => `- [${checked[idx] ? 'x' : ' '}] ${item}`).join('\n');
    try { await navigator.clipboard.writeText(md); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Enter one item per line"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          multiline
          rows={10}
          fullWidth
        />
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Checklist Preview</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyMarkdown} disabled={items.length === 0}>
            Copy as Markdown
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 240 }}>
          {items.length === 0 && (
            <Typography variant="body2" color="text.secondary">Type items on the left to see them here.</Typography>
          )}
          {items.map((item, idx) => (
            <FormControlLabel
              key={idx}
              sx={{ display: 'flex', width: '100%' }}
              control={<Checkbox checked={!!checked[idx]} onChange={() => toggle(idx)} />}
              label={
                <Typography sx={{ textDecoration: checked[idx] ? 'line-through' : 'none', color: checked[idx] ? 'text.secondary' : 'text.primary' }}>
                  {item}
                </Typography>
              }
            />
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

const ChecklistGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Checklist Generator</Typography>
      <Typography variant="body1">
        Type or paste your list into the text area, one item per line. Each line instantly becomes an
        interactive checkbox item in the preview panel on the right. Click any checkbox to mark it done — a
        checked item is shown crossed out. When you&apos;re ready to share your list, click &quot;Copy as
        Markdown&quot; to copy it in standard Markdown task-list syntax, with checked and unchecked items
        reflected correctly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing three lines — &quot;Buy groceries&quot;, &quot;Finish report&quot;, &quot;Call the
        dentist&quot; — and checking off the first two produces this Markdown when copied:
        <br />
        <code>- [x] Buy groceries</code><br />
        <code>- [x] Finish report</code><br />
        <code>- [ ] Call the dentist</code>
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a quick brain-dump of tasks into an interactive to-do list.</li>
          <li>Creating a Markdown task list to paste into GitHub issues, Notion, or README files.</li>
          <li>Building a temporary checklist for a meeting agenda or shopping trip.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does my checklist get saved?</strong> No — this tool keeps everything in your browser&apos;s memory only for the current visit. Reloading the page or navigating away resets the list, so copy your progress out as Markdown if you need to keep it.</li>
          <li><strong>Can I reorder items?</strong> Not directly in the preview — reorder the lines in the text area on the left and the checklist below updates to match, though checked states are tracked by line position and may shift if you reorder.</li>
          <li><strong>What does the copied Markdown look like?</strong> It uses standard GitHub-flavored Markdown task-list syntax: <code>- [ ] item</code> for unchecked items and <code>- [x] item</code> for checked ones, which renders as clickable checkboxes on GitHub, Notion, and most Markdown viewers.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/checklist-generator" content={content}>
      <ChecklistGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ChecklistGenerator;
