'use client';

import { useState, useCallback } from 'react';
import { Box, Typography, Paper, Checkbox, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Perms = { read: boolean; write: boolean; execute: boolean };
type PermState = { owner: Perms; group: Perms; other: Perms };

const DEFAULT_STATE: PermState = {
  owner: { read: true, write: true, execute: true },
  group: { read: true, write: false, execute: true },
  other: { read: true, write: false, execute: true },
};

function permsToDigit(p: Perms): number {
  return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
}

function digitToPerms(d: number): Perms {
  return { read: (d & 4) !== 0, write: (d & 2) !== 0, execute: (d & 1) !== 0 };
}

function permsToSymbol(p: Perms): string {
  return `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;
}

function stateToNumeric(state: PermState): string {
  return `${permsToDigit(state.owner)}${permsToDigit(state.group)}${permsToDigit(state.other)}`;
}

function stateToSymbolic(state: PermState): string {
  return `${permsToSymbol(state.owner)}${permsToSymbol(state.group)}${permsToSymbol(state.other)}`;
}

function numericToState(numeric: string): PermState | null {
  if (!/^[0-7]{3}$/.test(numeric)) return null;
  const [o, g, ot] = numeric.split('').map((c) => parseInt(c, 10));
  return { owner: digitToPerms(o), group: digitToPerms(g), other: digitToPerms(ot) };
}

const ChmodGeneratorContent = () => {
  const [state, setState] = useState<PermState>(DEFAULT_STATE);
  const [numericInput, setNumericInput] = useState<string>(stateToNumeric(DEFAULT_STATE));

  const updateFromCheckbox = useCallback((role: keyof PermState, perm: keyof Perms, value: boolean) => {
    setState((prev) => {
      const next = { ...prev, [role]: { ...prev[role], [perm]: value } };
      setNumericInput(stateToNumeric(next));
      return next;
    });
  }, []);

  const updateFromNumeric = (value: string) => {
    setNumericInput(value);
    const parsed = numericToState(value);
    if (parsed) setState(parsed);
  };

  const numeric = stateToNumeric(state);
  const symbolic = stateToSymbolic(state);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Read</TableCell>
              <TableCell align="center">Write</TableCell>
              <TableCell align="center">Execute</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(['owner', 'group', 'other'] as const).map((role) => (
              <TableRow key={role}>
                <TableCell sx={{ textTransform: 'capitalize', fontWeight: 600 }}>{role}</TableCell>
                {(['read', 'write', 'execute'] as const).map((perm) => (
                  <TableCell align="center" key={perm}>
                    <Checkbox
                      checked={state[role][perm]}
                      onChange={(e) => updateFromCheckbox(role, perm, e.target.checked)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TextField
          label="Numeric Value (0-777)"
          value={numericInput}
          onChange={(e) => updateFromNumeric(e.target.value.replace(/[^0-7]/g, '').slice(0, 3))}
          sx={{ mt: 3 }}
          fullWidth
          helperText="Type a 3-digit octal value to update the checkboxes above"
        />
      </Box>

      <Box>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Numeric</Typography>
          <Typography variant="h4" fontWeight={700} fontFamily="monospace">{numeric}</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Symbolic</Typography>
          <Typography variant="h4" fontWeight={700} fontFamily="monospace">{symbolic}</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="subtitle2" color="text.secondary">Example Command</Typography>
          <Typography variant="body1" fontFamily="monospace">chmod {numeric} filename</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const ChmodGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CHMOD Generator</Typography>
      <Typography variant="body1">
        Check or uncheck boxes in the 3×3 grid to set Read, Write, and Execute permissions for the Owner,
        Group, and Other categories of a Unix/Linux file. The tool instantly computes the numeric chmod value
        (like <code>755</code>), the symbolic permission string (like <code>rwxr-xr-x</code>), and a full
        example command you can run. The tool works both ways — you can also type a numeric value directly
        into the number field and the checkboxes will update to match it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Checking all three boxes for Owner, and only Read + Execute for Group and Other, produces the numeric
        value <code>755</code>, the symbolic string <code>rwxr-xr-x</code>, and the command
        <code> chmod 755 filename</code> — a very common permission set for scripts and executables.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out the correct chmod command for a script or web file.</li>
          <li>Converting a symbolic permission string you found online into its numeric equivalent.</li>
          <li>Understanding what a given chmod number like 644 or 700 actually grants.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What do Owner, Group, and Other mean?</strong> Every file on a Unix/Linux system has one owning user and one owning group. &quot;Owner&quot; permissions apply to that user, &quot;Group&quot; permissions apply to other members of the owning group, and &quot;Other&quot; permissions apply to everyone else on the system.</li>
          <li><strong>How does each permission digit get calculated?</strong> Read is worth 4, Write is worth 2, and Execute is worth 1. Adding up the values for the permissions you want gives the digit for that category — for example Read + Execute (4 + 1) gives 5.</li>
          <li><strong>Can I type a numeric value instead of clicking checkboxes?</strong> Yes — type any 3-digit value from 000 to 777 into the numeric field and the checkbox grid updates automatically to match it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/chmod-generator" content={content}>
      <ChmodGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ChmodGenerator;
