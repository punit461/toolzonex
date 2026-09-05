'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ActionItem {
  task: string;
  assignee: string;
}

const MeetingNotesTemplateGeneratorContent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [attendees, setAttendees] = useState('');
  const [agenda, setAgenda] = useState<string[]>(['']);
  const [actions, setActions] = useState<ActionItem[]>([{ task: '', assignee: '' }]);
  const [notes, setNotes] = useState('');

  const updateAgenda = (idx: number, value: string) =>
    setAgenda((prev) => prev.map((a, i) => (i === idx ? value : a)));
  const addAgenda = () => setAgenda((prev) => [...prev, '']);
  const removeAgenda = (idx: number) => setAgenda((prev) => prev.filter((_, i) => i !== idx));

  const updateAction = (idx: number, field: keyof ActionItem, value: string) =>
    setActions((prev) => prev.map((a, i) => (i === idx ? { ...a, [field]: value } : a)));
  const addAction = () => setActions((prev) => [...prev, { task: '', assignee: '' }]);
  const removeAction = (idx: number) => setActions((prev) => prev.filter((_, i) => i !== idx));

  const plainText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`MEETING NOTES: ${title || '(untitled meeting)'}`);
    if (date) lines.push(`Date: ${date}`);
    if (attendees) lines.push(`Attendees: ${attendees}`);
    lines.push('');
    lines.push('AGENDA');
    const cleanAgenda = agenda.map((a) => a.trim()).filter(Boolean);
    if (cleanAgenda.length === 0) lines.push('  (none)');
    cleanAgenda.forEach((a, i) => lines.push(`  ${i + 1}. ${a}`));
    lines.push('');
    lines.push('ACTION ITEMS');
    const cleanActions = actions.filter((a) => a.task.trim());
    if (cleanActions.length === 0) lines.push('  (none)');
    cleanActions.forEach((a) => lines.push(`  - ${a.task}${a.assignee ? ` (${a.assignee})` : ''}`));
    lines.push('');
    lines.push('NOTES');
    lines.push(notes || '(none)');
    return lines.join('\n');
  }, [title, date, attendees, agenda, actions, notes]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField label="Meeting Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Attendees"
          placeholder="Comma-separated names"
          value={attendees}
          onChange={(e) => setAttendees(e.target.value)}
          fullWidth
        />

        <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>Agenda Items</Typography>
          <Stack spacing={1}>
            {agenda.map((item, idx) => (
              <Stack direction="row" spacing={1} key={idx}>
                <TextField
                  size="small"
                  fullWidth
                  value={item}
                  onChange={(e) => updateAgenda(idx, e.target.value)}
                  placeholder={`Agenda item ${idx + 1}`}
                />
                <IconButton size="small" onClick={() => removeAgenda(idx)} disabled={agenda.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
            <Button size="small" startIcon={<AddIcon />} onClick={addAgenda} sx={{ alignSelf: 'flex-start' }}>
              Add Agenda Item
            </Button>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>Action Items</Typography>
          <Stack spacing={1}>
            {actions.map((item, idx) => (
              <Stack direction="row" spacing={1} key={idx}>
                <TextField
                  size="small"
                  fullWidth
                  value={item.task}
                  onChange={(e) => updateAction(idx, 'task', e.target.value)}
                  placeholder="Task"
                />
                <TextField
                  size="small"
                  value={item.assignee}
                  onChange={(e) => updateAction(idx, 'assignee', e.target.value)}
                  placeholder="Assignee"
                  sx={{ width: 140 }}
                />
                <IconButton size="small" onClick={() => removeAction(idx)} disabled={actions.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
            <Button size="small" startIcon={<AddIcon />} onClick={addAction} sx={{ alignSelf: 'flex-start' }}>
              Add Action Item
            </Button>
          </Stack>
        </Box>

        <TextField
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
      </Stack>

      <Box>
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
    </Box>
  );
};

const MeetingNotesTemplateGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Meeting Notes Template Generator</Typography>
      <Typography variant="body1">
        Fill in the meeting title, date, and attendees, then add as many agenda items as you need before the
        meeting. During or after the meeting, add action items with an assignee for each one, and use the
        notes box for anything discussed that doesn&apos;t fit elsewhere. The printable preview builds a clean,
        structured plain-text summary you can copy and share right away.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A meeting titled &quot;Q3 Planning&quot; with an agenda item &quot;Review budget&quot; and an action
        item &quot;Send updated forecast (Priya)&quot; produces a text block with clearly labeled AGENDA and
        ACTION ITEMS sections, ready to paste into an email or shared doc.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a structured agenda before a meeting starts.</li>
          <li>Capturing action items with clear owners during the meeting itself.</li>
          <li>Sending a consistent meeting summary to attendees afterward.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are my meeting notes saved?</strong> No — everything is kept only in your browser&apos;s memory for the current visit. Copy the text version before closing or reloading the page if you want to keep it.</li>
          <li><strong>Can I add more than one assignee to an action item?</strong> Each action item has one assignee field, but you can list multiple names in it (e.g. "Priya, Sam") if a task is shared between people.</li>
          <li><strong>What happens to empty agenda or action item rows?</strong> Blank rows are automatically skipped in the printable preview, so you can add extra empty rows while typing without cluttering the final output.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/meeting-notes-template-generator" content={content}>
      <MeetingNotesTemplateGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MeetingNotesTemplateGenerator;
