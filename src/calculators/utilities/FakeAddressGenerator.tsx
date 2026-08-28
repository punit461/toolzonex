'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const STREET_PREFIXES = [
  'Main', 'Oak', 'Elm', 'Maple', 'Cedar', 'Pine', 'Walnut', 'Chestnut', 'Birch', 'Aspen',
  'Willow', 'Spruce', 'Juniper', 'Palm', 'Sycamore', 'Poplar', 'Magnolia', 'Dogwood',
  'Hickory', 'Cottonwood', 'Cherry', 'Peach', 'Plum', 'Apple', 'Rose', 'Lily', 'Iris',
  'Violet', 'Daisy', 'Sunflower', 'Highland', 'Hillside', 'Ridge', 'Valley', 'Meadow',
  'Brook', 'River', 'Lake', 'Forest', 'Grove', 'Crest', 'Summit', 'Prairie', 'Canyon',
  'Serenity', 'Heritage', 'Freedom', 'Evergreen', 'Crystal', 'Amber',
];

const STREET_TYPES = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Ct', 'Pl', 'Way', 'Rd', 'Ter'];

const CITIES = [
  'Springfield', 'Riverside', 'Franklin', 'Clinton', 'Georgetown', 'Salem', 'Madison',
  'Fairview', 'Manchester', 'Ashland', 'Bristol', 'Burlington', 'Canton', 'Clarksville',
  'Concord', 'Dayton', 'Dover', 'Eden', 'Elmwood', 'Falmouth', 'Glendale', 'Greenville',
  'Hampton', 'Harrison', 'Hudson', 'Jasper', 'Kingston', 'Liberty', 'Lancaster',
  'Milton', 'Monroe', 'Newport', 'Oakdale', 'Oxford', 'Pineville', 'Rockville',
  'Rosewood', 'Shelbyville', 'Trenton', 'Union City',
];

const STATES = [
  ['Alabama', 'AL'], ['Alaska', 'AK'], ['Arizona', 'AZ'], ['Arkansas', 'AR'],
  ['California', 'CA'], ['Colorado', 'CO'], ['Connecticut', 'CT'], ['Delaware', 'DE'],
  ['Florida', 'FL'], ['Georgia', 'GA'], ['Hawaii', 'HI'], ['Idaho', 'ID'],
  ['Illinois', 'IL'], ['Indiana', 'IN'], ['Iowa', 'IA'], ['Kansas', 'KS'],
  ['Kentucky', 'KY'], ['Louisiana', 'LA'], ['Maine', 'ME'], ['Maryland', 'MD'],
  ['Massachusetts', 'MA'], ['Michigan', 'MI'], ['Minnesota', 'MN'], ['Mississippi', 'MS'],
  ['Missouri', 'MO'], ['Montana', 'MT'], ['Nebraska', 'NE'], ['Nevada', 'NV'],
  ['New Hampshire', 'NH'], ['New Jersey', 'NJ'], ['New Mexico', 'NM'], ['New York', 'NY'],
  ['North Carolina', 'NC'], ['North Dakota', 'ND'], ['Ohio', 'OH'], ['Oklahoma', 'OK'],
  ['Oregon', 'OR'], ['Pennsylvania', 'PA'], ['Rhode Island', 'RI'], ['South Carolina', 'SC'],
  ['South Dakota', 'SD'], ['Tennessee', 'TN'], ['Texas', 'TX'], ['Utah', 'UT'],
  ['Vermont', 'VT'], ['Virginia', 'VA'], ['Washington', 'WA'], ['West Virginia', 'WV'],
  ['Wisconsin', 'WI'], ['Wyoming', 'WY'],
];

const rand = (max: number): number => Math.floor(Math.random() * max);

const generateAddress = (): string => {
  const number = rand(9999) + 1;
  const prefix = STREET_PREFIXES[rand(STREET_PREFIXES.length)];
  const type = STREET_TYPES[rand(STREET_TYPES.length)];
  const city = CITIES[rand(CITIES.length)];
  const state = STATES[rand(STATES.length)];
  const zip = String(rand(100000)).padStart(5, '0');

  return `${number} ${prefix} ${type}, ${city}, ${state[1]} ${zip}`;
};

const FakeAddressGenerator = () => {
  const [address, setAddress] = useState<string>(() => generateAddress());

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // clipboard not available
    }
  };

  const content = (
    <>
      <Typography variant="h2">How It Works</Typography>
      <Typography variant="body1">
        Click &quot;Generate&quot; and the tool builds a realistic-sounding random US address from pools of street
        prefixes, street types, cities, states, and zip codes. Each click produces a brand new address.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One request might return <strong>4827 Maple St, Springfield, IL 60214</strong> — a fully fictional address
        that looks plausible but belongs to no real location.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Filling test fixtures and sample records in databases.</li>
          <li>Providing placeholder data in design mockups and demos.</li>
          <li>Testing forms and validation logic without real personal data.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these real addresses?</Typography>
      <Typography variant="body1">
        No — every address is randomly generated and does not correspond to a real residence or business.
      </Typography>
      <Typography variant="h3">Are the zip codes valid?</Typography>
      <Typography variant="body1">
        They are realistic-looking five-digit numbers, but they are randomly assigned and should not be treated as
        accurate postal codes for any real location.
      </Typography>
      <Typography variant="h3">Can I make multiple addresses?</Typography>
      <Typography variant="body1">
        Yes — keep clicking &quot;Generate&quot; and a new random address appears each time.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/fake-address-generator" content={content}>
      <Box>
        <Button variant="contained" size="large" onClick={() => setAddress(generateAddress())}>
          Generate
        </Button>

        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: 4,
            borderRadius: 2,
            border: '1px solid #E5E5E5',
            bgcolor: 'action.hover',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {address}
          </Typography>
          <Button variant="outlined" onClick={copyToClipboard}>
            Copy
          </Button>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FakeAddressGenerator;
