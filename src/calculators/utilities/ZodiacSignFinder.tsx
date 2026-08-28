'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ParkIcon from '@mui/icons-material/Park';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ZodiacSign {
  name: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  element: string;
  rulingPlanet: string;
  dateRange: string;
  description: string;
}

const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: 'Capricorn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, element: 'Earth', rulingPlanet: 'Saturn', dateRange: 'Dec 22 – Jan 19', description: 'Ambitious, disciplined, and practical. Capricorns are known for their determination and responsibility.' },
  { name: 'Aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, element: 'Air', rulingPlanet: 'Uranus', dateRange: 'Jan 20 – Feb 18', description: 'Innovative, independent, and humanitarian. Aquarians are visionaries who think outside the box.' },
  { name: 'Pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, element: 'Water', rulingPlanet: 'Neptune', dateRange: 'Feb 19 – Mar 20', description: 'Compassionate, artistic, and intuitive. Pisces are deeply empathetic and creative souls.' },
  { name: 'Aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, element: 'Fire', rulingPlanet: 'Mars', dateRange: 'Mar 21 – Apr 19', description: 'Energetic, courageous, and confident. Aries are natural leaders who love a challenge.' },
  { name: 'Taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, element: 'Earth', rulingPlanet: 'Venus', dateRange: 'Apr 20 – May 20', description: 'Reliable, patient, and sensuous. Taurus values stability, comfort, and the finer things in life.' },
  { name: 'Gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20, element: 'Air', rulingPlanet: 'Mercury', dateRange: 'May 21 – Jun 20', description: 'Versatile, curious, and communicative. Geminis are quick-witted and love socializing.' },
  { name: 'Cancer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22, element: 'Water', rulingPlanet: 'Moon', dateRange: 'Jun 21 – Jul 22', description: 'Nurturing, intuitive, and protective. Cancers are deeply connected to home and family.' },
  { name: 'Leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, element: 'Fire', rulingPlanet: 'Sun', dateRange: 'Jul 23 – Aug 22', description: 'Charismatic, generous, and dramatic. Leos are born performers who love being in the spotlight.' },
  { name: 'Virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, element: 'Earth', rulingPlanet: 'Mercury', dateRange: 'Aug 23 – Sep 22', description: 'Analytical, meticulous, and helpful. Virgos pay attention to detail and strive for perfection.' },
  { name: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, element: 'Air', rulingPlanet: 'Venus', dateRange: 'Sep 23 – Oct 22', description: 'Diplomatic, charming, and fair-minded. Libras seek balance and harmony in all things.' },
  { name: 'Scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, element: 'Water', rulingPlanet: 'Pluto', dateRange: 'Oct 23 – Nov 21', description: 'Intense, passionate, and perceptive. Scorpios are deeply emotional and fiercely loyal.' },
  { name: 'Sagittarius', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, element: 'Fire', rulingPlanet: 'Jupiter', dateRange: 'Nov 22 – Dec 21', description: 'Adventurous, optimistic, and philosophical. Sagittarius loves freedom and exploring new horizons.' },
];

const elementIcons: Record<string, React.ReactNode> = {
  Fire: <WhatshotIcon sx={{ color: '#e53935' }} />,
  Earth: <ParkIcon sx={{ color: '#66bb6a' }} />,
  Air: <AirIcon sx={{ color: '#42a5f5' }} />,
  Water: <WaterDropIcon sx={{ color: '#5c6bc0' }} />,
};

const elementColors: Record<string, string> = {
  Fire: '#fdecea',
  Earth: '#e8f5e9',
  Air: '#e3f2fd',
  Water: '#e8eaf6',
};

function getZodiacSign(month: number, day: number): ZodiacSign {
  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth === sign.endMonth) {
      if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) return sign;
    } else if (sign.startMonth > sign.endMonth) {
      if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) return sign;
    } else {
      if ((month === sign.startMonth && day >= sign.startDay) || (month === sign.endMonth && day <= sign.endDay)) return sign;
    }
  }
  return ZODIAC_SIGNS[0];
}

const ZodiacSignFinder = () => {
  const [date, setDate] = useState<string>('');

  const sign = useMemo(() => {
    if (!date) return null;
    const [year, month, day] = date.split('-').map(Number);
    return getZodiacSign(month, day);
  }, [date]);

  const content = (
    <>
      <Typography variant="h2">How is Your Zodiac Sign Determined?</Typography>
      <Typography variant="body1">
        Your zodiac sign (also called a sun sign or star sign) is determined by the position of the Sun
        at the time of your birth. There are 12 zodiac signs, each associated with a specific date range,
        an element (fire, earth, air, or water), and a ruling planet.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If you were born on July 28, your zodiac sign is Leo (July 23 – Aug 22). Leo is a fire sign
        ruled by the Sun, known for its charisma and leadership qualities.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Discovering your sun sign based on your birthday.</li>
          <li>Learning about the element and ruling planet associated with your sign.</li>
          <li>Exploring the personality traits linked to each of the 12 zodiac signs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between sun, moon, and rising signs?</Typography>
      <Typography variant="body1">
        Your sun sign is determined by the Sun's position at birth and represents your core identity. Your
        moon sign is based on the Moon's position and reflects your emotions. Your rising sign (ascendant)
        is based on the zodiac sign on the eastern horizon at birth and influences your outward persona.
        This tool calculates only your sun sign.
      </Typography>
      <Typography variant="h3">Can the dates change year to year?</Typography>
      <Typography variant="body1">
        The exact dates can shift by a day or two from year to year due to the Gregorian calendar and
        leap years. The dates used here are the most widely accepted standard ranges.
      </Typography>
      <Typography variant="h3">What do the elements mean?</Typography>
      <Typography variant="body1">
        Fire signs (Aries, Leo, Sagittarius) are passionate and energetic. Earth signs (Taurus, Virgo,
        Capricorn) are grounded and practical. Air signs (Gemini, Libra, Aquarius) are intellectual and
        social. Water signs (Cancer, Scorpio, Pisces) are emotional and intuitive.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/zodiac-sign-finder" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <TextField
            label="Your Birthday"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Paper>

        {sign && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: elementColors[sign.element] || 'action.hover' }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {elementIcons[sign.element]}
                <Typography variant="h4" fontWeight={700}>{sign.name}</Typography>
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Element</Typography>
                  <Typography variant="h6">{sign.element}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Ruling Planet</Typography>
                  <Typography variant="h6">{sign.rulingPlanet}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Date Range</Typography>
                  <Typography variant="h6">{sign.dateRange}</Typography>
                </Box>
              </Box>
              <Typography variant="body1">{sign.description}</Typography>
            </Stack>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ZodiacSignFinder;
