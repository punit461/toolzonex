'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Stack } from '@mui/material';
import * as diff from 'diff';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextDiffToolContent = () => {
  const [originalText, setOriginalText] = useState<string>('The quick brown fox jumps over the lazy dog.\nThis is a second line.');
  const [modifiedText, setModifiedText] = useState<string>('The fast brown fox jumps over the lazy dog.\nThis is a second line.\nAnd here is a third line.');
  
  const [diffResult, setDiffResult] = useState<diff.Change[]>([]);

  const compareText = () => {
    // We use diffLines for a line-by-line comparison which is standard for text diffs
    // But maybe diffWords is better for a visualizer? Let's use diffWordsWithSpace
    const result = diff.diffWordsWithSpace(originalText, modifiedText);
    setDiffResult(result);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      {/* Input Panels */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Original Text</Typography>
          <TextField
            multiline
            rows={10}
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            fullWidth
            placeholder="Paste the original text here..."
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Modified Text</Typography>
          <TextField
            multiline
            rows={10}
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            fullWidth
            placeholder="Paste the modified text here..."
          />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" size="large" onClick={compareText} sx={{ px: 6 }}>
          Compare Text
        </Button>
      </Box>

      {/* Output Panel */}
      {diffResult.length > 0 && (
        <Paper variant="outlined" sx={{ p: 4, bgcolor: '#fafafa' }}>
          <Typography variant="h6" mb={2}>Difference Result</Typography>
          
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#fca5a5', borderRadius: 0.5 }} />
              <Typography variant="body2">Removed</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#bbf7d0', borderRadius: 0.5 }} />
              <Typography variant="body2">Added</Typography>
            </Box>
          </Box>

          <Paper sx={{ p: 3, bgcolor: 'white', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '1rem', lineHeight: 1.6 }}>
            {diffResult.map((part, index) => {
              const color = part.added ? '#166534' : part.removed ? '#991b1b' : 'inherit';
              const bgColor = part.added ? '#bbf7d0' : part.removed ? '#fca5a5' : 'transparent';
              const textDecoration = part.removed ? 'line-through' : 'none';
              
              return (
                <span 
                  key={index} 
                  style={{ 
                    color: color, 
                    backgroundColor: bgColor,
                    textDecoration: textDecoration,
                    padding: part.added || part.removed ? '0 2px' : 0,
                    borderRadius: '3px'
                  }}
                >
                  {part.value}
                </span>
              );
            })}
          </Paper>
        </Paper>
      )}

    </Box>
  );
};

const TextDiffTool = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Text Diff Tool</Typography>
      <Typography variant="body1">
        Compare two text documents to see exactly what changed. Our diff checker highlights the differences word-by-word, making it easy to spot additions and deletions between versions of an essay, code snippet, or article.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Diff Tool - Compare Text Online"
      description="Compare two text documents online to see exact differences. Highlights added and removed words instantly."
      url="/tools/text-diff-tool"
      content={content}
      category="Tools"
    >
      <TextDiffToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextDiffTool;
