'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

// A simple backtracking algorithm to generate a full 9x9 Sudoku grid
const generateFullGrid = (): number[][] => {
  const grid = Array(9).fill(null).map(() => Array(9).fill(0));
  
  const isValid = (grid: number[][], row: number, col: number, num: number) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num) return false;
    }
    for (let x = 0; x < 9; x++) {
      if (grid[x][col] === num) return false;
    }
    const startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  };

  const solve = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
          for (let num of nums) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (solve()) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve();
  return grid;
};

// Removes numbers to create a puzzle of specified difficulty
const removeNumbers = (grid: number[][], difficulty: string): (number | null)[][] => {
  const puzzle = grid.map(row => [...row]);
  let blanks = 40; // medium
  if (difficulty === 'easy') blanks = 30;
  if (difficulty === 'hard') blanks = 50;
  if (difficulty === 'expert') blanks = 60;

  while (blanks > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== null) {
      puzzle[row][col] = null as any;
      blanks--;
    }
  }
  return puzzle as (number | null)[][];
};

const SudokuGeneratorContent = () => {
  const [difficulty, setDifficulty] = useState('medium');
  const [grid, setGrid] = useState<(number | null)[][]>([]);

  const generatePuzzle = () => {
    const fullGrid = generateFullGrid();
    const puzzle = removeNumbers(fullGrid, difficulty);
    setGrid(puzzle);
  };

  useEffect(() => {
    generatePuzzle();
  }, [difficulty]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            label="Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
          </Select>
        </FormControl>
        
        <Button variant="contained" size="large" onClick={generatePuzzle}>
          Generate New Puzzle
        </Button>
      </Box>

      <Paper 
        sx={{ 
          p: 2, 
          display: 'grid', 
          gridTemplateColumns: 'repeat(9, 1fr)', 
          gap: 0,
          border: '2px solid black',
          width: 'fit-content'
        }}
      >
        {grid.map((row, rIndex) => 
          row.map((cell, cIndex) => (
            <Box 
              key={`${rIndex}-${cIndex}`}
              sx={{
                width: { xs: 30, sm: 40, md: 50 },
                height: { xs: 30, sm: 40, md: 50 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #ccc',
                borderRight: (cIndex + 1) % 3 === 0 && cIndex !== 8 ? '2px solid black' : '1px solid #ccc',
                borderBottom: (rIndex + 1) % 3 === 0 && rIndex !== 8 ? '2px solid black' : '1px solid #ccc',
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                fontWeight: cell !== null ? 'bold' : 'normal',
                bgcolor: cell !== null ? '#f5f5f5' : 'white',
              }}
            >
              {cell || ''}
            </Box>
          ))
        )}
      </Paper>
      
      <Button variant="outlined" onClick={() => window.print()}>
        Print Puzzle
      </Button>
    </Box>
  );
};

const SudokuGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Sudoku Generator?</Typography>
      <Typography variant="body1">
        Select your desired difficulty level (Easy to Expert) and click "Generate New Puzzle". The system uses a randomized backtracking algorithm to generate a unique, mathematically valid Sudoku grid every single time. You can play directly on screen or click "Print Puzzle" to solve it on paper.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Sudoku Puzzle Generator"
      description="Generate unlimited, unique, and printable Sudoku puzzles from Easy to Expert difficulties online for free."
      url="/tools/sudoku-generator"
      content={content}
      category="Tools"
    >
      <SudokuGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SudokuGenerator;
