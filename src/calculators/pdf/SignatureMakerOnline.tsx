'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CANVAS_W = 600;
const CANVAS_H = 200;

const SignatureMakerOnlineContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [error, setError] = useState('');

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

  const clear = () => {
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    setHasDrawn(false);
  };

  const download = () => {
    setError('');
    if (!hasDrawn) { setError('Draw your signature first.'); return; }
    const canvas = canvasRef.current!;
    canvas.toBlob((blob) => {
      if (!blob) { setError('Could not export signature.'); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'signature.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <Box>
      <Box sx={{ border: '2px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', bgcolor: '#ffffff' }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ width: '100%', height: CANVAS_H, cursor: 'crosshair', touchAction: 'none' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        Draw your signature above using mouse or touch
      </Typography>

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="outlined" size="large" fullWidth onClick={clear} disabled={!hasDrawn}>
          Clear
        </Button>
        <Button variant="contained" size="large" fullWidth onClick={download} disabled={!hasDrawn}>
          Download PNG
        </Button>
      </Box>
    </Box>
  );
};

const SignatureMakerOnline = () => {
  const content = (
    <>
      <Typography variant="h2">How to Create a Digital Signature Online</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Use your mouse or finger to draw your signature on the canvas above.</li>
          <li>Click <strong>Clear</strong> to start over, or <strong>Download PNG</strong> to save your signature as a transparent image.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Draw your full name on the pad, then click Download PNG. The resulting <code>signature.png</code> file has a transparent background
        and can be inserted into any document, contract, or email.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding a personal signature to emailed PDFs or digital contracts.</li>
          <li>Creating a reusable signature image for invoices and letters.</li>
          <li>Signing documents electronically without printing and scanning.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is the signature saved anywhere?</strong> No — everything happens in your browser. The image is never uploaded.</li>
          <li><strong>Can I use this on a phone?</strong> Yes — the canvas supports touch drawing, so you can sign with your finger on any mobile device.</li>
          <li><strong>What file format is the download?</strong> PNG with a transparent background, suitable for overlaying on documents.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/tools/signature-maker-online" content={content}>
      <SignatureMakerOnlineContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SignatureMakerOnline;
