'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, Alert, Stack } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function buildMask(password: string, revealStart: number, revealEnd: number) {
  const length = password.length;
  if (length === 0) return '';

  const start = Math.max(0, Math.min(revealStart, length));
  const end = Math.max(0, Math.min(revealEnd, length));

  if (start + end >= length) {
    // Nothing left to mask in the middle -- just show it all rather than
    // producing a confusing negative-length mask.
    return password;
  }

  const startPart = password.slice(0, start);
  const endPart = end > 0 ? password.slice(length - end) : '';
  const middle = '*'.repeat(length - start - end);
  return `${startPart}${middle}${endPart}`;
}

const PasswordMaskGeneratorContent = () => {
  const [password, setPassword] = useState('Password123');
  const [revealStart, setRevealStart] = useState('2');
  const [revealEnd, setRevealEnd] = useState('2');

  const startNum = Math.max(0, parseInt(revealStart, 10) || 0);
  const endNum = Math.max(0, parseInt(revealEnd, 10) || 0);

  const masked = useMemo(() => buildMask(password, startNum, endNum), [password, startNum, endNum]);

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        Everything here runs in your browser only — the string you type is never saved or sent anywhere.
      </Alert>

      <TextField
        label="Password or String"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Reveal at Start"
          type="number"
          value={revealStart}
          onChange={(e) => setRevealStart(e.target.value)}
          fullWidth
        />
        <TextField
          label="Reveal at End"
          type="number"
          value={revealEnd}
          onChange={(e) => setRevealEnd(e.target.value)}
          fullWidth
        />
      </Stack>

      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <VisibilityOffIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h5" fontWeight={800} sx={{ wordBreak: 'break-all', fontFamily: 'monospace', mb: 1 }}>
          {masked || '—'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total length: {password.length} character{password.length === 1 ? '' : 's'}
        </Typography>
      </Paper>
    </Box>
  );
};

const PasswordMaskGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Password Mask Generator</Typography>
      <Typography variant="body1">
        Type a password or any sensitive string, then set how many characters to reveal at the start and at
        the end. The tool replaces everything in between with asterisks and shows the total length
        separately — so you can safely tell someone &quot;it&apos;s 15 characters, starts with Pa, and ends
        in 23&quot; without ever showing the full value.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With the password &quot;Password123&quot; and 2 characters revealed at both the start and end, the
        masked output is &quot;Pa*******23&quot;, with a total length of 11 characters shown underneath.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sharing partial password details with IT support or a teammate without exposing the full value.</li>
          <li>Confirming with someone over chat that they have the &quot;right&quot; password without typing it out in full.</li>
          <li>Displaying a masked version of an API key or token in documentation or a screenshot.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Password Hint Generator?</strong> The Password Hint Generator describes a password&apos;s structure in words (like &quot;starts with an uppercase letter, contains numbers and symbols&quot;) without showing any actual characters. This Password Mask Generator instead shows an actual partially-masked version of the string itself — real characters at the start and end, with the middle blanked out — rather than a structural description.</li>
          <li><strong>What happens if I reveal more characters than the password&apos;s length?</strong> If the start and end reveal counts together cover the entire string, the tool simply shows the full string, since there&apos;s no middle portion left to mask.</li>
          <li><strong>Is the string I type ever saved or transmitted?</strong> No — everything is processed with client-side JavaScript directly in your browser, and nothing is ever saved, logged, or sent to any server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/password-mask-generator" content={content}>
      <PasswordMaskGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PasswordMaskGenerator;
