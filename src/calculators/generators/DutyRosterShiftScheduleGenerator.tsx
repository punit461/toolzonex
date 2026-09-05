'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Shift {
  id: number;
  day: string;
  timeSlot: string;
  assigned: string[];
}

let nextShiftId = 200;

const DEFAULT_PEOPLE = ['Alex', 'Priya', 'Sam', 'Morgan'];
const DEFAULT_SHIFTS: Shift[] = [
  { id: 1, day: 'Monday', timeSlot: 'Morning', assigned: [] },
  { id: 2, day: 'Monday', timeSlot: 'Evening', assigned: [] },
  { id: 3, day: 'Tuesday', timeSlot: 'Morning', assigned: [] },
  { id: 4, day: 'Tuesday', timeSlot: 'Evening', assigned: [] },
];

const DutyRosterShiftScheduleGeneratorContent = () => {
  const [people, setPeople] = useState<string[]>(DEFAULT_PEOPLE);
  const [newPerson, setNewPerson] = useState('');
  const [shifts, setShifts] = useState<Shift[]>(DEFAULT_SHIFTS);

  const addPerson = () => {
    const trimmed = newPerson.trim();
    if (!trimmed) return;
    setPeople((prev) => [...prev, trimmed]);
    setNewPerson('');
  };
  const removePerson = (name: string) => {
    setPeople((prev) => prev.filter((p) => p !== name));
    setShifts((prev) => prev.map((s) => ({ ...s, assigned: s.assigned.filter((a) => a !== name) })));
  };

  const addShift = () => setShifts((prev) => [...prev, { id: nextShiftId++, day: '', timeSlot: '', assigned: [] }]);
  const removeShift = (id: number) => setShifts((prev) => prev.filter((s) => s.id !== id));
  const updateShift = (id: number, patch: Partial<Shift>) =>
    setShifts((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const autoFillRoundRobin = () => {
    if (people.length === 0) return;
    setShifts((prev) => prev.map((s, i) => ({ ...s, assigned: [people[i % people.length]] })));
  };

  const validShifts = useMemo(() => shifts.filter((s) => s.day.trim() || s.timeSlot.trim()), [shifts]);

  const copyRoster = async () => {
    const lines = validShifts.map((s) => {
      const label = [s.day, s.timeSlot].filter(Boolean).join(' - ');
      return `${label}: ${s.assigned.length > 0 ? s.assigned.join(', ') : '(unassigned)'}`;
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>People</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <TextField
            size="small"
            label="Add a person"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addPerson(); }}
          />
          <Button variant="contained" startIcon={<AddIcon />} onClick={addPerson}>Add</Button>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {people.map((p) => (
            <Chip key={p} label={p} onDelete={() => removePerson(p)} sx={{ mb: 1 }} />
          ))}
        </Stack>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={1}>
          <Typography variant="subtitle1" fontWeight={600}>Shifts</Typography>
          <Stack direction="row" spacing={1}>
            <Button size="small" startIcon={<ShuffleIcon />} onClick={autoFillRoundRobin} disabled={people.length === 0}>
              Round-Robin Auto-Fill
            </Button>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyRoster} disabled={validShifts.length === 0}>
              Copy Roster
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          {shifts.map((s) => (
            <Paper key={s.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField size="small" label="Day" value={s.day} onChange={(e) => updateShift(s.id, { day: e.target.value })} sx={{ flex: 1, minWidth: 110 }} />
                <TextField size="small" label="Time slot" value={s.timeSlot} onChange={(e) => updateShift(s.id, { timeSlot: e.target.value })} sx={{ flex: 1, minWidth: 110 }} />
                <IconButton onClick={() => removeShift(s.id)} disabled={shifts.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Select
                size="small"
                multiple
                fullWidth
                value={s.assigned}
                onChange={(e) => updateShift(s.id, { assigned: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value })}
                input={<OutlinedInput />}
                renderValue={(selected) => (selected as string[]).join(', ') || 'Unassigned'}
                displayEmpty
              >
                {people.map((p) => (
                  <MenuItem key={p} value={p}>{p}</MenuItem>
                ))}
              </Select>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addShift} sx={{ mt: 2 }}>
          Add Shift
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Roster</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          {validShifts.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Add shifts above to build the roster.</Typography>
          ) : (
            <Stack spacing={1}>
              {validShifts.map((s) => (
                <Box key={s.id} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
                  <Typography fontWeight={600}>{[s.day, s.timeSlot].filter(Boolean).join(' - ')}</Typography>
                  <Typography color={s.assigned.length ? 'text.primary' : 'text.secondary'}>
                    {s.assigned.length ? s.assigned.join(', ') : 'Unassigned'}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const DutyRosterShiftScheduleGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Duty Roster/Shift Schedule Generator</Typography>
      <Typography variant="body1">
        Add the names of everyone available, then add each shift with a day and time-slot label. For each
        shift, use the dropdown to assign one or more people, or click &quot;Round-Robin Auto-Fill&quot; to
        automatically cycle through your people list and assign one person per shift in order. The Roster
        section at the bottom shows the finished grid — shifts as rows, with assigned people listed for
        each.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With people Alex, Priya, Sam, and Morgan, and four shifts (Monday Morning, Monday Evening, Tuesday
        Morning, Tuesday Evening), clicking Round-Robin Auto-Fill assigns Alex to Monday Morning, Priya to
        Monday Evening, Sam to Tuesday Morning, and Morgan to Tuesday Evening.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a weekly staff duty roster for a small business, shop, or office.</li>
          <li>Assigning shift coverage across a team quickly using the round-robin shortcut as a starting point.</li>
          <li>Organizing a volunteer or on-call schedule with multiple people covering different time slots.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I assign more than one person to a shift?</strong> Yes — the shift assignment dropdown allows multiple selections, so you can assign as many people as needed to cover a single shift.</li>
          <li><strong>What does Round-Robin Auto-Fill actually do?</strong> It cycles through your list of people in order and assigns one person to each shift, wrapping back to the start of the list once it runs out of people — it&apos;s meant as a fast starting point you can then adjust manually.</li>
          <li><strong>Does removing a person also remove them from shifts?</strong> Yes — removing someone from the People list automatically removes them from any shifts they were assigned to, so the roster never references someone who's no longer in the list.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/duty-roster-shift-schedule-generator" content={content}>
      <DutyRosterShiftScheduleGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DutyRosterShiftScheduleGenerator;
