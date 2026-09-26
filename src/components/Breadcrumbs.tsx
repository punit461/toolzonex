'use client';

import { Box, Typography, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href ? { "item": `${SITE_URL}${item.href}` } : {})
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Box component="nav" aria-label="Breadcrumb" sx={{ mb: 3 }}>
        <Box
          component="ol"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap', listStyle: 'none', m: 0, p: 0 }}
        >
          <Box component="li" sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Icon-only link: the aria-label is its whole accessible name. */}
            <MuiLink
              component={Link}
              href="/"
              aria-label="Home"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' }
              }}
            >
              <HomeIcon sx={{ fontSize: 18 }} aria-hidden="true" />
            </MuiLink>
          </Box>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <Box component="li" key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ChevronRightIcon sx={{ fontSize: 16, color: 'text.disabled' }} aria-hidden="true" />
                {item.href ? (
                  <MuiLink
                    component={Link}
                    href={item.href}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      '&:hover': { color: 'primary.main' }
                    }}
                  >
                    {item.label}
                  </MuiLink>
                ) : (
                  <Typography variant="body2" color="text.primary" component="span" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default Breadcrumbs;