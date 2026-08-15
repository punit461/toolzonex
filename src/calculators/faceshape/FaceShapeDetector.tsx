'use client';

import { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';
import PdfFileDropzone from '../pdf/PdfFileDropzone';
import { detectFacePoints } from './faceLandmarkerImage';
import { measureFace, classifyFaceShape, FACE_SHAPE_DESCRIPTIONS, type FaceShape } from './faceShapeEngine';

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

const FaceShapeDetectorContent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [result, setResult] = useState<FaceShape | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleFile = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResult(null);
    setError('');
  };

  const handleDetect = async () => {
    if (!file) { setError('Choose a photo first.'); return; }
    setError('');
    setBusy(true);
    try {
      const img = await loadImage(file);
      const points = await detectFacePoints(img);
      if (!points) {
        setError('No face detected in this photo. Try a clear, front-facing photo with good lighting.');
        setBusy(false);
        return;
      }
      const measurements = measureFace(points);
      setResult(classifyFaceShape(measurements));
    } catch (e) {
      setError('Could not analyze this photo. Please try a different image.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ minWidth: 0 }}>
        <PdfFileDropzone accept="image/*" onFilesSelected={handleFile} label="photo" selectedNames={file ? [file.name] : []} />
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', marginTop: 16, borderRadius: 8 }} />
        )}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button variant="contained" size="large" fullWidth sx={{ mt: 3 }} onClick={handleDetect} disabled={busy || !file}>
          {busy ? <CircularProgress size={24} color="inherit" /> : 'Detect Face Shape'}
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Your photo is analyzed entirely in your browser and is never uploaded anywhere.
        </Typography>
      </Box>

      <Box>
        {result ? (
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="text.secondary">Your Face Shape</Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>{result}</Typography>
            <Typography variant="body1" color="text.secondary">{FACE_SHAPE_DESCRIPTIONS[result]}</Typography>
          </Box>
        ) : (
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">Upload a clear, front-facing photo and click Detect Face Shape to see your result here.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const FaceShapeDetector = () => {
  const content = (
    <>
      <Typography variant="h2">How the Face Shape Detector Works</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Upload a clear, front-facing photo of your face.</li>
          <li>Click <strong>Detect Face Shape</strong> — an on-device face-landmark model measures the proportions of your face (length, cheekbone width, jaw width, and forehead width).</li>
          <li>Get an estimated face shape: Oval, Round, Square, Heart, Diamond, or Oblong.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A face that&apos;s noticeably longer than it is wide, with a forehead wider than the jaw and softly
        curved cheekbones, is typically classified as Oval — generally considered the most versatile shape for
        hairstyles and glasses frames.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding hairstyles or haircuts that suit your face shape.</li>
          <li>Choosing glasses frames that balance your proportions.</li>
          <li>General curiosity about facial geometry.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is my photo uploaded to a server?</strong> No — face detection and measurement both run entirely in your browser using an on-device model. Your photo never leaves your device.</li>
          <li><strong>How accurate is this?</strong> This is a proportion-based estimate, like most face-shape tools (including commercial ones) — it&apos;s meant to be informative and fun, not a precise medical or biometric measurement.</li>
          <li><strong>Why didn&apos;t it detect a face?</strong> Use a clear, front-facing, well-lit photo where your whole face is visible.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      title="Face Shape Detector"
      description="Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Runs entirely in your browser."
      url="/tools/face-shape-detector"
      content={content}
      category="Tools"
    >
      <FaceShapeDetectorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FaceShapeDetector;
