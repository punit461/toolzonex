'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, TextField, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TimerContent = () => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  
  const [timeLeft, setTimeLeft] = useState<number>(5 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      if (interval) clearInterval(interval);
      // Play a sound when timer finishes (optional enhancement)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
        audio.play().catch(() => {});
      } catch (e) {}
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    if (!isActive && timeLeft === 0) {
      const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
      if (totalSeconds > 0) {
        setTimeLeft(totalSeconds);
        setIsFinished(false);
      }
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft((hours * 3600) + (minutes * 60) + seconds);
  };

  const handleSetTime = (h: number, m: number, s: number) => {
    const total = (h * 3600) + (m * 60) + s;
    if (total > 0) {
      setHours(h);
      setMinutes(m);
      setSeconds(s);
      setTimeLeft(total);
      setIsActive(false);
      setIsFinished(false);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const h = Math.floor(timeInSeconds / 3600);
    const m = Math.floor((timeInSeconds % 3600) / 60);
    const s = timeInSeconds % 60;
    
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft > 0 ? (timeLeft / ((hours * 3600) + (minutes * 60) + seconds)) * 100 : 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', maxWidth: 600, mx: 'auto' }}>
      
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
          bgcolor: isFinished ? 'error.light' : '#f8fafc',
          color: isFinished ? 'white' : 'text.primary',
          border: '1px solid',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          transition: 'background-color 0.3s ease'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            height: '4px', 
            bgcolor: 'primary.main', 
            width: `${progress}%`,
            transition: 'width 1s linear'
          }} 
        />
        
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 700, 
            fontFamily: 'monospace',
            fontSize: { xs: '4rem', sm: '6rem', md: '7rem' }
          }}
        >
          {formatTime(timeLeft)}
        </Typography>
        
        {isFinished && (
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>Time's Up!</Typography>
        )}
      </Paper>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          color={isActive ? "warning" : "primary"}
          size="large"
          startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
          onClick={toggleTimer}
          sx={{ borderRadius: 8, px: 4, py: 1.5 }}
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button 
          variant="outlined" 
          color="inherit"
          size="large"
          startIcon={<RestartAltIcon />}
          onClick={resetTimer}
          sx={{ borderRadius: 8, px: 4, py: 1.5 }}
        >
          Reset
        </Button>
      </Box>

      {/* Preset Times */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
        <Button size="small" variant="outlined" onClick={() => handleSetTime(0, 1, 0)}>1 Min</Button>
        <Button size="small" variant="outlined" onClick={() => handleSetTime(0, 3, 0)}>3 Min</Button>
        <Button size="small" variant="outlined" onClick={() => handleSetTime(0, 5, 0)}>5 Min</Button>
        <Button size="small" variant="outlined" onClick={() => handleSetTime(0, 10, 0)}>10 Min</Button>
        <Button size="small" variant="outlined" onClick={() => handleSetTime(0, 15, 0)}>15 Min</Button>
        <Button size="small" variant="outlined" onClick={() => handleSetTime(0, 25, 0)}>25 Min</Button>
        <Button size="small" variant="outlined" onClick={() => handleSetTime(1, 0, 0)}>1 Hour</Button>
      </Box>

      {/* Custom Time */}
      <Paper variant="outlined" sx={{ p: 2, width: '100%', mt: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant="subtitle2" sx={{ minWidth: 100 }}>Custom Time:</Typography>
        <TextField 
          label="Hrs" 
          type="number" 
          size="small" 
          value={hours}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            setHours(val);
            if (!isActive) handleSetTime(val, minutes, seconds);
          }}
        />
        <TextField 
          label="Min" 
          type="number" 
          size="small" 
          value={minutes}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            setMinutes(val);
            if (!isActive) handleSetTime(hours, val, seconds);
          }}
        />
        <TextField 
          label="Sec" 
          type="number" 
          size="small" 
          value={seconds}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            setSeconds(val);
            if (!isActive) handleSetTime(hours, minutes, val);
          }}
        />
      </Paper>

    </Box>
  );
};

const Timer = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Countdown Timer</Typography>
      <Typography variant="body1">
        A simple, fast, and free online countdown timer. Use it for cooking, working out, studying, or keeping track of presentations. Set a custom time or use our quick presets.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Online Countdown Timer"
      description="A simple, fast, and free online countdown timer. Perfect for studying, workouts, cooking, and productivity."
      url="/utilities/timer"
      content={content}
      category="Utilities"
    >
      <TimerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Timer;
