'use client';

import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, InputAdornment, CardActionArea } from '@mui/material';
import RouterLink from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { categories } from '@/data/toolCategories';
import { toolMatchesQuery } from '@/utils/search';

interface DashboardTile {
  label: string;
  path: string;
  sourceCategoryLabels: string[];
}

const DASHBOARD_TILES: DashboardTile[] = [
  { label: 'Finance', path: '/finance', sourceCategoryLabels: ['Finance', 'Paycheck Calculators'] },
  { label: 'Health', path: '/health', sourceCategoryLabels: ['Health'] },
  { label: 'Utilities', path: '/utilities', sourceCategoryLabels: ['Utilities', 'Time & Productivity', 'Screens'] },
  { label: 'Converters', path: '/converters', sourceCategoryLabels: ['Converters'] },
  { label: 'Text Tools', path: '/text-tools', sourceCategoryLabels: ['Text Tools'] },
  { label: 'Generators', path: '/generators', sourceCategoryLabels: ['Generators'] },
  { label: 'Developer Tools', path: '/developer-tools', sourceCategoryLabels: ['Developer Tools'] },
  { label: 'Tools', path: '/tools', sourceCategoryLabels: ['Tools'] },
  { label: 'PDF Tools', path: '/tools/pdf-tools', sourceCategoryLabels: ['PDF Tools'] },
  { label: 'AI', path: '/ai', sourceCategoryLabels: ['AI'] },
];

/**
 * The handful of tools that actually carry search demand, per Search Console.
 * These are the reason most people arrive, so they get one click from the top
 * of the page rather than being buried in a category.
 */
const TOP_INTENTS: { label: string; path: string }[] = [
  { label: 'EMI', path: '/finance/emi-calculator' },
  { label: 'Income Tax', path: '/finance/income-tax-calculator' },
  { label: 'BMI', path: '/health/bmi-calculator' },
  { label: 'Age', path: '/utilities/age-calculator' },
  { label: 'Percentage', path: '/utilities/percentage-calculator' },
  { label: 'SIP', path: '/finance/sip-calculator' },
  { label: 'GST', path: '/finance/gst-calculator' },
];

const PREVIEW_ICON_COUNT = 4;

/** Categories at or above this size get the fuller tile treatment. */
const MAJOR_CATEGORY_THRESHOLD = 150;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const query = searchTerm.trim();

  const filteredCategories = categories.map(category => {
    const filteredTools = category.tools.filter(tool =>
      toolMatchesQuery(`${tool.title} ${tool.description}`, searchTerm)
    );
    return { ...category, tools: filteredTools };
  }).filter(category => category.tools.length > 0);

  const tiles = DASHBOARD_TILES.map((tile) => {
    const sourceCats = categories.filter((cat) => tile.sourceCategoryLabels.includes(cat.label));
    const toolCount = sourceCats.reduce((sum, cat) => sum + cat.tools.length, 0);
    const previewIcons = sourceCats
      .flatMap((cat) => cat.tools.map((tool) => tool.icon))
      .slice(0, PREVIEW_ICON_COUNT);
    return { ...tile, toolCount, previewIcons };
  })
    .filter((tile) => tile.toolCount > 0)
    .sort((a, b) => b.toolCount - a.toolCount);

  const totalTools = tiles.reduce((sum, t) => sum + t.toolCount, 0);

  return (
    <>
      <Box sx={{ py: { xs: 5, md: 8 }, maxWidth: 760 }}>
        <Typography
          variant="h1"
          sx={{ fontSize: 'clamp(2.25rem, 5vw, 3.25rem)', lineHeight: 1.08, mb: 2.5 }}
        >
          Get the number, then get on with your day.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', mb: 4, maxWidth: '58ch' }}>
          {totalTools.toLocaleString('en-IN')} free calculators and converters for finance, health, and everyday
          questions. Nothing to install, no sign-up, and your numbers never leave the browser.
        </Typography>

        <TextField
          fullWidth
          placeholder="Search for a tool..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: { fontSize: '1.0625rem', py: 0.5 },
            },
          }}
          sx={{ maxWidth: 560 }}
        />

        {query === '' && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2.5, alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
              Most used:
            </Typography>
            {TOP_INTENTS.map((intent) => (
              <Box
                key={intent.path}
                component={RouterLink}
                href={intent.path}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'text.primary',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s, color 0.15s',
                  '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                }}
              >
                {intent.label}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {query === '' && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Browse by category
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
              gap: 2,
            }}
          >
            {tiles.map((tile) => {
              const isMajor = tile.toolCount >= MAJOR_CATEGORY_THRESHOLD;
              return (
                <Card
                  key={tile.path}
                  variant="outlined"
                  sx={{
                    transition: 'border-color 0.15s',
                    '&:hover': { borderColor: 'primary.main' },
                  }}
                >
                  <CardActionArea component={RouterLink} href={tile.path} sx={{ height: '100%' }}>
                    <CardContent sx={{ p: isMajor ? 3 : 2.25 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: isMajor ? 1.5 : 0.5 }}>
                        <Typography
                          component="span"
                          sx={{ fontWeight: 600, fontSize: isMajor ? '1.25rem' : '1rem', letterSpacing: '-0.01em' }}
                        >
                          {tile.label}
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary">
                          {tile.toolCount}
                        </Typography>
                      </Box>
                      {isMajor && (
                        <Box sx={{ display: 'flex', gap: 1.5, '& svg': { fontSize: '1.35rem' }, color: 'text.secondary' }}>
                          {tile.previewIcons.map((icon, idx) => (
                            <Box key={idx} sx={{ display: 'flex' }}>{icon}</Box>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Box>
        </Box>
      )}

      {query === '' && (
        <Box sx={{ maxWidth: 680, mb: 6 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Why ToolZoneX
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Every tool here runs entirely in your browser — enter your salary, your loan amount, or your medical
            numbers and none of it is uploaded anywhere. The finance tools are built for Indian rules specifically:
            current FY tax slabs, PPF and SSY limits, GST rates, and HRA exemption maths, rather than a US calculator
            with the currency symbol swapped. And when a number needs explaining, the{' '}
            <Box component={RouterLink} href="/blog" sx={{ color: 'primary.main', fontWeight: 500 }}>
              guides
            </Box>{' '}
            cover the rules behind it.
          </Typography>
        </Box>
      )}

      {query !== '' && (
        filteredCategories.map((cat) => (
          <Box key={cat.label} sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
              <Typography variant="h2">{cat.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {cat.tools.length}
              </Typography>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {cat.tools.map((tool) => (
                <Card
                  key={tool.path}
                  variant="outlined"
                  sx={{ transition: 'border-color 0.15s', '&:hover': { borderColor: 'primary.main' } }}
                >
                  <CardActionArea component={RouterLink} href={tool.path} sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ mb: 1, color: 'text.secondary', '& svg': { fontSize: '1.5rem' } }}>{tool.icon}</Box>
                      <Typography sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>
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
        ))
      )}
    </>
  );
};

export default Home;
