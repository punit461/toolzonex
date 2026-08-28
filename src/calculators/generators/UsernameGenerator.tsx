'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Style = 'cool' | 'cute' | 'professional' | 'gaming';

const PREFIXES: Record<Style, string[]> = {
  cool: ['x', 'the', 'real', 'elite', 'mr', 'official', 'mr'],
  cute: ['little', 'tiny', 'sweet', 'lovely', 'dear', 'baby', 'cute'],
  professional: ['the', 'official', 'real', 'dr', 'mr', 'pro', 'eng'],
  gaming: ['x', 'xx', 'the', 'dark', 'shadow', 'cyber', 'neo'],
};

const SUFFIXES: Record<Style, string[]> = {
  cool: ['007', '42', 'x', 'pro', 'hq', 'v2', 'io'],
  cute: ['bear', 'bunny', 'star', 'boo', 'kins', 'pie', 'ette'],
  professional: ['dev', 'io', 'lab', 'co', 'hub', 'works', 'net'],
  gaming: ['gaming', 'plays', 'yt', 'gg', 'xd', 'tv', 'live'],
};

const SEPARATORS = ['', '_', '.', '-', ''];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function generateUsernames(keyword: string, style: Style, count: number): string[] {
  const results = new Set<string>();
  const base = keyword.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  const prefixes = PREFIXES[style];
  const suffixes = SUFFIXES[style];

  const attempts = count * 10;
  for (let i = 0; i < attempts && results.size < count; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const sep = SEPARATORS[Math.floor(Math.random() * SEPARATORS.length)];
    const num = Math.floor(Math.random() * 900 + 100);
    const variant = Math.random();

    let name = '';
    if (variant < 0.2) name = prefix + sep + base + sep + suffix;
    else if (variant < 0.35) name = base + sep + suffix;
    else if (variant < 0.5) name = prefix + sep + base;
    else if (variant < 0.65) name = base + sep + num;
    else if (variant < 0.8) name = capitalize(base) + suffix;
    else name = base + sep + suffix + sep + num;

    if (name.length >= 3 && name.length <= 25) results.add(name);
  }
  return Array.from(results).slice(0, count);
}

const UsernameGeneratorContent = () => {
  const [keyword, setKeyword] = useState('');
  const [style, setStyle] = useState<Style>('cool');
  const [usernames, setUsernames] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    if (!keyword.trim()) return;
    setUsernames(generateUsernames(keyword, style, 20));
  };

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 700, mx: 'auto' }}>
      <TextField
        label="Enter a keyword or your name"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        fullWidth
        placeholder="e.g. alex"
        onKeyDown={(e) => e.key === 'Enter' && generate()}
      />

      <ToggleButtonGroup
        value={style}
        exclusive
        onChange={(_, v) => v && setStyle(v)}
        fullWidth
      >
        <ToggleButton value="cool">Cool</ToggleButton>
        <ToggleButton value="cute">Cute</ToggleButton>
        <ToggleButton value="professional">Professional</ToggleButton>
        <ToggleButton value="gaming">Gaming</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" size="large" onClick={generate} fullWidth startIcon={<RefreshIcon />} disabled={!keyword.trim()}>
          Generate Usernames
        </Button>
      </Box>

      {usernames.length > 0 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
            {usernames.map((u, idx) => (
              <Paper
                key={u}
                variant="outlined"
                sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'monospace' }}
              >
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.95rem', wordBreak: 'break-all' }}>{u}</Typography>
                <IconButton size="small" onClick={() => handleCopy(u, idx)} title="Copy">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const UsernameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Username Generator — Create Unique Usernames</Typography>
      <Typography variant="body1">
        Generate unique username ideas from any keyword or name. Choose from cool, cute, professional,
        or gaming styles to get 20 suggestions with smart combinations of prefixes, suffixes, separators, and numbers.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Enter a keyword (your name, a hobby, anything) and select a style. Click &quot;Generate Usernames&quot;
        to see 20 unique suggestions. Click the copy icon next to any username to grab it instantly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;alex&quot; with &quot;gaming&quot; style might produce names like <code>dark_alex</code>,
        <code>alexgg42</code>, or <code>neoalex007</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a unique gaming handle or streamer name.</li>
          <li>Choosing a professional username for a new social media account.</li>
          <li>Finding a cute username for a personal blog or Discord server.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these usernames guaranteed to be available?</Typography>
      <Typography variant="body1">
        No — this tool generates creative suggestions, but availability depends on the platform. Check the
        username on your target site after copying.
      </Typography>
      <Typography variant="h3">Can I use multiple keywords?</Typography>
      <Typography variant="body1">
        For best results use a single word or short phrase. Multi-word inputs may be combined in unexpected ways.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/username-generator" content={content}>
      <UsernameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UsernameGenerator;
