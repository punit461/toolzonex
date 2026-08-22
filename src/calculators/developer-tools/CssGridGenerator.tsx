'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CssGridGeneratorContent = () => {
  const [columns, setColumns] = useState<number>(3);
  const [rows, setRows] = useState<number>(3);
  const [gap, setGap] = useState<string>('16px');

  const cssString = `display: grid;
grid-template-columns: repeat(${columns}, 1fr);
grid-template-rows: repeat(${rows}, 1fr);
gap: ${gap};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssString);
  };

  const totalItems = columns * rows;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 4 }}>
      
      {/* Control Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <TextField 
          label="Columns" 
          type="number" 
          value={columns} 
          onChange={(e) => setColumns(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))} 
          fullWidth
          size="small"
        />

        <TextField 
          label="Rows" 
          type="number" 
          value={rows} 
          onChange={(e) => setRows(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))} 
          fullWidth
          size="small"
        />

        <FormControl fullWidth size="small">
          <InputLabel>gap</InputLabel>
          <Select value={gap} label="gap" onChange={(e) => setGap(e.target.value as string)}>
            <MenuItem value="0px">0px</MenuItem>
            <MenuItem value="8px">8px</MenuItem>
            <MenuItem value="16px">16px</MenuItem>
            <MenuItem value="24px">24px</MenuItem>
            <MenuItem value="32px">32px</MenuItem>
          </Select>
        </FormControl>

      </Box>

      {/* Preview Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Paper 
          sx={{ 
            height: 350, 
            bgcolor: 'action.hover',
            border: '2px dashed #cbd5e1',
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap,
            p: 2,
            overflow: 'auto'
          } as React.CSSProperties}
        >
          {Array.from({ length: totalItems }).map((_, i) => (
            <Box 
              key={i} 
              sx={{ 
                bgcolor: 'secondary.main', 
                color: 'white', 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                minHeight: 40
              }}
            >
              {i + 1}
            </Box>
          ))}
        </Paper>

        <Box sx={{ position: 'relative' }}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.900', 
              color: '#10b981',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}
          >
            {cssString}
          </Paper>
          <Button 
            variant="contained"
            size="small"
            startIcon={<ContentCopyIcon />} 
            onClick={copyToClipboard}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Copy
          </Button>
        </Box>
        
      </Box>

    </Box>
  );
};

const CssGridGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">CSS Grid Generator</Typography>
      <Typography variant="body1">
        Visually generate CSS Grid layouts. Define your columns, rows, and gaps, and see the grid preview in real-time. Instantly copy the CSS snippet to jumpstart your webpage layouts.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Set the number of columns, rows, and gap size using the controls, watch the live preview update, then
        copy the generated CSS Grid code.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3-column, 2-row grid with a 16px gap generates <code>grid-template-columns: repeat(3, 1fr); gap: 16px;</code> — ready to paste directly into your stylesheet.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Prototyping a page or card layout visually before writing CSS by hand.</li>
          <li>Learning CSS Grid syntax by seeing the generated code update live.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Do I need to know CSS Grid to use this?</Typography>
      <Typography variant="body1">
        No — adjust the visual controls and the tool generates the correct CSS Grid syntax for you.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="CSS Grid Generator"
      description="Visually generate CSS Grid layouts. Define columns, rows, and gaps, and copy the CSS code instantly."
      url="/developer-tools/css-grid-generator"
      content={content}
      category="Developer Tools"
    >
      <CssGridGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssGridGenerator;
