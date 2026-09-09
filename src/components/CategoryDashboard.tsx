'use client';

import { useState, type ReactNode } from 'react';
import { Box, Typography, Card, CardContent, TextField, InputAdornment, CardActionArea, Grid, Paper, Button } from '@mui/material';
import RouterLink from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { categories } from '@/data/toolCategories';
import { toolMatchesQuery } from '@/utils/search';
import Breadcrumbs from './Breadcrumbs';

interface DashboardSection {
  label: string;
  categoryLabel: string;
}

export interface FeaturedGuide {
  slug: string;
  title: string;
  description: string;
}

interface CategoryDashboardProps {
  pageTitle: string;
  intro: ReactNode;
  sections: DashboardSection[];
  featuredGuides?: FeaturedGuide[];
}

const CategoryDashboard = ({ pageTitle, intro, sections, featuredGuides }: CategoryDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const resolvedSections = sections.map((section) => {
    const category = categories.find((c) => c.label === section.categoryLabel);
    if (!category) {
      throw new Error(
        `CategoryDashboard: no category found with label "${section.categoryLabel}" (page: "${pageTitle}"). Check src/data/toolCategories.tsx for the exact label.`
      );
    }
    const filteredTools = category.tools.filter((tool) =>
      toolMatchesQuery(`${tool.title} ${tool.description}`, searchTerm)
    );
    return { label: section.label, tools: filteredTools };
  });

  const showSubHeadings = resolvedSections.length > 1;
  const totalMatches = resolvedSections.reduce((sum, s) => sum + s.tools.length, 0);

  return (
    <Box>
      <Breadcrumbs items={[{ label: pageTitle }]} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          {pageTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {intro}
        </Typography>

        <Box sx={{ maxWidth: 600 }}>
          <TextField
            fullWidth
            placeholder="Search for a tool..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {featuredGuides && featuredGuides.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.75rem' }, mb: 3 }}>
            Featured Guides
          </Typography>
          <Grid container spacing={2}>
            {featuredGuides.map((guide) => (
              <Grid item xs={12} sm={6} md={4} key={guide.slug}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease',
                    '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', transform: 'translateY(-2px)' },
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <ArticleIcon color="primary" fontSize="small" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1.05rem' }}>
                      {guide.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {guide.description}
                    </Typography>
                  </Box>
                  <Button
                    component={RouterLink}
                    href={`/blog/${guide.slug}`}
                    variant="text"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ mt: 2, alignSelf: 'flex-start', color: 'primary.main' }}
                  >
                    Read Guide
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {totalMatches === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No tools found for &apos;{searchTerm}&apos;
        </Typography>
      ) : (
        resolvedSections.map((section) =>
          section.tools.length === 0 ? null : (
            <Box key={section.label} sx={{ mb: 8 }}>
              {showSubHeadings && (
                <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.75rem' }, mb: 3 }}>
                  {section.label}
                </Typography>
              )}

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                {section.tools.map((tool) => (
                  <Card
                    key={tool.path}
                    sx={{
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                    }}
                  >
                    <CardActionArea component={RouterLink} href={tool.path} sx={{ height: '100%', p: 1 }}>
                      <CardContent>
                        <Box sx={{ mb: 1.5 }}>{tool.icon}</Box>
                        <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.05rem' }}>
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
          )
        )
      )}
    </Box>
  );
};

export default CategoryDashboard;
