'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Chip, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function engagementTier(rate: number): { label: string; color: string } {
  if (rate > 6) return { label: 'Excellent', color: 'success' };
  if (rate > 3.5) return { label: 'High', color: 'primary' };
  if (rate > 1) return { label: 'Average', color: 'warning' };
  return { label: 'Low', color: 'error' };
}

const InstagramEngagementCalculatorContent = () => {
  const [followers, setFollowers] = useState<string>('10000');
  const [likes, setLikes] = useState<string>('300');
  const [comments, setComments] = useState<string>('30');
  const [saves, setSaves] = useState<string>('50');
  const [totalReactions, setTotalReactions] = useState<boolean>(true);

  const followersNum = parseFloat(followers) || 0;
  const likesNum = parseFloat(likes) || 0;
  const commentsNum = parseFloat(comments) || 0;
  const savesNum = parseFloat(saves) || 0;

  const standard = followersNum > 0 ? ((likesNum + commentsNum) / followersNum) * 100 : 0;
  const withSaves = followersNum > 0 ? ((likesNum + commentsNum + savesNum) / followersNum) * 100 : 0;
  const rate = totalReactions ? withSaves : standard;
  const tier = engagementTier(rate);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Followers"
          type="number"
          value={followers}
          onChange={(e) => setFollowers(e.target.value)}
          fullWidth
        />
        <TextField
          label="Likes per Post"
          type="number"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
          fullWidth
        />
        <TextField
          label="Comments per Post"
          type="number"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          fullWidth
        />
        <TextField
          label="Saves per Post"
          type="number"
          value={saves}
          onChange={(e) => setSaves(e.target.value)}
          fullWidth
        />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label="Standard (likes + comments)"
            clickable
            color={!totalReactions ? 'primary' : 'default'}
            onClick={() => setTotalReactions(false)}
          />
          <Chip
            label="Include Saves"
            clickable
            color={totalReactions ? 'primary' : 'default'}
            onClick={() => setTotalReactions(true)}
          />
        </Stack>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {rate.toFixed(2)}%
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Engagement Rate
          </Typography>
          <Chip
            label={tier.label}
            color={tier.color as 'success' | 'primary' | 'warning' | 'error'}
            sx={{ mt: 2, color: 'white', '& .MuiChip-label': { color: 'white' } }}
            variant="filled"
          />
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Formula (standard)</Typography>
            <Typography variant="body2" fontWeight="bold">(Likes + Comments) / Followers × 100</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total interactions</Typography>
            <Typography variant="body2" fontWeight="bold">{likesNum + commentsNum + savesNum}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Benchmark</Typography>
            <Typography variant="body2" fontWeight="bold">{tier.label} ({tier.color})</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const InstagramEngagementCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Instagram Engagement Calculator Work?</Typography>
      <Typography variant="body1">
        Enter your follower count and the average likes, comments, and saves you receive per post. The
        calculator divides your total interactions by your follower count and multiplies by 100 to give an
        engagement rate. The standard formula uses likes plus comments; toggle "Include Saves" on to count
        saves as an interaction too.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If you have 10,000 followers and a post earns 300 likes, 30 comments, and 50 saves, the standard
        engagement rate is ((300 + 30) / 10000) × 100 = 3.3%. Including saves brings it to
        ((300 + 30 + 50) / 10000) × 100 = 3.8%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Benchmarking your account against industry standards.</li>
          <li>Comparing posts to see which content format resonates most.</li>
          <li>Reporting engagement to sponsors or clients.</li>
          <li>Tracking whether content changes actually move the needle.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a good engagement rate on Instagram?</Typography>
      <Typography variant="body1">
        As a rough guide, under 1% is low, 1–3.5% is average, 3.5–6% is high, and above 6% is excellent.
        Benchmarks vary by niche, audience size, and content type.
      </Typography>
      <Typography variant="h3">Should I include saves in my engagement rate?</Typography>
      <Typography variant="body1">
        Saves are a strong signal of interest, so including them can give a fuller picture. Many standard
        formulas use only likes and comments, while others add saves and shares. Use a method that suits
        your goals and stay consistent.
      </Typography>
      <Typography variant="h3">Why does the percentage seem low?</Typography>
      <Typography variant="body1">
        Because engagement is a ratio of interactions to followers, larger accounts typically show lower
        percentages even when performing well. Focus on trends over time rather than a single number.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/instagram-engagement-calculator" content={content}>
      <InstagramEngagementCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InstagramEngagementCalculator;
