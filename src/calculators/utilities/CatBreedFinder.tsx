'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Size = 'Small' | 'Medium' | 'Large';

interface Breed {
  name: string;
  size: Size;
  lifespan: string;
  temperament: string;
  coat: string;
}

const BREEDS: Breed[] = [
  { name: 'Domestic Shorthair', size: 'Medium', lifespan: '12-18 yrs', temperament: 'Adaptable, easygoing, varied', coat: 'Short' },
  { name: 'Persian', size: 'Medium', lifespan: '10-17 yrs', temperament: 'Calm, sweet, gentle', coat: 'Long' },
  { name: 'Maine Coon', size: 'Large', lifespan: '12-15 yrs', temperament: 'Gentle, friendly, playful', coat: 'Long, shaggy' },
  { name: 'Ragdoll', size: 'Large', lifespan: '12-17 yrs', temperament: 'Docile, affectionate, relaxed', coat: 'Semi-long, silky' },
  { name: 'British Shorthair', size: 'Medium', lifespan: '12-17 yrs', temperament: 'Calm, easygoing, loyal', coat: 'Short, dense' },
  { name: 'Siamese', size: 'Medium', lifespan: '12-15 yrs', temperament: 'Vocal, social, intelligent', coat: 'Short' },
  { name: 'Abyssinian', size: 'Medium', lifespan: '9-15 yrs', temperament: 'Active, curious, playful', coat: 'Short, ticked' },
  { name: 'Sphynx', size: 'Medium', lifespan: '8-14 yrs', temperament: 'Energetic, affectionate, mischievous', coat: 'Hairless' },
  { name: 'Bengal', size: 'Medium', lifespan: '12-16 yrs', temperament: 'Energetic, athletic, bold', coat: 'Short, spotted' },
  { name: 'Scottish Fold', size: 'Medium', lifespan: '11-14 yrs', temperament: 'Sweet, calm, adaptable', coat: 'Short or long' },
  { name: 'American Shorthair', size: 'Medium', lifespan: '15-20 yrs', temperament: 'Easygoing, adaptable, gentle', coat: 'Short, dense' },
  { name: 'Devon Rex', size: 'Small', lifespan: '9-15 yrs', temperament: 'Playful, mischievous, social', coat: 'Short, curly' },
  { name: 'Cornish Rex', size: 'Small', lifespan: '11-15 yrs', temperament: 'Active, affectionate, curious', coat: 'Short, curly' },
  { name: 'Oriental Shorthair', size: 'Medium', lifespan: '10-15 yrs', temperament: 'Vocal, social, intelligent', coat: 'Short' },
  { name: 'Russian Blue', size: 'Medium', lifespan: '15-20 yrs', temperament: 'Gentle, shy with strangers, loyal', coat: 'Short, dense' },
  { name: 'Norwegian Forest Cat', size: 'Large', lifespan: '14-16 yrs', temperament: 'Friendly, independent, gentle', coat: 'Long, water-resistant' },
  { name: 'Exotic Shorthair', size: 'Medium', lifespan: '12-15 yrs', temperament: 'Calm, sweet, quiet', coat: 'Short, plush' },
  { name: 'Turkish Angora', size: 'Medium', lifespan: '12-18 yrs', temperament: 'Playful, intelligent, affectionate', coat: 'Long, silky' },
  { name: 'Manx', size: 'Medium', lifespan: '9-13 yrs', temperament: 'Playful, loyal, social', coat: 'Short or long' },
  { name: 'Burmese', size: 'Medium', lifespan: '10-17 yrs', temperament: 'Affectionate, playful, sociable', coat: 'Short, glossy' },
  { name: 'Tonkinese', size: 'Medium', lifespan: '12-16 yrs', temperament: 'Social, playful, vocal', coat: 'Short' },
  { name: 'Himalayan', size: 'Medium', lifespan: '9-15 yrs', temperament: 'Gentle, calm, affectionate', coat: 'Long' },
  { name: 'Birman', size: 'Medium', lifespan: '12-16 yrs', temperament: 'Gentle, sociable, calm', coat: 'Semi-long, silky' },
  { name: 'American Curl', size: 'Medium', lifespan: '12-16 yrs', temperament: 'Affectionate, playful, curious', coat: 'Short or long' },
  { name: 'Egyptian Mau', size: 'Medium', lifespan: '12-15 yrs', temperament: 'Athletic, loyal, alert', coat: 'Short, spotted' },
  { name: 'Somali', size: 'Medium', lifespan: '11-16 yrs', temperament: 'Active, playful, intelligent', coat: 'Semi-long, ticked' },
  { name: 'Balinese', size: 'Medium', lifespan: '10-15 yrs', temperament: 'Vocal, social, intelligent', coat: 'Semi-long, silky' },
  { name: 'Chartreux', size: 'Medium', lifespan: '12-15 yrs', temperament: 'Quiet, calm, affectionate', coat: 'Short, woolly' },
  { name: 'Selkirk Rex', size: 'Medium', lifespan: '10-15 yrs', temperament: 'Patient, calm, affectionate', coat: 'Short or long, curly' },
  { name: 'LaPerm', size: 'Medium', lifespan: '10-15 yrs', temperament: 'Affectionate, playful, gentle', coat: 'Short or long, curly' },
  { name: 'Ocicat', size: 'Medium', lifespan: '12-18 yrs', temperament: 'Confident, social, active', coat: 'Short, spotted' },
  { name: 'Singapura', size: 'Small', lifespan: '9-15 yrs', temperament: 'Curious, playful, affectionate', coat: 'Short, fine' },
  { name: 'Japanese Bobtail', size: 'Medium', lifespan: '9-15 yrs', temperament: 'Active, social, intelligent', coat: 'Short or long' },
  { name: 'Munchkin', size: 'Small', lifespan: '12-15 yrs', temperament: 'Playful, extroverted, sociable', coat: 'Short or long' },
  { name: 'Ragamuffin', size: 'Large', lifespan: '12-16 yrs', temperament: 'Docile, affectionate, calm', coat: 'Semi-long, silky' },
  { name: 'Siberian', size: 'Large', lifespan: '12-15 yrs', temperament: 'Playful, affectionate, agile', coat: 'Long, water-resistant' },
  { name: 'Cymric', size: 'Medium', lifespan: '9-13 yrs', temperament: 'Gentle, playful, loyal', coat: 'Long' },
  { name: 'Havana Brown', size: 'Medium', lifespan: '10-15 yrs', temperament: 'Curious, affectionate, social', coat: 'Short, glossy' },
  { name: 'Korat', size: 'Small', lifespan: '15-20 yrs', temperament: 'Loyal, intelligent, reserved with strangers', coat: 'Short, close-lying' },
  { name: 'Nebelung', size: 'Medium', lifespan: '15-18 yrs', temperament: 'Gentle, shy with strangers, devoted', coat: 'Semi-long, silky' },
  { name: 'Turkish Van', size: 'Large', lifespan: '12-17 yrs', temperament: 'Energetic, intelligent, water-loving', coat: 'Semi-long, water-resistant' },
  { name: 'American Bobtail', size: 'Medium', lifespan: '11-15 yrs', temperament: 'Intelligent, playful, social', coat: 'Short or long' },
  { name: 'Colorpoint Shorthair', size: 'Medium', lifespan: '12-16 yrs', temperament: 'Vocal, social, energetic', coat: 'Short' },
  { name: 'Snowshoe', size: 'Medium', lifespan: '12-15 yrs', temperament: 'Affectionate, social, intelligent', coat: 'Short' },
];

