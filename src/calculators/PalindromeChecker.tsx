'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PalindromeCheckerContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ isPalindrome: boolean, cleaned: string, reversed: string } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const checkPalindrome = () => {
    setHasSearched(true);
    if (!text.trim()) {
      setResult(null);
      return;
    }

    // Clean text: remove non-alphanumeric and lowercase it
    const cleaned = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    
    setResult({
      isPalindrome: cleaned === reversed && cleaned.length > 0,
      cleaned,
      reversed
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <TextField
          label="Input Text or Phrase"
          placeholder="e.g. A man, a plan, a canal: Panama"
          value={text}
          onChange={(e) => { setText(e.target.value); setHasSearched(false); }}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={checkPalindrome} size="large">
          Check Palindrome
        </Button>
      </Box>

      {hasSearched && result && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" color={result.isPalindrome ? 'success.main' : 'error.main'} gutterBottom>
            {result.isPalindrome ? '✅ It is a palindrome!' : '❌ Not a palindrome'}
          </Typography>
          
          <Box sx={{ mt: 2, display: 'inline-block', textAlign: 'left', bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary"><strong>Cleaned Text:</strong> {result.cleaned}</Typography>
            <Typography variant="body2" color="text.secondary"><strong>Reversed Text:</strong> {result.reversed}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PalindromeChecker = () => {
  const content = (
    <>
      <Typography variant="h2">What is a Palindrome?</Typography>
      <Typography variant="body1">
        A palindrome is a word, phrase, number, or other sequence of characters that reads the same forward and backward (ignoring spaces, punctuation, and capitalization).
      </Typography>

      <Typography variant="h2">Famous Examples</Typography>
      <Typography variant="body1">
        <ul>
          <li>"Racecar"</li>
          <li>"A man, a plan, a canal: Panama"</li>
          <li>"Was it a car or a cat I saw?"</li>
          <li>"12321"</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Palindrome Checker"
      description="Check if a word or phrase is a palindrome. Free online text analysis tool."
      url="/tools/palindrome-checker"
      content={content}
      category="Tools"
    >
      <PalindromeCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PalindromeChecker;
