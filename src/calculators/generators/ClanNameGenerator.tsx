'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Theme = 'fantasy' | 'gaming' | 'warrior' | 'mythical';

const PREFIXES: Record<Theme, string[]> = {
  fantasy: ['Silver', 'Shadow', 'Moon', 'Frost', 'Ember', 'Iron', 'Storm', 'Dawn'],
  gaming: ['Toxic', 'Elite', 'Apex', 'Rogue', 'Cyber', 'Phantom', 'Savage', 'Prime'],
  warrior: ['Blood', 'Steel', 'Iron', 'War', 'Battle', 'Grim', 'Stone', 'Ash'],
  mythical: ['Drake', 'Wyrm', 'Titan', 'Fallen', 'Ancient', 'Astral', 'Void', 'Celestial'],
};

const SUFFIXES: Record<Theme, string[]> = {
  fantasy: ['fang', 'wood', 'blade', 'heart', 'wing', 'vale', 'crest', 'born'],
  gaming: ['Squad', 'Legion', 'Clan', 'Guild', 'Syndicate', 'Force', 'Crew', 'Alliance'],
  warrior: ['guard', 'axe', 'shield', 'fist', 'blade', 'hammer', 'reaver', 'born'],
  mythical: ['bane', 'reign', 'fall', 'wrath', 'spawn', 'legion', 'kin', 'wielders'],
};

const ClanNameGeneratorContent = () => {
  const [theme, setTheme] = useState<Theme>('fantasy');
  const [name, setName] = useState<string | null>(null);

  const generate = () => {
    const prefixes = PREFIXES[theme];
    const suffixes = SUFFIXES[theme];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    setName(`${prefix}${suffix}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Theme</Typography>
        <ToggleButtonGroup exclusive value={theme} onChange={(_, val) => val && setTheme(val)}>
          <ToggleButton value="fantasy" sx={{ textTransform: 'none' }}>Fantasy</ToggleButton>
          <ToggleButton value="gaming" sx={{ textTransform: 'none' }}>Gaming</ToggleButton>
          <ToggleButton value="warrior" sx={{ textTransform: 'none' }}>Warrior</ToggleButton>
          <ToggleButton value="mythical" sx={{ textTransform: 'none' }}>Mythical</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<GroupsIcon />} onClick={generate}>
        Generate Clan Name
      </Button>

      {name && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', minWidth: 260 }}>
          <Typography variant="h4" fontWeight={700}>{name}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const ClanNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Clan Name Generator Works</Typography>
      <Typography variant="body1">
        Choose a theme (fantasy, gaming, warrior, or mythical), then click generate. The tool combines a
        random themed prefix with a random themed suffix to build a clan or guild name suited for gaming
        communities.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing &quot;Warrior&quot; might generate &quot;Bloodguard&quot; or &quot;Ironblade,&quot; while
        choosing &quot;Gaming&quot; might generate &quot;ApexSquad&quot; or &quot;ToxicLegion.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming a gaming clan, guild, or team before a tournament or league.</li>
          <li>Finding a name for an in-game group in an MMO or multiplayer game.</li>
          <li>Getting inspiration when brainstorming a Discord server or community name.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I generate more than one name?</Typography>
      <Typography variant="body1">
        Yes — click &quot;Generate Clan Name&quot; as many times as you like to see different prefix/suffix
        combinations for your chosen theme.
      </Typography>
      <Typography variant="h3">Will the same combination repeat?</Typography>
      <Typography variant="body1">
        Yes — each generation randomly picks a prefix and suffix independently, so the same combination can
        come up more than once, especially with fewer clicks.
      </Typography>
      <Typography variant="h3">Are these names trademark-free to use?</Typography>
      <Typography variant="body1">
        These are generic word combinations, but it&apos;s always a good idea to double-check that your chosen
        name isn&apos;t already in use by another clan, guild, or trademarked brand before adopting it,
        especially for competitive or public communities.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/clan-name-generator" content={content}>
      <ClanNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ClanNameGenerator;
