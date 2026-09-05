'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, IconButton, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Person {
  name: string;
  birthdate: string;
}

function daysUntilNextBirthday(birthdate: string, today: Date): number | null {
  const parsed = new Date(birthdate);
  if (isNaN(parsed.getTime())) return null;

  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let next = new Date(today.getFullYear(), parsed.getMonth(), parsed.getDate());
  if (next.getTime() < todayMidnight.getTime()) {
    next = new Date(today.getFullYear() + 1, parsed.getMonth(), parsed.getDate());
  }
  const diffMs = next.getTime() - todayMidnight.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

const BirthdayReminderListGeneratorContent = () => {
  const [people, setPeople] = useState<Person[]>([
    { name: '', birthdate: '' },
  ]);

  const addPerson = () => setPeople((prev) => [...prev, { name: '', birthdate: '' }]);
  const removePerson = (idx: number) => setPeople((prev) => prev.filter((_, i) => i !== idx));
  const updatePerson = (idx: number, field: keyof Person, value: string) =>
    setPeople((prev) => prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)));

  const sorted = useMemo(() => {
    const today = new Date();
    return people
      .filter((p) => p.name.trim() && p.birthdate)
      .map((p) => ({ ...p, daysUntil: daysUntilNextBirthday(p.birthdate, today) }))
      .filter((p): p is Person & { daysUntil: number } => p.daysUntil !== null)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [people]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>People</Typography>
        <Stack spacing={1}>
          {people.map((person, idx) => (
            <Stack direction="row" spacing={1} key={idx} alignItems="center">
              <TextField
                size="small"
                label="Name"
                value={person.name}
                onChange={(e) => updatePerson(idx, 'name', e.target.value)}
                fullWidth
              />
              <TextField
                size="small"
                label="Birthdate"
                type="date"
                value={person.birthdate}
                onChange={(e) => updatePerson(idx, 'birthdate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 160 }}
              />
              <IconButton size="small" onClick={() => removePerson(idx)} disabled={people.length <= 1}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
          <Button size="small" startIcon={<AddIcon />} onClick={addPerson} sx={{ alignSelf: 'flex-start' }}>
            Add Person
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Upcoming Birthdays (Soonest First)</Typography>
        {sorted.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            Add a name and birthdate to see upcoming birthdays sorted by how soon they occur.
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Birthdate</TableCell>
                  <TableCell align="right">Days Until Next Birthday</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sorted.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.birthdate}</TableCell>
                    <TableCell align="right">
                      {p.daysUntil === 0 ? 'Today!' : `${p.daysUntil} day${p.daysUntil === 1 ? '' : 's'}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const BirthdayReminderListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Birthday Reminder List Generator</Typography>
      <Typography variant="body1">
        Add each person&apos;s name and birthdate — add or remove rows as needed. The tool computes each
        person&apos;s next upcoming birthday from today&apos;s date: if this year&apos;s birthday has already
        passed, it automatically uses next year&apos;s date instead. The results table is then sorted so the
        soonest birthday always appears first, giving you a clear, ranked reference list.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If today is September 5th and you add someone born on September 20th and someone else born on March
        3rd, the September 20th birthday (soon this year) is listed above the March 3rd birthday (further away,
        counted into next year), because it has fewer days remaining until it occurs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a quick reference list of family or friends&apos; birthdays sorted by urgency.</li>
          <li>Checking whose birthday is coming up soonest before planning a card or gift.</li>
          <li>Reviewing a team or classroom&apos;s birthdays in order for the rest of the year.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this notify me when a birthday arrives?</strong> No — this is a static, sorted reference list, not a reminder or notification system. It has no backend and can&apos;t send alerts; you&apos;ll need to check back on the page yourself or use a calendar app for actual notifications.</li>
          <li><strong>Is my list saved between visits?</strong> No — the list only exists in your browser&apos;s memory for the current visit and is cleared on reload, so re-enter it or keep a separate copy if you&apos;ll need it again later.</li>
          <li><strong>What happens on someone&apos;s actual birthday?</strong> If today is exactly their birthday, the days-until value shows "Today!" instead of a day count.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/birthday-reminder-list-generator" content={content}>
      <BirthdayReminderListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BirthdayReminderListGenerator;
