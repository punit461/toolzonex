'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, List, ListItem, ListItemText } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface MetaEntry {
  key: string;
  value: string;
}

const PdfMetadataViewerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [meta, setMeta] = useState<MetaEntry[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleView = async () => {
    setError('');
    setMeta(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      setPageCount(doc.getPageCount());

      const entries: MetaEntry[] = [
        { key: 'Title', value: doc.getTitle() || '(Not set)' },
        { key: 'Author', value: doc.getAuthor() || '(Not set)' },
        { key: 'Subject', value: doc.getSubject() || '(Not set)' },
        { key: 'Creator', value: doc.getCreator() || '(Not set)' },
        { key: 'Producer', value: doc.getProducer() || '(Not set)' },
        { key: 'Keywords', value: doc.getKeywords() || '(Not set)' },
        { key: 'Creation Date', value: doc.getCreationDate()?.toLocaleString() || '(Not set)' },
        { key: 'Modification Date', value: doc.getModificationDate()?.toLocaleString() || '(Not set)' },
      ];
      setMeta(entries);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setMeta(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleView} disabled={busy || !file}>
        {busy ? 'Reading...' : 'View Metadata'}
      </Button>

      {meta && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="success" sx={{ mb: 2 }}>Found {pageCount} page{pageCount !== 1 ? 's' : ''} in this document.</Alert>
          <List sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
            {meta.map((entry) => (
              <ListItem key={entry.key} divider>
                <ListItemText
                  primary={<Typography variant="caption" color="text.secondary" fontWeight={600}>{entry.key}</Typography>}
                  secondary={<Typography variant="body2">{entry.value}</Typography>}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

const PdfMetadataViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to View PDF Metadata</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to inspect.</li>
          <li>Click <strong>View Metadata</strong> to extract all document properties.</li>
          <li>Review the title, author, creation date, and other embedded properties.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A contract PDF might show author &quot;Legal Dept&quot;, creation date &quot;15 January 2025&quot;, and keywords
        &quot;NDA, confidential, agreement&quot; — all the properties embedded by the software that created the document.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking who created or modified a PDF before accepting it as official.</li>
          <li>Verifying the creation date of a document for legal or compliance purposes.</li>
          <li>Finding hidden keywords or subjects in a PDF you received from someone else.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if a field shows &quot;(Not set)&quot;?</strong> That metadata field was never populated by the PDF creator. Many PDFs only have partial metadata.</li>
          <li><strong>Does this modify my PDF?</strong> No — this is a read-only viewer. Your original file stays exactly as it is.</li>
          <li><strong>What if the PDF is password-protected?</strong> You will be prompted to enter the password. Everything runs in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-metadata-viewer" content={content}>
      <PdfMetadataViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfMetadataViewer;
