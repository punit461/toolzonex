'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SeparatorMode = 'newline' | 'blank-line' | 'custom';

let blockId = 0;
const nextId = () => ++blockId;

const MergeTextFilesContent = () => {
  const [blocks, setBlocks] = useState<{ id: number; text: string }[]>([
    { id: nextId(), text: '' },
    { id: nextId(), text: '' },
  ]);
  const [separatorMode, setSeparatorMode] = useState<SeparatorMode>('newline');
  const [customSeparator, setCustomSeparator] = useState('---');

  const separator = separatorMode === 'newline' ? '\n' : separatorMode === 'blank-line' ? '\n\n' : customSeparator;

  const merged = useMemo(
    () => blocks.map((b) => b.text).join(separator),
    [blocks, separator]
  );

  const updateBlock = (id: number, value: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, text: value } : b)));
  };

  const addBlock = () => setBlocks((prev) => [...prev, { id: nextId(), text: '' }]);

  const removeBlock = (id: number) => setBlocks((prev) => (prev.length > 1 ? prev.filter((b) => b.id !== id) : prev));

  const copyResult = async () => {
    if (!merged) return;
    try {
      await navigator.clipboard.writeText(merged);
    } catch {}
  };

  const downloadResult = () => {
    const blob = new Blob([merged], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'merged-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Stack spacing={2}>
        {blocks.map((block, idx) => (
          <Box key={block.id} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <TextField
              label={`Text Block ${idx + 1}`}
              value={block.text}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              multiline
              rows={4}
              fullWidth
              placeholder="Paste content of one file or section here..."
            />
            <IconButton
              onClick={() => removeBlock(block.id)}
              disabled={blocks.length <= 1}
              aria-label="Remove block"
              sx={{ mt: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addBlock} variant="outlined" sx={{ alignSelf: 'flex-start' }}>
          Add Another Block
        </Button>
      </Stack>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel>Separator Between Files</InputLabel>
          <Select
            value={separatorMode}
            label="Separator Between Files"
            onChange={(e) => setSeparatorMode(e.target.value as SeparatorMode)}
          >
            <MenuItem value="newline">Single Newline</MenuItem>
            <MenuItem value="blank-line">Blank Line</MenuItem>
            <MenuItem value="custom">Custom String</MenuItem>
          </Select>
        </FormControl>
        {separatorMode === 'custom' && (
          <TextField
            label="Custom Separator"
            value={customSeparator}
            onChange={(e) => setCustomSeparator(e.target.value)}
            sx={{ width: 200 }}
          />
        )}
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Merged Result:</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>Copy</Button>
            <Button size="small" startIcon={<DownloadIcon />} onClick={downloadResult}>Download</Button>
          </Box>
        </Box>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {merged || 'Merged text will appear here...'}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const MergeTextFiles = () => {
  const content = (
    <>
      <Typography variant="h2">How to merge multiple text blocks online</Typography>
      <Typography variant="body1">
        Paste the content of each file or section into its own text block above, adding more blocks as needed
        with &quot;Add Another Block&quot;. Choose how the pieces should be joined — a single newline, a blank
        line, or a custom separator string — and the combined result updates live below, ready to copy or
        download as a single .txt file.
      </Typography>

      <Typography variant="h2">Separator options explained</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Single Newline:</strong> Each block starts immediately on a new line after the previous one.</li>
          <li><strong>Blank Line:</strong> Each block is separated by an empty line, useful for keeping paragraphs visually distinct.</li>
          <li><strong>Custom String:</strong> Insert your own separator, such as &quot;---&quot; or &quot;=====&quot;, between each block.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Two blocks containing &quot;Chapter 1 text&quot; and &quot;Chapter 2 text&quot;, merged with a blank
        line separator, produce a single document with the chapters stacked and clearly divided.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Combining several short text files into one document.</li>
          <li>Joining separate notes or drafts before pasting into an editor.</li>
          <li>Concatenating log snippets or CSV rows with a consistent separator.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many text blocks can I merge?</Typography>
      <Typography variant="body1">
        There&apos;s no fixed limit — keep clicking &quot;Add Another Block&quot; to add as many sections as you
        need, and remove any block with its delete icon.
      </Typography>
      <Typography variant="h3">Can I upload actual .txt files instead of pasting?</Typography>
      <Typography variant="body1">
        This tool works by pasting text directly into each block, which keeps everything running instantly in
        your browser without uploading any files. Open each file in a text editor, copy its contents, and paste
        it into a block.
      </Typography>
      <Typography variant="h3">Does the order of the blocks matter?</Typography>
      <Typography variant="body1">
        Yes — blocks are merged in the order they appear on the page, from top to bottom, with your chosen
        separator inserted between each one.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/merge-text-files" content={content}>
      <MergeTextFilesContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MergeTextFiles;
