'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Country {
  name: string;
  code: string;
}

const COUNTRIES: Country[] = [
  { name: 'Algeria', code: 'DZ' }, { name: 'Angola', code: 'AO' }, { name: 'Benin', code: 'BJ' },
  { name: 'Botswana', code: 'BW' }, { name: 'Burkina Faso', code: 'BF' }, { name: 'Burundi', code: 'BI' },
  { name: 'Cabo Verde', code: 'CV' }, { name: 'Cameroon', code: 'CM' }, { name: 'Central African Republic', code: 'CF' },
  { name: 'Chad', code: 'TD' }, { name: 'Comoros', code: 'KM' }, { name: 'Congo (Republic of the)', code: 'CG' },
  { name: 'Congo (Democratic Republic of the)', code: 'CD' }, { name: 'Djibouti', code: 'DJ' }, { name: 'Egypt', code: 'EG' },
  { name: 'Equatorial Guinea', code: 'GQ' }, { name: 'Eritrea', code: 'ER' }, { name: 'Eswatini', code: 'SZ' },
  { name: 'Ethiopia', code: 'ET' }, { name: 'Gabon', code: 'GA' }, { name: 'Gambia', code: 'GM' },
  { name: 'Ghana', code: 'GH' }, { name: 'Guinea', code: 'GN' }, { name: 'Guinea-Bissau', code: 'GW' },
  { name: "Ivory Coast (Côte d'Ivoire)", code: 'CI' }, { name: 'Kenya', code: 'KE' }, { name: 'Lesotho', code: 'LS' },
  { name: 'Liberia', code: 'LR' }, { name: 'Libya', code: 'LY' }, { name: 'Madagascar', code: 'MG' },
  { name: 'Malawi', code: 'MW' }, { name: 'Mali', code: 'ML' }, { name: 'Mauritania', code: 'MR' },
  { name: 'Mauritius', code: 'MU' }, { name: 'Morocco', code: 'MA' }, { name: 'Mozambique', code: 'MZ' },
  { name: 'Namibia', code: 'NA' }, { name: 'Niger', code: 'NE' }, { name: 'Nigeria', code: 'NG' },
  { name: 'Rwanda', code: 'RW' }, { name: 'Sao Tome and Principe', code: 'ST' }, { name: 'Senegal', code: 'SN' },
  { name: 'Seychelles', code: 'SC' }, { name: 'Sierra Leone', code: 'SL' }, { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' }, { name: 'South Sudan', code: 'SS' }, { name: 'Sudan', code: 'SD' },
  { name: 'Tanzania', code: 'TZ' }, { name: 'Togo', code: 'TG' }, { name: 'Tunisia', code: 'TN' },
  { name: 'Uganda', code: 'UG' }, { name: 'Zambia', code: 'ZM' }, { name: 'Zimbabwe', code: 'ZW' },
  { name: 'Antigua and Barbuda', code: 'AG' }, { name: 'Argentina', code: 'AR' }, { name: 'Bahamas', code: 'BS' },
  { name: 'Barbados', code: 'BB' }, { name: 'Belize', code: 'BZ' }, { name: 'Bolivia', code: 'BO' },
  { name: 'Brazil', code: 'BR' }, { name: 'Canada', code: 'CA' }, { name: 'Chile', code: 'CL' },
  { name: 'Colombia', code: 'CO' }, { name: 'Costa Rica', code: 'CR' }, { name: 'Cuba', code: 'CU' },
  { name: 'Dominica', code: 'DM' }, { name: 'Dominican Republic', code: 'DO' }, { name: 'Ecuador', code: 'EC' },
  { name: 'El Salvador', code: 'SV' }, { name: 'Grenada', code: 'GD' }, { name: 'Guatemala', code: 'GT' },
  { name: 'Guyana', code: 'GY' }, { name: 'Haiti', code: 'HT' }, { name: 'Honduras', code: 'HN' },
  { name: 'Jamaica', code: 'JM' }, { name: 'Mexico', code: 'MX' }, { name: 'Nicaragua', code: 'NI' },
  { name: 'Panama', code: 'PA' }, { name: 'Paraguay', code: 'PY' }, { name: 'Peru', code: 'PE' },
  { name: 'Saint Kitts and Nevis', code: 'KN' }, { name: 'Saint Lucia', code: 'LC' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC' }, { name: 'Suriname', code: 'SR' },
  { name: 'Trinidad and Tobago', code: 'TT' }, { name: 'United States', code: 'US' }, { name: 'Uruguay', code: 'UY' },
  { name: 'Venezuela', code: 'VE' }, { name: 'Afghanistan', code: 'AF' }, { name: 'Armenia', code: 'AM' },
  { name: 'Azerbaijan', code: 'AZ' }, { name: 'Bahrain', code: 'BH' }, { name: 'Bangladesh', code: 'BD' },
  { name: 'Bhutan', code: 'BT' }, { name: 'Brunei', code: 'BN' }, { name: 'Cambodia', code: 'KH' },
  { name: 'China', code: 'CN' }, { name: 'Cyprus', code: 'CY' }, { name: 'Georgia', code: 'GE' },
  { name: 'India', code: 'IN' }, { name: 'Indonesia', code: 'ID' }, { name: 'Iran', code: 'IR' },
  { name: 'Iraq', code: 'IQ' }, { name: 'Israel', code: 'IL' }, { name: 'Japan', code: 'JP' },
  { name: 'Jordan', code: 'JO' }, { name: 'Kazakhstan', code: 'KZ' }, { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' }, { name: 'Laos', code: 'LA' }, { name: 'Lebanon', code: 'LB' },
  { name: 'Malaysia', code: 'MY' }, { name: 'Maldives', code: 'MV' }, { name: 'Mongolia', code: 'MN' },
  { name: 'Myanmar', code: 'MM' }, { name: 'Nepal', code: 'NP' }, { name: 'North Korea', code: 'KP' },
  { name: 'Oman', code: 'OM' }, { name: 'Pakistan', code: 'PK' }, { name: 'Palestine', code: 'PS' },
  { name: 'Philippines', code: 'PH' }, { name: 'Qatar', code: 'QA' }, { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Singapore', code: 'SG' }, { name: 'South Korea', code: 'KR' }, { name: 'Sri Lanka', code: 'LK' },
  { name: 'Syria', code: 'SY' }, { name: 'Tajikistan', code: 'TJ' }, { name: 'Thailand', code: 'TH' },
  { name: 'Timor-Leste', code: 'TL' }, { name: 'Turkey', code: 'TR' }, { name: 'Turkmenistan', code: 'TM' },
  { name: 'United Arab Emirates', code: 'AE' }, { name: 'Uzbekistan', code: 'UZ' }, { name: 'Vietnam', code: 'VN' },
  { name: 'Yemen', code: 'YE' }, { name: 'Albania', code: 'AL' }, { name: 'Andorra', code: 'AD' },
  { name: 'Austria', code: 'AT' }, { name: 'Belarus', code: 'BY' }, { name: 'Belgium', code: 'BE' },
  { name: 'Bosnia and Herzegovina', code: 'BA' }, { name: 'Bulgaria', code: 'BG' }, { name: 'Croatia', code: 'HR' },
  { name: 'Czech Republic', code: 'CZ' }, { name: 'Denmark', code: 'DK' }, { name: 'Estonia', code: 'EE' },
  { name: 'Finland', code: 'FI' }, { name: 'France', code: 'FR' }, { name: 'Germany', code: 'DE' },
  { name: 'Greece', code: 'GR' }, { name: 'Hungary', code: 'HU' }, { name: 'Iceland', code: 'IS' },
  { name: 'Ireland', code: 'IE' }, { name: 'Italy', code: 'IT' }, { name: 'Latvia', code: 'LV' },
  { name: 'Liechtenstein', code: 'LI' }, { name: 'Lithuania', code: 'LT' }, { name: 'Luxembourg', code: 'LU' },
  { name: 'Malta', code: 'MT' }, { name: 'Moldova', code: 'MD' }, { name: 'Monaco', code: 'MC' },
  { name: 'Montenegro', code: 'ME' }, { name: 'Netherlands', code: 'NL' }, { name: 'North Macedonia', code: 'MK' },
  { name: 'Norway', code: 'NO' }, { name: 'Poland', code: 'PL' }, { name: 'Portugal', code: 'PT' },
  { name: 'Romania', code: 'RO' }, { name: 'Russia', code: 'RU' }, { name: 'San Marino', code: 'SM' },
  { name: 'Serbia', code: 'RS' }, { name: 'Slovakia', code: 'SK' }, { name: 'Slovenia', code: 'SI' },
  { name: 'Spain', code: 'ES' }, { name: 'Sweden', code: 'SE' }, { name: 'Switzerland', code: 'CH' },
  { name: 'Ukraine', code: 'UA' }, { name: 'United Kingdom', code: 'GB' }, { name: 'Vatican City', code: 'VA' },
  { name: 'Australia', code: 'AU' }, { name: 'Fiji', code: 'FJ' }, { name: 'Kiribati', code: 'KI' },
  { name: 'Marshall Islands', code: 'MH' }, { name: 'Micronesia', code: 'FM' }, { name: 'Nauru', code: 'NR' },
  { name: 'New Zealand', code: 'NZ' }, { name: 'Palau', code: 'PW' }, { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Samoa', code: 'WS' }, { name: 'Solomon Islands', code: 'SB' }, { name: 'Tonga', code: 'TO' },
  { name: 'Tuvalu', code: 'TV' }, { name: 'Vanuatu', code: 'VU' },
];

function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 'A'.charCodeAt(0)))
    .join('');
}

const CountryFlagFinderContent = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <Box>
      <TextField
        label="Search Country"
        placeholder="e.g. Japan, Brazil, Kenya"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3, maxWidth: 480 }}
      />

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filtered.length} of {COUNTRIES.length} countries
      </Typography>

      {filtered.length === 1 ? (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white', maxWidth: 480 }}>
          <Typography sx={{ fontSize: '5rem', lineHeight: 1 }}>{flagEmoji(filtered[0].code)}</Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>{filtered[0].name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>ISO Code: {filtered[0].code}</Typography>
        </Paper>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={2}>
          {filtered.map((c) => (
            <Paper key={c.code} variant="outlined" sx={{ p: 2, width: 150, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '2.5rem', lineHeight: 1 }}>{flagEmoji(c.code)}</Typography>
              <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>{c.name}</Typography>
            </Paper>
          ))}
        </Stack>
      )}
      {filtered.length === 0 && (
        <Typography color="text.secondary">No countries match your search.</Typography>
      )}
    </Box>
  );
};

const CountryFlagFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Country Flag Finder</Typography>
      <Typography variant="body1">
        Type a country name to search a list of about 195 countries. Each result shows the country&apos;s
        flag rendered as an emoji, computed directly from its ISO 3166-1 alpha-2 code using Unicode Regional
        Indicator Symbols — each letter of the code maps to a special codepoint, and pairing the two letters
        renders as that country&apos;s flag in supporting fonts and browsers.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;Japan&quot; shows Japan&apos;s flag emoji, computed from its ISO code &quot;JP&quot;
        — the letter J and the letter P are each converted to a Regional Indicator Symbol, and the pair
        renders as 🇯🇵.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly finding a country&apos;s flag emoji to paste into a chat or social media post.</li>
          <li>Looking up a country&apos;s ISO alpha-2 code alongside its flag.</li>
          <li>Browsing flags for a geography quiz, lesson, or presentation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Why might a flag show as two letters instead of an image on my device?</strong> Flag
            emoji rendering depends on your operating system and font support. Most modern phones and
            browsers render them as full flag images, but some older systems or fonts may show the two
            Regional Indicator Symbol letters instead.
          </li>
          <li>
            <strong>Is this the same as a Flag Emoji Finder?</strong> Yes — this tool covers both use cases
            in one place: searching by country name to see its flag, which is exactly what a dedicated flag
            emoji finder would do.
          </li>
          <li>
            <strong>Does this include every country and territory?</strong> It covers roughly 195
            widely-recognized countries rather than every dependent territory or micro-state, but it covers
            all UN member states plus a few commonly searched additional entries.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/country-flag-finder" content={content}>
      <CountryFlagFinderContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default CountryFlagFinder;
