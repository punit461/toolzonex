'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PrimeNumberCheckerContent = () => {
  const [numberInput, setNumberInput] = useState<string>('7');
  const [result, setResult] = useState<{ isPrime: boolean, factors: number[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkPrime = () => {
    const num = parseInt(numberInput);
    if (isNaN(num)) {
      setError("Please enter a valid number.");
      setResult(null);
      return;
    }
    
    if (num > Number.MAX_SAFE_INTEGER) {
      setError("Number is too large to accurately check in the browser.");
      setResult(null);
      return;
    }

    if (num <= 1) {
      setResult({ isPrime: false, factors: [] });
      setError(null);
      return;
    }

    const factors = [];
    let isPrime = true;

    // Check for factors up to the square root
    const limit = Math.sqrt(num);
    for (let i = 2; i <= limit; i++) {
      if (num % i === 0) {
        isPrime = false;
        factors.push(i);
        // If not a prime, we don't need to find ALL factors to prove it, but finding a couple is helpful.
        // Let's just find the first factor for large numbers to keep it performant, 
        // or up to 10 factors.
        if (factors.length >= 10) break;
      }
    }

    setResult({ isPrime, factors });
    setError(null);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Enter a whole number"
          type="number"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
          fullWidth
          placeholder="e.g. 97"
        />
        <Button variant="contained" size="large" onClick={checkPrime} fullWidth>
          Check if Prime
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      {/* Output Panel */}
      <Box>
        {result !== null ? (
          <Paper 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              bgcolor: result.isPrime ? 'success.light' : 'error.light',
              color: 'white',
              borderRadius: 4
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
              {result.isPrime ? "It's a Prime!" : "Not a Prime."}
            </Typography>
            <Typography variant="h6">
              {numberInput} {result.isPrime ? 'is a prime number.' : 'is a composite number.'}
            </Typography>
            
            {!result.isPrime && result.factors.length > 0 && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  It is divisible by at least:
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {result.factors.join(', ')}{result.factors.length >= 10 ? '...' : ''}
                </Typography>
              </Box>
            )}
            
            {!result.isPrime && numberInput === '1' && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                <Typography variant="body2">
                  1 is neither prime nor composite by definition.
                </Typography>
              </Box>
            )}
            
            {!result.isPrime && numberInput === '0' && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                <Typography variant="body2">
                  0 is not a prime number.
                </Typography>
              </Box>
            )}
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Enter a number and click Check to see if it is a prime number.
            </Typography>
          </Paper>
        )}
      </Box>

    </Box>
  );
};

const PrimeNumberChecker = () => {
  const content = (
    <>
      <Typography variant="h2">Prime Number Checker</Typography>
      <Typography variant="body1">
        A prime number is a whole number greater than 1 whose only divisors are 1 and itself (e.g., 2, 3, 5, 7, 11). Use this simple math utility to instantly check whether a given number is prime or composite.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Prime Number Checker"
      description="Check if a number is a prime number instantly online. Free math utility to find out if a number is prime or composite."
      url="/utilities/prime-number-checker"
      content={content}
      category="Utilities"
    >
      <PrimeNumberCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PrimeNumberChecker;
