'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Paper, Autocomplete, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface City {
  city: string;
  country: string;
  tz: string;
}

const CITIES: City[] = [
  { city: 'New York', country: 'USA', tz: 'America/New_York' },
  { city: 'Los Angeles', country: 'USA', tz: 'America/Los_Angeles' },
  { city: 'Chicago', country: 'USA', tz: 'America/Chicago' },
  { city: 'Denver', country: 'USA', tz: 'America/Denver' },
  { city: 'Anchorage', country: 'USA', tz: 'America/Anchorage' },
  { city: 'Honolulu', country: 'USA', tz: 'Pacific/Honolulu' },
  { city: 'Toronto', country: 'Canada', tz: 'America/Toronto' },
  { city: 'Vancouver', country: 'Canada', tz: 'America/Vancouver' },
  { city: 'Mexico City', country: 'Mexico', tz: 'America/Mexico_City' },
  { city: 'Sao Paulo', country: 'Brazil', tz: 'America/Sao_Paulo' },
  { city: 'Buenos Aires', country: 'Argentina', tz: 'America/Argentina/Buenos_Aires' },
  { city: 'Bogota', country: 'Colombia', tz: 'America/Bogota' },
  { city: 'Lima', country: 'Peru', tz: 'America/Lima' },
  { city: 'Santiago', country: 'Chile', tz: 'America/Santiago' },
  { city: 'London', country: 'UK', tz: 'Europe/London' },
  { city: 'Dublin', country: 'Ireland', tz: 'Europe/Dublin' },
  { city: 'Paris', country: 'France', tz: 'Europe/Paris' },
  { city: 'Berlin', country: 'Germany', tz: 'Europe/Berlin' },
  { city: 'Madrid', country: 'Spain', tz: 'Europe/Madrid' },
  { city: 'Rome', country: 'Italy', tz: 'Europe/Rome' },
  { city: 'Amsterdam', country: 'Netherlands', tz: 'Europe/Amsterdam' },
  { city: 'Zurich', country: 'Switzerland', tz: 'Europe/Zurich' },
  { city: 'Vienna', country: 'Austria', tz: 'Europe/Vienna' },
  { city: 'Stockholm', country: 'Sweden', tz: 'Europe/Stockholm' },
  { city: 'Oslo', country: 'Norway', tz: 'Europe/Oslo' },
  { city: 'Helsinki', country: 'Finland', tz: 'Europe/Helsinki' },
  { city: 'Warsaw', country: 'Poland', tz: 'Europe/Warsaw' },
  { city: 'Athens', country: 'Greece', tz: 'Europe/Athens' },
  { city: 'Lisbon', country: 'Portugal', tz: 'Europe/Lisbon' },
  { city: 'Moscow', country: 'Russia', tz: 'Europe/Moscow' },
  { city: 'Istanbul', country: 'Turkey', tz: 'Europe/Istanbul' },
  { city: 'Cairo', country: 'Egypt', tz: 'Africa/Cairo' },
  { city: 'Johannesburg', country: 'South Africa', tz: 'Africa/Johannesburg' },
  { city: 'Lagos', country: 'Nigeria', tz: 'Africa/Lagos' },
  { city: 'Nairobi', country: 'Kenya', tz: 'Africa/Nairobi' },
  { city: 'Dubai', country: 'UAE', tz: 'Asia/Dubai' },
  { city: 'Riyadh', country: 'Saudi Arabia', tz: 'Asia/Riyadh' },
  { city: 'Tehran', country: 'Iran', tz: 'Asia/Tehran' },
  { city: 'Karachi', country: 'Pakistan', tz: 'Asia/Karachi' },
  { city: 'Mumbai', country: 'India', tz: 'Asia/Kolkata' },
  { city: 'New Delhi', country: 'India', tz: 'Asia/Kolkata' },
  { city: 'Dhaka', country: 'Bangladesh', tz: 'Asia/Dhaka' },
  { city: 'Bangkok', country: 'Thailand', tz: 'Asia/Bangkok' },
  { city: 'Jakarta', country: 'Indonesia', tz: 'Asia/Jakarta' },
  { city: 'Kuala Lumpur', country: 'Malaysia', tz: 'Asia/Kuala_Lumpur' },
  { city: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore' },
  { city: 'Manila', country: 'Philippines', tz: 'Asia/Manila' },
  { city: 'Hong Kong', country: 'China', tz: 'Asia/Hong_Kong' },
  { city: 'Shanghai', country: 'China', tz: 'Asia/Shanghai' },
  { city: 'Beijing', country: 'China', tz: 'Asia/Shanghai' },
  { city: 'Seoul', country: 'South Korea', tz: 'Asia/Seoul' },
  { city: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo' },
  { city: 'Sydney', country: 'Australia', tz: 'Australia/Sydney' },
  { city: 'Melbourne', country: 'Australia', tz: 'Australia/Melbourne' },
  { city: 'Perth', country: 'Australia', tz: 'Australia/Perth' },
  { city: 'Auckland', country: 'New Zealand', tz: 'Pacific/Auckland' },
];

const TimeZoneFinderContent = () => {
  const [selected, setSelected] = useState<City>(CITIES.find((c) => c.city === 'London')!);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const info = useMemo(() => {
    if (!now) return null;
    try {
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: selected.tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: selected.tz,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const offsetParts = new Intl.DateTimeFormat('en-US', {
        timeZone: selected.tz,
        timeZoneName: 'longOffset',
      }).formatToParts(now);
      const nameParts = new Intl.DateTimeFormat('en-US', {
        timeZone: selected.tz,
        timeZoneName: 'short',
      }).formatToParts(now);
      const offset = offsetParts.find((p) => p.type === 'timeZoneName')?.value ?? '';
      const abbrev = nameParts.find((p) => p.type === 'timeZoneName')?.value ?? '';

      return {
        time: timeFormatter.format(now),
        date: dateFormatter.format(now),
        offset,
        abbrev,
      };
    } catch {
      return null;
    }
  }, [now, selected]);

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Autocomplete
        options={CITIES}
        getOptionLabel={(option) => `${option.city}, ${option.country}`}
        value={selected}
        onChange={(_, value) => value && setSelected(value)}
        isOptionEqualToValue={(a, b) => a.city === b.city && a.country === b.country}
        renderInput={(params) => <TextField {...params} label="Search for a city" fullWidth />}
      />

      <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="overline" color="text.secondary">
          {selected.city}, {selected.country}
        </Typography>
        <Typography variant="h3" fontWeight={800} sx={{ my: 1 }}>
          {info ? info.time : '--:--:--'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {info ? info.date : ''}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} color="primary.main">
          {info ? `${info.abbrev} · UTC${info.offset.replace('GMT', '')}` : ''}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {selected.tz}
        </Typography>
      </Paper>
    </Box>
  );
};

const TimeZoneFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Time Zone Finder Works</Typography>
      <Typography variant="body1">
        Search for a major world city and this tool instantly looks up its current timezone name, UTC offset,
        and live local time — updated every second using your browser&apos;s built-in timezone database. This is
        a lookup tool, not a converter: it tells you what timezone a city is in and what time it is there right
        now, rather than converting a specific time between two zones you already know.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;Tokyo&quot; instantly shows Japan Standard Time (JST), a UTC+09:00 offset, and the exact
        current local time in Tokyo, refreshing live as the seconds tick by.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly checking what timezone a city or region uses before scheduling a call.</li>
          <li>Looking up a city&apos;s current local time without doing manual offset math.</li>
          <li>Finding a city&apos;s UTC offset for travel planning or software configuration.</li>
          <li>Confirming whether a city currently observes daylight saving time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Time Zone Converter?</Typography>
      <Typography variant="body1">
        The Time Zone Converter takes a time you already have in one known timezone and converts it into
        another known timezone. This tool is a lookup instead — you search for a city and instantly see that
        city&apos;s current timezone name, UTC offset, and live local time, without needing to already know
        which timezone it uses.
      </Typography>
      <Typography variant="h3">Does this account for daylight saving time?</Typography>
      <Typography variant="body1">
        Yes — the offset and abbreviation shown update automatically for daylight saving transitions, based on
        your browser&apos;s timezone database.
      </Typography>
      <Typography variant="h3">Why do some cities share the same timezone?</Typography>
      <Typography variant="body1">
        Many countries and regions standardize on a single timezone across a wide area — for example, Mumbai
        and New Delhi both use India Standard Time, and Beijing and Shanghai both use China Standard Time, even
        though the cities are geographically distant.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/time-zone-finder" content={content}>
      <TimeZoneFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TimeZoneFinder;
