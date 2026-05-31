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
      <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f8fafc', display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
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
      <Paper sx={{ overflow: 'hidden', border: '1px solid #e2e8f0' }}>
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
        Combine two lists of text line-by-line instantly. Perfect for combining first names and last names, URLs and parameters, or any two columns of data. Customize the separator to fit your exact needs.
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
