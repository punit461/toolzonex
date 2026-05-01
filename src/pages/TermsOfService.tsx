'use client';

import { Box, Typography, Container, Paper } from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" gutterBottom sx={{ mb: 4 }}>
          Terms of Service
        </Typography>
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E5E5', borderRadius: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Welcome to ToolZoneX!
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            These terms and conditions outline the rules and regulations for the use of ToolZoneX's Website, located at https://toolzonex.com.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use ToolZoneX if you do not agree to take all of the terms and conditions stated on this page.
          </Typography>

          <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
            Disclaimer
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            The calculators and tools provided on this website are for informational and educational purposes only. They do not constitute professional financial or medical advice. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
          </Typography>

          <Typography variant="h3" sx={{ mt: 4, mb: 2 }}>
            License
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Unless otherwise stated, ToolZoneX and/or its licensors own the intellectual property rights for all material on ToolZoneX. All intellectual property rights are reserved. You may access this from ToolZoneX for your own personal use subjected to restrictions set in these terms and conditions.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default TermsOfService;
