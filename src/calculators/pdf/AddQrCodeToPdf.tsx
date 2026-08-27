'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

const MM_TO_PT = 2.8346;

const AddQrCodeToPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState('');
  const [x, setX] = useState('10');
  const [y, setY] = useState('10');
  const [size, setSize] = useState('30');
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleAction = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!data.trim()) { setError('Enter the URL or text for the QR code.'); return; }
    const sizePt = (parseFloat(size) || 30) * MM_TO_PT;
    const xPt = (parseFloat(x) || 0) * MM_TO_PT;
    const yPt = (parseFloat(y) || 0) * MM_TO_PT;
    setBusy(true);
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data.trim())}`;
      const qrResp = await fetch(qrUrl);
      if (!qrResp.ok) throw new Error('qr-failed');
      const qrBytes = new Uint8Array(await qrResp.arrayBuffer());

      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const png = await doc.embedPng(qrBytes);

      for (const page of doc.getPages()) {
        page.drawImage(png, { x: xPt, y: yPt, width: sizePt, height: sizePt });
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-qr.pdf');
    } catch (e) {
      if (e instanceof Error && e.message === 'qr-failed') {
        setError('Could not generate the QR code. Check your connection and try again.');
      } else if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally { setBusy(false); }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => setFile(files[0] ?? null)} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="QR code content (URL or text)"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="https://example.com"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, gap: 2 }}>
          <TextField label="X (mm)" type="number" value={x} onChange={(e) => setX(e.target.value)} helperText="from left" />
          <TextField label="Y (mm)" type="number" value={y} onChange={(e) => setY(e.target.value)} helperText="from bottom" />
          <TextField label="Size (mm)" type="number" value={size} onChange={(e) => setSize(e.target.value)} />
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Adding QR Code...' : 'Add QR Code to All Pages'}
      </Button>
    </Box>
  );
};

const AddQrCodeToPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Add a QR Code to a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to add a QR code to.</li>
          <li>Enter the URL or text the QR code should encode, then set its position (X, Y in mm from the bottom-left) and size.</li>
          <li>Click <strong>Add QR Code to All Pages</strong> &mdash; the same QR image is drawn on every page.</li>
          <li>Download the PDF; each page now carries a scannable QR code.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A brochure PDF gets a QR code encoding &quot;https://example.com/offer&quot; placed 10&nbsp;mm from the bottom-left corner at 30&nbsp;mm square.
        Recipients scanning any page are taken straight to the offer link.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Linking a printed report or flyer to a website, form, or landing page.</li>
          <li>Adding a contact-card or Wi-Fi QR code to handouts.</li>
          <li>Embedding a tracking or verification link on every page of a document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is the same QR code on every page?</strong> Yes &mdash; the content you enter is encoded once and placed at the same spot on each page.</li>
          <li><strong>Does this need an internet connection?</strong> The QR image is generated by an external QR service, so you need to be online when you click the button. The PDF itself is never uploaded.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No &mdash; only the QR text is sent to the QR generation service; your PDF is processed in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/add-qr-code-to-pdf" content={content}>
      <AddQrCodeToPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AddQrCodeToPdf;
