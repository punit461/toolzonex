import { Box, Typography, Divider } from '@mui/material';
import SEOHead from './SEOHead';
import React from 'react';

interface CalculatorShellProps {
  title: string;
  description: string;
  url: string;
  children: React.ReactNode;
  content: React.ReactNode;
}

const CalculatorShell = ({ title, description, url, children, content }: CalculatorShellProps) => {
  return (
    <Box>
      <SEOHead title={title} description={description} url={url} />
      
      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Box sx={{ mb: 8, p: { xs: 2, md: 4 }, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid #E5E5E5' }}>
        {children}
      </Box>

      <Divider sx={{ mb: 6 }} />

      <Box sx={{ typography: 'body1', '& h2': { mt: 4, mb: 2, fontWeight: 600, fontSize: '2rem' }, '& p': { mb: 2 } }}>
        {content}
      </Box>
    </Box>
  );
};

export default CalculatorShell;
