'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ELLIPSIS = '...';

function shortenFileName(fileName: string, maxLength: number): string {
  const trimmed = fileName.trim();
  if (trimmed.length <= maxLength) return trimmed;

  const lastDot = trimmed.lastIndexOf('.');
  const hasExt = lastDot > 0 && lastDot < trimmed.length - 1;
  const ext = hasExt ? trimmed.slice(lastDot) : ''; // includes the dot
  const base = hasExt ? trimmed.slice(0, lastDot) : trimmed;

  const allowedBaseLength = maxLength - ext.length - ELLIPSIS.length;
  if (allowedBaseLength <= 0) {
    // Extension alone is too long to fit meaningfully; just hard-truncate the whole string.
    return trimmed.slice(0, Math.max(maxLength, 1));
  }
  const truncatedBase = base.slice(0, allowedBaseLength);
  return `${truncatedBase}${ELLIPSIS}${ext}`;
}

const FileNameShortenerContent = () => {
  const [raw, setRaw] = useState('very-long-descriptive-filename-that-is-way-too-long-for-most-systems.pdf');
  const [maxLength, setMaxLength] = useState('30');

  const max = parseInt(maxLength, 10);
  const validMax = !isNaN(max) && max > 0;

  const rows = useMemo(() => {
    if (!validMax) return [];
    return raw
      .split('\n')
      .map((l) => l)
      .filter((l) => l.trim().length > 0)
      .map((line) => ({ original: line.trim(), shortened: shortenFileName(line, max) }));
  }, [raw, max, validMax]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="File Name(s) — one per line"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          multiline
          rows={8}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Max Total Length (characters)"
          type="number"
          value={maxLength}
          onChange={(e) => setMaxLength(e.target.value)}
          fullWidth
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Shortened File Name(s)</Typography>
        {!validMax ? (
          <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
            Enter a valid max length to see results.
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              {rows.map((r, i) => (
                <Box key={i}>
                  <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all', fontWeight: 700 }}>
                    {r.shortened}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {r.shortened.length} chars (was {r.original.length})
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const FileNameShortener = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the File Name Shortener</Typography>
      <Typography variant="body1">
        Paste a file name (or a list, one per line) and set a max total length. Any name longer than that limit
        has its BASE portion truncated and an ellipsis inserted, while the file extension is always preserved
        intact at the end — so you never lose the information needed to know what type of file it is.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>very-long-descriptive-filename-that-is-way-too-long-for-most-systems.pdf</code> at a max length of
        30 becomes <code>very-long-descriptive-fi....pdf</code> — the base name is cut short and an ellipsis is
        inserted, but <code>.pdf</code> is kept fully intact at the end.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fitting file names within a length limit imposed by an older operating system or file system.</li>
          <li>Shortening long auto-generated file names before displaying them in a UI list.</li>
          <li>Preparing file names for upload to a system with a strict character limit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the File Name Cleaner?</strong> File Name Cleaner sanitizes invalid characters and normalizes casing — a concern about which CHARACTERS are valid. This File Name Shortener addresses a completely different concern: file name LENGTH, truncating names that are simply too long regardless of whether their characters are valid.</li>
          <li><strong>Is the file extension ever cut off?</strong> No — the extension is always preserved in full; only the base name (everything before the last dot) is shortened to make room within the max length.</li>
          <li><strong>What happens if the extension itself is longer than the max length?</strong> In that rare edge case, there isn&apos;t enough room to keep the extension intact and add an ellipsis meaningfully, so the tool falls back to a simple hard truncation of the whole name to the max length.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/file-name-shortener" content={content}>
      <FileNameShortenerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FileNameShortener;
