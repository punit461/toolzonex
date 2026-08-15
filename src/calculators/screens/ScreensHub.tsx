'use client';

import { Box, Typography, Card, CardActionArea, CardContent } from '@mui/material';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

const SCREENS = [
  { slug: 'black-screen', name: 'Black Screen', desc: 'Plain fullscreen black.' },
  { slug: 'red-screen', name: 'Red Screen', desc: 'Plain fullscreen red.' },
  { slug: 'blue-screen', name: 'Blue Screen', desc: 'Plain fullscreen blue.' },
  { slug: 'green-screen', name: 'Green Screen', desc: 'Chroma-key green.' },
  { slug: 'pink-screen', name: 'Pink Screen', desc: 'Plain fullscreen pink.' },
  { slug: 'purple-screen', name: 'Purple Screen', desc: 'Plain fullscreen purple.' },
  { slug: 'orange-screen', name: 'Orange Screen', desc: 'Plain fullscreen orange.' },
  { slug: 'yellow-screen', name: 'Yellow Screen', desc: 'Plain fullscreen yellow.' },
  { slug: 'zoom-lighting-screen', name: 'Zoom Lighting Screen', desc: 'Warm light for video calls.' },
  { slug: 'dead-pixel-test', name: 'Dead Pixel Test', desc: 'Find stuck or dead pixels.' },
  { slug: 'dvd-screensaver', name: 'DVD Screensaver', desc: 'The classic bouncing logo.' },
  { slug: 'broken-screen', name: 'Broken Screen', desc: 'Fake cracked-screen prank.' },
  { slug: 'windows-10-blue-screen', name: 'Windows 10 Blue Screen', desc: 'Fake BSOD prank.' },
  { slug: 'windows-10-update-screen', name: 'Windows 10 Update Screen', desc: 'Fake update prank.' },
  { slug: 'windows-11-blue-screen', name: 'Windows 11 Blue Screen', desc: 'Fake error screen prank.' },
  { slug: 'windows-11-update-screen', name: 'Windows 11 Update Screen', desc: 'Fake update prank.' },
];

const ScreensHub = () => {
  return (
    <Box>
      <Breadcrumbs items={[{ label: 'Utilities' }, { label: 'Fullscreen Test Screens' }]} />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" gutterBottom>
          Fullscreen Test Screens
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Solid color screens, monitor test tools, and fun fullscreen pranks — pick one below and go fullscreen.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {SCREENS.map((s) => (
          <Card key={s.slug} variant="outlined">
            <CardActionArea component={Link} href={`/utilities/${s.slug}`}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{s.name}</Typography>
                <Typography variant="body2" color="text.secondary">{s.desc}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ScreensHub;
