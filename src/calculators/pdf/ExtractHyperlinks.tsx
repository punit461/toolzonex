'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, List, ListItem, ListItemText, Chip, CircularProgress, Snackbar } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface LinkInfo {
  url: string;
  pageNumber: number;
}

const ExtractHyperlinksContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [links, setLinks] = useState<LinkInfo[] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleExtract = async () => {
    setError('');
    setLinks(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdf = await loadPdfJsDocument(bytes);
      const found: LinkInfo[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const annotations = await page.getAnnotations();
        for (const annotation of annotations) {
          if (annotation.subtype !== 'Link') continue;
          const url: string | undefined = annotation.url || annotation.unsafeUrl;
          if (!url) continue;
          found.push({ url, pageNumber: i });
        }
      }

      setLinks(found);
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    if (!links || links.length === 0) return;
    await navigator.clipboard.writeText(links.map((l) => l.url).join('\n'));
    setCopied(true);
  };

  const handleDownload = () => {
    if (!links || links.length === 0 || !file) return;
    const text = links.map((l) => `Page ${l.pageNumber}: ${l.url}`).join('\n');
    const bytes = new TextEncoder().encode(text);
    downloadBytes(bytes, file.name.replace(/\.pdf$/i, '') + '-hyperlinks.txt', 'text/plain');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setLinks(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Extracting Links...</> : 'Extract Hyperlinks'}
      </Button>

      {links && (
        <Box sx={{ mt: 3 }}>
          {links.length === 0 ? (
            <Alert severity="info">No hyperlinks were found in this PDF.</Alert>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Found {links.length} hyperlink{links.length !== 1 ? 's' : ''}
              </Typography>
              <List sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200', maxHeight: 400, overflow: 'auto' }}>
                {links.map((link, i) => (
                  <ListItem key={`${link.url}-${i}`} divider>
                    <Chip label={`Page ${link.pageNumber}`} size="small" sx={{ mr: 2 }} />
                    <ListItemText primary={<Typography variant="body2" sx={{ wordBreak: 'break-all' }}>{link.url}</Typography>} />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                <Button variant="outlined" onClick={handleCopy}>Copy All Links</Button>
                <Button variant="outlined" onClick={handleDownload}>Download as .txt</Button>
              </Box>
            </>
          )}
        </Box>
      )}

      <Snackbar open={copied} autoHideDuration={2500} onClose={() => setCopied(false)} message="Copied to clipboard" />
    </Box>
  );
};

const ExtractHyperlinks = () => {
  const content = (
    <>
      <Typography variant="h2">How to Extract Hyperlinks from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to scan for links.</li>
          <li>Click <strong>Extract Hyperlinks</strong> — every clickable web link on every page is listed, along
            with the page it appears on.</li>
          <li>Use <strong>Copy All Links</strong> to paste them elsewhere, or <strong>Download as .txt</strong> to save the list.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20-page report with footnote links to sources produces a list like &quot;Page 3: https://example.com/source-1&quot;,
        &quot;Page 7: https://example.com/source-2&quot;, and so on — every URL embedded as a clickable annotation,
        pulled out in one pass instead of clicking through the whole document.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Auditing all outbound links in a PDF before publishing or sharing it.</li>
          <li>Pulling reference URLs out of an academic paper or report without clicking each one.</li>
          <li>Checking for broken or outdated links across a large PDF document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this find plain-text URLs too?</strong> No — only clickable link annotations embedded in the PDF are detected. A URL written as plain text without a link annotation won&apos;t be picked up.</li>
          <li><strong>Does this include internal links (like a table of contents)?</strong> No — only links with an external web address (a URL) are listed; internal page-to-page jump links are skipped.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/extract-hyperlinks" content={content}>
      <ExtractHyperlinksContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractHyperlinks;
