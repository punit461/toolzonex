'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Alert, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const RegexTesterContent = () => {
  const [pattern, setPattern] = useState<string>('');
  const [testString, setTestString] = useState<string>('');
  
  // Flags
  const [flagG, setFlagG] = useState<boolean>(true);
  const [flagI, setFlagI] = useState<boolean>(false);
  const [flagM, setFlagM] = useState<boolean>(false);

  let matchResult = null;
  let error = null;
  let highlightElements: React.ReactNode[] = [];

  try {
    if (pattern) {
      const flags = `${flagG ? 'g' : ''}${flagI ? 'i' : ''}${flagM ? 'm' : ''}`;
      const regex = new RegExp(pattern, flags);
      
      if (testString) {
        if (flagG) {
          const matches = [...testString.matchAll(regex)];
          matchResult = matches.length > 0 ? matches : null;
          
          if (matches.length > 0) {
            let lastIndex = 0;
            matches.forEach((match, idx) => {
              const start = match.index!;
              const end = start + match[0].length;
              
              if (start > lastIndex) {
                highlightElements.push(testString.substring(lastIndex, start));
              }
              highlightElements.push(
                <span key={idx} style={{ backgroundColor: '#fef08a', color: '#854d0e', borderRadius: '2px' }}>
                  {testString.substring(start, end)}
                </span>
              );
              lastIndex = end;
            });
            if (lastIndex < testString.length) {
              highlightElements.push(testString.substring(lastIndex));
            }
          } else {
            highlightElements = [testString];
          }
        } else {
          const match = testString.match(regex);
          matchResult = match ? [match] : null;
          
          if (match) {
            const start = match.index!;
            const end = start + match[0].length;
            highlightElements.push(testString.substring(0, start));
            highlightElements.push(
              <span key="single" style={{ backgroundColor: '#fef08a', color: '#854d0e', borderRadius: '2px' }}>
                {testString.substring(start, end)}
              </span>
            );
            highlightElements.push(testString.substring(end));
          } else {
            highlightElements = [testString];
          }
        }
      }
    } else {
      highlightElements = [testString];
    }
  } catch (e: any) {
    error = e.message;
    highlightElements = [testString];
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr' }, gap: 4 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* Pattern & Flags */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'flex-start' }}>
          <TextField
            label="Regular Expression Pattern"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            fullWidth
            placeholder="[a-zA-Z0-9]+"
            sx={{ flex: 1, fontFamily: 'monospace' }}
            error={!!error}
            helperText={error}
          />
          <Paper variant="outlined" sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
            <FormGroup row>
              <FormControlLabel control={<Checkbox checked={flagG} onChange={e => setFlagG(e.target.checked)} size="small" />} label="g (Global)" />
              <FormControlLabel control={<Checkbox checked={flagI} onChange={e => setFlagI(e.target.checked)} size="small" />} label="i (Ignore Case)" />
              <FormControlLabel control={<Checkbox checked={flagM} onChange={e => setFlagM(e.target.checked)} size="small" />} label="m (Multiline)" />
            </FormGroup>
          </Paper>
        </Box>

        {/* Test String */}
        <TextField
          label="Test String"
          multiline
          rows={6}
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against your regex..."
          fullWidth
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />

        {/* Matches / Highlights */}
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Match Result</Typography>
          {!error && pattern && testString && matchResult && (
            <Alert severity="success" sx={{ mb: 2 }}>Found {matchResult.length} match(es)</Alert>
          )}
          {!error && pattern && testString && !matchResult && (
            <Alert severity="warning" sx={{ mb: 2 }}>No matches found</Alert>
          )}
          
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              minHeight: 150, 
              bgcolor: 'grey.50',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}
          >
            {highlightElements.length > 0 ? highlightElements : <Typography color="text.secondary">Matches will be highlighted here...</Typography>}
          </Paper>
        </Box>

      </Box>
    </Box>
  );
};

const RegexTester = () => {
  const content = (
    <>
      <Typography variant="h2">Online Regular Expression Tester</Typography>
      <Typography variant="body1">
        Test and debug your regular expressions in real-time. This tool uses JavaScript's native regex engine to evaluate patterns against your test strings, highlighting matches instantly. Secure and fully client-side.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Regex Tester & Evaluator"
      description="Test, evaluate, and debug regular expressions online. Real-time regex matching and highlighting tool for developers."
      url="/tools/regex-tester"
      content={content}
      category="Tools"
    >
      <RegexTesterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RegexTester;
