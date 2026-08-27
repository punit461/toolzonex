'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Box, Typography, Button, Alert, TextField, Stack, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { PDFDocument, StandardFonts, rgb } from '@cantoo/pdf-lib';

const FillSignPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [pageNum, setPageNum] = useState('1');
  const [posX, setPosX] = useState('50');
  const [posY, setPosY] = useState('100');
  const [fontSize, setFontSize] = useState(14);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const drawing = useRef(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      drawing.current = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      setHasSignature(true);
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };
    const end = () => { drawing.current = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);
    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', move);
      canvas.removeEventListener('mouseup', end);
      canvas.removeEventListener('mouseleave', end);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', move);
      canvas.removeEventListener('touchend', end);
    };
  }, []);

  const handleSign = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!textContent.trim() && !hasSignature) { setError('Enter text to place or draw a signature.'); return; }
    const pNum = parseInt(pageNum, 10);
    if (!pNum || pNum < 1) { setError('Enter a valid page number.'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pages = doc.getPages();
      if (pNum > pages.length) { setError(`Page ${pNum} does not exist. The document has ${pages.length} page(s).`); setBusy(false); return; }
      const page = pages[pNum - 1];
      const { width, height } = page.getSize();

      if (textContent.trim()) {
        const font = await doc.embedFont(StandardFonts.Helvetica);
        const x = parseFloat(posX) || 50;
        const y = parseFloat(posY) || 100;
        page.drawText(textContent, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      }

      if (hasSignature && canvasRef.current) {
        const sigDataUrl = canvasRef.current.toDataURL('image/png');
        const sigBytes = await fetch(sigDataUrl).then((r) => r.arrayBuffer());
        const sigImage = await doc.embedPng(sigBytes);
        const sigWidth = 150;
        const sigHeight = (sigImage.height / sigImage.width) * sigWidth;
        page.drawImage(sigImage, {
          x: width - sigWidth - 50,
          y: 60,
          width: sigWidth,
          height: sigHeight,
        });
      }

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-signed.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not process this file. Make sure it is a valid PDF.');
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
        <TextField fullWidth label="Text to place (optional)" value={textContent} onChange={(e) => setTextContent(e.target.value)} placeholder="e.g. John Doe, 08/27/2026" />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 2 }}>
          <TextField fullWidth type="number" label="Page number" value={pageNum} onFocus={(e) => e.target.select()} onChange={(e) => setPageNum(e.target.value)} inputProps={{ min: 1 }} />
          <TextField fullWidth type="number" label="X position (pt)" value={posX} onFocus={(e) => e.target.select()} onChange={(e) => setPosX(e.target.value)} />
          <TextField fullWidth type="number" label="Y position (pt)" value={posY} onFocus={(e) => e.target.select()} onChange={(e) => setPosY(e.target.value)} />
          <TextField fullWidth type="number" label="Font size" value={fontSize} onFocus={(e) => e.target.select()} onChange={(e) => setFontSize(Number(e.target.value))} inputProps={{ min: 6, max: 72 }} />
        </Box>
      </Stack>

      <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Draw your signature below</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <canvas
            ref={canvasRef}
            width={300}
            height={120}
            style={{ border: '1px solid #ccc', borderRadius: 4, cursor: 'crosshair', touchAction: 'none', maxWidth: '100%' }}
          />
          <Button size="small" onClick={clearCanvas}>Clear</Button>
        </Box>
      </Paper>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleSign} disabled={busy || !file}>
        {busy ? 'Signing...' : 'Fill & Sign'}
      </Button>
    </Box>
  );
};

const FillSignPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Fill &amp; Sign a PDF</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload the PDF you want to fill and sign.</li>
          <li>Enter text to place on the document (e.g. your name or date) and set its page and position.</li>
          <li>Draw your signature in the canvas area using your mouse or finger.</li>
          <li>Click <strong>Fill &amp; Sign</strong> to embed both the text and signature into the PDF.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A freelancer receives a PDF contract. They type &quot;Jane Smith&quot; as text at position (50, 100) on page 1,
        draw their signature in the canvas, and click Fill &amp; Sign — producing a signed PDF ready to email back.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Signing employment contracts, NDAs, or freelance agreements without printing.</li>
          <li>Filling in text fields on PDF forms that lack interactive form elements.</li>
          <li>Adding a handwritten-style signature to invoices or purchase orders.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I resize the signature?</strong> The signature is embedded at a fixed width of 150 points in the bottom-right area of the page. For precise placement, use a dedicated PDF editor.</li>
          <li><strong>Is this legally binding?</strong> Electronic signatures have legal standing in most jurisdictions, but specific requirements vary. Consult legal advice for critical documents.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — signing happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/fill-sign-pdf" content={content}>
      <FillSignPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FillSignPdf;
