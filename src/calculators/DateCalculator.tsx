'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

const DateCalculator = () => {
  const [tab, setTab] = useState<'diff' | 'add'>('diff');

  // Difference tab
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]); // +30 days

  // Add/Sub tab
  const [baseDate, setBaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState<'add' | 'sub'>('add');
  const [addYears, setAddYears] = useState<number>(0);
  const [addMonths, setAddMonths] = useState<number>(0);
  const [addDays, setAddDays] = useState<number>(30);

  // Calculate Diff
  let diffDays = 0;
  let diffMonths = 0;
  let diffYears = 0;
  
  if (tab === 'diff') {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
      const timeDiff = Math.abs(d2.getTime() - d1.getTime());
      diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      
      const early = d1 < d2 ? d1 : d2;
      const late = d1 < d2 ? d2 : d1;
      
      diffYears = late.getFullYear() - early.getFullYear();
      diffMonths = late.getMonth() - early.getMonth();
      let d = late.getDate() - early.getDate();

      if (d < 0) {
        diffMonths--;
        // add days of previous month
        const prevMonth = new Date(late.getFullYear(), late.getMonth(), 0);
        d += prevMonth.getDate();
      }
      
      if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
      }
    }
  }

  // Calculate Add
  let resultDateStr = '';
  if (tab === 'add') {
    const d = new Date(baseDate);
    if (!isNaN(d.getTime())) {
      const multiplier = operation === 'add' ? 1 : -1;
      d.setFullYear(d.getFullYear() + (addYears * multiplier));
      d.setMonth(d.getMonth() + (addMonths * multiplier));
      d.setDate(d.getDate() + (addDays * multiplier));
      resultDateStr = d.toDateString();
    }
  }

  const content = (
    <>
      <Typography variant="h2">Online Date Calculator</Typography>
      <Typography variant="body1">
        This calculator allows you to perform two main date operations:
      </Typography>
      <ul>
        <li><strong>Calculate Duration:</strong> Find the exact number of days, months, and years between any two given dates.</li>
        <li><strong>Add or Subtract Time:</strong> Enter a starting date and add or subtract years, months, and days to find the resulting date.</li>
      </ul>
      <Typography variant="body1">
        Whether you are planning a project timeline, counting down to a vacation, or checking a warranty period, this tool provides instant and accurate results.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Date Calculator"
      description="Calculate days between two dates, or add and subtract days from a specific date."
      url="/utilities/date-calculator"
      content={content}
    >
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          color="primary"
          value={tab}
          exclusive
          onChange={(_, value) => { if (value) setTab(value); }}
        >
          <ToggleButton value="diff" sx={{ px: 4, fontWeight: 600 }}>Duration Between Dates</ToggleButton>
          <ToggleButton value="add" sx={{ px: 4, fontWeight: 600 }}>Add/Subtract Time</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {tab === 'diff' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom>Start Date</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom>End Date</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
            <Button variant="outlined" onClick={() => { const today = new Date().toISOString().split('T')[0]; const plus30 = new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]; setStartDate(today); setEndDate(plus30); }}>Reset to Today</Button>
          </Box>
          <Box>
            <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>Duration</Typography>
              
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
                {diffDays.toLocaleString()} Days
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Or
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
                {diffYears} Years, {diffMonths} Months
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {tab === 'add' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          <Box>
            <Box sx={{ mb: 4 }}>
              <Typography gutterBottom>Start Date</Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <ToggleButtonGroup
                color="primary"
                value={operation}
                exclusive
                onChange={(_, value) => { if (value) setOperation(value); }}
                fullWidth
              >
                <ToggleButton value="add" sx={{ fontWeight: 600 }}>Add (+)</ToggleButton>
                <ToggleButton value="sub" sx={{ fontWeight: 600 }}>Subtract (-)</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 4 }}>
              <TextField label="Years" type="number"
              onFocus={(e) => e.target.select()} value={addYears} onChange={(e) => setAddYears(Number(e.target.value))} />
              <TextField label="Months" type="number"
              onFocus={(e) => e.target.select()} value={addMonths} onChange={(e) => setAddMonths(Number(e.target.value))} />
              <TextField label="Days" type="number"
              onFocus={(e) => e.target.select()} value={addDays} onChange={(e) => setAddDays(Number(e.target.value))} />
            </Box>
          </Box>
          <Box>
            <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>Result Date</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', my: 2 }}>
                {resultDateStr}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </CalculatorShell>
  );
};

export default DateCalculator;
