'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HASHTAG_RE = /#\w+/g;

const ExtractHashtagsContent = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const hashtags = useMemo(() => text.match(HASHTAG_RE) || [], [text]);
  const joined = hashtags.join(' ');

  const copyResult = async () => {
    if (!joined) return;
    try {
      await navigator.clipboard.writeText(joined);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste a social media post or any text containing #hashtags..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={12}
        fullWidth
      />

      <Box>
        <Paper sx={{ p: 2, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Hashtags Found</Typography>
          <Typography variant="h4" fontWeight="bold">{hashtags.length}</Typography>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!joined}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        {hashtags.length > 0 ? (
          <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: 80 }}>
            {hashtags.map((tag, i) => (
              <Chip key={`${tag}-${i}`} label={tag} color="primary" variant="outlined" />
            ))}
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 2, minHeight: 80, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            No hashtags found yet.
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const ExtractHashtags = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Extract Hashtags Tool</Typography>
      <Typography variant="body1">
        Paste any block of text — a social media post, comment thread, or article — into the box, and the tool
        scans it for every substring that matches a hashtag pattern (a <code>#</code> followed by letters,
        numbers, or underscores). Every match is listed below along with a total count, and you can copy them
        all at once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting &quot;Loving this new trail! #hiking #NatureLovers #TrailRun2024&quot; extracts three hashtags:
        <code> #hiking</code>, <code>#NatureLovers</code>, and <code>#TrailRun2024</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling every hashtag out of a competitor&apos;s post to study their tagging strategy.</li>
          <li>Auditing your own draft caption to see exactly which hashtags you&apos;ve already used.</li>
          <li>Collecting hashtags from a batch of pasted posts or comments for further analysis.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Hashtag Generator?</strong> The Hashtag Generator SUGGESTS brand-new hashtags for a topic you type in. This tool does the opposite — it PULLS OUT hashtags that already exist within a piece of text you paste in, without inventing anything new.</li>
          <li><strong>What counts as a valid hashtag here?</strong> A <code>#</code> symbol immediately followed by one or more letters, numbers, or underscores, with no space — matching how hashtags are recognized on most social platforms.</li>
          <li><strong>Does it remove duplicate hashtags?</strong> No — every occurrence is listed and counted individually, so if a hashtag appears three times in your text, it shows up three times in the results.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/extract-hashtags" content={content}>
      <ExtractHashtagsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractHashtags;
