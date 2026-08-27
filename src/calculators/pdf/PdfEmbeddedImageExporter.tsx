'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, ImageList, ImageListItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { readFileAsArrayBuffer } from './pdfUtils';

interface ExtractedImage {
  dataUrl: string;
  width: number;
  height: number;
}

const PdfEmbeddedImageExporterContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [images, setImages] = useState<ExtractedImage[]>([]);

  const handleExtract = async () => {
    setError('');
    setImages([]);
    if (!file) { setError('Choose a PDF file first.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdfDoc = await pdfjs.getDocument({ data: bytes }).promise;
      const extracted: ExtractedImage[] = [];

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const ops = await page.getOperatorList();
        const fnMap = ops.fnArray;
        const argsMap = ops.argsArray;
        const seen = new Set<string>();

        for (let i = 0; i < fnMap.length; i++) {
          if (fnMap[i] === pdfjs.OPS.paintImageXObject || fnMap[i] === pdfjs.OPS.paintXObject) {
            const imgName = argsMap[i][0] as string;
            if (seen.has(imgName)) continue;
            seen.add(imgName);
            try {
              const imgObj = await (page as any).commonObjs.get(imgName);
              if (!imgObj) continue;
              const canvas = document.createElement('canvas');
              canvas.width = imgObj.width;
              canvas.height = imgObj.height;
              const ctx = canvas.getContext('2d');
              if (!ctx) continue;
              ctx.drawImage(imgObj, 0, 0);
              extracted.push({ dataUrl: canvas.toDataURL('image/png'), width: imgObj.width, height: imgObj.height });
            } catch { /* skip unrenderable images */ }
          }
        }
      }

      if (extracted.length === 0) {
        setError('No embedded images were found in this PDF.');
      } else {
        setImages(extracted);
      }
    } catch {
      setError('Could not process this file. Make sure it is a valid PDF.');
    } finally {
      setBusy(false);
    }
  };

  const handleDownloadAll = () => {
    images.forEach((img, i) => {
      const link = document.createElement('a');
      link.href = img.dataUrl;
      link.download = `image-${i + 1}.png`;
      link.click();
    });
  };

  const handleDownloadSingle = (img: ExtractedImage, index: number) => {
    const link = document.createElement('a');
    link.href = img.dataUrl;
    link.download = `image-${index + 1}.png`;
    link.click();
  };

  return (
    <Box>
      <PdfFileDropzone onFilesSelected={(files) => { setFile(files[0] ?? null); setImages([]); }} label="PDF file" selectedNames={file ? [file.name] : []} />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {images.length > 0 && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Found {images.length} embedded image{images.length !== 1 ? 's' : ''} across all pages.
        </Alert>
      )}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleExtract} disabled={busy || !file}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Extracting...</> : 'Extract Images'}
      </Button>

      {images.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <ImageList cols={2} gap={12}>
            {images.map((img, i) => (
              <ImageListItem key={i} sx={{ position: 'relative' }}>
                <img src={img.dataUrl} alt={`Image ${i + 1}`} style={{ width: '100%', borderRadius: 4, border: '1px solid #ddd' }} />
                <Button size="small" variant="outlined" sx={{ mt: 1 }} onClick={() => handleDownloadSingle(img, i)}>
                  Download ({img.width}x{img.height})
                </Button>
              </ImageListItem>
            ))}
          </ImageList>
          {images.length > 1 && (
            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleDownloadAll}>
              Download All as PNG
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

const PdfEmbeddedImageExporter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Extract Images from a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF that contains the images you want to extract.</li>
          <li>Click <strong>Extract Images</strong> to scan all pages for embedded graphics.</li>
          <li>Preview each image and download individually or all at once as PNG files.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A product catalog PDF embeds 15 high-resolution product photos across 20 pages. This tool scans every page,
        finds all the image XObjects, and lets you preview and save each one as a standalone PNG file.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling product photos, diagrams, or charts from a PDF catalog or report.</li>
          <li>Recovering embedded illustrations from academic papers or government filings.</li>
          <li>Extracting branded graphics from PDF presentations for reuse in other projects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What image formats does it support?</strong> It extracts any image embedded in the PDF — JPEG, PNG, or other formats — and saves each as a PNG file.</li>
          <li><strong>Will it catch images used as page backgrounds?</strong> Yes — any image XObject on a page, whether foreground or background, will be detected.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — extraction runs entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/pdf-embedded-image-exporter" content={content}>
      <PdfEmbeddedImageExporterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PdfEmbeddedImageExporter;
