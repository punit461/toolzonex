'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const FIRST_NAMES = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley", "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores"];
const STREETS = ["Main St", "Oak St", "Pine St", "Maple Ave", "Cedar Ln", "Elm St", "View Rd", "Lake St", "Hill Dr", "Washington Ave", "Park Pkwy", "Sunset Blvd"];
const CITIES = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "San Francisco"];
const STATES = ["NY", "CA", "IL", "TX", "AZ", "PA", "TX", "CA", "TX", "CA", "TX", "FL", "TX", "OH", "CA"];
const DOMAINS = ["example.com", "test.org", "demo.net", "mail.com", "fake.io"];

const RandomDataGeneratorContent = () => {
  const [count, setCount] = useState(5);
  const [data, setData] = useState<string[]>([]);
  const [includeName, setIncludeName] = useState(true);
  const [includeEmail, setIncludeEmail] = useState(true);
  const [includePhone, setIncludePhone] = useState(true);
  const [includeAddress, setIncludeAddress] = useState(true);

  const generateData = () => {
    const amount = Math.min(Math.max(count, 1), 100);
    const results = [];

    for (let i = 0; i < amount; i++) {
      const fName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const lName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      
      let entry = [];
      if (includeName) {
        entry.push(`Name: ${fName} ${lName}`);
      }
      if (includeEmail) {
        const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
        const num = Math.floor(Math.random() * 999);
        entry.push(`Email: ${fName.toLowerCase()}.${lName.toLowerCase()}${num}@${domain}`);
      }
      if (includePhone) {
        const p1 = Math.floor(Math.random() * 800) + 200;
        const p2 = Math.floor(Math.random() * 900) + 100;
        const p3 = Math.floor(Math.random() * 9000) + 1000;
        entry.push(`Phone: (${p1}) ${p2}-${p3}`);
      }
      if (includeAddress) {
        const streetNum = Math.floor(Math.random() * 9999) + 1;
        const street = STREETS[Math.floor(Math.random() * STREETS.length)];
        const cityIdx = Math.floor(Math.random() * CITIES.length);
        const zip = Math.floor(Math.random() * 90000) + 10000;
        entry.push(`Address: ${streetNum} ${street}, ${CITIES[cityIdx]}, ${STATES[cityIdx]} ${zip}`);
      }

      if (entry.length > 0) {
        results.push(entry.join(' | '));
      } else {
        results.push("Please select at least one field to generate.");
        break;
      }
    }

    setData(results);
  };

  const copyData = async () => {
    try {
      await navigator.clipboard.writeText(data.join('\n'));
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Number of Profiles"
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{ inputProps: { min: 1, max: 100 } }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <FormControlLabel control={<Checkbox checked={includeName} onChange={(e) => setIncludeName(e.target.checked)} />} label="Include Name" />
          <FormControlLabel control={<Checkbox checked={includeEmail} onChange={(e) => setIncludeEmail(e.target.checked)} />} label="Include Email" />
          <FormControlLabel control={<Checkbox checked={includePhone} onChange={(e) => setIncludePhone(e.target.checked)} />} label="Include Phone Number" />
          <FormControlLabel control={<Checkbox checked={includeAddress} onChange={(e) => setIncludeAddress(e.target.checked)} />} label="Include Address" />
        </Box>

        <Button variant="contained" onClick={generateData} fullWidth size="large" startIcon={<RefreshIcon />}>
          Generate Data
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Generated Profiles:</Typography>
          {data.length > 0 && (
             <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyData}>
               Copy All
             </Button>
          )}
        </Box>
        
        <TextField
          value={data.join('\n')}
          multiline
          rows={14}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Generated mock data will appear here..."
        />
      </Box>
    </Box>
  );
};

const RandomDataGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">What is a Random Data Generator?</Typography>
      <Typography variant="body1">
        A random data generator creates realistic, synthetic profiles including mock names, addresses, emails, and phone numbers. This fake data is extremely useful for developers and QA engineers who need to test web forms, populate demo databases, or design UI layouts without risking real user privacy.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Random Data Generator"
      description="Generate fake names, addresses, emails, and phone numbers for testing and mockups. Free online mock data generator."
      url="/tools/random-data-generator"
      content={content}
      category="Tools"
    >
      <RandomDataGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomDataGenerator;
