'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, Button, ToggleButton, ToggleButtonGroup, Grid } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'groups' | 'size';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ClassroomGroupMakerContent = () => {
  const [namesText, setNamesText] = useState('Alex\nJordan\nTaylor\nMorgan\nCasey\nRiley\nSam\nJamie\nAvery\nDrew');
  const [mode, setMode] = useState<Mode>('groups');
  const [numGroups, setNumGroups] = useState(3);
  const [groupSize, setGroupSize] = useState(3);
  const [seed, setSeed] = useState(0);

  const names = useMemo(
    () => namesText.split('\n').map((n) => n.trim()).filter(Boolean),
    [namesText]
  );

  const groups = useMemo(() => {
    if (names.length === 0) return [];
    const shuffled = shuffle(names);
    const count = mode === 'groups'
      ? Math.max(1, Math.min(names.length, numGroups))
      : Math.max(1, Math.ceil(names.length / Math.max(1, groupSize)));

    const result: string[][] = Array.from({ length: count }, () => []);
    shuffled.forEach((name, i) => {
      result[i % count].push(name);
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names, mode, numGroups, groupSize, seed]);

  const regenerate = () => setSeed((s) => s + 1);

  const copyGroups = async () => {
    const lines = groups.map((g, i) => `Group ${i + 1}: ${g.join(', ')}`);
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Student Names (one per line)</Typography>
          <TextField
            multiline
            minRows={10}
            fullWidth
            value={namesText}
            onChange={(e) => setNamesText(e.target.value)}
          />
          <Typography variant="caption" color="text.secondary">{names.length} name{names.length !== 1 ? 's' : ''} entered</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>Grouping Mode</Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, v) => v && setMode(v)}
            sx={{ mb: 2 }}
            fullWidth
          >
            <ToggleButton value="groups">By Number of Groups</ToggleButton>
            <ToggleButton value="size">By Group Size</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'groups' ? (
            <TextField
              label="Number of Groups"
              type="number"
              fullWidth
              value={numGroups}
              onChange={(e) => setNumGroups(Math.max(1, parseInt(e.target.value, 10) || 1))}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ mb: 2 }}
            />
          ) : (
            <TextField
              label="Students per Group"
              type="number"
              fullWidth
              value={groupSize}
              onChange={(e) => setGroupSize(Math.max(1, parseInt(e.target.value, 10) || 1))}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ mb: 2 }}
            />
          )}

          <Stack direction="row" spacing={1}>
            <Button variant="contained" startIcon={<ShuffleIcon />} onClick={regenerate} disabled={names.length === 0}>
              Regenerate
            </Button>
            <Button startIcon={<ContentCopyIcon />} onClick={copyGroups} disabled={groups.length === 0}>
              Copy
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" fontWeight={600} mt={4} mb={2}>Groups</Typography>
      <Grid container spacing={2}>
        {groups.map((g, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" fontWeight={700} color="primary.main" gutterBottom>
                Group {i + 1} ({g.length})
              </Typography>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {g.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ClassroomGroupMaker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Classroom Group Maker</Typography>
      <Typography variant="body1">
        Paste or type your list of student names, one per line, into the text box. Choose whether you want to
        split the class by a target number of groups or by a target group size, then enter that number. The
        tool runs a proper Fisher-Yates shuffle on the full name list before dividing it, so every student has
        an equal, unbiased chance of ending up in any group, and distributes names as evenly as possible across
        the resulting groups. Click Regenerate any time for a fresh random split, or Copy to grab the whole
        result as plain text.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With 10 student names entered and &quot;By Number of Groups&quot; set to 3, the tool shuffles the list
        and deals names round-robin into three groups, producing groups of 4, 3, and 3 students — as even a
        split as 10 students into 3 groups allows.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Randomly forming project or discussion groups for a classroom activity.</li>
          <li>Splitting a team or workshop attendees into breakout groups fairly.</li>
          <li>Re-shuffling group assignments each week to mix up who works with whom.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is the shuffle actually randomized?</strong> The tool uses the Fisher-Yates shuffle algorithm, a well-known unbiased method that gives every possible ordering of the names an equal chance, rather than a naive sort-by-random-number approach that can skew results.</li>
          <li><strong>What happens if the names don&apos;t divide evenly?</strong> Extra students are distributed one at a time across the groups, so group sizes never differ by more than one student.</li>
          <li><strong>Can I get a different split without changing my name list?</strong> Yes — click Regenerate to reshuffle the same list of names into a brand new random grouping.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/classroom-group-maker" content={content}>
      <ClassroomGroupMakerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ClassroomGroupMaker;
