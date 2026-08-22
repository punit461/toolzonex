'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

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
      <Typography variant="h2">How to use the online Sudoku generator</Typography>
      <Typography variant="body1">
        Select your desired difficulty level (Easy to Expert) and click "Generate New Puzzle". This random
        sudoku generator uses a randomized backtracking algorithm to build a unique, mathematically valid Sudoku
        grid every single time — no two puzzles are ever the same. You can play directly on screen or click
        "Print Puzzle" to solve it on paper.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting "Medium" difficulty generates a 9x9 grid with roughly 30-35 clues filled in, leaving the rest
        for you to solve.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing a fresh puzzle for a classroom or puzzle book.</li>
          <li>Playing Sudoku directly in the browser without an app or sign-up, as an online sudoku generator.</li>
          <li>Using it as a sudoku game generator for a puzzle night, needing a fresh grid on demand.</li>
          <li>Generating an unlimited supply of random puzzles at a chosen difficulty for practice.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does every generated puzzle have a unique solution?</Typography>
      <Typography variant="body1">
        Yes — the generator guarantees each puzzle has exactly one valid solution.
      </Typography>
      <Typography variant="h3">Is this a random sudoku generator?</Typography>
      <Typography variant="body1">
        Yes — every puzzle is built by randomly filling a valid 9x9 grid with a backtracking algorithm and then
        randomly removing numbers to match your chosen difficulty, so no two puzzles are the same.
      </Typography>
      <Typography variant="h3">Can I play this online sudoku generator directly in the browser?</Typography>
      <Typography variant="body1">
        Yes — the puzzle is generated and displayed instantly on the page. There&apos;s nothing to install; just
        pick a difficulty and start filling in the grid on screen, or print it to solve on paper.
      </Typography>
      <Typography variant="h3">What difficulty levels does this sudoku game generator support?</Typography>
      <Typography variant="body1">
        Four levels — Easy, Medium, Hard, and Expert — each removing a different number of starting clues from
        the solved grid, from roughly 30 blanks on Easy up to 60 on Expert.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/generators/sudoku-generator"
      content={content}
    >
      <SudokuGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SudokuGenerator;
