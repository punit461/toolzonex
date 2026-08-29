'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const NUMBER_REGEX = /-?\d+(?:\.\d+)?/g;

const ExtractNumbersContent = () => {
  const [text, setText] = useState('');

  const numbers = useMemo(() => text.match(NUMBER_REGEX) ?? [], [text]);

  const copyAll = async () => {
    if (numbers.length === 0) return;
    try {
      await navigator.clipboard.writeText(numbers.join('\n'));
    } catch {}
  };

  const downloadAll = () => {
    if (numbers.length === 0) return;
    const blob = new Blob([numbers.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-numbers.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste text containing numbers, e.g. 'Order #4521 shipped 3.5kg for -12.99 discount'..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={12}
          fullWidth
        />
      </Box>

      <Box>
        <Paper variant="outlined" sx={{ p: 3, minHeight: 240 }}>
          {numbers.length > 0 ? (
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Found {numbers.length} number{numbers.length === 1 ? '' : 's'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>Copy All</Button>
                  <Button size="small" startIcon={<DownloadIcon />} onClick={downloadAll}>Download</Button>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {numbers.map((n, idx) => (
                  <Paper key={idx} variant="outlined" sx={{ px: 1.5, py: 0.5, bgcolor: 'action.hover' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{n}</Typography>
                  </Paper>
                ))}
              </Box>
            </Stack>
          ) : (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary" align="center">
                Numbers found in your text will appear here as you type.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const ExtractNumbers = () => {
  const content = (
    <>
      <Typography variant="h2">How to extract numbers from text</Typography>
      <Typography variant="body1">
        Paste any text into the box above. This tool scans it live and pulls out every numeric substring it
        finds — whole numbers, decimals, and negative numbers — and lists them separately, ready to copy or
        download.
      </Typography>

      <Typography variant="h2">What counts as a number?</Typography>
      <Typography variant="body1">
        The extractor matches sequences of digits, optionally with a decimal point (like 3.14) and an optional
        leading minus sign (like -12). It does not merge numbers separated by other characters, so a phone
        number like &quot;555-1234&quot; is extracted as two separate numbers, 555 and 1234.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        From the text &quot;Order #4521 shipped 3.5kg with a -12.99 discount&quot; the tool extracts 4521, 3.5,
        and -12.99.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling prices, quantities, or measurements out of pasted invoices or receipts.</li>
          <li>Collecting IDs or reference numbers scattered through a document.</li>
          <li>Preparing a quick list of numeric values for a spreadsheet import.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it handle negative numbers and decimals?</Typography>
      <Typography variant="body1">
        Yes — a minus sign directly before a number and a decimal point within a number are both recognized, so
        values like -45 and 3.14 are extracted correctly.
      </Typography>
      <Typography variant="h3">Does it remove duplicate numbers?</Typography>
      <Typography variant="body1">
        No — every occurrence is listed in the order it appears, including repeats, since duplicate values
        (like a repeated total) are often meaningful in the source text.
      </Typography>
      <Typography variant="h3">Can it extract numbers formatted with commas, like 1,000?</Typography>
      <Typography variant="body1">
        Thousands separators are treated as a break between numbers, so &quot;1,000&quot; is extracted as 1 and
        000. Remove comma separators first if you need thousands to stay intact as a single number.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/extract-numbers" content={content}>
      <ExtractNumbersContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractNumbers;
