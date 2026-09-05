'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DuplicateLineHighlighterContent = () => {
  const [text, setText] = useState('');

  const { lines, duplicateSet, duplicateCount } = useMemo(() => {
    const lines = text.split('\n');
    const counts: Record<string, number> = {};
    lines.forEach((line) => {
      counts[line] = (counts[line] || 0) + 1;
    });
    const duplicateSet = new Set(Object.keys(counts).filter((line) => line !== '' && counts[line] > 1));
    return { lines, duplicateSet, duplicateCount: duplicateSet.size };
  }, [text]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste multi-line text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={14}
        fullWidth
      />

      <Box>
        <Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Distinct Lines With Duplicates</Typography>
          <Typography variant="h4" fontWeight="bold">{duplicateCount}</Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minHeight: 300,
            maxHeight: 420,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            whiteSpace: 'pre-wrap',
          }}
        >
          {lines.length === 0 || (lines.length === 1 && lines[0] === '') ? (
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'inherit' }}>
              Paste some text to see duplicate lines highlighted here.
            </Typography>
          ) : (
            lines.map((line, i) => (
              <Box
                key={i}
                component="span"
                sx={{
                  display: 'block',
                  bgcolor: line !== '' && duplicateSet.has(line) ? 'warning.light' : 'transparent',
                  color: line !== '' && duplicateSet.has(line) ? 'warning.contrastText' : 'inherit',
                  borderRadius: 0.5,
                  px: 0.5,
                }}
              >
                {line === '' ? ' ' : line}
              </Box>
            ))
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const DuplicateLineHighlighter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Duplicate Line Highlighter</Typography>
      <Typography variant="body1">
        Paste multi-line text into the box, and the tool identifies every line that appears more than once in
        your input. The full text is rendered back exactly as entered on the right, with every duplicate line
        given a colored highlight so you can spot them at a glance — nothing is removed or altered. A count
        shows how many distinct lines have at least one duplicate.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a list where &quot;apple&quot; and &quot;banana&quot; each appear twice highlights both lines
        every time they occur, and reports &quot;2 distinct lines with duplicates,&quot; while unique lines like
        &quot;cherry&quot; stay unhighlighted.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reviewing a list before deciding whether duplicates are actually meaningful or accidental.</li>
          <li>Spotting repeated log lines, entries, or rows without automatically deleting anything.</li>
          <li>Proofreading a dataset or list for accidental copy-paste repeats before cleaning it up.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from Remove Duplicate Lines?</strong> Remove Duplicate Lines DELETES duplicate lines automatically, keeping only the first occurrence. This tool just visually flags duplicates in place, leaving every line untouched, so you can review them before deciding what — if anything — to do.</li>
          <li><strong>Are empty lines treated as duplicates?</strong> No — blank lines are never highlighted, even if there are several in a row, since flagging every blank line as a duplicate usually isn&apos;t useful.</li>
          <li><strong>Is the comparison case-sensitive?</strong> Yes — lines are compared exactly as typed, so &quot;Apple&quot; and &quot;apple&quot; are treated as different lines and won&apos;t be flagged as duplicates of each other.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/duplicate-line-highlighter" content={content}>
      <DuplicateLineHighlighterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DuplicateLineHighlighter;
