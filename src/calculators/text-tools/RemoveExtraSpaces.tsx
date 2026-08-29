'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RemoveExtraSpacesContent = () => {
  const [text, setText] = useState('');
  const [trimEnds, setTrimEnds] = useState(true);

  const result = useMemo(() => {
    let processed = text.replace(/[^\S\r\n]+/g, ' ');
    if (trimEnds) {
      processed = processed
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
    }
    return processed;
  }, [text, trimEnds]);

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
          placeholder={"Text   with     extra    spaces   between words"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox checked={trimEnds} onChange={(e) => setTrimEnds(e.target.checked)} />}
          label="Also trim leading/trailing spaces on each line"
        />
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result (updates live):</Typography>
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
          placeholder="Text with single spaces will appear here..."
        />
      </Box>
    </Box>
  );
};

const RemoveExtraSpaces = () => {
  const content = (
    <>
      <Typography variant="h2">How to remove extra spaces from text</Typography>
      <Typography variant="body1">
        Paste your text into the box above. Every run of two or more consecutive spaces is collapsed into a
        single space, and the result updates live as you type. Enable the trim option to also strip leading and
        trailing spaces from each line.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Text   with     extra    spaces&quot; becomes &quot;Text with extra spaces&quot; — every gap of
        multiple spaces is reduced to exactly one space, while line breaks are preserved.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Fixing spacing issues left over from copying text out of a PDF.</li>
          <li>Cleaning up form input or pasted content before saving it.</li>
          <li>Normalizing spacing in code comments or plain-text documents.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this remove line breaks too?</Typography>
      <Typography variant="body1">
        No — only spaces and tabs within a line are collapsed. Line breaks are left in place so your paragraph
        structure stays intact.
      </Typography>
      <Typography variant="h3">What does the trim option do?</Typography>
      <Typography variant="body1">
        With trimming enabled, any spaces at the very start or end of each line are also removed, in addition
        to collapsing multiple spaces within the line.
      </Typography>
      <Typography variant="h3">Does it update as I type?</Typography>
      <Typography variant="body1">
        Yes — there&apos;s no button to click. The cleaned result recalculates instantly as you edit the text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/remove-extra-spaces" content={content}>
      <RemoveExtraSpacesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveExtraSpaces;
