'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Chip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { loadPossiblyEncrypted } from './pdfEncryption';

interface CheckResult {
  encrypted: boolean;
  fileName: string;
  fileSize: string;
  pageCount: number;
}

const PdfPasswordStrengthCheckerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleCheck = async () => {
    setError('');
    setResult(null);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const loadResult = await loadPossiblyEncrypted(bytes);
      if ('needsPassword' in loadResult) {
        setResult({
          encrypted: true,
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          pageCount: 0,
        });
      } else {
        setResult({
          encrypted: false,
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          pageCount: loadResult.doc.getPageCount(),
        });
      }
    } catch {
      setError('Could not read this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setResult(null); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {result && (
        <Box sx={{ mt: 3, p: 3, borderRadius: 2, bgcolor: 'grey.50', border: '1px solid', borderColor: 'grey.300' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            {result.encrypted
              ? <LockIcon color="warning" />
              : <LockOpenIcon color="success" />}
            <Typography variant="h3">{result.fileName}</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
            <Chip
              label={result.encrypted ? 'Password-Protected' : 'Not Password-Protected'}
              color={result.encrypted ? 'warning' : 'success'}
              variant="outlined"
            />
            <Chip label={`Size: ${result.fileSize}`} variant="outlined" />
            {result.pageCount > 0 && <Chip label={`${result.pageCount} page${result.pageCount !== 1 ? 's' : ''}`} variant="outlined" />}
          </Box>

          <Typography variant="body2" color="text.secondary">
            {result.encrypted
              ? 'This PDF requires a password to open or modify its contents. You will need to enter the correct password before any editing tools can process it.'
              : 'This PDF is not password-protected and can be opened, edited, and shared freely without a password.'}
          </Typography>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCheck} disabled={busy || !file}>
        {busy ? 'Checking...' : 'Check Password Protection'}
      </Button>
    </Box>
  );
};

const PdfPasswordStrengthChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Check if a PDF Is Password-Protected</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to check.</li>
          <li>Click <strong>Check Password Protection</strong> to detect whether the file is encrypted.</li>
          <li>The tool also shows the file size and page count for quick reference.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A financial report downloaded from a bank&apos;s website might be encrypted to prevent unauthorized
        access. Uploading it here instantly tells you whether a password is required before you can
        edit or merge it with other documents.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a PDF received via email is password-protected before trying to open it in an editor.</li>
          <li>Verifying that sensitive documents are properly encrypted before sharing.</li>
          <li>Determining why a PDF tool reports an encryption error when processing a file.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this tool crack or remove passwords?</strong> No — it only detects whether a PDF is encrypted. It cannot bypass or remove password protection.</li>
          <li><strong>What if the file is corrupted?</strong> If the PDF structure is damaged, the tool will report that it could not read the file. Try re-downloading or re-exporting the original.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — detection happens entirely in your browser; the PDF never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-password-strength-checker" content={content}>
      <PdfPasswordStrengthCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfPasswordStrengthChecker;
