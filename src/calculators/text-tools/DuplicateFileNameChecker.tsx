'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, FormControlLabel, Switch, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface DuplicateGroup {
  name: string;
  count: number;
}

function findDuplicates(raw: string, caseInsensitive: boolean): DuplicateGroup[] {
  const lines = raw.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  const counts = new Map<string, { display: string; count: number }>();
  for (const line of lines) {
    const key = caseInsensitive ? line.toLowerCase() : line;
    const existing = counts.get(key);
    if (existing) {
      existing.count++;
    } else {
      counts.set(key, { display: line, count: 1 });
    }
  }
  return Array.from(counts.values())
    .filter((v) => v.count > 1)
    .map((v) => ({ name: v.display, count: v.count }));
}

const DuplicateFileNameCheckerContent = () => {
  const [raw, setRaw] = useState('report.docx\nimage.png\nReport.docx\nnotes.txt\nimage.png\nsummary.pdf');
  const [caseInsensitive, setCaseInsensitive] = useState(true);

  const duplicates = useMemo(() => findDuplicates(raw, caseInsensitive), [raw, caseInsensitive]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="File Names (one per line)"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Switch checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} />}
          label={'Case-insensitive matching ("Report.docx" = "report.docx")'}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          {duplicates.length > 0
            ? `${duplicates.length} Duplicate Group${duplicates.length === 1 ? '' : 's'} Found`
            : 'No Duplicates Found'}
        </Typography>
        {duplicates.length === 0 ? (
          <Alert severity="success">Every file name in the list is unique.</Alert>
        ) : (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1}>
              {duplicates.map((d) => (
                <Box key={d.name} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{d.name}</Typography>
                  <Typography color="error.main" fontWeight={700}>× {d.count}</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const DuplicateFileNameChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Duplicate File Name Checker</Typography>
      <Typography variant="body1">
        Paste a list of file names, one per line — for example, copied from a folder listing or a spreadsheet
        column — and the tool scans for any name that appears more than once. Toggle case-insensitive matching
        depending on whether &quot;Report.docx&quot; and &quot;report.docx&quot; should count as the same name.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A list containing <code>report.docx</code>, <code>image.png</code>, <code>Report.docx</code>,{' '}
        <code>notes.txt</code>, and <code>image.png</code> again finds 2 duplicate groups with case-insensitive
        matching on: &quot;report.docx&quot; appearing twice and &quot;image.png&quot; appearing twice.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a folder listing for accidental duplicate uploads before archiving.</li>
          <li>Auditing a spreadsheet of file references for repeated entries.</li>
          <li>Verifying a batch export or backup job didn&apos;t create duplicate file names.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does it compare full paths or just file names?</strong> It compares whatever text you paste on each line exactly — if you paste full paths, it compares full paths; if you paste just file names, it compares just the names.</li>
          <li><strong>What counts as one "duplicate group"?</strong> Every unique name that appears two or more times counts as one group, regardless of how many times it repeats — so a name appearing 5 times is still just 1 duplicate group, shown with a count of 5.</li>
          <li><strong>Are blank lines counted?</strong> No — empty or whitespace-only lines are ignored and never counted as duplicates of each other.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/duplicate-file-name-checker" content={content}>
      <DuplicateFileNameCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DuplicateFileNameChecker;
