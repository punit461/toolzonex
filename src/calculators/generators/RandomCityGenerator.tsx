'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface City {
  name: string;
  country: string;
}

const CITIES: City[] = [
  { name: 'New York', country: 'United States' },
  { name: 'Los Angeles', country: 'United States' },
  { name: 'Chicago', country: 'United States' },
  { name: 'Toronto', country: 'Canada' },
  { name: 'Vancouver', country: 'Canada' },
  { name: 'Mexico City', country: 'Mexico' },
  { name: 'São Paulo', country: 'Brazil' },
  { name: 'Rio de Janeiro', country: 'Brazil' },
  { name: 'Buenos Aires', country: 'Argentina' },
  { name: 'Lima', country: 'Peru' },
  { name: 'Bogotá', country: 'Colombia' },
  { name: 'London', country: 'United Kingdom' },
  { name: 'Paris', country: 'France' },
  { name: 'Berlin', country: 'Germany' },
  { name: 'Rome', country: 'Italy' },
  { name: 'Madrid', country: 'Spain' },
  { name: 'Barcelona', country: 'Spain' },
  { name: 'Lisbon', country: 'Portugal' },
  { name: 'Amsterdam', country: 'Netherlands' },
  { name: 'Stockholm', country: 'Sweden' },
  { name: 'Oslo', country: 'Norway' },
  { name: 'Vienna', country: 'Austria' },
  { name: 'Prague', country: 'Czech Republic' },
  { name: 'Athens', country: 'Greece' },
  { name: 'Zurich', country: 'Switzerland' },
  { name: 'Dublin', country: 'Ireland' },
  { name: 'Cairo', country: 'Egypt' },
  { name: 'Lagos', country: 'Nigeria' },
  { name: 'Cape Town', country: 'South Africa' },
  { name: 'Nairobi', country: 'Kenya' },
  { name: 'Marrakech', country: 'Morocco' },
  { name: 'Beijing', country: 'China' },
  { name: 'Shanghai', country: 'China' },
  { name: 'Tokyo', country: 'Japan' },
  { name: 'Osaka', country: 'Japan' },
  { name: 'Mumbai', country: 'India' },
  { name: 'Delhi', country: 'India' },
  { name: 'Seoul', country: 'South Korea' },
  { name: 'Bangkok', country: 'Thailand' },
  { name: 'Hanoi', country: 'Vietnam' },
  { name: 'Jakarta', country: 'Indonesia' },
  { name: 'Istanbul', country: 'Turkey' },
  { name: 'Dubai', country: 'United Arab Emirates' },
  { name: 'Singapore', country: 'Singapore' },
  { name: 'Sydney', country: 'Australia' },
  { name: 'Melbourne', country: 'Australia' },
  { name: 'Auckland', country: 'New Zealand' },
];

const RandomCityGeneratorContent = () => {
  const [city, setCity] = useState<City | null>(null);

  const generate = () => {
    setCity(CITIES[Math.floor(Math.random() * CITIES.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<LocationCityIcon />} onClick={generate}>
        Generate Random City
      </Button>

      {city && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', minWidth: 260 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{city.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{city.country}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const RandomCityGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random City Generator Works</Typography>
      <Typography variant="body1">
        This tool picks a random well-known city from a curated worldwide list and shows the city name
        alongside its country. Click the button any time for a new random pick.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click &quot;Generate Random City.&quot;</li>
          <li>A city name and its country appear.</li>
          <li>Click again for another random result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking generate might return &quot;Lisbon — Portugal&quot; one time and &quot;Bangkok —
        Thailand&quot; the next.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a random travel destination idea when you can&apos;t decide where to go.</li>
          <li>Picking a random city for a geography quiz or trivia game.</li>
          <li>Choosing a random setting for a creative writing prompt or story.</li>
          <li>Randomly assigning cities for a classroom or team-building activity.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which cities are included?</Typography>
      <Typography variant="body1">
        The generator draws from a curated list of well-known major cities spanning every populated continent,
        rather than every city in the world.
      </Typography>
      <Typography variant="h3">Can the same city appear twice in a row?</Typography>
      <Typography variant="body1">
        Yes — each click is an independent random pick, so the same city can come up more than once.
      </Typography>
      <Typography variant="h3">Does it show which country the city is in?</Typography>
      <Typography variant="body1">
        Yes — every result shows both the city name and its country underneath.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-city-generator" content={content}>
      <RandomCityGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomCityGenerator;
