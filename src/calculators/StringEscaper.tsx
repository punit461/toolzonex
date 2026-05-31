'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const StringEscaperContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('json-escape');

  const processText = () => {
    let output = '';
    
    switch(mode) {
      case 'json-escape':
        // JSON.stringify will add surrounding quotes, we can optionally strip them or keep them.
        output = JSON.stringify(text);
        break;
      case 'json-unescape':
        try {
          // Wrap in quotes if it isn't already to parse as a JSON string
          let toParse = text.trim();
          if (!toParse.startsWith('"')) toParse = `"${toParse}`;
          if (!toParse.endsWith('"')) toParse = `${toParse}"`;
          output = JSON.parse(toParse);
        } catch (e) {
          output = "Error: Invalid escaped string format for JSON.";
        }
        break;
      case 'html-escape':
        output = text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
        break;
      case 'html-unescape':
        output = text
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&#39;/g, "'");
        break;
      case 'url-encode':
        output = encodeURIComponent(text);
        break;
      case 'url-decode':
        try {
          output = decodeURIComponent(text);
        } catch (e) {
          output = "Error: Malformed URI sequence.";
        }
        break;
    }
    setResult(output);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Processing Mode</InputLabel>
            <Select
              value={mode}
              label="Processing Mode"
              onChange={(e) => setMode(e.target.value)}
            >
              <MenuItem value="json-escape">JSON Escape String</MenuItem>
              <MenuItem value="json-unescape">JSON Unescape String</MenuItem>
              <MenuItem value="html-escape">HTML Entities Escape</MenuItem>
              <MenuItem value="html-unescape">HTML Entities Unescape</MenuItem>
              <MenuItem value="url-encode">URL Encode (URI Component)</MenuItem>
              <MenuItem value="url-decode">URL Decode</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={processText} fullWidth size="large">
          Process Text
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
          placeholder="Processed result will appear here..."
        />
      </Box>
    </Box>
  );
};

const StringEscaper = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the String Escaper?</Typography>
      <Typography variant="body1">
        Paste your text, choose the type of encoding or escaping you need (JSON, HTML, or URL), and click "Process Text". The tool instantly applies the exact programmatic transformations needed.
      </Typography>

      <Typography variant="h2">Supported Formats</Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>JSON Escape/Unescape:</strong> Safely adds or removes backslashes for newlines, quotes, and control characters so strings can be used inside JSON payloads.</li>
          <li><strong>HTML Entities:</strong> Converts special characters like <code>&lt;</code> and <code>&gt;</code> into safe HTML entities like <code>&amp;lt;</code> to prevent cross-site scripting (XSS) rendering issues.</li>
          <li><strong>URL Encode/Decode:</strong> Safely encodes strings to be passed as query parameters in URLs (converting spaces to %20, etc).</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="String Escaper & Encoder"
      description="Escape or unescape strings for JSON, HTML entities, or URL encoding. Free online developer utility."
      url="/tools/string-escaper"
      content={content}
      category="Tools"
    >
      <StringEscaperContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StringEscaper;
