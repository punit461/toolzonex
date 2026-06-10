'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const CoinFlipContent = () => {
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const flipCoin = () => {
    setIsFlipping(true);
    setResult(null);

    // Simulate flipping delay for anticipation
    setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      setResult(isHeads ? 'Heads' : 'Tails');
      
      if (isHeads) {
        setHeadsCount(prev => prev + 1);
      } else {
        setTailsCount(prev => prev + 1);
      }
      
      setIsFlipping(false);
    }, 600);
  };

  const resetStats = () => {
    setHeadsCount(0);
    setTailsCount(0);
    setResult(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      
      <Box sx={{ 
        width: 150, 
        height: 150, 
        borderRadius: '50%', 
        bgcolor: 'primary.main', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        border: '8px solid',
        borderColor: 'primary.main',
        transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        transform: isFlipping ? 'rotateY(1800deg)' : 'rotateY(0deg)',
      }}>
        {isFlipping ? (
           <Typography variant="h4" color="white" fontWeight="bold">?</Typography>
        ) : (
           <Typography variant="h3" color="white" fontWeight="bold">
             {result ? (result === 'Heads' ? 'H' : 'T') : '?'}
           </Typography>
        )}
      </Box>

      <Typography variant="h3" fontWeight="800" sx={{ minHeight: 48 }}>
        {isFlipping ? 'Flipping...' : (result || 'Ready to flip')}
      </Typography>

      <Button 
        variant="contained" 
        onClick={flipCoin} 
        size="large" 
        disabled={isFlipping}
        sx={{ px: 6, py: 1.5, fontSize: '1.1rem', borderRadius: 8 }}
      >
        Flip Coin
      </Button>

      <Paper sx={{ display: 'flex', gap: 4, p: 3, mt: 2, borderRadius: 3, width: '100%', maxWidth: 400, justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="700" color="primary.main">{headsCount}</Typography>
          <Typography variant="body2" color="text.secondary">Heads</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight="700" color="secondary.main">{tailsCount}</Typography>
          <Typography variant="body2" color="text.secondary">Tails</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
          <Button size="small" onClick={resetStats}>Reset Stats</Button>
        </Box>
      </Paper>
    </Box>
  );
};

const CoinFlip = () => {
  const content = (
    <>
      <Typography variant="h2">How does the virtual coin flip work?</Typography>
      <Typography variant="body1">
        This tool uses a secure pseudorandom number generator in your browser (`Math.random()`) to determine the outcome. If the generated number is less than 0.5, it lands on Heads. If it's 0.5 or higher, it lands on Tails. The odds are exactly 50/50.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Flip a Coin - Heads or Tails Online"
      description="Flip a virtual coin instantly online. Free heads or tails random coin flipper for making quick decisions."
      url="/tools/coin-flip"
      content={content}
      category="Tools"
    >
      <CoinFlipContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CoinFlip;
