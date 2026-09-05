'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function extractExtension(fileName: string): string | null {
  const trimmed = fileName.trim();
  const lastDot = trimmed.lastIndexOf('.');
  if (lastDot <= 0 || lastDot === trimmed.length - 1) return null; // no dot, leading dot only, or trailing dot
  return trimmed.slice(lastDot + 1).toLowerCase();
}

const FileExtensionExtractorContent = () => {
  const [raw, setRaw] = useState('archive.tar.gz\nreport.docx\nREADME\nphoto.JPG\nnotes.txt');

  const { rows, summary } = useMemo(() => {
    const lines = raw.split('\n').map((l) => l).filter((l) => l.trim().length > 0);
    const rows = lines.map((line) => ({ name: line.trim(), ext: extractExtension(line) }));
    const counts = new Map<string, number>();
    for (const r of rows) {
      const key = r.ext ?? '(no extension)';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const summary = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
    return { rows, summary };
  }, [raw]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="File Name(s) — one per line"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          multiline
          rows={10}
          fullWidth
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Extracted Extensions</Typography>
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Stack spacing={0.5}>
            {rows.map((r, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{r.name}</Typography>
                <Typography fontWeight={700} color={r.ext ? 'primary.main' : 'text.secondary'}>
                  {r.ext ? `.${r.ext}` : '—'}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Typography variant="subtitle1" fontWeight={600} mb={1}>Summary by Extension</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={0.5}>
            {summary.map(([ext, count]) => (
              <Box key={ext} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontFamily: 'monospace' }}>{ext === '(no extension)' ? ext : `.${ext}`}</Typography>
                <Typography fontWeight={700}>{count}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

const FileExtensionExtractor = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the File Extension Extractor</Typography>
      <Typography variant="body1">
        Paste a file name, or a list of file names one per line, and the tool pulls out just the extension —
        everything after the LAST dot in the name. Files with multiple dots (like{' '}
        <code>archive.tar.gz</code>) correctly return only the final segment (<code>gz</code>), and file names
        with no extension at all are handled gracefully rather than producing an error.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>archive.tar.gz</code> → <code>gz</code>, <code>report.docx</code> → <code>docx</code>, and{' '}
        <code>README</code> (no dot) → no extension. The summary panel then shows how many files in your list
        share each extension.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Auditing a folder listing to see the mix of file types it contains.</li>
          <li>Pulling extensions out of a batch of file names before filtering or sorting them.</li>
          <li>Checking that multi-dot file names like archives are parsed correctly before processing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the File Extension Finder?</strong> File Extension Finder looks up what an extension you already know MEANS — its file type and typical MIME type. This File Extension Extractor does the opposite: it PULLS the extension out of actual file names you provide, without explaining what that extension is used for.</li>
          <li><strong>How are file names with multiple dots handled, like archive.tar.gz?</strong> Only the text after the very last dot is treated as the extension, so <code>archive.tar.gz</code> correctly extracts <code>gz</code>, not <code>tar.gz</code>.</li>
          <li><strong>What happens if a file name has no dot at all?</strong> It&apos;s shown as having no extension rather than causing an error, and it&apos;s grouped under &quot;(no extension)&quot; in the summary.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/file-extension-extractor" content={content}>
      <FileExtensionExtractorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FileExtensionExtractor;
