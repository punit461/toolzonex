'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { loadPossiblyEncrypted, loadWithPassword } from './pdfEncryption';

const UnlockPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(false);
  const fileBytesRef = useState<ArrayBuffer | null>(null);
  const fileBytes = fileBytesRef[0];

  const handleUpload = async () => {
    setError('');
    setNeedsPassword(false);
    setPassword('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      fileBytesRef[1](bytes);
      const result = await loadPossiblyEncrypted(bytes);
      if ('needsPassword' in result) {
        setNeedsPassword(true);
        setBusy(false);
        return;
      }
      const output = await result.doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-unlocked.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleUnlock = async () => {
    setError('');
    if (!fileBytes || !password) return;
    setChecking(true);
    try {
      const doc = await loadWithPassword(fileBytes, password);
      const output = await doc.save();
      downloadBytes(output, file!.name.replace(/\.pdf$/i, '') + '-unlocked.pdf');
      setNeedsPassword(false);
    } catch {
      setError('Incorrect password. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setNeedsPassword(false); setPassword(''); setError(''); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {!needsPassword && (
        <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleUpload} disabled={busy || !file}>
          {busy ? 'Processing...' : 'Unlock PDF'}
        </Button>
      )}

      {needsPassword && (
        <Box sx={{ mt: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>This PDF is password-protected. Enter the password to unlock it.</Alert>
          <TextField
            autoFocus
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleUnlock(); }}
          />
          <Button variant="contained" size="large" fullWidth sx={{ mt: 2 }} onClick={handleUnlock} disabled={checking || !password}>
            {checking ? 'Unlocking...' : 'Unlock & Download'}
          </Button>
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

const UnlockPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Unlock a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the encrypted PDF file.</li>
          <li>If the file requires a password, enter it when prompted.</li>
          <li>Click <strong>Unlock &amp; Download</strong> to save a password-free version.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You received a password-protected invoice from a vendor but lost the email with the password. Once you
        have the password, this tool strips it so you can open the PDF in any viewer without being prompted each time.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Removing the open-password from PDFs you access frequently so you are not prompted every time.</li>
          <li>Unlocking PDFs that were password-protected by an old version of Adobe Acrobat.</li>
          <li>Merging a previously encrypted PDF with other files after removing its password.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do I need to know the password?</strong> Yes — you must provide the correct password. This tool does not bypass or crack encryption.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — everything runs in your browser. The file and password never leave your device.</li>
          <li><strong>Will this remove owner-password restrictions too?</strong> Yes — saving the document after loading with the user password produces a fully unrestricted PDF.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/unlock-pdf" content={content}>
      <UnlockPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnlockPdf;
