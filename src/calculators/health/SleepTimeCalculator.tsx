'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SleepTimeCalculatorContent = () => {
  const [wakeHour, setWakeHour] = useState<number>(7);
  const [wakeMinute, setWakeMinute] = useState<number>(0);
  const [wakeAmPm, setWakeAmPm] = useState<string>('AM');

  const [sleepHour, setSleepHour] = useState<number>(10);
  const [sleepMinute, setSleepMinute] = useState<number>(30);
  const [sleepAmPm, setSleepAmPm] = useState<string>('PM');

  const calculateBedtimes = () => {
    const times = [];
    let h = wakeHour;
    if (wakeAmPm === 'PM' && h !== 12) h += 12;
    if (wakeAmPm === 'AM' && h === 12) h = 0;
    
    let date = new Date();
    date.setHours(h, wakeMinute, 0, 0);

    // Sleep cycles are usually 90 minutes. It takes ~15 mins to fall asleep.
    for (let cycles = 6; cycles >= 3; cycles--) {
      const msToSubtract = (cycles * 90 + 15) * 60000;
      const bedTime = new Date(date.getTime() - msToSubtract);
      times.push({
        cycles,
        time: bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    return times;
  };

  const calculateWakeTimes = () => {
    const times = [];
    let h = sleepHour;
    if (sleepAmPm === 'PM' && h !== 12) h += 12;
    if (sleepAmPm === 'AM' && h === 12) h = 0;
    
    let date = new Date();
    date.setHours(h, sleepMinute, 0, 0);

    // Sleep cycles are usually 90 minutes. Add 15 mins to fall asleep.
    const sleepStart = new Date(date.getTime() + 15 * 60000);

    for (let cycles = 3; cycles <= 6; cycles++) {
      const msToAdd = cycles * 90 * 60000;
      const wakeTime = new Date(sleepStart.getTime() + msToAdd);
      times.push({
        cycles,
        time: wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    return times;
  };

  const bedtimes = calculateBedtimes();
  const wakeTimes = calculateWakeTimes();

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* If I need to wake up at... */}
      <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, bgcolor: 'action.hover' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WbSunnyIcon color="warning" />
          <Typography variant="h6" fontWeight="bold">I want to wake up at...</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Hour</InputLabel>
            <Select value={wakeHour} label="Hour" onChange={(e) => setWakeHour(Number(e.target.value))}>
              {Array.from({ length: 12 }).map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small">
            <InputLabel>Minute</InputLabel>
            <Select value={wakeMinute} label="Minute" onChange={(e) => setWakeMinute(Number(e.target.value))}>
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => (
                <MenuItem key={m} value={m}>{m.toString().padStart(2, '0')}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>AM/PM</InputLabel>
            <Select value={wakeAmPm} label="AM/PM" onChange={(e) => setWakeAmPm(e.target.value as string)}>
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            To wake up refreshed, try going to bed at one of these times (includes 15 min to fall asleep):
          </Typography>
          <Grid container spacing={2}>
            {bedtimes.map((bt, index) => (
              <Grid item xs={6} key={index}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: index === 0 ? 'primary.main' : 'white', color: index === 0 ? 'white' : 'text.primary' }}>
                  <Typography variant="h5" fontWeight="bold">{bt.time}</Typography>
                  <Typography variant="caption">{bt.cycles} Cycles ({bt.cycles * 1.5} hrs)</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      {/* If I go to sleep at... */}
      <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, bgcolor: '#f0fdf4' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BedtimeIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">I am going to sleep at...</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Hour</InputLabel>
            <Select value={sleepHour} label="Hour" onChange={(e) => setSleepHour(Number(e.target.value))}>
              {Array.from({ length: 12 }).map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth size="small">
            <InputLabel>Minute</InputLabel>
            <Select value={sleepMinute} label="Minute" onChange={(e) => setSleepMinute(Number(e.target.value))}>
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => (
                <MenuItem key={m} value={m}>{m.toString().padStart(2, '0')}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>AM/PM</InputLabel>
            <Select value={sleepAmPm} label="AM/PM" onChange={(e) => setSleepAmPm(e.target.value as string)}>
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            If you go to sleep now, try waking up at one of these times to feel rested:
          </Typography>
          <Grid container spacing={2}>
            {wakeTimes.map((wt, index) => (
              <Grid item xs={6} key={index}>
                <Paper sx={{ p: 2, textAlign: 'center', bgcolor: index === 3 ? 'success.main' : 'white', color: index === 3 ? 'white' : 'text.primary' }}>
                  <Typography variant="h5" fontWeight="bold">{wt.time}</Typography>
                  <Typography variant="caption">{wt.cycles} Cycles ({wt.cycles * 1.5} hrs)</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

    </Box>
  );
};

const SleepTimeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Sleep Cycle & Bedtime Calculator</Typography>
      <Typography variant="body1">
        A good night's sleep consists of 5-6 complete sleep cycles. Waking up in the middle of a sleep cycle can leave you feeling groggy and tired. Use this sleep clock calculator to find the perfect bedtime based on when you want to wake up, or find out when to set your alarm if you're going to sleep right now — it also works as a simple sleeping-hours calculator for any two times you enter.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choose whether you want to calculate a bedtime or a wake-up time.</li>
          <li>Enter your target time — the calculator adds ~15 minutes to fall asleep, then works in 90-minute cycles.</li>
          <li>Pick from the suggested times, each landing at the end of a complete sleep cycle.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example — How Many Hours of Sleep Is That?</Typography>
      <Typography variant="body1">
        If you need to wake up at 7:00 AM, going to bed around 11:15 PM or 9:45 PM lets you complete 5 or 6
        full 90-minute cycles, respectively, rather than waking mid-cycle. Beyond cycle planning, this bedtime
        calculator can also just answer the plain arithmetic question of &quot;how many hours of sleep is that?&quot;
        for a given bedtime and wake time:
      </Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sleep at 9:00 PM, wake at 5:00 AM → <strong>8 hours</strong> of sleep.</li>
          <li>Sleep at 10:00 PM, wake at 5:00 AM → <strong>7 hours</strong> of sleep.</li>
          <li>Sleep at 12:00 AM (midnight), wake at 8:00 AM → <strong>8 hours</strong> of sleep.</li>
          <li>Sleep at 10:00 PM, wake at 7:00 AM → <strong>9 hours</strong> of sleep.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning bedtime around a fixed wake-up alarm (bedtime calculator).</li>
          <li>Figuring out the best time to nap or go to bed after a late night.</li>
          <li>Quickly checking how many hours of sleep you got (or will get) between two clock times.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why 90-minute cycles?</Typography>
      <Typography variant="body1">
        A full sleep cycle (light sleep, deep sleep, REM) averages about 90 minutes. Waking up at the end of a
        cycle, rather than in the middle of deep sleep, generally feels less groggy.
      </Typography>
      <Typography variant="h3">How many hours of sleep is 9pm to 5am?</Typography>
      <Typography variant="body1">
        Sleeping from 9:00 PM to 5:00 AM is <strong>8 hours</strong> of sleep — that&apos;s 5 complete 90-minute
        sleep cycles plus a little extra.
      </Typography>
      <Typography variant="h3">If I sleep at 10 and wake up at 5, how many hours is that?</Typography>
      <Typography variant="body1">
        Sleeping from 10:00 PM to 5:00 AM is <strong>7 hours</strong> of sleep.
      </Typography>
      <Typography variant="h3">If I sleep at 12 and wake up at 8, how many hours is that?</Typography>
      <Typography variant="body1">
        Sleeping from 12:00 AM (midnight) to 8:00 AM is <strong>8 hours</strong> of sleep.
      </Typography>
      <Typography variant="h3">How many hours of sleep is 10 to 7?</Typography>
      <Typography variant="body1">
        Sleeping from 10:00 PM to 7:00 AM is <strong>9 hours</strong> of sleep.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Sleep Time Calculator"
      description="Calculate the best time to go to sleep or wake up based on 90-minute sleep cycles. Wake up feeling refreshed and energized."
      url="/health/sleep-time-calculator"
      content={content}
      category="Health"
    >
      <SleepTimeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SleepTimeCalculator;
