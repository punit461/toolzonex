'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PREFIXES = ["Nova", "Apex", "Zen", "Pro", "Core", "Aura", "Prime", "Quantum", "Nexus", "Omicron", "Alpha", "Hyper", "Syn", "Eco", "Neo"];
const SUFFIXES = ["ify", "ly", "hub", "sync", "flow", "wave", "craft", "forge", "cast", "grid", "sphere", "labs", "works", "tech", "io"];
const WORDS = ["Global", "Solutions", "Dynamics", "Systems", "Network", "Creative", "Digital", "Logic", "Vision", "Group", "Consulting"];

const BusinessNameGeneratorContent = () => {
  const [keyword, setKeyword] = useState('');
  const [names, setNames] = useState<string[]>([]);

  const generateNames = () => {
    const results = [];
    const base = keyword.trim().toLowerCase();
    const capitalizedBase = base ? base.charAt(0).toUpperCase() + base.slice(1) : '';

    if (!capitalizedBase) {
      // Just random names if no keyword
      for (let i = 0; i < 15; i++) {
        const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
        const s = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
        results.push(`${p}${s}`);
      }
    } else {
      // With keyword
      for (let i = 0; i < 5; i++) {
        const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
        results.push(`${p}${capitalizedBase}`);
      }
      for (let i = 0; i < 5; i++) {
        const s = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
        results.push(`${capitalizedBase}${s}`);
      }
      for (let i = 0; i < 5; i++) {
        const w = WORDS[Math.floor(Math.random() * WORDS.length)];
        results.push(Math.random() > 0.5 ? `${capitalizedBase} ${w}` : `${w} ${capitalizedBase}`);
      }
    }
    
    // Shuffle the results
    setNames(results.sort(() => Math.random() - 0.5));
  };

  const copyName = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Enter a Keyword (Optional)"
          placeholder="e.g. Health, Cloud, Market"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="contained" onClick={generateNames} fullWidth size="large">
          Generate Business Names
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Generated Names:</Typography>
        
        {names.length === 0 ? (
          <Typography color="text.secondary">Click generate to see ideas.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {names.map((n, idx) => (
              <Chip 
                key={idx} 
                label={n} 
                onClick={() => copyName(n)}
                onDelete={() => copyName(n)}
                deleteIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
                sx={{ fontSize: '1rem', py: 2, px: 1 }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const BusinessNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Business Name Generator?</Typography>
      <Typography variant="body1">
        Type a keyword related to your industry or idea (like "Cloud" or "Burger") and hit generate. The tool will instantly combine it with modern tech suffixes, prefixes, and corporate keywords to give you catchy, brandable business name ideas. You can also leave the keyword blank for entirely random abstract names.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Business Name Generator"
      description="Generate catchy and brandable business names, app names, and startup ideas instantly."
      url="/tools/business-name-generator"
      content={content}
      category="Tools"
    >
      <BusinessNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BusinessNameGenerator;
