'use client';

import { Box, Typography, Divider, Card, CardActionArea, CardContent, Link as MuiLink } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';
import { categories } from '../data/toolCategories';
import { getTool, getToolOrNull } from '../data/toolRegistry';

interface CalculatorShellProps {
  url: string;
  children: React.ReactNode;
  content: React.ReactNode;
}

const RELATED_COUNT = 6;

/**
 * Finance and health results feed real decisions (tax filing, loans,
 * pregnancy dates), so those pages say plainly, next to the result, that it's
 * an estimate. The full wording is in the Terms (section "Results are
 * estimates, not professional advice").
 */
const ADVICE_NOTICE: Record<string, string> = {
  Finance:
    'Estimate for information only, not financial, tax or investment advice. Rates and rules change, so check anything important with a qualified professional or the official source.',
  Health:
    'For general information only, not medical advice. Talk to a doctor before making health decisions based on this result.',
};

const CATEGORY_DASHBOARD_ROUTES: Record<string, string> = {
  Finance: '/finance',
  Health: '/health',
  Utilities: '/utilities',
  Converters: '/converters',
  'Text Tools': '/text-tools',
  Generators: '/generators',
  'Developer Tools': '/developer-tools',
  Tools: '/tools',
  'PDF Tools': '/tools/pdf-tools',
};

const isIndexed = (path: string) => !getToolOrNull(path)?.noindex;

/**
 * Picks a deterministic window of "next N" tools after the current one in
 * its nav category (wrapping around), rather than always the same first N --
 * this spreads internal links across the category instead of funneling them
 * all to a fixed handful. Deterministic (no randomness) so it can't cause a
 * hydration mismatch on this client component.
 *
 * Uses navCategory (13 groups) rather than shellCategory (9): a screen prank
 * sits in the "Utilities" shell next to 340 unrelated calculators, so its
 * related links used to be Age/Percentage/Date calculators instead of the
 * other screens. Indexed tools are listed first so internal links concentrate
 * on the pages that can actually rank.
 */
function getRelatedTools(category: string, currentUrl: string) {
  const cat = categories.find((c) => c.label === category);
  if (!cat || cat.tools.length <= 1) return [];

  const currentIndex = cat.tools.findIndex((t) => t.path === currentUrl);
  const startIndex = currentIndex === -1 ? 0 : currentIndex + 1;

  const ordered = [];
  for (let i = 0; i < cat.tools.length; i++) {
    const tool = cat.tools[(startIndex + i) % cat.tools.length];
    if (tool.path !== currentUrl) ordered.push(tool);
  }
  return [
    ...ordered.filter((t) => isIndexed(t.path)),
    ...ordered.filter((t) => !isIndexed(t.path)),
  ].slice(0, RELATED_COUNT);
}

const CalculatorShell = ({ url, children, content }: CalculatorShellProps) => {
  const entry = getTool(url);
  const { name: title, description, shellCategory: category, navCategory, faqs } = entry;
  const relatedTools = getRelatedTools(navCategory, url);

  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null;

  return (
    <Box>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Breadcrumbs
        items={[
          { label: category, href: CATEGORY_DASHBOARD_ROUTES[category] ?? '/' },
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

      <Box sx={{ mb: ADVICE_NOTICE[category] ? 2 : 8, p: { xs: 2, md: 4 }, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        {children}
      </Box>
      {ADVICE_NOTICE[category] && (
        <Typography role="note" variant="body2" color="text.secondary" sx={{ mb: 8 }}>
          {ADVICE_NOTICE[category]}{' '}
          <MuiLink component={Link} href="/terms-of-service#not-advice">Terms</MuiLink>
        </Typography>
      )}

      <Divider sx={{ mb: 6 }} />

      <Box sx={{ typography: 'body1', '& h2': { mt: 4, mb: 2, fontWeight: 600, fontSize: '2rem' }, '& h3': { mt: 3, mb: 1.5, fontWeight: 600, fontSize: '1.5rem' }, '& p': { mb: 2 } }}>
        {content}
      </Box>

      {relatedTools.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ mb: 6 }} />
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 600, fontSize: '1.5rem' }}>
            More in {navCategory}
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
