'use client';

import { useState, useMemo } from 'react';
import {
  Box, Container, Typography, Card, CardContent, CardActionArea,
  Grid, TextField, Chip, InputAdornment, Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RouterLink from 'next/link';
import { allToolBlogs } from '../data/tool-blogs';

// ── Tag taxonomy ───────────────────────────────────────────────────
export type BlogTag =
  | 'Tax' | 'New Regime' | 'Old Regime' | 'Deductions' | 'HRA'
  | 'Investing' | 'Mutual Funds' | 'SIP' | 'PPF' | 'SSY'
  | 'Budgeting' | 'Credit Score' | 'GST' | 'Real Estate'
  | 'Retirement' | 'Salary' | 'Gratuity' | 'NPS' | 'Rebate'
  | 'Developer' | 'Text' | 'Math' | 'Health' | 'Design' | 'Converter' | 'Generator';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  path: string;
  tags: BlogTag[];
}

const blogPosts: BlogPost[] = [
  {
    title: 'New Tax Regime FY 2025-26: Every Change Explained',
    excerpt: 'Budget 2025 brought new slabs, a higher standard deduction, and a wider rebate. See exactly what changed and how it affects your take-home.',
    date: 'April 2026',
    path: '/blog/new-tax-regime-fy-2025-26',
    tags: ['Tax', 'New Regime', 'Salary'],
  },
  {
    title: 'Section 87A Rebate: Pay Zero Tax up to ₹12.75 Lakh',
    excerpt: 'Section 87A can make your entire income tax zero. Here is exactly how it works under both regimes for FY 2025-26, with step-by-step examples.',
    date: 'April 2026',
    path: '/blog/section-87a-rebate-guide',
    tags: ['Tax', 'New Regime', 'Old Regime', 'Rebate'],
  },
  {
    title: 'HRA Exemption: How to Calculate and Maximise It',
    excerpt: 'HRA is one of the biggest tax-saving tools for salaried employees under the Old Regime. Learn the three-limit formula with worked examples.',
    date: 'April 2026',
    path: '/blog/hra-exemption-calculation',
    tags: ['Tax', 'Old Regime', 'HRA', 'Salary', 'Deductions'],
  },
  {
    title: 'Section 80C: ₹1.5 Lakh Deduction — Complete Investment Guide',
    excerpt: 'PPF, ELSS, EPF, LIC — every qualifying 80C instrument explained. Find out which ones actually make financial sense beyond just saving tax.',
    date: 'April 2026',
    path: '/blog/section-80c-investment-guide',
    tags: ['Tax', 'Old Regime', 'Deductions', 'Investing', 'PPF', 'NPS'],
  },
  {
    title: 'Old vs. New Tax Regime: What Should You Choose?',
    excerpt: 'A comprehensive guide to understanding the difference between the Old and New tax regimes in India and how to pick the right one for you.',
    date: 'April 2026',
    path: '/blog/old-vs-new-tax-regime',
    tags: ['Tax', 'New Regime', 'Old Regime', 'Deductions'],
  },
  {
    title: 'How to Plan Your Early Retirement Using SIPs',
    excerpt: 'Discover how consistent investments in SIPs can help you achieve financial independence and retire early.',
    date: 'April 2026',
    path: '/blog/sip-early-retirement',
    tags: ['Investing', 'SIP', 'Mutual Funds', 'Retirement'],
  },
  {
    title: 'Understanding GST: How it Impacts Small Businesses',
    excerpt: 'Learn the basics of GST and how it affects the day-to-day operations of small businesses in India.',
    date: 'March 2026',
    path: '/blog/understanding-gst',
    tags: ['GST'],
  },
  {
    title: 'The 50/30/20 Rule: A Beginner\'s Guide to Budgeting',
    excerpt: 'Master your personal finances by applying the simple yet effective 50/30/20 budgeting rule to your monthly income.',
    date: 'March 2026',
    path: '/blog/50-30-20-budgeting-rule',
    tags: ['Budgeting'],
  },
  {
    title: 'How to Improve Your CIBIL Score Quickly',
    excerpt: 'A step-by-step guide on how to fix a bad credit score and maintain a CIBIL score above 750.',
    date: 'May 2026',
    path: '/blog/improve-cibil-score',
    tags: ['Credit Score'],
  },
  {
    title: 'Is Buying a Home Better Than Renting in 2026?',
    excerpt: 'A detailed analysis of the age-old debate: should you rent a house or buy one?',
    date: 'May 2026',
    path: '/blog/renting-vs-buying-home',
    tags: ['Real Estate', 'Budgeting'],
  },
  {
    title: 'The Complete Guide to PPF and Its Benefits',
    excerpt: 'Learn why the Public Provident Fund (PPF) remains one of the best tax-saving investments in India.',
    date: 'May 2026',
    path: '/blog/complete-guide-to-ppf',
    tags: ['Investing', 'PPF', 'Tax', 'Deductions', 'Retirement'],
  },
  {
    title: 'The Power of Compound Interest in Mutual Funds',
    excerpt: 'Understand the mechanics of compound interest and why starting early is the biggest advantage in wealth creation.',
    date: 'May 2026',
    path: '/blog/power-of-compound-interest',
    tags: ['Investing', 'Mutual Funds', 'SIP'],
  },
  {
    title: 'Securing Your Daughter\'s Future with SSY',
    excerpt: 'A detailed guide to the SSY scheme, its benefits, interest rates, and why every parent should consider it.',
    date: 'May 2026',
    path: '/blog/sukanya-samriddhi-yojana-benefits',
    tags: ['Investing', 'SSY', 'Tax', 'Deductions'],
  },
  {
    title: 'Understanding Gratuity: Eligibility and Rules',
    excerpt: 'Everything you need to know about Gratuity in India, from eligibility criteria to calculating your final payout.',
    date: 'May 2026',
    path: '/blog/understanding-gratuity-india',
    tags: ['Salary', 'Gratuity'],
  },
];

