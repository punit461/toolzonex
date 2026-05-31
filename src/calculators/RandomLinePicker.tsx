'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Slider } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const RandomLinePickerContent = () => {
  const [text, setText] = useState<string>('Alice\nBob\nCharlie\nDiana\nEdward\nFiona');
  const [pickCount, setPickCount] = useState<number>(1);
  const [pickedLines, setPickedLines] = useState<string[]>([]);

  const pickRandomLines = () => {
    if (!text.trim()) {
      setPickedLines([]);
      return;
    }

    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return;

    // Shuffle array using Fisher-Yates
    const shuffled = [...lines];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const numToPick = Math.min(pickCount, shuffled.length);
    setPickedLines(shuffled.slice(0, numToPick));
  };

  const totalLines = text.split('\n').filter(line => line.trim() !== '').length;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" mb={1} color="text.secondary">Enter items (one per line):</Typography>
          <TextField
            multiline
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            placeholder="Paste a list of names, numbers, or items here..."
          />
          <Typography variant="caption" color="text.secondary">Total valid items: {totalLines}</Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc' }}>
          <Typography variant="subtitle2" mb={2}>How many items to pick?</Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={pickCount}
              onChange={(e, val) => setPickCount(val as number)}
              min={1}
              max={Math.max(1, Math.min(100, totalLines))}
              step={1}
              valueLabelDisplay="on"
            />
          </Box>
        </Paper>

        <Button 
          variant="contained" 
          size="large" 
          startIcon={<ShuffleIcon />} 
          onClick={pickRandomLines}
          disabled={totalLines === 0}
        >
          Pick Random Items
        </Button>
      </Box>

      {/* Output Panel */}
      <Box>
        {pickedLines.length > 0 ? (
          <Paper 
            sx={{ 
              p: 4, 
              bgcolor: 'primary.main', 
              color: 'white',
              borderRadius: 4,
              minHeight: 300
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={3} sx={{ opacity: 0.9 }}>
              Result ({pickedLines.length})
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {pickedLines.map((line, idx) => (
                <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Typography variant="h6">{line}</Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Enter your list on the left and click the button to pick a random winner or item.
            </Typography>
          </Paper>
        )}
      </Box>

    </Box>
  );
};

const RandomLinePicker = () => {
  const content = (
    <>
      <Typography variant="h2">Random Line Picker</Typography>
      <Typography variant="body1">
        Need to pick a random winner for a giveaway? Looking to randomly select a student's name, a restaurant for dinner, or a task to do next? Just paste your list of items and our random line picker will fairly select one or more items for you.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Random Line Picker - Choose a Random Winner"
      description="Fairly pick a random name, winner, or item from a list. Free online random line picker."
      url="/tools/random-line-picker"
      content={content}
      category="Tools"
    >
      <RandomLinePickerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomLinePicker;
