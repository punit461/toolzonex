'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const WheelOfFortuneSpinnerContent = () => {
  const [items, setItems] = useState<string[]>(['Yes', 'No', 'Maybe', 'Try Again']);
  const [newItem, setNewItem] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4', '#e91e63', '#ffeb3b'];

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() && items.length < 24) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 2) {
      setItems(items.filter((_, i) => i !== index));
    } else {
      alert("You need at least 2 items to spin the wheel.");
    }
  };

  const spinWheel = () => {
    if (items.length < 2) return;
    
    setIsSpinning(true);
    setResult(null);

    // Calculate rotation
    const spinDegrees = Math.floor(Math.random() * 360) + 1800; // Spin at least 5 times (1800deg)
    const totalRotation = rotation + spinDegrees;
    
    setRotation(totalRotation);

    // Determine the result
    setTimeout(() => {
      setIsSpinning(false);
      const actualDeg = totalRotation % 360;
      const sliceSize = 360 / items.length;
      
      // The arrow points up (270 degrees in CSS circle terms if 0 is top). 
      // Adjusting for standard CSS rotate where 0 is top.
      // Wait, standard CSS transform: rotate(0) points the top of the wheel to the top.
      // Arrow is at the top. So we are looking at angle 360 - actualDeg.
      const winningAngle = (360 - actualDeg) % 360;
      const winningIndex = Math.floor(winningAngle / sliceSize);
      
      setResult(items[winningIndex]);
    }, 4000); // match CSS transition time
  };

  const sliceAngle = 360 / items.length;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Settings Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" fontWeight="700">Wheel Choices</Typography>
        
        <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '8px' }}>
          <TextField
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new choice..."
            fullWidth
            size="small"
            disabled={isSpinning || items.length >= 24}
          />
          <Button type="submit" variant="contained" disabled={!newItem.trim() || isSpinning || items.length >= 24}>
            Add
          </Button>
        </form>

        <Paper sx={{ maxHeight: 300, overflow: 'auto', p: 1, border: '1px solid', borderColor: 'divider' }}>
          {items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, borderBottom: '1px solid #eee' }}>
              <Typography>{item}</Typography>
              <IconButton 
                size="small" 
                color="error" 
                onClick={() => handleRemoveItem(index)}
                disabled={isSpinning || items.length <= 2}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Paper>
      </Box>

      {/* Wheel Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, pt: 2 }}>
        
        {/* The Wheel Container */}
        <Box sx={{ position: 'relative', width: 280, height: 280 }}>
          {/* The Arrow */}
          <Box sx={{ 
            position: 'absolute', 
            top: -15, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 10,
            width: 0, 
            height: 0, 
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: '25px solid #222'
          }} />

          {/* The SVG Wheel */}
          <Box sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            transition: 'transform 4s cubic-bezier(0.1, 0.7, 0.1, 1)',
            transform: `rotate(${rotation}deg)`,
            position: 'relative'
          }}>
            {items.map((item, index) => {
              const startAngle = index * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              const isLargeArc = sliceAngle > 180 ? 1 : 0;

              // Calculate SVG path
              const startX = 50 + 50 * Math.sin(Math.PI * startAngle / 180);
              const startY = 50 - 50 * Math.cos(Math.PI * startAngle / 180);
              const endX = 50 + 50 * Math.sin(Math.PI * endAngle / 180);
              const endY = 50 - 50 * Math.cos(Math.PI * endAngle / 180);

              const pathData = `M50,50 L${startX},${startY} A50,50 0 ${isLargeArc},1 ${endX},${endY} Z`;

              return (
                <svg key={index} viewBox="0 0 100 100" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                  <path d={pathData} fill={colors[index % colors.length]} />
                  <text 
                    x="50" 
                    y="15" 
                    fill="#fff" 
                    fontSize="5" 
                    fontWeight="bold" 
                    textAnchor="middle" 
                    transform={`rotate(${startAngle + sliceAngle / 2}, 50, 50)`}
                  >
                    {item.length > 15 ? item.substring(0, 12) + '...' : item}
                  </text>
                </svg>
              );
            })}
            
            {/* Center Pin */}
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 30, height: 30, borderRadius: '50%',
              bgcolor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              border: '4px solid #333'
            }} />
          </Box>
        </Box>

        <Button 
          variant="contained" 
          size="large" 
          onClick={spinWheel} 
          disabled={isSpinning || items.length < 2}
          sx={{ px: 6, py: 1.5, fontSize: '1.2rem', borderRadius: 8, mt: 2 }}
        >
          {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
        </Button>

        {/* Result Announcement */}
        <Box sx={{ minHeight: 60, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {result && !isSpinning && (
            <Typography variant="h4" color="success.main" fontWeight="800" sx={{ animation: 'pulse 1s' }}>
              🎉 {result}
            </Typography>
          )}
        </Box>
        
      </Box>
    </Box>
  );
};

const WheelOfFortuneSpinner = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Wheel of Fortune?</Typography>
      <Typography variant="body1">
        This customizable spinning wheel acts as a random decision maker. Add your choices (names, prizes, food options) into the list on the left, and click "Spin the Wheel" to randomly select a winner. It's completely free, runs locally in your browser, and supports up to 24 options.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Wheel of Fortune Spinner - Random Decision Maker"
      description="Create a custom spinning wheel to randomly pick names, prizes, or make decisions. Free online random wheel spinner."
      url="/tools/wheel-of-fortune-spinner"
      content={content}
      category="Tools"
    >
      <WheelOfFortuneSpinnerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WheelOfFortuneSpinner;
