'use client';

import { useRef, useState } from 'react';
import { Box, Typography, Button, Alert, TextField, Tabs, Tab, Paper, CircularProgress, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from './PdfFileDropzone';
import { downloadBytes, readFileAsArrayBuffer } from './pdfUtils';
import { usePdfPasswordUnlock } from './usePdfPasswordUnlock';
import { loadPdfJsDocument, renderPageThumbnail, RenderedThumbnail } from './pdfThumbnails';

const SIG_CANVAS_W = 500;
const SIG_CANVAS_H = 160;

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1] ?? '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function typedSignatureToDataUrl(name: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = SIG_CANVAS_W;
  canvas.height = SIG_CANVAS_H;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, SIG_CANVAS_W, SIG_CANVAS_H);
  ctx.fillStyle = '#1a1a2e';
  ctx.font = 'italic 56px "Brush Script MT", "Segoe Script", cursive';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(name || 'Your Name', SIG_CANVAS_W / 2, SIG_CANVAS_H / 2);
  return canvas.toDataURL('image/png');
}

const SignPdfContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState('');
  const [signatureUrl, setSignatureUrl] = useState('');
  const [hasDrawn, setHasDrawn] = useState(false);
  const [pageNumber, setPageNumber] = useState('1');
  const [xPct, setXPct] = useState(30);
  const [yPct, setYPct] = useState(70);
  const [widthPct, setWidthPct] = useState(30);
  const [preview, setPreview] = useState<RenderedThumbnail | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const { unlock, dialog } = usePdfPasswordUnlock();

  const getPos = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawing.current = true;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const { x, y } = getPos(e);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDraw = (e?: React.TouchEvent<HTMLCanvasElement> | React.MouseEvent<HTMLCanvasElement>) => {
    if (e) e.preventDefault();
    isDrawing.current = false;
  };

  const clearDrawing = () => {
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.clearRect(0, 0, SIG_CANVAS_W, SIG_CANVAS_H);
    setHasDrawn(false);
    setSignatureUrl('');
  };

  const captureSignature = () => {
    setError('');
    if (mode === 'draw') {
      if (!hasDrawn) { setError('Draw your signature first.'); return; }
      setSignatureUrl(canvasRef.current!.toDataURL('image/png'));
    } else {
      if (!typedName.trim()) { setError('Type your name first.'); return; }
      setSignatureUrl(typedSignatureToDataUrl(typedName.trim()));
    }
  };

  const loadPreview = async (f: File, page: number) => {
    try {
      const bytes = await readFileAsArrayBuffer(f);
      const pdf = await loadPdfJsDocument(bytes);
      const clamped = Math.min(Math.max(1, page), pdf.numPages);
      const thumb = await renderPageThumbnail(pdf, clamped, 320);
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
    if (f) loadPreview(f, parseInt(pageNumber, 10) || 1);
  };

  const handlePageChange = (value: string) => {
    setPageNumber(value);
    if (file) loadPreview(file, parseInt(value, 10) || 1);
  };

  const handlePlace = async () => {
    setError('');
    if (!file) { setError('Choose a PDF file first.'); return; }
    if (!signatureUrl) { setError('Create your signature first — draw it or type your name and click "Use This Signature".'); return; }
    setBusy(true);
    try {
      const bytes = await readFileAsArrayBuffer(file);
      const doc = await unlock(bytes);
      const pages = doc.getPages();
      const pageIndex = Math.min(Math.max(0, (parseInt(pageNumber, 10) || 1) - 1), pages.length - 1);
      const page = pages[pageIndex];
      const { width, height } = page.getSize();

      const pngBytes = dataUrlToBytes(signatureUrl);
      const png = await doc.embedPng(pngBytes);
      const imgWidth = (widthPct / 100) * width;
      const imgHeight = imgWidth * (png.height / png.width);
      const x = (xPct / 100) * width;
      const yFromTop = (yPct / 100) * height;
      const y = height - yFromTop - imgHeight;

      page.drawImage(png, { x, y, width: imgWidth, height: imgHeight });

      const output = await doc.save();
      downloadBytes(output, file.name.replace(/\.pdf$/i, '') + '-signed.pdf');
    } catch (e) {
      if (!(e instanceof Error && e.message.includes('cancelled'))) {
        setError('Could not sign this file. Make sure it is a valid PDF.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box>
      {dialog}
      <Typography variant="h3" sx={{ fontSize: '1.1rem', mb: 1 }}>1. Create your signature</Typography>
      <Tabs value={mode} onChange={(_, v) => setMode(v)} sx={{ mb: 2 }}>
        <Tab value="draw" label="Draw" />
        <Tab value="type" label="Type" />
      </Tabs>

      {mode === 'draw' ? (
        <Box>
          <Box sx={{ border: '2px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', bgcolor: '#ffffff' }}>
            <canvas
              ref={canvasRef}
              width={SIG_CANVAS_W}
              height={SIG_CANVAS_H}
              style={{ width: '100%', height: SIG_CANVAS_H, cursor: 'crosshair', touchAction: 'none' }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, mt: 1.5 }}>
            <Button variant="outlined" onClick={clearDrawing} disabled={!hasDrawn}>Clear</Button>
            <Button variant="contained" onClick={captureSignature} disabled={!hasDrawn}>Use This Signature</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <TextField fullWidth label="Your name" value={typedName} onChange={(e) => { setTypedName(e.target.value); setSignatureUrl(''); }} placeholder="e.g. Jordan Smith" />
          <Button variant="contained" sx={{ mt: 1.5 }} onClick={captureSignature} disabled={!typedName.trim()}>Use This Signature</Button>
        </Box>
      )}

      {signatureUrl && (
        <Paper variant="outlined" sx={{ mt: 2, p: 1.5, display: 'inline-block', bgcolor: '#ffffff' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={signatureUrl} alt="Your signature" style={{ height: 60, display: 'block' }} />
        </Paper>
      )}

      <Typography variant="h3" sx={{ fontSize: '1.1rem', mt: 4, mb: 1 }}>2. Upload the PDF to sign</Typography>
      <PdfFileDropzone onFilesSelected={handleFiles} label="PDF file" selectedNames={file ? [file.name] : []} />

      {file && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h3" sx={{ fontSize: '1.1rem', mb: 1 }}>3. Position the signature</Typography>
          <TextField
            type="number"
            label="Page number"
            value={pageNumber}
            onFocus={(e) => e.target.select()}
            onChange={(e) => handlePageChange(e.target.value)}
            sx={{ mb: 2, maxWidth: 200 }}
          />

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 2 }}>
            <Box>
              <Typography variant="body2" gutterBottom>Horizontal position: {xPct}%</Typography>
              <Slider value={xPct} min={0} max={90} onChange={(_, v) => setXPct(v as number)} />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>Vertical position: {yPct}%</Typography>
              <Slider value={yPct} min={0} max={90} onChange={(_, v) => setYPct(v as number)} />
            </Box>
          </Box>
          <Box sx={{ maxWidth: 300, mb: 2 }}>
            <Typography variant="body2" gutterBottom>Signature width: {widthPct}% of page</Typography>
            <Slider value={widthPct} min={10} max={70} onChange={(_, v) => setWidthPct(v as number)} />
          </Box>

          {preview && (
            <Paper variant="outlined" sx={{ p: 2, display: 'inline-block' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview.url} alt="PDF page preview" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
                {signatureUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={signatureUrl}
                    alt="Signature placement preview"
                    style={{
                      position: 'absolute',
                      left: `${xPct}%`,
                      top: `${yPct}%`,
                      width: `${widthPct}%`,
                      height: 'auto',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </Box>
            </Paper>
          )}
        </Box>
      )}

      {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

      <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handlePlace} disabled={busy || !file || !signatureUrl}>
        {busy ? <><CircularProgress size={18} color="inherit" sx={{ mr: 1.5 }} />Signing...</> : 'Place Signature & Download PDF'}
      </Button>
    </Box>
  );
};

const SignPdf = () => {
  const content = (
    <>
      <Typography variant="h2">How to Sign a PDF Online</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Create your signature by drawing it with your mouse or finger, or by typing your name in a cursive-style font.</li>
          <li>Click <strong>Use This Signature</strong>, then upload the PDF you want to sign.</li>
          <li>Choose the page number and drag the sliders to position and size the signature — a live preview shows exactly where it will land.</li>
          <li>Click <strong>Place Signature &amp; Download PDF</strong> to get your signed file.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A freelancer receives a one-page contract as a PDF, draws their signature, positions it in the bottom-right
        corner of the page at 25% width, and downloads a signed copy — all without printing, physically signing, or scanning anything.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Signing contracts, agreements, and forms sent to you as a PDF.</li>
          <li>Adding a signature to letters or invoices before emailing them back.</li>
          <li>Quickly signing a document from a phone or tablet using touch drawing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this a legally binding digital signature?</strong> No — this tool visually places a signature image onto the PDF page, similar to signing a printed page and scanning it back in. It does not create a cryptographic digital signature, certificate-based signature, or any tamper-evident seal recognized by e-signature compliance standards (like eIDAS or ESIGN). For legally binding signatures, use a dedicated e-signature service.</li>
          <li><strong>Can I sign more than one page?</strong> This tool places one signature on one chosen page per run. To sign additional pages, download the result and run it through the tool again on a different page.</li>
          <li><strong>Is my file uploaded anywhere?</strong> No — drawing, positioning, and embedding the signature all happen entirely in your browser; the PDF is never sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/sign-pdf" content={content}>
      <SignPdfContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SignPdf;
