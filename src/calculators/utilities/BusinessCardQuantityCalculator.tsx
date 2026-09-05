'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BusinessCardQuantityCalculator = () => {
  const [employees, setEmployees] = useState('10');
  const [cardsPerPerson, setCardsPerPerson] = useState('250');
  const [buffer, setBuffer] = useState('10');
  const [cardsPerBox, setCardsPerBox] = useState('250');

  const emp = parseFloat(employees) || 0;
  const cpp = parseFloat(cardsPerPerson) || 0;
  const buf = parseFloat(buffer) || 0;
  const cpb = parseFloat(cardsPerBox) || 1;

  const totalCards = emp * cpp * (1 + buf / 100);
  const boxesNeeded = cpb > 0 ? Math.ceil(totalCards / cpb) : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Business Card Quantity Calculator</Typography>
      <Typography variant="body1">
        Enter the number of employees who need business cards and how many cards each person typically gets
        (250 is a common default order size per person). Add a reorder buffer percentage to account for cards
        lost, damaged, or given out faster than expected, then enter how many cards come in a box or pack to
        see how many boxes you need to order in total.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Cards Needed = Employees × Cards per Person × (1 + Buffer %)<br />
        Boxes Needed = ⌈Total Cards Needed / Cards per Box⌉
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        10 employees at 250 cards each need 2,500 cards. Adding a 10% reorder buffer brings that to 2,750
        cards. At 250 cards per box, that rounds up to 11 boxes needed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a bulk business card order for a growing team or new office.</li>
          <li>Budgeting how many boxes to request from a print shop for a company-wide order.</li>
          <li>Estimating reorder quantity ahead of a conference or networking event season.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why include a reorder buffer at all?</strong> Business cards get lost, damaged in transit, misprinted, or handed out faster than expected around events and conferences — a small buffer (commonly 10-20%) avoids running out and needing a rushed, more expensive small reorder.</li>
          <li><strong>How many cards should each person get?</strong> It depends on role and how often someone networks — 250 cards is a common standard default order size that lasts many people a long time, while sales or business development roles that attend frequent events may want more.</li>
          <li><strong>Should every employee order the same quantity?</strong> Not necessarily — this calculator assumes a uniform quantity per person for a simple bulk estimate. If your team has very different card usage needs, calculate high-usage roles separately and add the totals together.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/business-card-quantity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Number of Employees" type="number" value={employees} onChange={(e) => setEmployees(e.target.value)} fullWidth />
          <TextField label="Cards per Person" type="number" value={cardsPerPerson} onChange={(e) => setCardsPerPerson(e.target.value)} fullWidth />
          <TextField label="Reorder Buffer" type="number" value={buffer} onChange={(e) => setBuffer(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} />
          <TextField label="Cards per Box" type="number" value={cardsPerBox} onChange={(e) => setCardsPerBox(e.target.value)} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total Cards Needed</Typography>
              <Typography variant="h6" fontWeight="bold">{Math.ceil(totalCards).toLocaleString()}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Boxes Needed</Typography>
              <Typography variant="h6" fontWeight="bold">{boxesNeeded}</Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BusinessCardQuantityCalculator;
