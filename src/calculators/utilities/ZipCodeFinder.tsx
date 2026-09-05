'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface CityZip {
  city: string;
  state: string;
  zip: string;
}

const CITIES: CityZip[] = [
  { city: 'New York', state: 'NY', zip: '10001' },
  { city: 'Los Angeles', state: 'CA', zip: '90001' },
  { city: 'Chicago', state: 'IL', zip: '60601' },
  { city: 'Houston', state: 'TX', zip: '77001' },
  { city: 'Phoenix', state: 'AZ', zip: '85001' },
  { city: 'Philadelphia', state: 'PA', zip: '19102' },
  { city: 'San Antonio', state: 'TX', zip: '78201' },
  { city: 'San Diego', state: 'CA', zip: '92101' },
  { city: 'Dallas', state: 'TX', zip: '75201' },
  { city: 'Austin', state: 'TX', zip: '73301' },
  { city: 'Jacksonville', state: 'FL', zip: '32099' },
  { city: 'Fort Worth', state: 'TX', zip: '76101' },
  { city: 'San Jose', state: 'CA', zip: '95101' },
  { city: 'Columbus', state: 'OH', zip: '43085' },
  { city: 'Charlotte', state: 'NC', zip: '28201' },
  { city: 'Indianapolis', state: 'IN', zip: '46201' },
  { city: 'San Francisco', state: 'CA', zip: '94102' },
  { city: 'Seattle', state: 'WA', zip: '98101' },
  { city: 'Denver', state: 'CO', zip: '80201' },
  { city: 'Oklahoma City', state: 'OK', zip: '73101' },
  { city: 'Nashville', state: 'TN', zip: '37201' },
  { city: 'El Paso', state: 'TX', zip: '79901' },
  { city: 'Washington', state: 'DC', zip: '20001' },
  { city: 'Boston', state: 'MA', zip: '02108' },
  { city: 'Las Vegas', state: 'NV', zip: '89101' },
  { city: 'Portland', state: 'OR', zip: '97201' },
  { city: 'Detroit', state: 'MI', zip: '48201' },
  { city: 'Louisville', state: 'KY', zip: '40201' },
  { city: 'Memphis', state: 'TN', zip: '38101' },
  { city: 'Baltimore', state: 'MD', zip: '21201' },
  { city: 'Milwaukee', state: 'WI', zip: '53201' },
  { city: 'Albuquerque', state: 'NM', zip: '87101' },
  { city: 'Tucson', state: 'AZ', zip: '85701' },
  { city: 'Fresno', state: 'CA', zip: '93701' },
  { city: 'Sacramento', state: 'CA', zip: '94203' },
  { city: 'Mesa', state: 'AZ', zip: '85201' },
  { city: 'Kansas City', state: 'MO', zip: '64101' },
  { city: 'Atlanta', state: 'GA', zip: '30301' },
  { city: 'Omaha', state: 'NE', zip: '68101' },
  { city: 'Colorado Springs', state: 'CO', zip: '80901' },
  { city: 'Raleigh', state: 'NC', zip: '27601' },
  { city: 'Miami', state: 'FL', zip: '33101' },
  { city: 'Long Beach', state: 'CA', zip: '90801' },
  { city: 'Virginia Beach', state: 'VA', zip: '23450' },
  { city: 'Oakland', state: 'CA', zip: '94601' },
  { city: 'Minneapolis', state: 'MN', zip: '55401' },
  { city: 'Tulsa', state: 'OK', zip: '74101' },
  { city: 'Tampa', state: 'FL', zip: '33601' },
  { city: 'Arlington', state: 'TX', zip: '76001' },
  { city: 'New Orleans', state: 'LA', zip: '70112' },
  { city: 'Wichita', state: 'KS', zip: '67201' },
  { city: 'Cleveland', state: 'OH', zip: '44101' },
  { city: 'Bakersfield', state: 'CA', zip: '93301' },
  { city: 'Aurora', state: 'CO', zip: '80010' },
  { city: 'Anaheim', state: 'CA', zip: '92801' },
  { city: 'Honolulu', state: 'HI', zip: '96813' },
  { city: 'Santa Ana', state: 'CA', zip: '92701' },
  { city: 'Riverside', state: 'CA', zip: '92501' },
  { city: 'Corpus Christi', state: 'TX', zip: '78401' },
  { city: 'Lexington', state: 'KY', zip: '40507' },
  { city: 'Stockton', state: 'CA', zip: '95201' },
  { city: 'Henderson', state: 'NV', zip: '89002' },
  { city: 'Saint Paul', state: 'MN', zip: '55101' },
  { city: 'St. Louis', state: 'MO', zip: '63101' },
  { city: 'Cincinnati', state: 'OH', zip: '45201' },
  { city: 'Pittsburgh', state: 'PA', zip: '15201' },
  { city: 'Greensboro', state: 'NC', zip: '27401' },
  { city: 'Anchorage', state: 'AK', zip: '99501' },
  { city: 'Plano', state: 'TX', zip: '75023' },
  { city: 'Lincoln', state: 'NE', zip: '68501' },
  { city: 'Orlando', state: 'FL', zip: '32801' },
  { city: 'Irvine', state: 'CA', zip: '92602' },
  { city: 'Newark', state: 'NJ', zip: '07101' },
  { city: 'Toledo', state: 'OH', zip: '43601' },
  { city: 'Durham', state: 'NC', zip: '27701' },
  { city: 'Chula Vista', state: 'CA', zip: '91909' },
  { city: 'Fort Wayne', state: 'IN', zip: '46801' },
  { city: 'Jersey City', state: 'NJ', zip: '07302' },
  { city: 'St. Petersburg', state: 'FL', zip: '33701' },
  { city: 'Laredo', state: 'TX', zip: '78040' },
  { city: 'Madison', state: 'WI', zip: '53701' },
  { city: 'Chandler', state: 'AZ', zip: '85224' },
  { city: 'Buffalo', state: 'NY', zip: '14201' },
  { city: 'Lubbock', state: 'TX', zip: '79401' },
  { city: 'Scottsdale', state: 'AZ', zip: '85250' },
  { city: 'Reno', state: 'NV', zip: '89501' },
  { city: 'Glendale', state: 'AZ', zip: '85301' },
  { city: 'Gilbert', state: 'AZ', zip: '85233' },
  { city: 'Winston-Salem', state: 'NC', zip: '27101' },
  { city: 'North Las Vegas', state: 'NV', zip: '89030' },
  { city: 'Norfolk', state: 'VA', zip: '23501' },
  { city: 'Chesapeake', state: 'VA', zip: '23320' },
  { city: 'Garland', state: 'TX', zip: '75040' },
  { city: 'Irving', state: 'TX', zip: '75014' },
  { city: 'Hialeah', state: 'FL', zip: '33010' },
  { city: 'Fremont', state: 'CA', zip: '94536' },
  { city: 'Boise', state: 'ID', zip: '83701' },
  { city: 'Richmond', state: 'VA', zip: '23218' },
  { city: 'Baton Rouge', state: 'LA', zip: '70801' },
  { city: 'Spokane', state: 'WA', zip: '99201' },
  { city: 'Des Moines', state: 'IA', zip: '50301' },
  { city: 'Tacoma', state: 'WA', zip: '98401' },
  { city: 'San Bernardino', state: 'CA', zip: '92401' },
  { city: 'Modesto', state: 'CA', zip: '95350' },
  { city: 'Fontana', state: 'CA', zip: '92331' },
  { city: 'Santa Clarita', state: 'CA', zip: '91350' },
  { city: 'Birmingham', state: 'AL', zip: '35201' },
  { city: 'Oxnard', state: 'CA', zip: '93030' },
  { city: 'Fayetteville', state: 'NC', zip: '28301' },
  { city: 'Moreno Valley', state: 'CA', zip: '92551' },
  { city: 'Rochester', state: 'NY', zip: '14602' },
  { city: 'Glendale', state: 'CA', zip: '91201' },
  { city: 'Huntington Beach', state: 'CA', zip: '92646' },
  { city: 'Salt Lake City', state: 'UT', zip: '84101' },
  { city: 'Grand Rapids', state: 'MI', zip: '49501' },
  { city: 'Amarillo', state: 'TX', zip: '79101' },
  { city: 'Yonkers', state: 'NY', zip: '10701' },
  { city: 'Aurora', state: 'IL', zip: '60502' },
  { city: 'Montgomery', state: 'AL', zip: '36104' },
  { city: 'Akron', state: 'OH', zip: '44301' },
  { city: 'Little Rock', state: 'AR', zip: '72201' },
  { city: 'Huntsville', state: 'AL', zip: '35801' },
  { city: 'Augusta', state: 'GA', zip: '30901' },
  { city: 'Port St. Lucie', state: 'FL', zip: '34952' },
  { city: 'Columbus', state: 'GA', zip: '31901' },
  { city: 'Grand Prairie', state: 'TX', zip: '75050' },
  { city: 'Tallahassee', state: 'FL', zip: '32301' },
  { city: 'Overland Park', state: 'KS', zip: '66204' },
  { city: 'Tempe', state: 'AZ', zip: '85280' },
  { city: 'McKinney', state: 'TX', zip: '75069' },
  { city: 'Mobile', state: 'AL', zip: '36601' },
  { city: 'Cape Coral', state: 'FL', zip: '33904' },
  { city: 'Shreveport', state: 'LA', zip: '71101' },
  { city: 'Frisco', state: 'TX', zip: '75033' },
  { city: 'Knoxville', state: 'TN', zip: '37901' },
  { city: 'Worcester', state: 'MA', zip: '01601' },
  { city: 'Brownsville', state: 'TX', zip: '78520' },
  { city: 'Vancouver', state: 'WA', zip: '98660' },
  { city: 'Fort Lauderdale', state: 'FL', zip: '33301' },
  { city: 'Sioux Falls', state: 'SD', zip: '57101' },
  { city: 'Ontario', state: 'CA', zip: '91761' },
  { city: 'Chattanooga', state: 'TN', zip: '37401' },
  { city: 'Providence', state: 'RI', zip: '02901' },
  { city: 'Newport News', state: 'VA', zip: '23601' },
  { city: 'Rancho Cucamonga', state: 'CA', zip: '91701' },
  { city: 'Santa Rosa', state: 'CA', zip: '95401' },
  { city: 'Oceanside', state: 'CA', zip: '92049' },
  { city: 'Salem', state: 'OR', zip: '97301' },
  { city: 'Elk Grove', state: 'CA', zip: '95624' },
  { city: 'Garden Grove', state: 'CA', zip: '92840' },
  { city: 'Pembroke Pines', state: 'FL', zip: '33023' },
  { city: 'Peoria', state: 'AZ', zip: '85345' },
  { city: 'Eugene', state: 'OR', zip: '97401' },
  { city: 'Corona', state: 'CA', zip: '92877' },
  { city: 'Cary', state: 'NC', zip: '27511' },
  { city: 'Springfield', state: 'MO', zip: '65801' },
  { city: 'Fort Collins', state: 'CO', zip: '80521' },
  { city: 'Jackson', state: 'MS', zip: '39201' },
  { city: 'Alexandria', state: 'VA', zip: '22301' },
  { city: 'Hayward', state: 'CA', zip: '94540' },
  { city: 'Lancaster', state: 'CA', zip: '93534' },
  { city: 'Lakewood', state: 'CO', zip: '80226' },
  { city: 'Clarksville', state: 'TN', zip: '37040' },
  { city: 'Palmdale', state: 'CA', zip: '93550' },
  { city: 'Salinas', state: 'CA', zip: '93901' },
  { city: 'Springfield', state: 'MA', zip: '01101' },
  { city: 'Hollywood', state: 'FL', zip: '33019' },
  { city: 'Pasadena', state: 'TX', zip: '77501' },
  { city: 'Sunnyvale', state: 'CA', zip: '94085' },
  { city: 'Macon', state: 'GA', zip: '31201' },
  { city: 'Killeen', state: 'TX', zip: '76540' },
  { city: 'Pomona', state: 'CA', zip: '91766' },
  { city: 'Escondido', state: 'CA', zip: '92025' },
  { city: 'Naperville', state: 'IL', zip: '60540' },
  { city: 'Bellevue', state: 'WA', zip: '98004' },
  { city: 'Rockford', state: 'IL', zip: '61101' },
  { city: 'Joliet', state: 'IL', zip: '60431' },
  { city: 'Savannah', state: 'GA', zip: '31401' },
  { city: 'Paterson', state: 'NJ', zip: '07501' },
  { city: 'Bridgeport', state: 'CT', zip: '06601' },
  { city: 'Torrance', state: 'CA', zip: '90501' },
  { city: 'McAllen', state: 'TX', zip: '78501' },
  { city: 'Syracuse', state: 'NY', zip: '13201' },
  { city: 'Surprise', state: 'AZ', zip: '85374' },
  { city: 'Denton', state: 'TX', zip: '76201' },
  { city: 'Roseville', state: 'CA', zip: '95661' },
  { city: 'Thornton', state: 'CO', zip: '80229' },
  { city: 'Miramar', state: 'FL', zip: '33025' },
  { city: 'Pasadena', state: 'CA', zip: '91101' },
  { city: 'Mesquite', state: 'TX', zip: '75149' },
  { city: 'Olathe', state: 'KS', zip: '66051' },
  { city: 'Dayton', state: 'OH', zip: '45401' },
  { city: 'Carrollton', state: 'TX', zip: '75006' },
  { city: 'Waco', state: 'TX', zip: '76701' },
  { city: 'Orange', state: 'CA', zip: '92856' },
  { city: 'Fullerton', state: 'CA', zip: '92831' },
  { city: 'Charleston', state: 'SC', zip: '29401' },
  { city: 'West Valley City', state: 'UT', zip: '84119' },
  { city: 'Visalia', state: 'CA', zip: '93277' },
  { city: 'Hampton', state: 'VA', zip: '23661' },
  { city: 'Gainesville', state: 'FL', zip: '32601' },
  { city: 'Warren', state: 'MI', zip: '48088' },
  { city: 'Coral Springs', state: 'FL', zip: '33065' },
  { city: 'Cedar Rapids', state: 'IA', zip: '52401' },
  { city: 'Round Rock', state: 'TX', zip: '78664' },
  { city: 'Sterling Heights', state: 'MI', zip: '48310' },
  { city: 'Kent', state: 'WA', zip: '98030' },
  { city: 'Columbia', state: 'SC', zip: '29201' },
  { city: 'Santa Clara', state: 'CA', zip: '95050' },
  { city: 'New Haven', state: 'CT', zip: '06510' },
  { city: 'Stamford', state: 'CT', zip: '06901' },
  { city: 'Concord', state: 'CA', zip: '94518' },
  { city: 'Elizabeth', state: 'NJ', zip: '07201' },
  { city: 'Athens', state: 'GA', zip: '30601' },
  { city: 'Thousand Oaks', state: 'CA', zip: '91320' },
  { city: 'Lafayette', state: 'LA', zip: '70501' },
  { city: 'Simi Valley', state: 'CA', zip: '93063' },
  { city: 'Topeka', state: 'KS', zip: '66601' },
];

