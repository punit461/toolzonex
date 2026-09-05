'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, MenuItem, Select, Button, Chip, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Rsvp = 'Yes' | 'No' | 'Maybe' | 'Pending';

interface Guest {
  id: number;
  name: string;
  rsvp: Rsvp;
  plusOnes: string;
  dietary: string;
}

let nextId = 700;

const RSVP_OPTIONS: Rsvp[] = ['Yes', 'No', 'Maybe', 'Pending'];
const RSVP_COLOR: Record<Rsvp, 'success' | 'error' | 'warning' | 'default'> = {
  Yes: 'success',
  No: 'error',
  Maybe: 'warning',
  Pending: 'default',
};

const DEFAULT_GUESTS: Guest[] = [
  { id: 1, name: 'Alex Johnson', rsvp: 'Yes', plusOnes: '1', dietary: 'Vegetarian' },
  { id: 2, name: 'Priya Patel', rsvp: 'Maybe', plusOnes: '0', dietary: '' },
  { id: 3, name: 'Sam Lee', rsvp: 'Pending', plusOnes: '0', dietary: '' },
];

const EventGuestListGeneratorContent = () => {
  const [guests, setGuests] = useState<Guest[]>(DEFAULT_GUESTS);

  const addGuest = () => setGuests((prev) => [...prev, { id: nextId++, name: '', rsvp: 'Pending', plusOnes: '0', dietary: '' }]);
  const removeGuest = (id: number) => setGuests((prev) => prev.filter((g) => g.id !== id));
  const updateGuest = (id: number, patch: Partial<Guest>) =>
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, ...patch } : g)));

  const { valid, summary } = useMemo(() => {
    const valid = guests.filter((g) => g.name.trim());
    const yesGuests = valid.filter((g) => g.rsvp === 'Yes');
    const totalConfirmed = yesGuests.length;
    const totalDeclined = valid.filter((g) => g.rsvp === 'No').length;
    const totalPending = valid.filter((g) => g.rsvp === 'Pending' || g.rsvp === 'Maybe').length;
    const plusOnesTotal = yesGuests.reduce((sum, g) => sum + (parseInt(g.plusOnes, 10) || 0), 0);
    const totalHeadcount = totalConfirmed + plusOnesTotal;
    return { valid, summary: { totalConfirmed, totalDeclined, totalPending, totalHeadcount } };
  }, [guests]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Guest List</Typography>
        <Stack spacing={2}>
          {guests.map((g) => (
            <Paper key={g.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size="small"
                  label="Guest name"
                  value={g.name}
                  onChange={(e) => updateGuest(g.id, { name: e.target.value })}
                  sx={{ flex: 2, minWidth: 150 }}
                />
                <Select
                  size="small"
                  value={g.rsvp}
                  onChange={(e) => updateGuest(g.id, { rsvp: e.target.value as Rsvp })}
                  sx={{ minWidth: 110 }}
                >
                  {RSVP_OPTIONS.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
                <TextField
                  size="small"
                  label="Plus-ones"
                  type="number"
                  value={g.plusOnes}
                  onChange={(e) => updateGuest(g.id, { plusOnes: e.target.value })}
                  sx={{ width: 100 }}
                />
                <IconButton onClick={() => removeGuest(g.id)} disabled={guests.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <TextField
                size="small"
                fullWidth
                placeholder="Dietary notes (optional)"
                value={g.dietary}
                onChange={(e) => updateGuest(g.id, { dietary: e.target.value })}
              />
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addGuest} sx={{ mt: 2 }}>
          Add Guest
        </Button>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Summary</Typography>
        <Grid container spacing={1.5} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
              <Typography variant="h5" fontWeight={800}>{summary.totalConfirmed}</Typography>
              <Typography variant="body2">Confirmed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'error.main', color: 'white' }}>
              <Typography variant="h5" fontWeight={800}>{summary.totalDeclined}</Typography>
              <Typography variant="body2">Declined</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
              <Typography variant="h5" fontWeight={800}>{summary.totalPending}</Typography>
              <Typography variant="body2">Pending/Maybe</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h5" fontWeight={800}>{summary.totalHeadcount}</Typography>
              <Typography variant="body2">Total Headcount</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Stack spacing={1}>
          {valid.map((g) => (
            <Paper key={g.id} variant="outlined" sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography fontWeight={600}>{g.name}</Typography>
                {g.dietary && <Typography variant="body2" color="text.secondary">{g.dietary}</Typography>}
                {parseInt(g.plusOnes, 10) > 0 && <Typography variant="body2" color="text.secondary">+{g.plusOnes}</Typography>}
              </Box>
              <Chip label={g.rsvp} color={RSVP_COLOR[g.rsvp]} size="small" />
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

const EventGuestListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Event Guest List Generator</Typography>
      <Typography variant="body1">
        Add each guest along with their RSVP status — Yes, No, Maybe, or Pending — plus how many plus-ones
        they&apos;re bringing and any dietary notes. The tool builds a running summary showing total confirmed
        guests, total declined, total still pending or unsure, and the total expected headcount, which adds
        every confirmed guest&apos;s plus-ones on top of the base confirmed count.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With Alex confirmed (Yes) and bringing 1 plus-one, Priya marked Maybe, and Sam still Pending, the
        summary shows 1 Confirmed, 0 Declined, 2 Pending/Maybe, and a Total Headcount of 2 (1 confirmed guest
        plus their 1 plus-one).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking RSVPs for a wedding, party, or corporate event as responses come in.</li>
          <li>Estimating final headcount for catering or venue capacity planning, including plus-ones.</li>
          <li>Keeping dietary restrictions organized alongside each guest for easy reference by caterers.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is Total Headcount calculated?</strong> It adds up every guest whose RSVP is Yes, plus the number of plus-ones each of those confirmed guests is bringing — guests marked No, Maybe, or Pending aren&apos;t included since they aren&apos;t confirmed attendees.</li>
          <li><strong>What&apos;s the difference between Maybe and Pending?</strong> Maybe typically means the guest responded but is unsure, while Pending means they haven&apos;t responded at all yet — both are grouped together in the summary since neither counts toward your confirmed headcount.</li>
          <li><strong>Can I track plus-ones for declined or pending guests?</strong> You can enter a number, but it won&apos;t count toward the Total Headcount unless that guest&apos;s RSVP is set to Yes, since only confirmed guests contribute to the final expected count.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/event-guest-list-generator" content={content}>
      <EventGuestListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EventGuestListGenerator;
