'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import LineNumberedTextarea from '../../components/ui/LineNumberedTextarea';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const OnlineNotepad = () => {
  const [text, setText] = useState<string>('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('calcbharat_notepad');
    if (saved) {
      setText(saved);
    }
  }, []);

  // Save to local storage on change
  const handleChange = (val: string) => {
    setText(val);
    localStorage.setItem('calcbharat_notepad', val);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setToastMsg('Text copied to clipboard!');
    setToastOpen(true);
  };

  const handleClear = () => {
    setText('');
    localStorage.removeItem('calcbharat_notepad');
    setToastMsg('Notepad cleared.');
    setToastOpen(true);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "notes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  const content = (
    <>
      <Typography variant="h2">Free Online Notepad</Typography>
      <Typography variant="body1">
        This is a simple, fast, and free online text editor that works directly in your browser. It requires no login, and we don't save your notes on our servers.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Start typing in the text area — your notes save automatically to your browser as you go, no account or
        setup required.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Jot down a quick to-do list or meeting notes, close the tab, and reopen the page later — your text is
        still there.
      </Typography>

      <Typography variant="h2">Features</Typography>
      <ul>
        <li><strong>Auto-Save:</strong> Your text is automatically saved to your browser's local storage. Even if you accidentally close the tab or refresh the page, your notes will still be here when you return.</li>
        <li><strong>Privacy First:</strong> Everything you type stays on your device. We do not transmit your notes to any external database.</li>
        <li><strong>Word & Character Count:</strong> Instantly see how long your text is at the bottom of the editor.</li>
        <li><strong>Line Numbers:</strong> Every line is numbered on the left, making it easy to reference or count lines in lists, code, or scripts.</li>
        <li><strong>One-Click Download:</strong> Export your notes as a standard `.txt` file to your computer instantly.</li>
      </ul>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Jotting down quick notes without creating an account or opening a heavy app.</li>
          <li>Drafting text before pasting it into an email or document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Will I lose my notes if I close the tab?</Typography>
      <Typography variant="body1">
        No — your text is auto-saved to your browser&apos;s local storage, so it&apos;s still there when you
        come back, as long as you use the same browser and device.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/online-notepad"
      content={content}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'flex-end' }}>
          <Button startIcon={<ContentCopyIcon />} variant="outlined" onClick={handleCopy}>
            Copy
          </Button>
          <Button startIcon={<DownloadIcon />} variant="outlined" onClick={handleDownload}>
            Save .txt
          </Button>
          <Button startIcon={<DeleteIcon />} color="error" variant="outlined" onClick={handleClear}>
            Clear
          </Button>
        </Box>

        <LineNumberedTextarea
          value={text}
          onChange={handleChange}
          placeholder="Start typing your notes here..."
          minRows={15}
          maxRows={30}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary', px: 1 }}>
          <Typography variant="body2">{wordCount} Words</Typography>
          <Typography variant="body2">{charCount} Characters</Typography>
        </Box>
      </Box>

      <Snackbar 
        open={toastOpen} 
        autoHideDuration={3000} 
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
          {toastMsg}
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default OnlineNotepad;
