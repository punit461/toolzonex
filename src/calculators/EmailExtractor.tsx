'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Chip, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const EmailExtractorContent = () => {
  const [text, setText] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const extractEmails = () => {
    setError('');
    setHasSearched(true);
    
    if (!text.trim()) {
      setError('Please enter some text to extract emails from');
      return;
    }

    // Email regex pattern
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const foundEmails = text.match(emailRegex) || [];
    
    // Remove duplicates
    const uniqueEmails = [...new Set(foundEmails)];
    setEmails(uniqueEmails);
  };

  const copyAllEmails = async () => {
    try {
      await navigator.clipboard.writeText(emails.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <TextField
          label="Enter Text"
          placeholder="Paste text containing email addresses..."
          value={text}
          onChange={(e) => { setText(e.target.value); setHasSearched(false); }}
          multiline
          rows={6}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={extractEmails} fullWidth sx={{ mb: 2 }}>
          Extract Emails
        </Button>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {hasSearched && emails.length === 0 && !error && (
          <Alert severity="info">No email addresses found in the text.</Alert>
        )}
      </Box>

      {emails.length > 0 && (
        <Box>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">
                Found {emails.length} email{emails.length !== 1 ? 's' : ''}:
              </Typography>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<ContentCopyIcon />}
                onClick={copyAllEmails}
              >
                {copied ? 'Copied!' : 'Copy All'}
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {emails.map((email, index) => (
                <Chip 
                  key={index} 
                  label={email} 
                  icon={<EmailIcon />}
                  onClick={() => navigator.clipboard.writeText(email)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const EmailExtractor = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Email Extractor?</Typography>
      <Typography variant="body1">
        Simply paste any text containing email addresses into the input field and click "Extract Emails". 
        The tool will find and display all unique email addresses. Click on any email to copy it individually, 
        or use the "Copy All" button to copy all emails at once.
      </Typography>

      <Typography variant="h2">Why extract emails from text?</Typography>
      <Typography variant="body1">
        Email extraction is useful for gathering contact information from documents, websites, mailing lists, 
        and other text sources. This free tool removes duplicates automatically and provides a convenient way 
        to collect and copy all email addresses in one place.
      </Typography>

      <Typography variant="h2">Features</Typography>
      <Typography variant="body1">
        • Extracts all email addresses from text
        • Removes duplicate emails automatically
        • Copy individual emails with one click
        • Copy all emails at once
        • Fast and accurate results
        • Works directly in your browser (no uploads)
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Email Extractor"
      description="Extract all email addresses from any text. Free online tool to find and copy email addresses quickly."
      url="/tools/email-extractor"
      content={content}
      category="Tools"
    >
      <EmailExtractorContent />

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EmailExtractor;