'use client';

import { Box, Typography, Container, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" gutterBottom sx={{ mb: 4 }}>
          About ToolZoneX
        </Typography>
        <Paper elevation={0} sx={{ p: 4, border: '1px solid #E5E5E5', borderRadius: 2 }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Welcome to ToolZoneX, your trusted destination for simplifying complex financial and health calculations. Our mission is to empower Indians with accurate, fast, and easy-to-use digital tools that help them make informed decisions about their money and well-being.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Whether you are planning to take a home loan, looking to invest in a Systematic Investment Plan (SIP), calculating your Goods and Services Tax (GST), or simply trying to understand your Body Mass Index (BMI), we have designed our tools specifically tailored to the Indian context.
          </Typography>
          
          <Typography variant="h2" sx={{ mb: 3, mt: 5 }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>India-Centric Data:</strong> Our calculators use standard Indian metrics, taxation rules, and health guidelines to provide relevant results.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Privacy First:</strong> All our calculations happen right inside your browser. We do not store your personal financial data or health metrics on our servers.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>100% Free:</strong> Our tools are completely free to use without any hidden charges or mandatory subscriptions.
          </Typography>

          <Typography variant="body1" sx={{ mt: 4 }}>
            We are constantly working to bring more valuable calculators to you. If you have any suggestions or feedback, please feel free to reach out to us.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
