'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const WordWrapToolContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [columnLimit, setColumnLimit] = useState('80');
  const [breakWords, setBreakWords] = useState(false);

  const wrapText = () => {
    const limit = parseInt(columnLimit, 10) || 80;
    if (limit <= 0) return;

    const lines = text.split('\n');
    let wrappedLines: string[] = [];

    lines.forEach(line => {
      if (line.length <= limit) {
        wrappedLines.push(line);
        return;
      }

      if (breakWords) {
        // Just slice the string strictly every 'limit' characters
        let currentLine = line;
        while (currentLine.length > limit) {
          wrappedLines.push(currentLine.substring(0, limit));
          currentLine = currentLine.substring(limit);
        }
        wrappedLines.push(currentLine);
      } else {
        // Word wrap safely
        const words = line.split(' ');
        let currentString = '';

        words.forEach(word => {
          // If a single word is longer than the limit, we have to put it on its own line
          // (or break it, but since breakWords=false, we keep it intact on a new line)
          if ((currentString + word).length > limit) {
            if (currentString.length > 0) {
              wrappedLines.push(currentString.trim());
              currentString = word + ' ';
            } else {
              wrappedLines.push(word);
            }
          } else {
            currentString += word + ' ';
          }
        });
        
        if (currentString.trim().length > 0) {
          wrappedLines.push(currentString.trim());
        }
      }
    });

    setResult(wrappedLines.join('\n'));
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
          label="Input Text"
          placeholder="Paste long paragraphs here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <TextField
            label="Column Limit (Characters)"
            type="number"
            value={columnLimit}
            onChange={(e) => setColumnLimit(e.target.value)}
            sx={{ width: 200 }}
          />
          <FormControlLabel
            control={<Checkbox checked={breakWords} onChange={(e) => setBreakWords(e.target.checked)} />}
            label="Force break long words"
          />
        </Box>

        <Button variant="contained" onClick={wrapText} fullWidth size="large">
          Wrap Text
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
          InputProps={{ readOnly: true, sx: { fontFamily: 'monospace' } }}
          placeholder="Wrapped text will appear here..."
        />
      </Box>
    </Box>
  );
};

const WordWrapTool = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Word Wrap Tool?</Typography>
      <Typography variant="body1">
        Paste your long text, specify the maximum number of characters per line (e.g., 80 characters), and click "Wrap Text". The tool will automatically insert line breaks so that no line exceeds your specified length.
      </Typography>

      <Typography variant="h2">Why use this tool?</Typography>
      <Typography variant="body1">
        When dealing with plain text documents, terminal outputs, or code comments, standard conventions often dictate that lines should not exceed 80 or 120 columns. This ensures readability across all devices and editors without horizontal scrolling.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Word Wrap Tool"
      description="Automatically wrap text to a specific character limit or column width. Free online text formatter."
      url="/tools/word-wrap-tool"
      content={content}
      category="Tools"
    >
      <WordWrapToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordWrapTool;
