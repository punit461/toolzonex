'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Button, ToggleButtonGroup, ToggleButton, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'spacesToTabs' | 'tabsToSpaces';

function convertLine(line: string, mode: Mode, size: number): string {
  const match = line.match(/^[ \t]*/);
  const leading = match ? match[0] : '';
  const rest = line.slice(leading.length);

  if (mode === 'spacesToTabs') {
    // Replace every `size` leading spaces with one tab, leaving remainder spaces as-is
    const tabCount = Math.floor(leading.length / size);
    const remainder = leading.length % size;
    // Only convert runs of actual spaces; preserve any existing tabs positionally is complex,
    // so operate on the leading whitespace as a whole by counting space groups.
    let newLeading = '';
    let spaceRun = 0;
    for (const ch of leading) {
      if (ch === ' ') {
        spaceRun++;
        if (spaceRun === size) {
          newLeading += '\t';
          spaceRun = 0;
        }
      } else {
        // tab character, flush any partial space run first
        newLeading += ' '.repeat(spaceRun) + '\t';
        spaceRun = 0;
      }
    }
    newLeading += ' '.repeat(spaceRun);
    void tabCount;
    void remainder;
    return newLeading + rest;
  } else {
    const newLeading = leading.replace(/\t/g, ' '.repeat(size));
    return newLeading + rest;
  }
}

const SpaceToTabConverterContent = () => {
  const [input, setInput] = useState('function greet() {\n    console.log("hello");\n}');
  const [size, setSize] = useState<number>(4);
  const [mode, setMode] = useState<Mode>('spacesToTabs');

  const output = useMemo(() => {
    const clampedSize = Math.max(1, size || 4);
    return input.split('\n').map((line) => convertLine(line, mode, clampedSize)).join('\n');
  }, [input, mode, size]);

  const copyOutput = async () => {
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
          size="small"
        >
          <ToggleButton value="spacesToTabs">Spaces → Tabs</ToggleButton>
          <ToggleButton value="tabsToSpaces">Tabs → Spaces</ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label="Spaces per Tab"
          type="number"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value, 10) || 4)}
          size="small"
          InputProps={{ inputProps: { min: 1, max: 16 } }}
          sx={{ width: 160 }}
        />
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <TextField
          label="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          multiline
          rows={12}
          fullWidth
          InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.9rem' } }}
        />
        <Box>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2">Output</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyOutput}>Copy</Button>
          </Stack>
          <Paper variant="outlined" sx={{ p: 2, minHeight: 268, fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre', overflowX: 'auto' }}>
            {output}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

const SpaceToTabConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Space to Tab Converter</Typography>
      <Typography variant="body1">
        Paste your code or text into the input box, set how many spaces should count as one tab (4 is the
        default), and choose a direction using the toggle. In &quot;Spaces → Tabs&quot; mode, every run of N
        leading spaces on each line is replaced with a single tab character, leaving the rest of the line
        untouched. In &quot;Tabs → Spaces&quot; mode, the conversion runs the other way — each leading tab
        character is expanded back into N spaces. Only leading (indentation) whitespace is converted; spaces
        or tabs elsewhere in a line are left alone.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With &quot;Spaces per Tab&quot; set to 4 and Spaces → Tabs mode, a line indented with 8 leading spaces
        becomes a line indented with 2 tab characters, while the code on that line stays exactly the same.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a file to match your team&apos;s tabs-vs-spaces style guide.</li>
          <li>Preparing code to paste into an editor or linter with a specific indentation requirement.</li>
          <li>Cleaning up mixed indentation before committing code.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this affect non-indentation whitespace?</strong> No — only leading whitespace at the start of each line (indentation) is converted; spaces used elsewhere in a line, such as between words or arguments, are left untouched.</li>
          <li><strong>What happens with mixed leading spaces and tabs?</strong> The tool processes the leading whitespace left to right, converting runs of spaces to tabs (or vice versa) while preserving any existing tabs and leftover spaces that don&apos;t make a full group.</li>
          <li><strong>Can I convert in both directions?</strong> Yes — use the toggle to switch between Spaces → Tabs and Tabs → Spaces at any time using the same "spaces per tab" setting.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/space-to-tab-converter" content={content}>
      <SpaceToTabConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SpaceToTabConverter;
