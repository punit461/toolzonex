'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert, ToggleButton, ToggleButtonGroup, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const EMOJI_RE = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F1FF}\u{203C}\u{2049}\u{2122}\u{2139}\u{2194}-\u{21AA}\u{231A}-\u{23FA}\u{25AA}-\u{25FE}\u{2614}-\u{26FA}\u{2934}-\u{2B55}\u{2B05}-\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{1F000}-\u{1FAFF}\u{20000}-\u{2FA1F}\u{FE00}-\u{FE0F}\u{1F000}-\u{1FAFF}\u{200D}\u{2640}\u{2642}\u{2695}\u{2696}\u{2708}\u{2764}\u{FE0F}\u{1F480}\u{1F525}\u{1F680}\u{1F64F}\u{200D}\u{2620}\u{FE0F}]/gu;

const RemoveEmojisContent = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'remove' | 'extract'>('remove');
  const [copied, setCopied] = useState(false);

  const { output, emojiCount } = useMemo(() => {
    if (!input) return { output: '', emojiCount: 0 };
    const emojis = input.match(EMOJI_RE) || [];
    if (mode === 'remove') {
      return { output: input.replace(EMOJI_RE, ''), emojiCount: emojis.length };
    }
    return { output: emojis.join(' '), emojiCount: emojis.length };
  }, [input, mode]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Input text"
          multiline
          rows={12}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          variant="outlined"
          placeholder="Paste text with emojis here... 😀🎉🚀"
        />
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          fullWidth
        >
          <ToggleButton value="remove">Remove Emojis</ToggleButton>
          <ToggleButton value="extract">Extract Emojis Only</ToggleButton>
        </ToggleButtonGroup>
        <Button variant="contained" onClick={copyToClipboard} disabled={!output} fullWidth startIcon={<ContentCopyIcon />}>
          {copied ? 'Copied!' : 'Copy Result'}
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Output</Typography>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 330, bgcolor: 'grey.50', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {output || <Typography color="text.secondary">{mode === 'remove' ? 'Emoji-free text will appear here...' : 'Extracted emojis will appear here...'}</Typography>}
        </Paper>
        {input && (
          <Alert severity={emojiCount > 0 ? 'info' : 'success'}>
            {emojiCount > 0 ? `${emojiCount} emoji${emojiCount === 1 ? '' : 's'} found` : 'No emojis found in text'}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

const RemoveEmojis = () => {
  const content = (
    <>
      <Typography variant="h2">Free Remove Emojis Tool — Strip Emojis from Text</Typography>
      <Typography variant="body1">
        Instantly remove all emoji characters from any text, or extract only the emojis. Useful for cleaning
        up text before processing, analyzing emoji usage, or preparing content for systems that don&apos;t support
        emoji characters.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your text into the input box. Choose between &quot;Remove Emojis&quot; (strips all emojis, leaving
        regular text) and &quot;Extract Emojis Only&quot; (keeps only the emoji characters). The emoji count is
        shown automatically, and you can copy the result with one click.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>Have a great day! 🎉🚀</code> with &quot;Remove Emojis&quot; becomes <code>Have a great day! </code>. With &quot;Extract Emojis Only&quot;
        it becomes <code>🎉 🚀</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning text for APIs, databases, or systems that don&apos;t handle emoji encoding.</li>
          <li>Analyzing how many emojis appear in a block of text or social media content.</li>
          <li>Preparing text for professional documents or email subject lines.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this work with all emojis?</Typography>
      <Typography variant="body1">
        It covers the full Unicode emoji ranges including faces, gestures, animals, food, flags, symbols, and
        composite emojis (skin tones, ZWJ sequences). Very new or rare emoji may occasionally slip through.
      </Typography>
      <Typography variant="h3">Is my text uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — all processing happens locally in your browser. Nothing is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/remove-emojis" content={content}>
      <RemoveEmojisContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveEmojis;
