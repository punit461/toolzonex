'use client';

import { Box, Typography, Divider, Card, CardActionArea, CardContent } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import ArticleIcon from '@mui/icons-material/Article';
import Breadcrumbs from './Breadcrumbs';
import { categories } from '../data/toolCategories';
import { getToolBlogByRoute } from '../data/tool-blogs';

interface CalculatorShellProps {
  title: string;
  description: string;
  url: string;
  children: React.ReactNode;
  content: React.ReactNode;
  category?: 'Finance' | 'Health' | 'Utilities' | 'Tools' | 'Converters' | 'Developer Tools' | 'Generators' | 'Text Tools' | 'AI';
}

const RELATED_COUNT = 6;

/**
 * Picks a deterministic window of "next N" tools after the current one in
 * its category (wrapping around), rather than always the same first N --
 * this spreads internal links across every tool in the category instead of
 * funneling them all to a fixed handful. Deterministic (no randomness) so
 * it can't cause a hydration mismatch on this client component.
 */
function getRelatedTools(category: string, currentUrl: string) {
  const cat = categories.find((c) => c.label === category);
  if (!cat || cat.tools.length <= 1) return [];

  const currentIndex = cat.tools.findIndex((t) => t.path === currentUrl);
  const startIndex = currentIndex === -1 ? 0 : currentIndex + 1;
  const count = Math.min(RELATED_COUNT, cat.tools.length - 1);

  const related = [];
  for (let i = 0; i < count; i++) {
    const tool = cat.tools[(startIndex + i) % cat.tools.length];
    if (tool.path !== currentUrl) related.push(tool);
  }
  return related;
}

const CalculatorShell = ({ title, description, url, children, content, category = 'Finance' }: CalculatorShellProps) => {
  const relatedTools = getRelatedTools(category, url);
  const blog = getToolBlogByRoute(url);

  return (
    <Box>
      <Breadcrumbs
        items={[
          { label: category, href: '/' },
          { label: title }
        ]}
      />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>

      <Box sx={{ mb: 8, p: { xs: 2, md: 4 }, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        {children}
      </Box>

      <Divider sx={{ mb: 6 }} />

      <Box sx={{ typography: 'body1', '& h2': { mt: 4, mb: 2, fontWeight: 600, fontSize: '2rem' }, '& h3': { mt: 3, mb: 1.5, fontWeight: 600, fontSize: '1.5rem' }, '& p': { mb: 2 } }}>
        {content}
      </Box>

      {blog && (
        <Card variant="outlined" sx={{ mt: 6 }}>
          <CardActionArea component={Link} href={`/blog/tools/${blog.slug}`}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ArticleIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  Read the full {title} guide
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.excerpt}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

      {relatedTools.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 6 }} />
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 600, fontSize: '1.5rem' }}>
            More in {category}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
            {relatedTools.map((tool) => (
              <Card key={tool.path} variant="outlined">
                <CardActionArea component={Link} href={tool.path} sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tool.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CalculatorShell;
