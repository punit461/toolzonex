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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

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
      <Box 
        component="nav" 
        aria-label="Breadcrumb"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5, 
          mb: 3,
          flexWrap: 'wrap'
        }}
      >
        <MuiLink 
          component={Link} 
          href="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' }
          }}
        >
          <HomeIcon sx={{ fontSize: 18 }} />
        </MuiLink>
        
        {items.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ChevronRightIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
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
              <Typography variant="body2" color="text.primary">
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Breadcrumbs;