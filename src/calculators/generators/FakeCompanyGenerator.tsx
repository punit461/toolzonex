'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PREFIXES = [
  'Bright', 'Summit', 'Nexus', 'Vertex', 'Silver Oak', 'Northgate', 'Bluepeak', 'Ironwood',
  'Cascade', 'Horizon', 'Granite', 'Meridian', 'Wildflower', 'Cobalt', 'Redstone', 'Lumina',
  'Anchor', 'Fernwood', 'Crestline', 'Amberly', 'Stonebridge', 'Evergreen', 'Skyline', 'Copperfield',
  'Riverside', 'Beacon', 'Frontier', 'Marble', 'Willowbrook', 'Cobalt Peak',
];

const SUFFIXES = [
  'Inc.', 'LLC', 'Group', 'Solutions', 'Technologies', 'Holdings', 'Partners', 'Co.',
  'Industries', 'Ventures', 'Systems', 'Enterprises', 'Labs', 'Collective',
];

function generateOne(): string {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  return `${prefix} ${suffix}`;
}

function generateFive(): string[] {
  const names = new Set<string>();
  let guard = 0;
  while (names.size < 5 && guard < 50) {
    names.add(generateOne());
    guard++;
  }
  return Array.from(names);
}

const FakeCompanyGeneratorContent = () => {
  const [names, setNames] = useState<string[]>([]);

  const generate = () => setNames(generateFive());

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate 5 Fake Company Names
      </Button>

      {names.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3, maxWidth: 420, width: '100%' }}>
          {names.map((n, i) => (
            <Typography key={i} variant="h6" sx={{ py: 0.5 }}>{n}</Typography>
          ))}
        </Paper>
      )}
    </Box>
  );
};

const FakeCompanyGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Fake Company Generator</Typography>
      <Typography variant="body1">
        Click Generate and this tool randomly combines a prefix word (like &quot;Summit&quot; or
        &quot;Nexus&quot;) with a business suffix (like &quot;Inc.&quot; or &quot;Solutions&quot;) to produce
        5 plausible-sounding, entirely fictional company names — all combined and generated locally in your
        browser from built-in word lists.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Company Name = random(Prefix) + random(Suffix)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking Generate might produce names like &quot;Vertex Solutions&quot;, &quot;Northgate Holdings&quot;,
        and &quot;Silver Oak Group&quot; — five fresh combinations every time.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Filling in placeholder employer or company fields on test forms and mockups.</li>
          <li>Brainstorming a starting point for a real business name before refining it further.</li>
          <li>Populating demo data, slide decks, or sample invoices with realistic-looking company names.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these real companies?</strong> No — every name is a random combination of generic prefix and suffix words chosen purely for how plausible they sound. Any resemblance to a real, existing company is coincidental, and names should not be used to imply an endorsement or affiliation with any real business.</li>
          <li><strong>Can I use a generated name for my actual business?</strong> You're free to use one as inspiration, but always check trademark databases and domain availability before adopting any name for a real company — this tool doesn't check for existing businesses with the same or similar name.</li>
          <li><strong>How many unique combinations are possible?</strong> With roughly 30 prefixes and 14 suffixes, there are several hundred possible combinations, so repeated clicks will occasionally repeat a name, especially after generating many batches.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/fake-company-generator" content={content}>
      <FakeCompanyGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FakeCompanyGenerator;
