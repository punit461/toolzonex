'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

const TIMES = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const FocusTimerContent = () => {
  const [mode, setMode] = useState<Mode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState<number>(TIMES.pomodoro);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Play a sound when timer finishes
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
        audio.play().catch(() => {});
      } catch (e) {}
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: Mode | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
      setTimeLeft(TIMES[newMode]);
      setIsActive(false);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TIMES[mode]);
  };

  const formatTime = (timeInSeconds: number) => {
    const m = Math.floor(timeInSeconds / 60);
    const s = timeInSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getBgColor = () => {
    switch (mode) {
      case 'pomodoro': return '#ef4444'; // Red
      case 'shortBreak': return '#3b82f6'; // Blue
      case 'longBreak': return '#10b981'; // Green
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', maxWidth: 600, mx: 'auto' }}>
      
      {/* Mode Selector */}
      <ToggleButtonGroup
        color="primary"
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="Timer Mode"
        sx={{ bgcolor: 'white' }}
      >
        <ToggleButton value="pomodoro" sx={{ px: 3, py: 1 }}>Pomodoro (25m)</ToggleButton>
        <ToggleButton value="shortBreak" sx={{ px: 3, py: 1 }}>Short Break (5m)</ToggleButton>
        <ToggleButton value="longBreak" sx={{ px: 3, py: 1 }}>Long Break (15m)</ToggleButton>
      </ToggleButtonGroup>

      {/* Timer Display */}
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          aspectRatio: '16/9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: getBgColor(),
          color: 'white',
          borderRadius: 4,
          transition: 'background-color 0.5s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 800, 
            fontFamily: 'monospace',
            fontSize: { xs: '5rem', sm: '7rem', md: '8rem' },
            letterSpacing: -2
          }}
        >
          {formatTime(timeLeft)}
        </Typography>
        
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            size="large"
            startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={toggleTimer}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              borderRadius: 8, 
              px: 5, 
              py: 2,
              fontSize: '1.2rem',
              boxShadow: 'none'
            }}
          >
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <IconButton 
            onClick={resetTimer}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.1)', 
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
            }}
          >
            <RestartAltIcon fontSize="large" />
          </IconButton>
        </Box>
      </Paper>

    </Box>
  );
};

const FocusTimer = () => {
  const content = (
    <>
      <Typography variant="h2">Free Pomodoro Focus Timer</Typography>
      <Typography variant="body1">
        Boost your productivity using the Pomodoro Technique. Work in focused 25-minute bursts (Pomodoros), separated by 5-minute short breaks. After 4 Pomodoros, take a 15-minute long break to recharge.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Pomodoro Focus Timer"
      description="Boost productivity with this free online Pomodoro timer. Alternate between focused work sessions and short breaks to stay fresh."
      url="/utilities/focus-timer"
      content={content}
      category="Utilities"
    >
      <FocusTimerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FocusTimer;
