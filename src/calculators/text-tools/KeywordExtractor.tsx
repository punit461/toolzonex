'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Chip, Paper, Stack, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't", 'as',
  'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', "can't",
  'cannot', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during',
  'each', 'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he',
  "he'd", "he'll", "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's",
  'i', "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's",
  'me', 'more', 'most', "mustn't", 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd",
  "she'll", "she's", 'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're",
  "they've", 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we',
  "we'd", "we'll", "we're", "we've", 'were', "weren't", 'what', "what's", 'when', "when's", 'where', "where's",
  'which', 'while', 'who', "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't", 'you',
  "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself', 'yourselves', 'also', 'just', 'like',
  'get', 'got', 'one', 'two', 'us', 'said',
]);

const TOP_N = 20;

const KeywordExtractorContent = () => {
  const [text, setText] = useState('');

  const keywords = useMemo(() => {
    const words = text.toLowerCase().match(/[a-z][a-z']{2,}/g);
    if (!words) return [];

    const counts: Record<string, number> = {};
    words.forEach((word) => {
      if (!STOPWORDS.has(word)) {
        counts[word] = (counts[word] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_N);
  }, [text]);

  const copyAll = async () => {
    if (keywords.length === 0) return;
    try {
      await navigator.clipboard.writeText(keywords.map(([word]) => word).join(', '));
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste an article, product description, or webpage content..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={10}
        fullWidth
      />

      {keywords.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="600">
              Top {keywords.length} Keyword{keywords.length === 1 ? '' : 's'}
            </Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>Copy All</Button>
          </Box>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {keywords.map(([word, count]) => (
              <Chip key={word} label={`${word} (${count})`} color="primary" variant="outlined" />
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

const KeywordExtractor = () => {
  const content = (
    <>
      <Typography variant="h2">How to extract keywords from text</Typography>
      <Typography variant="body1">
        Paste any text into the box above. This tool splits it into words, filters out a built-in list of
        common English stopwords (like &quot;the&quot;, &quot;is&quot;, and &quot;and&quot;), counts what
        remains, and shows the top 20 most frequent meaningful words as keywords — updating live as you type.
      </Typography>

      <Typography variant="h2">How keyword extraction works here</Typography>
      <Typography variant="body1">
        This is a frequency-based extraction approach: after removing stopwords, the words that appear most
        often are treated as the text&apos;s keywords. It&apos;s a simple, transparent method that works well
        as a starting point for tagging, SEO metadata, or a quick summary of a document&apos;s subject matter —
        though it doesn&apos;t understand meaning or context the way more advanced NLP techniques do.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a product description that repeats &quot;wireless&quot;, &quot;headphones&quot;, and
        &quot;battery&quot; surfaces those words as top keywords, while words like &quot;the&quot;,
        &quot;with&quot;, and &quot;and&quot; are filtered out automatically.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating candidate tags or meta keywords for a blog post or product page.</li>
          <li>Quickly identifying the main topics of a long document.</li>
          <li>Building a starting keyword list for SEO research.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What stopwords are filtered out?</Typography>
      <Typography variant="body1">
        A built-in list of over 100 common English words — articles, pronouns, prepositions, conjunctions, and
        auxiliary verbs like &quot;the&quot;, &quot;is&quot;, &quot;and&quot;, &quot;you&quot;, and
        &quot;would&quot; — is excluded before ranking the remaining words by frequency.
      </Typography>
      <Typography variant="h3">How is this different from the Keyword Density Analyzer?</Typography>
      <Typography variant="body1">
        The Keyword Density Analyzer reports each word&apos;s percentage share of the total text, aimed at SEO
        over-optimization checks. This tool focuses purely on ranking the most frequent non-stopword terms as a
        simple keyword list, which is more suited to tagging or quick topic identification.
      </Typography>
      <Typography variant="h3">Does it understand synonyms or context?</Typography>
      <Typography variant="body1">
        No — this is a straightforward frequency-count approach after stopword removal. It doesn&apos;t merge
        synonyms, understand grammar, or weigh a word&apos;s importance by anything other than how often it
        appears.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/keyword-extractor" content={content}>
      <KeywordExtractorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default KeywordExtractor;