// Map tool blog category to tags
function toolCategoryToTag(category: string): BlogTag[] {
  switch (category) {
    case 'finance': return ['Investing'];
    case 'health': return ['Health'];
    case 'utilities': return ['Math'];
    default: return ['Developer'];
  }
}

// Generate blog list entries from tool blogs data
const toolBlogPosts: BlogPost[] = allToolBlogs.map(t => ({
  title: t.title,
  excerpt: t.excerpt,
  date: t.date,
  path: `/blog/tools/${t.slug}`,
  tags: toolCategoryToTag(t.category),
}));

// Combine both sources
const allPosts: BlogPost[] = [...blogPosts, ...toolBlogPosts];

// Derive all unique tags from data (preserves insertion order, deduped)
const ALL_TAGS: BlogTag[] = Array.from(
  new Set(allPosts.flatMap(p => p.tags))
) as BlogTag[];

const TAG_COLORS: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
  Tax: 'error', 'New Regime': 'primary', 'Old Regime': 'secondary',
  Deductions: 'warning', HRA: 'info', Investing: 'success',
  'Mutual Funds': 'success', SIP: 'success', PPF: 'success', SSY: 'success',
  Budgeting: 'default', 'Credit Score': 'default', GST: 'warning',
  'Real Estate': 'default', Retirement: 'success', Salary: 'info',
  Gratuity: 'info', NPS: 'success', Rebate: 'error',
  Developer: 'primary', Text: 'default', Math: 'secondary',
  Health: 'success', Design: 'warning', Converter: 'info', Generator: 'primary',
};

const BlogList = () => {
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState<Set<BlogTag>>(new Set());

  const toggleTag = (tag: BlogTag) => {
    setActiveTags(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allPosts.filter(post => {
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));
      const matchesTags =
        activeTags.size === 0 ||
        post.tags.some(t => activeTags.has(t));
      return matchesSearch && matchesTags;
    });
  }, [search, activeTags]);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>

      {/* Hero */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 800 }}>
          The ToolZoneX Blog
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Insights, tips, and guides on income tax, investing, budgeting, and health to help you make smarter decisions.
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search articles by title, topic, or tag…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      {/* Tag filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center', mr: 0.5, fontWeight: 600 }}>
          Filter:
        </Typography>
        {ALL_TAGS.map(tag => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            clickable
            color={activeTags.has(tag) ? (TAG_COLORS[tag] ?? 'primary') : 'default'}
            variant={activeTags.has(tag) ? 'filled' : 'outlined'}
            onClick={() => toggleTag(tag)}
            sx={{ fontWeight: activeTags.has(tag) ? 700 : 400 }}
          />
        ))}
        {activeTags.size > 0 && (
          <Chip
            label="Clear all"
            size="small"
            variant="outlined"
            onClick={() => setActiveTags(new Set())}
            sx={{ ml: 0.5, color: 'error.main', borderColor: 'error.light' }}
          />
        )}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {filtered.length === allPosts.length
          ? `${allPosts.length} articles`
          : `${filtered.length} of ${allPosts.length} articles`}
        {activeTags.size > 0 && ` · filtered by: ${Array.from(activeTags).join(', ')}`}
      </Typography>

      {/* Cards */}
      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5" color="text.secondary">No articles match your search.</Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            Try clearing your filters or searching for a different term.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filtered.map(post => (
            <Grid item xs={12} md={6} key={post.path}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%', borderRadius: 2,
                  transition: 'all 0.18s',
                  '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', transform: 'translateY(-2px)' },
                }}
              >
                <CardActionArea component={RouterLink} href={post.path} sx={{ height: '100%', p: 0.5 }}>
                  <CardContent>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600, textTransform: 'uppercase' }}>
                      {post.date}
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 1.5 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {post.excerpt}
                    </Typography>
                    {/* Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
                      {post.tags.map(tag => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          color={TAG_COLORS[tag] ?? 'default'}
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BlogList;
