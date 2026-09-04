'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, List, ListItemButton, ListItemText } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface CountryInfo {
  name: string;
  iso2: string;
  iso3: string;
  dial: string;
}

const COUNTRIES: CountryInfo[] = [
  { name: 'United States', iso2: 'US', iso3: 'USA', dial: '+1' },
  { name: 'Canada', iso2: 'CA', iso3: 'CAN', dial: '+1' },
  { name: 'United Kingdom', iso2: 'GB', iso3: 'GBR', dial: '+44' },
  { name: 'Australia', iso2: 'AU', iso3: 'AUS', dial: '+61' },
  { name: 'India', iso2: 'IN', iso3: 'IND', dial: '+91' },
  { name: 'Germany', iso2: 'DE', iso3: 'DEU', dial: '+49' },
  { name: 'France', iso2: 'FR', iso3: 'FRA', dial: '+33' },
  { name: 'Italy', iso2: 'IT', iso3: 'ITA', dial: '+39' },
  { name: 'Spain', iso2: 'ES', iso3: 'ESP', dial: '+34' },
  { name: 'Portugal', iso2: 'PT', iso3: 'PRT', dial: '+351' },
  { name: 'Netherlands', iso2: 'NL', iso3: 'NLD', dial: '+31' },
  { name: 'Belgium', iso2: 'BE', iso3: 'BEL', dial: '+32' },
  { name: 'Switzerland', iso2: 'CH', iso3: 'CHE', dial: '+41' },
  { name: 'Austria', iso2: 'AT', iso3: 'AUT', dial: '+43' },
  { name: 'Sweden', iso2: 'SE', iso3: 'SWE', dial: '+46' },
  { name: 'Norway', iso2: 'NO', iso3: 'NOR', dial: '+47' },
  { name: 'Denmark', iso2: 'DK', iso3: 'DNK', dial: '+45' },
  { name: 'Finland', iso2: 'FI', iso3: 'FIN', dial: '+358' },
  { name: 'Poland', iso2: 'PL', iso3: 'POL', dial: '+48' },
  { name: 'Ireland', iso2: 'IE', iso3: 'IRL', dial: '+353' },
  { name: 'Greece', iso2: 'GR', iso3: 'GRC', dial: '+30' },
  { name: 'Russia', iso2: 'RU', iso3: 'RUS', dial: '+7' },
  { name: 'Ukraine', iso2: 'UA', iso3: 'UKR', dial: '+380' },
  { name: 'Turkey', iso2: 'TR', iso3: 'TUR', dial: '+90' },
  { name: 'China', iso2: 'CN', iso3: 'CHN', dial: '+86' },
  { name: 'Japan', iso2: 'JP', iso3: 'JPN', dial: '+81' },
  { name: 'South Korea', iso2: 'KR', iso3: 'KOR', dial: '+82' },
  { name: 'Indonesia', iso2: 'ID', iso3: 'IDN', dial: '+62' },
  { name: 'Malaysia', iso2: 'MY', iso3: 'MYS', dial: '+60' },
  { name: 'Singapore', iso2: 'SG', iso3: 'SGP', dial: '+65' },
  { name: 'Thailand', iso2: 'TH', iso3: 'THA', dial: '+66' },
  { name: 'Vietnam', iso2: 'VN', iso3: 'VNM', dial: '+84' },
  { name: 'Philippines', iso2: 'PH', iso3: 'PHL', dial: '+63' },
  { name: 'Pakistan', iso2: 'PK', iso3: 'PAK', dial: '+92' },
  { name: 'Bangladesh', iso2: 'BD', iso3: 'BGD', dial: '+880' },
  { name: 'Sri Lanka', iso2: 'LK', iso3: 'LKA', dial: '+94' },
  { name: 'Saudi Arabia', iso2: 'SA', iso3: 'SAU', dial: '+966' },
  { name: 'United Arab Emirates', iso2: 'AE', iso3: 'ARE', dial: '+971' },
  { name: 'Israel', iso2: 'IL', iso3: 'ISR', dial: '+972' },
  { name: 'Qatar', iso2: 'QA', iso3: 'QAT', dial: '+974' },
  { name: 'Egypt', iso2: 'EG', iso3: 'EGY', dial: '+20' },
  { name: 'South Africa', iso2: 'ZA', iso3: 'ZAF', dial: '+27' },
  { name: 'Nigeria', iso2: 'NG', iso3: 'NGA', dial: '+234' },
  { name: 'Kenya', iso2: 'KE', iso3: 'KEN', dial: '+254' },
  { name: 'Morocco', iso2: 'MA', iso3: 'MAR', dial: '+212' },
  { name: 'Ghana', iso2: 'GH', iso3: 'GHA', dial: '+233' },
  { name: 'Brazil', iso2: 'BR', iso3: 'BRA', dial: '+55' },
  { name: 'Mexico', iso2: 'MX', iso3: 'MEX', dial: '+52' },
  { name: 'Argentina', iso2: 'AR', iso3: 'ARG', dial: '+54' },
  { name: 'Chile', iso2: 'CL', iso3: 'CHL', dial: '+56' },
  { name: 'Colombia', iso2: 'CO', iso3: 'COL', dial: '+57' },
  { name: 'Peru', iso2: 'PE', iso3: 'PER', dial: '+51' },
  { name: 'New Zealand', iso2: 'NZ', iso3: 'NZL', dial: '+64' },
  { name: 'Portugal', iso2: 'PT', iso3: 'PRT', dial: '+351' },
  { name: 'Czech Republic', iso2: 'CZ', iso3: 'CZE', dial: '+420' },
  { name: 'Hungary', iso2: 'HU', iso3: 'HUN', dial: '+36' },
  { name: 'Romania', iso2: 'RO', iso3: 'ROU', dial: '+40' },
  { name: 'Vietnam', iso2: 'VN', iso3: 'VNM', dial: '+84' },
];

