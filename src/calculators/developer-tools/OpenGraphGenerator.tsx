'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const OG_TYPES = ['website', 'article', 'product', 'video.other', 'profile'];
const TWITTER_CARDS = ['summary', 'summary_large_image', 'app', 'player'];

const OpenGraphGeneratorContent = () => {
  const [ogTitle, setOgTitle] = useState('My Page Title');
  const [ogDescription, setOgDescription] = useState('A short, compelling description for social previews.');
  const [ogImage, setOgImage] = useState('https://example.com/preview.jpg');
  const [ogUrl, setOgUrl] = useState('https://example.com/page');
  const [ogType, setOgType] = useState(OG_TYPES[0]);
  const [twitterCard, setTwitterCard] = useState(TWITTER_CARDS[1]);

  const output = useMemo(() => {
    const lines = [
      `<meta property="og:title" content="${ogTitle}" />`,
      `<meta property="og:description" content="${ogDescription}" />`,
      `<meta property="og:image" content="${ogImage}" />`,
      `<meta property="og:url" content="${ogUrl}" />`,
      `<meta property="og:type" content="${ogType}" />`,
      `<meta name="twitter:card" content="${twitterCard}" />`,
      `<meta name="twitter:title" content="${ogTitle}" />`,
      `<meta name="twitter:description" content="${ogDescription}" />`,
      `<meta name="twitter:image" content="${ogImage}" />`,
    ];
    return lines.join('\n');
  }, [ogTitle, ogDescription, ogImage, ogUrl, ogType, twitterCard]);

  const copy = () => navigator.clipboard.writeText(output);

  let hostname = 'example.com';
  try { hostname = new URL(ogUrl).hostname; } catch { /* keep default */ }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="og:title" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} fullWidth />
        <TextField label="og:description" value={ogDescription} onChange={(e) => setOgDescription(e.target.value)} fullWidth multiline rows={2} />
        <TextField label="og:image URL" value={ogImage} onChange={(e) => setOgImage(e.target.value)} fullWidth />
        <TextField label="og:url" value={ogUrl} onChange={(e) => setOgUrl(e.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel>og:type</InputLabel>
          <Select value={ogType} label="og:type" onChange={(e) => setOgType(e.target.value)}>
            {OG_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>twitter:card</InputLabel>
          <Select value={twitterCard} label="twitter:card" onChange={(e) => setTwitterCard(e.target.value)}>
            {TWITTER_CARDS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Social Preview Mockup</Typography>
        <Paper variant="outlined" sx={{ overflow: 'hidden', maxWidth: 400 }}>
          <Box
            sx={{
              height: 180,
              bgcolor: 'action.hover',
              backgroundImage: ogImage ? `url(${ogImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Box sx={{ p: 1.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase' }}>{hostname}</Typography>
            <Typography variant="subtitle2" fontWeight="700" noWrap>{ogTitle}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {ogDescription}
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ position: 'relative' }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', minHeight: 200 }}>
            {output}
          </Paper>
          <Button variant="contained" size="small" startIcon={<ContentCopyIcon />} onClick={copy} sx={{ position: 'absolute', top: 8, right: 8 }}>
            Copy
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const OpenGraphGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Open Graph & Twitter Card Meta Tag Generator</Typography>
      <Typography variant="body1">
        Fill in your page's title, description, image, and type to generate Open Graph and Twitter Card meta
        tags, so your link looks right when shared on Facebook, LinkedIn, X/Twitter, Slack, and other apps.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Fill in the fields on the left. The mockup card and generated tags update instantly — copy the code
        block and paste it into your page's <code>&lt;head&gt;</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting <code>og:title</code>, <code>og:description</code>, and an <code>og:image</code> URL produces a
        rich preview card instead of a bare link when the page is shared on social platforms.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making sure a blog post or product page shows a proper image and title when shared.</li>
          <li>Testing how different <code>og:type</code> and Twitter card values change the preview.</li>
          <li>Scaffolding social meta tags for a new site before launch.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What image size works best for og:image?</Typography>
      <Typography variant="body1">
        A 1200×630px image is the widely recommended size — it displays well as a large preview across
        Facebook, LinkedIn, and X/Twitter without being cropped awkwardly.
      </Typography>
      <Typography variant="h3">Why doesn't my updated preview show on Facebook/X right away?</Typography>
      <Typography variant="body1">
        Social platforms cache preview data per URL. After changing your tags, use that platform's own
        debugger/sharing tool (like Facebook's Sharing Debugger) to force it to re-scrape the page.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — everything is generated entirely client-side in your browser. Nothing you type is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/open-graph-generator" content={content}>
      <OpenGraphGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OpenGraphGenerator;
