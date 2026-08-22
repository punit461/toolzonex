'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import cronstrue from 'cronstrue';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CronJobParserContent = () => {
  const [cronExp, setCronExp] = useState<string>('0 22 * * 1-5');
  const [humanReadable, setHumanReadable] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      if (!cronExp.trim()) {
        setHumanReadable('');
        setError('');
        return;
      }
      const parsed = cronstrue.toString(cronExp, { use24HourTimeFormat: true });
      setHumanReadable(parsed);
      setError('');
    } catch (err: any) {
      setHumanReadable('');
      setError(err.toString());
    }
  }, [cronExp]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 800, mx: 'auto' }}>
      
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', gap: 4 }}>
        
        <Box>
          <Typography variant="h6" mb={2}>Enter Cron Expression</Typography>
          <TextField
            fullWidth
            value={cronExp}
            onChange={(e) => setCronExp(e.target.value)}
            placeholder="* * * * *"
            inputProps={{ style: { fontSize: '1.5rem', fontFamily: 'monospace', textAlign: 'center', letterSpacing: '4px' } }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 0.5, mt: 1, px: 2, color: 'text.secondary', typography: 'caption', fontFamily: 'monospace' }}>
            <Typography>Minute</Typography>
            <Typography>Hour</Typography>
            <Typography>Day(Month)</Typography>
            <Typography>Month</Typography>
            <Typography>Day(Week)</Typography>
          </Box>
        </Box>

        <Box sx={{ p: 3, bgcolor: error ? '#fef2f2' : 'primary.main', color: error ? 'error.main' : 'white', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
            {error ? error : humanReadable ? `"${humanReadable}"` : 'Enter a cron expression'}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">Common Examples:</Typography>
            <ul style={{ paddingLeft: 20, margin: '8px 0', fontSize: '0.9rem' }}>
              <li><code>* * * * *</code> (Every minute)</li>
              <li><code>0 * * * *</code> (Every hour)</li>
              <li><code>0 0 * * *</code> (Every day at midnight)</li>
              <li><code>0 0 * * 0</code> (Every Sunday)</li>
            </ul>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">Syntax:</Typography>
            <ul style={{ paddingLeft: 20, margin: '8px 0', fontSize: '0.9rem' }}>
              <li><code>*</code> any value</li>
              <li><code>,</code> value list separator</li>
              <li><code>-</code> range of values</li>
              <li><code>/</code> step values</li>
            </ul>
          </Box>
        </Box>

      </Paper>

    </Box>
  );
};

const CronJobParser = () => {
  const content = (
    <>
      <Typography variant="h2">Cron Expression Parser</Typography>
      <Typography variant="body1">
        Translate complex Cron expressions into plain English. Useful for verifying background jobs, scheduled tasks, and server maintenance scripts.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Paste a five-field cron expression into the input box and the tool instantly translates it into a
        plain-English schedule description.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The expression <code>0 0 * * 0</code> translates to &quot;At 00:00 on Sunday&quot; — a weekly job that
        runs at midnight.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying a cron schedule before deploying a scheduled job.</li>
          <li>Understanding an unfamiliar cron expression found in someone else&apos;s code.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What do the five fields in a cron expression mean?</Typography>
      <Typography variant="body1">
        In order: minute, hour, day of month, month, and day of week — each can be a specific value, a range,
        a list, or an asterisk (*) meaning &quot;every&quot;.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/developer-tools/cron-job-parser"
      content={content}
    >
      <CronJobParserContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CronJobParser;
