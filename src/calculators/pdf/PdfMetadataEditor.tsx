'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const PdfMetadataEditorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState('');
  const [creator, setCreator] = useState('');
  const [producer, setProducer] = useState('');

  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleLoad = async () => {
    setError('');
    setSuccess('');
    setLoaded(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      setTitle(doc.getTitle() || '');
      setAuthor(doc.getAuthor() || '');
      setSubject(doc.getSubject() || '');
      setKeywords(doc.getKeywords() || '');
      setCreator(doc.getCreator() || '');
      setProducer(doc.getProducer() || '');
      setLoaded(true);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not read this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    if (!file) return;
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      doc.setTitle(title);
      doc.setAuthor(author);
      doc.setSubject(subject);
      const kwArray = keywords.split(',').map((k) => k.trim()).filter(Boolean);
      doc.setKeywords(kwArray);
      doc.setCreator(creator);
      doc.setProducer(producer);

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-metadata-edited.pdf');
      setSuccess('Metadata updated and file downloaded.');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not save this file.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setLoaded(false); setSuccess(''); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {!loaded && (
        <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleLoad} disabled={busy || !file}>
          {busy ? 'Reading...' : 'Load Metadata'}
        </Button>
      )}

      {loaded && (
        <Stack spacing={2} sx={{ mt: 3 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth />
          <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth />
          <TextField label="Keywords (comma-separated)" value={keywords} onChange={(e) => setKeywords(e.target.value)} fullWidth />
          <TextField label="Creator" value={creator} onChange={(e) => setCreator(e.target.value)} fullWidth />
          <TextField label="Producer" value={producer} onChange={(e) => setProducer(e.target.value)} fullWidth />
          <Button variant="contained" size="large" fullWidth onClick={handleSave} disabled={busy}>
            {busy ? 'Saving...' : 'Save & Download'}
          </Button>
        </Stack>
      )}

      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

const PdfMetadataEditor = () => {
  const content = (
    <>
      <Typography variant="h2">How to Edit PDF Metadata</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to edit.</li>
          <li>Click <strong>Load Metadata</strong> to read the current properties.</li>
          <li>Modify any field — title, author, subject, keywords, creator, or producer.</li>
          <li>Click <strong>Save &amp; Download</strong> to get the updated PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You received a report with author &quot;Unknown&quot; and no title. After loading the metadata, you change the
        title to &quot;Q4 Sales Report&quot;, set the author to your name, and add keywords &quot;sales, quarterly, 2025&quot; —
        the downloaded PDF now has all the correct properties.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Filling in missing title and author fields before publishing a PDF online.</li>
          <li>Updating keywords so your PDF is more discoverable in document management systems.</li>
          <li>Replacing generic creator/producer info left by the original authoring tool.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will this change the visible content of the PDF?</strong> No — only the document properties (metadata) are modified. The pages, text, and images stay the same.</li>
          <li><strong>Can I clear a field entirely?</strong> Yes — just delete the text in the field and save. The field will be set to empty.</li>
          <li><strong>What if the PDF is password-protected?</strong> You will be prompted to enter the password before editing. Everything runs in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-metadata-editor" content={content}>
      <PdfMetadataEditorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfMetadataEditor;
