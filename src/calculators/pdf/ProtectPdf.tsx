'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Stack, Checkbox, FormControlLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const ProtectPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [userPwd, setUserPwd] = useState('');
  const [ownerPwd, setOwnerPwd] = useState('');
  const [denyPrint, setDenyPrint] = useState(false);
  const [denyCopy, setDenyCopy] = useState(false);
  const [denyModify, setDenyModify] = useState(true);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleProtect = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!userPwd && !ownerPwd) { setError('Enter at least one password (user or owner).'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      doc.encrypt({
        userPassword: userPwd || undefined,
        ownerPassword: ownerPwd || userPwd || undefined,
        permissions: {
          printing: denyPrint ? 'lowResolution' : 'highResolution',
          modifying: !denyModify,
          copying: !denyCopy,
          annotating: !denyModify,
        },
      });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-protected.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not protect this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Stack spacing={2} sx={{ mt: 3 }}>
        <TextField
          label="User Password (required to open)"
          type="password"
          value={userPwd}
          onChange={(e) => setUserPwd(e.target.value)}
          fullWidth
          helperText="Recipients need this password to open the PDF."
        />
        <TextField
          label="Owner Password (optional — controls permissions)"
          type="password"
          value={ownerPwd}
          onChange={(e) => setOwnerPwd(e.target.value)}
          fullWidth
          helperText="Set separately to restrict printing/editing while allowing viewing."
        />
        <Box>
          <Typography variant="subtitle2" gutterBottom>Restrictions</Typography>
          <FormControlLabel
            control={<Checkbox checked={denyPrint} onChange={(e) => setDenyPrint(e.target.checked)} />}
            label="Deny printing"
          />
          <FormControlLabel
            control={<Checkbox checked={denyCopy} onChange={(e) => setDenyCopy(e.target.checked)} />}
            label="Deny copying text/images"
          />
          <FormControlLabel
            control={<Checkbox checked={denyModify} onChange={(e) => setDenyModify(e.target.checked)} />}
            label="Deny modifying the document"
          />
        </Box>
      </Stack>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleProtect} disabled={busy || !file}>
        {busy ? 'Encrypting...' : 'Protect PDF'}
      </Button>
    </Box>
  );
};

const ProtectPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Password-Protect a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to protect.</li>
          <li>Set a <strong>user password</strong> — anyone who opens the file must enter it.</li>
          <li>Optionally set a separate <strong>owner password</strong> to control permissions like printing and editing.</li>
          <li>Choose which restrictions to apply, then click <strong>Protect PDF</strong>.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You want to send a contract to a client but prevent them from editing it. Set an owner password with
        &quot;Deny modifying&quot; checked and no user password — the client can open and read the file freely but
        cannot make changes in most PDF viewers.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Encrypting confidential reports before emailing them to colleagues.</li>
          <li>Preventing unauthorized copying of copyrighted material in a PDF.</li>
          <li>Restricting printing of sensitive financial or legal documents.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is the difference between user and owner passwords?</strong> A user password is required to open the file at all. An owner password only restricts what viewers can do (print, copy, edit) — the file opens without it.</li>
          <li><strong>Are the restrictions enforced everywhere?</strong> Most mainstream PDF readers respect these flags, but they are not unbreakable encryption. For maximum security, use a strong user password.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — encryption happens entirely in your browser. The file never leaves your device.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/protect-pdf" content={content}>
      <ProtectPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ProtectPdf;