const SIZE_COLORS: Record<Size, 'default' | 'primary' | 'secondary'> = {
  Small: 'secondary',
  Medium: 'primary',
  Large: 'default',
};

const CatBreedFinderContent = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BREEDS;
    return BREEDS.filter((b) => b.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <Box>
      <TextField
        label="Search Cat Breeds"
        placeholder="e.g. Persian, Sphynx, Maine Coon"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3, maxWidth: 480 }}
      />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filtered.length} of {BREEDS.length} breeds
      </Typography>

      <Stack spacing={2}>
        {filtered.map((b) => (
          <Paper key={b.name} variant="outlined" sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <Typography variant="h6" fontWeight={700}>{b.name}</Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={b.size} size="small" color={SIZE_COLORS[b.size]} />
                <Chip label={b.coat} size="small" variant="outlined" />
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Lifespan: {b.lifespan}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>{b.temperament}</Typography>
          </Paper>
        ))}
        {filtered.length === 0 && (
          <Typography color="text.secondary">No breeds match your search.</Typography>
        )}
      </Stack>
    </Box>
  );
};

const CatBreedFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Cat Breed Finder</Typography>
      <Typography variant="body1">
        Type a breed name into the search box to filter a hand-compiled list of over 40 common cat breeds.
        Each entry shows the breed&apos;s size category, typical lifespan, general temperament, and coat
        type, so you can quickly compare breeds at a glance.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;sphynx&quot; shows the Sphynx: a Medium-sized breed with a typical lifespan of 8-14
        years, an energetic and affectionate temperament, and a distinctive hairless coat.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing breeds by coat type and temperament before adopting a cat.</li>
          <li>Quickly checking a breed&apos;s typical lifespan and general personality.</li>
          <li>Researching low-shedding or hypoallergenic-leaning coat types for allergy concerns.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Are these facts guaranteed for every individual cat?</strong> No — these are general,
            typical figures for each breed. Individual cats can vary in temperament, coat, and health
            regardless of breed, and mixed-breed cats may not follow these patterns at all.
          </li>
          <li>
            <strong>Does this include every recognized cat breed?</strong> No — this tool covers over 40 of
            the most common and widely recognized breeds rather than every breed registered by cat fancier
            associations worldwide.
          </li>
          <li>
            <strong>Is any coat type truly hypoallergenic?</strong> No cat breed is completely
            hypoallergenic — allergens come mainly from a protein in saliva and skin, not just fur — but some
            people find certain coat types easier to tolerate than others.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cat-breed-finder" content={content}>
      <CatBreedFinderContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default CatBreedFinder;
