'use client';

import { useState } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { format } from 'sql-formatter';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const SqlFormatterContent = () => {
  const [sqlInput, setSqlInput] = useState<string>('SELECT * FROM users WHERE age>18 AND status="active" GROUP BY department ORDER BY created_at DESC');
  const [sqlOutput, setSqlOutput] = useState<string>('');
  const [dialect, setDialect] = useState<string>('sql');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      setError('');
      const formatted = format(sqlInput, {
        language: dialect as any,
        tabWidth: 2,
        keywordCase: 'upper',
        linesBetweenQueries: 2,
      });
      setSqlOutput(formatted);
    } catch (err: any) {
      setError(err.message || 'Error formatting SQL');
      setSqlOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>SQL Dialect</InputLabel>
          <Select
            value={dialect}
            label="SQL Dialect"
            onChange={(e) => setDialect(e.target.value)}
          >
            <MenuItem value="sql">Standard SQL</MenuItem>
            <MenuItem value="mysql">MySQL</MenuItem>
            <MenuItem value="postgresql">PostgreSQL</MenuItem>
            <MenuItem value="sqlite">SQLite</MenuItem>
            <MenuItem value="tsql">SQL Server (T-SQL)</MenuItem>
          </Select>
        </FormControl>

        <Button 
          variant="contained" 
          size="large" 
          startIcon={<AutoFixHighIcon />} 
          onClick={handleFormat}
        >
          Format SQL
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">Input SQL</Typography>
          <TextField
            multiline
            rows={15}
            value={sqlInput}
            onChange={(e) => setSqlInput(e.target.value)}
            fullWidth
            placeholder="Paste your unformatted SQL query here..."
            InputProps={{ sx: { fontFamily: 'monospace', fontSize: '0.9rem' } }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2" fontWeight="bold">Formatted SQL</Typography>
            <Button 
              size="small" 
              startIcon={<ContentCopyIcon />} 
              onClick={handleCopy}
              disabled={!sqlOutput}
              color={copied ? "success" : "primary"}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </Box>
          <TextField
            multiline
            rows={15}
            value={error ? error : sqlOutput}
            fullWidth
            InputProps={{ 
              readOnly: true, 
              sx: { 
                fontFamily: 'monospace', 
                fontSize: '0.9rem',
                bgcolor: error ? '#fef2f2' : '#f8fafc',
                color: error ? 'error.main' : 'text.primary'
              } 
            }}
          />
        </Box>

      </Box>

    </Box>
  );
};

const SqlFormatter = () => {
  const content = (
    <>
      <Typography variant="h2">SQL Formatter</Typography>
      <Typography variant="body1">
        Beautify and format minified or messy SQL queries. Supports standard SQL, MySQL, PostgreSQL, SQLite, and SQL Server dialects.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="SQL Formatter - Beautify SQL Online"
      description="Format and beautify minified SQL queries online. Supports MySQL, PostgreSQL, SQL Server and SQLite."
      url="/tools/sql-formatter"
      content={content}
      category="Tools"
    >
      <SqlFormatterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SqlFormatter;
