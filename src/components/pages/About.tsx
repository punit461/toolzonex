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
            ToolZoneX started as a handful of Indian finance calculators. It has since grown into something bigger: a single platform of 200+ tools spanning finance, health, developer utilities, text processing, file conversion, content generation, and AI cost estimation — the kind of toolkit you would otherwise assemble from a dozen different single-purpose sites, each with its own ads, sign-up wall, or half-finished feature set.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            The scope changed; the standard did not. Whether it is an Indian income tax calculator, a US state paycheck calculator, a JSON formatter, a QR code generator, or a PDF merger, every tool is built to be accurate, fast, and free — one destination instead of ten browser tabs, with no drop in quality when the category changes.
          </Typography>

          <Typography variant="h2" sx={{ mb: 3, mt: 5 }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Genuinely Broad:</strong> 200+ tools across finance, health, developer utilities, text tools, converters, generators, and AI cost calculators — not a single calculator with a blog bolted on.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Domain-Accurate:</strong> Indian tax regimes and health guidelines, real US state paycheck rules, UK/EU VAT, correct formula logic in every category — each tool is built for its actual use case, not adapted from a one-size-fits-all template.
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
            We are constantly working to bring more valuable tools to you. If you have any suggestions or feedback, please feel free to reach out to us.
          </Typography>
        </Paper>

        <Paper elevation={0} sx={{ p: 4, mt: 4, border: '1px solid #E5E5E5', borderRadius: 2, bgcolor: '#fcfcfc' }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Meet the Developer
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>Punit Bharadwaj</Typography>
              <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 600 }}>AI/ML Engineer — Computer Vision & AI Platform Engineering, Bengaluru, India</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Punit has 6+ years of experience building software, with recent years focused on AI: generative AI and agentic systems, computer vision, and the platform engineering that gets both into production. His work spans RAG pipelines and LLM-based chatbots, real-time computer vision — object detection, OCR, face recognition, video and CCTV analytics — and the cloud infrastructure (Azure Container Apps, Service Bus, Functions, APIM) that runs it all at scale.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                That range shows up in what he has shipped: dent-and-scratch detection for automotive manufacturing, government document OCR, a battery conveyor counter, a face-recognition attendance system, an enterprise computer vision platform — and, nights and weekends, ToolZoneX itself.
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Before AI, he spent years leading quality engineering — building test automation frameworks and running a test team — which is still why every ToolZoneX tool ships with validated logic, not just a clean interface. It is also part of why he won the Innovative Visionary Award at NSPLUS Technologies in 2024.
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
                <strong>Generative AI & LLMs:</strong> RAG, Agentic AI Systems, Prompt Engineering, LangChain, Ollama, AI Chatbots, Fine-tuning<br />
                <strong>Computer Vision:</strong> YOLOv8 / YOLOv11, OpenCV, DeepFace, OCR, Video & CCTV Analytics, SAM<br />
                <strong>Backend:</strong> FastAPI, Microservices, Celery, Redis, REST API Design, RBAC<br />
                <strong>Cloud (Azure) & DevOps:</strong> Container Apps, Functions, APIM, Front Door, Docker, CI/CD<br />
                <strong>Databases:</strong> PostgreSQL, pgvector, Qdrant, Vector Search<br />
                <strong>Foundations:</strong> Python, TypeScript, SQL, Testing & QA Leadership
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;
