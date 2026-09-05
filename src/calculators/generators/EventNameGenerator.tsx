'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'Conference' | 'Party' | 'Fundraiser' | 'Workshop';

const CATEGORIES: Category[] = ['Conference', 'Party', 'Fundraiser', 'Workshop'];

const ADJECTIVES: Record<Category, string[]> = {
  Conference: ['Visionary', 'Forward', 'Elevate', 'Catalyst', 'Horizon', 'Momentum', 'Nexus', 'Ascend', 'Summit', 'Convergence'],
  Party: ['Glow', 'Neon', 'Midnight', 'Velvet', 'Sparkle', 'Electric', 'Wild', 'Golden', 'Rooftop', 'Starlit'],
  Fundraiser: ['Hope', 'Rise', 'Giving', 'Bright', 'United', 'Harvest', 'Legacy', 'Kindness', 'Radiant', 'Together'],
  Workshop: ['Hands-On', 'Deep Dive', 'Build', 'Craft', 'Foundations', 'Masterclass', 'Bootcamp', 'Practical', 'Skillset', 'Blueprint'],
};

const NOUNS: Record<Category, string[]> = {
  Conference: ['Summit', 'Forum', 'Symposium', 'Assembly', 'Conference', 'Convention', 'Roundtable', 'Congress'],
  Party: ['Bash', 'Soiree', 'Night', 'Celebration', 'Gathering', 'Affair', 'Fiesta', 'Mixer'],
  Fundraiser: ['Gala', 'Drive', 'Benefit', 'Campaign', 'Auction', 'Appeal', 'Fund Drive', 'Dinner'],
  Workshop: ['Workshop', 'Lab', 'Session', 'Clinic', 'Intensive', 'Studio', 'Training Day', 'Sprint'],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOne(category: Category): string {
  return `${pick(ADJECTIVES[category])} ${pick(NOUNS[category])}`;
}

function generateSet(category: Category, count: number): string[] {
  const results = new Set<string>();
  let attempts = 0;
  while (results.size < count && attempts < count * 20) {
    results.add(generateOne(category));
    attempts++;
  }
  return Array.from(results);
}

const EventNameGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('Conference');
  const [names, setNames] = useState<string[]>([]);

  const generate = () => setNames(generateSet(category, 5));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5, textAlign: 'center' }}>
          Event Type
        </Typography>
        <ToggleButtonGroup
          exclusive
          value={category}
          onChange={(_, val) => {
            if (val) {
              setCategory(val);
              setNames([]);
            }
          }}
        >
          {CATEGORIES.map((c) => (
            <ToggleButton key={c} value={c} sx={{ textTransform: 'none' }}>
              {c}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<CelebrationIcon />} onClick={generate}>
        {names.length === 0 ? 'Generate Event Names' : 'Regenerate'}
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

const EventNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Event Name Generator</Typography>
      <Typography variant="body1">
        Choose an event type — Conference, Party, Fundraiser, or Workshop — and click &quot;Generate Event
        Names&quot; for 5 title suggestions. Each name combines an adjective or theme word with a noun,
        both hand-picked to fit the tone of that event type, from formal conference titles to playful party
        names.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing Conference might suggest &quot;Visionary Summit&quot; or &quot;Catalyst Forum&quot;, while
        choosing Party might suggest &quot;Neon Bash&quot; or &quot;Midnight Soiree&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Brainstorming a title for an upcoming conference, meetup, or summit.</li>
          <li>Finding a catchy name for a birthday party, office party, or social gathering.</li>
          <li>Naming a charity gala, fundraising drive, or benefit dinner.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Can I mix words from two different event types?</strong> Not automatically — each name
            is built from that category&apos;s own adjective and noun lists to keep the tone consistent, but
            you&apos;re free to mix and match words from different generated names by hand.
          </li>
          <li>
            <strong>How many names can I generate at once?</strong> Each click produces 5 unique
            suggestions for the selected event type. Click &quot;Regenerate&quot; as many times as you like
            for more options.
          </li>
          <li>
            <strong>Should I check the name isn&apos;t already used elsewhere?</strong> Yes — a quick web
            search for your favorite suggestion is a good idea before printing invitations, banners, or
            marketing materials.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/event-name-generator" content={content}>
      <EventNameGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default EventNameGenerator;
