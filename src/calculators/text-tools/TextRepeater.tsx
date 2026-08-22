'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TextRepeaterContent = () => {
  const [text, setText] = useState('');
  const [repetitions, setRepetitions] = useState('10');
  const [result, setResult] = useState('');
  const [addSpace, setAddSpace] = useState(true);
  const [addNewline, setAddNewline] = useState(false);

  const handleRepeat = () => {
    if (!text) return;

    const count = parseInt(repetitions, 10) || 1;
    // Limit to prevent browser crashes
    const safeCount = Math.min(count, 100000); 

    let separator = '';
    if (addNewline) {
      separator = '\n';
    } else if (addSpace) {
      separator = ' ';
    }

    const arr = new Array(safeCount).fill(text);
    setResult(arr.join(separator));
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Text to Repeat"
          placeholder="Enter the word or phrase..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          label="Number of Repetitions (Max 100k)"
          type="number"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={addSpace} onChange={(e) => setAddSpace(e.target.checked)} disabled={addNewline} />}
            label="Add space between repetitions"
          />
          <FormControlLabel
            control={<Checkbox checked={addNewline} onChange={(e) => setAddNewline(e.target.checked)} />}
            label="Put each repetition on a new line"
          />
        </Box>

        <Button variant="contained" onClick={handleRepeat} fullWidth size="large">
          Repeat Text
        </Button>
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
          placeholder="Repeated text will appear here..."
        />
      </Box>
    </Box>
  );
};

const TextRepeater = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Text Repeater?</Typography>
      <Typography variant="body1">
        Simply type the word or phrase you want to duplicate, enter the number of times you want it repeated, and select your formatting preference (adding spaces or new lines). Click "Repeat Text" to generate the string.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Testing:</strong> Generate dummy text blocks for UI or database testing.</li>
          <li><strong>Formatting:</strong> Create decorative dividers by repeating characters like <code>-</code> or <code>*</code>.</li>
          <li><strong>Messaging:</strong> Spam a phrase or create meme text quickly.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Repeating &quot;ha&quot; 5 times with spaces produces &quot;ha ha ha ha ha&quot;.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I use this as a name multiplier or sentence multiplier?</Typography>
      <Typography variant="body1">
        Yes — this tool works as a general text multiplier, so it doubles as a name multiplier (repeating a
        single name many times) or a sentence multiplier (repeating a full sentence). Just type the name or
        sentence in the input box and set how many times to multiply text.
      </Typography>
      <Typography variant="h3">Is there a limit to how many times I can repeat text?</Typography>
      <Typography variant="body1">
        The tool supports very high repeat counts, though extremely large outputs may take a moment to render
        in your browser.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/text-tools/text-repeater"
      content={content}
    >
      <TextRepeaterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextRepeater;
