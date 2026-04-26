import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SEOHead from './SEOHead';

interface BlogShellProps {
  title: string;
  description: string;
  url: string;
  date: string;
  author?: string;
  children: React.ReactNode;
}

const BlogShell = ({ title, description, url, date, author = "ToolZoneX Team", children }: BlogShellProps) => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <SEOHead title={title} description={description} url={url} />
      
      <Box sx={{ mb: 6 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link component={RouterLink} color="inherit" to="/" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Home
          </Link>
          <Link component={RouterLink} color="inherit" to="/blog" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
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
    </Container>
  );
};

export default BlogShell;
