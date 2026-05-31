'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const VerticalTextGeneratorContent = () => {
  const [text, setText] = useState<string>('HELLO');
  const [style, setStyle] = useState<'normal' | 'spaced' | 'bold' | 'monospace'>('normal');
  const [copied, setCopied] = useState(false);

  const generateVertical = () => {
    if (!text) return '';

    let chars = text.split('');
    let output = '';

    if (style === 'spaced') {
      output = chars.join('\n\n');
    } else if (style === 'bold') {
      // Very basic pseudo-bold mapping for A-Z
      output = chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(code + 119743);
        if (code >= 97 && code <= 122) return String.fromCodePoint(code + 119737);
        return c;
      }).join('\n');
    } else if (style === 'monospace') {
      output = chars.map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(code + 120367);
        if (code >= 97 && code <= 122) return String.fromCodePoint(code + 120361);
        return c;
      }).join('\n');
    } else {
      output = chars.join('\n');
    }

    return output;
  };

  const verticalText = generateVertical();

  const handleCopy = () => {
    navigator.clipboard.writeText(verticalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Enter Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          placeholder="e.g. HELLO"
        />

        <Box>
          <Typography variant="subtitle2" mb={1} color="text.secondary">Style:</Typography>
          <ToggleButtonGroup
            color="primary"
            value={style}
            exclusive
            onChange={(e, val) => val && setStyle(val)}
            fullWidth
            size="small"
          >
            <ToggleButton value="normal">Normal</ToggleButton>
            <ToggleButton value="spaced">Spaced</ToggleButton>
            <ToggleButton value="bold">𝗕𝗼𝗹𝗱</ToggleButton>
            <ToggleButton value="monospace">𝙼𝚘𝚗𝚘</ToggleButton>
          </ToggleButtonGroup>
        </Box>

      </Box>

      {/* Output Panel */}
      <Box>
        <Paper variant="outlined" sx={{ p: 0, overflow: 'hidden', height: '100%', minHeight: 300, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Vertical Result</Typography>
            <Button 
              variant="contained" 
              color={copied ? "success" : "inherit"}
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              sx={{ color: copied ? 'white' : 'primary.main', bgcolor: copied ? 'success.main' : 'white' }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </Box>
          <Box sx={{ p: 4, flexGrow: 1, display: 'flex', justifyContent: 'center', bgcolor: 'action.hover' }}>
            <Typography 
              variant="h5" 
              sx={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: style === 'monospace' ? 'monospace' : 'inherit',
                textAlign: 'center',
                lineHeight: 1.2
              }}
            >
              {verticalText}
            </Typography>
          </Box>
        </Paper>
      </Box>

    </Box>
  );
};

const VerticalTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Vertical Text Generator</Typography>
      <Typography variant="body1">
        Convert normal horizontal text into vertical text instantly. This tool is perfect for creating aesthetic social media bios, unique chat messages, or artistic text designs. Supports different styles like bold and monospace.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Vertical Text Generator - Stack Text Vertically"
      description="Convert your text into vertical aesthetic formats for social media and chats instantly."
      url="/tools/vertical-text-generator"
      content={content}
      category="Tools"
    >
      <VerticalTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VerticalTextGenerator;
