'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Maximum eclipse (global): 2027-08-02T10:07:50Z, near Egypt's Red Sea coast.
// Source: timeanddate.com / Wikipedia "Solar eclipse of August 2, 2027".
const NEXT_TOTAL_ECLIPSE = new Date('2027-08-02T10:07:50Z');

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getCountdown(target: Date): Countdown {
  const totalSeconds = Math.max(0, Math.floor((target.getTime() - Date.now()) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const NextSolarEclipseCountdownContent = () => {
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown(NEXT_TOTAL_ECLIPSE));

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown(NEXT_TOTAL_ECLIPSE)), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom fontWeight="600">
        Next total solar eclipse
      </Typography>
      <Typography variant="h4" color="primary" fontWeight="700" gutterBottom>
        August 2, 2027
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Maximum eclipse at 10:07 UTC, over the Red Sea coast of Egypt — 6 minutes 23 seconds of totality,
        the longest of the 21st century.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, my: 4 }}>
        {[
          { value: countdown.days, label: 'Days' },
          { value: countdown.hours, label: 'Hours' },
          { value: countdown.minutes, label: 'Minutes' },
          { value: countdown.seconds, label: 'Seconds' },
        ].map((item) => (
          <Paper key={item.label} variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="700" color="primary">
              {item.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
          </Paper>
        ))}
      </Box>

      <Typography variant="body2" color="text.secondary">
        The countdown above is to the moment of maximum eclipse (UTC). Local start, totality, and end times
        vary by location along the path — check{' '}
        <a href="https://www.timeanddate.com/eclipse/solar/2027-august-2" target="_blank" rel="noopener noreferrer">
          timeanddate.com
        </a>{' '}
        for your exact local time.
      </Typography>
    </Paper>
  );
};

const NextSolarEclipseCountdown = () => {
  const content = (
    <>
      <Typography variant="h2">How this eclipse countdown works</Typography>
      <Typography variant="body1">
        This page counts down live, second by second, to the next total solar eclipse: August 2, 2027. It
        will be the longest total solar eclipse over land so far this century, with up to 6 minutes 23
        seconds of totality — not matched again until 2114.
      </Typography>
      <Alert severity="info" sx={{ my: 2 }}>
        The most recent solar eclipse — a total solar eclipse crossing Greenland, Iceland, and Spain — took
        place on August 12, 2026. This countdown looks ahead to the next one.
      </Alert>

      <Typography variant="h2">Where will the August 2027 eclipse be visible?</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>The path of totality crosses southern Spain, Gibraltar, Morocco, Algeria, Tunisia, Libya, Egypt, Saudi Arabia, Somalia, and Yemen.</li>
          <li>Totality passes directly over Luxor&apos;s Valley of the Kings and the Great Pyramid of Giza in Egypt, and near Mecca in Saudi Arabia.</li>
          <li>Maximum eclipse — the point of longest totality — occurs over the Red Sea near the Egyptian coast at 10:07 UTC.</li>
          <li>A much wider region across Europe, Africa, and the Middle East will see a partial eclipse outside the path of totality.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example: reading the countdown</Typography>
      <Typography variant="body1">
        If today is January 15, 2027, the countdown above would show roughly &quot;199 days, 18 hours, 52
        minutes, 50 seconds&quot; — ticking down live to 10:07 UTC on August 2, 2027, the moment of maximum
        eclipse over the Red Sea.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking how much time remains until the next total solar eclipse.</li>
          <li>Checking whether your location falls within the path of totality before booking travel.</li>
          <li>Planning a trip to view the &quot;eclipse of the century&quot; in Egypt, Saudi Arabia, or along its path.</li>
          <li>Classroom or science-communication use to build excitement around an upcoming eclipse.</li>
        </ul>
      </Box>

      <Typography variant="h2">Other upcoming eclipses</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>February 6, 2027</strong> — Annular solar eclipse visible from parts of Chile, Argentina, and coastal West Africa.</li>
          <li><strong>August 2, 2027</strong> — Total solar eclipse (this countdown), the longest of the century.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">When is the next solar eclipse?</Typography>
      <Typography variant="body1">
        The next total solar eclipse is on August 2, 2027. An earlier annular solar eclipse occurs on
        February 6, 2027, though it&apos;s visible from a much smaller, more remote area.
      </Typography>
      <Typography variant="h3">Why is the August 2027 eclipse called the &quot;eclipse of the century&quot;?</Typography>
      <Typography variant="body1">
        At up to 6 minutes 23 seconds, it&apos;s the longest total solar eclipse over land anywhere in the
        21st century — a duration not matched again until 2114 — and its path crosses several major cities
        and landmarks across North Africa and the Middle East.
      </Typography>
      <Typography variant="h3">Does this countdown update automatically?</Typography>
      <Typography variant="body1">
        Yes — the timer ticks every second in real time, counting down to the moment of maximum eclipse in
        UTC.
      </Typography>
      <Typography variant="h3">Will I be able to see it from where I live?</Typography>
      <Typography variant="body1">
        Only locations within the path of totality (southern Spain through the Middle East) will see a total
        eclipse; much of Europe, Africa, and Asia will see a partial eclipse instead. Check{' '}
        <a href="https://www.timeanddate.com/eclipse/solar/2027-august-2" target="_blank" rel="noopener noreferrer">
          timeanddate.com
        </a>{' '}
        for visibility at your specific location.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/solar-eclipse-countdown" content={content}>
      <NextSolarEclipseCountdownContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NextSolarEclipseCountdown;
