'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Avatar, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const AVATAR_COLORS = ['#1976d2', '#9c27b0', '#2e7d32', '#ed6c02', '#d32f2f', '#0288d1'];

function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

const NameInitialsGeneratorContent = () => {
  const [name, setName] = useState('John Michael Doe');

  const { fullInitials, avatarInitials } = useMemo(() => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return { fullInitials: '', avatarInitials: '' };
    const full = words.map((w) => w[0]?.toUpperCase() ?? '').join('');
    const avatar = words.length === 1
      ? (words[0][0]?.toUpperCase() ?? '')
      : (words[0][0]?.toUpperCase() ?? '') + (words[words.length - 1][0]?.toUpperCase() ?? '');
    return { fullInitials: full, avatarInitials: avatar };
  }, [name]);

  const bgColor = colorForName(name || 'default');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          helperText="Enter a first, middle, and/or last name"
        />
      </Box>

      <Stack spacing={3} alignItems="center">
        <Avatar sx={{ width: 96, height: 96, bgcolor: bgColor, fontSize: '2rem', fontWeight: 700 }}>
          {avatarInitials || '?'}
        </Avatar>

        <Paper variant="outlined" sx={{ p: 2, width: '100%', textAlign: 'center' }}>
          <Typography variant="subtitle2" color="text.secondary">Full Initials</Typography>
          <Typography variant="h5" fontWeight={700}>{fullInitials || '—'}</Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2, width: '100%', textAlign: 'center' }}>
          <Typography variant="subtitle2" color="text.secondary">Avatar Initials (2-letter)</Typography>
          <Typography variant="h5" fontWeight={700}>{avatarInitials || '—'}</Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

const NameInitialsGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Name Initials Generator</Typography>
      <Typography variant="body1">
        Type a full name into the text field. The tool splits the name on spaces and generates two versions
        of initials: the full initials, which take the first letter of every word in the name, and a 2-letter
        avatar-style version, which takes only the first letter of the first word and the first letter of the
        last word — the same style used by most profile-picture placeholders and avatar circles.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;John Michael Doe&quot; produces full initials <code>JMD</code> and a 2-letter avatar
        version <code>JD</code> (first letter of &quot;John&quot; plus first letter of &quot;Doe&quot;),
        shown inside a colored circular avatar preview.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a placeholder avatar for a user profile before a photo is uploaded.</li>
          <li>Generating monogram-style initials for stationery, luggage tags, or engravings.</li>
          <li>Quickly getting consistent initials for a team directory or contact list.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens with a single-word name?</strong> If only one word is entered, both the full initials and the avatar initials show just that word&apos;s first letter.</li>
          <li><strong>How are middle names handled in the avatar version?</strong> The 2-letter avatar version only ever uses the first and last words in the name, ignoring any middle names — matching how most apps generate avatar initials.</li>
          <li><strong>Does the avatar color mean anything?</strong> The background color is generated deterministically from the name itself, so the same name always produces the same color, similar to how many apps assign consistent avatar colors per user.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/name-initials-generator" content={content}>
      <NameInitialsGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NameInitialsGenerator;
