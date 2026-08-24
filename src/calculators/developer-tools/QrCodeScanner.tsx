'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Paper, Alert, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function looksLikeUrl(text: string): boolean {
  return /^https?:\/\//i.test(text) || /^www\./i.test(text);
}

function normalizeUrl(text: string): string {
  return /^www\./i.test(text) ? `https://${text}` : text;
}

const QrCodeScannerContent = () => {
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [decoded, setDecoded] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const stopCamera = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setScanning(false);
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  const handleImageFile = (file: File) => {
    setError(null);
    setDecoded(null);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const jsQR = (await import('jsqr')).default;
        const result = jsQR(imageData.data, imageData.width, imageData.height);
        if (result && result.data) {
          setDecoded(result.data);
        } else {
          setError('No QR code found in this image. Try a clearer or higher-resolution image.');
        }
      };
      img.onerror = () => setError('Could not load this image file.');
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
    e.target.value = '';
  };

  const startCamera = async () => {
    setError(null);
    setDecoded(null);
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setError('Camera access is not supported in this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanning(true);

      const jsQR = (await import('jsqr')).default;
      const tick = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const result = jsQR(imageData.data, imageData.width, imageData.height);
        if (result && result.data) {
          setDecoded(result.data);
          stopCamera();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      setError('Camera access was denied or no camera is available. Try uploading an image instead.');
      setScanning(false);
    }
  };

  const copyDecoded = () => {
    if (!decoded) return;
    navigator.clipboard.writeText(decoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => {
          if (!v) return;
          stopCamera();
          setError(null);
          setDecoded(null);
          setMode(v);
        }}
      >
        <ToggleButton value="upload"><UploadFileIcon sx={{ mr: 1 }} fontSize="small" /> Upload Image</ToggleButton>
        <ToggleButton value="camera"><CameraAltIcon sx={{ mr: 1 }} fontSize="small" /> Live Camera</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'upload' && (
        <Button variant="contained" component="label" startIcon={<UploadFileIcon />} size="large">
          Choose QR Code Image
          <input type="file" hidden accept="image/*" onChange={onFileInputChange} />
        </Button>
      )}

      {mode === 'camera' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%', maxWidth: 480 }}>
          <Paper
            variant="outlined"
            sx={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden', bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video ref={videoRef} muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: scanning ? 'block' : 'none' }} />
            {!scanning && <Typography color="grey.400">Camera preview will appear here</Typography>}
          </Paper>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {!scanning ? (
            <Button variant="contained" startIcon={<CameraAltIcon />} onClick={startCamera}>Start Scanning</Button>
          ) : (
            <Button variant="outlined" color="error" startIcon={<StopCircleIcon />} onClick={stopCamera}>Stop</Button>
          )}
        </Box>
      )}

      {error && <Alert severity="error" sx={{ width: '100%', maxWidth: 480 }}>{error}</Alert>}

      {decoded && (
        <Paper variant="outlined" sx={{ p: 3, width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="subtitle2" color="text.secondary">Decoded Content</Typography>
          <Typography sx={{ wordBreak: 'break-all', fontFamily: 'monospace' }}>
            {looksLikeUrl(decoded) ? (
              <Link href={normalizeUrl(decoded)} target="_blank" rel="noopener noreferrer">{decoded}</Link>
            ) : (
              decoded
            )}
          </Typography>
          <Button startIcon={<ContentCopyIcon />} onClick={copyDecoded} size="small" sx={{ alignSelf: 'flex-start' }}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Paper>
      )}
    </Box>
  );
};

const QrCodeScanner = () => {
  const content = (
    <>
      <Typography variant="h2">Free QR Code Scanner — Decode from Image or Camera</Typography>
      <Typography variant="body1">
        Decode any QR code either by uploading an image that contains one, or by scanning it live with your
        device's camera. Everything runs locally in your browser — nothing is uploaded to a server.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Choose "Upload Image" to select a photo or screenshot containing a QR code, or "Live Camera" to scan
        one in real time using your device's camera. Once decoded, the content appears below with a Copy
        button — and if it looks like a link, it becomes clickable automatically.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Uploading a screenshot of a QR code that encodes <code>https://example.com</code> instantly decodes it
        and shows it as a clickable link you can open or copy.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Decoding a QR code from a screenshot or saved image when you don't have a phone handy.</li>
          <li>Quickly checking where a QR code on a poster or flyer actually leads before scanning it with a phone.</li>
          <li>Scanning a QR code live from your webcam on a laptop or desktop.</li>
          <li>Testing a QR code you just created with our QR Code Generator to confirm it decodes correctly.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this work with the QR Code Generator on this site?</Typography>
      <Typography variant="body1">
        Yes — it pairs naturally with our QR Code Generator. Generate a custom QR code there, then use this
        scanner to verify it decodes correctly before printing or sharing it.
      </Typography>
      <Typography variant="h3">What if my browser denies camera access?</Typography>
      <Typography variant="body1">
        If camera permission is denied or no camera is available, an error message is shown and live scanning
        won't start — but the "Upload Image" mode always works as a fallback, since it only needs a QR code
        photo or screenshot.
      </Typography>
      <Typography variant="h3">Is my camera feed or uploaded image sent anywhere?</Typography>
      <Typography variant="body1">
        No — both the camera feed and any uploaded image are processed entirely in your browser. Nothing is
        uploaded to a server, and the camera stream is stopped as soon as a code is found or you click Stop.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/qr-code-scanner" content={content}>
      <QrCodeScannerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default QrCodeScanner;
