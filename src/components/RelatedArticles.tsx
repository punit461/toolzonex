'use client';

import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import Link from 'next/link';
import ArticleIcon from '@mui/icons-material/Article';
import { allToolBlogs, type ToolBlogMeta } from '../data/tool-blogs';

const RELATED_COUNT = 3;

interface RelatedArticlesProps {
  currentSlug: string;
  category: string;
}

export default function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  const related = allToolBlogs
    .filter((b) => b.category === category && b.slug !== currentSlug)
    .slice(0, RELATED_COUNT);

  if (related.length === 0) return null;

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h2" sx={{ mb: 3, fontWeight: 600, fontSize: '1.5rem' }}>
        Related Articles
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
        {related.map((blog) => (
          <Card key={blog.slug} variant="outlined">
            <CardActionArea component={Link} href={`/blog/tools/${blog.slug}`} sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <ArticleIcon color="primary" fontSize="small" />
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                    {blog.category}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.excerpt}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
