'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ROBOTS_OPTIONS = ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'];

const MetaTagGeneratorContent = () => {
  const [title, setTitle] = useState('My Page Title');
  const [description, setDescription] = useState('A short, compelling description of this page for search results.');
  const [keywords, setKeywords] = useState('keyword one, keyword two');
  const [author, setAuthor] = useState('');
  const [viewport, setViewport] = useState('width=device-width, initial-scale=1');
  const [charset, setCharset] = useState('UTF-8');
  const [robots, setRobots] = useState(ROBOTS_OPTIONS[0]);

  const output = useMemo(() => {
    const lines = [
      `<meta charset="${charset}" />`,
      `<meta name="viewport" content="${viewport}" />`,
      title && `<title>${title}</title>`,
      description && `<meta name="description" content="${description}" />`,
      keywords && `<meta name="keywords" content="${keywords}" />`,
      author && `<meta name="author" content="${author}" />`,
      `<meta name="robots" content="${robots}" />`,
    ].filter(Boolean);
    return lines.join('\n');
  }, [title, description, keywords, author, viewport, charset, robots]);

  const copy = () => navigator.clipboard.writeText(output);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Page Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
        <TextField label="Meta Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={2} />
        <TextField label="Keywords (comma separated)" value={keywords} onChange={(e) => setKeywords(e.target.value)} fullWidth />
        <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth />
        <TextField label="Viewport" value={viewport} onChange={(e) => setViewport(e.target.value)} fullWidth />
        <TextField label="Charset" value={charset} onChange={(e) => setCharset(e.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Robots</InputLabel>
          <Select value={robots} label="Robots" onChange={(e) => setRobots(e.target.value)}>
            {ROBOTS_OPTIONS.map((opt) => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Live Preview</Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ color: '#1a0dab', fontWeight: 400 }}>{title || 'Untitled Page'}</Typography>
          <Typography variant="body2" sx={{ color: '#006621' }}>example.com</Typography>
          <Typography variant="body2" color="text.secondary">{description}</Typography>
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

const MetaTagGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free HTML Meta Tag Generator</Typography>
      <Typography variant="body1">
        Fill in your page's title, description, keywords, author, and robots directive to instantly generate a
        clean block of HTML <code>&lt;meta&gt;</code> tags, ready to paste into your page's <code>&lt;head&gt;</code>.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Fill in each field on the left — the generated HTML and a rough search-result preview update instantly
        on the right. Copy the code block and paste it into your page's <code>&lt;head&gt;</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A title of "Best Coffee Shops in Pune" with a one-sentence description generates a ready-to-paste
        <code>&lt;title&gt;</code> and <code>&lt;meta name="description"&gt;</code> pair, plus a
        Google-style preview of how it might appear in search results.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly scaffolding SEO meta tags for a new static page.</li>
          <li>Making sure charset and viewport tags are present and correctly formatted.</li>
          <li>Setting a robots directive to control search engine indexing per page.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does the meta keywords tag still matter for SEO?</Typography>
      <Typography variant="body1">
        Major search engines like Google no longer use the <code>keywords</code> meta tag for ranking, but some
        smaller search tools and internal site search systems still read it, so it's harmless to include.
      </Typography>
      <Typography variant="h3">What does the robots meta tag control?</Typography>
      <Typography variant="body1">
        It tells search engine crawlers whether to index the page and whether to follow its links —
        <code>noindex</code> keeps a page out of search results, and <code>nofollow</code> tells crawlers not
        to pass ranking credit through its links.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the tags are generated entirely client-side in your browser. Nothing you type is sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/meta-tag-generator" content={content}>
      <MetaTagGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MetaTagGenerator;
