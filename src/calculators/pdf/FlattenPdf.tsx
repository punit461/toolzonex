'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

const FlattenPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [fieldCount, setFieldCount] = useState<number | null>(null);

  const handleFlatten = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await PDFDocument.load(bytes);
      const form = doc.getForm();
      const fields = form.getFields();
      setFieldCount(fields.length);

      if (fields.length === 0) {
        setError('This PDF has no fillable form fields to flatten.');
        setBusy(false);
        return;
      }

      form.flatten();
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-flattened.pdf');
    } catch (e) {
      setError('Could not flatten this file. Make sure it is a valid, non-password-protected PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setFieldCount(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {fieldCount !== null && fieldCount > 0 && (
        <Alert severity="success" sx={{ mt: 2 }}>Found {fieldCount} form field(s). Flattening now.</Alert>
      )}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleFlatten} disabled={busy || !file}>
        {busy ? 'Flattening...' : 'Flatten PDF'}
      </Button>
    </Box>
  );
};

const FlattenPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Flatten a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a PDF that has fillable form fields, with the fields already filled in as needed.</li>
          <li>Click <strong>Flatten PDF</strong> — the filled-in values are merged into the page content.</li>
          <li>Download the flattened PDF, where the form fields are no longer editable.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A filled-out application form with text fields and checkboxes, once flattened, looks identical but the
        fields can no longer be edited or tabbed through — the entered values become permanent page content.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Locking a filled-out form before sending it, so recipients can&apos;t accidentally change answers.</li>
          <li>Preparing a form for archival where the values shouldn&apos;t be editable.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What if my PDF has no form fields?</strong> There&apos;s nothing to flatten — the tool will tell you no fields were found.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — flattening happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/tools/flatten-pdf"
      content={content}
    >
      <FlattenPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FlattenPdf;
