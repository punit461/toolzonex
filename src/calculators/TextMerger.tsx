'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextMergerContent = () => {
  const [list1, setList1] = useState<string>('Apple\nBanana\nCherry');
  const [list2, setList2] = useState<string>('Red\nYellow\nRed');
  const [separator, setSeparator] = useState<string>('space');
  const [customSeparator, setCustomSeparator] = useState<string>('');
  const [order, setOrder] = useState<string>('1-2');
  
  const [copied, setCopied] = useState(false);

  const mergeLists = () => {
    const arr1 = list1.split('\n');
    const arr2 = list2.split('\n');
    
    const maxLen = Math.max(arr1.length, arr2.length);
    const result = [];

    const getSep = () => {
      if (separator === 'space') return ' ';
      if (separator === 'comma') return ', ';
      if (separator === 'dash') return ' - ';
      if (separator === 'custom') return customSeparator;
      return '';
    };

    const sep = getSep();

    for (let i = 0; i < maxLen; i++) {
      const item1 = arr1[i] || '';
      const item2 = arr2[i] || '';
      
      if (!item1 && !item2) continue; // skip blank double lines

      if (order === '1-2') {
        result.push(`${item1}${item1 && item2 ? sep : ''}${item2}`);
      } else {
        result.push(`${item2}${item2 && item1 ? sep : ''}${item1}`);
      }
    }

    return result.join('\n');
  };

  const mergedText = mergeLists();

  const handleCopy = () => {
    navigator.clipboard.writeText(mergedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      {/* Input Panels */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>List 1</Typography>
          <TextField
            multiline
            rows={8}
            value={list1}
            onChange={(e) => setList1(e.target.value)}
            fullWidth
            placeholder="Paste first list here..."
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>List 2</Typography>
          <TextField
            multiline
            rows={8}
            value={list2}
            onChange={(e) => setList2(e.target.value)}
            fullWidth
            placeholder="Paste second list here..."
          />
        </Box>
      </Box>

      {/* Options Panel */}
      <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover', display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography variant="subtitle2" fontWeight="bold">Merge Options:</Typography>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Order</InputLabel>
          <Select value={order} label="Order" onChange={(e) => setOrder(e.target.value)}>
            <MenuItem value="1-2">List 1 then List 2</MenuItem>
            <MenuItem value="2-1">List 2 then List 1</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Separator</InputLabel>
          <Select value={separator} label="Separator" onChange={(e) => setSeparator(e.target.value)}>
            <MenuItem value="space">Space</MenuItem>
            <MenuItem value="comma">Comma (,)</MenuItem>
            <MenuItem value="dash">Dash (-)</MenuItem>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="custom">Custom...</MenuItem>
          </Select>
        </FormControl>

        {separator === 'custom' && (
          <TextField 
            size="small" 
            label="Custom separator" 
            value={customSeparator} 
            onChange={(e) => setCustomSeparator(e.target.value)} 
          />
        )}
      </Paper>

      {/* Output Panel */}
      <Paper sx={{ overflow: 'hidden', border: '1px solid' }}>
        <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" display="flex" alignItems="center" gap={1}>
            <CallMergeIcon /> Merged Result
          </Typography>
          <Button 
            variant="contained" 
            color={copied ? "success" : "inherit"}
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
            sx={{ color: copied ? 'white' : 'primary.main', bgcolor: copied ? 'success.main' : 'white' }}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </Box>
        <Box sx={{ p: 0 }}>
          <TextField
            multiline
            rows={10}
            value={mergedText}
            fullWidth
            InputProps={{ readOnly: true, sx: { borderRadius: 0, '& fieldset': { border: 'none' } } }}
          />
        </Box>
      </Paper>

    </Box>
  );
};

const TextMerger = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Text & List Merger</Typography>
      <Typography variant="body1">
        Combine two lists of text line-by-line instantly. Perfect for combining first names and last names, URLs and parameters, or any two columns of data. Customize the separator to fit your exact needs — use it as a simple list combiner, a text combiner for two paragraphs, or a string append tool online when you need to join text pairs quickly.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste your two lists, one per box, choose a separator, and the merged result appears line-by-line
        instantly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Combining first-name and last-name columns into full names.</li>
          <li>Merging two spreadsheet columns exported as plain text.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Merging a "First Name" list and a "Last Name" list with a space separator combines &quot;John&quot; and
        &quot;Smith&quot; into &quot;John Smith&quot; on each line.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this the same as a list combiner?</Typography>
      <Typography variant="body1">
        Yes — this tool works as a list combiner, pairing each line of List 1 with the matching line of List 2
        so you can merge two columns without spreadsheet formulas.
      </Typography>
      <Typography variant="h3">Can I use this as a text combiner or string append tool online?</Typography>
      <Typography variant="body1">
        Yes — enter your first block of text as List 1 and the text you want appended as List 2, choose a
        separator (or none), and the tool acts as a text combiner or string append tool, joining each pair of
        lines into one string.
      </Typography>
      <Typography variant="h3">What if my two lists have a different number of lines?</Typography>
      <Typography variant="body1">
        Extra lines in the longer list are left unmatched or blank-paired, depending on your settings — for
        best results, keep both lists the same length.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Merger - Combine Lists Line by Line"
      description="Combine two lists of text line by line instantly. Perfect for merging columns of data."
      url="/tools/text-merger"
      content={content}
      category="Tools"
    >
      <TextMergerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextMerger;
