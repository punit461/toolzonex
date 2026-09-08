'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SequentialFileNumberingToolContent = () => {
  const [baseName, setBaseName] = useState('photo');
  const [startNumber, setStartNumber] = useState('1');
  const [count, setCount] = useState('10');
  const [padding, setPadding] = useState('3');
  const [extension, setExtension] = useState('jpg');

  const fileNames = useMemo(() => {
    const start = Math.max(0, parseInt(startNumber, 10) || 0);
    const total = Math.min(5000, Math.max(0, parseInt(count, 10) || 0));
    const pad = Math.max(0, Math.min(10, parseInt(padding, 10) || 0));
    const ext = extension.trim().replace(/^\./, '');

    const names: string[] = [];
    for (let i = 0; i < total; i++) {
      const num = String(start + i).padStart(pad, '0');
      const name = ext ? `${baseName.trim() || 'file'}_${num}.${ext}` : `${baseName.trim() || 'file'}_${num}`;
      names.push(name);
    }
    return names;
  }, [baseName, startNumber, count, padding, extension]);

  const copyList = async () => {
    try {
      await navigator.clipboard.writeText(fileNames.join('\n'));
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <Stack spacing={2}>
          <TextField label="Base filename" value={baseName} onChange={(e) => setBaseName(e.target.value)} placeholder="e.g. photo" fullWidth />
          <TextField label="Starting number" type="number" value={startNumber} onChange={(e) => setStartNumber(e.target.value)} fullWidth />
          <TextField label="Number of files" type="number" value={count} onChange={(e) => setCount(e.target.value)} fullWidth />
          <TextField label="Zero-padding width" type="number" value={padding} onChange={(e) => setPadding(e.target.value)} helperText="e.g. 3 produces 001, 002, ..." fullWidth />
          <TextField label="File extension (optional)" value={extension} onChange={(e) => setExtension(e.target.value)} placeholder="e.g. jpg" fullWidth />
        </Stack>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>{fileNames.length} Filename{fileNames.length === 1 ? '' : 's'} Generated</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyList} disabled={fileNames.length === 0}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, maxHeight: 350, overflowY: 'auto' }}>
          {fileNames.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Set a base name and file count to generate filenames.</Typography>
          ) : (
            <Box component="ul" sx={{ fontFamily: 'monospace', m: 0, pl: 3 }}>
              {fileNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const SequentialFileNumberingTool = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Sequential File Numbering Tool</Typography>
      <Typography variant="body1">
        Enter a base filename, a starting number, how many files you need, and a zero-padding width — for
        example, a padding of 3 turns the number 1 into &quot;001&quot;. Optionally add a file extension. The
        tool generates a full sequential list of numbered filenames, from the starting number through the last
        one, ready to copy.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A base name of &quot;photo&quot;, starting number 1, count 50, padding width 3, and extension
        &quot;jpg&quot; generates <code>photo_001.jpg</code> through <code>photo_050.jpg</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a batch rename of photos or scanned documents before running it in a file manager.</li>
          <li>Generating a reference list of expected filenames for a script or bulk upload.</li>
          <li>Creating consistently numbered placeholder names for a set of exported files.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this tool actually rename my files?</strong> No — it only generates the list of filenames as text. Use the generated list as a reference alongside your operating system&apos;s batch rename feature or a script.</li>
          <li><strong>What happens if I set the padding width too low for the last number?</strong> Numbers that need more digits than the padding width simply print at their natural length — for example, padding width 2 with a count that reaches 100 still shows &quot;100&quot; rather than truncating it.</li>
          <li><strong>Is the file extension required?</strong> No — leave it blank to generate filenames with no extension, useful for folder names or extension-less identifiers.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/sequential-file-numbering-tool" content={content}>
      <SequentialFileNumberingToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SequentialFileNumberingTool;
