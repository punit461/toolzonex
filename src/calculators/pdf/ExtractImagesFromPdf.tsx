'use client';

import { useState, useCallback } from 'react';
import { Box, Typography, Button, Alert, Grid, Card, CardMedia, CardActions, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';

interface ExtractedImage {
  dataUrl: string;
  mimeType: string;
  page: number;
  index: number;
}

const OPS = {
  DRAW_IMAGE: 82,
  INLINE_IMAGE: 85,
};

const ExtractImagesFromPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [images, setImages] = useState<ExtractedImage[]>([]);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const handleExtract = useCallback(async () => {
    setError('');
    setImages([]);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      await unlock(bytes);
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
      const found: ExtractedImage[] = [];
      let imgIdx = 0;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const opList = await page.getOperatorList();
        const seen = new Set<string>();

        for (let j = 0; j < opList.fnArray.length; j++) {
          const fn = opList.fnArray[j];
          if (fn === OPS.DRAW_IMAGE || fn === OPS.INLINE_IMAGE) {
            let imgData: ImageData | undefined;
            try {
              if (fn === OPS.DRAW_IMAGE) {
                const objKey = opList.argsArray[j]?.[0];
                if (objKey && typeof objKey === 'object' && 'data' in objKey) {
                  const imgObj = objKey as { data: Uint8Array; width: number; height: number; kind: number };
                  const canvas = document.createElement('canvas');
                  canvas.width = imgObj.width;
                  canvas.height = imgObj.height;
                  const ctx = canvas.getContext('2d')!;
                  const pixelData = new Uint8ClampedArray(imgObj.data);
                  imgData = new ImageData(pixelData, imgObj.width, imgObj.height);
                  ctx.putImageData(imgData, 0, 0);
                }
              } else {
                const iObj = opList.argsArray[j]?.[0];
                if (iObj && typeof iObj === 'object' && 'data' in iObj) {
                  const inline = iObj as { data: Uint8Array; width: number; height: number; kind: number };
                  const canvas = document.createElement('canvas');
                  canvas.width = inline.width;
                  canvas.height = inline.height;
                  const ctx = canvas.getContext('2d')!;
                  const pixelData = new Uint8ClampedArray(inline.data);
                  imgData = new ImageData(pixelData, inline.width, inline.height);
                  ctx.putImageData(imgData, 0, 0);
                }
              }
              if (imgData) {
                const c = document.createElement('canvas');
                c.width = imgData.width;
                c.height = imgData.height;
                c.getContext('2d')!.putImageData(imgData, 0, 0);
                const dataUrl = c.toDataURL('image/png');
                const sig = `${imgData.width}x${imgData.height}`;
                if (!seen.has(sig)) {
                  seen.add(sig);
                  found.push({ dataUrl, mimeType: 'image/png', page: i, index: ++imgIdx });
                }
              }
            } catch { /* skip unreadable image */ }
          }
        }
      }

      if (found.length === 0) {
        setError('No embedded images were found in this PDF. The file may contain vector graphics or images as page content rather than embedded image objects.');
      } else {
        setImages(found);
      }
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) setError('Could not extract images from this file.');
    } finally {
      setBusy(false);
    }
  }, [file, unlock]);

  const downloadImage = (img: ExtractedImage) => {
    const a = document.createElement('a');
    a.href = img.dataUrl;
    a.download = `extracted_image_${img.index}_page_${img.page}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box>
      {dialog}
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setImages([]); }} label="PDF file" selectedNames={file ? [file.name] : []} />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file}>
        {busy ? 'Extracting...' : 'Extract Images'}
      </Button>

      {images.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>{images.length} image{images.length !== 1 ? 's' : ''} found</Typography>
          <Grid container spacing={2}>
            {images.map((img) => (
              <Grid item xs={6} sm={4} md={3} key={img.index}>
                <Card>
                  <CardMedia component="img" image={img.dataUrl} alt={`Image ${img.index}`} sx={{ objectFit: 'contain', height: 160, bgcolor: 'grey.100' }} />
                  <CardActions sx={{ justifyContent: 'space-between', px: 1 }}>
                    <Typography variant="caption" color="text.secondary">Page {img.page}</Typography>
                    <IconButton size="small" onClick={() => downloadImage(img)}>
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => images.forEach(downloadImage)}>
            Download All
          </Button>
        </Box>
      )}
    </Box>
  );
};

const ExtractImagesFromPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Extract Images from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload your PDF using the file drop zone.</li>
          <li>Click <strong>Extract Images</strong> — the tool scans every page for embedded image objects.</li>
          <li>Preview thumbnails of all found images and download them individually or all at once.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A product catalog PDF containing 30 embedded product photos will display all 30 images as thumbnails, each labeled
        with its source page number, ready for individual download as PNG files.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Recovering high-resolution product images trapped inside a PDF brochure.</li>
          <li>Extracting charts and diagrams from a report PDF for use in a separate presentation.</li>
          <li>Pulling logos or photos from signed contracts for use in follow-up materials.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why are some images not found?</strong> Images rendered as part of the page drawing stream (not stored as separate XObject image resources) cannot be individually extracted.</li>
          <li><strong>What format are the extracted images?</strong> All images are exported as PNG files to preserve quality.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/extract-images-from-pdf" content={content}>
      <ExtractImagesFromPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtractImagesFromPdf;
