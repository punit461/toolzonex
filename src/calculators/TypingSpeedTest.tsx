'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const PARAGRAPHS = [
  "The quick brown fox jumps over the lazy dog. This is a simple test of your typing speed and accuracy. Keep going and see how fast you can type this sentence without making any mistakes.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. Always remember that you are braver than you believe, stronger than you seem, and smarter than you think.",
  "In the middle of every difficulty lies opportunity. Typing fast requires practice, muscle memory, and focus. Keep your eyes on the screen and let your fingers do the rest of the work.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Focus on the letters, ignore the mistakes, and push through to the very end of the paragraph."
];

const TypingSpeedTestContent = () => {
  const [textToType, setTextToType] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isTestActive, setIsTestActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const initTest = () => {
    setTextToType(PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)]);
    setUserInput('');
    setIsTestActive(false);
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    initTest();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const calculateStats = (currentInput: string) => {
    // Calculate WPM
    const wordsTyped = currentInput.trim().split(/\s+/).length;
    const minutes = (60 - timeLeft) / 60 || 0.01; // Avoid divide by zero
    const calculatedWpm = Math.round(wordsTyped / minutes);
    setWpm(calculatedWpm);

    // Calculate Accuracy
    let correctChars = 0;
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === textToType[i]) {
        correctChars++;
      }
    }
    const calculatedAccuracy = currentInput.length > 0 
      ? Math.round((correctChars / currentInput.length) * 100) 
      : 100;
    setAccuracy(calculatedAccuracy);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isTestActive && val.length === 1 && timeLeft === 60) {
      // Start the test
      setIsTestActive(true);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsTestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (timeLeft > 0) {
      setUserInput(val);
      calculateStats(val);
      
      // Auto-stop if they finish the text perfectly
      if (val === textToType) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsTestActive(false);
      }
    }
  };

  // Render text with correct/incorrect highlighting
  const renderText = () => {
    return textToType.split('').map((char, index) => {
      let color = 'text.secondary';
      let bgcolor = 'transparent';

      if (index < userInput.length) {
        if (userInput[index] === char) {
          color = 'success.main';
        } else {
          color = 'error.main';
          bgcolor = 'error.light';
        }
      }

      return (
        <span key={index} style={{ color: color, backgroundColor: bgcolor === 'error.light' ? '#ffebee' : 'transparent', borderRadius: '2px' }}>
          {char}
        </span>
      );
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>Time Left</Typography>
          <Typography variant="h3" fontWeight="bold">{timeLeft}s</Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>WPM</Typography>
          <Typography variant="h3" fontWeight="bold">{wpm}</Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>Accuracy</Typography>
          <Typography variant="h3" fontWeight="bold">{accuracy}%</Typography>
        </Paper>
      </Box>

      <Paper sx={{ p: 3, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', minHeight: 120 }}>
        <Typography variant="h6" sx={{ fontFamily: 'monospace', lineHeight: 1.6, fontSize: '1.2rem', userSelect: 'none' }}>
          {renderText()}
        </Typography>
      </Paper>

      <TextField
        value={userInput}
        onChange={handleInput}
        disabled={timeLeft === 0}
        fullWidth
        multiline
        rows={3}
        placeholder={timeLeft === 60 ? "Start typing here to begin the test..." : "Keep typing..."}
        sx={{
          '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '1.1rem' }
        }}
      />

      <Button 
        variant="outlined" 
        size="large" 
        onClick={initTest} 
        startIcon={<RefreshIcon />}
        sx={{ alignSelf: 'center', px: 4 }}
      >
        Restart Test
      </Button>

    </Box>
  );
};

const TypingSpeedTest = () => {
  const content = (
    <>
      <Typography variant="h2">How is Words Per Minute (WPM) calculated?</Typography>
      <Typography variant="body1">
        This typing speed test calculates your WPM based on the standard metric where 1 word = 5 keystrokes (including spaces). The timer starts automatically as soon as you type the first letter. Keep your eyes on the target text to maintain high accuracy!
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Typing Speed Test (WPM)"
      description="Check your typing speed and accuracy in Words Per Minute (WPM). Free online 60-second typing test."
      url="/tools/typing-speed-test"
      content={content}
      category="Tools"
    >
      <TypingSpeedTestContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TypingSpeedTest;
