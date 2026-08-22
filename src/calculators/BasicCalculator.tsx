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
        A simple, normal online calculator for standard mathematical operations including addition, subtraction,
        multiplication, and division. This basic operations calculator is perfect for quick everyday math without
        leaving your browser or reaching for a physical calculator.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Click the number and operator buttons to build an expression, then press equals to see the result
        instantly. Use &quot;Clear&quot; to reset and start a new calculation.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Enter 24.99 × 3, then press equals to instantly get 74.97 — no need to switch apps or grab a physical calculator.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quick everyday arithmetic without opening a separate calculator app.</li>
          <li>Checking totals, splits, or simple math while browsing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this calculator have a percentage sign?</Typography>
      <Typography variant="body1">
        This basic calculator keeps to the four standard operations (+, −, ×, ÷) and doesn&apos;t have a dedicated
        percentage button. For percentage calculations — discounts, tax, percentage change, and more — use the{' '}
        <a href="/utilities/percentage-calculator">Percentage Calculator</a> instead.
      </Typography>
      <Typography variant="h3">Is this a simple calculator or does it support advanced functions?</Typography>
      <Typography variant="body1">
        This is a simple, normal calculator for the four basic operations — it doesn&apos;t include scientific
        functions like square roots, exponents, or trigonometry. It&apos;s built for quick, everyday arithmetic
        rather than advanced calculations.
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
