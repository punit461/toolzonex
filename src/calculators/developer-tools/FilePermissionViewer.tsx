'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FILE_TYPES: Record<string, string> = {
  '-': 'Regular file',
  d: 'Directory',
  l: 'Symbolic link',
  c: 'Character device file',
  b: 'Block device file',
  p: 'Named pipe (FIFO)',
  s: 'Socket',
};

interface Triplet {
  read: boolean;
  write: boolean;
  execute: boolean;
  special?: 'setuid' | 'setgid' | 'sticky';
}

function parseTriplet(chars: string, specialKind: 'setuid' | 'setgid' | 'sticky'): Triplet {
  const execChar = chars[2];
  const hasSpecial = execChar === 's' || execChar === 'S' || execChar === 't' || execChar === 'T';
  const execute = execChar === 'x' || execChar === 's' || execChar === 't';
  return {
    read: chars[0] === 'r',
    write: chars[1] === 'w',
    execute,
    special: hasSpecial ? specialKind : undefined,
  };
}

function digit(t: Triplet): number {
  return (t.read ? 4 : 0) + (t.write ? 2 : 0) + (t.execute ? 1 : 0);
}

function parsePermissionString(raw: string) {
  const firstToken = raw.trim().split(/\s+/)[0] || '';
  const match = firstToken.match(/^([dlcbps-])([-rwxsStT]{9})$/);
  if (!match) return null;
  const [, typeChar, perms] = match;
  const owner = parseTriplet(perms.slice(0, 3), 'setuid');
  const group = parseTriplet(perms.slice(3, 6), 'setgid');
  const other = parseTriplet(perms.slice(6, 9), 'sticky');
  const octal = `${digit(owner)}${digit(group)}${digit(other)}`;
  return { typeChar, perms, owner, group, other, octal };
}

const describe = (label: string, t: Triplet) => {
  const parts = [t.read ? 'read' : null, t.write ? 'write' : null, t.execute ? 'execute' : null].filter(Boolean);
  const base = parts.length ? parts.join(', ') : 'no permissions';
  return `${label}: ${base}`;
};

const FilePermissionViewerContent = () => {
  const [input, setInput] = useState('-rwxr-xr-x');

  const result = useMemo(() => (input.trim() ? parsePermissionString(input) : null), [input]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Permission string (from ls -l)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          placeholder="-rwxr-xr-x  2 user group 4096 Jan 1 12:00 filename"
          sx={{ mb: 2, fontFamily: 'monospace' }}
        />
        {input.trim() && !result && (
          <Alert severity="error">
            Couldn't parse that as a permission string. Expecting a leading file-type character followed by
            9 permission characters, like <code>-rwxr-xr-x</code>.
          </Alert>
        )}
      </Box>

      <Box>
        {result ? (
          <>
            <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">File Type</Typography>
              <Typography variant="h6" fontWeight={700}>
                {FILE_TYPES[result.typeChar] ?? 'Unknown'} <Typography component="span" sx={{ fontFamily: 'monospace' }}>({result.typeChar})</Typography>
              </Typography>
            </Paper>
            <Table size="small" sx={{ mb: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">Read</TableCell>
                  <TableCell align="center">Write</TableCell>
                  <TableCell align="center">Execute</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {([['Owner', result.owner], ['Group', result.group], ['Other', result.other]] as const).map(([label, t]) => (
                  <TableRow key={label}>
                    <TableCell sx={{ fontWeight: 600 }}>{label}</TableCell>
                    <TableCell align="center">{t.read ? '✓' : '—'}</TableCell>
                    <TableCell align="center">{t.write ? '✓' : '—'}</TableCell>
                    <TableCell align="center">{t.execute ? '✓' : '—'}{t.special ? ` (${t.special})` : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
              <Typography variant="subtitle2" color="text.secondary">Numeric (Octal) Equivalent</Typography>
              <Typography variant="h5" fontWeight={700} fontFamily="monospace">{result.octal}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {describe('Owner', result.owner)} · {describe('Group', result.group)} · {describe('Other', result.other)}
              </Typography>
            </Paper>
          </>
        ) : (
          <Paper sx={{ p: 2 }}>
            <Typography color="text.secondary">Enter a permission string to see the breakdown.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const FilePermissionViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the File Permission Viewer</Typography>
      <Typography variant="body1">
        Paste a Unix-style permission string exactly as it appears in <code>ls -l</code> output — either the
        short form like <code>-rwxr-xr-x</code>, or a full line like{' '}
        <code>-rwxr-xr-x 2 user group 4096 Jan 1 12:00 filename</code>. The tool parses the leading file-type
        character (a regular file, directory, symbolic link, or one of the less common types like a character
        device, block device, named pipe, or socket) and then breaks down the three permission triplets —
        Owner, Group, and Other — into plain-English read/write/execute permissions, plus the equivalent
        numeric (octal) value.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>-rwxr-xr-x</code> shows a Regular file with Owner permissions of read, write, and
        execute; Group and Other both with read and execute only; and a numeric equivalent of{' '}
        <code>755</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Understanding a permission string you copied from a server's <code>ls -l</code> output.</li>
          <li>Converting a real-world permission string into its numeric (chmod-style) equivalent.</li>
          <li>Learning what the leading file-type character in <code>ls -l</code> output actually means.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the CHMOD Generator?</strong> Our <a href="/developer-tools/chmod-generator">CHMOD Generator</a> converts between numeric, symbolic, and checkbox representations for SETTING permissions you want to apply to a file. This File Permission Viewer does the reverse — it PARSES AND EXPLAINS a permission string you already encountered (for example, copied from real <code>ls -l</code> output), including the leading file-type character, which the CHMOD Generator doesn't cover at all.</li>
          <li><strong>What does the leading character before the permissions mean?</strong> It identifies the file type: <code>-</code> for a regular file, <code>d</code> for a directory, <code>l</code> for a symbolic link, and less common types like <code>c</code> (character device), <code>b</code> (block device), <code>p</code> (named pipe), and <code>s</code> (socket).</li>
          <li><strong>What do lowercase or uppercase &quot;s&quot; and &quot;t&quot; in the execute position mean?</strong> Those represent special permission bits layered on top of execute: a lowercase <code>s</code> or <code>t</code> means the special bit (setuid, setgid, or sticky) is set AND the execute bit is also set, while an uppercase <code>S</code> or <code>T</code> means the special bit is set but execute is NOT set for that category.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/file-permission-viewer" content={content}>
      <FilePermissionViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FilePermissionViewer;
