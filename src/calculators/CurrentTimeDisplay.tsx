'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, Autocomplete, Button } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney"
];

const CurrentTimeDisplayContent = () => {
  const [now, setNow] = useState<Date>(new Date());
  const [selectedZones, setSelectedZones] = useState<string[]>(["Asia/Kolkata", "America/New_York", "Europe/London", "Asia/Tokyo"]);
  
  // To avoid hydration mismatch, only render client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDate = (date: Date, timeZone: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getOffsetString = (timeZone: string) => {
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' });
    const parts = formatter.formatToParts(new Date());
    const offsetPart = parts.find(p => p.type === 'timeZoneName');
    return offsetPart ? offsetPart.value : timeZone;
  };

  if (!mounted) return null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      {/* Local Time (Hero) */}
      <Paper 
        sx={{ 
          p: 6, 
          textAlign: 'center', 
          bgcolor: 'primary.main', 
          color: 'white', 
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h5" sx={{ opacity: 0.9, mb: 1 }}>Your Local Time</Typography>
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 800, 
            fontFamily: 'monospace',
            fontSize: { xs: '3rem', sm: '5rem', md: '6rem' },
            letterSpacing: -1,
            mb: 1
          }}
        >
          {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(now)}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          {new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(now)}
        </Typography>
      </Paper>

      {/* World Clocks */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">World Clocks</Typography>
          <Autocomplete
            multiple
            options={TIMEZONES.filter(z => !selectedZones.includes(z))}
            value={[]}
            onChange={(e, newValue) => {
              if (newValue.length > 0) {
                setSelectedZones([...selectedZones, newValue[newValue.length - 1]]);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" size="small" placeholder="Add Timezone" sx={{ minWidth: 200 }} />
            )}
            disableClearable
          />
        </Box>

        <Grid container spacing={3}>
          {selectedZones.map(zone => (
            <Grid item xs={12} sm={6} md={4} key={zone}>
              <Paper variant="outlined" sx={{ p: 3, position: 'relative' }}>
                <Typography variant="overline" color="primary" fontWeight="bold">
                  {zone.split('/')[1]?.replace('_', ' ') || zone}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ position: 'absolute', top: 24, right: 24 }}>
                  {getOffsetString(zone)}
                </Typography>
                
                <Typography variant="h4" sx={{ mt: 1, mb: 0.5, fontWeight: 'bold', fontFamily: 'monospace' }}>
                  {formatTime(now, zone)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(now, zone)}
                </Typography>
                
                <Button 
                  size="small" 
                  color="error" 
                  sx={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.5, '&:hover': { opacity: 1 } }}
                  onClick={() => setSelectedZones(selectedZones.filter(z => z !== zone))}
                >
                  Remove
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

const CurrentTimeDisplay = () => {
  const content = (
    <>
      <Typography variant="h2">Current Time & World Clock</Typography>
      <Typography variant="body1">
        Check the exact current time in your location and across the globe. Add or remove timezones to keep track of international times for meetings, travel, or global events.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Current Time Display"
      description="View the exact current local time and track timezones across the world with our interactive world clock."
      url="/utilities/current-time-display"
      content={content}
      category="Utilities"
    >
      <CurrentTimeDisplayContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CurrentTimeDisplay;
