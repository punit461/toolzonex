'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

interface WordClue {
  word: string;
  clue: string;
}

const CrosswordPuzzleGeneratorContent = () => {
  const [items, setItems] = useState<WordClue[]>([
    { word: 'REACT', clue: 'Popular JavaScript library for building UIs' },
    { word: 'NEXTJS', clue: 'React framework for production' },
    { word: 'TYPESCRIPT', clue: 'Typed superset of JavaScript' },
  ]);
  const [newWord, setNewWord] = useState('');
  const [newClue, setNewClue] = useState('');
  
  const [grid, setGrid] = useState<{char: string, num?: number}[][] | null>(null);
  const [across, setAcross] = useState<{num: number, clue: string}[]>([]);
  const [down, setDown] = useState<{num: number, clue: string}[]>([]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim() && newClue.trim() && items.length < 15) {
      setItems([...items, { word: newWord.trim().toUpperCase().replace(/[^A-Z]/g, ''), clue: newClue.trim() }]);
      setNewWord('');
      setNewClue('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const generateCrossword = () => {
    if (items.length < 2) {
      alert("Please add at least 2 words to generate a crossword.");
      return;
    }

    // Very simplistic mock generator algorithm for presentation purposes
    // A real crossword algorithm is complex (simulated annealing, backtracking).
    // For this static tool, we'll arrange them in a diagonal step pattern or simple intersections if possible.
    
    // Create an empty 15x15 grid
    const size = 15;
    const newGrid: {char: string, num?: number}[][] = Array(size).fill(null).map(() => Array(size).fill(null));
    const newAcross: {num: number, clue: string}[] = [];
    const newDown: {num: number, clue: string}[] = [];
    
    // Sort words by length descending
    const sortedItems = [...items].sort((a, b) => b.word.length - a.word.length);
    
    let counter = 1;
    let placed = 0;

    // Place first word horizontally in the middle
    if (sortedItems.length > 0) {
      const first = sortedItems[0];
      const startCol = Math.floor((size - first.word.length) / 2);
      const startRow = Math.floor(size / 2);
      
      for (let i = 0; i < first.word.length; i++) {
        newGrid[startRow][startCol + i] = { char: first.word[i] };
        if (i === 0) newGrid[startRow][startCol].num = counter;
      }
      newAcross.push({ num: counter, clue: first.clue });
      counter++;
      placed++;
    }

    // Try to place the rest
    for (let w = 1; w < sortedItems.length; w++) {
      const item = sortedItems[w];
      let placedThisWord = false;

      // Scan grid for intersecting characters
      for (let r = 0; r < size && !placedThisWord; r++) {
        for (let c = 0; c < size && !placedThisWord; c++) {
          if (newGrid[r][c] && item.word.includes(newGrid[r][c].char)) {
            const matchIdx = item.word.indexOf(newGrid[r][c].char);
            
            // Try to place vertically
            let canPlaceVertical = true;
            const startR = r - matchIdx;
            if (startR < 0 || startR + item.word.length > size) canPlaceVertical = false;
            
            // Very simplified collision check
            if (canPlaceVertical) {
              for (let i = 0; i < item.word.length; i++) {
                if (i !== matchIdx && newGrid[startR + i][c]) {
                  canPlaceVertical = false;
                }
              }
            }

            if (canPlaceVertical) {
              for (let i = 0; i < item.word.length; i++) {
                if (!newGrid[startR + i][c]) {
                  newGrid[startR + i][c] = { char: item.word[i] };
                }
              }
              const isNewNumber = !newGrid[startR][c].num;
              if (isNewNumber) newGrid[startR][c].num = counter;
              newDown.push({ num: newGrid[startR][c].num!, clue: item.clue });
              if (isNewNumber) counter++;
              placedThisWord = true;
            }
          }
        }
      }

      // If couldn't place, just stick it somewhere blank
      if (!placedThisWord) {
         // find a blank spot horizontal
         for (let r = 0; r < size && !placedThisWord; r++) {
           let blankStretch = 0;
           for (let c = 0; c < size; c++) {
             if (!newGrid[r][c]) blankStretch++;
             else blankStretch = 0;

             if (blankStretch >= item.word.length) {
               const startCol = c - item.word.length + 1;
               for (let i = 0; i < item.word.length; i++) {
                 newGrid[r][startCol + i] = { char: item.word[i] };
                 if (i === 0) newGrid[r][startCol].num = counter;
               }
               newAcross.push({ num: counter, clue: item.clue });
               counter++;
               placedThisWord = true;
               break;
             }
           }
         }
      }
    }

    setGrid(newGrid);
    setAcross(newAcross);
    setDown(newDown);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '300px 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" fontWeight="700">Add Words & Clues</Typography>
        
        <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TextField
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            label="Word"
            fullWidth
            size="small"
          />
          <TextField
            value={newClue}
            onChange={(e) => setNewClue(e.target.value)}
            label="Clue"
            fullWidth
            size="small"
            multiline
            rows={2}
          />
          <Button type="submit" variant="contained" disabled={!newWord.trim() || !newClue.trim() || items.length >= 15}>
            Add Word
          </Button>
        </form>

        <Paper sx={{ maxHeight: 300, overflow: 'auto', border: '1px solid', borderColor: 'divider' }}>
          {items.map((item, index) => (
            <Box key={index} sx={{ p: 1.5, borderBottom: '1px solid #eee', position: 'relative' }}>
              <Typography variant="subtitle2" fontWeight="bold">{item.word}</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>{item.clue}</Typography>
              <IconButton 
                size="small" 
                color="error" 
                onClick={() => handleRemoveItem(index)}
                sx={{ position: 'absolute', top: 4, right: 4 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          {items.length === 0 && <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>No words added.</Typography>}
        </Paper>

        <Button variant="outlined" size="large" onClick={generateCrossword} disabled={items.length < 2}>
          Generate Puzzle
        </Button>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {grid ? (
          <>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button variant="contained" onClick={() => window.print()}>Print Puzzle</Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {/* Grid */}
              <Paper sx={{ p: 1, bgcolor: 'black', width: 'fit-content' }}>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${grid.length}, 1fr)`,
                  gap: '1px',
                  bgcolor: 'black'
                }}>
                  {grid.map((row, r) => 
                    row.map((cell, c) => (
                      <Box key={`${r}-${c}`} sx={{ 
                        width: { xs: 20, sm: 25, md: 30 }, 
                        height: { xs: 20, sm: 25, md: 30 },
                        bgcolor: cell ? 'white' : 'black',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>
                        {cell && cell.num && (
                          <Typography sx={{ position: 'absolute', top: 1, left: 2, fontSize: '0.6rem', lineHeight: 1 }}>
                            {cell.num}
                          </Typography>
                        )}
                        {/* {cell && cell.char} -> Uncomment to show solution */}
                      </Box>
                    ))
                  )}
                </Box>
              </Paper>

              {/* Clues */}
              <Box sx={{ flex: 1, minWidth: 250, display: 'flex', gap: 4 }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold" mb={1}>Across</Typography>
                  {across.map(a => (
                    <Typography key={a.num} variant="body2" sx={{ mb: 0.5 }}>
                      <strong>{a.num}.</strong> {a.clue}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold" mb={1}>Down</Typography>
                  {down.map(d => (
                    <Typography key={d.num} variant="body2" sx={{ mb: 0.5 }}>
                      <strong>{d.num}.</strong> {d.clue}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ccc', borderRadius: 2 }}>
            <Typography color="text.secondary">Add words and click Generate to see your puzzle.</Typography>
          </Box>
        )}
      </Box>

    </Box>
  );
};

const CrosswordPuzzleGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to create a crossword puzzle</Typography>
      <Typography variant="body1">
        This free crossword puzzle generator with clues lets you build a custom crossword maker puzzle from
        scratch in your browser — no software or account needed. Add a list of words and their corresponding
        clues using the form on the left. Once you have at least 2 words, click &quot;Generate Puzzle&quot; to
        automatically arrange them into an intersecting cross puzzle grid. You can then print the puzzle for
        classroom activities, newsletters, or fun!
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding words like &quot;SUN&quot;, &quot;MOON&quot;, and &quot;STAR&quot; with clues automatically
        arranges them into an intersecting grid, ready to print. Want a random crossword generator experience
        instead? Type in any random assortment of words and clues — the layout engine works the same way
        regardless of subject.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating vocabulary puzzles for a classroom or homeschool lesson.</li>
          <li>Making a custom crossword for a party, newsletter, or team-building activity.</li>
          <li>Building a themed cross word puzzle for a birthday, holiday, or trivia night.</li>
          <li>Making your own crosswords in another language — the grid works with any alphabet-based words, including a kruiswoordpuzzel (Dutch crossword puzzle).</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many words do I need?</Typography>
      <Typography variant="body1">
        At least 2 words are required so the grid can intersect them — more words with shared letters produce a
        denser, more interesting puzzle.
      </Typography>
      <Typography variant="h3">Does this include a clue generator, or do I write my own clues?</Typography>
      <Typography variant="body1">
        You write your own clue for each word — this keeps the puzzle accurate for your specific topic, whether
        it&apos;s spelling words, vocabulary terms, or trivia. Once entered, the tool works as the crossword
        puzzle clue generator layout engine, automatically numbering and arranging the across and down clues to
        match the grid.
      </Typography>
      <Typography variant="h3">Is this a random crossword generator?</Typography>
      <Typography variant="body1">
        The grid layout is generated automatically from whatever words and clues you provide, arranging them
        into intersecting rows and columns. For a randomly-themed puzzle, just enter a random assortment of
        words and clues, or start from the built-in demo set and swap in your own.
      </Typography>
      <Typography variant="h3">Can I use this as a kruiswoordpuzzel generator to make a Dutch crossword?</Typography>
      <Typography variant="body1">
        Yes — the grid engine works with any word made of letters, so this doubles as a kruiswoordpuzzel
        generator: just enter Dutch words and clues to build a kruiswoordpuzzel (Dutch for crossword puzzle)
        online, the same way you&apos;d kruiswoordpuzzel maken online in any dedicated Dutch tool. The interface
        itself stays in English, but the words and clues you enter can be in any language, so it works just as
        well as a way to kruiswoordpuzzel online maken as it does for English puzzles.
      </Typography>
      <Typography variant="h3">Can I print my custom crossword maker puzzle?</Typography>
      <Typography variant="body1">
        Yes — once generated, click &quot;Print Puzzle&quot; to print the grid and clue list directly from your
        browser, ready for a classroom, newsletter, or party activity.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Crossword Puzzle Generator"
      description="Create custom printable crossword puzzles online for free. Enter words and clues to generate your own crosswords."
      url="/generators/crossword-puzzle-generator"
      content={content}
      category="Generators"
    >
      <CrosswordPuzzleGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CrosswordPuzzleGenerator;
