'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PREFIXES = ['Project', 'Operation', 'Mission', 'Initiative', 'Codename'];

const MYTHOLOGICAL = [
  'Phoenix', 'Atlas', 'Titan', 'Odin', 'Athena', 'Orion', 'Hercules', 'Icarus', 'Prometheus',
  'Valkyrie', 'Chimera', 'Hydra', 'Nyx', 'Apollo', 'Poseidon', 'Kronos', 'Perseus', 'Griffin',
];

const GREEK_LETTERS = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Theta', 'Sigma', 'Omega', 'Lambda', 'Omicron', 'Kappa',
];

const COLORS = [
  'Blue', 'Crimson', 'Silver', 'Emerald', 'Obsidian', 'Amber', 'Violet', 'Scarlet', 'Cobalt', 'Ivory', 'Slate', 'Gold',
];

const ANIMALS = [
  'Falcon', 'Wolf', 'Raven', 'Panther', 'Eagle', 'Viper', 'Lynx', 'Hawk', 'Cobra', 'Tiger', 'Kraken', 'Bear',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOne(): string {
  const prefix = pick(PREFIXES);
  const style = Math.random();
  if (style < 0.4) {
    return `${prefix} ${pick(MYTHOLOGICAL)}`;
  }
  if (style < 0.75) {
    return `${prefix} ${pick(COLORS)} ${pick(ANIMALS)}`;
  }
  return `${prefix} ${pick(GREEK_LETTERS)}`;
}

function generateSet(count: number): string[] {
  const results = new Set<string>();
  let attempts = 0;
  while (results.size < count && attempts < count * 20) {
    results.add(generateOne());
    attempts++;
  }
  return Array.from(results);
}

const ProjectNameGeneratorContent = () => {
  const [names, setNames] = useState<string[]>([]);

  const generate = () => setNames(generateSet(5));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<AutoAwesomeIcon />} onClick={generate}>
        {names.length === 0 ? 'Generate Project Names' : 'Regenerate'}
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

const ProjectNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Project Name Generator</Typography>
      <Typography variant="body1">
        Click &quot;Generate Project Names&quot; to get 5 codename-style suggestions for an internal
        project, initiative, or operation. Each suggestion combines a prefix (Project, Operation, Mission,
        Initiative, or Codename) with either a mythological name, a color-plus-animal pairing, or a Greek
        letter — the same style used for real-world internal codenames. Click &quot;Regenerate&quot; for a
        fresh batch any time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One click might suggest &quot;Project Phoenix&quot;, &quot;Operation Blue Falcon&quot;,
        &quot;Mission Omega&quot;, &quot;Initiative Crimson Wolf&quot;, and &quot;Codename Atlas&quot; — a
        mix of styles to pick a favorite from.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming an internal product initiative before its public name is decided.</li>
          <li>Picking a memorable codename for a confidential project or feature branch.</li>
          <li>Adding a fun, team-building touch to sprint or roadmap planning.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Can I get the same name twice?</strong> Each batch of 5 avoids exact duplicates within
            that batch, but regenerating can still resurface a name you saw before, since the underlying
            word lists are limited.
          </li>
          <li>
            <strong>Should I use these as public product names?</strong> These are meant as internal
            codenames or working titles. Before using one publicly, check it doesn&apos;t conflict with an
            existing trademark or product name.
          </li>
          <li>
            <strong>How many name styles does it cover?</strong> Three: a single mythological name, a
            color-plus-animal combination, and a Greek letter — each paired with a random prefix like
            &quot;Project&quot; or &quot;Operation&quot;.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/project-name-generator" content={content}>
      <ProjectNameGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default ProjectNameGenerator;
