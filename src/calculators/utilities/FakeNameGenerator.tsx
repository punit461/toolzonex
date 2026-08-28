'use client';

import { useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, Stack, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WcIcon from '@mui/icons-material/Wc';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MALE_FIRST_NAMES = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Daniel', 'Matthew', 'Anthony', 'Mark', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kevin', 'Brian',
  'George', 'Timothy', 'Ronald', 'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Nicholas', 'Eric', 'Jonathan',
  'Patrick', 'Sean', 'Benjamin', 'Samuel', 'Raymond', ' Gregory', 'Frank', 'Alexander', 'Jack', 'Dennis',
  'Jerry', 'Tyler', 'Aaron', 'Jose', 'Nathan', 'Henry', 'Douglas', 'Peter', 'Adam', 'Zachary',
];

const FEMALE_FIRST_NAMES = [
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Dorothy', 'Kimberly', 'Emily', 'Donna',
  'Michelle', 'Carol', 'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura', 'Cynthia',
  'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela', 'Emma', 'Nicole', 'Helen',
  'Samantha', 'Katherine', 'Christine', 'Debra', 'Rachel', 'Carolyn', 'Janet', 'Catherine', 'Maria', 'Heather',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
];

const CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
  'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'Indianapolis',
  'San Francisco', 'Seattle', 'Denver', 'Washington', 'Nashville', 'Oklahoma City', 'El Paso', 'Boston',
  'Portland', 'Las Vegas', 'Memphis', 'Louisville', 'Baltimore', 'Milwaukee',
];

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const STREET_NAMES = [
  'Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Ave', 'Cedar Ln', 'Walnut St', 'First Ave',
  'Second St', 'Park Ave', 'Lake Dr', 'Hill Rd', 'Spring St', 'Forest Ave', 'River Rd', 'Church St',
  'High St', 'Union Ave', 'Center St', 'Broadway',
];

const DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface FakeIdentity {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
}

function generateIdentity(): FakeIdentity {
  const isMale = Math.random() > 0.5;
  const firstName = isMale ? pick(MALE_FIRST_NAMES) : pick(FEMALE_FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const age = randomInt(18, 65);
  const streetNum = randomInt(1, 9999);
  const street = pick(STREET_NAMES);
  const city = pick(CITIES);
  const state = pick(STATES);
  const zip = String(randomInt(10000, 99999));
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${pick(DOMAINS)}`;
  const phone = `${randomInt(200, 999)}-${randomInt(100, 999)}-${randomInt(1000, 9999)}`;

  return {
    firstName,
    lastName,
    gender: isMale ? 'Male' : 'Female',
    age,
    streetAddress: `${streetNum} ${street}`,
    city,
    state,
    zip,
    email,
    phone,
  };
}

const FakeNameGenerator = () => {
  const [identity, setIdentity] = useState<FakeIdentity | null>(null);

  const handleGenerate = useCallback(() => {
    setIdentity(generateIdentity());
  }, []);

  const content = (
    <>
      <Typography variant="h2">How Does the Fake Name Generator Work?</Typography>
      <Typography variant="body1">
        This tool creates random, fictional identities by combining first names, last names, and location
        data from curated lists. Each click generates a completely new identity with a name, age, gender,
        address, email, and phone number — all randomly assembled and not tied to any real person.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking "Generate" might produce "Michael Johnson, Male, Age 34, 1234 Oak Ave, Dallas, TX 75201,
        michael.johnson@gmail.com, 555-123-4567". Each result is unique.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Populating test databases or demo applications with realistic-looking sample data.</li>
          <li>Prototyping forms and user interfaces that need placeholder identity fields.</li>
          <li>Testing email or phone validation logic with a variety of formatted values.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these real people?</Typography>
      <Typography variant="body1">
        No — every identity is randomly generated from lists of common names and locations. None of the
        generated information corresponds to a real individual.
      </Typography>
      <Typography variant="h3">Can I generate multiple identities at once?</Typography>
      <Typography variant="body1">
        Click the "Generate" button repeatedly to create as many identities as you need. Each click
        produces a fresh, independent result.
      </Typography>
      <Typography variant="h3">Is the data statistically realistic?</Typography>
      <Typography variant="body1">
        The names are drawn from the most common American names, cities and states are real US locations,
        and zip codes are random 5-digit numbers. While the combinations are fictional, they are designed
        to look and feel realistic.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fake-name-generator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" size="large" onClick={handleGenerate} sx={{ px: 6, py: 1.5 }}>
            Generate Random Identity
          </Button>
        </Box>

        {identity && (
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Name</Typography>
                    <Typography variant="h6">{identity.firstName} {identity.lastName}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WcIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Gender</Typography>
                    <Typography variant="h6">{identity.gender}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CakeIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">Age</Typography>
                    <Typography variant="h6">{identity.age}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <HomeIcon color="primary" sx={{ mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">Address</Typography>
                  <Typography variant="body1">{identity.streetAddress}</Typography>
                  <Typography variant="body1">{identity.city}, {identity.state} {identity.zip}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Email</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{identity.email}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{identity.phone}</Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        )}

        {!identity && (
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover' }}>
            <Typography variant="body1" color="text.secondary">
              Click the button above to generate a random fictional identity.
            </Typography>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FakeNameGenerator;
