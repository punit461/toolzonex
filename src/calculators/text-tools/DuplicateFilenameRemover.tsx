'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function splitExtension(name: string): [string, string] {
  const idx = name.lastIndexOf('.');
  if (idx <= 0) return [name, '']; // no dot, or a dotfile like ".gitignore" -> treat as no extension
  return [name.slice(0, idx), name.slice(idx)];
}

function resolveDuplicates(names: string[]): { resolved: string[]; renamedCount: number } {
  const used = new Set<string>();
  const nextSuffix = new Map<string, number>();
  const resolved: string[] = [];
  let renamedCount = 0;

  for (const name of names) {
    if (!used.has(name)) {
      used.add(name);
      resolved.push(name);
      continue;
    }
    const [base, ext] = splitExtension(name);
    let n = nextSuffix.get(name) ?? 1;
    let candidate = `${base} (${n})${ext}`;
    while (used.has(candidate)) {
      n++;
      candidate = `${base} (${n})${ext}`;
    }
    nextSuffix.set(name, n + 1);
    used.add(candidate);
    resolved.push(candidate);
    renamedCount++;
  }

  return { resolved, renamedCount };
}

const DEFAULT_INPUT = 'report.pdf\nimage.png\nreport.pdf\nnotes.txt\nreport.pdf\nimage.png';

const DuplicateFilenameRemoverContent = () => {
  const [raw, setRaw] = useState(DEFAULT_INPUT);

  const { resolved, renamedCount } = useMemo(() => {
    const names = raw.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    return resolveDuplicates(names);
  }, [raw]);

  const output = resolved.join('\n');

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch {}
  };

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
        />
      </Box>

      <Box sx={{ order: { xs: -1, md: 0 }, mb: { xs: 4, md: 0 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>Resolved File Names</Typography>
          {output && (
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
              Copy
            </Button>
          )}
        </Box>
        <TextField
          value={output}
          multiline
          rows={10}
          fullWidth
          InputProps={{ readOnly: true, sx: { fontFamily: 'monospace' } }}
          placeholder="Resolved file names will appear here..."
          sx={{ mb: 2 }}
        />
        {renamedCount > 0 ? (
          <Alert severity="success">Renamed {renamedCount} duplicate file name{renamedCount === 1 ? '' : 's'} with a numbered suffix.</Alert>
        ) : (
          <Paper variant="outlined" sx={{ p: 1.5 }}>
            <Typography variant="body2" color="text.secondary">No duplicate file names found — the list is already unique.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const DuplicateFilenameRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Duplicate Filename Remover</Typography>
      <Typography variant="body1">
        Paste a list of file names, one per line. The tool scans for names that appear more than once and
        automatically renames every repeated occurrence after the first by appending a numbered suffix, like
        &quot; (1)&quot; or &quot; (2)&quot;, while correctly preserving the file extension. The result is a
        fully resolved list where every name is unique.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A list containing <code>report.pdf</code>, <code>image.png</code>, <code>report.pdf</code> again, and{' '}
        <code>report.pdf</code> a third time resolves to <code>report.pdf</code>, <code>image.png</code>,{' '}
        <code>report (1).pdf</code>, and <code>report (2).pdf</code> — the extension stays attached to the end
        of each renamed file.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a list of files for upload to a system that doesn&apos;t allow duplicate names.</li>
          <li>Resolving naming conflicts before merging files from multiple folders or backups.</li>
          <li>Cleaning up an export or batch job that accidentally produced repeated file names.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Duplicate File Name Checker?</strong> The Duplicate File Name Checker only identifies and flags which filenames are duplicated, without changing anything. This tool actually resolves the duplicates by renaming each repeated occurrence with a numbered suffix, giving you a ready-to-use, all-unique list.</li>
          <li><strong>Does it rename the first occurrence of a repeated name?</strong> No — the first occurrence always keeps its original name; only the second, third, and later occurrences get a numbered suffix appended.</li>
          <li><strong>What happens with a file that has no extension, like a folder name?</strong> The numbered suffix is simply appended to the end of the name — since there&apos;s no extension to preserve, nothing special happens with the dot placement.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/duplicate-filename-remover" content={content}>
      <DuplicateFilenameRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DuplicateFilenameRemover;
