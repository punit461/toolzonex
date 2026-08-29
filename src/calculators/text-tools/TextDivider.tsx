'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Button, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'delimiter' | 'char-count' | 'word-count';

const TextDividerContent = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<Mode>('delimiter');
  const [delimiter, setDelimiter] = useState('\\n\\n');
  const [chunkSize, setChunkSize] = useState('200');

  const sections = useMemo(() => {
    if (!text) return [];

    if (mode === 'delimiter') {
      const actualDelimiter = delimiter.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      if (!actualDelimiter) return [text];
      return text.split(actualDelimiter).filter((s) => s.length > 0);
    }

    const size = Math.max(1, parseInt(chunkSize, 10) || 1);

    if (mode === 'char-count') {
      const regex = new RegExp(`.{1,${size}}`, 'gs');
      return text.match(regex) || [];
    }

    const words = text.split(/\s+/).filter(Boolean);
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += size) {
      chunks.push(words.slice(i, i + size).join(' '));
    }
    return chunks;
  }, [text, mode, delimiter, chunkSize]);

  const copySection = async (section: string) => {
    try {
      await navigator.clipboard.writeText(section);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste the text you want to divide into sections..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={8}
        fullWidth
      />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Divide By</InputLabel>
          <Select value={mode} label="Divide By" onChange={(e) => setMode(e.target.value as Mode)}>
            <MenuItem value="delimiter">Custom Delimiter</MenuItem>
            <MenuItem value="char-count">Fixed Character Count</MenuItem>
            <MenuItem value="word-count">Fixed Word Count</MenuItem>
          </Select>
        </FormControl>

        {mode === 'delimiter' && (
          <TextField
            label="Delimiter (use \n for newline)"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            sx={{ width: 220 }}
          />
        )}
        {mode !== 'delimiter' && (
          <TextField
            label={mode === 'char-count' ? 'Characters per Section' : 'Words per Section'}
            value={chunkSize}
            onChange={(e) => setChunkSize(e.target.value)}
            sx={{ width: 200 }}
          />
        )}
      </Box>

      {sections.length > 0 && (
        <Box>
          <Typography variant="subtitle1" fontWeight="600" gutterBottom>
            {sections.length} Section{sections.length === 1 ? '' : 's'}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {sections.map((section, idx) => (
              <Paper key={idx} variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="bold">
                    Section {idx + 1}
                  </Typography>
                  <Button size="small" startIcon={<ContentCopyIcon fontSize="small" />} onClick={() => copySection(section)}>
                    Copy
                  </Button>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {section}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const TextDivider = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Text Divider</Typography>
      <Typography variant="body1">
        Paste your text into the box above and choose how to divide it: by a custom delimiter (like a blank
        line or a comma), by a fixed number of characters per section, or by a fixed number of words per
        section. Each resulting section is displayed separately below, with its own copy button.
      </Typography>

      <Typography variant="h2">Dividing modes explained</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Custom Delimiter:</strong> Splits the text everywhere your chosen delimiter appears — enter \n for a newline or \n\n for a blank line.</li>
          <li><strong>Fixed Character Count:</strong> Cuts the text into equal-sized sections of the character length you specify.</li>
          <li><strong>Fixed Word Count:</strong> Groups the text into sections containing the number of words you specify.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 600-word article divided by &quot;Fixed Word Count&quot; at 200 words per section produces exactly 3
        labeled sections, each independently copyable.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Splitting a long article into evenly sized sections for a multi-part post.</li>
          <li>Dividing a document at paragraph breaks for section-by-section review.</li>
          <li>Breaking text into fixed-size chunks for pasting into tools with length limits.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I split on a blank line?</Typography>
      <Typography variant="body1">
        Choose &quot;Custom Delimiter&quot; and enter <code>\n\n</code> as the delimiter — this splits the text
        wherever two consecutive line breaks occur, effectively dividing it by paragraph.
      </Typography>
      <Typography variant="h3">Do the fixed character/word sections split mid-word or mid-sentence?</Typography>
      <Typography variant="body1">
        Fixed word count sections always end on a whole word. Fixed character count sections cut at an exact
        character position, which may land in the middle of a word — use word count mode if you need clean word
        boundaries.
      </Typography>
      <Typography variant="h3">Can I copy just one section instead of everything?</Typography>
      <Typography variant="body1">
        Yes — every section has its own &quot;Copy&quot; button, so you can copy individual sections without
        selecting text manually.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/text-divider" content={content}>
      <TextDividerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextDivider;
