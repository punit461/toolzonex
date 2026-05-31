'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const LinePrefixSuffixContent = () => {
  const [text, setText] = useState('');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [result, setResult] = useState('');
  const [skipEmptyLines, setSkipEmptyLines] = useState(true);

  const applyFormatting = () => {
    const lines = text.split('\n');
    const processed = lines.map(line => {
      if (skipEmptyLines && line.trim() === '') return line;
      return `${prefix}${line}${suffix}`;
    });
    setResult(processed.join('\n'));
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text (Multiple Lines)"
          placeholder="Paste a list of items here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Prefix (Start of line)"
            placeholder="e.g. - "
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            fullWidth
          />
          <TextField
            label="Suffix (End of line)"
            placeholder="e.g. ,"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            fullWidth
          />
        </Box>

        <FormControlLabel
          control={<Checkbox checked={skipEmptyLines} onChange={(e) => setSkipEmptyLines(e.target.checked)} />}
          label="Skip empty lines"
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={applyFormatting} fullWidth size="large">
          Apply Prefix & Suffix
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
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
          placeholder="Formatted text will appear here..."
        />
      </Box>
    </Box>
  );
};

const LinePrefixSuffix = () => {
  const content = (
    <>
      <Typography variant="h2">How to add Prefix and Suffixes?</Typography>
      <Typography variant="body1">
        Paste your list into the main text box. Then, specify the exact text you want added to the beginning (prefix) or the end (suffix) of every line. Click the button to apply it instantly to hundreds of lines.
      </Typography>

      <Typography variant="h2">Use Cases</Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>Programming:</strong> Wrap a list of words in quotes and commas (e.g., prefix: <code>"</code> and suffix: <code>",</code>) to create a JSON array or SQL list.</li>
          <li><strong>Formatting:</strong> Add bullet points (e.g., prefix: <code>- </code>) to a raw text list for markdown files.</li>
          <li><strong>Data Entry:</strong> Append domain names or extensions to a list of usernames.</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Line Prefix & Suffix Tool"
      description="Add text to the beginning or end of every line instantly. Free online list formatting tool for developers."
      url="/tools/line-prefix-suffix-tool"
      content={content}
      category="Tools"
    >
      <LinePrefixSuffixContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LinePrefixSuffix;