// Remove accidental duplicates from the curated list above.
const UNIQUE_COUNTRIES = Array.from(new Map(COUNTRIES.map((c) => [c.iso2, c])).values());

const CountryCodeFinderContent = () => {
  const [query, setQuery] = useState('India');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return UNIQUE_COUNTRIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const selected = matches[0] ?? null;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Search Country"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={(e) => e.target.select()}
          placeholder="e.g. India, Germany, Brazil"
        />
        {matches.length > 1 && (
          <List dense sx={{ mt: 1 }}>
            {matches.map((c) => (
              <ListItemButton key={c.iso2} onClick={() => setQuery(c.name)}>
                <ListItemText primary={c.name} secondary={`${c.iso2} / ${c.iso3} / ${c.dial}`} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
        {selected ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>{selected.name}</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mt: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">ISO2</Typography>
                <Typography variant="h6" fontWeight={700}>{selected.iso2}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">ISO3</Typography>
                <Typography variant="h6" fontWeight={700}>{selected.iso3}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Dial Code</Typography>
                <Typography variant="h6" fontWeight={700}>{selected.dial}</Typography>
              </Box>
            </Box>
          </Paper>
        ) : (
          <Typography color="text.secondary">No matching country found.</Typography>
        )}
      </Box>
    </Box>
  );
};

const CountryCodeFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Country Code Finder Works</Typography>
      <Typography variant="body1">
        Type a country name into the search box. The tool matches it against a reference list of countries and
        shows its ISO 3166-1 alpha-2 code (2 letters, used in domains and locale codes), its ISO 3166-1
        alpha-3 code (3 letters, used in many international data formats), and its international calling/dial
        code (used before a phone number).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;India&quot; returns ISO2 &quot;IN&quot;, ISO3 &quot;IND&quot;, and dial code
        &quot;+91&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Looking up a country&apos;s calling code before dialing an international number.</li>
          <li>Finding the correct ISO country code for a form, database, or API integration.</li>
          <li>Checking ISO2 vs. ISO3 codes when working with country data in code.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between ISO2 and ISO3 codes?</Typography>
      <Typography variant="body1">
        Both are standardized country codes from ISO 3166-1, just at different lengths — ISO2 (2 letters, like
        &quot;IN&quot;) is common in web locales and domain suffixes, while ISO3 (3 letters, like
        &quot;IND&quot;) is often used in international databases, sports federations, and some APIs that
        prefer a less ambiguous code.
      </Typography>
      <Typography variant="h3">Why do some countries share a dial code?</Typography>
      <Typography variant="body1">
        Countries in the North American Numbering Plan (including the US and Canada) all share the +1 dial
        code and are distinguished by their area codes instead, rather than each having a unique country dial
        code.
      </Typography>
      <Typography variant="h3">Does this include every country in the world?</Typography>
      <Typography variant="body1">
        This tool draws from a curated list of widely searched countries rather than the complete list of every
        country and territory. If a country you need isn&apos;t listed, check an official ISO 3166 reference
        for the complete list.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/country-code-finder" content={content}>
      <CountryCodeFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CountryCodeFinder;
