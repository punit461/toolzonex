'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TiktokEngagementCalculator = () => {
  const [likes, setLikes] = useState('5000');
  const [comments, setComments] = useState('200');
  const [shares, setShares] = useState('300');
  const [views, setViews] = useState('100000');

  const l = parseFloat(likes);
  const c = parseFloat(comments);
  const s = parseFloat(shares);
  const v = parseFloat(views);
  const valid = [l, c, s, v].every((n) => !isNaN(n)) && v > 0;

  const engagementRate = valid ? ((l + c + s) / v) * 100 : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the TikTok Engagement Calculator</Typography>
      <Typography variant="body1">
        TikTok&apos;s creator community typically measures engagement against views rather than followers,
        since TikTok is a view-heavy, discovery-driven platform where content reaches far beyond a
        creator&apos;s follower base through the For You feed. Enter your likes, comments, shares, and total
        views to calculate your view-based engagement rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Engagement Rate = (Likes + Comments + Shares) ÷ Views × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A video with 5,000 likes, 200 comments, and 300 shares out of 100,000 views has an engagement rate
        of (5,000 + 200 + 300) ÷ 100,000 × 100 = 5.5%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking how well individual TikTok videos perform relative to their view count.</li>
          <li>Comparing engagement rates across videos with very different view counts fairly.</li>
          <li>Reporting engagement metrics to brands or in a media kit using TikTok&apos;s conventional formula.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Instagram Engagement Calculator?</strong> The Instagram Engagement Calculator measures engagement against followers, which fits Instagram&apos;s feed-driven, follower-based distribution model. TikTok content, by contrast, is primarily discovered through the algorithmic For You feed regardless of follower count, so its creator community conventionally measures engagement against views instead — this tool matches that TikTok-specific convention.</li>
          <li><strong>Why use views instead of followers for TikTok?</strong> A TikTok video can rack up far more views than a creator has followers if it goes viral on the For You page, so dividing by followers would produce a misleadingly high or unstable rate. Dividing by views instead reflects engagement relative to the actual audience that saw the content.</li>
          <li><strong>Should I include video saves/bookmarks in this formula?</strong> This calculator uses the standard likes + comments + shares formula common in TikTok creator reporting. Some creators additionally track saves separately as a signal of deeper interest, but it isn&apos;t part of the conventional engagement rate calculation used here.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/tiktok-engagement-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Likes" type="number" value={likes} onChange={(e) => setLikes(e.target.value)} fullWidth />
          <TextField label="Comments" type="number" value={comments} onChange={(e) => setComments(e.target.value)} fullWidth />
          <TextField label="Shares" type="number" value={shares} onChange={(e) => setShares(e.target.value)} fullWidth />
          <TextField label="Views" type="number" value={views} onChange={(e) => setViews(e.target.value)} fullWidth />
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Engagement Rate (view-based)</Typography>
            <Typography variant="h3" fontWeight="bold">{valid ? `${engagementRate.toFixed(2)}%` : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TiktokEngagementCalculator;
