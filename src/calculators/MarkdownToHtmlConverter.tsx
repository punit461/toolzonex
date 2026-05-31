'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const simpleMarkdownToHtml = (markdown: string) => {
  let html = markdown;

  // Escape HTML tags to prevent execution (XSS protection)
  html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Headers
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Inline Code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>');
  html = html.replace(/<\/ul>\n<ul>/g, '\n');

  // Paragraphs (wrap anything not already wrapped in a block tag)
  const lines = html.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length > 0 && !line.startsWith('<')) {
      lines[i] = `<p>${line}</p>`;
    }
  }
  
  return lines.join('\n');
};

const MarkdownToHtmlContent = () => {
  const [input, setInput] = useState('# Hello World\n\nThis is a **bold** statement and this is *italic*.\n\n- List item 1\n- List item 2\n\n[ToolZoneX](https://toolzonex.com)');
  const [output, setOutput] = useState('');

  const processText = () => {
    setOutput(simpleMarkdownToHtml(input));
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Markdown Input:</Typography>
        <TextField
          multiline
          rows={16}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter markdown here..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
        
        <Button variant="contained" size="large" onClick={processText} fullWidth>
          Convert to HTML
        </Button>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Raw HTML Output:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            Copy
          </Button>
        </Box>
        <TextField
          multiline
          rows={16}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="Raw HTML will appear here..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
      </Box>
      
      {/* Preview Panel */}
      {output && (
        <Box sx={{ gridColumn: { xs: '1', md: '1 / span 2' }, mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Live Preview:</Typography>
          <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider', minHeight: 150 }}>
            <div dangerouslySetInnerHTML={{ __html: output }} style={{ fontFamily: 'sans-serif' }} />
          </Paper>
        </Box>
      )}

    </Box>
  );
};

const MarkdownToHtmlConverter = () => {
  const content = (
    <>
      <Typography variant="h2">What is Markdown?</Typography>
      <Typography variant="body1">
        Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by John Gruber in 2004, Markdown is now one of the world's most popular markup languages. This tool quickly converts your Markdown syntax into valid HTML tags.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Markdown to HTML Converter"
      description="Convert Markdown to raw HTML instantly. Free online parser with live web preview."
      url="/tools/markdown-to-html"
      content={content}
      category="Tools"
    >
      <MarkdownToHtmlContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MarkdownToHtmlConverter;
