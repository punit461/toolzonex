'use client';

import { Box, Container, Typography, Breadcrumbs, Link, Paper, Grid, Button } from '@mui/material';
import RouterLink from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface RelatedTool {
  label: string;
  path: string;
  description: string;
}

interface BlogShellProps {
  title: string;
  description: string;
  url: string;
  date: string;
  author?: string;
  children: React.ReactNode;
  relatedTools?: RelatedTool[];
}

const BlogShell = ({ title, description, url, date, author = "ToolZoneX Team", children, relatedTools }: BlogShellProps) => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      
      
      <Box sx={{ mb: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} color="inherit" href="/" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Home
          </Link>
          <Link component={RouterLink} color="inherit" href="/blog" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Blog
          </Link>
          <Typography color="text.primary" sx={{ display: 'inline-block', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </Typography>
        </Breadcrumbs>

        <Typography variant="h1" gutterBottom sx={{ fontWeight: 800, mb: 3 }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
          <Typography variant="subtitle2" color="text.secondary">
            By {author}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            •
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ 
        '& h2': { mt: 5, mb: 3, fontWeight: 700, fontSize: '1.75rem' },
        '& h3': { mt: 4, mb: 2, fontWeight: 600, fontSize: '1.5rem' },
        '& p': { mb: 2, fontSize: '1.125rem', lineHeight: 1.7, color: 'text.secondary' },
        '& ul': { mb: 3, pl: 3 },
        '& li': { mb: 1, fontSize: '1.125rem', color: 'text.secondary' },
        '& a': { color: 'primary.main', textDecoration: 'none', fontWeight: 500 },
        '& a:hover': { textDecoration: 'underline' }
      }}>
        {children}
      </Box>

      {relatedTools && relatedTools.length > 0 && (
        <Box sx={{ mt: 8, pt: 4, borderTop: '2px solid', borderTopColor: 'divider' }}>
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Related Tools
          </Typography>
          <Grid container spacing={2}>
            {relatedTools.map((tool) => (
              <Grid item xs={12} sm={6} key={tool.path}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    bgcolor: 'background.default',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {tool.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tool.description}
                    </Typography>
                  </Box>
                  <Button
                    component={RouterLink}
                    href={tool.path}
                    variant="text"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ mt: 2, alignSelf: 'flex-start', color: 'primary.main' }}
                  >
                    Try Tool
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default BlogShell;
