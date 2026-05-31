'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FlagIcon from '@mui/icons-material/Flag';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const StopwatchContent = () => {
  const [time, setTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [laps, setLaps] = useState<{lapNumber: number, lapTime: number, overallTime: number}[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isActive) {
      lastTickTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const delta = now - lastTickTimeRef.current;
        setTime(prevTime => prevTime + delta);
        lastTickTimeRef.current = now;
      }, 10); // Update every 10ms for smooth millisecond rendering
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const toggleStopwatch = () => {
    setIsActive(!isActive);
  };

  const resetStopwatch = () => {
    setIsActive(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (isActive) {
      const lastLapOverall = laps.length > 0 ? laps[0].overallTime : 0;
      const lapTime = time - lastLapOverall;
      setLaps([{
        lapNumber: laps.length + 1,
        lapTime: lapTime,
        overallTime: time
      }, ...laps]);
    }
  };

  const formatTime = (timeMs: number) => {
    const totalSeconds = Math.floor(timeMs / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    const ms = Math.floor((timeMs % 1000) / 10); // 2 digits
    
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', maxWidth: 600, mx: 'auto' }}>
      
      {/* Time Display */}
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          aspectRatio: { xs: '4/3', sm: '16/9' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'action.hover',
          border: '1px solid',
          borderRadius: 4
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 700, 
            fontFamily: 'monospace',
            fontSize: { xs: '3.5rem', sm: '5rem', md: '6rem' }
          }}
        >
          {formatTime(time)}
        </Typography>
      </Paper>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color={isActive ? "warning" : "primary"}
          size="large"
          startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
          onClick={toggleStopwatch}
          sx={{ borderRadius: 8, px: 4, py: 1.5 }}
        >
          {isActive ? 'Stop' : 'Start'}
        </Button>
        <Button 
          variant="outlined" 
          color="secondary"
          size="large"
          startIcon={<FlagIcon />}
          onClick={recordLap}
          disabled={!isActive}
          sx={{ borderRadius: 8, px: 4, py: 1.5 }}
        >
          Lap
        </Button>
        <Button 
          variant="outlined" 
          color="inherit"
          size="large"
          startIcon={<RestartAltIcon />}
          onClick={resetStopwatch}
          sx={{ borderRadius: 8, px: 4, py: 1.5 }}
        >
          Reset
        </Button>
      </Box>

      {/* Laps List */}
      {laps.length > 0 && (
        <Paper variant="outlined" sx={{ width: '100%', mt: 2, maxHeight: 300, overflow: 'auto' }}>
          <List disablePadding>
            {laps.map((lap, index) => (
              <Box key={lap.lapNumber}>
                <ListItem sx={{ py: 1.5 }}>
                  <Typography variant="body1" sx={{ width: 80, fontWeight: 'bold', color: 'text.secondary' }}>
                    Lap {lap.lapNumber}
                  </Typography>
                  <ListItemText 
                    primary={
                      <Typography variant="body1" fontFamily="monospace" fontWeight="bold">
                        +{formatTime(lap.lapTime)}
                      </Typography>
                    }
                  />
                  <Typography variant="body1" fontFamily="monospace" color="text.secondary">
                    {formatTime(lap.overallTime)}
                  </Typography>
                </ListItem>
                {index < laps.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      )}

    </Box>
  );
};

const Stopwatch = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Stopwatch</Typography>
      <Typography variant="body1">
        A simple, fast, and precise online stopwatch. Features millisecond tracking and lap time recording. Perfect for sports, workouts, studying, or tracking task durations.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Online Stopwatch with Laps"
      description="A simple, fast, and precise online stopwatch with millisecond tracking and lap times. Free productivity tool."
      url="/utilities/stopwatch"
      content={content}
      category="Utilities"
    >
      <StopwatchContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Stopwatch;
