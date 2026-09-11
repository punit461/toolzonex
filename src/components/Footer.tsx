'use client';

import { Box, Typography, Link, Container } from '@mui/material';
import RouterLink from 'next/link';

/**
 * The footer stays a dark slab in both themes -- it anchors the bottom of the
 * page rather than following the surface colour. Its greys were previously
 * hardcoded neutrals that drifted from everything else; they now come from the
 * same navy family as the dark palette in theme.ts.
 */
const FOOT_BG = '#0D121C';
const FOOT_TEXT = '#98A3B8';
const FOOT_HEADING = '#EEF1F7';
const FOOT_RULE = '#273044';
const FOOT_MUTED = '#6B7688';

const linkSx = {
  display: 'block',
  mb: 0.75,
  color: FOOT_TEXT,
  textDecoration: 'none',
  '&:hover': { color: FOOT_HEADING },
} as const;

const headingSx = {
  color: FOOT_HEADING,
  fontWeight: 600,
  fontSize: '0.9375rem',
  display: 'block',
  mb: 1.25,
} as const;

const COLUMNS: { heading: string; links: [string, string][] }[][] = [
  [
    {
      heading: 'Finance',
      links: [
        ['EMI Calculator', '/finance/emi-calculator'],
        ['SIP Calculator', '/finance/sip-calculator'],
        ['Income Tax', '/finance/income-tax-calculator'],
        ['GST Calculator', '/finance/gst-calculator'],
        ['PPF Calculator', '/finance/ppf-calculator'],
        ['Gold Calculator', '/finance/gold-calculator'],
      ],
    },
  ],
  [
    {
      heading: 'Health',
      links: [
        ['BMI Calculator', '/health/bmi-calculator'],
        ['BMR Calculator', '/health/bmr-calculator'],
        ['TDEE Calculator', '/health/tdee-calculator'],
      ],
    },
    {
      heading: 'Utilities',
      links: [
        ['Age Calculator', '/utilities/age-calculator'],
        ['Date Calculator', '/utilities/date-calculator'],
        ['Percentage Calculator', '/utilities/percentage-calculator'],
      ],
    },
  ],
  [
    {
      heading: 'Tools',
      links: [
        ['Online Notepad', '/tools/online-notepad'],
        ['What Is My IP', '/tools/what-is-my-ip'],
        ['PDF Tools', '/tools/pdf-tools'],
      ],
    },
    {
      heading: 'Guides',
      links: [['All articles', '/blog']],
    },
  ],
  [
    {
      heading: 'Company',
      links: [
        ['About', '/about'],
        ['FAQ', '/faq'],
        ['Contact', '/contact'],
        ['Privacy Policy', '/privacy-policy'],
        ['Terms of Service', '/terms-of-service'],
      ],
    },
  ],
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: FOOT_BG, color: FOOT_TEXT, py: 7, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 5 }}>
          <Box component="img" src="/logo-dark.png" alt="ToolZoneX" sx={{ height: 48, mb: 1.5 }} />
          <Typography variant="body2" sx={{ color: FOOT_MUTED }}>
            Smart tools, better decisions.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 4, mb: 5 }}>
          {COLUMNS.map((column, idx) => (
            <Box key={idx}>
              {column.map((group, groupIdx) => (
                <Box key={group.heading} sx={{ mt: groupIdx > 0 ? 3 : 0 }}>
                  <Typography component="h2" sx={headingSx}>
                    {group.heading}
                  </Typography>
                  {group.links.map(([label, path]) => (
                    <Link key={path} component={RouterLink} href={path} variant="body2" sx={linkSx}>
                      {label}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        <Box sx={{ borderTop: `1px solid ${FOOT_RULE}`, pt: 3, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ color: FOOT_MUTED }}>
            © {new Date().getFullYear()} ToolZoneX
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
