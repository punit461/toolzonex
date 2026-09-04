'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface SplitName {
  full: string;
  first: string;
  middle: string;
  last: string;
}

function splitName(full: string): SplitName {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { full, first: '', middle: '', last: '' };
  if (parts.length === 1) return { full, first: parts[0], middle: '', last: '' };
  if (parts.length === 2) return { full, first: parts[0], middle: '', last: parts[1] };
  return { full, first: parts[0], middle: parts.slice(1, -1).join(' '), last: parts[parts.length - 1] };
}

const NameSplitterContent = () => {
  const [text, setText] = useState('John Michael Smith');

  const results = useMemo(() => {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map(splitName);
  }, [text]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.4fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Full Name(s)"
          placeholder={'One name per line, e.g.\nJohn Michael Smith\nMary Jones'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
        />
      </Box>

      <Box>
        {results.length > 0 ? (
          <Paper variant="outlined" sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>First</TableCell>
                  <TableCell>Middle</TableCell>
                  <TableCell>Last</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell>{r.first || '—'}</TableCell>
                    <TableCell>{r.middle || '—'}</TableCell>
                    <TableCell>{r.last || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            Enter one or more full names to split them.
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const NameSplitter = () => {
  const content = (
    <>
      <Typography variant="h2">How the Name Splitter Works</Typography>
      <Typography variant="body1">
        Type a full name, or paste a list of names one per line for bulk processing, and each one is split into
        a first name, middle name(s), and last name. The tool uses simple space-based heuristics: the first
        word is treated as the first name, the last word as the last name, and anything in between as the
        middle name(s) — handling a single middle name, multiple middle names, or no middle name at all.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;John Michael Smith&quot; splits into first name &quot;John&quot;, middle name &quot;Michael&quot;,
        and last name &quot;Smith&quot;. &quot;Mary Jones&quot; (no middle name) splits into first name
        &quot;Mary&quot; and last name &quot;Jones&quot;. &quot;Anna Maria Elena Rossi&quot; splits into first
        name &quot;Anna&quot;, middle names &quot;Maria Elena&quot;, and last name &quot;Rossi&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Splitting a spreadsheet column of full names into separate first/middle/last fields.</li>
          <li>Preparing name data for a form, database, or CRM that requires separate name fields.</li>
          <li>Quickly formatting a guest list or mailing list into structured name parts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this a definitive or perfectly accurate way to split names?</Typography>
      <Typography variant="body1">
        No — name parsing is inherently ambiguous. Many names and naming conventions around the world don&apos;t
        follow a simple &quot;first, middle, last&quot; pattern (for example, some cultures place the family
        name first, use multiple surnames, or have no middle name concept at all). This tool uses straightforward
        space-based heuristics rather than being a definitive solution, so always double-check the results for
        names that don&apos;t fit a typical Western first/middle/last structure.
      </Typography>
      <Typography variant="h3">How are single-word names handled?</Typography>
      <Typography variant="body1">
        A single-word entry (like a mononym) is placed entirely in the first name field, with the middle and
        last name fields left blank.
      </Typography>
      <Typography variant="h3">Can I process many names at once?</Typography>
      <Typography variant="body1">
        Yes — paste as many names as you like, one per line, and every line is split independently and shown as
        its own row in the results table.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/name-splitter" content={content}>
      <NameSplitterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NameSplitter;
