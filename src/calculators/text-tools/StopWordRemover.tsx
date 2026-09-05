'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Button, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// ~120 common English stop words — a standard preprocessing list for
// keyword extraction and SEO content analysis.
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'in', 'on', 'at', 'of', 'to', 'for', 'and', 'or', 'but', 'if',
  'this', 'that', 'these', 'those', 'it', 'its', "it's", 'with', 'as', 'by',
  'from', 'than', 'then', 'so', 'such', 'they', 'them', 'their', 'theirs',
  'he', 'she', 'his', 'her', 'hers', 'we', 'our', 'ours', 'you', 'your', 'yours',
  'i', 'my', 'mine', 'me', 'not', 'no', 'nor', 'do', 'does', 'did', 'doing',
  'have', 'has', 'had', 'having', 'will', 'would', 'can', 'could', 'should',
  'shall', 'may', 'might', 'must', 'about', 'above', 'after', 'again',
  'against', 'all', 'am', 'any', 'because', 'been', 'before', 'below',
  'between', 'both', 'down', 'during', 'each', 'few', 'further', 'here',
  'how', 'into', 'more', 'most', 'off', 'once', 'only', 'other', 'out',
  'over', 'own', 'same', 'some', 'there', 'through', 'too', 'under', 'until',
  'up', 'very', 'what', 'when', 'where', 'which', 'while', 'who', 'whom',
  'why', 'yourself', 'yourselves', 'himself', 'herself', 'itself', 'myself',
  'ourselves', 'themselves', 'am', 'been', 'being', 'just', 'now', 'also',
  'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn',
  "doesn't", 'don', "don't", 'hadn', "hadn't", 'hasn', "hasn't", 'isn',
  "isn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn',
  "wouldn't",
]);

function removeStopWords(text: string): { result: string; removedCount: number } {
  const tokens = text.split(/(\s+)/);
  const kept: string[] = [];
  let removedCount = 0;
  for (const token of tokens) {
    if (/^\s+$/.test(token) || token === '') continue; // drop original whitespace, we'll rejoin with single spaces
    const key = token.toLowerCase().replace(/[^\w']/g, '');
    if (STOP_WORDS.has(key)) {
      removedCount++;
      continue;
    }
    kept.push(token);
  }
  return { result: kept.join(' '), removedCount };
}

const StopWordRemoverContent = () => {
  const [text, setText] = useState(
    'This is an example of the kind of text that would be used for keyword extraction and SEO content analysis.'
  );

  const { result, removedCount } = useMemo(() => (text ? removeStopWords(text) : { result: '', removedCount: 0 }), [text]);

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />
        {text && (
          <Alert severity={removedCount > 0 ? 'success' : 'info'}>
            Removed <strong>{removedCount}</strong> stop word{removedCount === 1 ? '' : 's'}.
          </Alert>
        )}
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Content Words:</Typography>
          {result && (
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
              Copy
            </Button>
          )}
        </Box>
        <TextField
          value={result}
          multiline
          rows={12}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Text with stop words removed will appear here..."
        />
      </Box>
    </Box>
  );
};

const StopWordRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Stop Word Remover</Typography>
      <Typography variant="body1">
        Paste any text into the box, and every whole-word, case-insensitive match against a standard list of
        roughly 120 common English stop words (a, an, the, is, are, of, and, but, and so on) is removed. What
        remains are the &quot;content&quot; words that carry the actual meaning of the text, with extra
        whitespace cleaned up automatically. This is a common preprocessing step for keyword extraction and SEO
        content analysis.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;This is an example of the kind of text that would be used for keyword extraction&quot; becomes
        &quot;example kind text used keyword extraction&quot; — all the stop words (this, is, an, of, the, that,
        would, be, for) are stripped out, leaving only the meaningful content words.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Extracting the core keywords from a paragraph for SEO or content analysis.</li>
          <li>Preprocessing text before running it through a word frequency or word cloud tool.</li>
          <li>Cleaning up text before search indexing or tag generation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What counts as a "stop word" here?</strong> A curated list of roughly 120 of the most common English function words — articles, pronouns, prepositions, conjunctions, and common auxiliary verbs — that carry little meaning on their own and are typically filtered out before keyword or frequency analysis.</li>
          <li><strong>Is matching case-sensitive?</strong> No — matching is case-insensitive, so &quot;The&quot;, &quot;THE&quot;, and &quot;the&quot; are all removed as stop words regardless of capitalization.</li>
          <li><strong>Does it remove partial matches inside longer words?</strong> No — matching is whole-word only, so a stop word like &quot;is&quot; won&apos;t be removed from inside a longer word like &quot;island&quot; or &quot;this&quot;.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/stop-word-remover" content={content}>
      <StopWordRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StopWordRemover;
