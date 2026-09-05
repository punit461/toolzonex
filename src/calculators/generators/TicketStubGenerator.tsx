'use client';

import { useState } from 'react';
import { Box, Typography, TextField, Paper, Stack, Divider } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TicketStubGeneratorContent = () => {
  const [eventName, setEventName] = useState('Summer Music Festival');
  const [date, setDate] = useState('2026-07-18');
  const [time, setTime] = useState('7:00 PM');
  const [venue, setVenue] = useState('Riverside Amphitheater');
  const [seat, setSeat] = useState('Section B, Row 4, Seat 12');
  const [ticketNumber, setTicketNumber] = useState('A-004821');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={2}>
        <TextField label="Event name" value={eventName} onChange={(e) => setEventName(e.target.value)} fullWidth />
        <Stack direction="row" spacing={2}>
          <TextField label="Date" value={date} onChange={(e) => setDate(e.target.value)} fullWidth />
          <TextField label="Time" value={time} onChange={(e) => setTime(e.target.value)} fullWidth />
        </Stack>
        <TextField label="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} fullWidth />
        <TextField label="Seat / section (optional)" value={seat} onChange={(e) => setSeat(e.target.value)} fullWidth />
        <TextField label="Ticket number" value={ticketNumber} onChange={(e) => setTicketNumber(e.target.value)} fullWidth />
      </Stack>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Paper
          variant="outlined"
          sx={{
            width: 340,
            display: 'flex',
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ flex: 3, p: 2.5 }}>
            <Typography variant="overline" color="primary.main" fontWeight={700}>ADMIT ONE</Typography>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>{eventName || 'Event Name'}</Typography>
            <Typography variant="body2">{date}{time ? ` — ${time}` : ''}</Typography>
            <Typography variant="body2" color="text.secondary">{venue}</Typography>
            {seat && <Typography variant="body2" sx={{ mt: 1 }}>{seat}</Typography>}
          </Box>
          <Box
            sx={{
              flex: 1,
              borderLeft: '2px dashed',
              borderColor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              bgcolor: 'action.hover',
            }}
          >
            <ConfirmationNumberIcon color="primary" fontSize="small" />
            <Typography
              variant="caption"
              fontWeight={700}
              sx={{ writingMode: 'vertical-rl', mt: 1, letterSpacing: 1 }}
            >
              {ticketNumber || 'No. —'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const TicketStubGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Ticket Stub Generator</Typography>
      <Typography variant="body1">
        Fill in the event name, date, time, venue, an optional seat or section, and a ticket number. The
        preview builds a formatted, printable ticket-stub-style layout with a dashed perforated-edge look
        separating the main ticket from its numbered stub — ready to print or save as a keepsake or prop.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;Summer Music Festival&quot; on 2026-07-18 at 7:00 PM at &quot;Riverside
        Amphitheater&quot;, with seat &quot;Section B, Row 4, Seat 12&quot; and ticket number
        &quot;A-004821&quot;, produces a ticket card showing all those details with the ticket number set
        apart in a stub section.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing a keepsake or commemorative ticket for a private event, party, or milestone.</li>
          <li>Creating a themed prop ticket for a movie night, escape room, or party invitation.</li>
          <li>Designing a simple entry ticket for a school event, raffle, or small community gathering.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I use this to print real, resellable event tickets?</strong> This tool is meant for personal, informal, or decorative tickets — for an official event requiring secure or scannable tickets, use a dedicated ticketing platform that provides fraud protection and unique verification.</li>
          <li><strong>Is the seat/section field required?</strong> No — it&apos;s optional and simply won&apos;t appear on the ticket preview if left blank, which works well for general-admission events.</li>
          <li><strong>Is my ticket information saved anywhere?</strong> No — everything is generated live in your browser and isn&apos;t stored, so make sure to print or screenshot your ticket before leaving the page.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/ticket-stub-generator" content={content}>
      <TicketStubGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TicketStubGenerator;
