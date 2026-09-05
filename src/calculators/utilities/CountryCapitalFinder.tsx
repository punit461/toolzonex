'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Country {
  name: string;
  capital: string;
}

const COUNTRIES: Country[] = [
  { name: 'Algeria', capital: 'Algiers' }, { name: 'Angola', capital: 'Luanda' }, { name: 'Benin', capital: 'Porto-Novo' },
  { name: 'Botswana', capital: 'Gaborone' }, { name: 'Burkina Faso', capital: 'Ouagadougou' }, { name: 'Burundi', capital: 'Gitega' },
  { name: 'Cabo Verde', capital: 'Praia' }, { name: 'Cameroon', capital: 'Yaoundé' }, { name: 'Central African Republic', capital: 'Bangui' },
  { name: 'Chad', capital: "N'Djamena" }, { name: 'Comoros', capital: 'Moroni' }, { name: 'Congo (Republic of the)', capital: 'Brazzaville' },
  { name: 'Congo (Democratic Republic of the)', capital: 'Kinshasa' }, { name: 'Djibouti', capital: 'Djibouti' }, { name: 'Egypt', capital: 'Cairo' },
  { name: 'Equatorial Guinea', capital: 'Malabo' }, { name: 'Eritrea', capital: 'Asmara' }, { name: 'Eswatini', capital: 'Mbabane' },
  { name: 'Ethiopia', capital: 'Addis Ababa' }, { name: 'Gabon', capital: 'Libreville' }, { name: 'Gambia', capital: 'Banjul' },
  { name: 'Ghana', capital: 'Accra' }, { name: 'Guinea', capital: 'Conakry' }, { name: 'Guinea-Bissau', capital: 'Bissau' },
  { name: "Ivory Coast (Côte d'Ivoire)", capital: 'Yamoussoukro' }, { name: 'Kenya', capital: 'Nairobi' }, { name: 'Lesotho', capital: 'Maseru' },
  { name: 'Liberia', capital: 'Monrovia' }, { name: 'Libya', capital: 'Tripoli' }, { name: 'Madagascar', capital: 'Antananarivo' },
  { name: 'Malawi', capital: 'Lilongwe' }, { name: 'Mali', capital: 'Bamako' }, { name: 'Mauritania', capital: 'Nouakchott' },
  { name: 'Mauritius', capital: 'Port Louis' }, { name: 'Morocco', capital: 'Rabat' }, { name: 'Mozambique', capital: 'Maputo' },
  { name: 'Namibia', capital: 'Windhoek' }, { name: 'Niger', capital: 'Niamey' }, { name: 'Nigeria', capital: 'Abuja' },
  { name: 'Rwanda', capital: 'Kigali' }, { name: 'Sao Tome and Principe', capital: 'São Tomé' }, { name: 'Senegal', capital: 'Dakar' },
  { name: 'Seychelles', capital: 'Victoria' }, { name: 'Sierra Leone', capital: 'Freetown' }, { name: 'Somalia', capital: 'Mogadishu' },
  { name: 'South Africa', capital: 'Pretoria' }, { name: 'South Sudan', capital: 'Juba' }, { name: 'Sudan', capital: 'Khartoum' },
  { name: 'Tanzania', capital: 'Dodoma' }, { name: 'Togo', capital: 'Lomé' }, { name: 'Tunisia', capital: 'Tunis' },
  { name: 'Uganda', capital: 'Kampala' }, { name: 'Zambia', capital: 'Lusaka' }, { name: 'Zimbabwe', capital: 'Harare' },
  { name: 'Antigua and Barbuda', capital: "St. John's" }, { name: 'Argentina', capital: 'Buenos Aires' }, { name: 'Bahamas', capital: 'Nassau' },
  { name: 'Barbados', capital: 'Bridgetown' }, { name: 'Belize', capital: 'Belmopan' }, { name: 'Bolivia', capital: 'Sucre' },
  { name: 'Brazil', capital: 'Brasília' }, { name: 'Canada', capital: 'Ottawa' }, { name: 'Chile', capital: 'Santiago' },
  { name: 'Colombia', capital: 'Bogotá' }, { name: 'Costa Rica', capital: 'San José' }, { name: 'Cuba', capital: 'Havana' },
  { name: 'Dominica', capital: 'Roseau' }, { name: 'Dominican Republic', capital: 'Santo Domingo' }, { name: 'Ecuador', capital: 'Quito' },
  { name: 'El Salvador', capital: 'San Salvador' }, { name: 'Grenada', capital: "St. George's" }, { name: 'Guatemala', capital: 'Guatemala City' },
  { name: 'Guyana', capital: 'Georgetown' }, { name: 'Haiti', capital: 'Port-au-Prince' }, { name: 'Honduras', capital: 'Tegucigalpa' },
  { name: 'Jamaica', capital: 'Kingston' }, { name: 'Mexico', capital: 'Mexico City' }, { name: 'Nicaragua', capital: 'Managua' },
  { name: 'Panama', capital: 'Panama City' }, { name: 'Paraguay', capital: 'Asunción' }, { name: 'Peru', capital: 'Lima' },
  { name: 'Saint Kitts and Nevis', capital: 'Basseterre' }, { name: 'Saint Lucia', capital: 'Castries' },
  { name: 'Saint Vincent and the Grenadines', capital: 'Kingstown' }, { name: 'Suriname', capital: 'Paramaribo' },
  { name: 'Trinidad and Tobago', capital: 'Port of Spain' }, { name: 'United States', capital: 'Washington, D.C.' }, { name: 'Uruguay', capital: 'Montevideo' },
  { name: 'Venezuela', capital: 'Caracas' }, { name: 'Afghanistan', capital: 'Kabul' }, { name: 'Armenia', capital: 'Yerevan' },
  { name: 'Azerbaijan', capital: 'Baku' }, { name: 'Bahrain', capital: 'Manama' }, { name: 'Bangladesh', capital: 'Dhaka' },
  { name: 'Bhutan', capital: 'Thimphu' }, { name: 'Brunei', capital: 'Bandar Seri Begawan' }, { name: 'Cambodia', capital: 'Phnom Penh' },
  { name: 'China', capital: 'Beijing' }, { name: 'Cyprus', capital: 'Nicosia' }, { name: 'Georgia', capital: 'Tbilisi' },
  { name: 'India', capital: 'New Delhi' }, { name: 'Indonesia', capital: 'Jakarta' }, { name: 'Iran', capital: 'Tehran' },
  { name: 'Iraq', capital: 'Baghdad' }, { name: 'Israel', capital: 'Jerusalem' }, { name: 'Japan', capital: 'Tokyo' },
  { name: 'Jordan', capital: 'Amman' }, { name: 'Kazakhstan', capital: 'Astana' }, { name: 'Kuwait', capital: 'Kuwait City' },
  { name: 'Kyrgyzstan', capital: 'Bishkek' }, { name: 'Laos', capital: 'Vientiane' }, { name: 'Lebanon', capital: 'Beirut' },
  { name: 'Malaysia', capital: 'Kuala Lumpur' }, { name: 'Maldives', capital: 'Malé' }, { name: 'Mongolia', capital: 'Ulaanbaatar' },
  { name: 'Myanmar', capital: 'Naypyidaw' }, { name: 'Nepal', capital: 'Kathmandu' }, { name: 'North Korea', capital: 'Pyongyang' },
  { name: 'Oman', capital: 'Muscat' }, { name: 'Pakistan', capital: 'Islamabad' }, { name: 'Palestine', capital: 'Ramallah' },
  { name: 'Philippines', capital: 'Manila' }, { name: 'Qatar', capital: 'Doha' }, { name: 'Saudi Arabia', capital: 'Riyadh' },
  { name: 'Singapore', capital: 'Singapore' }, { name: 'South Korea', capital: 'Seoul' }, { name: 'Sri Lanka', capital: 'Sri Jayawardenepura Kotte' },
  { name: 'Syria', capital: 'Damascus' }, { name: 'Tajikistan', capital: 'Dushanbe' }, { name: 'Thailand', capital: 'Bangkok' },
  { name: 'Timor-Leste', capital: 'Dili' }, { name: 'Turkey', capital: 'Ankara' }, { name: 'Turkmenistan', capital: 'Ashgabat' },
  { name: 'United Arab Emirates', capital: 'Abu Dhabi' }, { name: 'Uzbekistan', capital: 'Tashkent' }, { name: 'Vietnam', capital: 'Hanoi' },
  { name: 'Yemen', capital: "Sana'a" }, { name: 'Albania', capital: 'Tirana' }, { name: 'Andorra', capital: 'Andorra la Vella' },
  { name: 'Austria', capital: 'Vienna' }, { name: 'Belarus', capital: 'Minsk' }, { name: 'Belgium', capital: 'Brussels' },
  { name: 'Bosnia and Herzegovina', capital: 'Sarajevo' }, { name: 'Bulgaria', capital: 'Sofia' }, { name: 'Croatia', capital: 'Zagreb' },
  { name: 'Czech Republic', capital: 'Prague' }, { name: 'Denmark', capital: 'Copenhagen' }, { name: 'Estonia', capital: 'Tallinn' },
  { name: 'Finland', capital: 'Helsinki' }, { name: 'France', capital: 'Paris' }, { name: 'Germany', capital: 'Berlin' },
  { name: 'Greece', capital: 'Athens' }, { name: 'Hungary', capital: 'Budapest' }, { name: 'Iceland', capital: 'Reykjavik' },
  { name: 'Ireland', capital: 'Dublin' }, { name: 'Italy', capital: 'Rome' }, { name: 'Latvia', capital: 'Riga' },
  { name: 'Liechtenstein', capital: 'Vaduz' }, { name: 'Lithuania', capital: 'Vilnius' }, { name: 'Luxembourg', capital: 'Luxembourg' },
  { name: 'Malta', capital: 'Valletta' }, { name: 'Moldova', capital: 'Chișinău' }, { name: 'Monaco', capital: 'Monaco' },
  { name: 'Montenegro', capital: 'Podgorica' }, { name: 'Netherlands', capital: 'Amsterdam' }, { name: 'North Macedonia', capital: 'Skopje' },
  { name: 'Norway', capital: 'Oslo' }, { name: 'Poland', capital: 'Warsaw' }, { name: 'Portugal', capital: 'Lisbon' },
  { name: 'Romania', capital: 'Bucharest' }, { name: 'Russia', capital: 'Moscow' }, { name: 'San Marino', capital: 'San Marino' },
  { name: 'Serbia', capital: 'Belgrade' }, { name: 'Slovakia', capital: 'Bratislava' }, { name: 'Slovenia', capital: 'Ljubljana' },
  { name: 'Spain', capital: 'Madrid' }, { name: 'Sweden', capital: 'Stockholm' }, { name: 'Switzerland', capital: 'Bern' },
  { name: 'Ukraine', capital: 'Kyiv' }, { name: 'United Kingdom', capital: 'London' }, { name: 'Vatican City', capital: 'Vatican City' },
  { name: 'Australia', capital: 'Canberra' }, { name: 'Fiji', capital: 'Suva' }, { name: 'Kiribati', capital: 'Tarawa' },
  { name: 'Marshall Islands', capital: 'Majuro' }, { name: 'Micronesia', capital: 'Palikir' }, { name: 'Nauru', capital: 'Yaren' },
  { name: 'New Zealand', capital: 'Wellington' }, { name: 'Palau', capital: 'Ngerulmud' }, { name: 'Papua New Guinea', capital: 'Port Moresby' },
  { name: 'Samoa', capital: 'Apia' }, { name: 'Solomon Islands', capital: 'Honiara' }, { name: 'Tonga', capital: "Nuku'alofa" },
  { name: 'Tuvalu', capital: 'Funafuti' }, { name: 'Vanuatu', capital: 'Port Vila' },
];

