'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const ScientificCalculatorContent = () => {
  const [display, setDisplay] = useState('0');
  const [isNewInput, setIsNewInput] = useState(true);

  const handleNum = (num: string) => {
    if (isNewInput) {
      setDisplay(num);
      setIsNewInput(false);
    } else {
      setDisplay(display === '0' && num !== '.' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    setDisplay(display + op);
    setIsNewInput(false);
  };

  const handleMath = (func: string) => {
    try {
      const val = eval(display);
      let result = 0;
      switch (func) {
        case 'sin': result = Math.sin(val); break;
        case 'cos': result = Math.cos(val); break;
        case 'tan': result = Math.tan(val); break;
        case 'log': result = Math.log10(val); break;
        case 'ln': result = Math.log(val); break;
        case 'sqrt': result = Math.sqrt(val); break;
        case 'sq': result = Math.pow(val, 2); break;
      }
      setDisplay(String(result));
      setIsNewInput(true);
    } catch (e) {
      setDisplay('Error');
      setIsNewInput(true);
    }
  };

  const handleCalc = () => {
    try {
      // Very basic eval approach for the sake of the static tool. 
      // Replace symbols for eval
      let eq = display.replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + eq)();
      setDisplay(String(result));
      setIsNewInput(true);
    } catch (e) {
      setDisplay('Error');
      setIsNewInput(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setIsNewInput(true);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ width: '100%', maxWidth: 450, p: 3, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#1e293b' }}>
        
        {/* Screen */}
        <Box sx={{ bgcolor: '#0f172a', color: '#10b981', p: 2, borderRadius: 1, textAlign: 'right', minHeight: 80, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', wordBreak: 'break-all' }}>
          <Typography variant="h4" fontFamily="monospace">
            {display}
          </Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1 }}>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleMath('sin')}>sin</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleMath('cos')}>cos</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleMath('tan')}>tan</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleNum('(')}>(</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleNum(')')}>)</Button>

          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleMath('log')}>log</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleMath('ln')}>ln</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleMath('sqrt')}>√x</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleMath('sq')}>x²</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOp('/')}>÷</Button>

          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('7')}>7</Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('8')}>8</Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('9')}>9</Button>
          <Button variant="contained" color="error" onClick={handleClear}>C</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOp('*')}>×</Button>

          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('4')}>4</Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('5')}>5</Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('6')}>6</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleNum('Math.PI')}>π</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOp('-')}>-</Button>

          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('1')}>1</Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('2')}>2</Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('3')}>3</Button>
          <Button variant="contained" sx={{ bgcolor: '#475569' }} onClick={() => handleNum('Math.E')}>e</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOp('+')}>+</Button>

          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569', gridColumn: 'span 2' }} onClick={() => handleNum('0')}>0</Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: '#475569' }} onClick={() => handleNum('.')}>.</Button>
          <Button variant="contained" color="primary" sx={{ gridColumn: 'span 2' }} onClick={handleCalc}>=</Button>
        </Box>

      </Paper>
    </Box>
  );
};

const ScientificCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Scientific Calculator</Typography>
      <Typography variant="body1">
        Perform advanced mathematical operations right in your browser. This scientific calculator supports trigonometry functions (sin, cos, tan), logarithms (log, ln), exponents, roots, and constants like pi and Euler's number (e).
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Scientific Calculator"
      description="Advanced free online scientific calculator. Calculate trigonometry, logarithms, exponents, and more instantly."
      url="/utilities/scientific-calculator"
      content={content}
      category="Utilities"
    >
      <ScientificCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ScientificCalculator;
