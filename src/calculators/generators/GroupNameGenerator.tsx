'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Context = 'Sports Team' | 'Work Team' | 'Friend Group' | 'Study Group';

const CONTEXTS: Context[] = ['Sports Team', 'Work Team', 'Friend Group', 'Study Group'];

const GROUP_NAMES: Record<Context, string[]> = {
  'Sports Team': [
    'Thunder Hawks', 'Iron Wolves', 'Storm Chasers', 'Blazing Falcons', 'Rapid Foxes', 'Steel Panthers',
    'Crimson Tide Runners', 'Rogue Rhinos', 'Night Owls', 'Fearless Lions', 'Velocity Vipers', 'Granite Bears',
  ],
  'Work Team': [
    'The Dream Team', 'Synergy Squad', 'The A-Team', 'Task Force Titans', 'The Innovators', 'Momentum Makers',
    'The Brain Trust', 'Solution Squad', 'The Dynamos', 'Peak Performers', 'The Collective', 'Ctrl+Alt+Elite',
  ],
  'Friend Group': [
    'The Usual Suspects', 'Squad Goals', 'The Crew', 'Ride or Die', 'The Regulars', 'Chosen Family',
    'The Misfits', 'Circle of Trust', 'The OGs', 'No Filter Club', 'The Hangout Gang', 'Since Day One',
  ],
  'Study Group': [
    'Brain Trust', 'The Study Squad', 'Notebook Ninjas', 'Highlighter Heroes', 'The Curve Breakers', 'Flashcard Force',
    'Late Night Learners', 'The Deadline Dodgers', 'Study Buddies United', 'Coffee & Cram', 'The Overachievers', 'Focus Mode',
  ],
};

const GroupNameGeneratorContent = () => {
  const [context, setContext] = useState<Context>('Friend Group');
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    const pool = [...GROUP_NAMES[context]];
    const picks: string[] = [];
    while (picks.length < 3 && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length);
      picks.push(pool.splice(idx, 1)[0]);
    }
    setNames(picks);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5, textAlign: 'center' }}>
          Context
        </Typography>
        <ToggleButtonGroup
          exclusive
          value={context}
          onChange={(_, val) => {
            if (val) {
              setContext(val);
              setNames([]);
            }
          }}
          sx={{ flexWrap: 'wrap' }}
        >
          {CONTEXTS.map((c) => (
            <ToggleButton key={c} value={c} sx={{ textTransform: 'none' }}>
              {c}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<GroupsIcon />} onClick={generate}>
        {names.length === 0 ? 'Generate Group Names' : 'Regenerate'}
      </Button>

      {names.length > 0 && (
        <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 480 }}>
          {names.map((n) => (
            <Paper key={n} variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700}>
                {n}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

const GroupNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Group Name Generator</Typography>
      <Typography variant="body1">
        Choose a context — Sports Team, Work Team, Friend Group, or Study Group — and click
        &quot;Generate Group Names&quot; for 3 suggestions drawn from a hand-picked list written to fit that
        setting. Click &quot;Regenerate&quot; for more options any time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing Sports Team might suggest &quot;Thunder Hawks&quot;, &quot;Iron Wolves&quot;, and
        &quot;Storm Chasers&quot;, while Work Team might suggest &quot;Synergy Squad&quot;,
        &quot;The Dynamos&quot;, and &quot;Peak Performers&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming a new recreational sports team, league squad, or fantasy team.</li>
          <li>Picking a fun name for a work project team, department, or Slack channel.</li>
          <li>Finding a name for a group chat with friends or a study group for an upcoming exam.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Can I use these names for an official league or company team?</strong> Most names are
            generic enough to use freely, but for a formal league or company setting, double-check your
            organization&apos;s naming rules or trademark concerns first.
          </li>
          <li>
            <strong>How many names are in each context&apos;s list?</strong> Each of the 4 contexts has 12
            hand-written suggestions, and each click shows 3 of them at random.
          </li>
          <li>
            <strong>Can I switch contexts without losing my favorites?</strong> Switching context clears
            the current suggestions, so make a note of any name you like before changing the selector.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/group-name-generator" content={content}>
      <GroupNameGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default GroupNameGenerator;
