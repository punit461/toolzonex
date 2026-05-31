'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

interface Player {
  id: string;
  name: string;
  score: number;
}

const GameScoreTrackerContent = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', score: 0 },
    { id: '2', name: 'Player 2', score: 0 }
  ]);
  
  const [newPlayerName, setNewPlayerName] = useState<string>('');

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, { id: Date.now().toString(), name: newPlayerName.trim(), score: 0 }]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const updateScore = (id: string, delta: number) => {
    setPlayers(players.map(p => {
      if (p.id === id) {
        return { ...p, score: p.score + delta };
      }
      return p;
    }));
  };

  const resetAllScores = () => {
    setPlayers(players.map(p => ({ ...p, score: 0 })));
  };

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const highestScore = sortedPlayers.length > 0 ? sortedPlayers[0].score : 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4 }}>
      
      {/* Tracker Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Add New Player"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            fullWidth
            size="small"
          />
          <Button variant="contained" onClick={addPlayer} sx={{ whiteSpace: 'nowrap' }}>
            Add
          </Button>
        </Box>

        <Paper variant="outlined" sx={{ bgcolor: 'grey.50' }}>
          <List disablePadding>
            {players.length === 0 && (
              <ListItem>
                <Typography color="text.secondary">No players added. Add a player above to start.</Typography>
              </ListItem>
            )}
            {players.map((player, index) => (
              <Box key={player.id}>
                <ListItem sx={{ py: 2, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between' }}>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
                    <IconButton edge="start" onClick={() => removePlayer(player.id)} color="error" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="h6" fontWeight={player.score === highestScore && highestScore > 0 ? 'bold' : 'normal'}>
                      {player.name}
                    </Typography>
                    {player.score === highestScore && highestScore > 0 && (
                      <Typography variant="caption" sx={{ bgcolor: 'warning.light', color: 'warning.contrastText', px: 1, py: 0.5, borderRadius: 1 }}>
                        Leader
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button variant="outlined" size="small" onClick={() => updateScore(player.id, -1)} sx={{ minWidth: 40, p: 1 }}>
                      <RemoveIcon />
                    </Button>
                    <Typography variant="h4" sx={{ width: 60, textAlign: 'center', fontFamily: 'monospace' }}>
                      {player.score}
                    </Typography>
                    <Button variant="contained" size="small" onClick={() => updateScore(player.id, 1)} sx={{ minWidth: 40, p: 1 }}>
                      <AddIcon />
                    </Button>
                  </Box>
                  
                </ListItem>
                {index < players.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>

        <Button 
          variant="outlined" 
          color="inherit" 
          startIcon={<RestartAltIcon />} 
          onClick={resetAllScores}
          disabled={players.length === 0}
        >
          Reset All Scores to 0
        </Button>

      </Box>

      {/* Leaderboard Panel */}
      <Box>
        <Paper 
          sx={{ 
            p: 3, 
            bgcolor: 'primary.main', 
            color: 'white',
            borderRadius: 4
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>Leaderboard</Typography>
          
          <List disablePadding>
            {sortedPlayers.length === 0 && (
              <Typography variant="body2" sx={{ opacity: 0.8 }}>No scores yet.</Typography>
            )}
            {sortedPlayers.map((player, index) => (
              <ListItem key={`lb-${player.id}`} sx={{ px: 0, py: 1, borderBottom: index < sortedPlayers.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
                <Typography sx={{ width: 30, fontWeight: 'bold', opacity: index === 0 ? 1 : 0.7 }}>
                  #{index + 1}
                </Typography>
                <ListItemText primary={player.name} />
                <Typography variant="h6" fontFamily="monospace">
                  {player.score}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

    </Box>
  );
};

const GameScoreTracker = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Game Score Tracker</Typography>
      <Typography variant="body1">
        Ditch the pen and paper! Track scores for board games, card games, sports, or party games online. Add as many players as you need, easily increment or decrement points, and keep an eye on the live leaderboard to see who's winning.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Game Score Tracker"
      description="Track scores for board games, sports, and party games online. Free multiplayer scoreboard with a live leaderboard."
      url="/utilities/game-score-tracker"
      content={content}
      category="Utilities"
    >
      <GameScoreTrackerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GameScoreTracker;
