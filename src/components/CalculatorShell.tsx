'use client';

import { Box, Typography, Divider, Card, CardActionArea, CardContent } from '@mui/material';
import React, { createContext, useContext } from 'react';
import Link from 'next/link';
import ArticleIcon from '@mui/icons-material/Article';
import Breadcrumbs from './Breadcrumbs';
import type { ShellProps } from '../types/shellProps';

interface CalculatorShellProps {
  /**
   * @deprecated no longer used — CalculatorShell now reads its data from
   * ShellPropsContext (see ShellPropsProvider below), resolved server-side
   * per page via src/utils/resolveShellProps.tsx. Kept only so the ~1,300
   * existing `<CalculatorShell url="..." content={...}>` call sites across
   * every calculator component don't need to change.
   */
  url?: string;
  children: React.ReactNode;
  content: React.ReactNode;
}

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

/**
 * Carries one tool's already-resolved shell data (its registry entry, related
 * tools, and paired guide) from a Server Component page.tsx down to the
 * client-side CalculatorShell, without CalculatorShell itself importing the
 * full tool registry / category list / tool-blogs data (which would pull all
 * ~1,358 tools' data and icons into every single tool page's client bundle).
 */
export const ShellPropsContext = createContext<ShellProps | null>(null);

export function ShellPropsProvider({ value, children }: { value: ShellProps; children: React.ReactNode }) {
  return <ShellPropsContext.Provider value={value}>{children}</ShellPropsContext.Provider>;
}

const CalculatorShell = ({ children, content }: CalculatorShellProps) => {
  const shellProps = useContext(ShellPropsContext);
  if (!shellProps) {
    throw new Error('CalculatorShell must be rendered inside a ShellPropsProvider (see page.tsx).');
  }
  const { entry, relatedTools, blog } = shellProps;
  const { name: title, description, shellCategory: category, faqs } = entry;

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
