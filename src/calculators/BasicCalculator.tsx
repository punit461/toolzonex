'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const BasicCalculatorContent = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewInput, setIsNewInput] = useState(true);

  const handleNum = (num: string) => {
    if (isNewInput) {
      setDisplay(num);
      setIsNewInput(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    setEquation(equation + ' ' + display + ' ' + op);
    setIsNewInput(true);
  };

  const handleCalc = () => {
    try {
      const fullEq = equation + ' ' + display;
      // Using a safe alternative to eval for a basic calculator
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + fullEq)();
      setDisplay(String(result));
      setEquation('');
      setIsNewInput(true);
    } catch (e) {
      setDisplay('Error');
      setEquation('');
      setIsNewInput(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewInput(true);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ width: 320, p: 3, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'action.hover' }}>
        
        {/* Screen */}
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, border: '1px solid', textAlign: 'right', minHeight: 80 }}>
          <Typography variant="body2" color="text.secondary" sx={{ minHeight: 20 }}>
            {equation}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {display}
          </Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          <Button variant="contained" color="error" onClick={handleClear} sx={{ gridColumn: 'span 2' }}>Clear</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOp('/')}>÷</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOp('*')}>×</Button>

          <Button variant="outlined" onClick={() => handleNum('7')}>7</Button>
          <Button variant="outlined" onClick={() => handleNum('8')}>8</Button>
          <Button variant="outlined" onClick={() => handleNum('9')}>9</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOp('-')}>-</Button>

          <Button variant="outlined" onClick={() => handleNum('4')}>4</Button>
          <Button variant="outlined" onClick={() => handleNum('5')}>5</Button>
          <Button variant="outlined" onClick={() => handleNum('6')}>6</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOp('+')}>+</Button>

          <Button variant="outlined" onClick={() => handleNum('1')}>1</Button>
          <Button variant="outlined" onClick={() => handleNum('2')}>2</Button>
          <Button variant="outlined" onClick={() => handleNum('3')}>3</Button>
          <Button variant="contained" color="primary" onClick={handleCalc} sx={{ gridRow: 'span 2' }}>=</Button>

          <Button variant="outlined" onClick={() => handleNum('0')} sx={{ gridColumn: 'span 2' }}>0</Button>
          <Button variant="outlined" onClick={() => handleNum('.')}>.</Button>
        </Box>

      </Paper>
    </Box>
  );
};

const BasicCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Online Calculator</Typography>
      <Typography variant="body1">
        A simple, fast, and free online calculator for standard mathematical operations including addition, subtraction, multiplication, and division. Perfect for quick calculations without leaving your browser.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Basic Calculator"
      description="A simple, fast, and free online calculator for standard mathematical operations. Perfect for quick everyday math."
      url="/utilities/basic-calculator"
      content={content}
      category="Utilities"
    >
      <BasicCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BasicCalculator;
