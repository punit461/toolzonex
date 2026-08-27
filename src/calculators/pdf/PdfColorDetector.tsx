'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, Paper, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface ColorEntry {
  hex: string;
  count: number;
  percent: number;
}

const PdfColorDetectorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [colors, setColors] = useState<ColorEntry[]>([]);
  const [totalPixels, setTotalPixels] = useState(0);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleDetect = async () => {
    setError('');
    setColors([]);
    setTotalPixels(0);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);

      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes.slice(0)) }).promise;

      const freq = new Map<string, number>();
      let total = 0;

      const pagesToSample = Math.min(pdf.numPages, 5);
      for (let i = 1; i <= pagesToSample; i++) {
        setProgress(`Analyzing page ${i} of ${pagesToSample}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create canvas context.');
        await page.render({ canvas, viewport }).promise;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const step = 4;
        for (let p = 0; p < data.length; p += 4 * step) {
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];
          const a = data[p + 3];
          if (a < 128) continue;
          const rr = Math.round(r / 32) * 32;
          const gg = Math.round(g / 32) * 32;
          const bb = Math.round(b / 32) * 32;
          const hex = '#' + [rr, gg, bb].map((v) => v.toString(16).padStart(2, '0')).join('');
          freq.set(hex, (freq.get(hex) ?? 0) + 1);
          total++;
        }
      }

      const sorted = [...freq.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([hex, count]) => ({ hex, count, percent: Math.round((count / total) * 1000) / 10 }));

      setColors(sorted);
      setTotalPixels(total);
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not analyze this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setColors([]); setTotalPixels(0); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleDetect} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />{progress || 'Analyzing...'}</> : 'Detect Colors'}
      </Button>

      {colors.length > 0 && (
        <Paper variant="outlined" sx={{ mt: 3, p: 2.5 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Top 5 Dominant Colors ({totalPixels.toLocaleString()} pixels sampled)</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {colors.map((c) => (
              <Box key={c.hex} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: c.hex, border: '1px solid', borderColor: 'divider', flexShrink: 0 }} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{c.hex.toUpperCase()}</Typography>
                    <Typography variant="body2" color="text.secondary">{c.percent}%</Typography>
                  </Box>
                  <Box sx={{ height: 6, bgcolor: 'grey.200', borderRadius: 3, mt: 0.5, overflow: 'hidden' }}>
                    <Box sx={{ height: '100%', width: `${c.percent}%`, bgcolor: c.hex, borderRadius: 3 }} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const PdfColorDetector = () => {
  const content = (
    <>
      <Typography variant="h2">How to Detect Colors in a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF whose color palette you want to identify.</li>
          <li>Click <strong>Detect Colors</strong> to sample pixels from up to 5 pages.</li>
          <li>View the top 5 dominant colors with their hex codes and percentage of total pixels.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company brochure is primarily white and dark blue. The color detector samples the first five pages
        and reports #ffffff at 62%, #003366 at 18%, #666666 at 9%, #cccccc at 7%, and #990000 at 4% — giving you a quick
        breakdown of the document&apos;s visual palette.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Identifying a brand&apos;s dominant colors from a PDF brochure or style guide.</li>
          <li>Checking whether a PDF uses too many colors for economical printing.</li>
          <li>Extracting a color palette from a design mockup to use in other assets.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why only up to 5 pages?</strong> Sampling every page in a large document would be slow. Five pages usually represent the overall palette well. Colors are quantized to 32-step buckets to group similar shades.</li>
          <li><strong>Does this detect text color?</strong> Yes — all visible pixels (text, backgrounds, images, graphics) are sampled, giving you the overall dominant colors across the entire visible content.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — analysis runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-color-detector" content={content}>
      <PdfColorDetectorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfColorDetector;