const ZipCodeFinderContent = () => {
  const [query, setQuery] = useState('Austin');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return CITIES.filter((c) => c.city.toLowerCase().includes(q) || c.zip.startsWith(q)).slice(0, 15);
  }, [query]);

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        This is a curated reference covering roughly 200 major US cities — not an exhaustive national ZIP
        code database. For a complete, authoritative lookup, use the official{' '}
        <a href="https://www.usps.com/" target="_blank" rel="noopener noreferrer">USPS ZIP code lookup</a>.
      </Alert>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <TextField
          label="Search by City or ZIP Code"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Austin, or 78701"
        />

        <Box>
          {matches.length === 0 ? (
            <Typography color="text.secondary">No matching city found in this curated list.</Typography>
          ) : (
            <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>ZIP</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {matches.map((c, i) => (
                    <TableRow key={i}>
                      <TableCell>{c.city}</TableCell>
                      <TableCell>{c.state}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{c.zip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const ZipCodeFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the ZIP Code Finder Works</Typography>
      <Typography variant="body1">
        Type a city name or a ZIP code into the search box, and the tool matches it against a curated
        reference list of roughly 200 of the largest US cities. Each entry shows the city, its state, and a
        representative ZIP code for that city — useful as a quick reference rather than a precise, address-
        level lookup.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;Austin&quot; returns Austin, TX with ZIP <code>73301</code>. Searching{' '}
        &quot;331&quot; returns every listed city whose ZIP starts with those digits, such as Miami, FL.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly recalling a representative ZIP code for a major US city.</li>
          <li>Looking up which major city a ZIP code prefix roughly corresponds to.</li>
          <li>Filling in placeholder city/state/ZIP data for a form or test dataset.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this cover every US city and ZIP code?</strong> No — this is a curated reference of roughly 200 of the largest US cities, not the full national ZIP code database, which contains tens of thousands of codes. For an exhaustive, authoritative lookup by exact address, use <a href="https://www.usps.com/" target="_blank" rel="noopener noreferrer">usps.com</a>.</li>
          <li><strong>Why does a city only show one ZIP code when it actually has many?</strong> Large cities are typically split across dozens of ZIP codes by neighborhood. This tool lists one representative ZIP per city to keep the reference list compact and manageable rather than attempting to enumerate every ZIP a city contains.</li>
          <li><strong>Can I search by partial ZIP code?</strong> Yes — typing the first few digits of a ZIP code returns every listed city whose ZIP starts with those digits.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/zip-code-finder" content={content}>
      <ZipCodeFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ZipCodeFinder;
