'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Switch,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function cleanUsername(
  raw: string,
  opts: { allowUnderscore: boolean; allowPeriod: boolean; allowHyphen: boolean; maxLength: number; lowercase: boolean }
): string {
  let allowedPattern = 'a-zA-Z0-9';
  if (opts.allowUnderscore) allowedPattern += '_';
  if (opts.allowPeriod) allowedPattern += '.';
  if (opts.allowHyphen) allowedPattern += '\\-';
  const regex = new RegExp(`[^${allowedPattern}]`, 'g');

  let cleaned = raw.replace(/\s+/g, '').replace(regex, '');
  if (opts.lowercase) cleaned = cleaned.toLowerCase();
  if (opts.maxLength > 0) cleaned = cleaned.slice(0, opts.maxLength);
  return cleaned;
}

const UsernameCleanerContent = () => {
  const [input, setInput] = useState('');
  const [allowUnderscore, setAllowUnderscore] = useState(true);
  const [allowPeriod, setAllowPeriod] = useState(true);
  const [allowHyphen, setAllowHyphen] = useState(true);
  const [maxLength, setMaxLength] = useState('20');
  const [lowercase, setLowercase] = useState(false);
  const [copied, setCopied] = useState(false);

  const maxLen = parseInt(maxLength, 10) || 20;

  const output = useMemo(() => {
    const lines = input.split('\n');
    return lines
      .map((line) => cleanUsername(line, { allowUnderscore, allowPeriod, allowHyphen, maxLength: maxLen, lowercase }))
      .filter((line, idx, arr) => line.length > 0 || arr.length === 1)
      .join('\n');
  }, [input, allowUnderscore, allowPeriod, allowHyphen, maxLen, lowercase]);

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Desired Username(s)"
        placeholder="Enter one username per line, e.g. John Smith 99"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={5}
        fullWidth
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <FormControlLabel
          control={<Checkbox checked={allowUnderscore} onChange={(e) => setAllowUnderscore(e.target.checked)} />}
          label="Allow underscore ( _ )"
        />
        <FormControlLabel
          control={<Checkbox checked={allowPeriod} onChange={(e) => setAllowPeriod(e.target.checked)} />}
          label="Allow period ( . )"
        />
        <FormControlLabel
          control={<Checkbox checked={allowHyphen} onChange={(e) => setAllowHyphen(e.target.checked)} />}
          label="Allow hyphen ( - )"
        />
        <FormControlLabel
          control={<Switch checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />}
          label="Lowercase everything"
        />
        <TextField
          label="Max Length"
          type="number"
          value={maxLength}
          onChange={(e) => setMaxLength(e.target.value)}
          sx={{ width: 120 }}
          inputProps={{ min: 1, max: 50 }}
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Cleaned Username(s):</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          value={output}
          multiline
          rows={5}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Cleaned username(s) will appear here..."
        />
      </Box>
    </Box>
  );
};

const UsernameCleaner = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Username Cleaner</Typography>
      <Typography variant="body1">
        Type or paste the username (or a list of usernames, one per line) you already have in mind. Choose which
        extra characters to allow beyond letters and numbers — underscore, period, and hyphen are the most common
        platform-allowed extras — set a maximum length, and optionally force everything to lowercase. The tool
        strips spaces, removes any character outside your allowed set, and truncates to your chosen length so the
        result fits common username formatting rules used across most sign-up forms.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>John Smith! 1999</code> with underscore, period, and hyphen all allowed and a max length of
        15 produces <code>JohnSmith1999</code>. Turning on the lowercase toggle instead produces{' '}
        <code>johnsmith1999</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a full name or phrase into a username that passes a signup form&apos;s character restrictions.</li>
          <li>Cleaning up a batch of usernames pasted from a spreadsheet before a bulk account import.</li>
          <li>Enforcing a consistent lowercase, length-limited username format across a team or organization.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Username Generator or Random Username Generator?</strong> Those two tools CREATE a brand-new username for you — one builds suggestions from a keyword, the other generates a fully random one. This Username Cleaner does the opposite job: it takes a username you already have in mind and sanitizes it to fit common platform formatting rules, without inventing anything new.</li>
          <li><strong>Why would a character get removed?</strong> Most platforms only allow letters, numbers, and a small set of punctuation like underscore, period, or hyphen. Any other character — spaces, emoji, accented letters, symbols — is stripped out because it would likely be rejected by a signup form.</li>
          <li><strong>Does it check if the username is actually available?</strong> No — this tool only reformats the text you provide; it doesn&apos;t check any platform to see whether that username is already taken.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/username-cleaner" content={content}>
      <UsernameCleanerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UsernameCleaner;
