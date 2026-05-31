'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextSplitterContent = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [mode, setMode] = useState('by-character');
  const [delimiter, setDelimiter] = useState(',');
  const [chunkSize, setChunkSize] = useState('50');

  const handleSplit = () => {
    let splits: string[] = [];
    if (!text) {
      setResults([]);
      return;
    }

    if (mode === 'by-character') {
      const size = parseInt(chunkSize, 10) || 1;
      const regex = new RegExp(`.{1,${size}}`, 'g');
      splits = text.match(regex) || [];
    } else if (mode === 'by-delimiter') {
      splits = text.split(delimiter);
    } else if (mode === 'by-line') {
      const numLines = parseInt(chunkSize, 10) || 1;
      const lines = text.split('\n');
      for (let i = 0; i < lines.length; i += numLines) {
        splits.push(lines.slice(i, i + numLines).join('\n'));
      }
    }

    setResults(splits);
  };

  const copyChunk = async (chunk: string) => {
    try {
      await navigator.clipboard.writeText(chunk);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste text you want to split..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <FormControl sx={{ minWidth: 200, flexGrow: 1 }}>
            <InputLabel>Split Method</InputLabel>
            <Select
              value={mode}
              label="Split Method"
              onChange={(e) => setMode(e.target.value)}
            >
              <MenuItem value="by-character">By Number of Characters</MenuItem>
              <MenuItem value="by-line">By Number of Lines</MenuItem>
              <MenuItem value="by-delimiter">By Custom Delimiter</MenuItem>
            </Select>
          </FormControl>

          {mode === 'by-character' && (
            <TextField label="Chunk Size (Chars)" value={chunkSize} onChange={(e) => setChunkSize(e.target.value)} sx={{ width: 150 }} />
          )}
          
          {mode === 'by-line' && (
            <TextField label="Chunk Size (Lines)" value={chunkSize} onChange={(e) => setChunkSize(e.target.value)} sx={{ width: 150 }} />
          )}

          {mode === 'by-delimiter' && (
            <TextField label="Delimiter" value={delimiter} onChange={(e) => setDelimiter(e.target.value)} sx={{ width: 150 }} />
          )}
        </Box>

        <Button variant="contained" onClick={handleSplit} size="large">
          Split Text
        </Button>
      </Box>

      {results.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Results ({results.length} chunks)
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {results.map((chunk, idx) => (
              <Paper key={idx} sx={{ p: 2, display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">Chunk {idx + 1}</Typography>
                  <Button size="small" onClick={() => copyChunk(chunk)} startIcon={<ContentCopyIcon fontSize="small"/>}>Copy</Button>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace' }}>
                  {chunk}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const TextSplitter = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Text Splitter?</Typography>
      <Typography variant="body1">
        Paste your text, choose a splitting method (by character count, line count, or a custom delimiter like a comma or pipe), and click "Split Text". The tool divides your text into manageable chunks that you can copy individually.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>Social Media:</strong> Split long paragraphs into 280-character chunks for Twitter/X threads.</li>
          <li><strong>Data Processing:</strong> Split comma-separated values (CSV) into separate items.</li>
          <li><strong>Messaging Limits:</strong> Break huge text files into smaller chunks to bypass character limits in SMS or WhatsApp.</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Splitter"
      description="Split text by characters, lines, or delimiters. Break large texts into smaller chunks online for free."
      url="/tools/text-splitter"
      content={content}
      category="Tools"
    >
      <TextSplitterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextSplitter;
