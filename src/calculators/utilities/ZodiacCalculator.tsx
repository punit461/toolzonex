'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SIGNS: { name: string; symbol: string; startMonth: number; startDay: number; endMonth: number; endDay: number; range: string }[] = [
  { name: 'Capricorn', symbol: '♑', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, range: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', symbol: '♒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, range: 'Jan 20 - Feb 18' },
  { name: 'Pisces', symbol: '♓', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, range: 'Feb 19 - Mar 20' },
  { name: 'Aries', symbol: '♈', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, range: 'Mar 21 - Apr 19' },
  { name: 'Taurus', symbol: '♉', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, range: 'Apr 20 - May 20' },
  { name: 'Gemini', symbol: '♊', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20, range: 'May 21 - Jun 20' },
  { name: 'Cancer', symbol: '♋', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22, range: 'Jun 21 - Jul 22' },
  { name: 'Leo', symbol: '♌', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, range: 'Jul 23 - Aug 22' },
  { name: 'Virgo', symbol: '♍', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, range: 'Aug 23 - Sep 22' },
  { name: 'Libra', symbol: '♎', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, range: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', symbol: '♏', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, range: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', symbol: '♐', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, range: 'Nov 22 - Dec 21' },
];

function getSign(month: number, day: number) {
  return SIGNS.find((s) => (month === s.startMonth && day >= s.startDay) || (month === s.endMonth && day <= s.endDay)) ?? null;
}

const ZodiacCalculator = () => {
  const [birthDate, setBirthDate] = useState<string>('1990-06-15');

  const sign = useMemo(() => {
    const parts = birthDate.split('-');
    if (parts.length !== 3) return null;
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);
    if (Number.isNaN(month) || Number.isNaN(day)) return null;
    return getSign(month, day);
  }, [birthDate]);

  const content = (
    <>
      <Typography variant="h2">How to Find Your Western Zodiac Sign</Typography>
      <Typography variant="body1">
        The Western zodiac assigns one of 12 signs based purely on your birth month and day, following a fixed
        set of date ranges that repeat every year. Enter your date of birth and this tool matches it against
        the standard reference ranges below to show your sign.
      </Typography>

      <Typography variant="h2">Zodiac Sign Date Ranges</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          {SIGNS.map((s) => (
            <li key={s.name}>{s.symbol} {s.name}: {s.range}</li>
          ))}
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Someone born on June 15 falls between Gemini&apos;s end (June 20) and Cancer&apos;s start (June 21), so
        June 15 lands within the Gemini range (May 21 - Jun 20), making their sign Gemini.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly looking up your own or a friend&apos;s zodiac sign for astrology apps or horoscope sites.</li>
          <li>Checking the sign for someone whose birthday falls near a cusp date.</li>
          <li>Reference for compatibility charts, birthday cards, or personality quizzes based on zodiac sign.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if my birthday falls right on a cusp date?</Typography>
      <Typography variant="body1">
        The date ranges used here are the most widely cited standard boundaries, but some astrologers use
        slightly different cusp dates depending on the year (since the sun&apos;s position shifts by about a
        day over time). If your birthday is exactly on a boundary date, you may see slightly different signs
        listed elsewhere.
      </Typography>
      <Typography variant="h3">Is this the same as my Chinese zodiac sign?</Typography>
      <Typography variant="body1">
        No — this calculator covers the Western (tropical) zodiac, based on the sun&apos;s position relative to
        Earth on your birth date. The Chinese zodiac instead assigns a 12-year cycle of animal signs based on
        birth year, which is a completely separate system.
      </Typography>
      <Typography variant="h3">Does the year of birth matter for the Western zodiac sign?</Typography>
      <Typography variant="body1">
        No — only the month and day matter. The sign date ranges repeat identically every calendar year, so two
        people born on the same month and day always share the same Western zodiac sign regardless of birth
        year.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/zodiac-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'center' }}>
        <TextField
          fullWidth
          label="Date of Birth"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover' }}>
          {sign ? (
            <>
              <Typography variant="h1" sx={{ fontSize: '3rem', mb: 1 }}>{sign.symbol}</Typography>
              <Typography variant="h4" fontWeight={800} color="primary.main">{sign.name}</Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>{sign.range}</Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter a valid date to see your sign</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ZodiacCalculator;