const CountryCapitalFinderContent = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Box>
      <TextField
        label="Search by Country or Capital"
        placeholder="e.g. France, or Paris"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3, maxWidth: 480 }}
      />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filtered.length} of {COUNTRIES.length} countries
      </Typography>

      <Stack direction="row" flexWrap="wrap" gap={2}>
        {filtered.map((c) => (
          <Paper key={c.name} variant="outlined" sx={{ p: 2, width: { xs: '100%', sm: 220 } }}>
            <Typography variant="body2" color="text.secondary">{c.name}</Typography>
            <Typography variant="h6" fontWeight={700}>{c.capital}</Typography>
          </Paper>
        ))}
        {filtered.length === 0 && (
          <Typography color="text.secondary">No matches found.</Typography>
        )}
      </Stack>
    </Box>
  );
};

const CountryCapitalFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Country Capital Finder</Typography>
      <Typography variant="body1">
        Type either a country name or a capital city name to search a hand-compiled list of about 195
        countries and their capital cities. Matches update instantly as you type, and you can search from
        either direction — by country to find its capital, or by capital to find which country it belongs
        to.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing &quot;France&quot; shows Paris. Typing &quot;Nairobi&quot; instead shows Kenya, since the
        search matches capital names too.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Studying for a geography quiz or trivia night.</li>
          <li>Quickly checking a country&apos;s capital while writing or researching.</li>
          <li>Identifying which country a lesser-known capital city belongs to.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Does this cover every country?</strong> It covers roughly 195 widely-recognized
            countries — all UN member states plus a few commonly searched additional entries — rather than
            every dependent territory in the world.
          </li>
          <li>
            <strong>What about countries with more than one capital?</strong> A few countries (like South
            Africa or Bolivia) have multiple official capitals for different branches of government. This
            tool lists the single most commonly cited capital for simplicity.
          </li>
          <li>
            <strong>Can I search using a partial name?</strong> Yes — the search matches any part of the
            country or capital name, so typing just a few letters is often enough to find what you&apos;re
            looking for.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/country-capital-finder" content={content}>
      <CountryCapitalFinderContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default CountryCapitalFinder;
