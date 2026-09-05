'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MULTI_SPACE_RE = /  +/g;

const ConsecutiveSpaceFinderContent = () => {
  const [text, setText] = useState('');

  const { segments, runCount } = useMemo(() => {
    if (!text) return { segments: [] as { value: string; highlight: boolean }[], runCount: 0 };

    const segments: { value: string; highlight: boolean }[] = [];
    let lastIndex = 0;
    let count = 0;
    let match: RegExpExecArray | null;
    const re = new RegExp(MULTI_SPACE_RE);
    while ((match = re.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ value: text.slice(lastIndex, match.index), highlight: false });
      }
      segments.push({ value: match[0], highlight: true });
      count++;
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      segments.push({ value: text.slice(lastIndex), highlight: false });
    }

    return { segments, runCount: count };
  }, [text]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste text that might contain double or extra spaces..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={14}
        fullWidth
      />

      <Box>
        <Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Consecutive-Space Runs Found</Typography>
          <Typography variant="h4" fontWeight="bold">{runCount}</Typography>
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
          {segments.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'inherit' }}>
              Paste some text to see consecutive spaces highlighted here.
            </Typography>
          ) : (
            segments.map((seg, i) =>
              seg.highlight ? (
                <Box
                  key={i}
                  component="span"
                  sx={{ bgcolor: 'warning.light', color: 'warning.contrastText', borderRadius: 0.5 }}
                >
                  {seg.value}
                </Box>
              ) : (
                <Box key={i} component="span">
                  {seg.value}
                </Box>
              )
            )
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const ConsecutiveSpaceFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Consecutive Space Finder</Typography>
      <Typography variant="body1">
        Paste your text into the box, and the tool scans it for every run of two or more consecutive space
        characters. Your full text is rendered back exactly as entered on the right, with each run of extra
        spaces given a colored highlight so you can see precisely where they occur — nothing in the text is
        changed. A count shows how many such runs were found in total.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting &quot;This  has   some    extra spaces&quot; highlights three separate runs (two, three, and
        four spaces in a row) and reports &quot;3 consecutive-space runs found,&quot; while the single space
        before &quot;spaces&quot; is left unhighlighted.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reviewing exactly where extra spacing issues occur in a document before cleaning it up.</li>
          <li>Auditing pasted content from a PDF, email, or webpage for messy double-spacing.</li>
          <li>Spot-checking formatting consistency in code, data files, or copy-editing drafts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Whitespace Cleaner?</strong> The Whitespace Cleaner REMOVES extra whitespace automatically, collapsing multiple spaces down to one. This tool only visually flags where consecutive spaces occur, leaving the text completely unchanged, so you can review it first before deciding whether to clean it.</li>
          <li><strong>Does this catch tabs or line breaks too?</strong> No — it specifically looks for runs of two or more regular space characters; tabs and line breaks are treated as separate characters and aren&apos;t flagged by this tool.</li>
          <li><strong>Does a single space between words get highlighted?</strong> No — only runs of two or more consecutive spaces are highlighted; normal single-space word spacing is left alone.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/consecutive-space-finder" content={content}>
      <ConsecutiveSpaceFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ConsecutiveSpaceFinder;
