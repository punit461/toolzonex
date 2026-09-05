'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Profession {
  name: string;
  category: string;
}

const PROFESSIONS: Profession[] = [
  { name: 'Doctor', category: 'Medical' },
  { name: 'Nurse', category: 'Medical' },
  { name: 'Surgeon', category: 'Medical' },
  { name: 'Dentist', category: 'Medical' },
  { name: 'Pharmacist', category: 'Medical' },
  { name: 'Paramedic', category: 'Medical' },
  { name: 'Physical Therapist', category: 'Medical' },
  { name: 'Veterinarian', category: 'Medical' },
  { name: 'Radiologist', category: 'Medical' },
  { name: 'Psychiatrist', category: 'Medical' },
  { name: 'Software Engineer', category: 'Tech' },
  { name: 'Data Scientist', category: 'Tech' },
  { name: 'Web Developer', category: 'Tech' },
  { name: 'IT Support Specialist', category: 'Tech' },
  { name: 'Systems Administrator', category: 'Tech' },
  { name: 'Cybersecurity Analyst', category: 'Tech' },
  { name: 'Product Manager', category: 'Tech' },
  { name: 'UX Designer', category: 'Tech' },
  { name: 'Database Administrator', category: 'Tech' },
  { name: 'Machine Learning Engineer', category: 'Tech' },
  { name: 'Graphic Designer', category: 'Creative' },
  { name: 'Photographer', category: 'Creative' },
  { name: 'Illustrator', category: 'Creative' },
  { name: 'Novelist', category: 'Creative' },
  { name: 'Musician', category: 'Creative' },
  { name: 'Film Director', category: 'Creative' },
  { name: 'Animator', category: 'Creative' },
  { name: 'Fashion Designer', category: 'Creative' },
  { name: 'Interior Designer', category: 'Creative' },
  { name: 'Sculptor', category: 'Creative' },
  { name: 'Electrician', category: 'Trades' },
  { name: 'Plumber', category: 'Trades' },
  { name: 'Carpenter', category: 'Trades' },
  { name: 'Welder', category: 'Trades' },
  { name: 'HVAC Technician', category: 'Trades' },
  { name: 'Auto Mechanic', category: 'Trades' },
  { name: 'Mason', category: 'Trades' },
  { name: 'Roofer', category: 'Trades' },
  { name: 'Locksmith', category: 'Trades' },
  { name: 'Machinist', category: 'Trades' },
  { name: 'Teacher', category: 'Education' },
  { name: 'Professor', category: 'Education' },
  { name: 'School Principal', category: 'Education' },
  { name: 'Librarian', category: 'Education' },
  { name: 'Guidance Counselor', category: 'Education' },
  { name: 'Curriculum Developer', category: 'Education' },
  { name: 'Tutor', category: 'Education' },
  { name: 'Accountant', category: 'Business' },
  { name: 'Financial Analyst', category: 'Business' },
  { name: 'Marketing Manager', category: 'Business' },
  { name: 'Sales Representative', category: 'Business' },
  { name: 'Human Resources Manager', category: 'Business' },
  { name: 'Management Consultant', category: 'Business' },
  { name: 'Real Estate Agent', category: 'Business' },
  { name: 'Insurance Underwriter', category: 'Business' },
  { name: 'Entrepreneur', category: 'Business' },
  { name: 'Supply Chain Manager', category: 'Business' },
  { name: 'Biologist', category: 'Science' },
  { name: 'Chemist', category: 'Science' },
  { name: 'Physicist', category: 'Science' },
  { name: 'Astronomer', category: 'Science' },
  { name: 'Geologist', category: 'Science' },
  { name: 'Marine Biologist', category: 'Science' },
  { name: 'Environmental Scientist', category: 'Science' },
  { name: 'Meteorologist', category: 'Science' },
  { name: 'Pilot', category: 'Other' },
  { name: 'Firefighter', category: 'Other' },
  { name: 'Police Officer', category: 'Other' },
  { name: 'Chef', category: 'Other' },
  { name: 'Lawyer', category: 'Other' },
  { name: 'Architect', category: 'Other' },
  { name: 'Farmer', category: 'Other' },
  { name: 'Journalist', category: 'Other' },
  { name: 'Translator', category: 'Other' },
  { name: 'Event Planner', category: 'Other' },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const COUNT = 5;

const RandomProfessionGeneratorContent = () => {
  const [results, setResults] = useState<Profession[]>(() => shuffle(PROFESSIONS).slice(0, COUNT));

  const generate = () => setResults(shuffle(PROFESSIONS).slice(0, COUNT));

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', textAlign: 'center' }}>
      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate} sx={{ mb: 4 }}>
        {results.length ? 'Regenerate' : 'Generate'}
      </Button>

      <Grid container spacing={2}>
        {results.map((p, i) => (
          <Grid item xs={12} sm={6} key={p.name + i}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight={700}>{p.name}</Typography>
              <Typography variant="caption" color="text.secondary">{p.category}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const RandomProfessionGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Random Profession Generator</Typography>
      <Typography variant="body1">
        Click &quot;Generate&quot; to get a fresh set of {COUNT} random professions drawn from a curated list of
        around 75 jobs spanning Medical, Tech, Creative, Trades, Education, Business, Science, and other
        categories. Click &quot;Regenerate&quot; as many times as you like for a new random set.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A single click might produce a set like Surgeon (Medical), Web Developer (Tech), Electrician (Trades),
        Marketing Manager (Business), and Chef (Other) — a different, randomly shuffled mix appears every time.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Brainstorming character occupations for a story, game, or roleplay scenario.</li>
          <li>Picking a random job idea for icebreaker games or classroom activities.</li>
          <li>Generating example job titles for mockups, forms, or design prototypes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can the same profession appear twice in one set?</strong> No — each generated set of {COUNT} professions is drawn without repeats from the full list, so every profession shown in a single click is unique.</li>
          <li><strong>How many professions are in the list?</strong> Around 75, spread across Medical, Tech, Creative, Trades, Education, Business, Science, and a general Other category.</li>
          <li><strong>Is there a way to generate just one profession?</strong> The tool always shows {COUNT} at a time to give you options to choose from, but you can simply focus on the first result if you only need one.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-profession-generator" content={content}>
      <RandomProfessionGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomProfessionGenerator;
