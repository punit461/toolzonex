'use client';

import { Box, Typography, Container, Paper, Link } from '@mui/material';
import { CONTACT_EMAIL } from '../../data/siteInfo';

// Screen-reader-only text (e.g. "opens in a new tab" on external links).
const srOnly = { border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: '-1px', overflow: 'hidden', padding: 0, position: 'absolute', whiteSpace: 'nowrap', width: '1px' } as const;
const VisuallyHidden = ({ children }: { children: React.ReactNode }) => <Box component="span" sx={srOnly}>{children}</Box>;

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" gutterBottom sx={{ mb: 4 }}>
          About ToolZoneX
        </Typography>
        <Paper variant="outlined" sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ToolZoneX started as a handful of Indian finance calculators. It has since grown into something bigger: a single platform of more than 1,000 tools spanning finance, health, developer utilities, text processing, file conversion, content generation, and AI cost estimation — the kind of toolkit you would otherwise assemble from a dozen different single-purpose sites, each with its own ads, sign-up wall, or half-finished feature set.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            The scope changed; the standard did not. Whether it is an Indian income tax calculator, a US state paycheck calculator, a JSON formatter, a QR code generator, or a PDF merger, every tool is meant to be quick to use and free — one destination instead of ten browser tabs. When someone reports a wrong result, it gets fixed.
          </Typography>

          <Typography variant="h2" sx={{ mb: 3, mt: 5 }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Genuinely Broad:</strong> more than 1,000 tools across finance, health, developer utilities, text tools, converters, generators, and AI cost calculators — not a single calculator with a blog bolted on.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Built for the Real Rules:</strong> Indian tax regimes and health guidelines, US state paycheck rules, UK/EU VAT — each tool uses the published formula or rates for its case rather than a one-size-fits-all template. Rules and rates change, so check anything important against the official source.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Privacy First:</strong> Calculations happen in your browser, so the numbers you enter — salary, loans, health metrics — aren&apos;t sent to us. The few tools that need live data (exchange rates, IP lookup, PDF translation) say so on the page.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>100% Free:</strong> Every tool is free to use, with no hidden charges or mandatory sign-ups.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            - <strong>Built to Load Fast:</strong> Pages are pre-built and calculations run on your device, so results update as you type.
          </Typography>

          <Typography variant="body1" sx={{ mt: 4 }}>
            ToolZoneX is run by Punit Bharadwaj, an individual developer based in Bengaluru, India. It has no paid products and never asks for payment details. Suggestions, corrections and bug reports are welcome at{' '}
            <Link href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</Link>.
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 4, mt: 4, borderRadius: 2, bgcolor: 'action.hover' }}>
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
                Before AI, he spent years leading quality engineering — building test automation frameworks and running a test team — and that habit of checking the logic, not just the interface, carries over to how ToolZoneX is built. He received the Innovative Visionary Award at NSPLUS Technologies in 2024.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Want the fuller picture — the AI/ML work, computer vision projects, and everything else he has built? Visit his{' '}
                <Link href="https://punit461.github.io/" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 600 }}>portfolio<VisuallyHidden> (opens in a new tab)</VisuallyHidden></Link>.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Link href="https://github.com/punit461" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 600 }}>GitHub<VisuallyHidden> (opens in a new tab)</VisuallyHidden></Link>
                <Link href="https://www.linkedin.com/in/punit461bhardwaj/" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 600 }}>LinkedIn<VisuallyHidden> (opens in a new tab)</VisuallyHidden></Link>
                <Link href={`mailto:${CONTACT_EMAIL}`} sx={{ fontWeight: 600 }}>Email</Link>
              </Box>
            </Box>
            <Box sx={{ flex: 1, p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
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
