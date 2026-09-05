'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Size = 'Small' | 'Medium' | 'Large' | 'Giant';
type Energy = 'Low' | 'Medium' | 'High';

interface Breed {
  name: string;
  size: Size;
  weight: string;
  lifespan: string;
  temperament: string;
  energy: Energy;
}

const BREEDS: Breed[] = [
  { name: 'Labrador Retriever', size: 'Large', weight: '55-80 lb', lifespan: '10-12 yrs', temperament: 'Friendly, outgoing, eager to please', energy: 'High' },
  { name: 'French Bulldog', size: 'Small', weight: '16-28 lb', lifespan: '10-14 yrs', temperament: 'Affectionate, playful, easygoing', energy: 'Low' },
  { name: 'Golden Retriever', size: 'Large', weight: '55-75 lb', lifespan: '10-12 yrs', temperament: 'Gentle, intelligent, friendly', energy: 'High' },
  { name: 'German Shepherd', size: 'Large', weight: '50-90 lb', lifespan: '9-13 yrs', temperament: 'Confident, loyal, courageous', energy: 'High' },
  { name: 'Poodle (Standard)', size: 'Large', weight: '45-70 lb', lifespan: '10-13 yrs', temperament: 'Intelligent, active, proud', energy: 'High' },
  { name: 'Poodle (Miniature)', size: 'Small', weight: '10-15 lb', lifespan: '12-15 yrs', temperament: 'Intelligent, alert, playful', energy: 'Medium' },
  { name: 'Bulldog', size: 'Medium', weight: '40-50 lb', lifespan: '8-10 yrs', temperament: 'Calm, courageous, friendly', energy: 'Low' },
  { name: 'Rottweiler', size: 'Large', weight: '80-135 lb', lifespan: '9-10 yrs', temperament: 'Loyal, confident, protective', energy: 'Medium' },
  { name: 'Beagle', size: 'Small', weight: '20-30 lb', lifespan: '10-15 yrs', temperament: 'Curious, friendly, merry', energy: 'High' },
  { name: 'Dachshund', size: 'Small', weight: '16-32 lb', lifespan: '12-16 yrs', temperament: 'Clever, stubborn, devoted', energy: 'Medium' },
  { name: 'German Shorthaired Pointer', size: 'Large', weight: '45-70 lb', lifespan: '10-12 yrs', temperament: 'Energetic, friendly, smart', energy: 'High' },
  { name: 'Pembroke Welsh Corgi', size: 'Small', weight: '24-30 lb', lifespan: '12-13 yrs', temperament: 'Alert, affectionate, smart', energy: 'Medium' },
  { name: 'Australian Shepherd', size: 'Medium', weight: '40-65 lb', lifespan: '12-15 yrs', temperament: 'Smart, work-driven, energetic', energy: 'High' },
  { name: 'Yorkshire Terrier', size: 'Small', weight: '4-7 lb', lifespan: '11-15 yrs', temperament: 'Affectionate, sprightly, bold', energy: 'Medium' },
  { name: 'Cavalier King Charles Spaniel', size: 'Small', weight: '13-18 lb', lifespan: '12-15 yrs', temperament: 'Gentle, affectionate, graceful', energy: 'Medium' },
  { name: 'Boxer', size: 'Large', weight: '50-80 lb', lifespan: '10-12 yrs', temperament: 'Fun-loving, bright, active', energy: 'High' },
  { name: 'Great Dane', size: 'Giant', weight: '110-175 lb', lifespan: '8-10 yrs', temperament: 'Friendly, patient, dependable', energy: 'Medium' },
  { name: 'Siberian Husky', size: 'Medium', weight: '35-60 lb', lifespan: '12-14 yrs', temperament: 'Outgoing, mischievous, loyal', energy: 'High' },
  { name: 'Doberman Pinscher', size: 'Large', weight: '60-100 lb', lifespan: '10-13 yrs', temperament: 'Loyal, fearless, alert', energy: 'High' },
  { name: 'Miniature Schnauzer', size: 'Small', weight: '11-20 lb', lifespan: '12-15 yrs', temperament: 'Friendly, obedient, smart', energy: 'Medium' },
  { name: 'Shih Tzu', size: 'Small', weight: '9-16 lb', lifespan: '10-16 yrs', temperament: 'Affectionate, playful, outgoing', energy: 'Low' },
  { name: 'Boston Terrier', size: 'Small', weight: '12-25 lb', lifespan: '11-13 yrs', temperament: 'Friendly, lively, amusing', energy: 'Medium' },
  { name: 'Bernese Mountain Dog', size: 'Giant', weight: '70-115 lb', lifespan: '7-10 yrs', temperament: 'Good-natured, calm, strong', energy: 'Medium' },
  { name: 'Pomeranian', size: 'Small', weight: '3-7 lb', lifespan: '12-16 yrs', temperament: 'Lively, bold, inquisitive', energy: 'Medium' },
  { name: 'Havanese', size: 'Small', weight: '7-13 lb', lifespan: '14-16 yrs', temperament: 'Intelligent, outgoing, funny', energy: 'Medium' },
  { name: 'Shetland Sheepdog', size: 'Small', weight: '15-25 lb', lifespan: '12-14 yrs', temperament: 'Playful, energetic, bright', energy: 'High' },
  { name: 'Brittany', size: 'Medium', weight: '30-40 lb', lifespan: '12-14 yrs', temperament: 'Bright, athletic, upbeat', energy: 'High' },
  { name: 'English Springer Spaniel', size: 'Medium', weight: '40-50 lb', lifespan: '12-14 yrs', temperament: 'Friendly, playful, obedient', energy: 'High' },
  { name: 'Cocker Spaniel', size: 'Medium', weight: '20-30 lb', lifespan: '12-15 yrs', temperament: 'Gentle, smart, happy', energy: 'Medium' },
  { name: 'Border Collie', size: 'Medium', weight: '30-45 lb', lifespan: '12-15 yrs', temperament: 'Keen, alert, highly intelligent', energy: 'High' },
  { name: 'Basset Hound', size: 'Medium', weight: '40-65 lb', lifespan: '12-13 yrs', temperament: 'Charming, patient, low-key', energy: 'Low' },
  { name: 'Mastiff', size: 'Giant', weight: '120-230 lb', lifespan: '6-10 yrs', temperament: 'Dignified, good-natured, calm', energy: 'Low' },
  { name: 'Chihuahua', size: 'Small', weight: '2-6 lb', lifespan: '14-16 yrs', temperament: 'Charming, sassy, graceful', energy: 'Medium' },
  { name: 'Vizsla', size: 'Medium', weight: '45-65 lb', lifespan: '12-14 yrs', temperament: 'Affectionate, energetic, gentle', energy: 'High' },
  { name: 'Weimaraner', size: 'Large', weight: '55-90 lb', lifespan: '10-13 yrs', temperament: 'Friendly, fearless, obedient', energy: 'High' },
  { name: 'Newfoundland', size: 'Giant', weight: '100-150 lb', lifespan: '9-10 yrs', temperament: 'Sweet, patient, devoted', energy: 'Low' },
  { name: 'Basenji', size: 'Small', weight: '20-26 lb', lifespan: '13-14 yrs', temperament: 'Independent, smart, poised', energy: 'Medium' },
  { name: 'Akita', size: 'Large', weight: '70-130 lb', lifespan: '10-13 yrs', temperament: 'Courageous, dignified, profoundly loyal', energy: 'Medium' },
  { name: 'St. Bernard', size: 'Giant', weight: '120-180 lb', lifespan: '8-10 yrs', temperament: 'Playful, charming, inquisitive', energy: 'Low' },
  { name: 'Bloodhound', size: 'Large', weight: '80-110 lb', lifespan: '10-12 yrs', temperament: 'Friendly, independent, inquisitive', energy: 'Medium' },
  { name: 'Bull Terrier', size: 'Medium', weight: '50-70 lb', lifespan: '12-13 yrs', temperament: 'Playful, charming, mischievous', energy: 'High' },
  { name: 'Collie', size: 'Large', weight: '50-75 lb', lifespan: '12-14 yrs', temperament: 'Devoted, graceful, proud', energy: 'Medium' },
  { name: 'Chow Chow', size: 'Medium', weight: '45-70 lb', lifespan: '9-15 yrs', temperament: 'Dignified, bright, serious-minded', energy: 'Low' },
  { name: 'Belgian Malinois', size: 'Large', weight: '40-80 lb', lifespan: '14-16 yrs', temperament: 'Confident, smart, hardworking', energy: 'High' },
  { name: 'Shiba Inu', size: 'Small', weight: '17-23 lb', lifespan: '13-16 yrs', temperament: 'Alert, independent, bold', energy: 'Medium' },
  { name: 'Australian Cattle Dog', size: 'Medium', weight: '35-50 lb', lifespan: '12-16 yrs', temperament: 'Alert, curious, hardworking', energy: 'High' },
  { name: 'Papillon', size: 'Small', weight: '5-10 lb', lifespan: '14-16 yrs', temperament: 'Friendly, alert, happy', energy: 'Medium' },
  { name: 'Maltese', size: 'Small', weight: '4-7 lb', lifespan: '12-15 yrs', temperament: 'Gentle, playful, charming', energy: 'Low' },
  { name: 'West Highland White Terrier', size: 'Small', weight: '15-20 lb', lifespan: '13-15 yrs', temperament: 'Confident, friendly, independent', energy: 'Medium' },
  { name: 'Bichon Frise', size: 'Small', weight: '12-18 lb', lifespan: '14-15 yrs', temperament: 'Playful, curious, peppy', energy: 'Medium' },
  { name: 'Pug', size: 'Small', weight: '14-18 lb', lifespan: '13-15 yrs', temperament: 'Charming, mischievous, loving', energy: 'Low' },
  { name: 'Alaskan Malamute', size: 'Large', weight: '75-85 lb', lifespan: '10-14 yrs', temperament: 'Affectionate, loyal, playful', energy: 'High' },
  { name: 'Irish Setter', size: 'Large', weight: '60-70 lb', lifespan: '12-15 yrs', temperament: 'Outgoing, sweet-natured, active', energy: 'High' },
  { name: 'Whippet', size: 'Medium', weight: '25-40 lb', lifespan: '12-15 yrs', temperament: 'Calm, affectionate, quick', energy: 'Medium' },
  { name: 'Greyhound', size: 'Large', weight: '60-70 lb', lifespan: '10-13 yrs', temperament: 'Gentle, independent, calm indoors', energy: 'Medium' },
  { name: 'Jack Russell Terrier', size: 'Small', weight: '13-17 lb', lifespan: '13-16 yrs', temperament: 'Energetic, fearless, clever', energy: 'High' },
  { name: 'Bull Mastiff', size: 'Giant', weight: '100-130 lb', lifespan: '7-9 yrs', temperament: 'Loyal, calm, protective', energy: 'Low' },
  { name: 'Cane Corso', size: 'Giant', weight: '88-120 lb', lifespan: '9-12 yrs', temperament: 'Affectionate, intelligent, protective', energy: 'Medium' },
  { name: 'Rhodesian Ridgeback', size: 'Large', weight: '70-85 lb', lifespan: '10-12 yrs', temperament: 'Loyal, patient, dignified', energy: 'Medium' },
  { name: 'Samoyed', size: 'Medium', weight: '35-65 lb', lifespan: '12-14 yrs', temperament: 'Friendly, gentle, adaptable', energy: 'High' },
  { name: 'Portuguese Water Dog', size: 'Medium', weight: '35-60 lb', lifespan: '11-13 yrs', temperament: 'Athletic, adventurous, loyal', energy: 'High' },
  { name: 'Old English Sheepdog', size: 'Large', weight: '60-100 lb', lifespan: '10-12 yrs', temperament: 'Adaptable, gentle, smart', energy: 'Medium' },
  { name: 'Airedale Terrier', size: 'Medium', weight: '40-65 lb', lifespan: '11-14 yrs', temperament: 'Friendly, clever, courageous', energy: 'High' },
  { name: 'Lhasa Apso', size: 'Small', weight: '12-18 lb', lifespan: '12-15 yrs', temperament: 'Confident, smart, comical', energy: 'Low' },
  { name: 'American Staffordshire Terrier', size: 'Medium', weight: '40-70 lb', lifespan: '12-16 yrs', temperament: 'Confident, good-natured, smart', energy: 'High' },
  { name: 'Toy Poodle', size: 'Small', weight: '4-6 lb', lifespan: '14-17 yrs', temperament: 'Intelligent, alert, active', energy: 'Medium' },
];

