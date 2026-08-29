'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, LinearProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const toWordSet = (text: string) => new Set(text.toLowerCase().match(/[a-z0-9']+/g) ?? []);

const jaccardSimilarity = (a: Set<string>, b: Set<string>) => {
  if (a.size === 0 && b.size === 0) return 0;
  let intersection = 0;
  a.forEach((word) => {
    if (b.has(word)) intersection += 1;
  });
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : (intersection / union) * 100;
};

const TextSimilarityCheckerContent = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const { similarity, hasInput, sharedCount } = useMemo(() => {
    const setA = toWordSet(textA);
    const setB = toWordSet(textB);
    let shared = 0;
    setA.forEach((word) => {
      if (setB.has(word)) shared += 1;
    });
    return {
      similarity: jaccardSimilarity(setA, setB),
      hasInput: textA.trim().length > 0 && textB.trim().length > 0,
      sharedCount: shared,
    };
  }, [textA, textB]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <TextField
          label="First Text"
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
          multiline
          rows={8}
          fullWidth
        />
        <TextField
          label="Second Text"
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
          multiline
          rows={8}
          fullWidth
        />
      </Box>

      {hasInput && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight="600" gutterBottom>
            Similarity: {similarity.toFixed(1)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min(similarity, 100)}
            sx={{ height: 12, borderRadius: 1, mb: 1.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            {sharedCount} shared unique word{sharedCount === 1 ? '' : 's'} between the two texts.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const TextSimilarityChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to check text similarity online</Typography>
      <Typography variant="body1">
        Paste one piece of text into each box above. The similarity score updates live, showing how much
        overlap there is between the words used in each text.
      </Typography>

      <Typography variant="h2">How similarity is calculated</Typography>
      <Typography variant="body1">
        This tool uses Jaccard similarity on word sets: each text is broken into its set of distinct words
        (case-insensitive, punctuation ignored), and the similarity score is the number of words shared by both
        texts divided by the total number of distinct words across both texts combined, expressed as a
        percentage. A score of 100% means both texts use exactly the same set of words; 0% means they share no
        words at all. This word-overlap approach is simple, fast, and works well for comparing general topic
        and vocabulary overlap, though it doesn&apos;t account for word order or exact phrasing.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;The cat sat on the mat&quot; and &quot;A cat sat on a rug&quot; share the words &quot;cat&quot;,
        &quot;sat&quot;, and &quot;on&quot; out of 8 distinct words total across both texts, giving a similarity
        of roughly 37.5%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing two drafts to see how much their wording overlaps.</li>
          <li>Checking how similar two product descriptions or ad variations are.</li>
          <li>Getting a quick sense of topical overlap between two documents.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does word order matter?</Typography>
      <Typography variant="body1">
        No — this method compares the sets of words used, not their order or the sentences they form. Two texts
        with the same words in a different order would score 100% similar.
      </Typography>
      <Typography variant="h3">Does this detect plagiarism?</Typography>
      <Typography variant="body1">
        No — this is a simple word-overlap similarity measure, not a plagiarism detector. A high score means the
        two texts share a lot of vocabulary, not that one copies the other&apos;s exact phrasing or structure.
      </Typography>
      <Typography variant="h3">Why is the score lower than I expected for two similar paragraphs?</Typography>
      <Typography variant="body1">
        Jaccard similarity divides shared words by all distinct words combined, so even paraphrased text with
        the same meaning but different vocabulary choices can score lower than you might intuitively expect.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/text-similarity-checker" content={content}>
      <TextSimilarityCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextSimilarityChecker;
