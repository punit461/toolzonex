'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface VisitorEntry {
  id: number;
  name: string;
  date: string;
  timeIn: string;
  timeOut: string;
  purpose: string;
  host: string;
}

let nextId = 1;

const DEFAULT_VISITORS: VisitorEntry[] = [
  { id: nextId++, name: 'Jordan Smith', date: '', timeIn: '09:15', timeOut: '10:00', purpose: 'Client meeting', host: 'Alex Johnson' },
];

const VisitorLogBookContent = () => {
  const [visitors, setVisitors] = useState<VisitorEntry[]>(DEFAULT_VISITORS);

  const addVisitor = () => setVisitors((prev) => [...prev, { id: nextId++, name: '', date: '', timeIn: '', timeOut: '', purpose: '', host: '' }]);
  const removeVisitor = (id: number) => setVisitors((prev) => prev.filter((v) => v.id !== id));
  const updateVisitor = (id: number, patch: Partial<VisitorEntry>) =>
    setVisitors((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const sortedVisitors = useMemo(
    () =>
      visitors
        .filter((v) => v.name.trim())
        .slice()
        .sort((a, b) => {
          const aKey = `${a.date || '9999-99-99'} ${a.timeIn || '99:99'}`;
          const bKey = `${b.date || '9999-99-99'} ${b.timeIn || '99:99'}`;
          return aKey.localeCompare(bKey);
        }),
    [visitors]
  );

  const copyLog = async () => {
    const lines = sortedVisitors.map((v) => {
      const parts = [v.name.trim()];
      if (v.date.trim()) parts.push(`— ${v.date.trim()}`);
      if (v.timeIn.trim() || v.timeOut.trim()) parts.push(`(${v.timeIn || '?'} - ${v.timeOut || '?'})`);
      if (v.purpose.trim()) parts.push(`— ${v.purpose.trim()}`);
      if (v.host.trim()) parts.push(`— visiting ${v.host.trim()}`);
      return `- ${parts.join(' ')}`;
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Visitor Entries</Typography>
        <Stack spacing={2}>
          {visitors.map((v) => (
            <Paper key={v.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth label="Visitor name" value={v.name} onChange={(e) => updateVisitor(v.id, { name: e.target.value })} />
                <IconButton onClick={() => removeVisitor(v.id)} disabled={visitors.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <TextField size="small" fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }} value={v.date} onChange={(e) => updateVisitor(v.id, { date: e.target.value })} />
                <TextField size="small" fullWidth type="time" label="Time in" InputLabelProps={{ shrink: true }} value={v.timeIn} onChange={(e) => updateVisitor(v.id, { timeIn: e.target.value })} />
                <TextField size="small" fullWidth type="time" label="Time out" InputLabelProps={{ shrink: true }} value={v.timeOut} onChange={(e) => updateVisitor(v.id, { timeOut: e.target.value })} />
              </Stack>
              <Stack direction="row" spacing={1}>
                <TextField size="small" fullWidth label="Purpose of visit" value={v.purpose} onChange={(e) => updateVisitor(v.id, { purpose: e.target.value })} />
                <TextField size="small" fullWidth label="Host / visiting" value={v.host} onChange={(e) => updateVisitor(v.id, { host: e.target.value })} />
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addVisitor} sx={{ mt: 2 }}>
          Add Visitor Entry
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Visitor Log (Chronological)</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyLog} disabled={sortedVisitors.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          {sortedVisitors.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add a visitor entry to build your log.</Typography>
          )}
          <ol style={{ marginTop: 0, paddingLeft: 20 }}>
            {sortedVisitors.map((v) => (
              <li key={v.id} style={{ marginBottom: 6 }}>
                <strong>{v.name}</strong>
                {v.date.trim() ? ` — ${v.date.trim()}` : ''}
                {v.timeIn.trim() || v.timeOut.trim() ? ` (${v.timeIn || '?'} - ${v.timeOut || '?'})` : ''}
                {v.purpose.trim() ? ` — ${v.purpose.trim()}` : ''}
                {v.host.trim() ? ` — visiting ${v.host.trim()}` : ''}
              </li>
            ))}
          </ol>
        </Paper>
      </Box>
    </Box>
  );
};

const VisitorLogBook = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Visitor Log Book</Typography>
      <Typography variant="body1">
        Add each visitor entry with their name, date, time in and out, purpose of visit, and who they&apos;re
        visiting. The panel on the right automatically sorts every entry chronologically by date and time
        in, building a running visitor log — useful for a front desk, office reception, or building entrance
        that needs a running record of everyone who&apos;s come through, not just a single check-in.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding Jordan Smith with a time in of 09:15 for a client meeting with Alex Johnson, then adding a
        second visitor with an earlier time in the same day, produces a log where the earlier visitor
        appears first, sorted chronologically ahead of Jordan Smith.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Keeping a front-desk record of every visitor who enters an office or building over the day.</li>
          <li>Tracking who visited whom and for how long, for security or compliance purposes.</li>
          <li>Printing a daily or weekly visitor log for record-keeping.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Name Badge/Visitor Pass Generator?</strong> The Name Badge/Visitor Pass Generator creates a printable pass for a single visitor at check-in. This tool maintains a running log of multiple visitor entries over time, sorted chronologically — a record of everyone who&apos;s visited, not a one-time printable pass.</li>
          <li><strong>Does the log re-sort automatically as I add entries?</strong> Yes — the chronological log on the right updates instantly whenever you add, edit, or remove a visitor entry.</li>
          <li><strong>Is my visitor log saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the log before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/visitor-log-book" content={content}>
      <VisitorLogBookContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VisitorLogBook;
