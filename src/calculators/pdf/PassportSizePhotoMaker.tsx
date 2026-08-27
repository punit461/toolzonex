'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PDFDocument } from '@cantoo/pdf-lib';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';

const MM_TO_PT = 2.8346;
const DPI = 300;

const STANDARDS: Record<string, { label: string; w: number; h: number }> = {
  us: { label: 'US (2 × 2 in / 51 × 51 mm)', w: 50.8, h: 50.8 },
  india: { label: 'India (3.5 × 4.5 cm)', w: 35, h: 45 },
  uk: { label: 'UK (35 × 45 mm)', w: 35, h: 45 },
};

const PassportSizePhotoMakerContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [standard, setStandard] = useState('us');
  const [copies, setCopies] = useState<number>(0);

  const buildPhoto = async (img: HTMLImageElement, wMm: number, hMm: number): Promise<Uint8Array> => {
    const targetW = Math.round((wMm / 25.4) * DPI);
    const targetH = Math.round((hMm / 25.4) * DPI);
    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('canvas-failed');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
    const imgRatio = img.width / img.height;
    const targetRatio = targetW / targetH;
    let sw = img.width;
    let sh = img.height;
    let sx = 0;
    let sy = 0;
    if (imgRatio > targetRatio) {
      sw = img.height * targetRatio;
      sx = (img.width - sw) / 2;
    } else {
      sh = img.width / targetRatio;
      sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('blob-failed');
    return new Uint8Array(await blob.arrayBuffer());
  };

  const handleAction = async () => {
    setError('');
    setCopies(0);
    if (!file) { setError('Choose a photo (JPG or PNG) first.'); return; }
    setBusy(true);
    try {
      const std = STANDARDS[standard];
      const bytes = await readFileAsArrayBuffer(file);
      const url = URL.createObjectURL(new Blob([bytes], { type: file.type || 'image/png' }));
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error('image-failed'));
        el.src = url;
      });
      URL.revokeObjectURL(url);

      const pngBytes = await buildPhoto(img, std.w, std.h);

      const sheetW = 4 * 72;
      const sheetH = 6 * 72;
      const photoW = std.w * MM_TO_PT;
      const photoH = std.h * MM_TO_PT;
      const cols = Math.max(1, Math.floor(sheetW / photoW));
      const rows = Math.max(1, Math.floor(sheetH / photoH));
      const total = cols * rows;
      const startX = (sheetW - cols * photoW) / 2;
      const startY = (sheetH - rows * photoH) / 2;

      const doc = await PDFDocument.create();
      const page = doc.addPage([sheetW, sheetH]);
      const png = await doc.embedPng(pngBytes);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          page.drawImage(png, {
            x: startX + c * photoW,
            y: startY + r * photoH,
            width: photoW,
            height: photoH,
          });
        }
      }
      setCopies(total);
      const output = await doc.save();
      downloadBytes(output, `passport-photos-${standard}.pdf`);
    } catch (e) {
      if (e instanceof Error && ['canvas-failed', 'blob-failed', 'image-failed'].includes(e.message)) {
        setError('Could not read this image. Use a standard JPG or PNG photo.');
      } else {
        setError('Could not process this file.');
      }
    } finally { setBusy(false); }
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setCopies(0); }} label="Photo (JPG/PNG)" selectedNames={file ? [file.name] : []} accept="image/*" />

      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="psp-standard">Passport size standard</InputLabel>
          <Select labelId="psp-standard" label="Passport size standard" value={standard} onChange={(e) => setStandard(e.target.value)}>
            {Object.entries(STANDARDS).map(([key, s]) => (
              <MenuItem key={key} value={key}>{s.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          The photo is center-cropped to the chosen aspect ratio and printed {copies > 0 ? copies : ''} times on a 4 × 6 inch sheet.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleAction} disabled={busy || !file}>
        {busy ? 'Creating Photos...' : 'Make Passport Photos'}
      </Button>
    </Box>
  );
};

const PassportSizePhotoMaker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Make a Passport Size Photo</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a clear headshot (JPG or PNG) on a plain background.</li>
          <li>Choose the passport size standard: US (2 × 2 in), India (3.5 × 4.5 cm), or UK (35 × 45 mm).</li>
          <li>Click <strong>Make Passport Photos</strong> &mdash; your photo is cropped to the exact ratio and tiled onto a 4 × 6 inch printable sheet.</li>
          <li>Download the PDF and print it at a photo lab or on glossy paper.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1200 &times; 1600 phone selfie is center-cropped to the US 2 × 2 inch square and repeated eight times on a single
        4 × 6 inch sheet. Printing that one sheet gives you eight identical passport photos for the price of a single print.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Producing multiple passport photos cheaply by printing one sheet at a photo kiosk.</li>
          <li>Generating the correct photo size for visa or ID applications in different countries.</li>
          <li>Making a properly cropped, white-background photo without desktop software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does it keep my exact photo?</strong> The tool center-crops to the target aspect ratio, so the edges of your image may be trimmed to fit the standard. Use a well-framed headshot.</li>
          <li><strong>How many photos fit on a sheet?</strong> It depends on the standard, but a 4 × 6 inch sheet typically holds 6&ndash;8 photos, which the tool arranges automatically.</li>
          <li><strong>Is my photo uploaded anywhere?</strong> No &mdash; cropping and PDF creation happen entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/passport-size-photo-maker" content={content}>
      <PassportSizePhotoMakerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PassportSizePhotoMaker;
