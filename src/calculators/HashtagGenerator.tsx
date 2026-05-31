'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const HashtagGeneratorContent = () => {
  const [text, setText] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generateHashtags = () => {
    if (!text.trim()) {
      setHashtags([]);
      return;
    }

    const stopwords = ['and', 'or', 'of', 'the', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'with', 'is', 'am', 'are', 'i', 'you', 'we', 'they', 'it', 'this', 'that'];
    
    // Extract long words and capitalize them
    const words = text
      .replace(/[^a-zA-Z\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopwords.includes(w.toLowerCase()))
      .map(w => w.toLowerCase());
      
    // Deduplicate
    const uniqueWords = Array.from(new Set(words));
    
    const tags = uniqueWords.map(word => `#${word}`);
    setHashtags(tags);
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(hashtags.join(' '));
    } catch (err) {}
  };
  
  const copySingle = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Paste your caption or paragraph"
          placeholder="e.g. Having a great time exploring the beautiful mountains of Switzerland!"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Button variant="contained" onClick={generateHashtags} fullWidth size="large">
          Generate Hashtags
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="600">Generated Hashtags:</Typography>
          {hashtags.length > 0 && (
             <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>
               Copy All
             </Button>
          )}
        </Box>
        
        <Paper sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', minHeight: 180 }}>
          {hashtags.length === 0 ? (
            <Typography color="text.secondary">Hashtags will appear here.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {hashtags.map((tag, idx) => (
                <Chip 
                  key={idx} 
                  label={tag} 
                  color="primary"
                  variant="outlined"
                  onClick={() => copySingle(tag)}
                  onDelete={() => copySingle(tag)}
                  deleteIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const HashtagGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Hashtag Generator?</Typography>
      <Typography variant="body1">
        Paste your Instagram caption, tweet, or blog paragraph into the text box. The tool analyzes the text, removes common filler words, and extracts the most relevant keywords as ready-to-copy hashtags. Click a tag to copy it individually, or click "Copy All" to grab the entire list.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Hashtag Generator"
      description="Extract keywords from text to generate SEO and social media hashtags instantly."
      url="/tools/hashtag-generator"
      content={content}
      category="Tools"
    >
      <HashtagGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HashtagGenerator;
