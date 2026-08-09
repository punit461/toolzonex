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

        <Paper elevation={0} sx={{ p: 4, mt: 4, border: '1px solid #E5E5E5', borderRadius: 2, bgcolor: '#fcfcfc' }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Meet the Developer
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>Punit Bhardwaj</Typography>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600 }}>AI & Computer Vision Engineer</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Based in Bengaluru, Punit is passionate about crafting intelligent systems that bridge the gap between research and real-world impact. With expertise in LLMs, RAG systems, and Computer Vision, he builds tools that simplify complex tasks through automation.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <a href="https://github.com/punit461" target="_blank" rel="noopener noreferrer" style={{ color: '#171717', textDecoration: 'none', fontWeight: 600 }}>GitHub</a>
                <a href="https://www.linkedin.com/in/punit461bhardwaj/" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none', fontWeight: 600 }}>LinkedIn</a>
                <a href="https://twitter.com/punitbharadwaj" target="_blank" rel="noopener noreferrer" style={{ color: '#1DA1F2', textDecoration: 'none', fontWeight: 600 }}>X (Twitter)</a>
              </Box>
            </Box>
            <Box sx={{ flex: 1, p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px dashed #ccc' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase' }}>Tech Arsenal</Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                <strong>AI/ML:</strong> LangChain, Hugging Face, YOLO, LLaMA, RAG<br />
                <strong>Cloud:</strong> Azure, GCP, Docker, Kubernetes<br />
                <strong>Backend:</strong> FastAPI, Flask, Python, Java
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
