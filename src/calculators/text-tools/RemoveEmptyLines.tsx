'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RemoveEmptyLinesContent = () => {
  const [text, setText] = useState('');

  const { result, removedCount } = useMemo(() => {
    if (!text) return { result: '', removedCount: 0 };
    const lines = text.split('\n');
    const kept = lines.filter((line) => line.trim().length > 0);
    return { result: kept.join('\n'), removedCount: lines.length - kept.length };
  }, [text]);

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder={'Line one\n\nLine two\n   \nLine three'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={12}
          fullWidth
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">
            Result{text ? ` (removed ${removedCount} blank line${removedCount === 1 ? '' : 's'})` : ''}:
          </Typography>
          {result && (
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
              Copy
            </Button>
          )}
        </Box>
        <TextField
          value={result}
          multiline
          rows={12}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Text with blank lines removed will appear here..."
        />
      </Box>
    </Box>
  );
};

const RemoveEmptyLines = () => {
  const content = (
    <>
      <Typography variant="h2">How to remove empty lines from text</Typography>
      <Typography variant="body1">
        Paste your text into the box above. Every line that is completely blank, or contains only spaces or
        tabs, is removed automatically — the cleaned result updates live on the right as you type.
      </Typography>

      <Typography variant="h2">Why remove empty lines?</Typography>
      <Typography variant="body1">
        Text copied from PDFs, spreadsheets, or web pages often carries extra blank lines that waste space,
        break formatting, or cause issues when importing into code or a database. This tool strips those out in
        one pass while keeping every line that actually has content.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Line one\n\nLine two\n   \nLine three&quot; becomes &quot;Line one\nLine two\nLine three&quot; —
        both the fully blank line and the whitespace-only line are removed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a list before importing it into a spreadsheet or database.</li>
          <li>Removing gaps left behind after copying text from a PDF.</li>
          <li>Compacting code or config files that have accumulated stray blank lines.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it remove lines with only spaces or tabs?</Typography>
      <Typography variant="body1">
        Yes — a line is treated as empty if it contains nothing, or only whitespace characters like spaces and
        tabs, and is removed either way.
      </Typography>
      <Typography variant="h3">Will this affect intentional paragraph spacing?</Typography>
      <Typography variant="body1">
        Yes — since every blank line is removed, paragraphs separated by a single blank line will end up
        directly adjacent. If you need to preserve paragraph breaks, keep one non-blank marker line between
        them before running this tool.
      </Typography>
      <Typography variant="h3">Does this update as I type?</Typography>
      <Typography variant="body1">
        Yes — there&apos;s no button to click. The cleaned result and the count of removed lines update
        instantly as you edit the text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/remove-empty-lines" content={content}>
      <RemoveEmptyLinesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveEmptyLines;
