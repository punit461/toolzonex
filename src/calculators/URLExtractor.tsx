'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalculatorShell from '../components/CalculatorShell';

const URLExtractorContent = () => {
  const [text, setText] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const [error, setError] = useState('');

  const extractURLs = () => {
    setError('');
    
    if (!text.trim()) {
      setError('Please enter some text to extract URLs from');
      return;
    }

    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+|www\.[^\s<>"{}|\\^`\[\]]+/gi;
    const foundURLs = text.match(urlRegex) || [];
    
    const uniqueURLs = [...new Set(foundURLs)];
    setUrls(uniqueURLs);
  };

  const copyURL = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const copyAllURLs = async () => {
    try {
      await navigator.clipboard.writeText(urls.join('\n'));
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <TextField
          label="Enter Text"
          placeholder="Paste text containing URLs or links..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={extractURLs} fullWidth sx={{ mb: 2 }}>
          Extract URLs
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        {urls.length === 0 && text.trim() && !error && (
          <Alert severity="info">No URLs found in the text.</Alert>
        )}
      </Box>

      {urls.length > 0 && (
        <Box>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">
                Found {urls.length} URL{urls.length !== 1 ? 's' : ''}:
              </Typography>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<ContentCopyIcon />}
                onClick={copyAllURLs}
              >
                Copy All
              </Button>
            </Box>
            
            <List dense>
              {urls.map((url, index) => (
                <ListItem
                  key={index}
                  sx={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1, 
                    mb: 1,
                    bgcolor: 'background.paper'
                  }}
                  secondaryAction={
                    <Box>
                      <IconButton onClick={() => copyURL(url)} size="small">
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        component="a" 
                        href={url} 
                        target="_blank" 
                        rel="noopener"
                        size="small"
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LinkIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={url}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      sx: { wordBreak: 'break-all' }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const URLExtractor = () => {
  const content = (
    <>
      <Typography variant="h2">What is URL extraction?</Typography>
      <Typography variant="body1">
        URL extraction automatically finds and extracts all hyperlinks (URLs and web addresses) from text. 
        The tool identifies http, https, and www links.
      </Typography>

      <Typography variant="h2">How to extract URLs?</Typography>
      <Typography variant="body1">
        Paste text containing URLs into the input field and click "Extract URLs". The tool will find and 
        display all unique URLs. You can copy individual links or all at once.
      </Typography>

      <Typography variant="h2">Use cases for URL extraction</Typography>
      <Typography variant="body1">
        • Extract links from documents or web pages
        • Gather URLs from articles or research papers
        • Create link lists from text or email
        • Remove duplicates from mixed content
        • Audit website links
        • Manage link collections
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="URL Extractor"
      description="Extract all URLs and links from text. Find and copy all hyperlinks instantly."
      url="/tools/url-extractor"
      content={content}
      category="Tools"
    >
      <URLExtractorContent />
    </CalculatorShell>
  );
};

export default URLExtractor;