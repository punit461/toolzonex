'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DuplicatesRemoverContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [stats, setStats] = useState<{ original: number; removed: number; remaining: number } | null>(null);

  const handleRemove = () => {
    const lines = text.split('\n');
    const originalCount = lines.length;
    
    // Using Set to keep unique lines, preserving order of first appearance
    const uniqueLines = [...new Set(lines)];
    const remainingCount = uniqueLines.length;
    const removedCount = originalCount - remainingCount;
    
    setResult(uniqueLines.join('\n'));
    setStats({
      original: originalCount,
      removed: removedCount,
      remaining: remainingCount
    });
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text (one item per line)"
          placeholder="Paste your list here with duplicate lines..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleRemove} fullWidth size="large" sx={{ mb: 2 }}>
          Remove Duplicate Lines
        </Button>

        {stats && (
          <Alert severity={stats.removed > 0 ? "success" : "info"}>
            Found and removed <strong>{stats.removed}</strong> duplicate lines. 
            ({stats.remaining} unique lines remaining).
          </Alert>
        )}
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
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
          placeholder="List with duplicates removed will appear here..."
        />
      </Box>
    </Box>
  );
};

const DuplicatesRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Duplicates Remover?</Typography>
      <Typography variant="body1">
        Simply paste your list into the left input box (each item should be on a new line). Click the "Remove Duplicate Lines" button. The tool will instantly filter out any exact duplicate lines and show the cleaned list on the right, along with statistics on how many duplicates were removed.
      </Typography>

      <Typography variant="h2">Why remove duplicates?</Typography>
      <Typography variant="body1">
        When dealing with large datasets, mailing lists, SEO keywords, or inventory codes, duplicate entries can cause errors, spam, or inflated metrics. This free online tool helps you clean up your lists instantly without needing complex spreadsheet formulas — a quick way to remove duplicates from a list online, whether that list is names, emails, or duplicate numbers.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A list containing &quot;apple, banana, apple, cherry&quot; (one per line) becomes &quot;apple, banana,
        cherry&quot; — the duplicate is removed automatically.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Cleaning up a mailing or contact list before sending a campaign.</li>
          <li>Removing duplicate keywords, tags, or inventory codes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I remove duplicates from a list online?</Typography>
      <Typography variant="body1">
        Paste your list into the input box (one item per line) and click &quot;Remove Duplicate Lines&quot;.
        This tool works entirely in your browser, so there&apos;s nothing to install and nothing is uploaded —
        it&apos;s a fast way to remove duplicates from a list online for free.
      </Typography>
      <Typography variant="h3">How do I delete duplicates online for free?</Typography>
      <Typography variant="body1">
        This page is free to use with no sign-up: paste your text, click the button, and copy the cleaned
        result. It works for any plain-text list — names, emails, keywords, or codes.
      </Typography>
      <Typography variant="h3">Can I remove duplicate numbers with this tool?</Typography>
      <Typography variant="body1">
        Yes — put one number per line and the tool removes duplicate numbers the same way it removes duplicate
        words or lines, keeping only the first occurrence of each.
      </Typography>
      <Typography variant="h3">Is this case-sensitive?</Typography>
      <Typography variant="body1">
        By default duplicates are matched exactly as typed — &quot;Apple&quot; and &quot;apple&quot; are treated
        as different lines unless case-insensitive matching is selected.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Duplicates Remover"
      description="Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free."
      url="/text-tools/duplicates-remover"
      content={content}
      category="Text Tools"
    >
      <DuplicatesRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DuplicatesRemover;
