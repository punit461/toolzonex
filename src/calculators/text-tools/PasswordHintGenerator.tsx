'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function buildHint(password: string) {
  if (!password) return null;
  const length = password.length;
  const first = password[0];
  const last = password[password.length - 1];
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const startsUpper = /[A-Z]/.test(first);
  const startsDigit = /[0-9]/.test(first);
  const endsDigit = /[0-9]/.test(last);
  const endsSymbol = /[^A-Za-z0-9]/.test(last);

  const traits: string[] = [];
  if (startsUpper) traits.push('starts with an uppercase letter');
  else if (startsDigit) traits.push('starts with a digit');
  else traits.push('starts with a lowercase letter');

  if (endsDigit) traits.push('ends with a digit');
  else if (endsSymbol) traits.push('ends with a symbol');
  else traits.push('ends with a letter');

  const contains: string[] = [];
  if (hasUpper) contains.push('uppercase letters');
  if (hasLower) contains.push('lowercase letters');
  if (hasDigit) contains.push('numbers');
  if (hasSymbol) contains.push('symbols');

  return {
    length,
    first,
    last,
    traits,
    contains,
  };
}

const PasswordHintGeneratorContent = () => {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const hint = useMemo(() => buildHint(password), [password]);

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <Alert severity="info" sx={{ mb: 3 }}>
        Your password is processed entirely in your browser. It is never saved, stored, or sent anywhere —
        not even to this site&apos;s own server.
      </Alert>

      <TextField
        label="Password"
        type={visible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setVisible((v) => !v)} edge="end" aria-label="Toggle password visibility">
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {hint ? (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <VpnKeyIcon fontSize="small" /> Your Memory Hint
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>First character:</strong> {hint.first} &nbsp;|&nbsp; <strong>Last character:</strong> {hint.last}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Length:</strong> {hint.length} characters
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Structure:</strong> {hint.traits.join(', ')}
          </Typography>
          <Typography variant="body1">
            <strong>Contains:</strong> {hint.contains.length > 0 ? hint.contains.join(', ') : 'only letters'}
          </Typography>
        </Paper>
      ) : (
        <Typography color="text.secondary">Type a password above to generate a memory hint.</Typography>
      )}
    </Box>
  );
};

const PasswordHintGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Password Hint Generator</Typography>
      <Typography variant="body1">
        Type your password into the field — it stays entirely in your browser and is never saved or sent
        anywhere. The tool then builds a memory hint that helps you recall the password without revealing it
        directly: it shows only the first and last character, the total length, a structural description
        (like whether it starts with an uppercase letter or ends with a digit), and which character types it
        contains.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a password like &quot;Tulip92!&quot;, the hint would show: first character &quot;T&quot;, last
        character &quot;!&quot;, length 8 characters, starts with an uppercase letter, ends with a symbol,
        and contains uppercase letters, lowercase letters, numbers, and symbols — enough to jog your memory
        without exposing the full password.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Jotting down a safe reminder of a password&apos;s shape without writing the password itself.</li>
          <li>Double-checking you&apos;re typing a remembered password correctly before a login attempt.</li>
          <li>Creating a quick structural reference when setting up a new password you want to remember.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Is my password saved or sent anywhere?</strong> No — this tool runs entirely in your
            browser using client-side JavaScript. Your password is never transmitted to any server, stored
            in a database, or logged anywhere. It exists only in your browser&apos;s memory for as long as
            the page is open, purely as an in-the-moment memory aid.
          </li>
          <li>
            <strong>Does the hint reveal my actual password?</strong> No — it deliberately shows only
            partial information (first/last character, length, and structure) rather than the password
            itself, so someone seeing the hint alone couldn&apos;t reconstruct your full password.
          </li>
          <li>
            <strong>Should I store this hint somewhere permanent?</strong> Treat it the same way you would
            any password-related note — keep it somewhere private, and consider using a proper password
            manager instead for long-term, secure password storage.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/password-hint-generator" content={content}>
      <PasswordHintGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default PasswordHintGenerator;
