'use client';

import { Box, Typography, Link, Container } from '@mui/material';
import RouterLink from 'next/link';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#0D0D0D', color: '#A1A1AA', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        {/* Logo + tagline */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box component="img" src="/toolzonex/logo.png" alt="ToolZoneX" sx={{ height: 52, mb: 1.5 }} />
          <Typography variant="body2" sx={{ color: '#71717A', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
            Smart Tools. Better Decisions.
          </Typography>
        </Box>

        {/* Link columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 4, mb: 5 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#FFFFFF', fontWeight: 700, display: 'block', mb: 1 }}>Finance</Typography>
            {[
              ['EMI Calculator', '/finance/emi-calculator'],
              ['SIP Calculator', '/finance/sip-calculator'],
              ['Income Tax', '/finance/income-tax-calculator'],
              ['GST Calculator', '/finance/gst-calculator'],
              ['PPF Calculator', '/finance/ppf-calculator'],
              ['Gold Calculator', '/finance/gold-calculator'],
            ].map(([label, path]) => (
              <Link key={path} component={RouterLink} href={path} variant="body2" sx={{ display: 'block', mb: 0.5, color: '#A1A1AA', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>{label}</Link>
            ))}
          </Box>

          <Box>
            <Typography variant="overline" sx={{ color: '#FFFFFF', fontWeight: 700, display: 'block', mb: 1 }}>Health</Typography>
            {[
              ['BMI Calculator', '/health/bmi-calculator'],
              ['BMR Calculator', '/health/bmr-calculator'],
              ['TDEE Calculator', '/health/tdee-calculator'],
            ].map(([label, path]) => (
              <Link key={path} component={RouterLink} href={path} variant="body2" sx={{ display: 'block', mb: 0.5, color: '#A1A1AA', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>{label}</Link>
            ))}
            <Typography variant="overline" sx={{ color: '#FFFFFF', fontWeight: 700, display: 'block', mt: 2, mb: 1 }}>Utilities</Typography>
            {[
              ['Age Calculator', '/utilities/age-calculator'],
              ['Date Calculator', '/utilities/date-calculator'],
              ['Percentage Calc', '/utilities/percentage-calculator'],
            ].map(([label, path]) => (
              <Link key={path} component={RouterLink} href={path} variant="body2" sx={{ display: 'block', mb: 0.5, color: '#A1A1AA', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>{label}</Link>
            ))}
          </Box>

          <Box>
            <Typography variant="overline" sx={{ color: '#FFFFFF', fontWeight: 700, display: 'block', mb: 1 }}>Tools</Typography>
            {[
              ['Online Notepad', '/tools/online-notepad'],
            ].map(([label, path]) => (
              <Link key={path} component={RouterLink} href={path} variant="body2" sx={{ display: 'block', mb: 0.5, color: '#A1A1AA', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>{label}</Link>
            ))}
            <Typography variant="overline" sx={{ color: '#FFFFFF', fontWeight: 700, display: 'block', mt: 2, mb: 1 }}>Blog</Typography>
            <Link component={RouterLink} href="/blog" variant="body2" sx={{ display: 'block', mb: 0.5, color: '#A1A1AA', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>All Articles</Link>
          </Box>

          <Box>
            <Typography variant="overline" sx={{ color: '#FFFFFF', fontWeight: 700, display: 'block', mb: 1 }}>Company</Typography>
            {[
              ['About', '/about'],
              ['FAQ', '/faq'],
              ['Contact', '/contact'],
              ['Privacy Policy', '/privacy-policy'],
              ['Terms of Service', '/terms-of-service'],
            ].map(([label, path]) => (
              <Link key={path} component={RouterLink} href={path} variant="body2" sx={{ display: 'block', mb: 0.5, color: '#A1A1AA', textDecoration: 'none', '&:hover': { color: '#FFFFFF' } }}>{label}</Link>
            ))}
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box sx={{ borderTop: '1px solid #27272A', pt: 3, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ color: '#52525B' }}>
            © {new Date().getFullYear()} ToolZoneX · Smart Tools. Better Decisions.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
