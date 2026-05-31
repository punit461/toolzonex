'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const ALPHABET = [
  { letter: 'A', word: 'Apple', emoji: '🍎', color: '#ef4444' },
  { letter: 'B', word: 'Bear', emoji: '🐻', color: '#8b5cf6' },
  { letter: 'C', word: 'Cat', emoji: '🐱', color: '#f59e0b' },
  { letter: 'D', word: 'Dog', emoji: '🐶', color: '#10b981' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', color: '#64748b' },
  { letter: 'F', word: 'Frog', emoji: '🐸', color: '#22c55e' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒', color: '#eab308' },
  { letter: 'H', word: 'Horse', emoji: '🐴', color: '#a16207' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', color: '#ec4899' },
  { letter: 'J', word: 'Jellyfish', emoji: '🪼', color: '#0ea5e9' },
  { letter: 'K', word: 'Kangaroo', emoji: '🦘', color: '#d97706' },
  { letter: 'L', word: 'Lion', emoji: '🦁', color: '#f59e0b' },
  { letter: 'M', word: 'Monkey', emoji: '🐒', color: '#8b5cf6' },
  { letter: 'N', word: 'Nest', emoji: '🪹', color: '#64748b' },
  { letter: 'O', word: 'Owl', emoji: '🦉', color: '#78716c' },
  { letter: 'P', word: 'Penguin', emoji: '🐧', color: '#000000' },
  { letter: 'Q', word: 'Queen', emoji: '👸', color: '#ec4899' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰', color: '#f43f5e' },
  { letter: 'S', word: 'Sun', emoji: '☀️', color: '#eab308' },
  { letter: 'T', word: 'Tiger', emoji: '🐯', color: '#f97316' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', color: '#3b82f6' },
  { letter: 'V', word: 'Volcano', emoji: '🌋', color: '#dc2626' },
  { letter: 'W', word: 'Whale', emoji: '🐳', color: '#0ea5e9' },
  { letter: 'X', word: 'Xylophone', emoji: '🎵', color: '#8b5cf6' },
  { letter: 'Y', word: 'Yacht', emoji: '⛵', color: '#3b82f6' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', color: '#171717' },
];

const AlphabetLearningToolContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextLetter = () => {
    setCurrentIndex((prev) => (prev + 1) % ALPHABET.length);
  };

  const prevLetter = () => {
    setCurrentIndex((prev) => (prev - 1 + ALPHABET.length) % ALPHABET.length);
  };

  const playSound = () => {
    // In a real app we might play an MP3. For this static web app, we can use speech synthesis.
    if ('speechSynthesis' in window) {
      const current = ALPHABET[currentIndex];
      const text = `${current.letter}. ${current.letter} is for ${current.word}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentItem = ALPHABET[currentIndex];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      
      {/* Main Card */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 4 } }}>
        <IconButton onClick={prevLetter} size="large" sx={{ bgcolor: 'grey.100' }}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Paper 
          elevation={6}
          sx={{ 
            width: { xs: 240, sm: 320, md: 400 }, 
            height: { xs: 320, sm: 400, md: 480 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            border: `8px solid ${currentItem.color}`,
            bgcolor: 'white',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.3s ease'
          }}
        >
          {/* Top Left Letter */}
          <Typography 
            variant="h2" 
            sx={{ position: 'absolute', top: 16, left: 24, fontWeight: 'bold', color: currentItem.color }}
          >
            {currentItem.letter}
          </Typography>
          
          {/* Bottom Right Letter (Lowercase) */}
          <Typography 
            variant="h3" 
            sx={{ position: 'absolute', bottom: 16, right: 24, fontWeight: 'bold', color: currentItem.color, opacity: 0.5 }}
          >
            {currentItem.letter.toLowerCase()}
          </Typography>

          <Typography sx={{ fontSize: { xs: '6rem', sm: '8rem', md: '10rem' }, lineHeight: 1, my: 2 }}>
            {currentItem.emoji}
          </Typography>

          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary', mt: 2 }}>
            {currentItem.word}
          </Typography>

          <IconButton 
            onClick={playSound} 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16, 
              bgcolor: 'rgba(0,0,0,0.05)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.1)' } 
            }}
          >
            <VolumeUpIcon fontSize="large" color="primary" />
          </IconButton>
        </Paper>

        <IconButton onClick={nextLetter} size="large" sx={{ bgcolor: 'grey.100' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Grid of all letters */}
      <Box sx={{ width: '100%', mt: 4 }}>
        <Typography variant="h6" align="center" mb={2}>All Letters</Typography>
        <Grid container spacing={1} justifyContent="center">
          {ALPHABET.map((item, idx) => (
            <Grid item key={idx}>
              <Button 
                variant={idx === currentIndex ? "contained" : "outlined"}
                onClick={() => setCurrentIndex(idx)}
                sx={{ 
                  minWidth: 48, 
                  height: 48, 
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  bgcolor: idx === currentIndex ? item.color : 'transparent',
                  borderColor: item.color,
                  color: idx === currentIndex ? 'white' : item.color,
                  '&:hover': {
                    bgcolor: item.color,
                    color: 'white',
                    opacity: 0.8
                  }
                }}
              >
                {item.letter}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

const AlphabetLearningTool = () => {
  const content = (
    <>
      <Typography variant="h2">ABC Alphabet Learning Tool</Typography>
      <Typography variant="body1">
        A fun and interactive way for kids to learn the English alphabet. Flip through digital flashcards featuring colorful emojis and hear the pronunciation of each letter and word out loud.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Alphabet Learning Tool - ABC Flashcards Online"
      description="Interactive ABC alphabet flashcards for kids. Learn letters with emojis and sound pronunciation."
      url="/utilities/alphabet-learning-tool"
      content={content}
      category="Utilities"
    >
      <AlphabetLearningToolContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AlphabetLearningTool;
