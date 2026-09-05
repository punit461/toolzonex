'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, MenuItem, Alert, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Delimiter = ',' | '|' | '\t';

interface Entry {
  site: string;
  username: string;
  password: string;
}

const DELIMITER_LABELS: Record<Delimiter, string> = {
  ',': 'Comma ( , )',
  '|': 'Pipe ( | )',
  '\t': 'Tab',
};

const PasswordListOrganizerContent = () => {
  const [raw, setRaw] = useState('');
  const [delimiter, setDelimiter] = useState<Delimiter>(',');

  const entries = useMemo<Entry[]>(() => {
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(delimiter).map((p) => p.trim());
        return {
          site: parts[0] || '',
          username: parts[1] || '',
          password: parts[2] || '',
        };
      })
      .filter((e) => e.site)
      .sort((a, b) => a.site.localeCompare(b.site));
  }, [raw, delimiter]);

  return (
    <Box>
      <Alert severity="warning" sx={{ mb: 3 }}>
        This tool does not save, store, or transmit anything. It only reformats the list you paste for viewing
        during this browser session — nothing is written to local storage, cookies, or a server, and everything
        disappears the moment you refresh or leave this page. For actual secure password storage, use a
        dedicated password manager application.
      </Alert>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
        <Box>
          <TextField
            select
            label="Delimiter"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as Delimiter)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {(Object.keys(DELIMITER_LABELS) as Delimiter[]).map((d) => (
              <MenuItem key={d} value={d}>{DELIMITER_LABELS[d]}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Paste entries: site, username, password (one per line)"
            placeholder={'example.com, jane_doe, mypassword\nanothersite.com, jane, pw456'}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            multiline
            rows={12}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Sorted Table ({entries.length} {entries.length === 1 ? 'entry' : 'entries'})
          </Typography>
          {entries.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
              Paste your delimited list on the left to see it as a sorted, aligned table here.
            </Paper>
          ) : (
            <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Site</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Password</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {entries.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell>{e.site}</TableCell>
                      <TableCell>{e.username || '—'}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{e.password || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

const PasswordListOrganizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Password List Organizer</Typography>
      <Typography variant="body1">
        This is a formatting convenience only — <strong>not a password manager, vault, or storage tool</strong>.
        Paste entries you&apos;ve already written down elsewhere in a simple delimited format, one entry per
        line: site, username, password. Choose the delimiter your list uses (comma, pipe, or tab), and the
        tool parses it into a neatly aligned table, sorted alphabetically by site name, so it&apos;s easier to
        read and scan. Nothing you paste is saved, stored, or sent anywhere — it exists only in your
        browser&apos;s memory for the current session and disappears the instant you refresh the page.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting these two lines with a comma delimiter:
        <br />
        <code>zebra.com, jane_doe, pw1</code>
        <br />
        <code>apple.com, jane, pw2</code>
        <br />
        produces a table with apple.com listed first, since entries are sorted alphabetically by site name
        regardless of the order you pasted them in.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Neatly reformatting a plain-text password list you keep in a personal notes file, for easier reading.</li>
          <li>Alphabetizing a messy, unsorted list of site/username/password entries.</li>
          <li>Quickly converting a tab- or pipe-delimited export into a readable table before copying it elsewhere.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this tool store or save my passwords anywhere?</strong> No — absolutely nothing is saved. It doesn&apos;t write to local storage, cookies, a database, or any server; the parsed table exists only in this browser tab&apos;s memory and vanishes the moment you refresh or close the page.</li>
          <li><strong>Is this safe to use for real passwords?</strong> This tool only reformats text that stays on your device during the current session — it never transmits data anywhere. That said, it is not a substitute for a dedicated, encrypted password manager application, which is the appropriate tool for actually storing and securing your passwords.</li>
          <li><strong>What if my list uses a different format than site, username, password?</strong> The tool always reads the first field as the site name, the second as the username, and the third as the password, based on your chosen delimiter — reorder your source list to match this structure before pasting if it differs.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/password-list-organizer" content={content}>
      <PasswordListOrganizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PasswordListOrganizer;
