import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

const AgeCalculator = () => {
  const [dob, setDob] = useState<string>('1990-01-01');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const { years, months, days, nextBirthday } = useMemo(() => {
    const d1 = new Date(dob);
    const d2 = new Date(targetDate);
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime()) || d1 > d2) {
      return { years: 0, months: 0, days: 0, nextBirthday: null };
    }

    let y = d2.getFullYear() - d1.getFullYear();
    let m = d2.getMonth() - d1.getMonth();
    let d = d2.getDate() - d1.getDate();

    if (d < 0) {
      m--;
      const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      d += prevMonth.getDate();
    }
    
    if (m < 0) {
      y--;
      m += 12;
    }

    const nextBday = new Date(d1);
    nextBday.setFullYear(d2.getFullYear());
    if (nextBday <= d2) {
      nextBday.setFullYear(d2.getFullYear() + 1);
    }
    const diffTime = nextBday.getTime() - d2.getTime();
    const nextBdayDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { years: y, months: m, days: d, nextBirthday: nextBdayDays };
  }, [dob, targetDate]);

  const content = (
    <>
      <Typography variant="h2">How to use the Age Calculator?</Typography>
      <Typography variant="body1">
        Simply enter your Date of Birth and the date up to which you want to calculate your age (this defaults to today). The calculator will instantly display your exact age in years, months, and days.
      </Typography>

      <Typography variant="h2">Why is exact age calculation important?</Typography>
      <Typography variant="body1">
        Exact age calculation is crucial for various official purposes such as applying for government exams, passport applications, insurance policies, and calculating retirement benefits. Often, age cut-offs are specific down to the exact day.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days based on your date of birth."
      url="/utilities/age-calculator"
      content={content}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Date of Birth</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Calculate Age At</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                }
              }}
            />
          </Box>
          
          <Button 
            variant="outlined" 
            fullWidth 
            onClick={() => setTargetDate(new Date().toISOString().split('T')[0])}
          >
            Reset to Today
          </Button>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Exact Age</Typography>
            
            <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, textAlign: 'center' }}>
              {years} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#404040' }}>Years</span><br/>
              {months} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#404040' }}>Months</span><br/>
              {days} <span style={{ fontSize: '1.5rem', fontWeight: 500, color: '#404040' }}>Days</span>
            </Typography>

            {nextBirthday !== null && (
              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #E5E5E5', width: '100%', textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Your next birthday is in <strong>{nextBirthday} days</strong>.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </CalculatorShell>
  );
};

export default AgeCalculator;
