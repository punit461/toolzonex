'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, List, ListItem, ListItemText, Chip, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPdfJsDocument } from './pdfThumbnails';

interface Attachment {
  name: string;
  content: Uint8Array;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const PdfAttachmentExtractorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [noAttachments, setNoAttachments] = useState(false);

  const handleExtract = async () => {
    setError('');
    setAttachments([]);
    setNoAttachments(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfDoc = await loadPdfJsDocument(bytes);
      const rawAttachments = await pdfDoc.getAttachments();

      if (!rawAttachments || Object.keys(rawAttachments).length === 0) {
        setNoAttachments(true);
        return;
      }

      const result: Attachment[] = [];
      for (const [name, att] of Object.entries(rawAttachments)) {
        if (att && 'content' in att) {
          result.push({ name, content: new Uint8Array(att.content as ArrayBuffer) });
        }
      }

      if (result.length === 0) {
        setNoAttachments(true);
      } else {
        setAttachments(result);
      }
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const handleDownloadAll = () => {
    for (const att of attachments) {
      downloadBytes(att.content, att.name, 'application/octet-stream');
    }
  };

  const handleDownloadSingle = (att: Attachment) => {
    downloadBytes(att.content, att.name, 'application/octet-stream');
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setAttachments([]); setNoAttachments(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Extracting...</> : 'Extract Attachments'}
      </Button>

      {noAttachments && (
        <Alert severity="info" sx={{ mt: 3 }}>
          This PDF does not contain any embedded file attachments. Attachments are files that the PDF creator chose to bundle inside the document.
        </Alert>
      )}

      {attachments.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {attachments.length} attachment{attachments.length !== 1 ? 's' : ''} found
          </Typography>
          <List dense sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
            {attachments.map((att, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <Button size="small" onClick={() => handleDownloadSingle(att)}>
                    Download
                  </Button>
                }
              >
                <ListItemText
                  primary={att.name}
                  secondary={<Chip label={formatSize(att.content.length)} size="small" />}
                />
              </ListItem>
            ))}
          </List>
          {attachments.length > 1 && (
            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleDownloadAll}>
              Download All
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

const PdfAttachmentExtractor = () => {
  const content = (
    <>
      <Typography variant="h2">How to Extract Attachments from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that contains embedded file attachments.</li>
          <li>Click <strong>Extract Attachments</strong> to list all embedded files.</li>
          <li>Download individual attachments or click <strong>Download All</strong> to save them at once.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A project submission PDF bundles a 2 MB spreadsheet and a 500 KB image as embedded attachments. This tool
        extracts both files, showing their names and sizes, and lets you download each one separately.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Recovering data files, images, or source code bundled inside a PDF report.</li>
          <li>Extracting supplementary materials attached to academic papers or government filings.</li>
          <li>Pulling embedded resources from PDFs created by design or engineering tools.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if no attachments are found?</strong> Not all PDFs contain attachments. Only files that were explicitly embedded by the PDF creator will appear here.</li>
          <li><strong>What file types can be extracted?</strong> Any file type that was embedded in the PDF — there is no restriction on format or extension.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-attachment-extractor" content={content}>
      <PdfAttachmentExtractorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfAttachmentExtractor;
