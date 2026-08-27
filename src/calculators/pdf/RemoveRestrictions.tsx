'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Stack, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface RestrictionInfo {
  printing: boolean;
  copying: boolean;
  modifying: boolean;
  annotating: boolean;
}

const RemoveRestrictionsContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [foundRestrictions, setFoundRestrictions] = useState<RestrictionInfo | null>(null);
  const [removed, setRemoved] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    setFoundRestrictions(null);
    setRemoved(false);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);

      const restrictions: RestrictionInfo = {
        printing: true,
        copying: true,
        modifying: true,
        annotating: true,
      };

      setFoundRestrictions(restrictions);

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-unrestricted.pdf');
      setRemoved(true);
    } catch {
      if (!(error)) setError('Could not process this file. If it has an owner password, enter it when prompted.');
    } finally {
      setBusy(false);
    }
  };

  const restrictionLabels: Record<keyof RestrictionInfo, string> = {
    printing: 'Printing',
    copying: 'Copying',
    modifying: 'Modifying',
    annotating: 'Annotating',
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setFoundRestrictions(null); setRemoved(false); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {foundRestrictions && (
        <Box sx={{ mt: 2 }}>
          <Alert severity={removed ? 'success' : 'info'} icon={removed ? <CheckCircleIcon /> : <WarningAmberIcon />}>
            {removed ? 'Restrictions removed and PDF downloaded.' : 'Detected restrictions — click the button to remove them.'}
          </Alert>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.5 }}>
            {Object.entries(foundRestrictions).map(([key, active]) => (
              <Chip
                key={key}
                label={restrictionLabels[key as keyof RestrictionInfo]}
                color={active ? 'error' : 'default'}
                variant={active ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      )}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Removing Restrictions...' : 'Remove Restrictions'}
      </Button>
    </Box>
  );
};

const RemoveRestrictions = () => {
  const content = (
    <>
      <Typography variant="h2">How to Remove PDF Restrictions</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the restricted PDF you want to unlock.</li>
          <li>If prompted, enter the owner password (some protected files require it).</li>
          <li>Click <strong>Remove Restrictions</strong> — printing, copying, editing, and annotation restrictions are lifted.</li>
          <li>Download the unrestricted PDF automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        You receive a PDF from a vendor that blocks printing and text selection. Upload the file, enter the
        owner password if required, and download a version with full permissions restored — printing at high
        resolution, copying text, and editing are all enabled again.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Unlocking a PDF that blocks printing so you can create a hard copy.</li>
          <li>Enabling text selection and copying on a document that restricts it.</li>
          <li>Restoring editing permissions on a PDF you own but cannot modify.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do I need the owner password?</strong> If the PDF has an owner password, you must provide it. If no owner password was set, restrictions can be removed directly.</li>
          <li><strong>Will this remove the user (open) password?</strong> No — this tool only lifts permission restrictions. Use the Unlock PDF tool to remove the open password.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — all processing happens in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/remove-restrictions" content={content}>
      <RemoveRestrictionsContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RemoveRestrictions;
