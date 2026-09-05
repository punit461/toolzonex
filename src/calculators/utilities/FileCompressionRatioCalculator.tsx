'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FileCompressionRatioCalculator = () => {
  const [original, setOriginal] = useState('100');
  const [compressed, setCompressed] = useState('31');

  const result = useMemo(() => {
    const o = parseFloat(original) || 0;
    const c = parseFloat(compressed) || 0;
    if (o <= 0 || c <= 0) return { valid: false, ratio: 0, saved: 0 };

    const ratio = o / c;
    const saved = (1 - c / o) * 100;
    return { valid: true, ratio, saved };
  }, [original, compressed]);

  const content = (
    <>
      <Typography variant="h2">How to Use the File Compression Ratio Calculator</Typography>
      <Typography variant="body1">
        Enter a file&apos;s original size and its compressed size (in the same unit, such as MB) to see how
        effectively it was compressed. The compression ratio expresses how many times smaller the compressed
        file is compared to the original, while space saved shows that same reduction as a percentage.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Compression Ratio = Original Size / Compressed Size
        <br />
        Space Saved % = (1 − Compressed Size / Original Size) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 100 MB file compressed down to 31 MB has a compression ratio of 100 / 31 ≈ 3.2:1, meaning the original
        is about 3.2 times larger than the compressed version, and it saved (1 − 31/100) × 100 = 69% of space.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing how well different compression formats (ZIP, 7z, video codecs) shrink the same file.</li>
          <li>Evaluating image or video compression settings before publishing or archiving content.</li>
          <li>Estimating storage or bandwidth savings from compressing a batch of files.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this the same as the Compression Ratio Calculator already on this site?</strong> No — that calculator computes an engine&apos;s compression ratio from cylinder bore, stroke, and combustion chamber volume, an entirely different automotive/mechanical concept that just happens to share a similar name. This calculator is about data and file compression — zip archives, images, video, and similar.</li>
          <li><strong>What&apos;s a good compression ratio?</strong> It depends heavily on the file type and format — text and uncompressed formats often compress 3:1 to 10:1 or more, while already-compressed formats like JPEG images or MP4 videos typically see much smaller further gains since most of the redundancy is already removed.</li>
          <li><strong>Does a higher compression ratio always mean better compression?</strong> Not necessarily on its own — very high ratios on lossy formats (like images or video) can come at the cost of visible quality loss, so it&apos;s worth weighing compression ratio against acceptable quality for your use case.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/file-compression-ratio-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Original File Size" type="number" value={original}
            onChange={(e) => setOriginal(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">MB</InputAdornment> } }}
          />
          <TextField
            label="Compressed File Size" type="number" value={compressed}
            onChange={(e) => setCompressed(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">MB</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Compression Ratio</Typography>
            <Typography variant="h4" fontWeight="bold">{result.valid ? `${result.ratio.toFixed(1)}:1` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Space Saved</Typography>
            <Typography fontWeight={600}>{result.valid ? `${result.saved.toFixed(1)}%` : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FileCompressionRatioCalculator;
