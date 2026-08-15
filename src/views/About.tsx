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
            ToolZoneX started with a simple frustration: searching for an Indian income tax calculator or a PPF maturity calculator kept surfacing tools built for US or EU audiences, buried in ads, or locked behind a paywall. So the goal became to build the tool that should have existed already — accurate, fast, and free, with real support for Indian tax regimes, salary structures, and health standards instead of a generic template.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            What began as a handful of finance calculators has grown into a platform of 200+ tools spanning finance, health, productivity, and developer utilities — and the audience has grown with it. Alongside the India-first calculators, ToolZoneX now covers US paycheck calculators by state, a UK/EU VAT calculator, and AI cost-estimation tools for a global audience, all built on the same principle: get the numbers right, and get out of the way.
          </Typography>

          <Typography variant="h2" sx={{ mb: 3, mt: 5 }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Locale-Accurate:</strong> Indian taxation rules and health guidelines, real US state paycheck rules, UK/EU VAT — each calculator is built for its actual audience, not adapted from a one-size-fits-all template.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Privacy First:</strong> All calculations happen right inside your browser. We do not store your personal financial data or health metrics on our servers.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>100% Free:</strong> Every tool is free to use, with no hidden charges or mandatory sign-ups.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Built to Load Fast:</strong> Every page is statically pre-rendered, so there is no server round-trip standing between you and your answer.
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
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>Punit Bharadwaj</Typography>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600 }}>AI/ML Engineer, Bengaluru, India</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Punit has 4+ years building intelligent systems across generative AI, computer vision, and automation. His day job covers RAG pipelines, agentic AI, and computer vision models for manufacturing and retail; ToolZoneX is what he builds on the side, applying the same engineering standard to something anyone can use.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                He came into software from mechanical engineering, by way of four years in quality engineering — building test automation frameworks, leading a test team, and learning firsthand what breaks in production. That instinct is why every ToolZoneX calculator ships with validated formulas, not just a clean interface. It is also part of why he won the Innovative Visionary Award at NSPLUS Technologies in 2024.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Want the fuller picture — the AI/ML work, computer vision projects, and everything else he has built? Visit his{' '}
                <a href="https://punit461.github.io/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>portfolio</a>.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <a href="https://github.com/punit461" target="_blank" rel="noopener noreferrer" style={{ color: '#171717', textDecoration: 'none', fontWeight: 600 }}>GitHub</a>
                <a href="https://www.linkedin.com/in/punit461bhardwaj/" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none', fontWeight: 600 }}>LinkedIn</a>
                <a href="mailto:punit461bhardwaj@gmail.com" style={{ color: '#171717', textDecoration: 'none', fontWeight: 600 }}>Email</a>
              </Box>
            </Box>
            <Box sx={{ flex: 1, p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px dashed #ccc' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, textTransform: 'uppercase' }}>Tech Arsenal</Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                <strong>AI/ML:</strong> LangChain, Hugging Face, RAG, Agentic AI, MCP, YOLO, PyTorch<br />
                <strong>Cloud & Backend:</strong> Azure, GCP, Docker, FastAPI, Flask<br />
                <strong>Quality Foundations:</strong> Selenium, JMeter, CI/CD (4+ years)
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
