'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CONTROL_NAMES: Record<number, string> = {
  0: 'NUL', 1: 'SOH', 2: 'STX', 3: 'ETX', 4: 'EOT', 5: 'ENQ', 6: 'ACK', 7: 'BEL',
  8: 'BS', 9: 'TAB', 10: 'LF', 11: 'VT', 12: 'FF', 13: 'CR', 14: 'SO', 15: 'SI',
  16: 'DLE', 17: 'DC1', 18: 'DC2', 19: 'DC3', 20: 'DC4', 21: 'NAK', 22: 'SYN', 23: 'ETB',
  24: 'CAN', 25: 'EM', 26: 'SUB', 27: 'ESC', 28: 'FS', 29: 'GS', 30: 'RS', 31: 'US',
  127: 'DEL',
};

interface AsciiRow {
  dec: number;
  hex: string;
  oct: string;
  bin: string;
  display: string;
  name: string;
}

const ASCII_ROWS: AsciiRow[] = Array.from({ length: 128 }, (_, dec) => {
  const hex = dec.toString(16).toUpperCase().padStart(2, '0');
  const oct = dec.toString(8).padStart(3, '0');
  const bin = dec.toString(2).padStart(7, '0');
  const isControl = dec < 32 || dec === 127;
  const isSpace = dec === 32;
  const name = isControl ? CONTROL_NAMES[dec] : isSpace ? 'SPACE' : String.fromCharCode(dec);
  const display = isControl || isSpace ? name : String.fromCharCode(dec);
  return { dec, hex, oct, bin, display, name };
});

const AsciiTableViewerContent = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ASCII_ROWS;
    return ASCII_ROWS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.dec.toString() === q ||
        r.hex.toLowerCase() === q.replace(/^0x/, '') ||
        r.display.toLowerCase() === q
    );
  }, [query]);

  return (
    <Box>
      <TextField
        label="Search by character, decimal value, or name"
        placeholder="e.g. A, 65, LF, ESC"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 2, maxWidth: 480 }}
      />
      <Paper variant="outlined" sx={{ overflowX: 'auto', maxHeight: 560, overflowY: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Character / Name</TableCell>
              <TableCell align="right">Decimal</TableCell>
              <TableCell align="right">Hex</TableCell>
              <TableCell align="right">Octal</TableCell>
              <TableCell align="right">Binary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.dec} hover>
                <TableCell sx={{ fontFamily: 'monospace' }}>{r.display}</TableCell>
                <TableCell align="right">{r.dec}</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'monospace' }}>0x{r.hex}</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'monospace' }}>{r.oct}</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'monospace' }}>{r.bin}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary">No matching ASCII character found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

const AsciiTableViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the ASCII Table Viewer</Typography>
      <Typography variant="body1">
        Browse the complete standard ASCII table, codes 0 through 127, with each row showing its decimal,
        hexadecimal, octal, and binary representation, plus the character itself for printable codes or the
        standard control-character name (like <code>NUL</code>, <code>LF</code>, <code>CR</code>, or{' '}
        <code>ESC</code>) for codes 0-31 and 127. Use the search box to filter by typing a character, a
        decimal value, or a name — the table narrows down instantly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;65&quot; shows the row for uppercase <code>A</code>: decimal 65, hex{' '}
        <code>0x41</code>, octal <code>101</code>, and binary <code>1000001</code>. Searching &quot;LF&quot;
        shows code 10, the line feed control character used to represent a new line.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Looking up the decimal or hex value of a character for use in code, escape sequences, or byte manipulation.</li>
          <li>Identifying an unfamiliar control character code, like what <code>0x1B</code> (ESC) represents.</li>
          <li>Converting between decimal, hex, octal, and binary representations of a character code.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Unicode Character Lookup or Finder?</strong> Those tools look up detailed information about one specific Unicode character at a time, across the entire Unicode range (which spans over a million code points). This ASCII Table Viewer is a complete browsable reference table specifically of the foundational 128-character ASCII set — you scroll or search through the whole table rather than inspecting a single character.</li>
          <li><strong>Why does the table stop at 127?</strong> Standard ASCII is defined as exactly 128 characters, codes 0 through 127. Codes above 127 (128-255 and beyond) belong to extended character sets like Latin-1 or full Unicode, which sit outside the original ASCII standard.</li>
          <li><strong>What do the control character names mean?</strong> They're standard abbreviations from the ASCII specification for non-printable control codes — for example, <code>LF</code> (line feed) and <code>CR</code> (carriage return) are used to represent new lines, and <code>ESC</code> (escape) is used to start special escape sequences in terminals.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/ascii-table-viewer" content={content}>
      <AsciiTableViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AsciiTableViewer;
