'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PREFIXES = [
  'Zy', 'Ka', 'Vi', 'El', 'Nu', 'Re', 'So', 'Ty', 'Ax', 'Ox',
  'Flu', 'Bri', 'Clo', 'Dri', 'Sna', 'Voo', 'Zap', 'Qui', 'Jux', 'Plo',
];
const SUFFIXES = [
  'ify', 'lio', 'ara', 'zen', 'ora', 'ica', 'ium', 'ova', 'ium', 'eon',
  'ify', 'ance', 'ique', 'eria', 'opia', 'nets', 'byte', 'lyze', 'sync', 'hub',
];
const CONNECTORS = ['', ' ', '-', '.', ''];

function generateBrandNames(keywords: string): string[] {
  const words = keywords.trim().split(/\s+/).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  const base = words.join('');
  const results: string[] = [];

  // Prefix + Keyword
  for (let i = 0; i < 5; i++) {
    const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    results.push(p + base);
  }

  // Keyword + Suffix
  for (let i = 0; i < 5; i++) {
    const s = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    results.push(base + s);
  }

  // Split keywords with connectors
  for (let i = 0; i < 5; i++) {
    const conn = CONNECTORS[Math.floor(Math.random() * CONNECTORS.length)];
    const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    const s = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    if (words.length > 1) {
      results.push(words[0] + conn + words.slice(1).join(''));
    }
    results.push(p + words[0] + s);
  }

  // Truncated blends
  for (let i = 0; i < 5; i++) {
    const half1 = base.slice(0, Math.ceil(base.length * 0.6));
    const half2 = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    results.push(half1 + half2);
  }

  return [...new Set(results)].slice(0, 20);
}

const BrandNameGeneratorContent = () => {
  const [keywords, setKeywords] = useState('');
  const [names, setNames] = useState<string[]>([]);

  const handleGenerate = () => {
    const input = keywords.trim();
    if (!input) return;
    setNames(generateBrandNames(input));
  };

  const copyName = async (name: string) => {
    await navigator.clipboard.writeText(name);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Enter keywords describing your business"
        placeholder="e.g. Fitness Coffee Sustainable"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        fullWidth
        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
      />
      <Button variant="contained" onClick={handleGenerate} fullWidth size="large">
        Generate Brand Names
      </Button>

      {names.length > 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 1.5 }}>
          {names.map((name, idx) => (
            <Paper
              key={idx}
              variant="outlined"
              sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', '&:hover': { bgcolor: 'grey.50' } }}
              onClick={() => copyName(name)}
            >
              <Typography variant="body1" fontWeight="500">{name}</Typography>
              <IconButton size="small"><ContentCopyIcon fontSize="small" /></IconButton>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

const BrandNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Brand Name Generator</Typography>
      <Typography variant="body1">
        Enter a few keywords that describe your business and get 20 unique brand name ideas instantly. The generator blends your keywords with catchy prefixes, suffixes, and truncated forms to create memorable, brandable names.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type one to three keywords into the input field (e.g. &quot;fitness coffee sustainable&quot;) and click Generate. The tool produces 20 name suggestions in a grid — click any name to copy it to your clipboard.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;fitness coffee&quot; might generate names like <strong>Zyfit咖啡e</strong>, <strong>Coffeeify</strong>, <strong>KaCoffee</strong>, or <strong>Fitnessync</strong> — a blend of prefixes and suffixes fused with your keywords.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Brainstorming startup or side-project names from a concept.</li>
          <li>Generating catchy product names for a new line.</li>
          <li>Overcoming creative blocks when naming a brand or app.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these names unique or trademarked?</Typography>
      <Typography variant="body1">
        These are AI-free suggestions generated algorithmically. Always check trademark databases (like USPTO) and domain availability before committing to any name.
      </Typography>
      <Typography variant="h3">How many keywords should I enter?</Typography>
      <Typography variant="body1">
        One to three words work best. The generator blends and truncates your input, so shorter keywords tend to produce cleaner, more brandable results.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/brand-name-generator" content={content}>
      <BrandNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BrandNameGenerator;
