'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'sports' | 'gaming' | 'corporate' | 'funny';

const CATEGORY_LABELS: Record<Category, string> = {
  sports: 'Sports',
  gaming: 'Gaming',
  corporate: 'Corporate',
  funny: 'Funny',
};

const ADJECTIVES: Record<Category, string[]> = {
  sports: ['Thunder', 'Iron', 'Rapid', 'Blazing', 'Fearless', 'Mighty', 'Savage', 'Roaring'],
  gaming: ['Cyber', 'Shadow', 'Toxic', 'Frag', 'Phantom', 'Rogue', 'Elite', 'Void'],
  corporate: ['Apex', 'Vertex', 'Prime', 'Summit', 'Core', 'Nexus', 'Peak', 'Meridian'],
  funny: ['Sleepy', 'Confused', 'Caffeinated', 'Awkward', 'Mediocre', 'Suspicious', 'Chaotic', 'Overcooked'],
};

const NOUNS: Record<Category, string[]> = {
  sports: ['Hawks', 'Titans', 'Wolves', 'Panthers', 'Warriors', 'Comets', 'Vipers', 'Raptors'],
  gaming: ['Legion', 'Squad', 'Reapers', 'Ninjas', 'Guild', 'Syndicate', 'Renegades', 'Marauders'],
  corporate: ['Solutions', 'Ventures', 'Dynamics', 'Partners', 'Collective', 'Group', 'Alliance', 'Innovators'],
  funny: ['Llamas', 'Potatoes', 'Ducklings', 'Interns', 'Raccoons', 'Sock Puppets', 'Muffins', 'Gremlins'],
};

function generateTeamName(category: Category): string {
  const adjectives = ADJECTIVES[category];
  const nouns = NOUNS[category];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}

const TeamNameGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('sports');
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    setNames(Array.from({ length: 5 }, () => generateTeamName(category)));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5 }}>Theme</Typography>
        <ToggleButtonGroup
          exclusive
          value={category}
          onChange={(_, val) => { if (val) setCategory(val); }}
          sx={{ flexWrap: 'wrap' }}
        >
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>
              {CATEGORY_LABELS[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Generate Team Names
        </Button>
      </Box>

      {names.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {names.map((name, i) => (
            <Paper key={i} variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="h6">{name}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

const TeamNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Team Name Generator Works</Typography>
      <Typography variant="body1">
        Pick a theme — Sports, Gaming, Corporate, or Funny — and this tool combines a themed adjective and
        noun from curated word lists to suggest five random team names at once, tailored to your chosen style.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Select the theme that best fits your team.</li>
          <li>Click &quot;Generate Team Names&quot; to see five suggestions.</li>
          <li>Click again for a fresh batch of five, or switch themes for a different style.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With &quot;Sports&quot; selected, you might get names like &quot;Thunder Hawks&quot; or &quot;Roaring
        Titans.&quot; Switching to &quot;Funny&quot; might give you &quot;Sleepy Llamas&quot; or
        &quot;Caffeinated Interns.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming a sports league, fantasy football, or intramural team.</li>
          <li>Picking a name for a gaming clan, esports squad, or Discord server.</li>
          <li>Finding a name for a work team, hackathon group, or department initiative.</li>
          <li>Coming up with a lighthearted, funny name for a trivia night or casual group.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I generate more names in the same theme?</Typography>
      <Typography variant="body1">
        Yes — click &quot;Generate Team Names&quot; again for a new batch of five random suggestions in the
        same theme.
      </Typography>
      <Typography variant="h3">Are the names checked for trademarks?</Typography>
      <Typography variant="body1">
        No — these are randomly generated suggestions for inspiration. Before using a name publicly or
        commercially, it&apos;s worth checking that it isn&apos;t already trademarked or in use by another
        team or organization.
      </Typography>
      <Typography variant="h3">Can I mix and match parts of different suggestions?</Typography>
      <Typography variant="body1">
        Absolutely — feel free to combine the adjective from one suggestion with the noun from another if that
        combination sounds better to you.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/team-name-generator" content={content}>
      <TeamNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TeamNameGenerator;
