'use client';

import { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, InputAdornment, Chip, CardActionArea } from '@mui/material';
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

const PREVIEW_ICON_COUNT = 4;

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
    const color = sourceCats[0]?.color ?? '#000000';
    return { ...tile, toolCount, previewIcons, color };
  }).filter((tile) => tile.toolCount > 0);

  return (
    <>
      {/* Hero */}
      <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 }, mb: 4 }}>
        <Typography variant="h1" gutterBottom sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' } }}>
          Smart Tools for Every Decision
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '580px', mx: 'auto', fontWeight: 400, mb: 4 }}>
          Finance, health, utilities, and online tools — built for India, designed to be fast.
        </Typography>

        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
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

      {query === '' ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 8 }}>
          {tiles.map((tile) => (
            <Card
              key={tile.path}
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              }}
            >
              <CardActionArea component={RouterLink} href={tile.path} sx={{ height: '100%', p: 1 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 700, fontSize: '1.15rem' }}>
                      {tile.label}
                    </Typography>
                    <Chip label={`${tile.toolCount} tools`} size="small" sx={{ bgcolor: tile.color, color: '#fff', fontWeight: 700 }} />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    {tile.previewIcons.map((icon, idx) => (
                      <Box key={idx} sx={{ '& svg': { fontSize: '1.4rem' }, color: 'text.secondary' }}>
                        {icon}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      ) : null}

      {query === '' && (
        <Box sx={{ maxWidth: 720, mx: 'auto', mt: 8, mb: 4, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.75rem' }, mb: 2 }}>
            Why ToolZoneX?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ToolZoneX brings together {tiles.reduce((sum, t) => sum + t.toolCount, 0)}+ calculators, converters, and
            generators across finance, health, and everyday utilities — built for India, from EMI and tax calculators
            using current FY slabs to BMI and health tools with Indian-specific guidelines. Every tool runs entirely
            in your browser: no sign-up, no data leaving your device, no installs. Alongside the calculators, our{' '}
            <RouterLink href="/blog" style={{ color: 'inherit', fontWeight: 600 }}>blog</RouterLink> covers personal
            finance topics in depth — PPF rates, old vs. new tax regime, SIP planning — so you can understand the
            numbers a calculator gives you, not just get them.
          </Typography>
        </Box>
      )}

      {query !== '' && (
        filteredCategories.map((cat) => (
          <Box key={cat.label} sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.75rem' } }}>
                {cat.label}
              </Typography>
              <Chip label={`${cat.tools.length} tools`} size="small" sx={{ bgcolor: cat.color, color: '#fff', fontWeight: 700 }} />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
              {cat.tools.map((tool) => (
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
        ))
      )}
    </>
  );
};

export default Home;
