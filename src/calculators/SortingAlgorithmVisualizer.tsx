'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Paper, Slider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const ARRAY_SIZE = 40;

const generateArray = (size: number) => {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100) + 5);
  }
  return arr;
};

const SortingAlgorithmVisualizerContent = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(50);
  
  // Track active elements to highlight them
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);

  // Ref to handle stopping
  const stopRef = useRef(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    setArray(generateArray(ARRAY_SIZE));
    setActiveIndices([]);
    setSortedIndices([]);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startSort = async () => {
    setIsSorting(true);
    stopRef.current = false;
    setSortedIndices([]);

    if (algorithm === 'bubble') await bubbleSort();
    else if (algorithm === 'selection') await selectionSort();
    else if (algorithm === 'insertion') await insertionSort();

    if (!stopRef.current) {
      // Mark all as sorted
      const allIdx = Array.from({length: ARRAY_SIZE}, (_, i) => i);
      setSortedIndices(allIdx);
    }
    
    setActiveIndices([]);
    setIsSorting(false);
  };

  const stopSort = () => {
    stopRef.current = true;
  };

  const getDelay = () => {
    return Math.max(10, 200 - speed * 1.9); // max speed -> 10ms, min -> 200ms
  };

  // --- Algorithms ---

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) return;
        
        setActiveIndices([j, j + 1]);
        await sleep(getDelay());

        if (arr[j] > arr[j + 1]) {
          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
      setSortedIndices(prev => [...prev, n - i - 1]);
    }
    setSortedIndices(prev => [...prev, 0]);
  };

  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (stopRef.current) return;
        
        setActiveIndices([minIdx, j]);
        await sleep(getDelay());

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        let temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
        setArray([...arr]);
      }
      setSortedIndices(prev => [...prev, i]);
    }
    setSortedIndices(prev => [...prev, n - 1]);
  };

  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      
      while (j >= 0 && arr[j] > key) {
        if (stopRef.current) return;
        
        setActiveIndices([j, j + 1]);
        await sleep(getDelay());

        arr[j + 1] = arr[j];
        setArray([...arr]);
        j = j - 1;
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      {/* Controls */}
      <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f8fafc', display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Algorithm</InputLabel>
          <Select 
            value={algorithm} 
            label="Algorithm" 
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isSorting}
          >
            <MenuItem value="bubble">Bubble Sort</MenuItem>
            <MenuItem value="selection">Selection Sort</MenuItem>
            <MenuItem value="insertion">Insertion Sort</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ width: 200, px: 2 }}>
          <Typography variant="caption" color="text.secondary">Animation Speed</Typography>
          <Slider
            value={speed}
            onChange={(e, val) => setSpeed(val as number)}
            min={1}
            max={100}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
          <Button 
            variant="outlined" 
            startIcon={<RestartAltIcon />} 
            onClick={resetArray}
            disabled={isSorting}
          >
            Generate New Array
          </Button>

          {!isSorting ? (
            <Button 
              variant="contained" 
              color="success" 
              startIcon={<PlayArrowIcon />} 
              onClick={startSort}
            >
              Start Sort
            </Button>
          ) : (
            <Button 
              variant="contained" 
              color="error" 
              startIcon={<StopIcon />} 
              onClick={stopSort}
            >
              Stop
            </Button>
          )}
        </Box>
      </Paper>

      {/* Visualizer Canvas Area */}
      <Paper 
        sx={{ 
          height: 400, 
          bgcolor: '#1e293b', 
          p: 2, 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'center', 
          gap: { xs: 0.5, md: 1 } 
        }}
      >
        {array.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);
          
          let color = '#3b82f6'; // default blue
          if (isActive) color = '#f43f5e'; // active red
          else if (isSorted) color = '#10b981'; // sorted green

          return (
            <Box
              key={idx}
              sx={{
                width: { xs: 8, md: 16 },
                height: `${val}%`,
                bgcolor: color,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
                transition: 'height 0.1s ease, background-color 0.1s ease',
              }}
            />
          );
        })}
      </Paper>

      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#3b82f6', borderRadius: 1 }} />
          <Typography variant="body2">Unsorted</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#f43f5e', borderRadius: 1 }} />
          <Typography variant="body2">Comparing/Swapping</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 16, height: 16, bgcolor: '#10b981', borderRadius: 1 }} />
          <Typography variant="body2">Sorted</Typography>
        </Box>
      </Box>

    </Box>
  );
};

const SortingAlgorithmVisualizer = () => {
  const content = (
    <>
      <Typography variant="h2">Sorting Algorithm Visualizer</Typography>
      <Typography variant="body1">
        Watch and learn how popular sorting algorithms work behind the scenes. This interactive tool visualizes algorithms like Bubble Sort, Selection Sort, and Insertion Sort in real-time. Adjust the animation speed and generate new random arrays to see how the algorithms behave under different conditions.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Sorting Algorithm Visualizer - Learn Sorting Online"
      description="Visualize how popular sorting algorithms like Bubble Sort and Selection Sort work in real-time."
      url="/utilities/algorithm-visualizer"
      content={content}
      category="Utilities"
    >
      <SortingAlgorithmVisualizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SortingAlgorithmVisualizer;
