'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Chip, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

const TYPES: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Standard published red blood cell donor -> recipient compatibility matrix.
const COMPATIBILITY: Record<BloodType, BloodType[]> = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

const BloodTypeCompatibilityCheckerContent = () => {
  const [mode, setMode] = useState<'pair' | 'donor' | 'recipient'>('pair');
  const [donor, setDonor] = useState<BloodType>('O-');
  const [recipient, setRecipient] = useState<BloodType>('AB+');

  const isCompatible = useMemo(() => COMPATIBILITY[donor].includes(recipient), [donor, recipient]);

  const allRecipientsFor = (d: BloodType) => COMPATIBILITY[d];
  const allDonorsFor = (r: BloodType) => TYPES.filter((d) => COMPATIBILITY[d].includes(r));

  return (
    <Box>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => v && setMode(v)}
        size="small"
        sx={{ mb: 3 }}
      >
        <ToggleButton value="pair">Check a Pair</ToggleButton>
        <ToggleButton value="donor">All Recipients for a Donor</ToggleButton>
        <ToggleButton value="recipient">All Donors for a Recipient</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'pair' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <TextField select label="Donor Blood Type" value={donor} onChange={(e) => setDonor(e.target.value as BloodType)} fullWidth>
            {TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <TextField select label="Recipient Blood Type" value={recipient} onChange={(e) => setRecipient(e.target.value as BloodType)} fullWidth>
            {TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <Paper sx={{ p: 3, gridColumn: { md: '1 / -1' }, textAlign: 'center', bgcolor: isCompatible ? 'success.main' : 'error.main', color: 'white' }}>
            <Typography variant="h5" fontWeight="bold">
              {donor} → {recipient}: {isCompatible ? 'Compatible' : 'Not Compatible'}
            </Typography>
          </Paper>
        </Box>
      )}

      {mode === 'donor' && (
        <Box>
          <TextField select label="Donor Blood Type" value={donor} onChange={(e) => setDonor(e.target.value as BloodType)} fullWidth sx={{ maxWidth: 300, mb: 2 }}>
            {TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>A {donor} donor can give to:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {allRecipientsFor(donor).map((t) => <Chip key={t} label={t} color="success" />)}
          </Stack>
        </Box>
      )}

      {mode === 'recipient' && (
        <Box>
          <TextField select label="Recipient Blood Type" value={recipient} onChange={(e) => setRecipient(e.target.value as BloodType)} fullWidth sx={{ maxWidth: 300, mb: 2 }}>
            {TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>A {recipient} recipient can receive from:</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {allDonorsFor(recipient).map((t) => <Chip key={t} label={t} color="success" />)}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const BloodTypeCompatibilityChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Blood Type Compatibility Checker</Typography>
      <Typography variant="body1">
        Select a donor blood type and a recipient blood type to see whether that specific donation would be
        compatible, using the standard published ABO and Rh compatibility rules. O- is the universal donor
        (compatible with all eight types), AB+ is the universal recipient (can receive from all eight types),
        and Rh-negative blood can only donate to Rh-negative recipients within the negative-to-negative rule
        alongside the matching Rh-positive group. You can also switch modes to see every compatible recipient
        for a chosen donor, or every compatible donor for a chosen recipient.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An O- donor is compatible with an AB+ recipient (O- can donate to anyone), but an A+ donor is NOT
        compatible with a B- recipient, since the ABO groups don&apos;t match and B- can only receive from
        B- or O- blood.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Learning the standard ABO and Rh blood donation compatibility rules for a class or exam.</li>
          <li>Quickly checking whether a specific donor-to-recipient pairing is theoretically compatible.</li>
          <li>Seeing the full list of blood types a given type can donate to or receive from.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this a substitute for real medical blood typing?</strong> No — this tool is for general education only. Any real blood transfusion requires laboratory blood typing and cross-matching performed by qualified medical professionals before it can be considered safe; never use this tool as a substitute for that process.</li>
          <li><strong>Why is O- called the &quot;universal donor&quot;?</strong> O- red blood cells carry neither A nor B antigens nor the Rh factor, so they&apos;re far less likely to trigger an immune reaction in a recipient of any other blood type, making O- compatible with all eight types as a donor.</li>
          <li><strong>Why is AB+ called the &quot;universal recipient&quot;?</strong> AB+ red blood cells already carry A, B, and Rh antigens, so an AB+ recipient&apos;s immune system doesn&apos;t react against any of those antigens arriving from a donor, allowing AB+ patients to receive blood from all eight types.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/blood-type-compatibility-checker" content={content}>
      <BloodTypeCompatibilityCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BloodTypeCompatibilityChecker;
