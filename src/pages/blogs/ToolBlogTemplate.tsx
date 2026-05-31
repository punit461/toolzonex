'use client';

import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import RouterLink from 'next/link';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BlogShell from '../../components/BlogShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import type { ToolBlogMeta } from '../../data/tool-blogs';

interface Props {
  blog: ToolBlogMeta;
}

const ToolBlogTemplate = ({ blog }: Props) => {
  return (
    <BlogShell
      title={blog.title}
      description={blog.description}
      url={`/blog/tools/${blog.slug}`}
      date={blog.date}
      relatedTools={[{ label: blog.toolName, path: blog.toolRoute, description: `Use ${blog.toolName} now` }]}
    >
      {/* Intro */}
      <Typography variant="body1">{blog.intro}</Typography>

      {/* CTA Button */}
      <Box sx={{ my: 3, textAlign: 'center' }}>
        <Button
          component={RouterLink}
          href={blog.toolRoute}
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{ borderRadius: 3, px: 4, py: 1.5, textTransform: 'none', fontWeight: 600 }}
        >
          Use {blog.toolName} Now — Free
        </Button>
      </Box>

      {/* How to Use */}
      <Typography variant="h2">How to Use {blog.toolName}</Typography>
      <List>
        {blog.howToUse.map((step, i) => (
          <ListItem key={i} sx={{ py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>{i + 1}.</Typography>
            </ListItemIcon>
            <ListItemText primary={step} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ my: 3 }}><AdSenseUnit /></Box>

      {/* Key Features */}
      <Typography variant="h2">Key Features</Typography>
      <List>
        {blog.features.map((feature, i) => (
          <ListItem key={i} sx={{ py: 0.25 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleOutlineIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText primary={feature} />
          </ListItem>
        ))}
      </List>

      {/* Use Cases */}
      <Typography variant="h2">When to Use This Tool</Typography>
      <List>
        {blog.useCases.map((useCase, i) => (
          <ListItem key={i} sx={{ py: 0.25 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <Typography variant="body2">•</Typography>
            </ListItemIcon>
            <ListItemText primary={useCase} />
          </ListItem>
        ))}
      </List>

      <Box sx={{ my: 3 }}><AdSenseUnit /></Box>

      {/* FAQ */}
      <Typography variant="h2">Frequently Asked Questions</Typography>
      <Box sx={{ mt: 2 }}>
        {blog.faq.map((item, i) => (
          <Accordion key={i} variant="outlined" sx={{ '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Final CTA */}
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>Ready to get started?</Typography>
        <Button
          component={RouterLink}
          href={blog.toolRoute}
          variant="outlined"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{ borderRadius: 3, px: 4, textTransform: 'none' }}
        >
          Open {blog.toolName}
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </BlogShell>
  );
};

export default ToolBlogTemplate;
