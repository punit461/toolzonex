'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CARD_TYPES = ['summary', 'summary_large_image'];

const TwitterCardGeneratorContent = () => {
  const [cardType, setCardType] = useState(CARD_TYPES[1]);
  const [title, setTitle] = useState('My Page Title');
  const [description, setDescription] = useState('A short, compelling description for the card preview.');
  const [image, setImage] = useState('https://example.com/preview.jpg');
  const [site, setSite] = useState('@example');

  const output = useMemo(() => {
    const lines = [
      `<meta name="twitter:card" content="${cardType}" />`,
      `<meta name="twitter:title" content="${title}" />`,
      `<meta name="twitter:description" content="${description}" />`,
      `<meta name="twitter:image" content="${image}" />`,
    ];
    if (site.trim()) lines.push(`<meta name="twitter:site" content="${site.startsWith('@') ? site : `@${site}`}" />`);
    return lines.join('\n');
  }, [cardType, title, description, image, site]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>twitter:card</InputLabel>
          <Select value={cardType} label="twitter:card" onChange={(e) => setCardType(e.target.value)}>
            {CARD_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField label="twitter:title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TextField label="twitter:description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={2} />
        <TextField label="twitter:image URL" value={image} onChange={(e) => setImage(e.target.value)} fullWidth />
        <TextField label="twitter:site (optional @handle)" value={site} onChange={(e) => setSite(e.target.value)} fullWidth />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Card Preview Mockup</Typography>
        <Paper variant="outlined" sx={{ overflow: 'hidden', maxWidth: 400 }}>
          <Box
            sx={{
              height: cardType === 'summary_large_image' ? 180 : 100,
              width: cardType === 'summary' ? 100 : '100%',
              bgcolor: 'action.hover',
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              float: cardType === 'summary' ? 'left' : 'none',
            }}
          />
          <Box sx={{ p: 1.5, overflow: 'hidden' }}>
            <Typography variant="subtitle2" fontWeight="700" noWrap>{title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {description}
            </Typography>
            {site.trim() && (
              <Typography variant="caption" color="text.secondary">{site.startsWith('@') ? site : `@${site}`}</Typography>
            )}
          </Box>
        </Paper>

        <Box sx={{ position: 'relative' }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', minHeight: 160 }}>
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

const TwitterCardGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Twitter Card Meta Tag Generator</Typography>
      <Typography variant="body1">
        Fill in your page's title, description, and image to generate Twitter/X Card meta tags, so your link
        shows a rich preview with an image and description instead of a bare URL when shared on X (formerly
        Twitter).
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Choose a card type — "summary" for a small square thumbnail or "summary_large_image" for a full-width
        banner image — then fill in the title, description, image URL, and optionally your site's @handle. The
        mockup card and generated tags update instantly; copy the code block and paste it into your page's
        <code>&lt;head&gt;</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Setting <code>twitter:card</code> to <code>summary_large_image</code> along with a title, description,
        and image URL produces a large, eye-catching preview card instead of a plain link when the page is
        shared on X.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Making sure a blog post or product page shows a proper image and title when shared on X.</li>
          <li>Comparing how the "summary" and "summary_large_image" card types look before choosing one.</li>
          <li>Scaffolding Twitter Card meta tags for a new site before launch.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What's the difference between "summary" and "summary_large_image"?</Typography>
      <Typography variant="body1">
        "summary" shows a small square thumbnail next to the title and description, while
        "summary_large_image" shows a full-width banner image above the text — better suited to photos,
        graphics, or featured images you want front and center.
      </Typography>
      <Typography variant="h3">Do I still need Open Graph tags if I add Twitter Card tags?</Typography>
      <Typography variant="body1">
        Yes — X will fall back to Open Graph (<code>og:title</code>, <code>og:description</code>,
        <code>og:image</code>) tags if Twitter-specific ones are missing, but most other platforms (Facebook,
        LinkedIn, Slack) only read Open Graph tags, so it's best to include both.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — everything is generated entirely client-side in your browser. Nothing you type is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/twitter-card-generator" content={content}>
      <TwitterCardGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TwitterCardGenerator;