const SIZE_COLORS: Record<Size, 'default' | 'primary' | 'secondary' | 'success'> = {
  Small: 'success',
  Medium: 'primary',
  Large: 'secondary',
  Giant: 'default',
};

const DogBreedFinderContent = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BREEDS;
    return BREEDS.filter((b) => b.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <Box>
      <TextField
        label="Search Dog Breeds"
        placeholder="e.g. Labrador, Corgi, Husky"
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
                <Chip label={`${b.energy} Energy`} size="small" variant="outlined" />
              </Stack>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Weight: {b.weight} &middot; Lifespan: {b.lifespan}
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

const DogBreedFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Dog Breed Finder</Typography>
      <Typography variant="body1">
        Type a breed name into the search box to filter a hand-compiled list of over 60 common dog breeds.
        Each entry shows the breed&apos;s size category, typical weight range, typical lifespan, general
        temperament, and energy level, so you can quickly compare breeds at a glance.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;husky&quot; shows the Siberian Husky: a Medium-sized breed weighing 35-60 lb, with a
        typical lifespan of 12-14 years, an outgoing and loyal temperament, and High energy needs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing breeds by size and energy level before choosing a dog to adopt.</li>
          <li>Quickly checking a breed&apos;s typical lifespan and temperament.</li>
          <li>Researching whether a breed&apos;s energy level fits your lifestyle and living space.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Are these facts guaranteed for every individual dog?</strong> No — these are general,
            typical figures for each breed. Individual dogs can vary in size, temperament, and health
            regardless of breed, and mixed-breed dogs may not follow these ranges at all.
          </li>
          <li>
            <strong>Does this include every recognized dog breed?</strong> No — this tool covers over 60 of
            the most common and widely recognized breeds rather than every breed registered by kennel clubs
            worldwide.
          </li>
          <li>
            <strong>What does &quot;energy level&quot; mean here?</strong> It&apos;s a general indicator of
            how much daily exercise and mental stimulation the breed typically needs — High-energy breeds
            usually need substantial daily activity, while Low-energy breeds are typically content with
            shorter walks and more downtime.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/dog-breed-finder" content={content}>
      <DogBreedFinderContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default DogBreedFinder;
