'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const MultiplicationTableGeneratorContent = () => {
  const [baseNumber, setBaseNumber] = useState(7);
  const [upTo, setUpTo] = useState(12);

  const generateTable = () => {
    const table = [];
    const limit = Math.min(Math.max(upTo, 1), 100); // Max up to 100
    for (let i = 1; i <= limit; i++) {
      table.push({
        multiplier: i,
        result: baseNumber * i
      });
    }
    return table;
  };

  const tableData = generateTable();

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 4 }}>
      
      {/* Settings */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h5" fontWeight="700">Settings</Typography>
        
        <TextField
          label="Number (e.g. 7)"
          type="number"
          value={baseNumber}
          onChange={(e) => setBaseNumber(parseInt(e.target.value) || 0)}
          fullWidth
        />
        
        <TextField
          label="Generate Up To (e.g. 12)"
          type="number"
          value={upTo}
          onChange={(e) => setUpTo(parseInt(e.target.value) || 1)}
          fullWidth
          InputProps={{ inputProps: { min: 1, max: 100 } }}
        />

        <Button variant="contained" size="large" onClick={() => window.print()}>
          Print Table
        </Button>
      </Box>

      {/* Output */}
      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>
          Multiplication Table for {baseNumber}
        </Typography>
        
        <Paper sx={{ p: 3, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', maxHeight: 500, overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {tableData.map((row, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  p: 1.5, 
                  bgcolor: index % 2 === 0 ? 'white' : 'rgba(0,0,0,0.02)',
                  borderRadius: 1,
                  fontSize: '1.2rem',
                  fontFamily: 'monospace'
                }}
              >
                <Box>
                  <Typography component="span" fontWeight="bold" color="primary.main">{baseNumber}</Typography>
                  <Typography component="span" sx={{ mx: 2 }}>×</Typography>
                  <Typography component="span">{row.multiplier}</Typography>
                </Box>
                <Box>
                  <Typography component="span" sx={{ mr: 2 }}>=</Typography>
                  <Typography component="span" fontWeight="bold">{row.result}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

    </Box>
  );
};

const MultiplicationTableGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Why use a Multiplication Table Generator?</Typography>
      <Typography variant="body1">
        Whether you are a student memorizing times tables, a parent creating worksheets, or a teacher preparing classroom materials, this generator lets you instantly create and print customized multiplication tables up to 100x100.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Multiplication Table Generator"
      description="Instantly generate and print custom multiplication times tables for students and teachers."
      url="/tools/multiplication-table-generator"
      content={content}
      category="Tools"
    >
      <MultiplicationTableGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MultiplicationTableGenerator;
