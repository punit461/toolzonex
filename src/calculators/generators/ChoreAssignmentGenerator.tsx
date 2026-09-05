'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, Button, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let nextId = 1000;

const ChoreAssignmentGeneratorContent = () => {
  const [members, setMembers] = useState<{ id: number; name: string }[]>([
    { id: 1, name: 'Mom' }, { id: 2, name: 'Dad' }, { id: 3, name: 'Sam' },
  ]);
  const [chores, setChores] = useState<{ id: number; name: string }[]>([
    { id: 1, name: 'Dishes' }, { id: 2, name: 'Trash' }, { id: 3, name: 'Vacuuming' }, { id: 4, name: 'Laundry' },
  ]);
  const [seed, setSeed] = useState(0);

  const addMember = () => setMembers((prev) => [...prev, { id: nextId++, name: '' }]);
  const removeMember = (id: number) => setMembers((prev) => prev.filter((m) => m.id !== id));
  const updateMember = (id: number, name: string) => setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, name } : m)));

  const addChore = () => setChores((prev) => [...prev, { id: nextId++, name: '' }]);
  const removeChore = (id: number) => setChores((prev) => prev.filter((c) => c.id !== id));
  const updateChore = (id: number, name: string) => setChores((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));

  const validMembers = useMemo(() => members.filter((m) => m.name.trim()), [members]);
  const validChores = useMemo(() => chores.filter((c) => c.name.trim()), [chores]);

  const assignments = useMemo(() => {
    if (validMembers.length === 0) return {};
    const result: Record<string, string[]> = {};
    validMembers.forEach((m) => { result[m.name] = []; });
    const shuffledChores = shuffle(validChores);
    shuffledChores.forEach((chore, i) => {
      const member = validMembers[i % validMembers.length];
      result[member.name].push(chore.name);
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validMembers, validChores, seed]);

  const regenerate = () => setSeed((s) => s + 1);

  const copyAssignments = async () => {
    const lines = Object.entries(assignments).map(([name, list]) =>
      `${name}: ${list.length > 0 ? list.join(', ') : '(no chores this week)'}`
    );
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Household Members</Typography>
          <Stack spacing={1}>
            {members.map((m) => (
              <Box key={m.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth value={m.name} placeholder="Name" onChange={(e) => updateMember(m.id, e.target.value)} />
                <IconButton size="small" onClick={() => removeMember(m.id)} disabled={members.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addMember} sx={{ mt: 1 }}>Add Member</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Chores</Typography>
          <Stack spacing={1}>
            {chores.map((c) => (
              <Box key={c.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TextField size="small" fullWidth value={c.name} placeholder="Chore" onChange={(e) => updateChore(c.id, e.target.value)} />
                <IconButton size="small" onClick={() => removeChore(c.id)} disabled={chores.length <= 1}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addChore} sx={{ mt: 1 }}>Add Chore</Button>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={1} sx={{ mt: 3, mb: 2 }}>
        <Button variant="contained" startIcon={<ShuffleIcon />} onClick={regenerate} disabled={validMembers.length === 0 || validChores.length === 0}>
          Regenerate
        </Button>
        <Button startIcon={<ContentCopyIcon />} onClick={copyAssignments} disabled={Object.keys(assignments).length === 0}>
          Copy
        </Button>
      </Stack>

      <Typography variant="subtitle1" fontWeight={600} mb={2}>This Week&apos;s Assignments</Typography>
      <Grid container spacing={2}>
        {Object.entries(assignments).map(([name, list]) => (
          <Grid item xs={12} sm={6} md={4} key={name}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" fontWeight={700} color="primary.main" gutterBottom>{name}</Typography>
              {list.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No chores this week</Typography>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {list.map((c) => <li key={c}>{c}</li>)}
                </ul>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ChoreAssignmentGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Chore Assignment Generator</Typography>
      <Typography variant="body1">
        List each household member and every chore that needs doing this week, then click Regenerate. The tool
        shuffles the chore list randomly and deals chores out to members one at a time in round-robin fashion,
        keeping the workload as even as possible. If there are more chores than people, some members simply get
        more than one chore; if there are more people than chores, some members get none that week — both
        cases are handled automatically. Click Regenerate again any time for a fresh, random rotation for next
        week.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 3 members (Mom, Dad, Sam) and 4 chores (Dishes, Trash, Vacuuming, Laundry), the shuffle might
        assign Sam two chores while Mom and Dad each get one — a different, equally random split appears each
        time you click Regenerate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Rotating household chores fairly among family members or roommates each week.</li>
          <li>Avoiding arguments over who does what by letting a random draw decide.</li>
          <li>Quickly re-assigning chores when the list of people or tasks changes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if there are more chores than people?</strong> The extra chores are distributed round-robin, so some members simply end up with two or more chores that week instead of one.</li>
          <li><strong>What if there are more people than chores?</strong> Some members will be assigned no chores that week — the tool shows this clearly rather than forcing an assignment where none is needed.</li>
          <li><strong>Can I get a new rotation without retyping my lists?</strong> Yes — click Regenerate to reshuffle the same members and chores into a new random assignment, ready for the next rotation.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/chore-assignment-generator" content={content}>
      <ChoreAssignmentGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ChoreAssignmentGenerator;
