'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface PdfInfo {
  fileName: string;
  bytes: number;
  kilobytes: string;
  megabytes: string;
  pageCount: number;
  title: string | null;
  author: string | null;
  subject: string | null;
  creator: string | null;
  producer: string | null;
}

const PdfFileSizeViewerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState<PdfInfo | null>(null);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleCheck = async () => {
    setError('');
    setInfo(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      setInfo({
        fileName: file.name,
        bytes: file.size,
        kilobytes: (file.size / 1024).toFixed(1),
        megabytes: (file.size / (1024 * 1024)).toFixed(2),
        pageCount: doc.getPageCount(),
        title: doc.getTitle() || null,
        author: doc.getAuthor() || null,
        subject: doc.getSubject() || null,
        creator: doc.getCreator() || null,
        producer: doc.getProducer() || null,
      });
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setInfo(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {info && (
        <Box sx={{ mt: 3, p: 3, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.300' }}>
          <Typography variant="h3" gutterBottom>{info.fileName}</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mt: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">File Size (bytes)</Typography>
              <Typography variant="body1">{info.bytes.toLocaleString()} bytes</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">File Size (KB / MB)</Typography>
              <Typography variant="body1">{info.kilobytes} KB &middot; {info.megabytes} MB</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Pages</Typography>
              <Typography variant="body1">{info.pageCount}</Typography>
            </Box>
            {info.title && (
              <Box>
                <Typography variant="body2" color="text.secondary">Title</Typography>
                <Typography variant="body1">{info.title}</Typography>
              </Box>
            )}
            {info.author && (
              <Box>
                <Typography variant="body2" color="text.secondary">Author</Typography>
                <Typography variant="body1">{info.author}</Typography>
              </Box>
            )}
            {info.subject && (
              <Box>
                <Typography variant="body2" color="text.secondary">Subject</Typography>
                <Typography variant="body1">{info.subject}</Typography>
              </Box>
            )}
            {info.creator && (
              <Box>
                <Typography variant="body2" color="text.secondary">Creator</Typography>
                <Typography variant="body1">{info.creator}</Typography>
              </Box>
            )}
            {info.producer && (
              <Box>
                <Typography variant="body2" color="text.secondary">Producer</Typography>
                <Typography variant="body1">{info.producer}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCheck} disabled={busy || !file}>
        {busy ? 'Analyzing...' : 'Check File Info'}
      </Button>
    </Box>
  );
};

const PdfFileSizeViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check PDF File Size &amp; Info</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>Check File Info</strong> to see the file size in bytes, KB, and MB, the page count, and any embedded metadata such as title, author, creator, and producer.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 12-page marketing brochure might show a file size of 2.45 MB (2,569,216 bytes), with the title
        &quot;Q4 Marketing Plan&quot; and author &quot;Acme Corp&quot; in the metadata — helpful for verifying that
        the correct version is being shared.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking if a PDF is small enough to attach to an email before sending.</li>
          <li>Verifying document metadata to confirm the title, author, or which application produced the file.</li>
          <li>Comparing file sizes before and after compressing a PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why is the metadata empty?</strong> Not all PDFs include title, author, or other metadata fields — the tool only displays metadata that was embedded in the file by its creator.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all analysis happens entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/pdf-file-size-viewer"
      content={content}
    >
      <PdfFileSizeViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfFileSizeViewer;
