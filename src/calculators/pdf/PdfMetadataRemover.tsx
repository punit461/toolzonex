'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, List, ListItem, ListItemText } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const PdfMetadataRemoverContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [removed, setRemoved] = useState<string[]>([]);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleRemove = async () => {
    setError('');
    setRemoved([]);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      const stripped: string[] = [];
      if (doc.getTitle()) { doc.setTitle(''); stripped.push('Title'); }
      if (doc.getAuthor()) { doc.setAuthor(''); stripped.push('Author'); }
      if (doc.getSubject()) { doc.setSubject(''); stripped.push('Subject'); }
      if (doc.getKeywords()?.length) { doc.setKeywords([]); stripped.push('Keywords'); }
      if (doc.getCreator()) { doc.setCreator(''); stripped.push('Creator'); }
      if (doc.getProducer()) { doc.setProducer(''); stripped.push('Producer'); }
      if (doc.getCreationDate()) { doc.setCreationDate(new Date(0)); stripped.push('Creation Date'); }
      if (doc.getModificationDate()) { doc.setModificationDate(new Date(0)); stripped.push('Modification Date'); }

      if (stripped.length === 0) {
        setError('This PDF has no metadata to remove.');
        setBusy(false);
        return;
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-no-metadata.pdf');
      setRemoved(stripped);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setRemoved([]); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleRemove} disabled={busy || !file}>
        {busy ? 'Stripping Metadata...' : 'Remove All Metadata'}
      </Button>

      {removed.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Removed {removed.length} metadata field{removed.length !== 1 ? 's' : ''}. File downloaded.
          </Alert>
          <Typography variant="subtitle2" gutterBottom>Stripped fields:</Typography>
          <List dense sx={{ bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
            {removed.map((field) => (
              <ListItem key={field}>
                <ListItemText primary={field} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

const PdfMetadataRemover = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove PDF Metadata</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to clean.</li>
          <li>Click <strong>Remove All Metadata</strong> to strip every document property.</li>
          <li>Download the cleaned PDF with all metadata fields emptied.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A PDF exported from Microsoft Word might contain author name, company, creation date, and application
        version. After using this tool, all of that information is gone — the file is anonymous and safe to
        share externally.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Stripping personal information (author name, company) before publishing documents publicly.</li>
          <li>Removing creation timestamps that could reveal when a document was drafted.</li>
          <li>Cleaning PDFs before submitting them to competitions, exams, or anonymous reviews.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this affect the visible content of the PDF?</strong> No — only hidden metadata properties are removed. The pages, text, and images remain unchanged.</li>
          <li><strong>Can I undo this?</strong> No — once metadata is stripped, it cannot be recovered from the downloaded file. Keep a backup of the original if needed.</li>
          <li><strong>What about EXIF data from embedded images?</strong> This tool strips PDF-level metadata only. Image EXIF data within the PDF is not affected.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-metadata-remover" content={content}>
      <PdfMetadataRemoverContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfMetadataRemover;
