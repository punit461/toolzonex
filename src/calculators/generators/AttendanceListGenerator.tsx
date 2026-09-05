'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, ToggleButtonGroup, ToggleButton, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'names' | 'blank';

const AttendanceListGeneratorContent = () => {
  const [mode, setMode] = useState<Mode>('names');
  const [namesText, setNamesText] = useState('Alex Johnson\nPriya Patel\nSam Lee\nJordan Kim\nMaria Garcia');
  const [blankRows, setBlankRows] = useState('15');
  const [title, setTitle] = useState('Class Attendance Sheet');

  const rows = useMemo(() => {
    if (mode === 'names') {
      return namesText.split('\n').map((n) => n.trim()).filter(Boolean);
    }
    const count = Math.max(1, Math.min(200, parseInt(blankRows, 10) || 1));
    return Array.from({ length: count }, () => '');
  }, [mode, namesText, blankRows]);

  const printSheet = () => window.print();

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3, alignItems: 'center' }}>
        <TextField label="Sheet Title" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ flex: 1, minWidth: 220 }} />
        <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
          <ToggleButton value="names">Known Names</ToggleButton>
          <ToggleButton value="blank">Blank Rows</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {mode === 'names' ? (
        <TextField
          label="Names (one per line)"
          value={namesText}
          onChange={(e) => setNamesText(e.target.value)}
          fullWidth
          multiline
          minRows={4}
          sx={{ mb: 3 }}
        />
      ) : (
        <TextField
          label="Number of Blank Rows"
          type="number"
          value={blankRows}
          onChange={(e) => setBlankRows(e.target.value)}
          sx={{ mb: 3, maxWidth: 240 }}
        />
      )}

      <Button variant="outlined" startIcon={<PrintIcon />} onClick={printSheet} sx={{ mb: 2 }}>
        Print Sheet
      </Button>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} textAlign="center" gutterBottom>{title || 'Attendance Sheet'}</Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, width: 40 }}>#</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, width: 140 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700, width: 160 }}>Signature / Check-in</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((name, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell sx={{ minHeight: 32 }}>{name}</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

const AttendanceListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Attendance List Generator</Typography>
      <Typography variant="body1">
        Choose whether you already know your attendee names or just need blank rows. In &quot;Known Names&quot;
        mode, paste one name per line to pre-fill the roster. In &quot;Blank Rows&quot; mode, enter how many
        empty rows you need instead. Either way, the tool produces a clean printable table with columns for
        Name, Date, and Signature/Check-in, ready to print and use for taking attendance by hand.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering 5 names in Known Names mode produces a 5-row sign-in sheet with each name pre-filled in the
        Name column and blank Date and Signature columns ready for people to fill in when they arrive.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing a sign-in sheet for a class, workshop, or training session.</li>
          <li>Creating a blank roster template for an event where you don&apos;t know attendees in advance.</li>
          <li>Keeping a physical, signed record of attendance for compliance or record-keeping purposes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Attendance Calculator?</strong> The Attendance Calculator does percentage math — figuring out how many classes you can miss and still hit a required attendance percentage. This Attendance List Generator does something entirely different: it generates a blank, printable roster or sign-in sheet template for physically taking attendance at an event or class, with no percentage calculations involved.</li>
          <li><strong>Can I mix pre-filled names with extra blank rows?</strong> Not directly in one sheet, but you can generate a Known Names sheet and add a few blank lines at the end of your names list to leave room for walk-ins.</li>
          <li><strong>Does the Print button format the sheet nicely on paper?</strong> Yes — it uses your browser&apos;s print function on the table layout, which is designed to print cleanly on standard paper sizes.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/attendance-list-generator" content={content}>
      <AttendanceListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AttendanceListGenerator;
