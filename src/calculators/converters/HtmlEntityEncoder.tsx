'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HtmlEntityEncoderContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const processText = () => {
    setError('');
    setOutput('');
    
    if (!input) return;

    try {
      if (mode === 'encode') {
        // Encode HTML entities
        const encoded = input.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
        setOutput(encoded);
      } else {
        // Decode HTML entities
        // A safe trick is to use DOMParser
        const doc = new DOMParser().parseFromString(input, "text/html");
        setOutput(doc.documentElement.textContent || '');
      }
    } catch (err: any) {
      setError('Failed to process string.');
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {}
  };

  const swapMode = () => {
    setMode(prev => prev === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
    setError('');
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">
          {mode === 'encode' ? 'Plain HTML Input:' : 'Entity Encoded Input:'}
        </Typography>
        <TextField
          multiline
          rows={10}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter HTML to encode (e.g. <div>)...' : 'Enter entities to decode (e.g. &#60;div&#62;)...'}
          error={!!error}
          helperText={error}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" size="large" onClick={processText} sx={{ flex: 1 }}>
            {mode === 'encode' ? 'Encode Entities' : 'Decode Entities'}
          </Button>
          <Button variant="outlined" size="large" onClick={swapMode}>
            Swap Mode
          </Button>
        </Box>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">
            {mode === 'encode' ? 'Encoded Output:' : 'Decoded HTML Output:'}
          </Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            Copy
          </Button>
        </Box>
        <TextField
          multiline
          rows={10}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="Result will appear here..."
        />
      </Box>

    </Box>
  );
};

const HtmlEntityEncoder = () => {
  const content = (
    <>
      <Typography variant="h2">What are HTML Entities?</Typography>
      <Typography variant="body1">
        Certain characters like `&lt;` and `&gt;` have special meanings in HTML. If you want a browser to display them as text instead of treating them as tags, you must convert them into HTML entities (e.g., `&#60;` and `&#62;`). This tool safely encodes your strings to prevent XSS and formatting errors.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The text <code>&lt;div&gt;</code> encodes to <code>&amp;lt;div&amp;gt;</code>, so a browser displays
        the literal characters instead of interpreting them as an HTML tag.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Safely displaying code snippets or HTML markup as visible text on a webpage.</li>
          <li>Preventing user-submitted text from being interpreted as HTML (XSS prevention).</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this enough to prevent XSS attacks on its own?</Typography>
      <Typography variant="body1">
        Encoding output is one important layer of defense, but a complete security approach also includes
        proper input validation and context-aware escaping throughout your application.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/converters/html-entity-encode-decode"
      content={content}
    >
      <HtmlEntityEncoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HtmlEntityEncoder;
