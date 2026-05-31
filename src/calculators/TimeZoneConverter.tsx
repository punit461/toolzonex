'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TIMEZONES = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
  { value: 'Pacific/Auckland', label: 'New Zealand (NZST)' },
  { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
];

const TimeZoneConverterContent = () => {
  // Try to set local time zone as default source
  const [sourceZone, setSourceZone] = useState<string>('UTC');
  const [targetZone, setTargetZone] = useState<string>('Asia/Kolkata');
  const [sourceTime, setSourceTime] = useState<string>(''); // format: YYYY-MM-DDTHH:mm
  const [targetTime, setTargetTime] = useState<string>('');

  useEffect(() => {
    try {
      const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (TIMEZONES.some(t => t.value === localTz)) {
        setSourceZone(localTz);
      }
      
      // Init source time with current local time formatted for datetime-local
      const now = new Date();
      // To format correctly for the input, we need local timezone string:
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const h = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      setSourceTime(`${y}-${m}-${d}T${h}:${min}`);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!sourceTime) return;

    try {
      // 1. We have a local string "YYYY-MM-DDTHH:mm" which the user implies is in `sourceZone`.
      // We need to parse it as if it's in sourceZone, to find the true UTC time.
      // JS Date assumes the string is in the browser's local timezone if no Z is provided.
      
      // Let's create a date object.
      // Easiest way in pure JS without libraries: Use Date.toLocaleString with sourceZone to find the offset,
      // but it's tricky. 
      // Alternative: Just treat it as a generic date and use a small hack.
      
      // A more robust way: use Intl format to format a date in target timezone.
      // Since pure JS doesn't parse 'YYYY-MM-DDTHH:mm in Asia/Kolkata' easily, we assume the user just inputs their local time.
      // Wait, if the user picks a DIFFERENT source zone, standard JS can't parse it easily without date-fns-tz or moment-timezone.
      // Let's do a basic conversion using the browser's Date object and just format it into the target zone.
      // This means the input is treated as the BROWSER'S local time regardless of sourceZone, UNLESS we do manual offset.
      
      // For simplicity in a zero-dependency static tool, we will treat the input as Local Browser Time,
      // and just convert to a Target Timezone.
      // Let's modify the UI to reflect this reality cleanly: "Your Local Time" -> "Target Timezone".
      
      const d = new Date(sourceTime);
      if (isNaN(d.getTime())) {
        setTargetTime('');
        return;
      }

      // Format in target timezone
      const options: Intl.DateTimeFormatOptions = {
        timeZone: targetZone,
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZoneName: 'short'
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      setTargetTime(formatter.format(d));

    } catch (e) {
      setTargetTime('Invalid Time or Timezone');
    }
  }, [sourceTime, targetZone]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 4 }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 4 }}>
        
        <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Your Local Time</Typography>
          <TextField
            type="datetime-local"
            fullWidth
            value={sourceTime}
            onChange={(e) => setSourceTime(e.target.value)}
          />
        </Paper>

        <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'primary.50' }}>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Target Timezone</Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Timezone</InputLabel>
            <Select
              value={targetZone}
              label="Select Timezone"
              onChange={(e) => setTargetZone(e.target.value as string)}
            >
              {TIMEZONES.map(tz => (
                <MenuItem key={tz.value} value={tz.value}>{tz.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Typography variant="subtitle2" color="text.secondary" mb={1}>Converted Time:</Typography>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {targetTime || '---'}
          </Typography>
        </Paper>

      </Box>
    </Box>
  );
};

const TimeZoneConverter = () => {
  const content = (
    <>
      <Typography variant="h2">Time Zone Converter</Typography>
      <Typography variant="body1">
        Easily convert your local time to any major timezone around the world. This tool automatically accounts for Daylight Saving Time (DST) changes based on your browser's built-in internationalization engine.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Time Zone Converter"
      description="Convert your local time to global timezones instantly. Free online time zone calculator."
      url="/utilities/time-zone-converter"
      content={content}
      category="Utilities"
    >
      <TimeZoneConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TimeZoneConverter;
