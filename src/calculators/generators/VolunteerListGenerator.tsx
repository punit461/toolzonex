'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Volunteer {
  id: number;
  name: string;
  role: string;
  shift: string;
  contact: string;
}

let nextId = 1100;

const DEFAULT_VOLUNTEERS: Volunteer[] = [
  { id: 1, name: 'Alex Johnson', role: 'Registration', shift: 'Sat 9am-12pm', contact: '555-0101' },
  { id: 2, name: 'Priya Patel', role: 'Setup', shift: 'Sat 7am-9am', contact: '555-0102' },
  { id: 3, name: 'Sam Lee', role: 'Registration', shift: 'Sat 12pm-3pm', contact: '555-0103' },
];

type GroupBy = 'none' | 'role' | 'shift';

const VolunteerListGeneratorContent = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(DEFAULT_VOLUNTEERS);
  const [groupBy, setGroupBy] = useState<GroupBy>('role');

  const addVolunteer = () => setVolunteers((prev) => [...prev, { id: nextId++, name: '', role: '', shift: '', contact: '' }]);
  const removeVolunteer = (id: number) => setVolunteers((prev) => prev.filter((v) => v.id !== id));
  const updateVolunteer = (id: number, patch: Partial<Volunteer>) =>
    setVolunteers((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const validVolunteers = useMemo(() => volunteers.filter((v) => v.name.trim()), [volunteers]);

  const grouped = useMemo(() => {
    if (groupBy === 'none') return { 'All Volunteers': validVolunteers };
    const groups: Record<string, Volunteer[]> = {};
    validVolunteers.forEach((v) => {
      const key = (groupBy === 'role' ? v.role : v.shift).trim() || 'Unassigned';
      if (!groups[key]) groups[key] = [];
      groups[key].push(v);
    });
    return groups;
  }, [validVolunteers, groupBy]);

  const copyList = async () => {
    const lines: string[] = [];
    Object.entries(grouped).forEach(([group, vols]) => {
      lines.push(`${group}:`);
      vols.forEach((v) => {
        lines.push(`  - ${v.name}${v.role ? ` (${v.role})` : ''}${v.shift ? ` — ${v.shift}` : ''}${v.contact ? ` [${v.contact}]` : ''}`);
      });
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Volunteers</Typography>
        <Stack spacing={2}>
          {volunteers.map((v) => (
            <Paper key={v.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField size="small" label="Name" value={v.name} onChange={(e) => updateVolunteer(v.id, { name: e.target.value })} sx={{ flex: 1.5, minWidth: 130 }} />
                <TextField size="small" label="Role / task" value={v.role} onChange={(e) => updateVolunteer(v.id, { role: e.target.value })} sx={{ flex: 1, minWidth: 110 }} />
                <IconButton onClick={() => removeVolunteer(v.id)} disabled={volunteers.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1}>
                <TextField size="small" fullWidth label="Shift date/time" value={v.shift} onChange={(e) => updateVolunteer(v.id, { shift: e.target.value })} />
                <TextField size="small" fullWidth label="Contact info" value={v.contact} onChange={(e) => updateVolunteer(v.id, { contact: e.target.value })} />
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addVolunteer} sx={{ mt: 2 }}>
          Add Volunteer
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1} flexWrap="wrap" gap={1}>
          <Typography variant="subtitle1" fontWeight={600}>Volunteer List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={validVolunteers.length === 0}>
            Copy
          </Button>
        </Stack>
        <ToggleButtonGroup size="small" value={groupBy} exclusive onChange={(_, v) => v && setGroupBy(v)} sx={{ mb: 2 }}>
          <ToggleButton value="none">No Grouping</ToggleButton>
          <ToggleButton value="role">Group by Role</ToggleButton>
          <ToggleButton value="shift">Group by Shift</ToggleButton>
        </ToggleButtonGroup>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
          {validVolunteers.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add a volunteer to build your list.</Typography>
          )}
          {Object.entries(grouped).map(([group, vols]) => (
            <Box key={group} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={700}>{group}</Typography>
              <ul style={{ marginTop: 4 }}>
                {vols.map((v) => (
                  <li key={v.id}>
                    {v.name}
                    {groupBy !== 'role' && v.role ? ` (${v.role})` : ''}
                    {groupBy !== 'shift' && v.shift ? ` — ${v.shift}` : ''}
                    {v.contact ? ` [${v.contact}]` : ''}
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

const VolunteerListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Volunteer List Generator</Typography>
      <Typography variant="body1">
        Add each volunteer with their name, assigned role or task, shift date/time, and contact info. Use
        the grouping toggle to organize the output list by role, by shift, or with no grouping at all —
        useful for handing out role-specific instructions or seeing who&apos;s on duty during a given shift.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With Alex and Sam both assigned to &quot;Registration&quot; and Priya assigned to &quot;Setup&quot;,
        grouping by role produces a Registration group listing Alex and Sam, and a separate Setup group
        listing Priya.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Organizing volunteers for a community event, fundraiser, or race by role or shift.</li>
          <li>Printing a shift-based volunteer roster to hand out at a check-in table.</li>
          <li>Keeping volunteer contact info organized in one place for event-day coordination.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if I leave the role or shift field blank?</strong> When grouping by that field, volunteers with a blank value are grouped together under an &quot;Unassigned&quot; heading, so nobody gets silently dropped from the list.</li>
          <li><strong>Can I group by both role and shift at the same time?</strong> No — you can group by one field at a time (role or shift, or no grouping at all), which keeps the output simple and easy to scan.</li>
          <li><strong>Is my volunteer list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/volunteer-list-generator" content={content}>
      <VolunteerListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VolunteerListGenerator;
