'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Fallback list used only if the browser doesn't support Intl.supportedValuesOf('timeZone').
const FALLBACK_ZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
  'America/Anchorage', 'Pacific/Honolulu', 'America/Toronto', 'America/Vancouver',
  'America/Mexico_City', 'America/Sao_Paulo', 'America/Argentina/Buenos_Aires', 'America/Bogota',
  'America/Lima', 'America/Santiago', 'Europe/London', 'Europe/Dublin', 'Europe/Lisbon',
  'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid', 'Europe/Rome', 'Europe/Amsterdam',
  'Europe/Zurich', 'Europe/Vienna', 'Europe/Stockholm', 'Europe/Oslo', 'Europe/Helsinki',
  'Europe/Warsaw', 'Europe/Athens', 'Europe/Moscow', 'Europe/Istanbul', 'Africa/Cairo',
  'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Nairobi', 'Asia/Dubai', 'Asia/Riyadh',
  'Asia/Tehran', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Dhaka', 'Asia/Bangkok', 'Asia/Jakarta',
  'Asia/Kuala_Lumpur', 'Asia/Singapore', 'Asia/Manila', 'Asia/Hong_Kong', 'Asia/Shanghai',
  'Asia/Seoul', 'Asia/Tokyo', 'Australia/Perth', 'Australia/Adelaide', 'Australia/Sydney',
  'Australia/Melbourne', 'Australia/Brisbane', 'Pacific/Auckland', 'Pacific/Fiji',
  'Atlantic/Reykjavik', 'Atlantic/Azores', 'Indian/Maldives', 'Asia/Yerevan', 'Asia/Baku',
  'Asia/Tbilisi', 'Asia/Almaty', 'Asia/Kathmandu', 'Asia/Yangon', 'Asia/Ho_Chi_Minh',
  'Asia/Taipei', 'Asia/Ulaanbaatar', 'America/Halifax', 'America/St_Johns', 'America/Caracas',
  'America/La_Paz', 'America/Montevideo', 'Africa/Casablanca', 'Africa/Algiers',
  'Africa/Accra', 'Africa/Addis_Ababa', 'Europe/Kyiv', 'Europe/Bucharest', 'Europe/Budapest',
  'Europe/Prague', 'Europe/Copenhagen', 'Europe/Brussels',
];

function getZoneList(): string[] {
  try {
    if (typeof Intl.supportedValuesOf === 'function') {
      const zones = Intl.supportedValuesOf('timeZone');
      if (zones && zones.length > 0) return zones;
    }
  } catch {
    // fall through to fallback list
  }
  return FALLBACK_ZONES;
}

const TimezoneListViewerContent = () => {
  const [search, setSearch] = useState('');
  const [now, setNow] = useState<Date | null>(null);
  const zones = useMemo(() => getZoneList(), []);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q ? zones.filter((z) => z.toLowerCase().includes(q)) : zones;
    return list.slice(0, 300);
  }, [zones, search]);

  const rows = useMemo(() => {
    if (!now) return [];
    return filtered.map((tz) => {
      try {
        const offsetParts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' }).formatToParts(now);
        const offset = offsetParts.find((p) => p.type === 'timeZoneName')?.value?.replace('GMT', 'UTC') ?? 'UTC';
        const time = new Intl.DateTimeFormat('en-US', {
          timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
        }).format(now);
        return { tz, offset, time };
      } catch {
        return { tz, offset: '—', time: '—' };
      }
    });
  }, [filtered, now]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Search timezones"
        placeholder="e.g. America, Tokyo, UTC+5"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
      <Typography variant="body2" color="text.secondary">
        Showing {rows.length} of {zones.length} timezones{filtered.length > 300 ? ' (search to narrow the list)' : ''}
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 560 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Timezone</TableCell>
              <TableCell>UTC Offset</TableCell>
              <TableCell>Current Local Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.tz} hover>
                <TableCell sx={{ fontFamily: 'monospace' }}>{row.tz}</TableCell>
                <TableCell>{row.offset}</TableCell>
                <TableCell sx={{ fontFamily: 'monospace' }}>{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const TimezoneListViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Timezone List Viewer</Typography>
      <Typography variant="body1">
        This tool lists every IANA timezone your browser knows about — typically all ~400 standard zones via{' '}
        <code>Intl.supportedValuesOf('timeZone')</code>, with a static fallback list of common zones if your
        browser doesn't support that API — alongside each zone's current UTC offset and live local time,
        updating every second. Use the search box to filter the list down by region or city name (like
        &quot;America&quot; or &quot;Tokyo&quot;) instead of scrolling through hundreds of rows.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing &quot;Kolkata&quot; into the search box filters the table down to{' '}
        <code>Asia/Kolkata</code>, showing its current UTC offset (+05:30) and live local time updating in
        real time.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Browsing all available timezones at once to compare current times across many regions.</li>
          <li>Finding the exact IANA timezone identifier (like <code>Europe/Berlin</code>) to use in code or configuration.</li>
          <li>Scanning for a timezone whose current UTC offset matches a specific value you need.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Time Zone Finder?</strong> The Time Zone Finder helps you find ONE specific timezone by searching for a city — you type a place and get back that single zone's details. This Timezone List Viewer instead shows a browsable reference table of every IANA timezone at once, all with their current times live, so you can scan or filter across the whole list rather than looking up one place at a time.</li>
          <li><strong>How is this different from the Time Zone Converter?</strong> The Time Zone Converter takes a specific date and time and converts it between two timezones you choose. This tool doesn't convert a time you provide at all — it's a live reference list showing the current moment across every timezone simultaneously.</li>
          <li><strong>Why do some rows show &quot;—&quot; instead of a time?</strong> That happens only if your browser's built-in timezone database doesn't recognize a fallback-list entry it hasn't loaded — recognized zones (which is the vast majority) always render correctly.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/timezone-list-viewer" content={content}>
      <TimezoneListViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TimezoneListViewer;
