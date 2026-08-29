'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Alert, Avatar } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FIRST_NAMES = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie', 'Skyler', 'Drew', 'Reese', 'Quinn', 'Avery'];
const LAST_NAMES = ['Fictus', 'Sampleton', 'Placeholderman', 'Testworth', 'Mockington', 'Demoson', 'Exampleton', 'Fauxbury'];
const STREETS = ['Maple', 'Sunset', 'Cedar', 'Fictional', 'Sample', 'Placeholder', 'Willow', 'Test'];
const CITIES = ['Springvale', 'Rivertown', 'Fictionville', 'Sampleburg', 'Mockingham', 'Demopolis'];
const DOMAINS = ['example.test', 'sample.invalid', 'fictional.example', 'placeholder.test'];
const AVATAR_COLORS = ['#6a1b9a', '#00897b', '#d81b60', '#3949ab', '#f9a825', '#43a047'];

interface FakeProfile {
  name: string;
  age: number;
  email: string;
  street: string;
  city: string;
  zip: string;
  color: string;
}

function generateProfile(): FakeProfile {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const age = Math.floor(Math.random() * 50) + 18;
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  const email = `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`;
  const streetNumber = Math.floor(Math.random() * 9000) + 100;
  const street = `${streetNumber} ${STREETS[Math.floor(Math.random() * STREETS.length)]} St.`;
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const zip = String(Math.floor(Math.random() * 90000) + 10000);
  const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  return { name: `${first} ${last}`, age, email, street, city, zip, color };
}

const FakeProfileGeneratorContent = () => {
  const [profile, setProfile] = useState<FakeProfile | null>(null);

  const generate = () => setProfile(generateProfile());

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Alert severity="warning" sx={{ maxWidth: 480 }}>
        <strong>For testing and mockup purposes only.</strong> Every field below is entirely fictional,
        randomly generated data. It does not represent, describe, or belong to any real person — any
        resemblance to a real name, email, or address is purely coincidental.
      </Alert>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate Fake Profile
      </Button>

      {profile && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 420, width: '100%' }}>
          <Avatar sx={{ width: 72, height: 72, mx: 'auto', mb: 2, bgcolor: profile.color, fontSize: '1.75rem' }}>
            {profile.name.split(' ').map((n) => n[0]).join('')}
          </Avatar>
          <Typography variant="h5" fontWeight={700}>{profile.name}</Typography>
          <Typography variant="body2" color="text.secondary">Age {profile.age} (fictional)</Typography>
          <Box sx={{ textAlign: 'left', mt: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2"><strong>Fictional email:</strong> {profile.email}</Typography>
            <Typography variant="body2"><strong>Fictional address:</strong> {profile.street}, {profile.city}, {profile.zip}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const FakeProfileGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Fake Profile Generator Works</Typography>
      <Typography variant="body1">
        This tool generates an entirely fictional profile — a made-up name, age, email address, and street
        address — for testing forms, mockups, and demos. Nothing generated here refers to, or is derived
        from, any real person. Email domains use reserved placeholder domains (like example.test) that are
        never real, deliverable addresses.
      </Typography>
      <Alert severity="warning" sx={{ my: 2 }}>
        This generator is intended for software testing, UI mockups, and design prototypes only. Every value
        is randomly assembled from generic word lists — it is not real personal information about anyone,
        living or fictional-but-specific, and should not be presented as real data about a person.
      </Alert>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click &quot;Generate Fake Profile&quot; to create a fictional profile.</li>
          <li>Use the name, fictional email, and fictional address to fill out test forms or mockups.</li>
          <li>Click again any time for a new, independently generated fictional profile.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A generated profile might show &quot;Jordan Sampleton, Age 34 (fictional), fictional email
        jordan.sampleton@example.test, fictional address 4821 Cedar St., Rivertown, 30442&quot; — every detail
        randomly assembled and not tied to any real person.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Filling out signup or checkout forms while testing a website or app.</li>
          <li>Populating a design mockup or wireframe with realistic-looking placeholder data.</li>
          <li>Creating sample data for a demo, presentation, or tutorial.</li>
          <li>Testing how a UI displays user profile information without using anyone&apos;s real details.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this real information about a real person?</Typography>
      <Typography variant="body1">
        No. Every name, email, and address is randomly assembled from generic placeholder word lists purely
        for testing and mockup purposes. It does not describe any actual person, and the email domains used
        are reserved placeholder domains that are never real or deliverable.
      </Typography>
      <Typography variant="h3">Can I use this data for anything besides testing?</Typography>
      <Typography variant="body1">
        This tool is built specifically for software testing, UI mockups, and design prototypes. It should not
        be used to impersonate anyone or to misrepresent fictional data as real information about a person.
      </Typography>
      <Typography variant="h3">Will the fictional email actually receive mail?</Typography>
      <Typography variant="body1">
        No — the domains used (like example.test) are reserved placeholder domains set aside specifically so
        they can never be registered or used for real email delivery.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/fake-profile-generator" content={content}>
      <FakeProfileGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FakeProfileGenerator;
