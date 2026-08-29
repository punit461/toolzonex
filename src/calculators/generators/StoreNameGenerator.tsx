'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Niche = 'fashion' | 'food' | 'tech' | 'general';

const NICHE_LABELS: Record<Niche, string> = {
  fashion: 'Fashion',
  food: 'Food',
  tech: 'Tech',
  general: 'General',
};

const WORDS_A: Record<Niche, string[]> = {
  fashion: ['Velvet', 'Golden', 'Urban', 'Chic', 'Silk', 'Vintage', 'Blush', 'Noir'],
  food: ['Golden', 'Rustic', 'Savory', 'Fresh', 'Cozy', 'Spice', 'Sunny', 'Hearth'],
  tech: ['Nova', 'Byte', 'Quantum', 'Pixel', 'Circuit', 'Vertex', 'Nexus', 'Logic'],
  general: ['The Corner', 'Bright', 'Modern', 'Prime', 'Everyday', 'Local', 'Trusty', 'Bold'],
};

const WORDS_B: Record<Niche, string[]> = {
  fashion: ['Boutique', 'Threads', 'Closet', 'Atelier', 'Studio', 'Wardrobe', 'Label', 'Collective'],
  food: ['Kitchen', 'Table', 'Pantry', 'Bistro', 'Market', 'Bakery', 'Grill', 'Cafe'],
  tech: ['Labs', 'Works', 'Systems', 'Hub', 'Forge', 'Solutions', 'Studio', 'Depot'],
  general: ['Shop', 'Store', 'Market', 'Outlet', 'Emporium', 'Trading Co.', 'Supply', 'Depot'],
};

function generateStoreName(niche: Niche): string {
  const a = WORDS_A[niche];
  const b = WORDS_B[niche];
  return `${a[Math.floor(Math.random() * a.length)]} ${b[Math.floor(Math.random() * b.length)]}`;
}

const StoreNameGeneratorContent = () => {
  const [niche, setNiche] = useState<Niche>('general');
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    setNames(Array.from({ length: 5 }, () => generateStoreName(niche)));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5 }}>Niche</Typography>
        <ToggleButtonGroup
          exclusive
          value={niche}
          onChange={(_, val) => { if (val) setNiche(val); }}
          sx={{ flexWrap: 'wrap' }}
        >
          {(Object.keys(NICHE_LABELS) as Niche[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>
              {NICHE_LABELS[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Generate Store Names
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

const StoreNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Store Name Generator Works</Typography>
      <Typography variant="body1">
        Choose a niche — Fashion, Food, Tech, or General — and this tool combines relevant words from curated
        lists to suggest five random store or shop names tailored to that category.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Select the niche that best matches your store.</li>
          <li>Click &quot;Generate Store Names&quot; to see five suggestions.</li>
          <li>Click again for a fresh batch, or switch niches for different word combinations.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With &quot;Food&quot; selected, you might see &quot;Rustic Kitchen&quot; or &quot;Golden Bakery.&quot;
        Switching to &quot;Tech&quot; might give you &quot;Quantum Labs&quot; or &quot;Pixel Forge.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Brainstorming a name for a new retail shop, boutique, or online store.</li>
          <li>Finding inspiration for a restaurant, cafe, or food business name.</li>
          <li>Naming a tech startup, app, or software studio.</li>
          <li>Generating placeholder store names for a mockup, prototype, or class project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these names checked for availability?</Typography>
      <Typography variant="body1">
        No — this tool only generates random word combinations for inspiration. Always check domain
        availability, trademark registries, and business name registries before committing to a name.
      </Typography>
      <Typography variant="h3">Can I combine words from different suggestions?</Typography>
      <Typography variant="body1">
        Yes — feel free to mix the first word from one suggestion with the second word from another if the
        combination works better for your brand.
      </Typography>
      <Typography variant="h3">Can I generate names for a niche not listed?</Typography>
      <Typography variant="body1">
        Try the &quot;General&quot; niche for broadly applicable names, or use one of the specific niches as a
        starting point and adapt the result to your exact business.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/store-name-generator" content={content}>
      <StoreNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StoreNameGenerator;
