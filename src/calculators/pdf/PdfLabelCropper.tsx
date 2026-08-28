'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, TextField, ToggleButton, ToggleButtonGroup, CircularProgress, Paper } from '@mui/material';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument, renderPageThumbnail, RenderedThumbnail } from './pdfThumbnails';

type CropPreset = 'top-half' | 'bottom-half' | 'custom';

interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PdfLabelCropperProps {
  /** Display name of the marketplace, e.g. "Meesho". */
  platformName: string;
  /** Appended to the downloaded filename, e.g. "meesho-label". */
  fileSuffix: string;
}

function getCropRectPts(preset: CropPreset, custom: { x: string; y: string; width: string; height: string }, pageWidth: number, pageHeight: number): CropRect {
  if (preset === 'top-half') return { x: 0, y: pageHeight / 2, width: pageWidth, height: pageHeight / 2 };
  if (preset === 'bottom-half') return { x: 0, y: 0, width: pageWidth, height: pageHeight / 2 };
  const x = Math.max(0, (parseFloat(custom.x) || 0) * 72);
  const y = Math.max(0, (parseFloat(custom.y) || 0) * 72);
  const width = Math.max(1, (parseFloat(custom.width) || 1) * 72);
  const height = Math.max(1, (parseFloat(custom.height) || 1) * 72);
  return { x, y, width: Math.min(width, Math.max(1, pageWidth - x)), height: Math.min(height, Math.max(1, pageHeight - y)) };
}

const PdfLabelCropper = ({ platformName, fileSuffix }: PdfLabelCropperProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preset, setPreset] = useState<CropPreset>('top-half');
  const [customX, setCustomX] = useState('0');
  const [customY, setCustomY] = useState('0');
  const [customWidth, setCustomWidth] = useState('4');
  const [customHeight, setCustomHeight] = useState('6');
  const [preview, setPreview] = useState<RenderedThumbnail | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const custom = { x: customX, y: customY, width: customWidth, height: customHeight };

  const loadPreview = async (f: File) => {
    try {
      const bytes = await readFileAsArrayBuffer(f);
      const pdf = await loadPdfJsDocument(bytes);
      const thumb = await renderPageThumbnail(pdf, 1, 320);
      setPreview(thumb);
    } catch {
      setPreview(null);
    }
  };

  const handleFiles = (files: File[]) => {
    const f = files[0] ?? null;
    setFile(f);
    setPreview(null);
    setError('');
    if (f) loadPreview(f);
  };

  const handleCrop = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      doc.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const rect = getCropRectPts(preset, custom, width, height);
        if (rect.width > 0 && rect.height > 0) {
          page.setCropBox(rect.x, rect.y, rect.width, rect.height);
        }
      });
      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + `-${fileSuffix}.pdf`);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  const overlayRect = preview ? getCropRectPts(preset, custom, preview.width, preview.height) : null;

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={handleFiles} label="PDF file" selectedNames={file ? [file.name] : []} />

      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Crop region</Typography>
        <ToggleButtonGroup value={preset} exclusive onChange={(_, v) => v !== null && setPreset(v)} fullWidth>
          <ToggleButton value="top-half">Top Half</ToggleButton>
          <ToggleButton value="bottom-half">Bottom Half</ToggleButton>
          <ToggleButton value="custom">Custom (inches)</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {preset === 'custom' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 2, mt: 2 }}>
          <TextField fullWidth type="number" label="X from left (in)" value={customX} onFocus={(e) => e.target.select()} onChange={(e) => setCustomX(e.target.value)} />
          <TextField fullWidth type="number" label="Y from bottom (in)" value={customY} onFocus={(e) => e.target.select()} onChange={(e) => setCustomY(e.target.value)} />
          <TextField fullWidth type="number" label="Width (in)" value={customWidth} onFocus={(e) => e.target.select()} onChange={(e) => setCustomWidth(e.target.value)} />
          <TextField fullWidth type="number" label="Height (in)" value={customHeight} onFocus={(e) => e.target.select()} onChange={(e) => setCustomHeight(e.target.value)} />
        </Box>
      )}

      {preview && overlayRect && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Preview of page 1 — the highlighted box is the area that will be kept on every page.
          </Typography>
          <Box sx={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.url} alt={`${platformName} label PDF preview`} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
            <Box
              sx={{
                position: 'absolute',
                border: '2px solid',
                borderColor: 'primary.main',
                bgcolor: 'rgba(25, 118, 210, 0.15)',
                left: `${(overlayRect.x / preview.width) * 100}%`,
                width: `${(overlayRect.width / preview.width) * 100}%`,
                top: `${((preview.height - overlayRect.y - overlayRect.height) / preview.height) * 100}%`,
                height: `${(overlayRect.height / preview.height) * 100}%`,
              }}
            />
          </Box>
        </Paper>
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleCrop} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Cropping...</> : `Crop ${platformName} Label & Download`}
      </Button>
    </Box>
  );
};

export default PdfLabelCropper;
