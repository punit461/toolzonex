'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Appointment {
  id: number;
  clientName: string;
  date: string;
  time: string;
  service: string;
  notes: string;
}

let nextId = 1300;

const DEFAULT_APPOINTMENTS: Appointment[] = [
  { id: 1, clientName: 'Jamie Rivera', date: '2026-09-10', time: '14:00', service: 'Haircut', notes: '' },
  { id: 2, clientName: 'Taylor Kim', date: '2026-09-09', time: '09:30', service: 'Consultation', notes: 'First visit' },
];

function toSortableKey(date: string, time: string): string {
  // Sorts as plain strings works when both fields use YYYY-MM-DD and HH:MM,
  // falling back gracefully (empties sort first) if a field is left blank.
  return `${date || '9999-99-99'} ${time || '99:99'}`;
}

const AppointmentReservationListGeneratorContent = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(DEFAULT_APPOINTMENTS);

  const addAppointment = () => setAppointments((prev) => [...prev, { id: nextId++, clientName: '', date: '', time: '', service: '', notes: '' }]);
  const removeAppointment = (id: number) => setAppointments((prev) => prev.filter((a) => a.id !== id));
  const updateAppointment = (id: number, patch: Partial<Appointment>) =>
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const sorted = useMemo(() => {
    return appointments
      .filter((a) => a.clientName.trim())
      .slice()
      .sort((a, b) => toSortableKey(a.date, a.time).localeCompare(toSortableKey(b.date, b.time)));
  }, [appointments]);

  const copyList = async () => {
    const lines = sorted.map((a) => {
      const parts = [a.date, a.time, a.clientName, a.service].filter(Boolean);
      let line = parts.join(' — ');
      if (a.notes) line += ` (${a.notes})`;
      return `- ${line}`;
    });
    try { await navigator.clipboard.writeText(lines.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Appointments / Reservations</Typography>
        <Stack spacing={2}>
          {appointments.map((a) => (
            <Paper key={a.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField size="small" label="Client / guest name" value={a.clientName} onChange={(e) => updateAppointment(a.id, { clientName: e.target.value })} sx={{ flex: 1.5, minWidth: 150 }} />
                <TextField size="small" type="date" value={a.date} onChange={(e) => updateAppointment(a.id, { date: e.target.value })} sx={{ flex: 1, minWidth: 130 }} InputLabelProps={{ shrink: true }} label="Date" />
                <TextField size="small" type="time" value={a.time} onChange={(e) => updateAppointment(a.id, { time: e.target.value })} sx={{ flex: 1, minWidth: 110 }} InputLabelProps={{ shrink: true }} label="Time" />
                <IconButton onClick={() => removeAppointment(a.id)} disabled={appointments.length <= 1} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <Stack direction="row" spacing={1}>
                <TextField size="small" fullWidth label="Service / purpose" value={a.service} onChange={(e) => updateAppointment(a.id, { service: e.target.value })} />
                <TextField size="small" fullWidth label="Notes (optional)" value={a.notes} onChange={(e) => updateAppointment(a.id, { notes: e.target.value })} />
              </Stack>
            </Paper>
          ))}
        </Stack>
        <Button startIcon={<AddIcon />} onClick={addAppointment} sx={{ mt: 2 }}>
          Add Appointment
        </Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Sorted List</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={sorted.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 200 }}>
          {sorted.length === 0 && (
            <Typography variant="body2" color="text.secondary">Add an appointment to build your list.</Typography>
          )}
          <Stack spacing={1.5}>
            {sorted.map((a) => (
              <Box key={a.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <EventAvailableIcon color="primary" fontSize="small" sx={{ mt: 0.3 }} />
                <Box>
                  <Typography fontWeight={600}>{a.clientName}{a.service ? ` — ${a.service}` : ''}</Typography>
                  <Typography variant="body2" color="text.secondary">{[a.date, a.time].filter(Boolean).join(' ')}</Typography>
                  {a.notes && <Typography variant="body2" color="text.secondary">{a.notes}</Typography>}
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

const AppointmentReservationListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Appointment/Reservation List Generator</Typography>
      <Typography variant="body1">
        Add each appointment or reservation with a client or guest name, date, time, service or purpose, and
        any optional notes. The list on the right automatically sorts every entry chronologically by date
        and then time, so you always see your day or week in the correct order regardless of the order you
        entered them.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering &quot;Jamie Rivera&quot; on 2026-09-10 at 14:00 and &quot;Taylor Kim&quot; on 2026-09-09 at
        09:30 produces a sorted list showing Taylor Kim first (earlier date), followed by Jamie Rivera —
        regardless of which order they were typed in.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Organizing a salon, clinic, or consulting appointment book into a clear chronological list.</li>
          <li>Managing restaurant or venue reservations sorted by date and time automatically.</li>
          <li>Preparing a printable daily or weekly schedule of client bookings.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What happens if I leave the date or time blank?</strong> Entries with a missing date or time are sorted to the end of the list, so incomplete entries don&apos;t accidentally appear as the earliest item.</li>
          <li><strong>Can I use this for both appointments and reservations?</strong> Yes — the fields (name, date, time, service/purpose, notes) work equally well for a service appointment or a table/venue reservation; just use the service/purpose field for whichever label fits your use case.</li>
          <li><strong>Is my appointment list saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/appointment-reservation-list-generator" content={content}>
      <AppointmentReservationListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AppointmentReservationListGenerator;
