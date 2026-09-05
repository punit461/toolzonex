'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, FormControlLabel, Switch } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const INVALID_CHARS_REGEX = /[<>:"/\\|?*]/g;

function cleanFileName(name: string, useUnderscore: boolean, lowercase: boolean): string {
  let cleaned = name.replace(INVALID_CHARS_REGEX, '');
  cleaned = cleaned.replace(/\s+/g, useUnderscore ? '_' : '-');
  // Trim leading/trailing dots and spaces (spaces already replaced, but trim raw dots)
  cleaned = cleaned.replace(/^[.\s]+|[.\s]+$/g, '');
  // Collapse repeated separators created by consecutive invalid chars/spaces
  const sep = useUnderscore ? '_' : '-';
  const collapseRegex = new RegExp(`${sep}{2,}`, 'g');
  cleaned = cleaned.replace(collapseRegex, sep);
  if (lowercase) cleaned = cleaned.toLowerCase();
  return cleaned;
}

const FileNameCleanerContent = () => {
  const [raw, setRaw] = useState('My Report (Final)!?.docx');
  const [useUnderscore, setUseUnderscore] = useState(false);
  const [lowercase, setLowercase] = useState(false);

  const lines = useMemo(
    () => raw.split('\n').map((l) => l).filter((l) => l.trim().length > 0),
    [raw]
  );

  const cleaned = useMemo(
    () => lines.map((line) => cleanFileName(line, useUnderscore, lowercase)),
    [lines, useUnderscore, lowercase]
  );

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Messy File Name(s) — one per line"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={3}>
          <FormControlLabel
            control={<Switch checked={useUnderscore} onChange={(e) => setUseUnderscore(e.target.checked)} />}
            label="Use underscore instead of hyphen"
          />
          <FormControlLabel
            control={<Switch checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />}
            label="Lowercase everything"
          />
        </Stack>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Cleaned File Name(s)</Typography>
        {cleaned.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            Enter a file name to see the cleaned version here.
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>
              {cleaned.map((name, i) => (
                <Typography key={i} sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  {name || '(empty)'}
                </Typography>
              ))}
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const FileNameCleaner = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the File Name Cleaner</Typography>
      <Typography variant="body1">
        Paste a messy file name, or a list of them one per line, and the tool sanitizes each one: it strips
        out characters that cause problems across common operating systems (<code>{'< > : " / \\ | ? *'}</code>),
        replaces spaces with a hyphen or underscore (your choice via the toggle), and trims any leading or
        trailing dots and spaces. Turn on &quot;Lowercase everything&quot; if you also want fully lowercase
        output.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>My Report (Final)!?.docx</code> cleans to <code>My-Reports-Final.docx</code> with the hyphen
        separator, or <code>my_report_final.docx</code> with underscore and lowercase both turned on.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sanitizing file names before uploading them to a system that rejects special characters.</li>
          <li>Cleaning up a batch of downloaded file names that contain spaces and punctuation.</li>
          <li>Standardizing file naming to a consistent hyphen or underscore style across a project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Which characters get removed?</strong> The characters that are invalid or problematic on common operating systems: <code>{'< > : " / \\ | ? *'}</code>. These are stripped out entirely rather than replaced, since there&apos;s no universally safe substitute for most of them.</li>
          <li><strong>Does this rename the actual file?</strong> No — this tool only generates a cleaned version of the text you provide; you still need to rename the actual file yourself using the cleaned name it outputs.</li>
          <li><strong>What happens to the file extension?</strong> The extension is treated as part of the name and cleaned the same way as the rest — if you use the lowercase toggle, the extension is lowercased too, which is usually desirable for consistency.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/file-name-cleaner" content={content}>
      <FileNameCleanerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FileNameCleaner;
